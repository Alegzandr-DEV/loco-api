import { Application, Request, Response } from 'express';
import { Guest } from '../controllers';
import { auth } from '../middlewares';

export const guest = {
  router: function(app: Application) {
    app.get('/guests/:id', auth, (req: Request, res: Response) => {
      Guest.get(req, res);
    });

    app.post('/guests', (req: Request, res: Response) => {
      Guest.create(req, res);
    });

    app.delete('/guests/:id', auth, (req: Request, res: Response) => {
      Guest.delete(req, res);
    });

    app.get('/guests', auth, (req: Request, res: Response) => {
      Guest.list(req, res);
    });

    app.post('/auth/guest', (req: Request, res: Response) => {
      Guest.signIn(req, res);
    });
  }
};
