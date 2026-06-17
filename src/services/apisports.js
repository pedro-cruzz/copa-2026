const DEFAULT_PROXY_URL = "/api/apisports";
const DEFAULT_WORLD_CUP_LEAGUE_ID = "1";
const DEFAULT_WORLD_CUP_SEASON = "2026";
const DEFAULT_TIMEZONE = "America/Sao_Paulo";

export const apiSportsConfig = {
  proxyUrl: import.meta.env.VITE_APISPORTS_PROXY_URL || DEFAULT_PROXY_URL,
  worldCupLeagueId: import.meta.env.VITE_APISPORTS_WORLD_CUP_LEAGUE_ID || DEFAULT_WORLD_CUP_LEAGUE_ID,
  worldCupSeason: import.meta.env.VITE_APISPORTS_WORLD_CUP_SEASON || DEFAULT_WORLD_CUP_SEASON,
  timezone: import.meta.env.VITE_APISPORTS_TIMEZONE || DEFAULT_TIMEZONE
};

function normalizeData(payload) {
  if (Array.isArray(payload?.response)) {
    return payload.response;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload)) {
    return payload;
  }

  return [];
}

async function requestApiSports(path, params = {}) {
  const url = new URL(apiSportsConfig.proxyUrl, window.location.origin);
  url.searchParams.set("path", path);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url);
  const payload = await response.json().catch(() => ({}));
  const apiError =
    payload?.message ||
    payload?.errors?.token ||
    payload?.errors?.requests ||
    payload?.errors?.rateLimit;

  if (!response.ok) {
    throw new Error(apiError || `Erro API-Sports ${response.status}`);
  }

  if (apiError) {
    throw new Error(apiError);
  }

  return payload;
}

export async function getApiSportsWorldCupFixtures() {
  const payload = await requestApiSports("/fixtures", {
    league: apiSportsConfig.worldCupLeagueId,
    season: apiSportsConfig.worldCupSeason,
    timezone: apiSportsConfig.timezone
  });

  return normalizeData(payload);
}

export async function getApiSportsWorldCupLiveFixtures() {
  const payload = await requestApiSports("/fixtures", {
    live: apiSportsConfig.worldCupLeagueId,
    timezone: apiSportsConfig.timezone
  });

  return normalizeData(payload);
}

export async function getApiSportsFixtureEvents(fixtureId) {
  const payload = await requestApiSports("/fixtures/events", {
    fixture: fixtureId
  });

  return normalizeData(payload);
}

export async function getApiSportsFixtureLineups(fixtureId) {
  const payload = await requestApiSports("/fixtures/lineups", {
    fixture: fixtureId
  });

  return normalizeData(payload);
}

export async function getApiSportsFixtureStatistics(fixtureId) {
  const payload = await requestApiSports("/fixtures/statistics", {
    fixture: fixtureId
  });

  return normalizeData(payload);
}

export async function getApiSportsTeamsByName(name) {
  const payload = await requestApiSports("/teams", {
    name
  });

  return normalizeData(payload);
}

export async function getApiSportsHeadToHeadFixtures(homeTeamId, awayTeamId) {
  const payload = await requestApiSports("/fixtures/headtohead", {
    h2h: `${homeTeamId}-${awayTeamId}`,
    timezone: apiSportsConfig.timezone
  });

  return normalizeData(payload);
}
