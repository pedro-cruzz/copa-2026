import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Shirt, UsersRound, X } from "lucide-react";
import { getTeamKits } from "../data/kits";
import {
  getDetailedWorldCupTeamHistory,
  getHistoryDisplayTeamName,
  getHistoryFixtureTeams,
  getHistoryScore
} from "../services/matchHistory";
import { repairText } from "../utils/text";

function getTeamName(team) {
  return typeof team === "string" ? team : team?.name || "";
}

function maskTeamHistoryErrorMessage(message) {
  const normalized = String(message || "").toLowerCase();

  if (
    normalized.includes("request limit") ||
    normalized.includes("limit for the day") ||
    normalized.includes("rate limit") ||
    normalized.includes("ids dessas selecoes")
  ) {
    return "Historico indisponivel no momento.";
  }

  return message || "Nao foi possivel carregar o historico da API-Sports.";
}

function KitPreview({ kit }) {
  return (
    <article className="kit-card">
      <div className="kit-jersey" style={{ "--shirt": kit.shirt, "--trim": kit.trim, "--shorts": kit.shorts }}>
        <span style={{ color: kit.number }}>26</span>
      </div>
      <strong>{kit.label}</strong>
      <span>{kit.description || kit.shirt}</span>
    </article>
  );
}

function formatMatchDate(match) {
  const rawDate = match?.matchDateTimeUTC || match?.matchDateTime;
  const historyDate = match?.date || rawDate;
  const date = new Date(historyDate);

  if (Number.isNaN(date.getTime())) {
    return "Data a confirmar";
  }

  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatEventMinute(event) {
  const elapsed = event?.time?.elapsed;
  const extra = event?.time?.extra;

  if (!elapsed) {
    return "-";
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

export function TeamModal({ team, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [teamMatches, setTeamMatches] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");
  const teamName = getTeamName(team);
  const displayName = team?.displayName || repairText(teamName);
  const kits = useMemo(() => getTeamKits(teamName), [teamName]);

  useEffect(() => {
    setActiveTab("overview");
    setTeamMatches([]);
    setHistoryError("");

    async function fetchMatches() {
      if (!teamName) {
        return;
      }

      setHistoryLoading(true);

      try {
        const detailedMatches = await getDetailedWorldCupTeamHistory(teamName);
        setTeamMatches(detailedMatches);
        setHistoryError("");
      } catch (error) {
        console.error("Erro ao buscar partidas do time:", error);
        setTeamMatches([]);
        setHistoryError(maskTeamHistoryErrorMessage(error.message));
      } finally {
        setHistoryLoading(false);
      }
    }

    fetchMatches();
  }, [teamName]);

  const tabs = useMemo(
    () => [
      { id: "overview", label: "Resumo" },
      { id: "matches", label: "Jogos" },
      { id: "kits", label: "Uniformes" },
      { id: "squad", label: "Elenco" }
    ],
    []
  );

  if (!team) {
    return null;
  }

  return (
    <div className="team-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="team-modal-title">
      <div className="team-modal selection-detail-modal">
        <button type="button" className="icon-button" onClick={onClose} aria-label="Fechar">
          <X size={20} />
        </button>

        <header className="team-modal-head">
          <div>
            <span>Grupo {team?.group || "-"}</span>
            <h2 id="team-modal-title">{displayName}</h2>
          </div>
        </header>

        <nav className="selection-tabs" aria-label="Detalhes da seleção">
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

        <section className="selection-tab-panel">
          {activeTab === "overview" && (
            <div className="selection-overview-grid">
              <div className="selection-info-panel">
                <h3>Informações</h3>
                <dl>
                  <div>
                    <dt>Nome</dt>
                    <dd>{displayName}</dd>
                  </div>
                  <div>
                    <dt>Grupo</dt>
                    <dd>{team?.group || "-"}</dd>
                  </div>
                  <div>
                    <dt>Fonte</dt>
                    <dd>{team?.source || "Base local + OpenLigaDB"}</dd>
                  </div>
                </dl>
              </div>
              <div className="selection-info-panel">
                <h3>Resumo</h3>
                <p>{repairText(team?.note) || "Seleção cadastrada na Copa 2026."}</p>
              </div>
            </div>
          )}

          {activeTab === "matches" && (
            <div className="selection-match-list">
              {historyLoading ? (
                <div className="empty-state">Carregando historico...</div>
              ) : historyError ? (
                <article className="inline-error">
                  <AlertTriangle size={16} />
                  <span>API-Sports indisponivel: {historyError}</span>
                </article>
              ) : teamMatches.length === 0 ? (
                <div className="empty-state">Sem partidas encontradas.</div>
              ) : (
                teamMatches.map((match) => {
                  const { home, away } = getHistoryFixtureTeams(match);
                  const score = getHistoryScore(match);
                  const events = Array.isArray(match.events) ? match.events : [];
                  const lineups = Array.isArray(match.lineups) ? match.lineups : [];
                  return (
                    <article className="selection-match-card" key={match.id}>
                      <header>
                        <strong>{formatMatchDate(match)}</strong>
                        {match.status?.label && <span>{match.status.label}</span>}
                      </header>
                      <p>
                        {getHistoryDisplayTeamName(home)}
                        <span className={score ? "live-score-pill" : "versus"}>
                          {score ? `${score.homeScore} x ${score.awayScore}` : "x"}
                        </span>
                        {getHistoryDisplayTeamName(away)}
                      </p>
                      {(match.venue || match.city) && (
                        <span>{[match.venue, match.city].filter(Boolean).join(" - ")}</span>
                      )}

                      <div className="selection-match-details">
                        <section>
                          <h4>Eventos</h4>
                          {events.length === 0 ? (
                            <span className="history-empty">Sem gols, cartoes ou substituicoes registrados.</span>
                          ) : (
                            <ul className="history-event-list">
                              {events.map((event, index) => (
                                <li key={`${match.id}-event-${index}`}>
                                  <strong>{formatEventMinute(event)}</strong>
                                  <span>{getEventLabel(event)}</span>
                                  <em>{getEventPlayer(event)}</em>
                                  <small>{event?.team?.name}</small>
                                </li>
                              ))}
                            </ul>
                          )}
                        </section>

                        <section>
                          <h4>Escalacoes</h4>
                          {lineups.length === 0 ? (
                            <span className="history-empty">Escalacoes ainda nao publicadas.</span>
                          ) : (
                            <div className="history-lineup-grid">
                              {lineups.map((lineup) => {
                                const players = getStartingPlayers(lineup);

                                return (
                                  <div className="history-lineup" key={`${match.id}-${lineup?.team?.id}`}>
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
                })
              )}
            </div>
          )}

          {activeTab === "kits" && (
            <div className="selection-kit-grid">
              {Object.values(kits).map((kit) => (
                <KitPreview key={kit.label} kit={kit} />
              ))}
            </div>
          )}

          {activeTab === "squad" && (
            <div className="selection-info-panel">
              <h3><UsersRound size={16} /> Elenco oficial</h3>
              <p>
                O app está pronto para receber elencos de uma API oficial ou base conferida. Vou evitar preencher jogadores
                manualmente sem fonte estável, porque convocações e cortes mudam até perto da estreia.
              </p>
              <p className="lineup-context">
                <Shirt size={16} />
                Próximo passo: conectar SportMonks/API-Football ou importar a lista oficial da FIFA.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
