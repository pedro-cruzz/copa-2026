import { useEffect, useMemo, useState } from "react";
import { Activity, AlertTriangle, RefreshCw, Shield, Users } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { TeamName } from "../components/TeamFlag";
import { getTeamKits } from "../data/kits";
import { getTeams } from "../data/tournament";
import {
  getApiSportsFixtureEvents,
  getApiSportsFixtureLineups,
  getApiSportsWorldCupLiveFixtures
} from "../services/apisports";

const POLL_INTERVAL_MS = 15000;

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

function formatEventMinute(event) {
  const elapsed = event?.time?.elapsed;
  const extra = event?.time?.extra;

  if (!elapsed) {
    return "--";
  }

  return extra ? `${elapsed}+${extra}'` : `${elapsed}'`;
}

function getEventLabel(event) {
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

function getEventPlayer(event) {
  const player = event?.player?.name;
  const assist = event?.assist?.name;

  if (String(event?.type || "").toLowerCase() === "subst" && assist) {
    return `${player || "Saiu"} por ${assist}`;
  }

  return [player, assist ? `(${assist})` : ""].filter(Boolean).join(" ");
}

function getStartingPlayers(lineup) {
  const startXI = Array.isArray(lineup?.startXI) ? lineup.startXI : [];
  return startXI.map((row) => row?.player).filter(Boolean).slice(0, 11);
}

function getLiveScore(fixture) {
  return {
    home: fixture?.goals?.home ?? fixture?.score?.fulltime?.home ?? 0,
    away: fixture?.goals?.away ?? fixture?.score?.fulltime?.away ?? 0
  };
}

async function withLiveDetails(fixture) {
  const fixtureId = fixture?.fixture?.id;

  if (!fixtureId) {
    return { fixture, events: [], lineups: [] };
  }

  const [events, lineups] = await Promise.allSettled([
    getApiSportsFixtureEvents(fixtureId),
    getApiSportsFixtureLineups(fixtureId)
  ]);

  return {
    fixture,
    events: events.status === "fulfilled" ? events.value : [],
    lineups: lineups.status === "fulfilled" ? lineups.value : []
  };
}

function EmptyApiSportsState() {
  return (
    <article className="sportmonks-empty">
      <AlertTriangle size={22} />
      <div>
        <strong>API-Sports pronta para jogos ao vivo</strong>
        <p>Use APISPORT_KEY no .env para carregar eventos, escalacoes, gols, cartoes e substituicoes.</p>
      </div>
    </article>
  );
}

function LiveMatchCard({ item }) {
  const fixture = item.fixture;
  const events = Array.isArray(item.events) ? item.events : [];
  const lineups = Array.isArray(item.lineups) ? item.lineups : [];
  const score = getLiveScore(fixture);
  const status = fixture?.fixture?.status;
  const visibleEvents = events.slice(-6).reverse();

  return (
    <article className="live-match-card">
      <header>
        <span className="live-state">
          <Activity size={14} />
          {status?.long || status?.short || "Ao vivo"}
        </span>
        <span>{status?.elapsed ? `${status.elapsed}'` : fixture?.fixture?.date || "Agora"}</span>
      </header>

      <div className="live-score-row">
        <div>
          {fixture?.teams?.home?.logo && <img src={fixture.teams.home.logo} alt="" />}
          <strong>{fixture?.teams?.home?.name || "Mandante"}</strong>
        </div>
        <span>
          {score.home} x {score.away}
        </span>
        <div>
          {fixture?.teams?.away?.logo && <img src={fixture.teams.away.logo} alt="" />}
          <strong>{fixture?.teams?.away?.name || "Visitante"}</strong>
        </div>
      </div>

      <div className="live-match-meta">
        <span>{lineups.length ? `${lineups.length} escalacoes` : "Escalacoes pendentes"}</span>
        <span>{events.length ? `${events.length} eventos` : "Sem eventos registrados"}</span>
      </div>

      <div className="live-detail-grid">
        <section>
          <h4>Eventos</h4>
          {visibleEvents.length === 0 ? (
            <span className="history-empty">Aguardando gols, cartoes ou substituicoes.</span>
          ) : (
            <ul className="event-timeline">
              {visibleEvents.map((event, index) => (
                <li key={`${fixture?.fixture?.id}-event-${index}`}>
                  <span>{formatEventMinute(event)}</span>
                  <p>
                    <strong>{getEventLabel(event)}</strong>
                    {getEventPlayer(event) && <em>{getEventPlayer(event)}</em>}
                    {event?.team?.name && <small>{event.team.name}</small>}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h4>Escalacoes</h4>
          {lineups.length === 0 ? (
            <span className="history-empty">Ainda sem escalacoes oficiais.</span>
          ) : (
            <div className="history-lineup-grid">
              {lineups.map((lineup) => {
                const players = getStartingPlayers(lineup);

                return (
                  <div className="history-lineup" key={`${fixture?.fixture?.id}-${lineup?.team?.id}`}>
                    <strong>
                      {lineup?.team?.name || "Selecao"}
                      {lineup?.formation ? ` - ${lineup.formation}` : ""}
                    </strong>
                    <ol>
                      {players.map((player) => (
                        <li key={`${lineup?.team?.id}-${player?.id || player?.name}`}>
                          <span>{player?.number || "-"}</span>
                          {player?.name}
                        </li>
                      ))}
                    </ol>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </article>
  );
}

function KitPreview({ kit }) {
  return (
    <article className="kit-card">
      <div className="kit-jersey" style={{ "--shirt": kit.shirt, "--trim": kit.trim, "--shorts": kit.shorts }}>
        <span style={{ color: kit.number }}>26</span>
      </div>
      <strong>{kit.label}</strong>
      <span>{kit.shirt}</span>
    </article>
  );
}

export function LiveCenterSection() {
  const teams = useMemo(() => getTeams(), []);
  const [selectedTeam, setSelectedTeam] = useState("Brasil");
  const [matches, setMatches] = useState([]);
  const [loadingLive, setLoadingLive] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const kits = getTeamKits(selectedTeam);

  const loadLiveMatches = async () => {
    setLoadingLive(true);
    setError("");

    try {
      const fixtures = await getApiSportsWorldCupLiveFixtures();
      const detailedMatches = await Promise.all(fixtures.filter((fixture) => fixture?.fixture?.id).map(withLiveDetails));
      setMatches(detailedMatches);
      setLastUpdated(new Date());
    } catch (event) {
      setError(event.message || "Nao foi possivel carregar a API-Sports.");
    } finally {
      setLoadingLive(false);
    }
  };

  useEffect(() => {
    loadLiveMatches();
    const intervalId = window.setInterval(loadLiveMatches, POLL_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section id="live-center" className="section-block live-center-section">
      <SectionHeader
        eyebrow="Ao vivo"
        title="Jogos ao vivo"
        right={
          <button type="button" className="secondary-action compact-action" onClick={loadLiveMatches} disabled={loadingLive}>
            <RefreshCw size={16} />
            Atualizar
          </button>
        }
      />

      <div className="live-center-status">
        <span>Fonte: API-Sports</span>
        <span>Atualizado: {formatLastUpdated(lastUpdated)}</span>
      </div>

      {error && (
        <article className="sportmonks-error">
          <AlertTriangle size={18} />
          <span>{error}</span>
        </article>
      )}

      {!error && matches.length === 0 && !loadingLive && <EmptyApiSportsState />}

      <div className="live-center-grid">
        <section className="live-panel live-panel-wide">
          <header className="live-panel-head">
            <div>
              <p className="eyebrow">Tempo real</p>
              <h3>Partidas em andamento</h3>
            </div>
            <Activity size={20} />
          </header>

          <div className="live-match-list">
            {loadingLive ? (
              <div className="empty-state">Carregando jogos ao vivo...</div>
            ) : matches.length > 0 ? (
              matches.map((item) => <LiveMatchCard key={item.fixture.fixture.id} item={item} />)
            ) : (
              <div className="empty-state">Nenhum jogo ao vivo retornado agora.</div>
            )}
          </div>
        </section>

        <section className="live-panel">
          <header className="live-panel-head">
            <div>
              <p className="eyebrow">Selecao</p>
              <h3>Uniformes</h3>
            </div>
            <Users size={20} />
          </header>

          <div className="squad-controls">
            <label>
              <span>Selecao local</span>
              <select value={selectedTeam} onChange={(event) => setSelectedTeam(event.target.value)}>
                {teams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="kit-grid">
            {Object.values(kits).map((kit) => (
              <KitPreview key={kit.label} kit={kit} />
            ))}
          </div>
        </section>

        <section className="live-panel">
          <header className="live-panel-head">
            <div>
              <p className="eyebrow">Referencia</p>
              <h3>
                <TeamName team={selectedTeam} />
              </h3>
            </div>
            <Shield size={20} />
          </header>

          <div className="selection-info-panel">
            <p>
              A classificacao e o placar geral continuam pela OpenLigaDB. Esta central usa a API-Sports somente para
              detalhes de partidas ao vivo.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}
