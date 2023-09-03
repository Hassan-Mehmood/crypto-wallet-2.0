import axios from 'axios';

interface ApiCoinResponse {
  symbol: string;
  price: string;
  timestamp: number;
}

export default async function getCoinLatestPrice(symbol: string) {
  const response = await axios.get<ApiCoinResponse>('https://api.api-ninjas.com/v1/cryptoprice', {
    params: { symbol },
    headers: { 'X-Api-Key': process.env.API_KEY },
  });
  return response;
}
