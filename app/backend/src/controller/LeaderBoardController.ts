import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  static async getStatusHome(_req: Request, res: Response) {
    const respHome = await LeaderboardService.getStatusHome();
    return res.status(200).json(respHome);
  }
}
