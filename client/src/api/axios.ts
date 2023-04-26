import axios from 'axios';
import { GlobalData, TrendingCoin } from '../types';

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
