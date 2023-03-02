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

  static async finish(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await MatchService.finish(Number(id));
      res.status(200).json({ message: 'Finished' });
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ message: error.message });
    }
  }

  static async updateMatchers(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const respUp = await MatchService.updateMatchers(req.body, Number(id));
      res.status(200).json(respUp);
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ message: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const respUp = await MatchService.create(req.body);
      res.status(respUp.status).json(respUp.message);
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ message: error.message });
    }
  }
}

export default MatchController;
