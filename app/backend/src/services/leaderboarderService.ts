import LeaderBoardServiceHome from './LeaderboardServiceHome';
import LeaderBoardServiceAway from './LeaderBoardServiceAway';
import TeamStats from '../interface/TeamStats';

export default class LeaderBoardService {
  static sortMatch(leaderBoard: TeamStats[]) {
    return leaderBoard.sort(
      (a, b) =>
        b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn,
    );
  }

  static effec = (team: TeamStats, team2: TeamStats) =>
    (
      ((team.totalPoints + team2.totalPoints) / ((team.totalGames + team2.totalGames) * 3)) * 100)
      .toFixed(2);

  static ifTeams(team: TeamStats, team2: TeamStats): TeamStats {
    return {
      name: team.name,
      totalPoints: team.totalPoints + team2.totalPoints,
      totalGames: team.totalGames + team2.totalGames,
      totalVictories: team.totalVictories + team2.totalVictories,
      totalDraws: team.totalDraws + team2.totalDraws,
      totalLosses: team.totalLosses + team2.totalLosses,
      goalsFavor: team.goalsFavor + team2.goalsFavor,
      goalsOwn: team.goalsOwn + team2.goalsOwn,
      goalsBalance: team.goalsBalance + team2.goalsBalance,
      efficiency: LeaderBoardService.effec(team, team2),
    };
  }

  static async getLeaderBoard() {
    const respH = await LeaderBoardServiceHome.getLeaderBoardHome();
    const resAw = await LeaderBoardServiceAway.getLeaderBoardAway();
    const result = respH.map((team) => resAw.map((team2) => {
      if (team.name === team2.name) return LeaderBoardService.ifTeams(team, team2);
      return undefined;
    }));
    const resp = result.flat().filter((team) => team !== undefined);
    return LeaderBoardService.sortMatch(resp as unknown as TeamStats[]);
  }
}
