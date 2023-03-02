import { Request, Response } from 'express';
import TeamService from '../services/TeamsService';

class TeamController {
  static async findAll(_req: Request, res: Response) {
    try {
      const respteams = await TeamService.findAll();
      res.status(200).json(respteams);
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ message: error.message });
    }
  }

  static async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const respId = await TeamService.findOne(Number(id));
    return res.status(200).json(respId);
  }
}

export default TeamController;
