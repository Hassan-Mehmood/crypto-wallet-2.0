export default function calculatePercentage(newPrice: number, oldPrice: number) {
  const percentage = ((newPrice - oldPrice) / oldPrice) * 100;
  const sign = `${percentage > 0 ? '+' : ''}`;
  return `${sign}${percentage.toFixed(2)}`;
}
