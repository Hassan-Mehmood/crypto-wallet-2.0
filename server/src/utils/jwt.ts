import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  userId: string;
}

export const generateToken = (id: string) => {
  const token = jwt.sign(id, process.env.JWT_SECRET_KEY);
  return token;
};

// export const verifyToken = (req: Request, res: Response, next: NextFunction) => {};

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { access_token } = req.cookies;
  if (access_token == null) return res.status(401).json({ message: 'Not Authorized' });

  jwt.verify(access_token, process.env.JWT_SECRET_KEY as string, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: 'Token expired' });
    req.userId = user;
    next();
  });
};
