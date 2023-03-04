import { BOOLEAN, INTEGER, Model } from 'sequelize';
import Team from './Team';
import db from '.';

class Match extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamid: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    homeTeamId: {
      type: INTEGER,
      field: 'home_team_id',
    },
    homeTeamGoals: {
      type: INTEGER,
      field: 'home_team_goals',
    },
    awayTeamId: {
      type: INTEGER,
      field: 'away_team_id',
    },
    awayTeamGoals: {
      type: INTEGER,
      field: 'away_team_goals',
    },
    inProgress: {
      type: BOOLEAN,
      field: 'in_progress',
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);

Match.belongsTo(Team, { foreignKey: 'home_team_id', as: 'homeTeam' });
Match.belongsTo(Team, { foreignKey: 'away_team_id', as: 'awayTeam' });
Team.hasMany(Match, { foreignKey: 'home_team_id', as: 'homeTeam' });
Team.hasMany(Match, { foreignKey: 'away_team_id', as: 'awayTeam' });

export default Match;
