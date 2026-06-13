import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import {
  getOpenLigaFixtureTeams,
  getOpenLigaScore,
  getOpenLigaWorldCupScoreboard,
  normalizeOpenLigaTeam
} from "../services/openligadb";

function getTeamName(team) {
  return typeof team === "string" ? team : team?.name || "";
}

export function TeamModal({ team, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [teamMatches, setTeamMatches] = useState([]);
  const teamName = getTeamName(team);

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
      { id: "history", label: "Historico" }
    ],
    []
  );

  if (!team) {
    return null;
  }

  return (
    <div className="team-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="team-modal-title">
      <div className="team-modal">
        <button type="button" className="icon-button" onClick={onClose} aria-label="Fechar">
          <X size={20} />
        </button>

        <header className="team-modal-head">
          <div>
            <span>Grupo {team?.group || "-"}</span>
            <h2 id="team-modal-title">{teamName}</h2>
          </div>
        </header>

        <nav className="selection-tabs" aria-label="Detalhes da selecao">
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
            <div className="selection-info-panel">
              <h3>Informacoes</h3>
              <p><strong>Nome:</strong> {teamName}</p>
              <p><strong>Grupo:</strong> {team?.group || "-"}</p>
              <p><strong>Fonte:</strong> OpenLigaDB + base local</p>
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
                        <strong>{new Date(match.matchDateTimeUTC || match.matchDateTime).toLocaleString("pt-BR")}</strong>
                      </header>
                      <p>
                        {home.name}
                        <span className="live-score-pill">{score.homeScore} x {score.awayScore}</span>
                        {away.name}
                      </p>
                    </article>
                  );
                })
              )}
            </div>
          )}

          {activeTab === "kits" && <div className="empty-state">Uniformes serao adicionados depois.</div>}
          {activeTab === "history" && <div className="empty-state">Historico sera refinado depois.</div>}
        </section>
      </div>
    </div>
  );
}
