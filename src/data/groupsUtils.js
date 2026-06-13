import { matches, groups, getTeamGroup } from "./tournament";
import { matchResults, getMatchResult } from "./matchResults";

/**
 * Calcula as estatísticas de um time com base nos seus resultados
 */
export function calculateTeamStats(teamName) {
  const teamMatches = matches.filter(m => m.home === teamName || m.away === teamName);
  
  let stats = {
    name: teamName,
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0
  };

  teamMatches.forEach((match) => {
    const result = getMatchResult(matches.indexOf(match));
    
    if (!result) {
      // Jogo ainda não tem resultado
      return;
    }

    stats.played += 1;
    const isHome = match.home === teamName;
    const goalsFor = isHome ? result.homeScore : result.awayScore;
    const goalsAgainst = isHome ? result.awayScore : result.homeScore;

    stats.goalsFor += goalsFor;
    stats.goalsAgainst += goalsAgainst;

    if (goalsFor > goalsAgainst) {
      stats.wins += 1;
      stats.points += 3;
    } else if (goalsFor === goalsAgainst) {
      stats.draws += 1;
      stats.points += 1;
    } else {
      stats.losses += 1;
    }
  });

  stats.goalDifference = stats.goalsFor - stats.goalsAgainst;

  return stats;
}

/**
 * Calcula o standings (classificação) de um grupo
 */
export function calculateGroupStandings(groupName) {
  const groupTeams = groups[groupName] || [];
  
  const standings = groupTeams
    .map(teamName => calculateTeamStats(teamName))
    .sort((a, b) => {
      // Ordena por: pontos (desc) -> saldo de gols (desc) -> gols a favor (desc)
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });

  return standings;
}

/**
 * Calcula os standings de todos os grupos
 */
export function calculateAllGroupsStandings() {
  const standings = {};
  
  Object.keys(groups).forEach(groupName => {
    standings[groupName] = calculateGroupStandings(groupName);
  });

  return standings;
}

/**
 * Formata um array de estatísticas para exibição
 */
export function formatStandingsForDisplay(standings) {
  return standings.map((stat, index) => ({
    ...stat,
    position: index + 1
  }));
}
