import { Router, Request, Response } from 'express';
import TeamController from '../controller/TeamController';

const teamRouter = Router();

teamRouter.get('/', (req: Request, res: Response) => {
  TeamController.findAll(req, res);
});
teamRouter.get('/:id', (req: Request, res: Response) => {
  TeamController.findOne(req, res);
});

export default teamRouter;
