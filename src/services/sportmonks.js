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

function normalizeData(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return payload?.data || payload || null;
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
