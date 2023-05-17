import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../utils/client';
import { bought_coin } from '../routes/coins-router';
import { calculateCoinStats } from '../utils/calculateCoinStats';
import axios from 'axios';
import getCoinLatestPrice from '../utils/getCoinLatestPrice';
import { tokenPayload } from '../utils/jwt';

type reqBodyType = {
  coinPrice: string;
  coinQuantity: string;
  bought_coin: bought_coin;
  user: number;
};

interface AuthenticatedRequest extends Request {
  user: tokenPayload;
}

export async function addCoinTransaction(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { coinPrice, coinQuantity, bought_coin, user: userID }: reqBodyType = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userID },
    });

    let coinRecord = await prisma.coin.findFirst({
      where: {
        apiSymbol: bought_coin.symbol,
        user: { id: user.id },
      },
    });

    if (!coinRecord) {
      coinRecord = await prisma.coin.create({
        data: {
          name: bought_coin.name,
          apiSymbol: bought_coin.symbol,
          symbol: bought_coin.symbol,
          thump: bought_coin.thumb,
          large: bought_coin.large,
          marketCapRank: bought_coin.market_cap_rank,
          user: { connect: { id: user.id } },
        },
      });
    }

    await prisma.transaction.create({
      data: {
        price: parseFloat(coinPrice),
        quantity: parseFloat(coinQuantity),
        timeBought: new Date(),
        Coin: { connect: { id: coinRecord.id } },
      },
    });

    const transactionCost = parseFloat(coinPrice) * parseFloat(coinQuantity);
    const latestPrice = await getCoinLatestPrice(coinRecord.symbol + 'USDT');

    await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        dollerBalance: user.dollerBalance - transactionCost,
        cryptoBalance: parseFloat(coinQuantity) * parseFloat(latestPrice.data.price),
      },
    });

    calculateCoinStats(coinRecord);

    return res.status(201).json('Coin added to wallet');
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export async function getPortfolio(req: AuthenticatedRequest, res: Response) {
  try {
    let allTimeProfit = 0;
    let bestPerformer = { value: -Infinity, thump: '', change: 0 };
    let worstPerformer = { value: Infinity, thump: '', change: 0 };

    const userCoins = await prisma.coin.findMany({
      where: { userId: parseInt(req.user.id.toString()) },
      include: { transactions: true },
    });

    if (userCoins.length === 0) {
      bestPerformer = { value: 0, thump: '', change: 0 };
      worstPerformer = { value: 0, thump: '', change: 0 };
      return res.status(200).json({ coins: [], allTimeProfit, bestPerformer, worstPerformer });
    }

    const promises = userCoins.map(async (coin) => {
      const symbol = `${coin.symbol}USDT`;
      const response = await getCoinLatestPrice(symbol);

      coin.latestPrice = parseFloat(response.data.price);
      coin.holdingsInDollers = coin.totalQuantity * coin.latestPrice;
      coin.profitLoss = coin.holdingsInDollers - coin.totalInvestment;
      coin.latestPrice = coin.latestPrice;

      allTimeProfit += coin.profitLoss;

      if (coin.profitLoss > bestPerformer.value) {
        bestPerformer.value = coin.profitLoss;
        bestPerformer.thump = coin.thump;
      }
      if (coin.profitLoss < worstPerformer.value) {
        worstPerformer.value = coin.profitLoss;
        worstPerformer.thump = coin.thump;
      }

      return coin;
    });

    const updatedCoins = await Promise.all(promises);

    return res
      .status(200)
      .json({ coins: updatedCoins, allTimeProfit, bestPerformer, worstPerformer });
  } catch (error) {
    return res.status(error).json(error.message);
  }
}

export async function getUserBalance(req: AuthenticatedRequest, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.user.id.toString()) },
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
      where: { id: parseInt(req.user.id.toString()) },
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

export async function deleteCoin(req: AuthenticatedRequest, res: Response) {
  try {
    const coinId = parseInt(req.params.id.toString());

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

    return res.status(200).json(deletedCoin);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to delete coin.' });
  }
}
