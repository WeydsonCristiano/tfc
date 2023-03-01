import { Router } from 'express';
import TeamController from '../controller/TeamController';

const teamRouter = Router();

teamRouter.get('/', TeamController.findAll);
teamRouter.get('/:id', TeamController.findOne);

export default teamRouter;
