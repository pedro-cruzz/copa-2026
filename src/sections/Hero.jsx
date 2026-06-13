import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Download, Radio } from "lucide-react";
import { matches, isBrazilMatch } from "../data/tournament";
import { TeamName } from "../components/TeamFlag";
import { useInstallPrompt } from "../hooks/useInstallPrompt";

const SketchfabBallEmbed = lazy(() =>
  import("../components/3d/SketchfabBallEmbed").then((module) => ({ default: module.SketchfabBallEmbed }))
);

function BallEmbedFallback() {
  return (
    <div className="sketchfab-ball-shell sketchfab-ball-fallback" aria-hidden="true">
      <span className="fallback-orbit" />
    </div>
  );
}

const brazilMatches = matches.filter(isBrazilMatch);

export function Hero() {
  const installPrompt = useInstallPrompt();

  return (
    <section className="hero-shell">
      <div className="hero-copy">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="hero-content"
        >
          <span className="live-chip">
            <Radio size={14} />
            Central ao vivo
          </span>
          <h1>Copa do mundo 2026</h1>
          <p>
            Agenda, grupos, jogos com placares ao vivo e muito mais. Tudo para você acompanhar a jornada rumo ao hexa!
          </p>

          <div className="hero-actions">
            <a href="#schedule" className="primary-action">
              Ver jogos
            </a>
            <a href="#groups" className="secondary-action">
              Classificação
            </a>
            {!installPrompt.installed && (
              <button type="button" className="secondary-action" onClick={installPrompt.install}>
                <Download size={18} />
                Instalar App
              </button>
            )}
          </div>
        </motion.div>

        <div className="metrics-grid">
          <article>
            <strong>{matches.length}</strong>
            <span>jogos cadastrados</span>
          </article>
          <article>
            <strong>12</strong>
            <span>grupos</span>
          </article>
          <article>
            <strong>48</strong>
            <span>seleções</span>
          </article>
        </div>
      </div>

      <aside className="hero-visual">
        <Suspense fallback={<BallEmbedFallback />}>
          <SketchfabBallEmbed />
        </Suspense>
      </aside>

      <section className="brazil-strip" aria-label="Jogos do Brasil">
        <div>
          <p className="eyebrow">Destaque</p>
          <h2>Jogos do Brasil</h2>
        </div>
        <div className="brazil-list">
          {brazilMatches.map((match) => (
            <article key={`${match.date}-${match.time}`} className="brazil-highlight">
              <strong>
                {match.day}, {match.time}
              </strong>
              <p>
                <TeamName team={match.home} /> <span className="versus">x</span> <TeamName team={match.away} />
              </p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
