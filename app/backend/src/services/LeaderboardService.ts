import Match from '../database/models/Match';

export default class LeaderboardService {
  static async getStatusHome() {
    const respTeams = await Match.findAll();
    console.log('**teste service leaderBoardeService***', respTeams);
    return respTeams;
  }
}
