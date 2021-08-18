import { Request, Response } from 'express';
import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { UserModel } from '../models/user';
import { compare, signAccess, signRefresh } from '../utils';
import { user } from '../routes';

dotenv.config();

const unauthorized = { success: false, message: 'Unauthorized' };
const notFound = { success: false, message: 'Not Found' };

export const User = {
  create: (req: Request, res: Response) => {
    if (!req.body) return res.status(500).json({ success: false });;
    new UserModel(req.body).save((err) => {
      if (err) return res.status(500).json({ success: false });;
      return res.status(200).json({ success: true });;
    });
  },

  get: (req: Request, res: Response) => {
    UserModel.findById(req.params.id, (err: Error, data: any) => {
      if (err) return res.status(500).json({ success: false });;
      if (!data) return res.status(404).json(notFound);
      return res.status(200).json(data);
    });
  },

  update: (req: Request, res: Response) => {
    UserModel.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) return res.status(500).json({ success: false });;
      return res.status(200).json({ success: true });;
    });
  },

  delete: (req: Request, res: Response) => {
    UserModel.findByIdAndDelete(req.params.id, {}, (err) => {
      if (err) return res.status(500).json({ success: false });;
      return res.status(200).json({ success: true });;
    });
  },

  list: (req: Request, res: Response) => {
    UserModel.find({}, (err: Error, data: any) => {
      if (err) return res.status(500).json({ success: false });;
      return res.json(data);
    });
  },

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
        const accessToken = signAccess({
          id: data._id,
          avatar: data.avatar,
          email: data.email,
          roles: data.roles,
          username: data.username
        });

        const refreshToken = signRefresh({ 
          id: data._id 
        });
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
          if (data.refreshToken === token) {
            if (user) {
              delete user.iat;
              delete user.exp;
              const refreshedToken = signAccess(user);

              return res.status(200).json({ success: true, accessToken: refreshedToken });
            }
          }

          return res.status(401).json(unauthorized);
        });
    });
  }
}
