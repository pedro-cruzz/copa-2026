import { useState } from "react";
import { TrophyScene } from "./3d/TrophyScene";

function compactMatchLabel(match) {
  return match
    .replace(/Vencedor Jogo (\d+)/g, "J$1")
    .replace(/Vencedor Oitavas (\d+)/g, "O$1")
    .replace(/Vencedor Quartas (\d+)/g, "Q$1")
    .replace(/Grupo /g, "")
    .replace(/ x /g, " x ");
}

function BracketRound({ round, matches }) {
  return (
    <div className="bracket-round-content">
      <div className="bracket-round-header">
        <h3>{round.title}</h3>
      </div>
      <div className="mobile-bracket-matches">
        {matches.map((match, index) => (
          <article className="mobile-bracket-match" key={match} aria-label={match}>
            <span>Jogo {round.firstGameNumber + index}</span>
            <strong>{compactMatchLabel(match)}</strong>
          </article>
        ))}
      </div>
    </div>
  );
}

export function MobileBracketWithTabs({ bracket }) {
  const [activeTab, setActiveTab] = useState(0);

  const rounds = [
    { title: "32 avos", matches: bracket[0].matches, firstGameNumber: 73, compact: true },
    { title: "Oitavas", matches: bracket[1].matches, firstGameNumber: 89 },
    { title: "Quartas", matches: bracket[2].matches, firstGameNumber: 97 },
    { title: "Semi", matches: bracket[3].matches.slice(0, 2), firstGameNumber: 101 }
  ];

  const finalMatches = bracket[3].matches.slice(2);

  return (
    <div className="mobile-bracket-flow-tabs" aria-label="Chaveamento com abas">
      <div className="bracket-tabs-container">
        <div className="bracket-tabs">
          {rounds.map((round, index) => (
            <button
              key={round.title}
              className={`bracket-tab ${activeTab === index ? "is-active" : ""}`}
              onClick={() => setActiveTab(index)}
              type="button"
            >
              {round.title}
            </button>
          ))}
          <button
            key="final"
            className={`bracket-tab ${activeTab === rounds.length ? "is-active" : ""}`}
            onClick={() => setActiveTab(rounds.length)}
            type="button"
          >
            Final
          </button>
        </div>
      </div>

      <div className="bracket-tabs-content">
        {activeTab < rounds.length ? (
          <BracketRound round={rounds[activeTab]} matches={rounds[activeTab].matches} />
        ) : (
          <div className="bracket-round-content">
            <div className="bracket-round-header">
              <h3>Decisão</h3>
            </div>
            <div className="mobile-bracket-final-grid">
              {finalMatches.map((match, index) => (
                <article className="mobile-bracket-final-card" key={match}>
                  <span>Jogo {103 + index}</span>
                  <strong>{match}</strong>
                </article>
              ))}
            </div>
            <div className="bracket-final-trophy">
              <TrophyScene className="mobile-final-trophy-scene" />
              <strong>Campeão da Copa 2026</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
