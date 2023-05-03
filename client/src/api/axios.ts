import axios from 'axios';
import { GlobalData, SearchCoin, TrendingCoin, getCoinMarketDataType } from '../types';

const instance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/',
});

export async function getTrendingCoins(): Promise<TrendingCoin[]> {
  const data = await instance.get('search/trending');
  return data.data.coins;
}

export async function getGlobalData(): Promise<GlobalData> {
  const data = await instance.get('global');
  return data.data;
}

export async function getHighlightsData(): Promise<[TrendingCoin[], GlobalData]> {
  const [trendingCoins, globalData] = await Promise.all([getTrendingCoins(), getGlobalData()]);
  return [trendingCoins, globalData];
}

export async function coinsList() {
  const { data } = await instance.get(
    `coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
  );
  return data;
}

export async function getCoinByName(name: string): Promise<SearchCoin[]> {
  const { data } = await instance.get(`search?query=${name}`);
  return data.coins;
}

export async function getCoinMarketData(name: string): Promise<getCoinMarketDataType> {
  const { data } = await instance.get(
    `coins/${name}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  );

  return data;
}
