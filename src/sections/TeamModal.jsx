import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { getTeamCuriosities, getTeamGroup, getTeamMatches, isBrazilMatch } from "../data/tournament";
import { TeamName } from "../components/TeamFlag";

export function TeamModal({ team, onClose, onFilterTeam }) {
  const teamMatches = team ? getTeamMatches(team) : [];
  const group = team ? getTeamGroup(team) : "";
  const curiosities = team ? getTeamCuriosities(team) : [];

  return (
    <AnimatePresence>
      {team && (
        <motion.div
          className="team-modal-backdrop"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            className="team-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <header className="team-modal-head">
              <div>
                <p className="eyebrow">Seleção</p>
                <h2 id="team-modal-title">
                  <TeamName team={team} />
                </h2>
                <span>
                  Grupo {group} · {teamMatches.length} jogos cadastrados
                </span>
              </div>
              <button type="button" className="icon-button" onClick={onClose} aria-label="Fechar modal">
                <X size={20} />
              </button>
            </header>

            <div className="team-modal-grid">
              <section className="team-modal-section">
                <h3>Jogos</h3>
                <div className="modal-match-list">
                  {teamMatches.map((match) => (
                    <article key={`${match.date}-${match.time}-${match.home}`} className={`modal-match-card ${isBrazilMatch(match) ? "brazil-match" : ""}`}>
                      <strong>{match.day}</strong>
                      <span>
                        {match.time} · Grupo {match.group}
                      </span>
                      <p>
                        <TeamName team={match.home} /> <span className="versus">x</span> <TeamName team={match.away} />
                      </p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="team-modal-section">
                <h3>Curiosidades</h3>
                <ul className="curiosity-list">
                  {curiosities.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </section>
            </div>

            <footer className="team-modal-actions">
              <button type="button" className="secondary-action" onClick={onClose}>
                Fechar
              </button>
              <button type="button" className="primary-action" onClick={() => onFilterTeam(team)}>
                Ver na agenda
              </button>
            </footer>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
