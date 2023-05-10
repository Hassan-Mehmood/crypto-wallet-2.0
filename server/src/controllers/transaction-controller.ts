import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../utils/client';
import { bought_coin } from '../routes/transaction-router';
import { calculateCoinStats } from '../utils/calculateCoinStats';
import axios, { AxiosResponse } from 'axios';

type reqBodyType = {
  coinPrice: number;
  coinQuantity: number;
  bought_coin: bought_coin;
  user: number;
};

interface AuthenticatedRequest extends Request {
  userId: number;
}

interface ApiCoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null | any;
  last_updated: string;
}

interface ApiCoinResponse {
  symbol: string;
  price: string;
  timestamp: number;
}

export async function addTransaction(req: Request, res: Response) {
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
        price: coinPrice,
        quantity: coinQuantity,
        timeBought: new Date(),
        Coin: { connect: { id: coinRecord.id } },
      },
    });

    calculateCoinStats(coinRecord);

    res.status(201).json('Coin added to wallet');
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export async function getTransactions(req: AuthenticatedRequest, res: Response) {
  try {
    const userCoins = await prisma.coin.findMany({
      where: { userId: parseInt(req.userId.toString()) },
      include: { transactions: true },
    });

    const promises = userCoins.map(async (coin) => {
      const symbol = `${coin.symbol}USDT`;
      const response = await axios.get<ApiCoinResponse>(
        'https://api.api-ninjas.com/v1/cryptoprice',
        {
          params: { symbol },
          headers: {
            'X-Api-Key': process.env.API_KEY,
          },
        }
      );
      coin.latestPrice = parseFloat(response.data.price);
      return coin;
    });

    const updatedCoins = await Promise.all(promises);

    return res.status(200).json({ coins: updatedCoins });
  } catch (error) {
    return res.status(error).json(error.message);
  }
}
