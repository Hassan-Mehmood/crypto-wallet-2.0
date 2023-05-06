import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../utils/client';
import { bought_coin } from '../routes/transaction-router';

type reqBodyType = {
  coinPrice: number;
  coinQuantity: number;
  bought_coin: bought_coin;
  user: number;
};

export async function addTransaction(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { coinPrice, coinQuantity, bought_coin, user: userID }: reqBodyType = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: userID,
      },
    });

    let coinRecord = await prisma.coin.findFirst({
      where: {
        apiSymbol: bought_coin.symbol,
        user: {
          id: user.id,
        },
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

    res.status(201).json('Coin added to wallet');
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
}
