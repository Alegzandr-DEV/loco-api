import { Request, Response } from 'express';
import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { UserModel } from '../models/user';
import { create, get, update, remove, list, compare, signAccess, signRefresh } from '../utils';

dotenv.config();

const unauthorized = { success: false, message: 'Unauthorized' };

export const User = {
  create: create(UserModel),
  get: get(UserModel),
  update: update(UserModel),
  delete: remove(UserModel),
  list: list(UserModel),

  login: (req: Request, res: Response) => {
    if (!req.body || !req.body.password) return res.status(500).json({ success: false });;

    let userData: { username?: string, email?: string } = { username: req.body.username };
    const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (isEmail.test(req.body.username))
      userData = { email: req.body.username };

    UserModel.findOne(userData, (err: Error, data: any) => {
      if (err || !data)
        return res.status(500).json({ success: false });;
      if (compare(req.body.password, data.password))  {
        const accessToken = signAccess(data);
        const refreshToken = signRefresh(data);

        data.refreshToken = refreshToken;
        data.save();

        return res.status(200).json({ success: true, accessToken: accessToken, refreshToken: refreshToken });
      }

      return res.status(401).json({ success: false, message: 'Invalid password' });
    });
  },

  refresh: (req: Request, res: Response) => {
    const header = req.headers.authorization;
    const token = header && header.split(' ')[1];

    if (!token) return res.status(401).json(unauthorized);

    jwt.verify(token, String(process.env.SECRET_REFRESH), {}, (err, user) => {
      if (err) return res.status(401).json(unauthorized);

      if (user)
        UserModel.findById(user.id, (err: Error, data: any) => {
          if (data.refreshToken === token)
            if (user) return res.status(200).json({ success: true, accessToken: signAccess(data) });

          return res.status(401).json(unauthorized);
        });
    });
  }
}
