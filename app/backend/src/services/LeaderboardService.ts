import MatchService from './MatchService';
import { vitoriaHome, derrotaHome, empateHome } from '../utis/FunctionHome';
import { TabInter } from '../interface/tabInter';

interface TeamStats {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
}

const verificaResultado = (partida: any) => {
  if (partida.homeTeamGoals > partida.awayTeamGoals) {
    return vitoriaHome(partida);
  }
  if (partida.homeTeamGoals < partida.awayTeamGoals) {
    return derrotaHome(partida);
  }
  return empateHome(partida);
};

const zeraTimes = (e: TabInter) => ({
  name: e.teamName?.name ?? 'Sem nome',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
});

export default class LeaderboardService {
  static async getStatusHome() {
    const respHome = await MatchService.listInprogressOff();
    const result = respHome.reduce((acc: Record<string, TeamStats>, p) => {
      const e = verificaResultado(p);
      const teamName = e.teamName?.name;
      const team = acc[teamName] || zeraTimes(e);
      team.totalPoints += e.teamName?.points ?? 0;
      team.totalGames += e.teamName?.jogo ?? 0;
      team.totalVictories += e.teamName?.vitoria ?? 0;
      team.totalDraws += e.teamName?.empate ?? 0;
      team.totalLosses += e.teamName?.derrota ?? 0;
      team.goalsFavor += e.teamName?.goalsAfavor ?? 0;
      team.goalsOwn += e.teamName?.goalsContra ?? 0;
      acc[e.teamName.name] = team;
      return acc;
    }, {});
    console.log(result);
    const finalResult = Object.values(result);
    return finalResult;
  }
}
