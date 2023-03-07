import { Router, Request, Response } from 'express';
import LeaderboardController from '../controller/LeaderBoardController';

const leaderRouter = Router();

leaderRouter.get('/', (req: Request, res: Response) => {
  LeaderboardController.getLeaderBoard(req, res);
});

leaderRouter.get('/home', (req: Request, res: Response) => {
  LeaderboardController.getLeaderBoardHome(req, res);
});

leaderRouter.get('/away', (req: Request, res: Response) => {
  LeaderboardController.getLeaderBoardAway(req, res);
});

export default leaderRouter;
