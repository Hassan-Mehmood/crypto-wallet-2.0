import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../utils/client';
import { transactionCoin } from '../routes/coins-router';
import { calculateCoinStats } from '../utils/calculateCoinStats';
import getCoinLatestPrice from '../utils/getCoinLatestPrice';
import { tokenPayload } from '../utils/jwt';
import { calculateLatestCryptoBalance } from '../utils/calculateLatestCryptoBalance';
import updateCoinData from '../utils/updateCoinData';
import { calculateCostBasis } from '../utils/calculateCostBasis';

interface reqBodyType {
  coinPrice: string;
  moneyRecieved?: number;
  coinQuantity: string;
  coin: transactionCoin;
  user: number;
  transactionDate: string;
  type: 'BUY' | 'SELL';
}

interface AuthenticatedRequest extends Request {
  user: tokenPayload;
}

export async function addCoinToPortfolio(req: AuthenticatedRequest, res: Response) {
  try {
    const coin = req.body.coin;
    const user = req.user;

    const createdCoin = await prisma.coin.create({
      data: {
        name: coin.name,
        apiId: coin.id,
        apiSymbol: coin.symbol,
        symbol: coin.symbol,
        thump: coin.thumb,
        large: coin.large,
        marketCapRank: coin.market_cap_rank,
        user: { connect: { id: user.id } },
      },
    });

    return res.status(200).json({ message: 'Coin added successfully', coin: createdCoin });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getPortfolio(req: AuthenticatedRequest, res: Response) {
  try {
    let portfolioWorth = 0;
    let allTimeProfit = 0;
    let bestPerformer = { value: -Infinity, thump: '', change: 0 };
    let worstPerformer = { value: Infinity, thump: '', change: 0 };

    const { coins: userCoins, dollerBalance } = await prisma.user.findFirst({
      where: { id: req.user.id },
      include: {
        coins: {
          include: { transactions: true },
        },
      },
    });

    if (userCoins.length === 0) {
      bestPerformer = { value: 0, thump: '', change: 0 };
      worstPerformer = { value: 0, thump: '', change: 0 };

      return res.status(200).json({
        coins: [],
        allTimeProfit,
        bestPerformer,
        worstPerformer,
        portfolioWorth: dollerBalance,
        cryptoBalance: 0,
        dollerBalance,
      });
    }

    const {
      updatedCoins,
      allTimeProfit: _allTimeProfit, // This is a number
      bestPerformer: _bestPerformer, // This is an object
      worstPerformer: _worstPerformer, // This is an object
    } = await updateCoinData(userCoins, allTimeProfit, bestPerformer, worstPerformer);

    // This function can be implemented inside the updateCoinData() function
    const updatedCryptoBalance = calculateLatestCryptoBalance(updatedCoins);
    portfolioWorth = updatedCryptoBalance + dollerBalance;

    return res.status(200).json({
      coins: updatedCoins,
      _allTimeProfit,
      bestPerformer,
      worstPerformer,
      portfolioWorth,
      dollerBalance,
      cryptoBalance: updatedCryptoBalance,
    });
  } catch (error) {
    return res.status(error).json(error.message);
  }
}

export async function buyTransaction(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      coinPrice: coinBuyPrice,
      coinQuantity: coinBuyQuantity,
      transactionDate: transactionDate,
      type: transactionType,
      user: userID,
      coin,
    } = req.body as reqBodyType;

    const transaction_date = new Date(transactionDate);

    const userData = await prisma.user.findUnique({
      where: { id: userID },
      include: {
        coins: {
          where: {
            apiSymbol: coin.symbol,
          },
        },
      },
    });

    let coinRecord = userData.coins[0];
    const transactionWorth = parseFloat(coinBuyPrice) * parseFloat(coinBuyQuantity);

    if (!coinRecord) {
      coinRecord = await prisma.coin.create({
        data: {
          name: coin.name,
          apiId: coin.id,
          apiSymbol: coin.symbol,
          symbol: coin.symbol,
          thump: coin.thumb,
          large: coin.large,
          marketCapRank: coin.market_cap_rank,
          user: { connect: { id: userData.id } },
          transactions: {
            create: {
              price: parseFloat(coinBuyPrice),
              quantity: parseFloat(coinBuyQuantity),
              costBasis: transactionWorth,
              type: transactionType,
              date: transaction_date,
              User: { connect: { id: userData.id } },
            },
          },
        },
      });
    } else {
      await prisma.transaction.create({
        data: {
          price: parseFloat(coinBuyPrice),
          quantity: parseFloat(coinBuyQuantity),
          costBasis: transactionWorth,
          type: transactionType,
          date: transaction_date,
          Coin: { connect: { id: coinRecord.id } },
          User: { connect: { id: userData.id } },
        },
      });
    }

    await prisma.user.update({
      where: { id: userID },
      data: {
        dollerBalance: { decrement: transactionWorth },
        // cryptoBalance: { increment: transactionWorth }, // I am gonna calculate cryptoBalance based on data from api
      },
    });

    // Calculating averageBuyPrice, totalQuantity, totalInvestment
    calculateCoinStats(coinRecord);

    return res.status(201).json('Coin added to wallet');
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export async function sellTransaction(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      coinPrice: coinSellPrice,
      coinQuantity: coinSellQuantity,
      type: transactionType,
      transactionDate,
      user: userID,
      coin,
    } = req.body as reqBodyType;

    const transaction_date = new Date(transactionDate);

    const userData = await prisma.user.findUnique({
      where: { id: userID },
      include: {
        coins: {
          where: { apiSymbol: coin.symbol },
          include: { transactions: true },
        },
      },
    });

    const coinRecord = userData.coins[0];

    const transactionWorth = parseFloat(coinSellPrice) * parseFloat(coinSellQuantity);

    const newTransaction = await prisma.transaction.create({
      data: {
        price: parseFloat(coinSellPrice),
        quantity: parseFloat(coinSellQuantity),
        costBasis: transactionWorth,
        date: transaction_date,
        type: transactionType,
        Coin: { connect: { id: coinRecord.id } },
        User: { connect: { id: userData.id } },
      },
    });

    coinRecord.transactions.push(newTransaction);
    const { totalCostBasis, realizedPNL } = calculateCostBasis(coinRecord.transactions);

    // console.log('-----Sell Transaction Function -------');
    // console.log('Total Cost Basis: ', totalCostBasis);
    // console.log('Sale Made: ', transactionWorth);
    // console.log('Coin Sold at', coinSellPrice);
    // console.log('Realized Profit/Loss: ', realizedPNL);
    // console.log('-----Sell Transaction Function -------');

    await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        dollerBalance: { increment: transactionWorth },
        // cryptoBalance: { decrement: totalCostBasis - coinRecord.averageBuyPrice }, // A HACK
      },
    });

    const coinRemainingQuantity = coinRecord.totalQuantity - parseFloat(coinSellQuantity);
    const remainingInvestment = totalCostBasis * coinRemainingQuantity;

    let coinAverageBuyPrice = coinRecord.averageBuyPrice;

    if (coinRemainingQuantity <= 0) {
      coinAverageBuyPrice = 0;
    }

    await prisma.coin.update({
      where: { id: coinRecord.id },
      data: {
        totalQuantity: coinRemainingQuantity,
        totalInvestment: remainingInvestment,
        averageBuyPrice: coinAverageBuyPrice,
        realizedPNL: realizedPNL,
      },
    });

    return res.status(200).json('Coin sold successfully');
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export async function getUserBalance(req: AuthenticatedRequest, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.user.id) },
      select: { dollerBalance: true, cryptoBalance: true },
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send('An error occurred.');
  }
}
// This function set the user balance in dollers
export async function setUserBalance(req: AuthenticatedRequest, res: Response) {
  try {
    const user = await prisma.user.update({
      where: { id: Number(req.user.id) },
      data: { dollerBalance: parseFloat(req.body.accountBalance) },
      select: { dollerBalance: true },
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export async function deleteCoinAndTransactions(req: AuthenticatedRequest, res: Response) {
  try {
    const coinId = Number(req.params.id);

    await prisma.transaction.deleteMany({
      where: {
        coinId: coinId,
      },
    });

    const deletedCoin = await prisma.coin.delete({
      where: {
        id: coinId,
      },
    });

    // const latestPrice = await getCoinLatestPrice(deletedCoin.symbol + 'USDT');

    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        dollerBalance: { increment: deletedCoin.totalInvestment },
        // cryptoBalance: {
        //   decrement: deletedCoin.totalQuantity * parseFloat(latestPrice.data.price),
        // },
      },
    });

    return res.status(200).json({ message: 'Coin and all transactions deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete coin.' });
  }
}

export async function deleteCoinAndKeepTransactions(req: AuthenticatedRequest, res: Response) {
  try {
    const coinId = Number(req.params.id);

    await prisma.coin.update({
      where: { id: coinId },
      data: { active: false },
    });

    return res.status(200).json({ message: 'Coin deleted while keeping transactions.', coinId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete coin.' });
  }
}

export async function getTransactions(req: AuthenticatedRequest, res: Response) {
  try {
    const coinId = Number(req.params.id);

    const transactions = await prisma.transaction.findMany({
      orderBy: [{ date: 'desc' }],
      where: { coinId },
      include: {
        Coin: {
          select: {
            name: true,
            symbol: true,
            thump: true,
            averageBuyPrice: true,
            totalQuantity: true,
            totalInvestment: true,
            holdingsInDollers: true,
            profitLoss: true,
            realizedPNL: true,
            cost: true,
          },
        },
      },
    });

    if (transactions.length === 0) {
      const coin = await prisma.coin.findUnique({
        where: { id: coinId },
        select: {
          name: true,
          symbol: true,
          thump: true,
          averageBuyPrice: true,
          totalQuantity: true,
          totalInvestment: true,
          holdingsInDollers: true,
          profitLoss: true,
          realizedPNL: true,
          cost: true,
        },
      });
      coin.profitLoss = coin.realizedPNL;

      return res.status(200).json({ transactions: [], coin });
    }

    const coin = transactions[0].Coin;
    const latestPriceData = await getCoinLatestPrice(coin.symbol + 'USDT');
    const latestPrice = parseFloat(latestPriceData.data.price);

    coin.holdingsInDollers = coin.totalQuantity * latestPrice;
    coin.profitLoss += coin.holdingsInDollers - coin.totalInvestment + coin.realizedPNL;

    const transactionsWithoutCoin = transactions.map(({ Coin, ...rest }) => rest);

    // console.log(coin);

    return res.status(200).json({ transactions: transactionsWithoutCoin, coin });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to get transactions.' });
  }
}

export async function deleteTransaction(req: AuthenticatedRequest, res: Response) {
  try {
    const id = Number(req.params.id);

    const transaction = await prisma.transaction.delete({
      where: { id },
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found.' });
    }

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    const coin = await prisma.coin.findUnique({ where: { id: transaction.coinId } });

    const TRANSACTION_COST = transaction.costBasis;

    if (transaction.type === 'BUY') {
      user.dollerBalance += TRANSACTION_COST;
      coin.totalInvestment -= TRANSACTION_COST;
      coin.cost -= TRANSACTION_COST;
      coin.totalQuantity -= transaction.quantity;
    }

    if (transaction.type === 'SELL') {
      user.dollerBalance -= TRANSACTION_COST;
      coin.totalInvestment += TRANSACTION_COST;
      coin.cost -= TRANSACTION_COST;
      coin.totalQuantity += transaction.quantity;
    }

    if (coin.totalQuantity > 0) {
      coin.averageBuyPrice = coin.totalInvestment / coin.totalQuantity;
    } else {
      coin.averageBuyPrice = 0;
    }

    if (coin.cost < 0) {
      coin.cost = 0;
    }

    console.log('Doller Balance', user.dollerBalance);
    console.log('Total Investment', coin.totalInvestment);
    console.log('Cost', coin.cost);
    console.log('Total Quantity', coin.totalQuantity);
    console.log('Avrg Buy Price', coin.averageBuyPrice);

    await prisma.user.update({
      where: { id: req.user.id },
      data: { dollerBalance: user.dollerBalance },
    });

    await prisma.coin.update({
      where: { id: coin.id },
      data: {
        totalInvestment: coin.totalInvestment,
        cost: coin.cost,
        totalQuantity: coin.totalQuantity,
        averageBuyPrice: coin.averageBuyPrice,
      },
    });

    return res.status(200).json({ message: 'Transaction deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete transactions.' });
  }
}

export async function getCoinHoldingQuantity(req: AuthenticatedRequest, res: Response) {
  try {
    const coinApiId = req.params.coinId;

    const coin = await prisma.coin.findFirst({
      where: { apiId: coinApiId },
      select: {
        totalQuantity: true,
        symbol: true,
      },
    });

    console.log(coin);

    if (!coin) {
      return res.status(200).json({ holdingsInPortfolio: 0 });
    }

    return res.status(200).json({ holdingsInPortfolio: coin.totalQuantity });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to get coin.' });
  }
}
