import express from 'express';
import { body } from 'express-validator';
import {
  buyTransaction,
  deleteCoinAndTransactions,
  deleteCoinAndKeepTransactions,
  getPortfolio,
  getUserBalance,
  setUserBalance,
  getAllTransactions,
  sellTransaction,
  getCoinHoldingQuantity,
  deleteTransaction,
  addCoinToPortfolio,
  getSingleTransaction,
  editTransaction,
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
  body('transactionDate')
    .isDate()
    .withMessage('Invalid date format')
    .custom((value) => {
      const inputDate = new Date(value);
      const currentDate = new Date();

      if (inputDate > currentDate) {
        return false;
      }

      return true;
    })
    .withMessage('Transaction date must be in the past'),

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
  body('transactionDate')
    .isDate()
    .withMessage('Invalid date format')
    .custom((value) => {
      const inputDate = new Date(value);
      const currentDate = new Date();

      if (inputDate > currentDate) {
        return false;
      }

      return true;
    })
    .withMessage('Transaction date must be in the past'),

  sellTransaction
);

// /api/portfolio/
router.get('/', verifyToken, getPortfolio);
router.post('/addCoin', verifyToken, addCoinToPortfolio);
router.put('/edit-transaction', verifyToken, editTransaction);

router.get('/balance', verifyToken, getUserBalance);
router.post('/balance', verifyToken, setUserBalance);
router.delete('/deleteCoinAndKeepTransactions/:id', verifyToken, deleteCoinAndKeepTransactions);
router.delete('/deleteCoinAndTransactions/:id', verifyToken, deleteCoinAndTransactions);

router.get('/transactions/:id', verifyToken, getAllTransactions);

router.get('/transaction/:id', verifyToken, getSingleTransaction);

router.delete('/transactions/delete/:id', verifyToken, deleteTransaction);

router.get('/holdings/:coinId', getCoinHoldingQuantity);

export default router;
