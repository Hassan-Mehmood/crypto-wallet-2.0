import { Coin, Transaction } from '@prisma/client';
import getCoinLatestPrice from './getCoinLatestPrice';
import { calculateCostBasis } from './calculateCostBasis';

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

    if (coin.totalQuantity === 0) {
      coin.holdingsInDollers = 0;
      coin.profitLoss = coin.realizedPNL;
      allTimeProfit += coin.profitLoss;
    } else {
      coin.holdingsInDollers = coin.totalQuantity * coin.latestPrice;
      coin.profitLoss += coin.holdingsInDollers - coin.totalInvestment + coin.realizedPNL;

      console.log('===============================');
      console.log('coin', coin.symbol);
      console.log('latest price', coin.latestPrice);
      console.log('total investment', coin.totalInvestment);
      console.log('profit loss', coin.profitLoss);
      console.log('Coin cost', coin.cost);
      console.log('===============================');

      allTimeProfit += coin.profitLoss;
    }
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
