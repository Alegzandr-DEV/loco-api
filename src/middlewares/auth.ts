import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

export function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header && header.split(' ')[1];
  const unauthorized = { success: false, message: 'Unauthorized' };

  if (!token) return res.status(401).json(unauthorized);

  jwt.verify(token, String(process.env.SECRET_ACCESS), {}, (err, user) => {
    if (err) return res.status(401).json(unauthorized);
    req.user = user;
    next();
  });
}
