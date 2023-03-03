import TeamInter from './TeamInterface';

export default class TeamLeaderBoard {
  private _team: TeamInter;
  private _type: 'home' | 'away';
  public name: string;
  public totalPoints: number;
  public totalGames: number | undefined;
  public totalVictories: number;
  public totalDraws: number;
  public totalLosses: number;
  public goalsFavor: number;
  public goalsOwn: number;
  public goalsBalance: number;
  public efficiency: string;

  constructor(team: TeamInter, type: 'home' | 'away') {
    this._team = team;
    this._type = type;
    this.name = team.teamName;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = '';

    if (type === 'home') this.sumHomePoints();
    if (type === 'away') this.sumAwayPoints();

    this.efficiencyTeams();
    this.sumGoals();
  }

  public sumHomePoints() {
    const { homeMatches, awayMatches } = this._team;
    const matches = this._type === 'home' ? homeMatches : awayMatches;

    matches?.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) {
        this.totalPoints += 3;
        this.totalVictories += 1;
      } else if (homeTeamGoals < awayTeamGoals) {
        this.totalLosses += 1;
      } else {
        this.totalPoints += 1;
        this.totalDraws += 1;
      }
    });
  }

  public sumAwayPoints() {
    const { homeMatches, awayMatches } = this._team;
    const matches = this._type === 'home' ? homeMatches : awayMatches;

    matches?.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (awayTeamGoals > homeTeamGoals) {
        this.totalPoints += 3;
        this.totalVictories += 1;
      } else if (awayTeamGoals < homeTeamGoals) {
        this.totalLosses += 1;
      } else {
        this.totalPoints += 1;
        this.totalDraws += 1;
      }
    });
  }

  public efficiencyTeams() {
    const { homeMatches, awayMatches } = this._team;
    const matches = this._type === 'home' ? homeMatches : awayMatches;

    this.totalGames = matches?.length;

    if (this.totalGames) {
      const efficiency = (this.totalPoints / (this.totalGames * 3)) * 100;
      this.efficiency = efficiency.toFixed(2);
    }
  }

  public sumGoals() {
    const { homeMatches, awayMatches } = this._team;
    const matches = this._type === 'home' ? homeMatches : awayMatches;

    matches?.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      this.goalsFavor += this._type === 'away' ? awayTeamGoals : homeTeamGoals;
      this.goalsOwn += this._type === 'away' ? homeTeamGoals : awayTeamGoals;
    });

    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }
}
