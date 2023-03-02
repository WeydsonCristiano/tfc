import { Router, Request, Response } from 'express';
import MatchController from '../controller/MatchController';
import validateToken from '../middleware/validationToken';

const matchRouter = Router();

matchRouter.get('/', (req: Request, res: Response) => {
  if (req.query.inProgress === 'true') {
    return MatchController.listInprogressOn(req, res);
  }
  if (req.query.inProgress === 'false') {
    return MatchController.listInprogressOff(req, res);
  }
  return MatchController.findAll(req, res);
});

matchRouter.patch('/:id', validateToken, (req: Request, res: Response) =>
  MatchController.updateMatchers(req, res));

matchRouter.patch('/:id/finish', validateToken, (req: Request, res: Response) =>
  MatchController.finish(req, res));

matchRouter.post('/', validateToken, (req: Request, res: Response) =>
  MatchController.create(req, res));

export default matchRouter;
