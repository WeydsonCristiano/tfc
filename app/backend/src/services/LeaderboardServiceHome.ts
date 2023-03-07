import TeamStats from '../interface/TeamStats';
import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class LeaderBoardServiceHome {
  static victories(filterMatch: Match[]) {
    return filterMatch.filter(
      (match) => match.homeTeamGoals > match.awayTeamGoals,
    ).length;
  }

  static draws(filterMatch: Match[]) {
    return filterMatch.filter(
      (match) => match.homeTeamGoals === match.awayTeamGoals,
    ).length;
  }

  static losses(filterMatch: Match[]) {
    return filterMatch.filter(
      (match) => match.homeTeamGoals < match.awayTeamGoals,
    ).length;
  }

  static sumFavor(filterMatch: Match[]) {
    return filterMatch.reduce((acc, match) => match.homeTeamGoals + acc, 0);
  }

  static sumOwn(filterMatch: Match[]) {
    return filterMatch.reduce((acc, match) => match.awayTeamGoals + acc, 0);
  }

  static balance(filterMatch: Match[]) {
    return (
      LeaderBoardServiceHome.sumFavor(filterMatch) - LeaderBoardServiceHome.sumOwn(filterMatch)
    );
  }

  static sumPoints(filterMatch: Match[]) {
    return (
      LeaderBoardServiceHome.victories(filterMatch) * 3 + LeaderBoardServiceHome.draws(filterMatch)
    );
  }

  static effec(filterMatch: Match[]) {
    return (
      (LeaderBoardServiceHome.sumPoints(filterMatch) / (filterMatch.length * 3)) * 100).toFixed(2);
  }

  static sortMatch(leaderBoard: TeamStats[]) {
    return leaderBoard.sort((a, b) => (
      b.totalPoints - a.totalPoints || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn));
  }

  static respHome(filterMatch: Match[], teamName: string) {
    return {
      name: teamName,
      totalPoints: LeaderBoardServiceHome.sumPoints(filterMatch),
      totalGames: filterMatch.length,
      totalVictories: LeaderBoardServiceHome.victories(filterMatch),
      totalDraws: LeaderBoardServiceHome.draws(filterMatch),
      totalLosses: LeaderBoardServiceHome.losses(filterMatch),
      goalsFavor: LeaderBoardServiceHome.sumFavor(filterMatch),
      goalsOwn: LeaderBoardServiceHome.sumOwn(filterMatch),
      goalsBalance: LeaderBoardServiceHome.balance(filterMatch),
      efficiency: LeaderBoardServiceHome.effec(filterMatch),
    };
  }

  static async getLeaderBoardHome() {
    const matchList = await Match.findAll({
      where: {
        inProgress: false,
      },
    });
    const teamList = await Team.findAll();
    const home = teamList.map((time) => {
      const filterMatch = matchList.filter(
        (match) => match.homeTeamId === time.id,
      );
      return LeaderBoardServiceHome.respHome(filterMatch, time.teamName);
    });
    return LeaderBoardServiceHome.sortMatch(home);
  }
}
