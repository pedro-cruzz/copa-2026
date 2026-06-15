import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { GroupStandings } from "../components/GroupStandings";
import { groups as tournamentGroups } from "../data/tournament";
import { getOpenLigaWorldCupScoreboard } from "../services/openligadb";

export function GroupsSection({ teams, onSelectTeam }) {
  const [apiMatches, setApiMatches] = useState([]);
  const [scoreboardError, setScoreboardError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadScoreboard = async () => {
      try {
        const data = await getOpenLigaWorldCupScoreboard();
        if (!cancelled) {
          setApiMatches(data);
          setScoreboardError("");
        }
      } catch (event) {
        if (!cancelled) {
          setScoreboardError(event.message || "Nao foi possivel carregar a OpenLigaDB.");
        }
      }
    };

    loadScoreboard();
    const intervalId = window.setInterval(loadScoreboard, 20000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section id="groups" className="section-block">
      <SectionHeader
        eyebrow="Grupos"
        title="Classificação por Grupo"
        description="Visualize a pontuação, estatísticas e classificação de cada grupo da fase preliminar."
      />

      {scoreboardError && (
        <article className="inline-error">
          <AlertTriangle size={16} />
          <span>Classificacao ao vivo indisponivel: usando resultados locais.</span>
        </article>
      )}

      <div className="groups-standings-grid">
        {Object.keys(tournamentGroups).map((groupName) => (
          <article className="group-standings-card" key={groupName}>
            <div className="group-standings-head">
              <h3>Grupo {groupName}</h3>
              <span className="group-match-count">{tournamentGroups[groupName].length} seleções</span>
            </div>
            <div className="group-standings-content">
              <GroupStandings groupName={groupName} apiMatches={apiMatches} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
