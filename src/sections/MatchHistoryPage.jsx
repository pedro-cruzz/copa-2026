import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, ArrowLeft, CalendarDays, Clock3, MapPin, RefreshCw } from "lucide-react";
import { AppFooter } from "../components/AppFooter";
import { Navigation } from "../components/Navigation";
import { TeamFlag, TeamName } from "../components/TeamFlag";
import {
  getDetailedWorldCupMatchHistory,
  getHistoryDisplayTeamName,
  getHistoryFixtureTeams,
  getHistoryScore,
  hydrateHistoryFixture,
  normalizeHistoryTeam
} from "../services/matchHistory";
import { getMatchFromHistorySearch } from "../utils/historyRoute";

const statusLabelMap = {
  "Match Finished": "Encerrado",
  "Time Finished": "Encerrado",
  Finished: "Encerrado",
  "Not Started": "Agendado",
  "First Half": "1 tempo",
  "Second Half": "2 tempo",
  Halftime: "Intervalo",
  "Break Time": "Intervalo",
  "Extra Time": "Prorrogacao",
  "Penalty Shootout": "Penaltis",
  "Match Suspended": "Suspenso",
  "Match Abandoned": "Abandonado",
  "Match Cancelled": "Cancelado",
  Postponed: "Adiado"
};

const statisticLabelMap = {
  "Ball Possession": "Posse de bola",
  "Expected Goals": "Gols esperados (xG)",
  "Total Shots": "Total de finalizacoes",
  "Shots on Goal": "Finalizacoes no alvo",
  "Shots off Goal": "Finalizacoes para fora",
  "Blocked Shots": "Finalizacoes bloqueadas",
  "Corner Kicks": "Escanteios",
  Fouls: "Faltas",
  Offsides: "Impedimentos",
  "Yellow Cards": "Cartoes amarelos",
  "Red Cards": "Cartoes vermelhos",
  "Goalkeeper Saves": "Defesas",
  "Passes accurate": "Passes certos",
  "Passes %": "Precisao de passes",
  Passes: "Passes",
  Tackles: "Desarmes",
  "Shots insidebox": "Chutes na area",
  "Shots outsidebox": "Chutes fora da area"
};

function maskHistoryErrorMessage(message) {
  const normalized = String(message || "").toLowerCase();

  if (
    normalized.includes("request limit") ||
    normalized.includes("limit for the day") ||
    normalized.includes("rate limit") ||
    normalized.includes("ids dessas selecoes")
  ) {
    return "Historico detalhado indisponivel no momento.";
  }

  return message || "Nao foi possivel carregar o historico da partida.";
}

function localizeStatusLabel(label) {
  return statusLabelMap[label] || label || "Status";
}

function localizeStatisticLabel(label) {
  return statisticLabelMap[label] || label;
}

function localizeTeamName(team) {
  return getHistoryDisplayTeamName(typeof team === "string" ? { name: team } : team);
}

function getFlagTeamName(match, team) {
  const target = normalizeHistoryTeam(team);

  if (normalizeHistoryTeam(match?.home) === target) {
    return match.home;
  }

  if (normalizeHistoryTeam(match?.away) === target) {
    return match.away;
  }

  return localizeTeamName(team);
}

function formatFullDate(dateValue) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Data nao informada";
  }

  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatShortDate(dateValue) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Data nao informada";
  }

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

function formatEventMinute(event) {
  const elapsed = event?.time?.elapsed;
  const extra = event?.time?.extra;

  if (!elapsed) {
    return "--";
  }

  return extra ? `${elapsed}+${extra}'` : `${elapsed}'`;
}

function getEventTypeLabel(event) {
  const type = String(event?.type || "").toLowerCase();
  const detail = event?.detail ? ` - ${event.detail}` : "";

  if (type === "goal") {
    return `Gol${detail}`;
  }

  if (type === "card") {
    return `Cartao${detail}`;
  }

  if (type === "subst") {
    return "Substituicao";
  }

  return event?.type || "Evento";
}

function getEventDescription(event) {
  const player = event?.player?.name;
  const assist = event?.assist?.name;

  if (String(event?.type || "").toLowerCase() === "subst" && assist) {
    return `${player || "Saiu"} por ${assist}`;
  }

  return [player, assist ? `(${assist})` : ""].filter(Boolean).join(" ");
}

function parseStatValue(value) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.replace("%", "").replace(",", ".").trim();
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function hasStatistics(fixture) {
  return Array.isArray(fixture?.statistics) && fixture.statistics.some((entry) => Array.isArray(entry?.statistics) && entry.statistics.length > 0);
}

function getStatisticRows(fixture) {
  const teamStats = Array.isArray(fixture?.statistics) ? fixture.statistics : [];

  if (teamStats.length < 2) {
    return [];
  }

  const [homeStats, awayStats] = teamStats;
  const awayByType = new Map((awayStats.statistics || []).map((entry) => [entry.type, entry.value]));

  return (homeStats.statistics || [])
    .map((entry) => {
      const homeRaw = entry.value;
      const awayRaw = awayByType.get(entry.type);
      const homeValue = parseStatValue(homeRaw);
      const awayValue = parseStatValue(awayRaw);

      if (homeValue === null || awayValue === null) {
        return null;
      }

      return {
        label: localizeStatisticLabel(entry.type),
        homeValue,
        awayValue,
        homeRaw: homeRaw ?? "0",
        awayRaw: awayRaw ?? "0"
      };
    })
    .filter(Boolean)
    .slice(0, 8);
}

function getLineups(fixture) {
  return Array.isArray(fixture?.lineups) ? fixture.lineups : [];
}

function getEvents(fixture) {
  return Array.isArray(fixture?.events) ? fixture.events : [];
}

function getStartingPlayers(lineup) {
  const startXI = Array.isArray(lineup?.startXI) ? lineup.startXI : [];
  return startXI.map((entry) => entry?.player).filter(Boolean);
}

function getHalfLabel(event) {
  const minute = event?.time?.elapsed || 0;

  if (minute <= 45) {
    return "1 tempo";
  }

  if (minute <= 90) {
    return "2 tempo";
  }

  return "Prorrogacao";
}

function getSummaryCards(fixture) {
  const events = getEvents(fixture);
  const lineups = getLineups(fixture);

  return [
    {
      label: "Eventos",
      value: events.length || 0
    },
    {
      label: "Escalacoes",
      value: lineups.length || 0
    },
    {
      label: "Local",
      value: fixture?.venue || "A confirmar"
    }
  ];
}

function getRowDensity(players) {
  return players.reduce((acc, player) => {
    const [rowText, columnText] = String(player?.grid || "").split(":");
    const row = Number(rowText);
    const column = Number(columnText);

    if (Number.isFinite(row) && Number.isFinite(column)) {
      acc[row] = Math.max(acc[row] || 0, column);
    }

    return acc;
  }, {});
}

function getFormationNodeStyle(player, side, lineDepth, rowDensity) {
  const [rowText, columnText] = String(player?.grid || "").split(":");
  const row = Number(rowText);
  const column = Number(columnText);
  const safeDepth = Math.max(lineDepth, 2);
  const xRatio = Number.isFinite(row) ? (row - 1) / (safeDepth - 1) : 0;
  const perRowCount = Math.max(rowDensity?.[row] || 1, 1);
  const yRatio = perRowCount === 1 ? 0.5 : ((column || 1) - 1) / (perRowCount - 1);
  const desktopTop = 14 + yRatio * 72;
  const desktopLeft = side === "home" ? 9 + xRatio * 36 : 91 - xRatio * 36;
  const mobileLeft = 14 + yRatio * 72;
  const mobileTop = side === "home" ? 10 + xRatio * 34 : 90 - xRatio * 34;

  return {
    "--pitch-desktop-left": `${desktopLeft}%`,
    "--pitch-desktop-top": `${desktopTop}%`,
    "--pitch-mobile-left": `${mobileLeft}%`,
    "--pitch-mobile-top": `${mobileTop}%`
  };
}

function getFormationDepth(players) {
  return players.reduce((max, player) => {
    const [rowText] = String(player?.grid || "").split(":");
    const row = Number(rowText);
    return Number.isFinite(row) ? Math.max(max, row) : max;
  }, 1);
}

function HistoryStatBars({ fixture, match }) {
  const rows = getStatisticRows(fixture);
  const { home, away } = getHistoryFixtureTeams(fixture);

  return (
    <section className="history-page-panel">
      <header className="history-page-panel-head">
        <strong>Estatisticas</strong>
      </header>
      <div className="history-stat-head">
        <div className="history-stat-team">
          <TeamFlag team={getFlagTeamName(match, home)} />
          <strong>{localizeTeamName(home)}</strong>
        </div>
        <span>Comparativo</span>
        <div className="history-stat-team is-away">
          <strong>{localizeTeamName(away)}</strong>
          <TeamFlag team={getFlagTeamName(match, away)} />
        </div>
      </div>
      {rows.length === 0 ? (
        <div className="history-panel-empty">Estatisticas ainda nao publicadas para esta partida.</div>
      ) : (
        <div className="history-stat-list">
          {rows.map((row) => {
            const total = row.homeValue + row.awayValue;
            const homeWidth = total > 0 ? `${(row.homeValue / total) * 100}%` : "50%";
            const awayWidth = total > 0 ? `${(row.awayValue / total) * 100}%` : "50%";

            return (
              <article key={row.label} className="history-stat-row">
                <div className="history-stat-values">
                  <span>{row.homeRaw}</span>
                  <strong>{row.label}</strong>
                  <span>{row.awayRaw}</span>
                </div>
                <div className="history-stat-track" aria-hidden="true">
                  <div className="history-stat-bar is-home" style={{ width: homeWidth }} />
                  <div className="history-stat-bar is-away" style={{ width: awayWidth }} />
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function FormationPitch({ fixture, match }) {
  const lineups = getLineups(fixture);

  if (lineups.length < 2) {
    return (
      <section className="history-page-panel">
        <header className="history-page-panel-head">
          <strong>Formacoes</strong>
        </header>
        <div className="history-panel-empty">Escalacoes ainda nao publicadas.</div>
      </section>
    );
  }

  const [homeLineup, awayLineup] = lineups;
  const { home, away } = getHistoryFixtureTeams(fixture);
  const homePlayers = getStartingPlayers(homeLineup);
  const awayPlayers = getStartingPlayers(awayLineup);
  const homeDepth = getFormationDepth(homePlayers);
  const awayDepth = getFormationDepth(awayPlayers);
  const homeRows = getRowDensity(homePlayers);
  const awayRows = getRowDensity(awayPlayers);

  return (
    <section className="history-page-panel">
      <header className="history-page-panel-head history-formations-head">
        <div className="history-formation-side">
          <span>{homeLineup?.formation || "-"}</span>
          <strong>{localizeTeamName(home)}</strong>
        </div>
        <strong>Formacoes</strong>
        <div className="history-formation-side is-away">
          <strong>{localizeTeamName(away)}</strong>
          <span>{awayLineup?.formation || "-"}</span>
        </div>
      </header>
      <div className="history-pitch-shell">
        <div className="history-pitch">
          <div className="history-pitch-lines" aria-hidden="true" />
          <div className="history-pitch-team-tag is-home">
            <TeamFlag team={getFlagTeamName(match, home)} />
            <strong>{localizeTeamName(home)}</strong>
          </div>
          <div className="history-pitch-team-tag is-away">
            <strong>{localizeTeamName(away)}</strong>
            <TeamFlag team={getFlagTeamName(match, away)} />
          </div>
          {homePlayers.map((player) => (
            <article
              key={`home-${player?.id || player?.name}`}
              className="history-pitch-player is-home"
              style={getFormationNodeStyle(player, "home", homeDepth, homeRows)}
            >
              <span>{player?.number || "-"}</span>
              <strong>{player?.name}</strong>
            </article>
          ))}
          {awayPlayers.map((player) => (
            <article
              key={`away-${player?.id || player?.name}`}
              className="history-pitch-player is-away"
              style={getFormationNodeStyle(player, "away", awayDepth, awayRows)}
            >
              <span>{player?.number || "-"}</span>
              <strong>{player?.name}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MatchReport({ fixture }) {
  const events = getEvents(fixture);

  if (events.length === 0) {
    return (
      <section className="history-page-panel">
        <header className="history-page-panel-head">
          <strong>Relato</strong>
        </header>
        <div className="history-panel-empty">Sem eventos detalhados registrados para esta partida.</div>
      </section>
    );
  }

  const grouped = events.reduce((acc, event) => {
    const label = getHalfLabel(event);
    acc[label] = acc[label] || [];
    acc[label].push(event);
    return acc;
  }, {});

  return (
    <section className="history-page-panel">
      <header className="history-page-panel-head">
        <strong>Relato</strong>
      </header>
      <div className="history-report-list">
        {Object.entries(grouped).map(([label, groupEvents]) => (
          <section key={label} className="history-report-half">
            <header>
              <strong>{label}</strong>
            </header>
            <div>
              {groupEvents.map((event, index) => (
                <article key={`${label}-${index}`} className="history-report-event">
                  <span>{formatEventMinute(event)}</span>
                  <div>
                    <strong>{getEventTypeLabel(event)}</strong>
                    {getEventDescription(event) ? <p>{getEventDescription(event)}</p> : null}
                    {event?.team?.name ? <small>{localizeTeamName(event.team.name)}</small> : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

function SummaryTab({ fixture, match, note, isFallback, selectedFixtureId, onSelectFixture, availableFixtures }) {
  const { home, away } = getHistoryFixtureTeams(fixture);
  const score = getHistoryScore(fixture);
  const summaryCards = getSummaryCards(fixture);

  return (
    <div className="history-tab-stack">
      {isFallback && availableFixtures.length > 0 ? (
        <section className="history-page-panel">
          <header className="history-page-panel-head">
            <strong>Confrontos anteriores</strong>
          </header>
          {note ? <p className="history-page-note">{note}</p> : null}
          <div className="history-switcher">
            {availableFixtures.map((item) => {
              const itemScore = getHistoryScore(item);
              const itemTeams = getHistoryFixtureTeams(item);

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`history-switcher-card ${selectedFixtureId === item.id ? "active" : ""}`}
                  onClick={() => onSelectFixture(item.id)}
                >
                  <strong>{formatShortDate(item.date)}</strong>
                  <span>
                    {localizeTeamName(itemTeams.home)}
                    <b>{itemScore ? `${itemScore.homeScore} x ${itemScore.awayScore}` : "x"}</b>
                    {localizeTeamName(itemTeams.away)}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="history-page-panel history-score-panel">
        <header className="history-page-panel-head">
          <strong>Sumario</strong>
          <span>{localizeStatusLabel(fixture?.status?.label) || `Grupo ${match?.group || "-"}`}</span>
        </header>
        <div className="history-score-hero">
          <div className="history-score-team">
            <span className="history-score-flag">
              <TeamFlag team={getFlagTeamName(match, home)} />
            </span>
            <strong>{localizeTeamName(home)}</strong>
          </div>
          <div className="history-score-center">
            <span>{score ? `${score.homeScore} x ${score.awayScore}` : "x"}</span>
            <small>{formatFullDate(fixture?.date)}</small>
          </div>
          <div className="history-score-team is-away">
            <span className="history-score-flag">
              <TeamFlag team={getFlagTeamName(match, away)} />
            </span>
            <strong>{localizeTeamName(away)}</strong>
          </div>
        </div>
        <div className="history-meta-row">
          <span>
            <CalendarDays size={16} />
            {formatShortDate(fixture?.date)}
          </span>
          <span>
            <Clock3 size={16} />
            {fixture?.status?.elapsed ? `${fixture.status.elapsed}'` : localizeStatusLabel(fixture?.status?.label) || "Agendado"}
          </span>
          <span>
            <MapPin size={16} />
            {[fixture?.venue, fixture?.city].filter(Boolean).join(" - ") || "Local a confirmar"}
          </span>
        </div>
        <div className="history-summary-grid">
          {summaryCards.map((item) => (
            <article key={item.label}>
              <small>{item.label}</small>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
function getTabSet(fixture) {
  const tabs = [{ id: "summary", label: "Sumario" }];

  if (hasStatistics(fixture)) {
    tabs.push({ id: "statistics", label: "Estatisticas" });
  }

  if (getLineups(fixture).length > 0) {
    tabs.push({ id: "formations", label: "Formacoes" });
  }

  if (getEvents(fixture).length > 0) {
    tabs.push({ id: "report", label: "Relato" });
  }

  return tabs;
}

export function MatchHistoryPage() {
  const match = useMemo(() => getMatchFromHistorySearch(), []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [details, setDetails] = useState(null);
  const [selectedFixtureId, setSelectedFixtureId] = useState("");
  const [activeTab, setActiveTab] = useState("summary");
  const [fixtureCache, setFixtureCache] = useState({});

  useEffect(() => {
    let cancelled = false;

    async function loadHistory() {
      setLoading(true);
      setError("");

      try {
        const payload = await getDetailedWorldCupMatchHistory(match);

        if (cancelled) {
          return;
        }

        setDetails(payload);
        setFixtureCache({});

        if (payload?.kind === "headToHead" && payload.previousMatches?.[0]?.id) {
          setSelectedFixtureId(payload.previousMatches[0].id);
        } else {
          setSelectedFixtureId(payload?.id || "");
        }
      } catch (event) {
        if (!cancelled) {
          setError(maskHistoryErrorMessage(event.message));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadHistory();

    return () => {
      cancelled = true;
    };
  }, [match]);

  const availableFixtures = details?.kind === "headToHead" ? details.previousMatches || [] : details ? [details] : [];
  const rawSelectedFixture =
    details?.kind === "headToHead"
      ? availableFixtures.find((fixture) => fixture.id === selectedFixtureId) || availableFixtures[0] || null
      : details;
  const selectedFixture = rawSelectedFixture ? fixtureCache[rawSelectedFixture.id] || rawSelectedFixture : null;
  const tabs = useMemo(() => (selectedFixture ? getTabSet(selectedFixture) : [{ id: "summary", label: "Sumario" }]), [selectedFixture]);

  useEffect(() => {
    if (!tabs.some((tab) => tab.id === activeTab)) {
      setActiveTab("summary");
    }
  }, [activeTab, tabs]);

  useEffect(() => {
    let cancelled = false;

    async function loadSelectedFixtureDetails() {
      if (!rawSelectedFixture?.id || details?.kind !== "headToHead" || fixtureCache[rawSelectedFixture.id]) {
        return;
      }

      try {
        const hydratedFixture = await hydrateHistoryFixture(rawSelectedFixture);

        if (!cancelled) {
          setFixtureCache((current) => ({
            ...current,
            [rawSelectedFixture.id]: hydratedFixture
          }));
        }
      } catch {
        if (!cancelled) {
          setFixtureCache((current) => ({
            ...current,
            [rawSelectedFixture.id]: rawSelectedFixture
          }));
        }
      }
    }

    loadSelectedFixtureDetails();

    return () => {
      cancelled = true;
    };
  }, [details?.kind, fixtureCache, rawSelectedFixture]);

  return (
    <main className="page-shell history-page-shell">
      <Navigation page="history" />

      <section className="page-hero history-page-hero">
        <div className="history-page-hero-top">
          <a href="/#schedule" className="history-back-link">
            <ArrowLeft size={16} />
            Voltar para agenda
          </a>
          <button type="button" className="secondary-action compact-action" onClick={() => window.location.reload()}>
            <RefreshCw size={16} />
            Atualizar
          </button>
        </div>

        <div className="history-page-title">
          <span className="live-chip">{details?.kind === "headToHead" ? "Confrontos anteriores" : `Grupo ${match?.group || "-"}`}</span>
          <h1>
            <TeamName team={match?.home || "Mandante"} /> <span>x</span> <TeamName team={match?.away || "Visitante"} />
          </h1>
          <p>
            Pagina detalhada da partida com abas de resumo, formacoes e relato. Estatisticas aparecem somente quando a
            API-Sports retornar esse bloco.
          </p>
        </div>
      </section>

      {loading ? (
        <section className="section-block">
          <div className="history-page-loading">Carregando historico detalhado...</div>
        </section>
      ) : error ? (
        <section className="section-block">
          <article className="inline-error">
            <AlertTriangle size={18} />
            <span>{error}</span>
          </article>
        </section>
      ) : selectedFixture ? (
        <section className="section-block history-page-body">
          <nav className="history-tabs" aria-label="Abas do historico da partida">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={activeTab === tab.id ? "active" : ""}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {activeTab === "summary" ? (
            <SummaryTab
              fixture={selectedFixture}
              match={match}
              note={details?.kind === "headToHead" ? details.note : ""}
              isFallback={details?.kind === "headToHead"}
              selectedFixtureId={selectedFixtureId}
              onSelectFixture={setSelectedFixtureId}
              availableFixtures={availableFixtures}
            />
          ) : null}

          {activeTab === "statistics" ? <HistoryStatBars fixture={selectedFixture} match={match} /> : null}
          {activeTab === "formations" ? <FormationPitch fixture={selectedFixture} match={match} /> : null}
          {activeTab === "report" ? <MatchReport fixture={selectedFixture} /> : null}
        </section>
      ) : null}

      <AppFooter note="Historico montado a partir da API-Sports e da agenda local do app." />
    </main>
  );
}
