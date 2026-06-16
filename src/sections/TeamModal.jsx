import { useEffect, useMemo, useState } from "react";
import { Shirt, UsersRound, X } from "lucide-react";
import { getTeamKits } from "../data/kits";
import {
  getOpenLigaFixtureTeams,
  getOpenLigaDisplayTeamName,
  getOpenLigaScore,
  getOpenLigaWorldCupScoreboard,
  normalizeOpenLigaTeam
} from "../services/openligadb";
import { repairText } from "../utils/text";

function getTeamName(team) {
  return typeof team === "string" ? team : team?.name || "";
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
  const date = new Date(rawDate);

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

export function TeamModal({ team, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [teamMatches, setTeamMatches] = useState([]);
  const teamName = getTeamName(team);
  const displayName = team?.displayName || repairText(teamName);
  const kits = useMemo(() => getTeamKits(teamName), [teamName]);

  useEffect(() => {
    setActiveTab("overview");
    setTeamMatches([]);

    async function fetchMatches() {
      if (!teamName) {
        return;
      }

      try {
        const allMatches = await getOpenLigaWorldCupScoreboard();
        const normalizedTeamName = normalizeOpenLigaTeam({ teamName });
        const filtered = allMatches.filter((match) => {
          const { home, away } = getOpenLigaFixtureTeams(match);
          return normalizeOpenLigaTeam(home) === normalizedTeamName || normalizeOpenLigaTeam(away) === normalizedTeamName;
        });
        setTeamMatches(filtered);
      } catch (error) {
        console.error("Erro ao buscar partidas do time:", error);
        setTeamMatches([]);
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
              {teamMatches.length === 0 ? (
                <div className="empty-state">Sem partidas encontradas.</div>
              ) : (
                teamMatches.map((match) => {
                  const { home, away } = getOpenLigaFixtureTeams(match);
                  const score = getOpenLigaScore(match);
                  return (
                    <article className="selection-match-card" key={match.matchID}>
                      <header>
                        <strong>{formatMatchDate(match)}</strong>
                      </header>
                      <p>
                        {getOpenLigaDisplayTeamName(home)}
                        <span className={score ? "live-score-pill" : "versus"}>
                          {score ? `${score.homeScore} x ${score.awayScore}` : "x"}
                        </span>
                        {getOpenLigaDisplayTeamName(away)}
                      </p>
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
