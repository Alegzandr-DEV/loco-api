import { Request, Response } from 'express';
import { UserModel } from '../models/user';
import { User as Data } from '../models/types';

export const User = {
  create: (req: Request, res: Response) => {
    if(!req.body) return res.status(500).json({ message: 'An error occurred.' });
    new UserModel(req.body).save();
    return res.status(200).json({ message: 'Success.' });
  },

  get: (req: Request, res: Response) => {
    UserModel.findById(req.params.id, (err: Error, data: Data) => {
      if(err) return res.status(500).json({ message: 'An error occurred.' });
      return res.status(200).json(data);
    });
  },

  update: (req: Request, res: Response) => {
    UserModel.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) return res.status(500).json({ message: 'An error occurred.' });
      return res.status(200).json({ message: 'Success.' });
    });
  },

  delete: (req: Request, res: Response) => {
    UserModel.findByIdAndDelete(req.params.id, {}, (err) => {
      if(err) return res.status(500).json({ message: 'An error occurred.' });
      return res.status(200).json({ message: 'Success.' });
    });
  },

  list: (req: Request, res: Response) => {
    UserModel.find({}, (err: Error, data: Data) => {
      if(err) return res.status(500).json({ message: 'An error occurred.' });
      return res.status(200).json(data);
    });
  }
}
