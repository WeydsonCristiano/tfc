export interface TabInter {
  name: string;
  totalPoints: number;
  totalGames: number | undefined;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}
