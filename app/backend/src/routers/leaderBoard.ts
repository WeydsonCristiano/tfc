import { Router, Request, Response } from 'express';
import LeaderboardController from '../controller/LeaderBoardController';
// import MatchService from '../services/MatchService';

const leaderRouter = Router();

leaderRouter.get('/home', (req: Request, res: Response) => {
  LeaderboardController.getLeaderBoardHome(req, res);
});

export default leaderRouter;
