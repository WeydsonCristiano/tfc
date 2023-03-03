import { Router } from 'express';
import LeaderboardController from '../controller/LeaderBoardController';

const leaderRouter = Router();

leaderRouter.get('/home', LeaderboardController.getStatusHome);

export default leaderRouter;
