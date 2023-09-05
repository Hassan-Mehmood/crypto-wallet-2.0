import express from 'express';
import { body } from 'express-validator';
import {
  buyTransaction,
  deleteCoinAndTransactions,
  deleteCoinAndKeepTransactions,
  getPortfolio,
  getUserBalance,
  setUserBalance,
  getTransactions,
  sellTransaction,
  deleteTransaction,
} from '../controllers/coins-controller';
import { verifyToken } from '../utils/jwt';

export type transactionCoin = {
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
  '/buy',
  body('coin')
    .custom((coin: transactionCoin) => coin.id !== null)
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

  buyTransaction
);

router.post(
  '/sell',
  body('coin')
    .custom((coin: transactionCoin) => coin.id !== null)
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

  sellTransaction
);

// /api/portfolio/
router.get('/', verifyToken, getPortfolio);
router.get('/balance', verifyToken, getUserBalance);
router.post('/balance', verifyToken, setUserBalance);
router.delete('/deleteCoinAndKeepTransactions/:id', verifyToken, deleteCoinAndKeepTransactions);
router.delete('/deleteCoinAndTransactions/:id', verifyToken, deleteCoinAndTransactions);

router.get('/transactions/:id', verifyToken, getTransactions);
router.delete('/transactions/delete/:id', verifyToken, deleteTransaction);

export default router;
