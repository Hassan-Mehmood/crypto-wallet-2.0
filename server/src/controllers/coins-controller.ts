import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../utils/client';
import { bought_coin } from '../routes/coins-router';
import { calculateCoinStats } from '../utils/calculateCoinStats';
import getCoinLatestPrice from '../utils/getCoinLatestPrice';
import { tokenPayload } from '../utils/jwt';
import { calculateLatestCryptoBalance } from '../utils/calculateLatestCryptoBalance';
import updateCoinData from '../utils/updateCoinData';

type reqBodyType = {
  coinPrice: string;
  coinQuantity: string;
  bought_coin: bought_coin;
  user: number;
};

interface AuthenticatedRequest extends Request {
  user: tokenPayload;
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
      allTimeProfit: _allTimeProfit, // This is just a number
      bestPerformer: _bestPerformer, // This is an object
      worstPerformer: _worstPerformer, // This is an object
    } = await updateCoinData(userCoins, allTimeProfit, bestPerformer, worstPerformer);

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

export async function addCoinTransaction(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { coinPrice, coinQuantity, bought_coin, user: userID } = req.body as reqBodyType;

    const userData = await prisma.user.findUnique({
      where: { id: userID },
      include: {
        coins: {
          where: {
            apiSymbol: bought_coin.symbol,
          },
        },
      },
    });

    let coinRecord = userData.coins[0];

    if (!coinRecord) {
      coinRecord = await prisma.coin.create({
        data: {
          name: bought_coin.name,
          apiSymbol: bought_coin.symbol,
          symbol: bought_coin.symbol,
          thump: bought_coin.thumb,
          large: bought_coin.large,
          marketCapRank: bought_coin.market_cap_rank,
          user: { connect: { id: userData.id } },
          transactions: {
            create: {
              price: parseFloat(coinPrice),
              quantity: parseFloat(coinQuantity),
              timeBought: new Date(),
            },
          },
        },
      });
    } else {
      await prisma.transaction.create({
        data: {
          price: parseFloat(coinPrice),
          quantity: parseFloat(coinQuantity),
          timeBought: new Date(),
          Coin: { connect: { id: coinRecord.id } },
        },
      });
    }

    const transactionCost = parseFloat(coinPrice) * parseFloat(coinQuantity);
    const latestPrice = await getCoinLatestPrice(coinRecord.symbol + 'USDT');

    await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        dollerBalance: {
          decrement: transactionCost,
        },
        cryptoBalance: {
          increment: parseFloat(coinQuantity) * parseFloat(latestPrice.data.price),
        },
      },
    });

    calculateCoinStats(coinRecord); // Calculating averageBuyPrice, totalQuantity, totalInvestment

    return res.status(201).json('Coin added to wallet');
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
      data: {
        dollerBalance: parseFloat(req.body.accountBalance),
      },
      select: { dollerBalance: true },
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export async function deleteCoinAndData(req: AuthenticatedRequest, res: Response) {
  try {
    const coinId = Number(req.params.id);

    const transactions = await prisma.transaction.deleteMany({
      where: {
        coinId: coinId,
      },
    });

    const deletedCoin = await prisma.coin.delete({
      where: {
        id: coinId,
      },
    });

    const latestPrice = await getCoinLatestPrice(deletedCoin.symbol + 'USDT');

    // console.log('DollerBalance', deletedCoin.totalInvestment);
    // console.log('CryptoBalance', deletedCoin.totalQuantity * parseFloat(latestPrice.data.price));

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        dollerBalance: { increment: deletedCoin.totalInvestment },
        cryptoBalance: {
          decrement: deletedCoin.totalQuantity * parseFloat(latestPrice.data.price),
        },
      },
    });

    // console.log('deletedCoin', deletedCoin);
    // console.log('Transactions', transactions);
    // console.log('user', user);

    return res.status(200).json({ message: 'Coin deleted successfully.', deletedCoin });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete coin.' });
  }
}
