import { NextFunction, Request, Response } from 'express';
import { access } from 'fs';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user: tokenPayload;
}

export interface tokenPayload {
  id: number;
  name: string;
  _email: string;
}

export const generateToken = (payload: tokenPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
  return token;
};

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { access_token } = req.cookies;

  if (access_token == null) return res.status(401).json({ message: 'Not Authorized' });

  jwt.verify(access_token, process.env.JWT_SECRET_KEY as string, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: 'Token expired' });
    req.user = user;
    next();
  });
};
