import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  static async getStatusHome(req: Request, res: Response) {
    const { id } = req.params;
    const respHome = await LeaderboardService.getStatusHome(Number(id));
    res.status(200).json(respHome);
  }
}
