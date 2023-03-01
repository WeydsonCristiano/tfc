import Team from '../database/models/Team';

export default class TeamService {
  static findAll = async () => {
    const fullTeams = await Team.findAll();
    return fullTeams;
  };

  static findOne = async (id: number) => {
    const team = await Team.findByPk(id);
    if (!team) throw new Error('No team found');
    return team;
  };
}
