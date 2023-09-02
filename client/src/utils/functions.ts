import { Toast } from '@chakra-ui/react';

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
  latestPrice: number | undefined,
  investment: number | undefined,
  cost: number | undefined
) {
  if (!latestPrice || !investment || !cost) {
    console.log('CalculatePercentage parameters undefined');
    return;
  }

  // Write a snap with caption hustle and consistancy pe career ye mushtamil

  const profitOrLoss = latestPrice - investment;

  console.log('profit or loss', profitOrLoss);
  console.log('old price', investment);
  console.log('new price', latestPrice);
  // const percentage = ((newPrice - investment) / investment) * 100;
  const percentage = (profitOrLoss / cost) * 100;
  const sign = `${percentage > 0 ? '+' : ''}`;
  return `${sign}${percentage.toFixed(2)}`;
}

export function showToast(title: string, description: string, status: 'error' | 'success') {
  return Toast({
    title,
    description,
    position: 'top',
    status,
    duration: 3000,
    isClosable: true,
  });
}
