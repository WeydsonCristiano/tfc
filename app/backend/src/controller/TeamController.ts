import { Request, Response } from 'express';
import TeamService from '../services/TeamsService';

class TeamController {
  static async findAll(_req: Request, res: Response) {
    const respteams = await TeamService.findAll();
    res.status(200).json(respteams);
  }

  static async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const respId = await TeamService.findOne(Number(id));
    res.status(200).json(respId);
  }
}

export default TeamController;
