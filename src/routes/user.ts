import { Application, Request, Response } from 'express';
import { User } from '../controllers';
import { auth } from '../middlewares';

export const user = {
  router: function(app: Application) {
    app.get('/users/:id', auth, (req: Request, res: Response) => {
      User.get(req, res);
    });

    app.post('/users', (req: Request, res: Response) => {
      User.create(req, res);
    });

    app.put('/users/:id', auth, (req: Request, res: Response) => {
      User.update(req, res);
    });

    app.delete('/users/:id', auth, (req: Request, res: Response) => {
      User.delete(req, res);
    });

    app.get('/users', auth, (req: Request, res: Response) => {
      User.list(req, res);
    });

    app.post('/auth/signin', (req: Request, res: Response) => {
      User.signIn(req, res);
    });
  }
};
