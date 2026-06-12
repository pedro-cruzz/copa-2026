// src/sections/TeamModal.jsx
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { normalizeOpenLigaTeam, getOpenLigaWorldCupScoreboard, getOpenLigaFixtureTeams } from "../services/openligadb";

export function TeamModal({ team, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [teamMatches, setTeamMatches] = useState([]);

  useEffect(() => {
    setActiveTab("overview");

    async function fetchMatches() {
      if (!team) return;
      try {
        const allMatches = await getOpenLigaWorldCupScoreboard();
        const filtered = allMatches.filter((match) => {
          const { home, away } = getOpenLigaFixtureTeams(match);
          const name = team.name.toLowerCase();
          return normalizeOpenLigaTeam(home) === name || normalizeOpenLigaTeam(away) === name;
        });
        setTeamMatches(filtered);
      } catch (err) {
        console.error("Erro ao buscar partidas do time:", err);
        setTeamMatches([]);
      }
    }

    fetchMatches();
  }, [team]);

  if (!team) return null;

  const tabs = [
    { id: "overview", label: "Resumo" },
    { id: "matches", label: "Jogos" },
    { id: "kits", label: "Uniformes" },
    { id: "history", label: "Histórico" }
  ];

  return (
    <div
      className="team-modal-backdrop"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="team-modal"
        style={{
          background: "#111",
          padding: "2rem",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "600px",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "transparent",
            color: "white",
            fontSize: "1.5rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          <X size={20} />
        </button>

        <header style={{ textAlign: "center", marginBottom: "1rem" }}>
          <h2>{team.name}</h2>
        </header>

        <nav style={{ display: "flex", justifyContent: "space-around", marginBottom: "1rem" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "0.5rem 1rem",
                background: activeTab === tab.id ? "#444" : "#222",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <section>
          {activeTab === "overview" && (
            <div>
              <p><strong>Nome:</strong> {team.name}</p>
              <p><strong>Grupo:</strong> {team.group || "-"}</p>
              <p><strong>País:</strong> {team.country || "-"}</p>
            </div>
          )}

          {activeTab === "matches" && (
            <ul>
              {teamMatches.length === 0 ? (
                <li>Sem partidas encontradas.</li>
              ) : (
                teamMatches.map((match) => {
                  const { home, away } = getOpenLigaFixtureTeams(match);
                  return (
                    <li key={match.matchID}>
                      {home.name} x {away.name} — {new Date(match.matchDateTimeUTC || match.matchDateTime).toLocaleString()}
                    </li>
                  );
                })
              )}
            </ul>
          )}

          {activeTab === "kits" && (
            <p>Uniformes ainda não configurados.</p>
          )}

          {activeTab === "history" && (
            <p>Histórico de curiosidades ou partidas antigas pode ser colocado aqui.</p>
          )}
        </section>
      </div>
    </div>
  );
}