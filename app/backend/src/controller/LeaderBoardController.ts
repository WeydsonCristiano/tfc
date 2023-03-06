import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  static async getLeaderBoardHome(_req: Request, res: Response) {
    const respHome = await LeaderboardService.getLeaderBoardHome();
    return res.status(200).json(respHome);
  }
}
