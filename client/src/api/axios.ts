import axios from 'axios';
import { TrendingCoin } from '../types';

const instance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/',
});

export async function getTrendingCoins(): Promise<TrendingCoin[]> {
  const data = await instance.get('search/trending');
  return data.data.coins;
}
