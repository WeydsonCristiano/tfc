import Team from '../database/models/Team';
import Match from '../database/models/Match';

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
}

export default MatchService;
