import { Model } from 'mongoose';
import { Request, Response } from 'express';

export function create(model: Model<any>) {
  return (req: Request, res: Response) => {
    if (!req.body) return res.status(500).json({ success: false });;
    new model(req.body).save((err: Error) => {
      if (err) return res.status(500).json({ success: false });;
      return res.status(200).json({ success: true });;
    });
  }
}

export function get(model: Model<any>) {
  return (req: Request, res: Response) => {
    model.findById(req.params.id, (err: Error, data: any) => {
      if (err) return res.status(500).json({ success: false });;
      if (!data) return res.status(404).json({ success: false, message: 'Not Found' });
      return res.status(200).json(data);
    });
  }
}

export function update(model: Model<any>) {
  return (req: Request, res: Response) => {
    model.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) return res.status(500).json({ success: false });;
      return res.status(200).json({ success: true });;
    });
  }
}

export function remove(model: Model<any>) {
  return (req: Request, res: Response) => {
    model.findByIdAndDelete(req.params.id, {}, (err) => {
      if (err) return res.status(500).json({ success: false });;
      return res.status(200).json({ success: true });;
    });
  }
}

export function list(model: Model<any>) {
  return (req: Request, res: Response) => {
    model.find({}, (err: Error, data: any) => {
      if (err) return res.status(500).json({ success: false });;
      return res.status(200).json(data);
    });
  }
}
