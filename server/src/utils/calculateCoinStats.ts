import { Coin } from '@prisma/client';
import { prisma } from './client';
import { calculateCostBasis } from './calculateCostBasis';

export async function calculateCoinStats(coin: Coin): Promise<void> {
  const transactions = await prisma.transaction.findMany({
    where: { coinId: coin.id, user: coin.userId },
  });

  console.log('---------buy Transaction calculateCoinStats()------------');

  const totalQuantity = transactions.reduce((total, transaction) => {
    if (transaction.type === 'BUY') total += transaction.quantity;
    if (transaction.type === 'SELL') total -= transaction.quantity;
    return total;
  }, 0);

  // This total cost is needed for the calculation of profits in percentage on the frontend
  const totalCost = transactions.reduce((total, transaction) => {
    if (transaction.type === 'BUY') total += transaction.price * transaction.quantity;
    return total;
  }, 0);

  // let totalInvestment = transactions.reduce((total, transaction) => {
  //   if (transaction.type === 'BUY') total += transaction.price * transaction.quantity;
  //   if (transaction.type === 'SELL') total -= transaction.price * transaction.quantity;
  //   return total;
  // }, 0);

  let { totalCostBasis, realizedPNL } = calculateCostBasis(transactions);

  // if (totalInvestment < 0) totalInvestment = 0;

  let averageBuyPrice = 0;
  if (totalQuantity > 0) averageBuyPrice = totalCostBasis / totalQuantity;

  console.log('Quantity', totalQuantity);
  console.log('Total Cost Basis', totalCostBasis);
  // console.log('Total investment', totalInvestment);
  console.log('Average Buy Price', averageBuyPrice);
  console.log('Realized PNL', realizedPNL);
  console.log('---------buy Transaction calculateCoinStats()------------');

  await prisma.coin.update({
    where: { id: coin.id },
    data: {
      averageBuyPrice,
      totalQuantity,
      totalInvestment: totalCostBasis,
      cost: totalCost,
      realizedPNL,
    },
  });
}
