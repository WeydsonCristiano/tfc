import { Request, Response } from 'express';
import TeamService from '../services/TeamsService';

class TeamController {
  static async findAll(_req: Request, res: Response) {
    const teams = await TeamService.findAll();
    res.status(200).json(teams);
  }
}

export default TeamController;
