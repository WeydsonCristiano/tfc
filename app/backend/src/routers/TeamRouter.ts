import { Router } from 'express';
import TeamController from '../controller/TeamController';

const teamRouter = Router();

teamRouter.get('teams', TeamController.findAll);

export default teamRouter;
