import { Request, Response } from 'express';
import { UserModel } from '../models/user';
import { User as Data } from '../models/types';

export const User = {
  create: (req: Request, res: Response) => {
    if(!req.body) return res.status(500).send('An error occurred.');
    new UserModel(req.body).save();
    return res.status(200).send('Success');
  },

  get: (req: Request, res: Response) => {
    UserModel.findById(req.params.id, (err: Error, data: Data) => {
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
    UserModel.find({}, (err: Error, data: Data) => {
      if(err) return res.status(500).send('An error occurred.');
      return res.status(200).send(data);
    });
  }
}
