import TeamStats from '../interface/TeamStats';
import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class LeaderBoardServiceAway {
  static victories(filterMatch: Match[]) {
    return filterMatch.filter(
      (match) => match.awayTeamGoals > match.homeTeamGoals,
    ).length;
  }

  static draws(filterMatch: Match[]) {
    return filterMatch.filter(
      (match) => match.awayTeamGoals === match.homeTeamGoals,
    ).length;
  }

  static losses(filterMatch: Match[]) {
    return filterMatch.filter(
      (match) => match.awayTeamGoals < match.homeTeamGoals,
    ).length;
  }

  static sumFavor(filterMatch: Match[]) {
    return filterMatch.reduce((acc, match) => match.awayTeamGoals + acc, 0);
  }

  static sumOwn(filterMatch: Match[]) {
    return filterMatch.reduce((acc, match) => match.homeTeamGoals + acc, 0);
  }

  static balance(filterMatch: Match[]) {
    return (
      LeaderBoardServiceAway.sumFavor(filterMatch) - LeaderBoardServiceAway.sumOwn(filterMatch)
    );
  }

  static sumPoints(filterMatch: Match[]) {
    return (
      LeaderBoardServiceAway.victories(filterMatch) * 3 + LeaderBoardServiceAway.draws(filterMatch)
    );
  }

  static effec(filterMatch: Match[]) {
    return (
      (LeaderBoardServiceAway.sumPoints(filterMatch) / (filterMatch.length * 3)) * 100).toFixed(2);
  }

  static sortMatch(leaderBoard: TeamStats[]) {
    return leaderBoard.sort((a, b) => (
      b.totalPoints - a.totalPoints || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn));
  }

  static respAway(filterMatch: Match[], teamName: string) {
    return {
      name: teamName,
      totalPoints: LeaderBoardServiceAway.sumPoints(filterMatch),
      totalGames: filterMatch.length,
      totalVictories: LeaderBoardServiceAway.victories(filterMatch),
      totalDraws: LeaderBoardServiceAway.draws(filterMatch),
      totalLosses: LeaderBoardServiceAway.losses(filterMatch),
      goalsFavor: LeaderBoardServiceAway.sumFavor(filterMatch),
      goalsOwn: LeaderBoardServiceAway.sumOwn(filterMatch),
      goalsBalance: LeaderBoardServiceAway.balance(filterMatch),
      efficiency: LeaderBoardServiceAway.effec(filterMatch),
    };
  }

  static async getLeaderBoardAway() {
    const matchList = await Match.findAll({
      where: {
        inProgress: false,
      },
    });
    const teamList = await Team.findAll();
    const away = teamList.map((time) => {
      const filterMatch = matchList.filter(
        (match) => match.homeTeamId === time.id,
      );
      return LeaderBoardServiceAway.respAway(filterMatch, time.teamName);
    });
    console.log('teste', matchList);
    return LeaderBoardServiceAway.sortMatch(away);
  }
}
