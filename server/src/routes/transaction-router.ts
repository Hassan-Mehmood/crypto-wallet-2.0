import express from 'express';
import { body } from 'express-validator';
import {
  addTransaction,
  deleteCoin,
  getTransactions,
  getUserBalance,
  setUserBalance,
} from '../controllers/transaction-controller';
import { verifyToken } from '../utils/jwt';

export type bought_coin = {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
};

const router = express.Router();

router.post(
  '/add',

  body('bought_coin')
    .custom((coin: bought_coin) => coin.id !== null)
    .withMessage('Coin Data is required'),
  body('user')
    .custom((userID: number) => userID !== null)
    .withMessage('User not logged in'),
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

router.get('/all', verifyToken, getTransactions);
router.get('/balance', verifyToken, getUserBalance);
router.post('/balance', verifyToken, setUserBalance);
router.delete('/delete/:id', verifyToken, deleteCoin);

export default router;
