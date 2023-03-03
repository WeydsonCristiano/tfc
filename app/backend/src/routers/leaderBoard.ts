import { Router } from 'express';
import LeaderboardController from '../controller/LeaderBoardController';

const loginRouter = Router();

loginRouter.get('/leaderboard/home', LeaderboardController.getStatusHome);

export default loginRouter;
