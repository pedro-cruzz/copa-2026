import { groups, getTeamMatches } from "../data/tournament";
import { SectionHeader } from "../components/SectionHeader";
import { TeamName } from "../components/TeamFlag";

export function GroupsSection({ onSelectTeam }) {
  return (
    <section id="groups" className="section-block">
      <SectionHeader
        eyebrow="Grupos"
        title="Seleções por grupo"
        description="Clique em uma seleção para abrir jogos, adversários e curiosidades."
      />

      <div className="groups-grid">
        {Object.entries(groups).map(([group, teams]) => (
          <article
            className="group-card"
            key={group}
          >
            <div className="group-head">
              <h3>Grupo {group}</h3>
              <span>4 seleções</span>
            </div>
            <div className="team-list">
              {teams.map((team) => (
                <button key={team} type="button" className="team-pill" onClick={() => onSelectTeam(team)} aria-haspopup="dialog">
                  <span className="team-card-main">
                    <TeamName team={team} />
                  </span>
                  <span className="team-card-meta">
                    Grupo {group} · {getTeamMatches(team).length} jogos
                  </span>
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
