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

export function calculatePercentage(newPrice: number | undefined, oldPrice: number | undefined) {
  if (!newPrice || !oldPrice) {
    console.log('CalculatePercentage parameters undefined');
    return;
  }
  const percentage = ((newPrice - oldPrice) / oldPrice) * 100;
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
