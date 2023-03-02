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
      throw new GenericError('It is not possible to create a match with two equal teams', 422);
    }
    if (!homeTeamId || !awayTeamId) {
      throw new GenericError('There is no team with such id!', 404);
    }
    const matchersUpdate = await Match.create({ ...body, inProgress: true });
    return { status: 201, message: matchersUpdate };
  };
}

export default MatchService;
