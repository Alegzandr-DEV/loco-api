import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { UserModel } from '../models';
import { 
  create, 
  get, 
  update, 
  remove, 
  list, 
  compare, 
  signAccess, 
  signRefresh, 
  dateWithMonthsDelay,
  decodeAccess 
} from '../utils';

dotenv.config();

export const User = {
  create: create(UserModel),
  get: get(UserModel),
  update: update(UserModel),
  delete: remove(UserModel),
  list: list(UserModel),

  signIn: (req: Request, res: Response) => {
    if (!req.body || !req.body.password) return res.status(500).json({ success: false });;

    let userData: { username?: string, email?: string } = { username: req.body.username };
    const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (isEmail.test(req.body.username))
      userData = { email: req.body.username };

    UserModel.findOne(userData, (err: Error, data: any) => {
      if (err || !data)
        return res.status(500).json({ success: false });
      if (compare(req.body.password, data.password))  {
        const accessToken = signAccess(data);
        const refreshToken = signRefresh(data);

        data.refreshToken = refreshToken;
        data.save();

        return res.status(200)
          .cookie('accessCookie', accessToken, {
            secure: process.env.COOKIE_SECURE === 'true',
            httpOnly: true,
            expires: dateWithMonthsDelay(6)
          }).cookie('refreshCookie', refreshToken, {
            secure: process.env.COOKIE_SECURE === 'true',
            httpOnly: true,
            expires: dateWithMonthsDelay(6)
          }).json({ success: true });
      }

      return res.status(401).json({ success: false, message: 'Invalid password' });
    });
  },

  me: (req: Request, res: Response) => {
    return res.status(200).json(decodeAccess(req.cookies.accessCookie));
  }
}
