export interface TabInter {
  name: string;
  teamName: any;
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

export interface TabInterHomeAway {
  teamName: any;
  name: string;
  points: number;
  vitoria: number;
  jogo: number;
  derrota: number;
  empate: number;
  goalsAfavor: number;
  goalsContra: number;
  saldoGoals: number;
}
