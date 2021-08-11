import { Request, Response } from 'express';
//import { createHmac } from 'crypto';
import dotenv from 'dotenv';
import { UserModel } from '../models/user';

dotenv.config();
const secretKey = String(process.env.SECRET_KEY);

export const User = {
  create: (req: Request, res: Response) => {
    if(!req.body) return res.status(500).send('An error occurred.');
    const doc = new UserModel(req.body);
    doc.save();
    console.log(req.body);
    return res.status(200).send('Success');
    //createHmac('sha256', secretKey).update(password).digest('hex');
  },

  get: (req: Request, res: Response) => {
    UserModel.findById(req.params.id, (err: Error, data: {}) => {
      if(err) return res.status(500).send('An error occurred.');
      return res.status(200).send(data);
    });
  },

  update: (req: Request, res: Response) => {
    UserModel.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) return res.status(500).send('An error occurred.');
      return res.status(200).send('Success');
    });
  },

  delete: (req: Request, res: Response) => {
    UserModel.findByIdAndDelete(req.params.id, {}, (err) => {
      if(err) return res.status(500).send('An error occurred.');
      return res.status(200).send('Success');
    });
  },

  list: (req: Request, res: Response) => {
    UserModel.find({}, (err: Error, data: {}) => {
      if(err) return res.status(500).send('An error occurred.');
      return res.status(200).send(data);
    });
  }
}
