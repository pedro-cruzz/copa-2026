import { motion } from "framer-motion";
import { ArrowLeft, Trophy } from "lucide-react";
import { bracket } from "../data/tournament";
import { Navigation } from "../components/Navigation";
import { SectionHeader } from "../components/SectionHeader";

function VisualMatch({ match, gameNumber, side }) {
  const [homePosition, awayPosition] = match.split(" x ");

  return (
    <article className={`visual-match visual-match-${side}`}>
      <span>Jogo {gameNumber}</span>
      <strong>{homePosition}</strong>
      <strong>{awayPosition}</strong>
    </article>
  );
}

function VisualStage({ title, matches, firstGameNumber, side, round }) {
  return (
    <section className={`visual-stage visual-stage-${round} visual-stage-${side}`}>
      <h3>{title}</h3>
      <div className="visual-stage-matches">
        {matches.map((match, index) => (
          <VisualMatch key={match} match={match} gameNumber={firstGameNumber + index} side={side} />
        ))}
      </div>
    </section>
  );
}

function VisualBracket() {
  const roundOf16 = bracket[1].matches;
  const quarterFinals = bracket[2].matches;
  const semiFinals = bracket[3].matches.slice(0, 2);

  return (
    <div className="visual-bracket">
      <div className="knockout-board">
        <svg className="bracket-lines" viewBox="0 0 1200 720" preserveAspectRatio="none" aria-hidden="true">
          <path d="M170 104 H226 V194 H288" />
          <path d="M170 260 H226 V194" />
          <path d="M170 416 H226 V506 H288" />
          <path d="M170 572 H226 V506" />
          <path d="M370 194 H420 V360 H470" />
          <path d="M370 506 H420 V360" />
          <path d="M540 360 H585" />
          <path d="M1030 104 H974 V194 H912" />
          <path d="M1030 260 H974 V194" />
          <path d="M1030 416 H974 V506 H912" />
          <path d="M1030 572 H974 V506" />
          <path d="M830 194 H780 V360 H730" />
          <path d="M830 506 H780 V360" />
          <path d="M660 360 H615" />
        </svg>

        <VisualStage title="Oitavas" matches={roundOf16.slice(0, 4)} firstGameNumber={89} side="left" round="r16" />
        <VisualStage title="Quartas" matches={quarterFinals.slice(0, 2)} firstGameNumber={97} side="left" round="qf" />
        <VisualStage title="Semifinal" matches={semiFinals.slice(0, 1)} firstGameNumber={101} side="left" round="sf" />

        <section className="champion-stage" aria-label="Campeão">
          <p>Road to 2026</p>
          <img src="/img/world-cup-trophy.png" alt="Troféu da Copa do Mundo" className="world-cup-trophy" />
          <h3>Campeão</h3>
          <span>Vencedor da final</span>
        </section>

        <VisualStage title="Semifinal" matches={semiFinals.slice(1, 2)} firstGameNumber={102} side="right" round="sf" />
        <VisualStage title="Quartas" matches={quarterFinals.slice(2, 4)} firstGameNumber={99} side="right" round="qf" />
        <VisualStage title="Oitavas" matches={roundOf16.slice(4, 8)} firstGameNumber={93} side="right" round="r16" />
      </div>
    </div>
  );
}

export function BracketPage() {
  return (
    <main className="page-shell">
      <Navigation page="bracket" />

      <section className="page-hero">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="live-chip">Mata-mata</span>
          <h1>Chaveamento da Copa 2026</h1>
          <p>
            Caminho completo do mata-mata com confrontos por posição de classificação. Os nomes reais entram depois que a fase de grupos terminar.
          </p>
          <div className="hero-actions">
            <a href="/#schedule" className="primary-action">
              <ArrowLeft size={18} />
              Voltar aos jogos
            </a>
            <a href="/" className="secondary-action">
              Página inicial
            </a>
          </div>
        </motion.div>
      </section>

      <section id="bracket" className="section-block">
        <SectionHeader
          eyebrow="Chaveamento"
          title="Caminho do mata-mata"
          description="O funil começa nas oitavas, passa por quartas e semifinais, e fecha no campeão no centro."
        />
        <VisualBracket />
      </section>

      <section className="section-block">
        <SectionHeader
          eyebrow="Detalhes"
          title="Tabela completa"
          description="Sequência por fase, dos 32 avos até a final."
        />

        <div className="bracket-grid">
          {bracket.map((phase) => (
            <article className="bracket-card" key={phase.phase}>
              <header>
                <Trophy size={18} />
                <h3>{phase.phase}</h3>
              </header>
              <div className="bracket-list">
                {phase.matches.map((match, index) => (
                  <div className="bracket-item" key={match}>
                    <p>Jogo {index + 1}</p>
                    <strong>{match}</strong>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer>Dados organizados para visualização. Confira a tabela oficial antes dos jogos, pois horários podem mudar.</footer>
    </main>
  );
}
