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

  static async listInprogressOn(req: Request, res: Response) {
    try {
      const respOn = await MatchService.listInprogressOn();
      return res.status(200).json(respOn);
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ message: error.message });
    }
  }

  static async listInprogressOff(req: Request, res: Response) {
    try {
      const respOff = await MatchService.listInprogressOff();
      return res.status(200).json(respOff);
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ message: error.message });
    }
  }
}

export default MatchController;
