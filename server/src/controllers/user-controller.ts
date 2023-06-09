import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import { prisma } from '../utils/client';
import { generateToken, tokenPayload } from '../utils/jwt';

interface ValidationError {
  value?: any;
  msg: string;
  path?: string;
  location: string;
}
interface AuthenticatedRequest extends Request {
  user: tokenPayload;
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
        msg: 'Invalid email address',
        path: 'email',
        location: 'body',
      });
      return res.status(400).json({ errors: errorsArray });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      errorsArray.push({
        value: password,
        msg: 'Incorrect password',
        path: 'password',
        location: 'body',
      });
      return res.status(400).json({ errors: errorsArray });
    }

    const { password: _password, ...userWithoutPassword } = user;
    const { id, name, email: _email } = userWithoutPassword;
    const token = generateToken({ id, name, _email });

    const ONE_DAY = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    return res
      .cookie('access_token', token, { httpOnly: true, maxAge: ONE_DAY })
      .status(200)
      .json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function checkUserStatus(req: AuthenticatedRequest, res: Response) {
  try {
    if (req.user) {
      return res.status(200).json(req.user);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function logoutUser(req: AuthenticatedRequest, res: Response) {
  try {
    return res.clearCookie('access_token').status(200).json({ message: 'Logged out' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
