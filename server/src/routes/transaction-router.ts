import express from 'express';
import { body } from 'express-validator';
import { addTransaction } from '../controllers/transaction-controller';

type coinDataType = {
  id: string | null;
  name: string | null;
  api_symbol: string | null;
  symbol: string | null;
  market_cap_rank: number | null;
  thumb: string | null;
  large: string | null;
};

const router = express.Router();

router.post(
  '/add',

  body('bought_coin')
    .custom((coin: coinDataType) => coin.id !== null)
    .withMessage('Coin Data is required'),
  body('coinQuantity')
    .notEmpty()
    .custom((num: number) => num > 0)
    .withMessage('Coin Quantity must be greater than 0'),
  body('coinPrice')
    .notEmpty()
    .custom((num: number) => num > 0)
    .withMessage('Coin Price must be greater than 0'),

  addTransaction
);

export default router;
