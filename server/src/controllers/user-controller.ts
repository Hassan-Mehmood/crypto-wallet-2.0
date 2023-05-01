import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import { prisma } from '../utils/client';
import { generateToken } from '../utils/jwt';

interface ValidationError {
  value?: any;
  msg: string;
  param?: string;
  location: string;
}

export async function registerUser(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: { name, email, password: hashPassword },
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function loginUser(req: Request, res: Response) {
  const errors = validationResult(req);
  const errorsArray = errors.array() as ValidationError[];

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errorsArray });
  }

  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      errorsArray.push({
        value: email,
        msg: 'User not found',
        param: 'email',
        location: 'body',
      });
      return res.status(400).json({ errors: errorsArray });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      errorsArray.push({
        value: password,
        msg: 'Incorrect password',
        param: 'password',
        location: 'body',
      });
      return res.status(400).json({ errors: errorsArray });
    }

    const { password: _password, ...userWithoutPassword } = user;
    const token = generateToken(user.id);

    return res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getUserbyID(req: Request, res: Response) {
  try {
    const id: number = parseInt(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
