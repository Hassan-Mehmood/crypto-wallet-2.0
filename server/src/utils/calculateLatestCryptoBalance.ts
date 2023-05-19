import { Coin } from '@prisma/client';

export function calculateLatestCryptoBalance(coins: Coin[]) {
  let cryptoBalance = 0;

  for (const coin of coins) {
    cryptoBalance += coin.latestPrice * coin.totalQuantity;
  }
  return cryptoBalance;
}
