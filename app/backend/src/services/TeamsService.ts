import Team from '../database/models/Team';

export default class TeamService {
  static findAll = async () => Team.findAll();
  static findOne = async (id: number) => Team.findByPk(id);
}
