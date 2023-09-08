import { Transaction } from '@prisma/client';

export function calculateCostBasis(transactions: Transaction[]) {
  // const buyTransactions = transactions.filter((transaction) => transaction.type === 'BUY');
  let totalQuantity = 0;

  const totalCost = transactions.reduce((totalCost, transaction) => {
    if (transaction.type === 'BUY') {
      totalQuantity += transaction.quantity;
      totalCost + transaction.price * transaction.quantity;
    }

    if (transaction.type === 'SELL') {
      totalQuantity -= transaction.quantity;
      totalCost - transaction.price * transaction.quantity;
    }

    return totalCost;
  }, 0);

  return totalQuantity === 0 ? 0 : totalCost / totalQuantity;
}
