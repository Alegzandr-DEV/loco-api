import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { GuestModel } from '../models';
import { create, get, update, remove, list, dateWithMonthsDelay } from '../utils';

dotenv.config();

export const Guest = {
  create: (req: Request, res: Response) => {
    if (!req.body) return res.status(500).json({ success: false });;

    new GuestModel(req.body).save((err) => {
      if (err) return res.status(500).json({ success: false });;
      return res.status(200).cookie('accessCookie', '', {
        secure: process.env.COOKIE_SECURE === 'true',
        expires: dateWithMonthsDelay(1)
      }).json({ success: true });;
    });
  },
  get: get(GuestModel),
  update: update(GuestModel),
  delete: remove(GuestModel),
  list: list(GuestModel)
}
