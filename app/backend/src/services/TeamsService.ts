import GenericError from '../erros/GenericError';
import Team from '../database/models/Team';
// import Match from '../database/models/Match';

export default class TeamService {
  static findAll = async () => {
    const fullTeams = await Team.findAll();
    return fullTeams;
  };

  static findOne = async (id: number) => {
    const team = await Team.findByPk(id);
    if (!team) throw new GenericError('No team found', 404);
    return team;
  };

  // static testsFunc = async (
  //   type: 'homeMatches' | 'awayMatches',
  // ) => Team.findAll({ include: [{
  //   model: Match,
  //   as: type,
  //   attributes: ['homeTeamGoals', 'awayTeamGoals'],
  //   where: { inProgress: false },
  // }] });
}
