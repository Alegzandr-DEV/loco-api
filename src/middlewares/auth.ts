import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { createHmac } from 'crypto';
import { UserModel } from '../models/user';
import { signAccess, dateWithMonthsDelay } from '../utils';

dotenv.config();

const unauthorized = { success: false, message: 'Unauthorized' };

function refresh(req: Request) {
  const token = req.cookies.refreshCookie;
  const secret = createHmac('sha256', String(process.env.SECRET_REFRESH)).digest('hex');
  let userData = {};
  
  if (!token) return 401;

  jwt.verify(token, secret, {}, (err, user) => {
    if (err) return 401;

    if (user)
      userData = UserModel.findById(user.id, (err: Error, data: any) => {
        if (err) return 500;
        if (data.refreshToken === token) return data;

        return 401;
      }).getFilter();
  });

  if ('_id' in userData) return userData;
  if (userData === 500) return 500;
  return 401;
}

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.accessCookie;
  const secret = createHmac('sha256', String(process.env.SECRET_ACCESS)).digest('hex');

  if (!token) return res.status(401).json(unauthorized);

  jwt.verify(token, secret, {}, (err, user) => {
    if (err) {
      const refreshRequest: any = refresh(req);

      if (refreshRequest === 401) return res.status(401).json(unauthorized);
      if (refreshRequest === 500) return res.status(500).json({ success: false });
      return res.status(418).cookie('accessCookie', signAccess(refreshRequest), {
        secure: process.env.COOKIE_SECURE === 'true',
        httpOnly: true,
        expires: dateWithMonthsDelay(6)
      }).json({ success: true, message: 'accessCookie renewed' });
    }

    req.user = user;
    next();
  });
}
