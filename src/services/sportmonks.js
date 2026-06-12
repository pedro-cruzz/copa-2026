const DEFAULT_PROXY_URL = "/api/sportmonks";
const DEFAULT_WORLD_CUP_LEAGUE_ID = "732";

export const sportmonksConfig = {
  proxyUrl: import.meta.env.VITE_SPORTMONKS_PROXY_URL || DEFAULT_PROXY_URL,
  worldCupLeagueId: import.meta.env.VITE_SPORTMONKS_WORLD_CUP_LEAGUE_ID || DEFAULT_WORLD_CUP_LEAGUE_ID,
  worldCupSeasonId: import.meta.env.VITE_SPORTMONKS_WORLD_CUP_SEASON_ID || ""
};

export function hasSportmonksToken() {
  return true;
}

export function unwrapRelation(value) {
  return value?.data || value || null;
}

export function asArray(value) {
  const unwrapped = unwrapRelation(value);
  return Array.isArray(unwrapped) ? unwrapped : [];
}

function normalizeData(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return payload?.data || payload || null;
}

export function normalizeSportmonksTeamName(name = "") {
  const normalized = String(name)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

  const aliases = {
    "algeria": "argelia",
    "austria": "austria",
    "belgium": "belgica",
    "bosnia and herzegovina": "bosnia e herzegovina",
    "bosnia herzegovina": "bosnia e herzegovina",
    "brazil": "brasil",
    "canada": "canada",
    "cape verde": "cabo verde",
    "colombia": "colombia",
    "curacao": "curacao",
    "czech republic": "republica tcheca",
    "democratic republic of the congo": "rd congo",
    "dr congo": "rd congo",
    "egypt": "egito",
    "england": "inglaterra",
    "france": "franca",
    "germany": "alemanha",
    "ghana": "gana",
    "ivory coast": "costa do marfim",
    "cote d ivoire": "costa do marfim",
    "japan": "japao",
    "jordan": "jordania",
    "mexico": "mexico",
    "morocco": "marrocos",
    "netherlands": "holanda",
    "new zealand": "nova zelandia",
    "norway": "noruega",
    "panama": "panama",
    "paraguay": "paraguai",
    "portugal": "portugal",
    "qatar": "catar",
    "saudi arabia": "arabia saudita",
    "scotland": "escocia",
    "senegal": "senegal",
    "south africa": "africa do sul",
    "south korea": "coreia do sul",
    "spain": "espanha",
    "sweden": "suecia",
    "switzerland": "suica",
    "tunisia": "tunisia",
    "turkey": "turquia",
    "turkiye": "turquia",
    "united states": "estados unidos",
    "united states of america": "estados unidos",
    "usa": "estados unidos",
    "uzbekistan": "uzbequistao"
  };

  return aliases[normalized] || normalized;
}

export function getParticipantByLocation(participants, location, fallbackIndex) {
  return (
    participants.find((participant) => {
      const metaLocation = participant?.meta?.location || participant?.pivot?.location || participant?.location;
      return metaLocation === location;
    }) || participants[fallbackIndex]
  );
}

export function getParticipantScore(scores, participantId) {
  const scoreRows = asArray(scores).filter((row) => String(row?.participant_id) === String(participantId));
  const currentScore =
    scoreRows.find((row) => row?.description === "CURRENT") ||
    scoreRows.find((row) => row?.type?.name === "Current") ||
    scoreRows.find((row) => row?.type?.code === "current") ||
    scoreRows[scoreRows.length - 1];

  const score = currentScore?.score;

  if (typeof score === "number" || typeof score === "string") {
    return score;
  }

  return score?.goals ?? score?.participant ?? score?.home ?? "-";
}

export function getFixtureTeams(fixture) {
  const participants = asArray(fixture?.participants).filter((participant) => !participant?.placeholder);
  const home = getParticipantByLocation(participants, "home", 0);
  const away = getParticipantByLocation(participants, "away", 1);

  return { participants, home, away };
}

export function getFixtureState(fixture) {
  const state = unwrapRelation(fixture?.state);
  return state?.short_name || state?.name || fixture?.state_id || fixture?.state || "Status";
}

export function isFixtureInPlay(fixture) {
  const state = unwrapRelation(fixture?.state);
  const stateText = [state?.short_name, state?.name, state?.developer_name, fixture?.state]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return /live|1st|2nd|half|break|extra|penalties|inplay|in play/.test(stateText);
}

export function getFixtureMinute(fixture) {
  const periods = asArray(fixture?.periods);
  const activePeriod = periods.find((period) => period?.ended === null || period?.ticking);

  if (activePeriod?.minutes) {
    return `${activePeriod.minutes}'`;
  }

  return fixture?.time?.minute ? `${fixture.time.minute}'` : "";
}

export function getFixtureScore(fixture) {
  const { home, away } = getFixtureTeams(fixture);

  return {
    home,
    away,
    homeScore: getParticipantScore(fixture?.scores, home?.id),
    awayScore: getParticipantScore(fixture?.scores, away?.id)
  };
}

export function fixtureIncludesTeam(fixture, teamName) {
  const target = normalizeSportmonksTeamName(teamName);
  return getFixtureTeams(fixture).participants.some((participant) => {
    const names = [participant?.name, participant?.short_code, participant?.country?.name].filter(Boolean);
    return names.some((name) => normalizeSportmonksTeamName(name) === target);
  });
}

export function fixturesForLocalMatch(fixtures, match) {
  return fixtures.find((fixture) => fixtureIncludesTeam(fixture, match.home) && fixtureIncludesTeam(fixture, match.away));
}

async function requestSportmonks(path, params = {}) {
  const url = new URL(sportmonksConfig.proxyUrl, window.location.origin);
  url.searchParams.set("path", path);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url);
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload?.message || payload?.error || payload?.errors?.message || `Erro Sportmonks ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

export async function getWorldCupLiveScores() {
  const payload = await requestSportmonks("/livescores/inplay", {
    filters: `fixtureLeagues:${sportmonksConfig.worldCupLeagueId}`,
    include: "scores;participants;events;lineups;state;periods;statistics.type;venue"
  });

  return normalizeData(payload) || [];
}

export async function getLatestWorldCupLiveScores() {
  const payload = await requestSportmonks("/livescores/latest", {
    filters: `fixtureLeagues:${sportmonksConfig.worldCupLeagueId}`,
    include: "scores;participants;events;lineups;state;periods;statistics.type;venue"
  });

  return normalizeData(payload) || [];
}

export async function getWorldCupScoreboard() {
  const [liveScores, latestScores] = await Promise.allSettled([
    getWorldCupLiveScores(),
    getLatestWorldCupLiveScores()
  ]);
  const fixtures = [
    ...(liveScores.status === "fulfilled" ? liveScores.value : []),
    ...(latestScores.status === "fulfilled" ? latestScores.value : [])
  ];
  const uniqueFixtures = new Map();

  fixtures.filter((fixture) => fixture && !fixture.placeholder).forEach((fixture) => {
    uniqueFixtures.set(fixture.id, fixture);
  });

  if (liveScores.status === "rejected" && latestScores.status === "rejected") {
    throw liveScores.reason;
  }

  return [...uniqueFixtures.values()];
}

export async function getFixtureCenter(fixtureId) {
  const payload = await requestSportmonks(`/fixtures/${fixtureId}`, {
    include: "events;scores;state;participants;lineups;statistics.type;periods;venue"
  });

  return normalizeData(payload);
}

export async function getTeamSquadByTeamId(teamId) {
  const payload = await requestSportmonks(`/squads/teams/${teamId}`, {
    include: "player;position;detailedPosition"
  });

  return normalizeData(payload) || [];
}

export async function getWorldCupTeamsBySeason() {
  if (!sportmonksConfig.worldCupSeasonId) {
    throw new Error("Configure VITE_SPORTMONKS_WORLD_CUP_SEASON_ID para listar selecoes por temporada.");
  }

  const payload = await requestSportmonks(`/teams/seasons/${sportmonksConfig.worldCupSeasonId}`, {
    include: "country",
    per_page: "50"
  });

  return normalizeData(payload) || [];
}

export async function getLiveWorldCupStandings() {
  const payload = await requestSportmonks(`/standings/live/leagues/${sportmonksConfig.worldCupLeagueId}`);
  return normalizeData(payload) || [];
}
