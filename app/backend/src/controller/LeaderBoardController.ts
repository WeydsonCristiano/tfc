import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderboarderService';
import LeaderBoardServiceAway from '../services/LeaderBoardServiceAway';
import LeaderBoardServiceHome from '../services/LeaderboardServiceHome';

export default class LeaderboardController {
  static async getLeaderBoardHome(_req: Request, res: Response) {
    const respHome = await LeaderBoardServiceHome.getLeaderBoardHome();
    return res.status(200).json(respHome);
  }

  static async getLeaderBoardAway(_req: Request, res: Response) {
    const respAway = await LeaderBoardServiceAway.getLeaderBoardAway();
    return res.status(200).json(respAway);
  }

  static async getLeaderBoard(_req: Request, res: Response) {
    const resp = await LeaderBoardService.getLeaderBoard();
    return res.status(200).json(resp);
  }
}
