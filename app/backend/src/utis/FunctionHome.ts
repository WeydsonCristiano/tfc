const zeraOjeto = () => {
  const obj: any = {
    name: '',
    points: 0,
    vitoria: 0,
    jogo: 0,
    derrota: 0,
    empate: 0,
    goalsAfavor: 0,
    goalsContra: 0,
    saldoGoals: 0,
  };
  return obj;
};

const vitoriaHome = (e: any) => {
  const obj = zeraOjeto();
  obj.name = e.homeTeam.teamName;
  obj.points = 3;
  obj.vitoria = 1;
  obj.jogo = 1;
  obj.goalsAfavor = e.homeTeamGoals;
  obj.goalsContra = e.awayTeamGoals;
  obj.saldoGoals = e.homeTeamGoals - e.awayTeamGoals;
  return obj;
};

const derrotaHome = (e: any) => {
  const obj = zeraOjeto();
  obj.name = e.homeTeam.teamName;
  obj.jogo = 1;
  obj.derrota = 1;
  obj.goalsAfavor = e.homeTeamGoals;
  obj.goalsContra = e.awayTeamGoals;
  obj.saldoGoals = e.homeTeamGoals - e.awayTeamGoals;
  return obj;
};
const empateHome = (e: any) => {
  const obj = zeraOjeto();
  obj.name = e.homeTeam.teamName;
  obj.points = 1;
  obj.jogo = 1;
  obj.goalsAfavor = e.homeTeamGoals;
  obj.goalsContra = e.awayTeamGoals;
  obj.saldoGoals = e.homeTeamGoals - e.awayTeamGoals;
  return obj;
};

export { vitoriaHome, derrotaHome, empateHome };
