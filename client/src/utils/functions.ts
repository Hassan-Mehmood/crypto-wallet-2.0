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

export function calculatePercentage(newPrice: number, oldPrice: number) {
  const percentage = ((newPrice - oldPrice) / oldPrice) * 100;
  const sign = `${percentage > 0 ? '+' : ''}`;
  return `${sign}${percentage.toFixed(2)}`;
}
