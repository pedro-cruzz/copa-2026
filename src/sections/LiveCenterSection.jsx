import { useEffect, useMemo, useState } from "react";
import { Activity, AlertTriangle, RefreshCw, Shirt, Shield, Users } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { TeamName } from "../components/TeamFlag";
import { getTeamKits } from "../data/kits";
import { getTeams } from "../data/tournament";
import {
  asArray,
  getFixtureMinute,
  getFixtureScore,
  getFixtureState,
  getFixtureTeams,
  getTeamSquadByTeamId,
  getWorldCupLiveScores,
  hasSportmonksToken,
  sportmonksConfig,
  unwrapRelation
} from "../services/sportmonks";

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

function EmptySportmonksState() {
  return (
    <article className="sportmonks-empty">
      <AlertTriangle size={22} />
      <div>
        <strong>Configure sua chave da Sportmonks</strong>
        <p>
          Crie um arquivo .env.local com VITE_SPORTMONKS_API_TOKEN. Para producao, prefira um proxy backend para nao
          expor o token no navegador.
        </p>
      </div>
    </article>
  );
}

function LiveMatchCard({ fixture }) {
  const { home, away } = getFixtureTeams(fixture);
  const events = asArray(fixture?.events).slice(-4).reverse();
  const lineups = asArray(fixture?.lineups);
  const score = getFixtureScore(fixture);

  return (
    <article className="live-match-card">
      <header>
        <span className="live-state">
          <Activity size={14} />
          {getFixtureState(fixture)}
        </span>
        <span>{getFixtureMinute(fixture) || fixture?.starting_at || "Ao vivo"}</span>
      </header>

      <div className="live-score-row">
        <div>
          {home?.image_path && <img src={home.image_path} alt="" />}
          <strong>{home?.name || "Mandante"}</strong>
        </div>
        <span>
          {score.homeScore} x {score.awayScore}
        </span>
        <div>
          {away?.image_path && <img src={away.image_path} alt="" />}
          <strong>{away?.name || "Visitante"}</strong>
        </div>
      </div>

      <div className="live-match-meta">
        <span>{lineups.length} atletas em escalacoes</span>
        <span>{events.length} eventos recentes</span>
      </div>

      {events.length > 0 && (
        <ul className="event-timeline">
          {events.map((event, index) => (
            <li key={`${event.id || event.fixture_id || "event"}-${index}`}>
              <span>{event.minute ? `${event.minute}'` : "--"}</span>
              <p>{event.player_name || event.info || event.addition || event.type?.name || "Evento da partida"}</p>
            </li>
          ))}
        </ul>
      )}
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

function SquadList({ squad, loading }) {
  if (loading) {
    return <div className="empty-state">Buscando convocados na Sportmonks...</div>;
  }

  if (!squad.length) {
    return <div className="empty-state">Informe o ID do time na Sportmonks e busque o elenco.</div>;
  }

  return (
    <div className="squad-list">
      {squad.slice(0, 12).map((entry) => {
        const player = unwrapRelation(entry.player);
        const position = unwrapRelation(entry.position) || unwrapRelation(entry.detailedPosition);

        return (
          <article key={entry.id || `${entry.player_id}-${entry.jersey_number}`} className="squad-player">
            <span>{entry.jersey_number || "--"}</span>
            <div>
              <strong>{player?.display_name || player?.name || `Jogador ${entry.player_id}`}</strong>
              <p>{position?.name || "Posicao nao informada"}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function LiveCenterSection() {
  const teams = useMemo(() => getTeams(), []);
  const [selectedTeam, setSelectedTeam] = useState("Brasil");
  const [teamId, setTeamId] = useState("");
  const [matches, setMatches] = useState([]);
  const [squad, setSquad] = useState([]);
  const [loadingLive, setLoadingLive] = useState(false);
  const [loadingSquad, setLoadingSquad] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const canFetch = hasSportmonksToken();
  const kits = getTeamKits(selectedTeam);

  const loadLiveMatches = async () => {
    if (!canFetch) {
      return;
    }

    setLoadingLive(true);
    setError("");

    try {
      const data = await getWorldCupLiveScores();
      setMatches(data.filter((fixture) => !fixture?.placeholder));
      setLastUpdated(new Date());
    } catch (event) {
      setError(event.message);
    } finally {
      setLoadingLive(false);
    }
  };

  const loadSquad = async () => {
    if (!teamId.trim()) {
      setError("Informe o team_id da selecao na Sportmonks.");
      return;
    }

    setLoadingSquad(true);
    setError("");

    try {
      const data = await getTeamSquadByTeamId(teamId.trim());
      setSquad(data);
    } catch (event) {
      setError(event.message);
    } finally {
      setLoadingSquad(false);
    }
  };

  useEffect(() => {
    loadLiveMatches();

    if (!canFetch) {
      return undefined;
    }

    const intervalId = window.setInterval(loadLiveMatches, POLL_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [canFetch]);

  return (
    <section id="live-center" className="section-block live-center-section">
      <SectionHeader

        title="Central ao vivo"
        right={
          <button type="button" className="secondary-action compact-action" onClick={loadLiveMatches} disabled={!canFetch || loadingLive}>
            <RefreshCw size={16} />
            Atualizar
          </button>
        }
      />

      

      {!canFetch && <EmptySportmonksState />}
      {error && (
        <article className="sportmonks-error">
          <AlertTriangle size={18} />
          <span>{error}</span>
        </article>
      )}

      <div className="live-center-grid">
        <section className="live-panel live-panel-wide">
          <header className="live-panel-head">
            <div>
              <p className="eyebrow">Tempo real</p>
              <h3>Jogos em andamento</h3>
            </div>
            <Activity size={20} />
          </header>

          <div className="live-match-list">
            {matches.length > 0 ? (
              matches.map((fixture) => <LiveMatchCard key={fixture.id} fixture={fixture} />)
            ) : (
              <div className="empty-state">
                {canFetch ? "Nenhum jogo ao vivo retornado agora." : "Aguardando token para consultar livescores."}
              </div>
            )}
          </div>
        </section>

        <section className="live-panel">
          <header className="live-panel-head">
            <div>
              <p className="eyebrow">Selecao</p>
              <h3>Convocados</h3>
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

            
            <button type="button" className="primary-action" onClick={loadSquad} disabled={!canFetch || loadingSquad}>
              <Shield size={16} />
              Buscar elenco
            </button>
          </div>

          <SquadList squad={squad} loading={loadingSquad} />
        </section>

        <section className="live-panel">
          <header className="live-panel-head">
            <div>
              <p className="eyebrow">Uniformes</p>
              <h3>
                <TeamName team={selectedTeam} />
              </h3>
            </div>
            <Shirt size={20} />
          </header>

          <div className="kit-grid">
            {Object.values(kits).map((kit) => (
              <KitPreview key={kit.label} kit={kit} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
