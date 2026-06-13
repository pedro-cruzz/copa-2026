import { useEffect, useMemo, useState } from "react";
import { Activity, AlertTriangle, CalendarDays, Radio, RefreshCw } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { StatusBadge } from "../components/StatusBadge";
import { TeamName } from "../components/TeamFlag";
import { matches } from "../data/tournament";
import {
  getOpenLigaFixtureState,
  getOpenLigaScore,
  getOpenLigaWorldCupScoreboard,
  isOpenLigaMatchInPlay,
  openLigaFixtureForLocalMatch
} from "../services/openligadb";

const POLL_INTERVAL_MS = 20000;

function getBrazilDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const byType = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${byType.year}-${byType.month}-${byType.day}`;
}

function getLocalStatus(match, fixture) {
  if (fixture && isOpenLigaMatchInPlay(fixture)) {
    return { label: "AO VIVO", tone: "live" };
  }

  if (fixture?.matchIsFinished) {
    return { label: "ENCERRADO", tone: "ended" };
  }

  return { label: "HOJE", tone: "today" };
}

function formatLastUpdated(date) {
  if (!date) {
    return "Aguardando";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(date);
}

export function TodayMatchesSection() {
  const [todayKey, setTodayKey] = useState(() => getBrazilDateKey());
  const todayMatches = useMemo(() => matches.filter((match) => match.date === todayKey), [todayKey]);
  const [scoreboard, setScoreboard] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadScoreboard = async () => {
    setLoading(true);

    try {
      const data = await getOpenLigaWorldCupScoreboard();
      setScoreboard(data);
      setError("");
      setLastUpdated(new Date());
    } catch (event) {
      setError(event.message || "Nao foi possivel carregar a OpenLigaDB.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScoreboard();
    const intervalId = window.setInterval(loadScoreboard, POLL_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTodayKey(getBrazilDateKey());
    }, 60 * 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const liveCount = todayMatches.filter((match) => {
    const fixture = openLigaFixtureForLocalMatch(scoreboard, match);
    return fixture && isOpenLigaMatchInPlay(fixture);
  }).length;

  return (
    <section id="today" className="section-block today-matches-section">
      <SectionHeader
        eyebrow="Hoje"
        title="Jogos de hoje"
        right={
          <button type="button" className="secondary-action compact-action" onClick={loadScoreboard} disabled={loading}>
            <RefreshCw size={16} />
            Atualizar
          </button>
        }
      />

      <div className="today-status-row">
        <span>
          <CalendarDays size={16} />
          {new Date(`${todayKey}T12:00:00`).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric"
          })}
        </span>
        <span>
          <Radio size={16} />
          {liveCount ? `${liveCount} ao vivo agora` : "Nenhum jogo ao vivo agora"}
        </span>
        <span>Atualizado: {formatLastUpdated(lastUpdated)}</span>
      </div>

      {error && (
        <article className="inline-error">
          <AlertTriangle size={16} />
          <span>OpenLigaDB indisponivel: {error}</span>
        </article>
      )}

      <div className="today-match-grid">
        {todayMatches.length === 0 ? (
          <div className="empty-state">Nenhum jogo cadastrado para hoje.</div>
        ) : (
          todayMatches.map((match) => {
            const fixture = openLigaFixtureForLocalMatch(scoreboard, match);
            const score = fixture ? getOpenLigaScore(fixture) : null;
            const status = getLocalStatus(match, fixture);

            return (
              <article
                key={`${match.date}-${match.time}-${match.home}`}
                className={`today-match-card ${status.tone === "live" ? "is-live" : ""}`}
              >
                <header>
                  <strong>{match.time}</strong>
                  <StatusBadge status={status} />
                </header>
                <div className="today-score-row">
                  <TeamName team={match.home} />
                  <span className={score ? "live-score-pill" : "versus"}>
                    {score ? `${score.homeScore} x ${score.awayScore}` : "x"}
                  </span>
                  <TeamName team={match.away} />
                </div>
                <div className="today-match-footer">
                  <Activity size={15} />
                  {fixture ? getOpenLigaFixtureState(fixture) : `Grupo ${match.group}`}
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
