import MatchService from './MatchService';
import { vitoriaHome, derrotaHome, empateHome } from '../utis/FunctionHome';
import { TabInter } from '../interface/tabInter';

interface TeamStats {
  name: string;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  totalPoints: number;
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
  name: e.name,
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
});

export default class LeaderboardService {
  static async zeraClassHome() {
    const respHome = await MatchService.listInprogressOff();
    const test = respHome.map((p) => verificaResultado(p));
    const newArray: TeamStats[] = [];
    test.forEach((element, index, arr) => {
      if (element.name === arr[index].name) {
        newArray.push(zeraTimes(element));
      }
    });
    return newArray.filter((element, index) => {
      for (let i = index + 1; i < newArray.length; i += 1) {
        if (element.name === newArray[i].name) {
          return false;
        }
      }
      return true;
    });
  }

  static async getStatusHome() {
    const classIntial = await LeaderboardService.zeraClassHome();
    const respHome = await MatchService.listInprogressOff();
    const matchResult = respHome.map((p) => verificaResultado(p));
    const classificacaoAtualizada = classIntial.forEach((team) => {
      matchResult.forEach((element) => {
        if (element.name === team.name) {
          team.totalPoints += element.points ?? 0;
          team.totalGames += element.jogo ?? 0;
          team.totalVictories += element.vitoria ?? 0;
          team.totalDraws += element.empate ?? 0;
          team.totalLosses += element.derrota ?? 0;
          team.goalsFavor += element.goalsAfavor ?? 0;
          team.goalsOwn += element.goalsContra ?? 0;
        }
      });
    });
    console.log('*classinitial*', classIntial[0]);
    return classificacaoAtualizada;
  }
}
