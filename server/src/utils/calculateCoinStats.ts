import { Coin } from '@prisma/client';
import { prisma } from './client';

export async function calculateCoinStats(coin: Coin): Promise<void> {
  const transactions = await prisma.transaction.findMany({
    where: { coinId: coin.id },
    select: { price: true, quantity: true, timeBought: true },
  });

  const totalQuantity = transactions.reduce((total, transaction) => {
    return total + transaction.quantity;
  }, 0);

  const totalCost = transactions.reduce((total, transaction) => {
    return total + transaction.price * transaction.quantity;
  }, 0);
  const averageBuyPrice = totalCost / totalQuantity;

  await prisma.coin.update({
    where: { id: coin.id },
    data: { averageBuyPrice, totalQuantity, totalInvestment: totalCost, cost: totalCost },
  });
}
