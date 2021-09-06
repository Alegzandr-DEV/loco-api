import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { GuestModel } from '../models';
import { get, remove, list, tomorrow, signGuest } from '../utils';

dotenv.config();

export const Guest = {
  create: (req: Request, res: Response) => {
    if (!req.body) return res.status(500).json({ success: false });;

    new GuestModel(req.body).save((err, data) => {
      if (err) return res.status(500).json({ success: false, message: err });;
      return res.status(200).json(data);
    });
  },
  get: get(GuestModel),
  delete: remove(GuestModel),
  list: list(GuestModel),

  signIn: (req: Request, res: Response) => {
    if (!req.body) return res.status(500).json({ success: false });

    GuestModel.findOne(req.body, (err: Error, data: any) => {
      if (err || !data){
        return res.status(500).json({ success: false });
      }
      return res.status(200).cookie('accessCookie', signGuest(data), {
        secure: process.env.COOKIE_SECURE === 'true',
        expires: tomorrow()
      }).json(data);
    });
  }
};
