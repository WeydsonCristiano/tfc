import { Router } from 'express';
import MatchController from '../controller/MatchController';

const matchRouter = Router();

matchRouter.get('/', MatchController.findAll);

export default matchRouter;
