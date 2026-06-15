const DEFAULT_BASE_URL = "https://api.openligadb.de";
const DEFAULT_LEAGUE_SHORTCUT = "wm26";
const DEFAULT_SEASON = "2026";

export const openLigaConfig = {
  baseUrl: import.meta.env.VITE_OPENLIGADB_BASE_URL || DEFAULT_BASE_URL,
  leagueShortcut: import.meta.env.VITE_OPENLIGADB_LEAGUE_SHORTCUT || DEFAULT_LEAGUE_SHORTCUT,
  season: import.meta.env.VITE_OPENLIGADB_SEASON || DEFAULT_SEASON
};

const shortNameAliases = {
  ARG: "argentina",
  AUS: "australia",
  AUT: "austria",
  BEL: "belgica",
  BIH: "bosnia e herzegovina",
  BRA: "brasil",
  CAN: "canada",
  CHE: "suica",
  CIV: "costa do marfim",
  COD: "rd congo",
  COL: "colombia",
  CPV: "cabo verde",
  CUW: "curacao",
  CZE: "republica tcheca",
  DEU: "alemanha",
  DZA: "argelia",
  ECU: "equador",
  EGY: "egito",
  ENG: "inglaterra",
  ESP: "espanha",
  FRA: "franca",
  GHA: "gana",
  HTI: "haiti",
  IRN: "ira",
  IRQ: "iraque",
  JOR: "jordania",
  JPN: "japao",
  KOR: "coreia do sul",
  MAR: "marrocos",
  MEX: "mexico",
  NLD: "holanda",
  NOR: "noruega",
  NZL: "nova zelandia",
  PAN: "panama",
  PAR: "paraguai",
  PRT: "portugal",
  QAT: "catar",
  RSA: "africa do sul",
  SAU: "arabia saudita",
  SCT: "escocia",
  SEN: "senegal",
  SWE: "suecia",
  TUN: "tunisia",
  TUR: "turquia",
  URY: "uruguai",
  USA: "estados unidos",
  UZB: "uzbequistao"
};

const nameAliases = {
  australien: "australia",
  belgien: "belgica",
  brasilien: "brasil",
  deutschland: "alemanha",
  elfenbeinkuste: "costa do marfim",
  frankreich: "franca",
  kanada: "canada",
  marokko: "marrocos",
  mexiko: "mexico",
  niederlande: "holanda",
  paraguay: "paraguai",
  portugal: "portugal",
  schottland: "escocia",
  schweden: "suecia",
  schweiz: "suica",
  sudafrika: "africa do sul",
  sudkorea: "coreia do sul",
  tschechien: "republica tcheca",
  turkei: "turquia"
};

export function normalizeOpenLigaText(text = "") {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function normalizeOpenLigaTeam(team) {
  const shortAlias = shortNameAliases[team?.shortName];

  if (shortAlias) {
    return shortAlias;
  }

  const normalizedName = normalizeOpenLigaText(team?.teamName);
  return nameAliases[normalizedName] || normalizedName;
}

export async function getOpenLigaWorldCupScoreboard() {
  const url = new URL(`/getmatchdata/${openLigaConfig.leagueShortcut}/${openLigaConfig.season}`, openLigaConfig.baseUrl);
  const response = await fetch(url);
  const payload = await response.json().catch(() => []);

  if (!response.ok) {
    throw new Error(`Erro OpenLigaDB ${response.status}`);
  }

  return Array.isArray(payload) ? payload : [];
}

export function getOpenLigaFixtureTeams(fixture) {
  return {
    home: {
      id: fixture?.team1?.teamId,
      name: fixture?.team1?.teamName || "Mandante",
      shortName: fixture?.team1?.shortName,
      image_path: fixture?.team1?.teamIconUrl
    },
    away: {
      id: fixture?.team2?.teamId,
      name: fixture?.team2?.teamName || "Visitante",
      shortName: fixture?.team2?.shortName,
      image_path: fixture?.team2?.teamIconUrl
    }
  };
}

export function getOpenLigaGoals(fixture) {
  return Array.isArray(fixture?.goals) ? fixture.goals : [];
}

export function getOpenLigaScore(match) {
  // Se o jogo não terminou e não está rolando, não deveríamos inventar placar
  const results = Array.isArray(match?.matchResults) ? match.matchResults : [];
  
  // Procurar estritamente pelo resultado final (ID 2)
  let finalResult = results.find((result) => result.resultTypeID === 2);
  
  // Se não achou o ID 2 mas o jogo tá encerrado, procura por texto
  if (!finalResult && match?.matchIsFinished) {
    finalResult = results.find((result) => /endergebnis/i.test(result.resultName || ""));
  }

  // Se o jogo está Ao Vivo, pegamos o resultado atual (geralmente ID 1 ou o último disponível)
  const inPlay = isOpenLigaMatchInPlay(match);

  if (!finalResult && inPlay) {
    finalResult = results[results.length - 1]; 
  }

  const goals = getOpenLigaGoals(match);
  const currentGoal = goals[goals.length - 1] || null;

  if (!match?.matchIsFinished && !inPlay && !finalResult && !currentGoal) {
    return null;
  }

  return {
    homeScore: finalResult?.pointsTeam1 ?? currentGoal?.scoreTeam1 ?? 0,
    awayScore: finalResult?.pointsTeam2 ?? currentGoal?.scoreTeam2 ?? 0,
    isValid: finalResult !== undefined || currentGoal !== null
  };
}

export function isOpenLigaMatchInPlay(match) {
  if (match?.matchIsFinished) {
    return false;
  }

  const start = new Date(match?.matchDateTimeUTC || match?.matchDateTime);

  if (Number.isNaN(start.getTime())) {
    return false;
  }

  const now = new Date();
  const estimatedEnd = new Date(start.getTime() + 120 * 60 * 1000);
  return now >= start && now <= estimatedEnd;
}

export function getOpenLigaFixtureState(match) {
  if (match?.matchIsFinished) {
    return "Encerrado";
  }

  return isOpenLigaMatchInPlay(match) ? "Ao vivo" : "Agendado";
}

export function openLigaFixtureIncludesTeam(fixture, teamName) {
  const target = normalizeOpenLigaText(teamName);
  const home = normalizeOpenLigaTeam(fixture?.team1);
  const away = normalizeOpenLigaTeam(fixture?.team2);

  return home === target || away === target;
}

export function openLigaFixtureForLocalMatch(fixtures, match) {
  const homeTarget = normalizeOpenLigaText(match.home);
  const awayTarget = normalizeOpenLigaText(match.away);

  return fixtures.find((fixture) => {
    const home = normalizeOpenLigaTeam(fixture?.team1);
    const away = normalizeOpenLigaTeam(fixture?.team2);
    const directMatch = home === homeTarget && away === awayTarget;
    const invertedMatch = home === awayTarget && away === homeTarget;
    return directMatch || invertedMatch;
  });
}
