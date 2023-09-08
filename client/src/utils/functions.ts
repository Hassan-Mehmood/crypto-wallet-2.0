export function getProfitLossColor(profitLoss: number | undefined) {
  if (profitLoss === undefined) {
    return '';
  }

  if (profitLoss > 0) {
    return 'green';
  } else if (profitLoss < 0) {
    return 'red';
  } else {
    return '';
  }
}

export function calculatePercentage(
  profitOrLoss: number | undefined,
  cost: number | undefined,
  investment?: number | undefined
) {
  if (!profitOrLoss || !cost) {
    console.log('CalculatePercentage parameters undefined');
    return '0';
  }

  const percentage = (profitOrLoss / cost) * 100;
  const sign = `${percentage > 0 ? '+' : ''}`;

  return `${sign}${percentage.toFixed(2)}`;
}
