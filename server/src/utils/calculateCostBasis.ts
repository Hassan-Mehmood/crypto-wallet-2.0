import { Transaction } from '@prisma/client';

export function calculateCostBasis(transactions: Transaction[]) {
  const buyTransactions = transactions.filter((transaction) => transaction.type === 'BUY');
  let totalQuantity = 0;

  const totalCost = buyTransactions.reduce((totalCost, transaction) => {
    totalQuantity += transaction.quantity;
    return totalCost + transaction.price * transaction.quantity;
  }, 0);

  return totalQuantity === 0 ? 0 : totalCost / totalQuantity;
}
