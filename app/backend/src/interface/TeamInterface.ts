export default interface TeamInter {
  id: number;
  teamName: string;
  homeMatches?: goals [];
  awayMatches?: goals [];
}
interface goals {
  homeTeamGoals: number,
  awayTeamGoals: number
}
