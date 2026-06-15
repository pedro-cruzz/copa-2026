// Resultados dos jogos da Copa 2026
// Formato: { matchId, homeScore, awayScore }
// Os matchIds correspondem aos índices no array de matches do tournament.js

export const matchResults = [
  // Rodada 1 - Grupo A
  { matchId: 0, homeScore: 2, awayScore: 0 }, // México 2x0 África do Sul
  { matchId: 1, homeScore: 2, awayScore: 1 }, // Coreia do Sul 2x1 República Tcheca
  
  // Rodada 1 - Grupo B
  { matchId: 2, homeScore: 1, awayScore: 1 }, // Canadá 1x1 Bósnia e Herzegovina
  { matchId: 4, homeScore: 1, awayScore: 1 }, // Catar 1x1 Suíça
  
  // Rodada 1 - Grupo C
  { matchId: 5, homeScore: 1, awayScore: 1 }, // Brasil 1x1 Marrocos
  { matchId: 6, homeScore: 0, awayScore: 1 }, // Haiti 0x1 Escócia
  
  // Rodada 1 - Grupo D
  { matchId: 3, homeScore: 4, awayScore: 1 }, // Estados Unidos 4x1 Paraguai
  { matchId: 7, homeScore: 2, awayScore: 0 }, // Austrália 2x0 Turquia

  // Rodada 1 - Grupo E
  { matchId: 8, homeScore: 7, awayScore: 1 }, // Alemanha 7x1 Curaçao
  { matchId: 10, homeScore: 1, awayScore: 0 }, // Costa do Marfim 1x0 Equador

  // Rodada 1 - Grupo F
  { matchId: 9, homeScore: 2, awayScore: 2 }, // Holanda 2x2 Japão
  { matchId: 11, homeScore: 5, awayScore: 1 }, // Suécia 5x1 Tunísia
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
