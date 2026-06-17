import {
  getApiSportsFixtureEvents,
  getApiSportsFixtureLineups,
  getApiSportsFixtureStatistics,
  getApiSportsHeadToHeadFixtures,
  getApiSportsTeamsByName,
  getApiSportsWorldCupFixtures
} from "./apisports";
import { repairText } from "../utils/text";

const finishedStatus = new Set(["FT", "AET", "PEN"]);
const liveStatus = new Set(["1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"]);

const teamAliases = {
  algeria: "argelia",
  argelia: "argelia",
  argentina: "argentina",
  australia: "australia",
  austria: "austria",
  belgium: "belgica",
  belgica: "belgica",
  "bosnia herzegovina": "bosnia e herzegovina",
  "bosnia and herzegovina": "bosnia e herzegovina",
  "bosnia e herzegovina": "bosnia e herzegovina",
  brazil: "brasil",
  brasil: "brasil",
  canada: "canada",
  "cape verde": "cabo verde",
  "cabo verde": "cabo verde",
  colombia: "colombia",
  curacao: "curacao",
  "czech republic": "republica tcheca",
  czechia: "republica tcheca",
  "republica tcheca": "republica tcheca",
  "cote d ivoire": "costa do marfim",
  "ivory coast": "costa do marfim",
  "costa do marfim": "costa do marfim",
  croatia: "croacia",
  croacia: "croacia",
  "democratic republic of the congo": "rd congo",
  "dr congo": "rd congo",
  "congo dr": "rd congo",
  "rd congo": "rd congo",
  ecuador: "equador",
  equador: "equador",
  egypt: "egito",
  egito: "egito",
  england: "inglaterra",
  inglaterra: "inglaterra",
  france: "franca",
  franca: "franca",
  germany: "alemanha",
  alemanha: "alemanha",
  ghana: "gana",
  gana: "gana",
  haiti: "haiti",
  iran: "ira",
  ira: "ira",
  iraq: "iraque",
  iraque: "iraque",
  japan: "japao",
  japao: "japao",
  jordan: "jordania",
  jordania: "jordania",
  mexico: "mexico",
  morocco: "marrocos",
  marrocos: "marrocos",
  netherlands: "holanda",
  holland: "holanda",
  holanda: "holanda",
  "new zealand": "nova zelandia",
  "nova zelandia": "nova zelandia",
  norway: "noruega",
  noruega: "noruega",
  panama: "panama",
  paraguay: "paraguai",
  paraguai: "paraguai",
  portugal: "portugal",
  qatar: "catar",
  catar: "catar",
  "saudi arabia": "arabia saudita",
  "arabia saudita": "arabia saudita",
  scotland: "escocia",
  escocia: "escocia",
  senegal: "senegal",
  "south africa": "africa do sul",
  "africa do sul": "africa do sul",
  "south korea": "coreia do sul",
  "korea republic": "coreia do sul",
  "coreia do sul": "coreia do sul",
  spain: "espanha",
  espanha: "espanha",
  sweden: "suecia",
  suecia: "suecia",
  switzerland: "suica",
  suica: "suica",
  tunisia: "tunisia",
  turkey: "turquia",
  turkiye: "turquia",
  turquia: "turquia",
  "united states": "estados unidos",
  "united states of america": "estados unidos",
  usa: "estados unidos",
  "estados unidos": "estados unidos",
  uruguay: "uruguai",
  uruguai: "uruguai",
  uzbekistan: "uzbequistao",
  uzbequistao: "uzbequistao"
};

const displayNameAliases = {
  "africa do sul": "Africa do Sul",
  alemanha: "Alemanha",
  "arabia saudita": "Arabia Saudita",
  argelia: "Argelia",
  argentina: "Argentina",
  australia: "Australia",
  austria: "Austria",
  belgica: "Belgica",
  "bosnia e herzegovina": "Bosnia e Herzegovina",
  brasil: "Brasil",
  "cabo verde": "Cabo Verde",
  canada: "Canada",
  catar: "Catar",
  colombia: "Colombia",
  "coreia do sul": "Coreia do Sul",
  "costa do marfim": "Costa do Marfim",
  croacia: "Croacia",
  curacao: "Curacao",
  egito: "Egito",
  equador: "Equador",
  escocia: "Escocia",
  espanha: "Espanha",
  "estados unidos": "Estados Unidos",
  franca: "Franca",
  gana: "Gana",
  haiti: "Haiti",
  holanda: "Holanda",
  inglaterra: "Inglaterra",
  ira: "Ira",
  iraque: "Iraque",
  japao: "Japao",
  jordania: "Jordania",
  marrocos: "Marrocos",
  mexico: "Mexico",
  noruega: "Noruega",
  "nova zelandia": "Nova Zelandia",
  panama: "Panama",
  paraguai: "Paraguai",
  portugal: "Portugal",
  "rd congo": "RD Congo",
  "republica tcheca": "Republica Tcheca",
  senegal: "Senegal",
  suecia: "Suecia",
  suica: "Suica",
  tunisia: "Tunisia",
  turquia: "Turquia",
  uruguai: "Uruguai",
  uzbequistao: "Uzbequistao"
};

const apiSearchNameAliases = {
  "africa do sul": "South Africa",
  alemanha: "Germany",
  "arabia saudita": "Saudi Arabia",
  argelia: "Algeria",
  argentina: "Argentina",
  australia: "Australia",
  austria: "Austria",
  belgica: "Belgium",
  "bosnia e herzegovina": "Bosnia and Herzegovina",
  brasil: "Brazil",
  "cabo verde": "Cape Verde",
  canada: "Canada",
  catar: "Qatar",
  colombia: "Colombia",
  "coreia do sul": "South Korea",
  "costa do marfim": "Ivory Coast",
  croacia: "Croatia",
  curacao: "Curacao",
  egito: "Egypt",
  equador: "Ecuador",
  escocia: "Scotland",
  espanha: "Spain",
  "estados unidos": "USA",
  franca: "France",
  gana: "Ghana",
  haiti: "Haiti",
  holanda: "Netherlands",
  inglaterra: "England",
  ira: "Iran",
  iraque: "Iraq",
  japao: "Japan",
  jordania: "Jordan",
  marrocos: "Morocco",
  mexico: "Mexico",
  noruega: "Norway",
  "nova zelandia": "New Zealand",
  panama: "Panama",
  paraguai: "Paraguay",
  portugal: "Portugal",
  "rd congo": "Congo DR",
  "republica tcheca": "Czech Republic",
  senegal: "Senegal",
  suecia: "Sweden",
  suica: "Switzerland",
  tunisia: "Tunisia",
  turquia: "Turkey",
  uruguai: "Uruguay",
  uzbequistao: "Uzbekistan"
};

function normalizeValue(value = "") {
  return repairText(String(value))
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function normalizeHistoryTeam(team) {
  const rawName = typeof team === "string" ? team : team?.name || team?.teamName || team?.shortName || "";
  const normalized = normalizeValue(rawName);
  return teamAliases[normalized] || normalized;
}

function normalizeFixture(fixture) {
  const statusShort = fixture?.fixture?.status?.short || "";

  return {
    id: fixture?.fixture?.id,
    source: "API-Sports",
    date: fixture?.fixture?.date,
    timestamp: fixture?.fixture?.timestamp,
    venue: fixture?.fixture?.venue?.name || "",
    city: fixture?.fixture?.venue?.city || "",
    home: {
      id: fixture?.teams?.home?.id,
      name: fixture?.teams?.home?.name || "Mandante",
      logo: fixture?.teams?.home?.logo
    },
    away: {
      id: fixture?.teams?.away?.id,
      name: fixture?.teams?.away?.name || "Visitante",
      logo: fixture?.teams?.away?.logo
    },
    goals: {
      home: fixture?.goals?.home,
      away: fixture?.goals?.away
    },
    status: {
      label: fixture?.fixture?.status?.long || statusShort || "Status",
      short: statusShort,
      elapsed: fixture?.fixture?.status?.elapsed,
      finished: finishedStatus.has(statusShort),
      inPlay: liveStatus.has(statusShort)
    },
    statistics: [],
    events: [],
    lineups: [],
    raw: fixture
  };
}

function fixtureIncludesTeam(fixture, teamName) {
  const target = normalizeHistoryTeam(teamName);
  return normalizeHistoryTeam(fixture.home) === target || normalizeHistoryTeam(fixture.away) === target;
}

function getDateKey(dateValue) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const byType = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${byType.year}-${byType.month}-${byType.day}`;
}

function fixtureMatchesLocalMatch(fixture, match) {
  const homeTarget = normalizeHistoryTeam(match.home);
  const awayTarget = normalizeHistoryTeam(match.away);
  const home = normalizeHistoryTeam(fixture.home);
  const away = normalizeHistoryTeam(fixture.away);
  const directMatch = home === homeTarget && away === awayTarget;
  const invertedMatch = home === awayTarget && away === homeTarget;

  return directMatch || invertedMatch;
}

function getApiSearchName(teamName) {
  const normalized = normalizeHistoryTeam(teamName);
  return apiSearchNameAliases[normalized] || repairText(teamName);
}

async function getNationalTeamId(teamName) {
  const teams = await getApiSportsTeamsByName(getApiSearchName(teamName));
  const nationalTeam = teams.find((entry) => entry?.team?.national) || teams[0];

  return nationalTeam?.team?.id || null;
}

async function withFixtureDetails(fixture) {
  const [events, lineups, statistics] = await Promise.allSettled([
    getApiSportsFixtureEvents(fixture.id),
    getApiSportsFixtureLineups(fixture.id),
    getApiSportsFixtureStatistics(fixture.id)
  ]);

  return {
    ...fixture,
    events: events.status === "fulfilled" ? events.value : [],
    lineups: lineups.status === "fulfilled" ? lineups.value : [],
    statistics: statistics.status === "fulfilled" ? statistics.value : []
  };
}

export async function hydrateHistoryFixture(fixture) {
  return withFixtureDetails(fixture);
}

export async function getDetailedWorldCupTeamHistory(teamName) {
  const fixtures = await getApiSportsWorldCupFixtures();
  const teamFixtures = fixtures
    .map(normalizeFixture)
    .filter((fixture) => fixtureIncludesTeam(fixture, teamName))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return Promise.all(teamFixtures.map(withFixtureDetails));
}

export async function getDetailedWorldCupMatchHistory(match) {
  const fixtures = await getApiSportsWorldCupFixtures();
  const normalizedFixtures = fixtures.map(normalizeFixture);
  const fixture =
    normalizedFixtures.find((item) => fixtureMatchesLocalMatch(item, match) && getDateKey(item.date) === match.date) ||
    normalizedFixtures.find((item) => fixtureMatchesLocalMatch(item, match));

  if (fixture) {
    return withFixtureDetails(fixture);
  }

  const [homeTeamId, awayTeamId] = await Promise.all([
    getNationalTeamId(match.home),
    getNationalTeamId(match.away)
  ]);

  if (!homeTeamId || !awayTeamId) {
    throw new Error("A API-Sports ainda nao encontrou os IDs dessas selecoes.");
  }

  const previousFixtures = await getApiSportsHeadToHeadFixtures(homeTeamId, awayTeamId);
  const previousMatches = previousFixtures
    .map(normalizeFixture)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  if (previousMatches.length === 0) {
    throw new Error("A API-Sports ainda nao publicou esse jogo da Copa 2026 nem confrontos anteriores entre as selecoes.");
  }

  return {
    kind: "headToHead",
    source: "API-Sports",
    home: { name: match.home },
    away: { name: match.away },
    status: {
      label: "Confrontos anteriores"
    },
    note: "A API-Sports ainda nao retornou a tabela da Copa 2026; exibindo jogos anteriores entre as selecoes.",
    previousMatches
  };
}

export function getHistoryFixtureTeams(fixture) {
  return {
    home: fixture?.home || { name: "Mandante" },
    away: fixture?.away || { name: "Visitante" }
  };
}

export function getHistoryDisplayTeamName(team) {
  const normalized = normalizeHistoryTeam(team);
  return displayNameAliases[normalized] || repairText(team?.name || team?.teamName || team?.shortName || "Selecao");
}

export function getHistoryScore(fixture) {
  const homeScore = fixture?.goals?.home;
  const awayScore = fixture?.goals?.away;

  if (homeScore === null || homeScore === undefined || awayScore === null || awayScore === undefined) {
    return null;
  }

  return {
    homeScore,
    awayScore,
    isValid: true
  };
}
