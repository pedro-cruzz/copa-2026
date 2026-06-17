import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, RotateCcw, Search } from "lucide-react";
import { getMatchStatus, StatusBadge } from "../components/StatusBadge";
import { SectionHeader } from "../components/SectionHeader";
import { TeamName } from "../components/TeamFlag";
import { getTeams, groupByDay, isBrazilMatch, matches, normalizeText } from "../data/tournament";
import {
  getOpenLigaFixtureState,
  getOpenLigaScore,
  getOpenLigaWorldCupScoreboard,
  isOpenLigaMatchInPlay,
  openLigaFixtureForLocalMatch
} from "../services/openligadb";
import { buildMatchHistoryHref } from "../utils/historyRoute";

const SCOREBOARD_POLL_INTERVAL_MS = 20000;

function getNextMatch() {
  const now = new Date();
  return matches.find((match) => new Date(`${match.date}T${match.time}:00-03:00`) >= now) || matches[0];
}

function getMatchKey(match) {
  return `${match.date}-${match.time}-${match.home}-${match.away}`;
}

export function ScheduleSection({ filters, setFilters }) {
  const teams = useMemo(() => getTeams(), []);
  const groups = useMemo(() => [...new Set(matches.map((match) => match.group))].sort(), []);
  const nextMatch = useMemo(() => getNextMatch(), []);
  const [scoreboard, setScoreboard] = useState([]);
  const [scoreboardError, setScoreboardError] = useState("");

  const filteredMatches = useMemo(() => {
    const search = normalizeText(filters.search.trim());

    return matches.filter((match) => {
      const teamsText = `${match.home} ${match.away}`;
      const searchMatch = normalizeText(teamsText).includes(search);
      const groupMatch = filters.group === "all" || match.group === filters.group;
      const teamMatch = filters.team === "all" || match.home === filters.team || match.away === filters.team;

      return searchMatch && groupMatch && teamMatch;
    });
  }, [filters]);

  const matchesByDay = useMemo(() => groupByDay(filteredMatches), [filteredMatches]);

  const clearFilters = () => {
    setFilters({ search: "", group: "all", team: "all" });
  };

  useEffect(() => {
    let cancelled = false;

    const loadScoreboard = async () => {
      try {
        const data = await getOpenLigaWorldCupScoreboard();
        if (!cancelled) {
          setScoreboard(data);
          setScoreboardError("");
        }
      } catch (event) {
        if (!cancelled) {
          setScoreboardError(event.message);
        }
      }
    };

    loadScoreboard();
    const intervalId = window.setInterval(loadScoreboard, SCOREBOARD_POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section id="schedule" className="section-block">
      <SectionHeader
        eyebrow="Agenda"
        title="Jogos"
        right={<span className="visible-count">{filteredMatches.length} de {matches.length} jogos exibidos</span>}
      />

      <div className="filter-bar" aria-label="Filtros de jogos">
        <label className="control-wrap">
          <span className="sr-only">Buscar seleção</span>
          <Search size={17} />
          <input
            type="search"
            value={filters.search}
            placeholder="Buscar: Brasil, Argentina, México..."
            onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
          />
        </label>

        <label className="sr-only" htmlFor="groupFilter">Filtrar por grupo</label>
        <select
          id="groupFilter"
          className="control-select"
          value={filters.group}
          onChange={(event) => setFilters((current) => ({ ...current, group: event.target.value }))}
        >
          <option value="all">Todos os grupos</option>
          {groups.map((group) => (
            <option value={group} key={group}>Grupo {group}</option>
          ))}
        </select>

        <label className="sr-only" htmlFor="teamFilter">Filtrar por seleção</label>
        <select
          id="teamFilter"
          className="control-select"
          value={filters.team}
          onChange={(event) => setFilters((current) => ({ ...current, team: event.target.value }))}
        >
          <option value="all">Todas as seleções</option>
          {teams.map((team) => (
            <option value={team} key={team}>{team}</option>
          ))}
        </select>

        <button type="button" className="clear-button" onClick={clearFilters}>
          <RotateCcw size={17} />
          Limpar
        </button>
      </div>

      {scoreboardError && (
        <article className="inline-error">
          <AlertTriangle size={16} />
          <span>Placar ao vivo indisponivel: {scoreboardError}</span>
        </article>
      )}

      <div className="schedule-list">
        {filteredMatches.length === 0 ? (
          <div className="empty-state">Nenhum jogo encontrado com esses filtros.</div>
        ) : (
          Object.entries(matchesByDay).map(([day, dayMatches]) => (
            <article
              key={day}
              className="day-card"
            >
              <header className="day-head">
                <h3>{day}</h3>
                <span>{dayMatches.length} jogo(s)</span>
              </header>
              <div>
                {dayMatches.map((match) => {
                  const matchKey = getMatchKey(match);
                  const liveFixture = openLigaFixtureForLocalMatch(scoreboard, match);
                  const liveScore = liveFixture ? getOpenLigaScore(liveFixture) : null;
                  const status = liveFixture && isOpenLigaMatchInPlay(liveFixture)
                    ? { label: getOpenLigaFixtureState(liveFixture), tone: "live" }
                    : getMatchStatus(match, nextMatch);

                  return (
                    <article
                      key={matchKey}
                      className={`match-card ${liveScore ? "match-card-live-score" : ""} ${isBrazilMatch(match) ? "brazil-match" : ""}`}
                    >
                      <strong className="match-time">{match.time}</strong>
                      <StatusBadge status={status} />
                      <p>
                        <TeamName team={match.home} />
                        <span className={liveScore ? "live-score-pill" : "versus"}>
                          {liveScore ? `${liveScore.homeScore} x ${liveScore.awayScore}` : "x"}
                        </span>
                        <TeamName team={match.away} />
                      </p>
                      <a
                        href={buildMatchHistoryHref(match)}
                        className="match-history-toggle"
                      >
                        Historico
                      </a>
                    </article>
                  );
                })}
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
