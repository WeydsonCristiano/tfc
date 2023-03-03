import TeamService from './TeamsService';

export default class LeaderboardService {
  static async getStatusHome(type: 'home') {
    console.log('**teste service leaderBoardeService***', type);
    const respTeams = await TeamService.getHomeAwayMatches('home');
    console.log('**teste service leaderBoardeService***', respTeams);
    return (respTeams);
  }
}
