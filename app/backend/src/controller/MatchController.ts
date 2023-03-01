import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  static async findAll(_req: Request, res: Response) {
    try {
      const respMatches = await MatchService.findAll();
      res.status(200).json(respMatches);
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ message: error.message });
    }
  }
}

export default MatchController;
