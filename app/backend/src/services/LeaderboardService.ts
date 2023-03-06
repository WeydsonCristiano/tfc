import MatchService from './MatchService';
import { vitoriaHome, derrotaHome, empateHome } from '../utis/FunctionHome';
import { TabInter, TabInterHomeAway } from '../interface/tabInter';
import TeamStats from '../interface/TeamStats';
import IbodyInterface from '../interface/InterBody';

const verificaResultado = (partida: IbodyInterface) => {
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
    const result: TeamStats[] = [];
    classIntial.forEach((team) => {
      let auxTeam = { ...team };
      matchResult.forEach((element) => {
        auxTeam = LeaderboardService.resultFor(element, auxTeam);
      });
      result.push(auxTeam);
    });
    return result;
  }

  static resultFor(element: TabInterHomeAway, team: TeamStats) {
    const result = { ...team };
    if (element.name === team.name) {
      result.totalPoints += element.points ?? 0;
      result.totalGames += element.jogo ?? 0;
      result.totalVictories += element.vitoria ?? 0;
      result.totalDraws += element.empate ?? 0;
      result.totalLosses += element.derrota ?? 0;
      result.goalsFavor += element.goalsAfavor ?? 0;
      result.goalsOwn += element.goalsContra ?? 0;
    }
    return result;
  }
}
