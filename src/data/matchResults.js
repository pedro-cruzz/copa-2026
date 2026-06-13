// Resultados dos jogos da Copa 2026
// Formato: { matchId, homeScore, awayScore }
// Os matchIds correspondem aos índices no array de matches do tournament.js

export const matchResults = [
  // Rodada 1 - Grupo A
  { matchId: 0, homeScore: 1, awayScore: 0 }, // México 1x0 África do Sul
  { matchId: 1, homeScore: 2, awayScore: 0 }, // Coreia do Sul 2x0 República Tcheca
  
  // Rodada 1 - Grupo B
  { matchId: 2, homeScore: 0, awayScore: 2 }, // Canadá 0x2 Bósnia e Herzegovina
  
  // Rodada 1 - Grupo C
  { matchId: 5, homeScore: 3, awayScore: 1 }, // Brasil 3x1 Marrocos
  { matchId: 6, homeScore: 1, awayScore: 1 }, // Haiti 1x1 Escócia
  
  // Rodada 1 - Grupo D
  { matchId: 3, homeScore: 2, awayScore: 1 }, // Estados Unidos 2x1 Paraguai
  
  // Rodada 2 - Grupo A
  { matchId: 25, homeScore: 0, awayScore: 1 }, // República Tcheca 0x1 África do Sul
  { matchId: 28, homeScore: 2, awayScore: 1 }, // México 2x1 Coreia do Sul
];

// Função auxiliar para adicionar resultado de um jogo
export function addMatchResult(matchId, homeScore, awayScore) {
  const existing = matchResults.find(r => r.matchId === matchId);
  if (existing) {
    existing.homeScore = homeScore;
    existing.awayScore = awayScore;
  } else {
    matchResults.push({ matchId, homeScore, awayScore });
  }
}

export function getMatchResult(matchId) {
  return matchResults.find(r => r.matchId === matchId);
}
