import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Trophy } from "lucide-react";
import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { bracket } from "../data/tournament";
import { Navigation } from "../components/Navigation";
import { SectionHeader } from "../components/SectionHeader";
import { TrophyModel } from "../components/3d/TrophyModel";
import { MobileBracketWithTabs } from "../components/MobileBracketTabs";
import { useMediaQuery } from "../hooks/useMediaQuery";
import "../styles/mobile-bracket-tabs.css";

const BRACKET_SLOT_ROWS = {
  "32": [1, 3, 5, 7, 9, 11, 13, 15],
  "16": [2, 6, 10, 14],
  "8": [4, 12],
  "4": [8]
};
const DESKTOP_BOARD = { width: 1280, height: 760 };
const DESKTOP_ROWS = {
  "32": [20, 110, 200, 290, 380, 470, 560, 650],
  "16": [65, 245, 425, 605],
  "8": [155, 515],
  "4": [335]
};
const DESKTOP_LAYOUT = {
  left: {
    "32": { x: 5, w: 170, h: 58 },
    "16": { x: 185, w: 150, h: 64 },
    "8": { x: 345, w: 132, h: 64 },
    "4": { x: 500, w: 118, h: 64 }
  },
  right: {
    "4": { x: 662, w: 118, h: 64 },
    "8": { x: 803, w: 132, h: 64 },
    "16": { x: 945, w: 150, h: 64 },
    "32": { x: 1105, w: 170, h: 58 }
  }
};
const FINAL_CARD = { x: 565, y: 455, w: 150, h: 58 };
const BRONZE_CARD = { x: 565, y: 530, w: 150, h: 58 };

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

function DesktopBracketMatch({ match, gameNumber, row, side, compact = false }) {
  const [homePosition, awayPosition] = match.includes(" x ") ? match.split(" x ") : [match, ""];

  return (
    <article
      className={`desktop-bracket-match desktop-bracket-match-${side} ${compact ? "is-compact" : ""}`}
      style={{ "--slot-row": row }}
    >
      <span>Jogo {gameNumber}</span>
      <strong>{homePosition}</strong>
      {awayPosition && <strong>{awayPosition}</strong>}
    </article>
  );
}

function DesktopBracketColumn({ title, matches, firstGameNumber, rows, side, compact }) {
  return (
    <section className="desktop-bracket-column">
      <h3>{title}</h3>
      <div className="desktop-bracket-slots">
        {matches.map((match, index) => (
          <DesktopBracketMatch
            key={match}
            match={match}
            gameNumber={firstGameNumber + index}
            row={rows[index]}
            side={side}
            compact={compact}
          />
        ))}
      </div>
    </section>
  );
}

function DesktopBracketSide({ side }) {
  const isLeft = side === "left";
  const halfStart = isLeft ? 0 : 8;

  const rounds = [
    {
      key: "32",
      title: "32 avos",
      matches: bracket[0].matches.slice(halfStart, halfStart + 8),
      firstGameNumber: isLeft ? 73 : 81,
      rows: BRACKET_SLOT_ROWS["32"],
      compact: true
    },
    {
      key: "16",
      title: "Oitavas",
      matches: bracket[1].matches.slice(isLeft ? 0 : 4, isLeft ? 4 : 8),
      firstGameNumber: isLeft ? 89 : 93,
      rows: BRACKET_SLOT_ROWS["16"]
    },
    {
      key: "8",
      title: "Quartas",
      matches: bracket[2].matches.slice(isLeft ? 0 : 2, isLeft ? 2 : 4),
      firstGameNumber: isLeft ? 97 : 99,
      rows: BRACKET_SLOT_ROWS["8"]
    },
    {
      key: "4",
      title: "Semi",
      matches: bracket[3].matches.slice(isLeft ? 0 : 1, isLeft ? 1 : 2),
      firstGameNumber: isLeft ? 101 : 102,
      rows: BRACKET_SLOT_ROWS["4"]
    }
  ];

  const orderedRounds = isLeft ? rounds : [...rounds].reverse();

  return (
    <div className={`desktop-bracket-side desktop-bracket-side-${side}`}>
      {orderedRounds.map((round) => (
        <DesktopBracketColumn key={round.key} side={side} {...round} />
      ))}
    </div>
  );
}

function TrophyScene({ className = "desktop-trophy-scene" }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas dpr={[1, 1.5]} frameloop="demand" gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0.18, 4.8], fov: 31 }}>
        <ambientLight intensity={1.3} />
        <directionalLight position={[2.8, 4.2, 3.4]} intensity={2.8} color="#fff2c4" />
        <pointLight position={[-2.2, 1.4, 2.4]} intensity={1.45} color="#35d98b" />
        <spotLight position={[0, 4, 2.6]} angle={0.46} penumbra={0.7} intensity={2.15} color="#fff9dc" />
        <Suspense fallback={null}>
          <Environment preset="city" resolution={32} />
          <TrophyModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

function createDesktopNodes() {
  const nodes = [];
  const addRound = ({ side, round, matches, firstGameNumber }) => {
    const layout = DESKTOP_LAYOUT[side][round];

    matches.forEach((match, index) => {
      nodes.push({
        id: `${side}-${round}-${index}`,
        side,
        round,
        match,
        gameNumber: firstGameNumber + index,
        compact: round === "32",
        x: layout.x,
        y: DESKTOP_ROWS[round][index],
        w: layout.w,
        h: layout.h
      });
    });
  };

  addRound({ side: "left", round: "32", matches: bracket[0].matches.slice(0, 8), firstGameNumber: 73 });
  addRound({ side: "left", round: "16", matches: bracket[1].matches.slice(0, 4), firstGameNumber: 89 });
  addRound({ side: "left", round: "8", matches: bracket[2].matches.slice(0, 2), firstGameNumber: 97 });
  addRound({ side: "left", round: "4", matches: bracket[3].matches.slice(0, 1), firstGameNumber: 101 });
  addRound({ side: "right", round: "4", matches: bracket[3].matches.slice(1, 2), firstGameNumber: 102 });
  addRound({ side: "right", round: "8", matches: bracket[2].matches.slice(2, 4), firstGameNumber: 99 });
  addRound({ side: "right", round: "16", matches: bracket[1].matches.slice(4, 8), firstGameNumber: 93 });
  addRound({ side: "right", round: "32", matches: bracket[0].matches.slice(8, 16), firstGameNumber: 81 });

  return nodes;
}

const DESKTOP_BRACKET_NODES = createDesktopNodes();
const DESKTOP_NODE_MAP = new Map(DESKTOP_BRACKET_NODES.map((node) => [node.id, node]));

function createBracketPath(fromId, toId, side) {
  const from = DESKTOP_NODE_MAP.get(fromId);
  const to = DESKTOP_NODE_MAP.get(toId);

  if (!from || !to) {
    return "";
  }

  const fromY = from.y + from.h / 2;
  const toY = to.y + to.h / 2;
  const fromX = side === "left" ? from.x + from.w : from.x;
  const toX = side === "left" ? to.x : to.x + to.w;
  const midX = (fromX + toX) / 2;

  return `M${fromX} ${fromY} H${midX} V${toY} H${toX}`;
}

function createDesktopBracketPaths() {
  const paths = [];
  const addPairLinks = (side, fromRound, toRound, fromCount) => {
    for (let index = 0; index < fromCount; index += 1) {
      paths.push(createBracketPath(`${side}-${fromRound}-${index}`, `${side}-${toRound}-${Math.floor(index / 2)}`, side));
    }
  };

  addPairLinks("left", "32", "16", 8);
  addPairLinks("left", "16", "8", 4);
  addPairLinks("left", "8", "4", 2);
  addPairLinks("right", "32", "16", 8);
  addPairLinks("right", "16", "8", 4);
  addPairLinks("right", "8", "4", 2);

  const leftSemi = DESKTOP_NODE_MAP.get("left-4-0");
  const rightSemi = DESKTOP_NODE_MAP.get("right-4-0");
  const finalTopX = FINAL_CARD.x + FINAL_CARD.w / 2;
  const finalTopY = FINAL_CARD.y;

  paths.push(`M${leftSemi.x + leftSemi.w} ${leftSemi.y + leftSemi.h / 2} H${finalTopX} V${finalTopY}`);
  paths.push(`M${rightSemi.x} ${rightSemi.y + rightSemi.h / 2} H${finalTopX} V${finalTopY}`);
  paths.push(`M${finalTopX} ${FINAL_CARD.y + FINAL_CARD.h} V${BRONZE_CARD.y}`);

  return paths;
}

const DESKTOP_BRACKET_PATHS = createDesktopBracketPaths();

function DesktopBracketLines() {
  return (
    <svg className="desktop-bracket-lines" viewBox={`0 0 ${DESKTOP_BOARD.width} ${DESKTOP_BOARD.height}`} preserveAspectRatio="none" aria-hidden="true">
      <g>
        {DESKTOP_BRACKET_PATHS.map((path) => (
          <path key={path} d={path} />
        ))}
      </g>
    </svg>
  );
}

function DesktopBracketNode({ node }) {
  const [homePosition, awayPosition] = node.match.includes(" x ") ? node.match.split(" x ") : [node.match, ""];

  return (
    <article
      className={`desktop-bracket-node desktop-bracket-node-${node.side} ${node.compact ? "is-compact" : ""}`}
      style={{
        "--node-x": node.x,
        "--node-y": node.y,
        "--node-w": node.w,
        "--node-h": node.h
      }}
    >
      <span>Jogo {node.gameNumber}</span>
      <strong>{homePosition}</strong>
      {awayPosition && <strong>{awayPosition}</strong>}
    </article>
  );
}

function VisualBracket() {
  return (
    <div className="visual-bracket">
      <div className="desktop-knockout-board">
        <DesktopBracketLines />
        {DESKTOP_BRACKET_NODES.map((node) => (
          <DesktopBracketNode key={node.id} node={node} />
        ))}

        <section className="desktop-champion-stage" aria-label="Campeão">
          <p>Road to 2026</p>
          <div className="desktop-trophy-landing" aria-hidden="true" />
          <h3>Campeão</h3>
          <span>Vencedor da final</span>
          <div className="desktop-decision-grid" hidden>
            <article>
              <strong>3º lugar</strong>
              <span>Jogo 103</span>
            </article>
            <article className="is-final">
              <strong>Final</strong>
              <span>Jogo 104</span>
            </article>
          </div>
        </section>
        <article className="desktop-center-card desktop-center-card-final">
          <strong>Final</strong>
          <span>Jogo 104</span>
        </article>
        <article className="desktop-center-card desktop-center-card-bronze">
          <strong>3Âº lugar</strong>
          <span>Jogo 103</span>
        </article>
      </div>
    </div>
  );
}

function compactMatchLabel(match) {
  return match
    .replace(/Vencedor Jogo (\d+)/g, "J$1")
    .replace(/Vencedor Oitavas (\d+)/g, "O$1")
    .replace(/Vencedor Quartas (\d+)/g, "Q$1")
    .replace(/Grupo /g, "")
    .replace(/ x /g, " × ");
}

export function BracketPage() {
  const mobile = useMediaQuery("(max-width: 720px)");
  const trophyFlowRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trophyFlowRef,
    offset: ["start 10%", "end 42%"]
  });
  const trophyX = useTransform(scrollYProgress, [0, 0.45, 1], [0, -245, -445]);
  const trophyY = useTransform(scrollYProgress, [0, 0.45, 1], [96, 460, 900]);
  const trophyScale = useTransform(scrollYProgress, [0, 0.45, 1], [1, 0.68, 0.36]);

  return (
    <main className="page-shell">
      <Navigation page="bracket" />

      <div ref={trophyFlowRef} className="bracket-trophy-flow">
        {!mobile && (
          <motion.aside
            className="bracket-scroll-trophy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ x: trophyX, y: trophyY, scale: trophyScale }}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            <TrophyScene className="page-hero-trophy-scene" />
          </motion.aside>
        )}

      <section className="page-hero bracket-page-hero">
        <motion.div className="bracket-page-hero-copy" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
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
        {mobile ? <MobileBracketWithTabs bracket={bracket} /> : <VisualBracket />}
      </section>
      </div>

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
