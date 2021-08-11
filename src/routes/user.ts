import { Application, Request, Response } from 'express';
import { User } from '../controllers';

export const user = {
  router: function(app: Application) {
    app.get('/user/:id', (req: Request, res: Response) => {
      User.get(req, res);
    });

    app.post('/user', (req: Request, res: Response) => {
      User.create(req, res);
    });

    app.put('/user/:id', (req: Request, res: Response) => {
      User.update(req, res);
    });

    app.delete('/user/:id', (req: Request, res: Response) => {
      User.delete(req, res);
    });

    app.get('/user', (req: Request, res: Response) => {
      User.list(req, res);
    });
  }
};
