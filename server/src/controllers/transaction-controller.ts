import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export function addTransaction(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { coinPrice, coinQuantity, bought_coin } = req.body;

    res.json({ coinPrice, coinQuantity, bought_coin });
  } catch (error) {
    res.json(error);
  }
}
