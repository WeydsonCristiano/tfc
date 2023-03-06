import { Router, Request, Response } from 'express';
import LeaderboardController from '../controller/LeaderBoardController';
import MatchService from '../services/MatchService';

const leaderRouter = Router();

leaderRouter.get('/home', (req: Request, res: Response) => {
  LeaderboardController.getStatusHome(req, res);
});

leaderRouter.get('/home/test', async (_req: Request, res: Response) => {
  const test = await MatchService.funWin();
  return res.status(200).json(test);
});

export default leaderRouter;
