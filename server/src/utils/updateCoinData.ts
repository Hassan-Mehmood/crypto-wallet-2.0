import { Coin, Transaction } from '@prisma/client';
import getCoinLatestPrice from './getCoinLatestPrice';

interface Performer {
  value: number;
  thump: string;
  change: number;
}

type Coins = (Coin & {
  transactions: Transaction[];
})[];

export default async function updateCoinData(
  coins: Coins,
  allTimeProfit: number,
  bestPerformer: Performer,
  worstPerformer: Performer
) {
  const promises = coins.map(async (coin) => {
    const symbol = `${coin.symbol}USDT`;
    const latestPriceData = await getCoinLatestPrice(symbol);

    coin.latestPrice = parseFloat(latestPriceData.data.price);
    coin.holdingsInDollers = coin.totalQuantity * coin.latestPrice;
    coin.profitLoss = coin.holdingsInDollers - coin.totalInvestment;

    allTimeProfit += coin.profitLoss;

    if (coin.profitLoss > bestPerformer.value) {
      bestPerformer.value = coin.profitLoss;
      bestPerformer.thump = coin.thump;
    }
    if (coin.profitLoss < worstPerformer.value) {
      worstPerformer.value = coin.profitLoss;
      worstPerformer.thump = coin.thump;
    }

    return coin;
  });

  const updatedCoins = await Promise.all(promises);

  return {
    updatedCoins,
    allTimeProfit,
    bestPerformer,
    worstPerformer,
  };
}
