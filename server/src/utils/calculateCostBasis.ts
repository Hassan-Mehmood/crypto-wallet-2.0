import { Transaction } from '@prisma/client';

export function calculateCostBasis(transactions: Transaction[]) {
  const buyTransactions = transactions.filter((transaction) => transaction.type === 'BUY');

  const totalCostBasis = buyTransactions.reduce(
    (totalCost, transaction) => totalCost + transaction.price * transaction.quantity,
    0
  );

  return totalCostBasis;
}
