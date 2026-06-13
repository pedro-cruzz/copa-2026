import { SectionHeader } from "../components/SectionHeader";
import { GroupStandings } from "../components/GroupStandings";
import { groups as tournamentGroups } from "../data/tournament";

export function GroupsSection({ teams, onSelectTeam }) {
  return (
    <section id="groups" className="section-block">
      <SectionHeader
        eyebrow="Grupos"
        title="Classificação por Grupo"
        description="Visualize a pontuação, estatísticas e classificação de cada grupo da fase preliminar."
      />

      <div className="groups-standings-grid">
        {Object.keys(tournamentGroups).map((groupName) => (
          <article className="group-standings-card" key={groupName}>
            <div className="group-standings-head">
              <h3>Grupo {groupName}</h3>
              <span className="group-match-count">{tournamentGroups[groupName].length} seleções</span>
            </div>
            <div className="group-standings-content">
              <GroupStandings groupName={groupName} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
