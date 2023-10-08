import { Transaction } from '@prisma/client';
import { CostBasisCalculator } from './CostBaseCalculator';

export function calculateCostBasis(transactions: Transaction[]) {
  const calculator = new CostBasisCalculator();

  for (const transaction of transactions) {
    if (transaction.type === 'BUY') {
      calculator.buy(transaction.quantity, transaction.price, transaction.type);
    }

    if (transaction.type === 'SELL') {
      calculator.sell(transaction.quantity, transaction.price, transaction.type);
    }
  }

  const realizedPNL = calculator.getRealizedPNL();
  const totalCostBasis = calculator.getTotalCostBasis();
  const averageNetCost = calculator.getAverageNetCost();

  return { realizedPNL, totalCostBasis, averageNetCost };
}
