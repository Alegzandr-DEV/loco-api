import { Request, Response } from 'express';
import { UserModel } from '../models/user';
import { compare, sign } from '../middlewares';

export const User = {
  create: (req: Request, res: Response) => {
    if(!req.body) return res.status(500).json({ message: 'An error occurred.' });
    new UserModel(req.body).save((err) => {
      if (err) return res.status(500).json({ message: 'An error occurred.' });
      return res.status(200).json({ message: 'Success.' });
    });
  },

  get: (req: Request, res: Response) => {
    UserModel.findById(req.params.id, (err: Error, data: any) => {
      if(err) return res.status(500).json({ message: 'An error occurred.' });
      if(!data) return res.status(404).json({ message: 'User not found' });
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
    UserModel.find({}, (err: Error, data: any) => {
      if(err) return res.status(500).json({ message: 'An error occurred.' });
      return res.status(200).json(data);
    });
  },

  login: (req: Request, res: Response) => {
    if(!req.body || !req.body.password) return res.status(500).json({ message: 'An error occurred.' });

    let userData: { username?: string, email?: string } = { username: req.body.username };
    const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(isEmail.test(req.body.username))
      userData = { email: req.body.username };

    UserModel.findOne(userData, (err: Error, data: any) => {
      if(err || !data)
        return res.status(500).json({ message: 'An error occurred.' });
      if(compare(req.body.password, data.password)) 
        return res.status(200).json(sign({ id: data._id }));
      return res.status(401).json({ message: 'Invalid password' });
    });
  }
}
