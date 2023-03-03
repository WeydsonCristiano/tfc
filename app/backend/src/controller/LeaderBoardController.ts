import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  static async getStatusHome(_req: Request, _res: Response) {
    await LeaderboardService.getStatusHome('home');
  }
}
