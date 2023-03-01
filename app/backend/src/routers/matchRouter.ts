import { Router, Request, Response } from 'express';
import MatchController from '../controller/MatchController';

const matchRouter = Router();

matchRouter.get('/', (req: Request, res: Response) => {
  if (req.query.inProgress === 'true') return MatchController.listInprogressOn(req, res);
  if (req.query.inProgress === 'false') return MatchController.listInprogressOff(req, res);
  return MatchController.findAll(req, res);
});

export default matchRouter;
