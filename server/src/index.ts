import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();
const port = 3001;

const instance = axios.create({
  baseURL: 'https://pro-api.coinmarketcap.com/v1',
  headers: {
    'X-CMC_PRO_API_KEY': '872c34b0-d2d7-471b-9897-83590cd3c996',
  },
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/highlights', async (req: Request, res: Response) => {
  // latest listing:      https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/new
  // Gainers and losers:  https://pro-api.coinmarketcap.com/v1/cryptocurrency/trending/gainers-losers
  // Trending:            https://pro-api.coinmarketcap.com/v1/cryptocurrency/trending/latest

  const data = await instance.get('/cryptocurrency/listings/new');

  console.log(data);

  // instance.get('/cryptocurrency/trending/gainers-losers');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
