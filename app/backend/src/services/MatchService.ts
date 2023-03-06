import { Op, fn, col } from 'sequelize';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IbodyInterface from '../interface/InterBody';
import GenericError from '../erros/GenericError';

class MatchService {
  static findAll = async () => {
    const matchs = await Match.findAll({
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matchs;
  };

  static listInprogressOn = async () => {
    const listOn = await Match.findAll({
      where: {
        inProgress: true,
      },
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return listOn;
  };

  static listInprogressOff = async () => {
    const listOff = await Match.findAll({
      where: {
        inProgress: false,
      },
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return listOff;
  };

  static finish = async (id: number) => {
    const respEnd = await Match.update(
      { inProgress: false },
      { where: { id } },
    );
    return respEnd;
  };

  static updateMatchers = async (body: IbodyInterface, id: number) => {
    const matchersUpdate = await Match.update({ ...body }, { where: { id } });
    return matchersUpdate;
  };

  static create = async ({ ...body }) => {
    const { homeTeamId, awayTeamId } = body;
    if (homeTeamId === awayTeamId) {
      throw new GenericError(
        'It is not possible to create a match with two equal teams',
        422,
      );
    }
    const respTeams = await Team.findAll({
      where: {
        id: { [Op.or]: [homeTeamId, awayTeamId] },
      },
    });

    if (respTeams.length !== 2) {
      throw new GenericError('There is no team with such id!', 404);
    }
    const matchersUpdate = await Match.create({ ...body, inProgress: true });
    return { status: 201, message: matchersUpdate };
  };

  static async funcPlay() {
    const partidas = await Match.findAll({
      attributes: [
        'homeTeamId',
        [fn('COUNT', col('matches.id')), 'totalGames'],
        [fn('SUM', col('home_team_goals')), 'goalsFavor'],
        [fn('SUM', col('away_team_goals')), 'goalsOwn'],
      ],
      group: ['homeTeamId'],
      where: {
        inProgress: false,
      },
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: { exclude: ['id'] } }],
    });
    return partidas;
  }

  static async funWin() {
    const stati = await Match.findAll({
      attributes: [
        'homeTeamId',
        [fn('COUNT', col('home_team_goals')), 'totalVictories'],
      ],
      group: ['homeTeamId'],
      where: {
        inProgress: false,
        homeTeamGoals: {
          [Op.gt]: 'awayTeamGoals',
        },
      },
    });
    return stati;
  }

  static async funDraws() {
    const stati = await Match.findAll({
      attributes: [
        'homeTeamId',
        [fn('COUNT', col('home_team_goals')), 'totalDraws'],
      ],
      group: ['homeTeamId'],
      where: {
        inProgress: false,
        homeTeamGoals: {
          [Op.eq]: 'awayTeamGoals',
        },
      },
    });
    return stati;
  }

  static async funLosses() {
    const stati = await Match.findAll({
      attributes: [
        'homeTeamId',
        [fn('COUNT', col('away_team_goals')), 'totalLosses'],
      ],
      group: ['homeTeamId'],
      where: {
        inProgress: false,
        awayTeamGoals: {
          [Op.gt]: 'homeTeamGoals',
        },
      },
    });
    return stati;
  }
}
export default MatchService;
