// src/pages/TeamsPage.jsx
import { useEffect, useState, useMemo } from "react";
import { Users, AlertTriangle, Search } from "lucide-react";
import { Navigation } from "./components/Navigation";
import { SectionHeader } from "./components/SectionHeader";
import { TeamCard } from "./components/Teamcard";
import { normalizeOpenLigaTeam, getOpenLigaWorldCupScoreboard, getOpenLigaFixtureTeams } from "../services/openligadb";

// Modal simplificado
function TeamDetailsModal({ team, onClose, matches }) {
  if (!team) return null;

  const teamMatches = matches.filter((match) => {
    const { home, away } = getOpenLigaFixtureTeams(match);
    const name = team.name.toLowerCase();
    return normalizeOpenLigaTeam(home) === name || normalizeOpenLigaTeam(away) === name;
  });

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
          ×
        </button>

        <header style={{ textAlign: "center", marginBottom: "1rem" }}>
          <h2>{team.name}</h2>
        </header>

        <section>
          <h3>Próximos Jogos</h3>
          <ul>
            {teamMatches.length === 0 ? (
              <li>Sem partidas encontradas.</li>
            ) : (
              teamMatches.map((match) => {
                const { home, away } = getOpenLigaFixtureTeams(match);
                return (
                  <li key={match.matchID}>
                    {home.name} x {away.name} —{" "}
                    {new Date(match.matchDateTimeUTC || match.matchDateTime).toLocaleString()}
                  </li>
                );
              })
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}

export function TeamsPage() {
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("all");
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Buscar partidas da Copa
  useEffect(() => {
    async function fetchMatches() {
      try {
        const data = await getOpenLigaWorldCupScoreboard();
        setMatches(data);
      } catch (err) {
        console.error("Erro ao carregar partidas:", err);
        setMatches([]);
      }
    }

    fetchMatches();
  }, []);

  // Extrair times únicos das partidas
  useEffect(() => {
    const teamMap = {};
    matches.forEach((match) => {
      const { home, away } = getOpenLigaFixtureTeams(match);
      teamMap[normalizeOpenLigaTeam(home)] = home;
      teamMap[normalizeOpenLigaTeam(away)] = away;
    });
    setTeams(Object.values(teamMap));
  }, [matches]);

  const filteredTeams = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();
    return teams.filter((team) => {
      const matchesSearch = team.name.toLowerCase().includes(normalizedSearch);
      const matchesGroup = group === "all" || team.group === group;
      return matchesSearch && matchesGroup;
    });
  }, [teams, search, group]);

  const groupOptions = useMemo(() => {
    const groups = new Set(teams.map((t) => t.group).filter(Boolean));
    return Array.from(groups).sort();
  }, [teams]);

  return (
    <main className="page-shell selections-page">
      <Navigation page="teams" />

      <section className="page-hero selections-hero">
        <span className="live-chip">
          <Users size={16} />
          {teams.length} seleções
        </span>
        <h1>Seleções</h1>
        <p>Cards para acompanhar grupos e partidas da Copa 2026.</p>
      </section>

      <section className="section-block">
        <SectionHeader
          eyebrow="Seleções"
          title="Cards dos times"
          right={<span className="visible-count">{filteredTeams.length} de {teams.length} exibidas</span>}
        />

        <div className="filter-bar selections-filter">
          <label className="control-wrap">
            <Search size={17} />
            <input
              type="search"
              value={search}
              placeholder="Buscar seleção"
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          <select value={group} onChange={(e) => setGroup(e.target.value)}>
            <option value="all">Todos os grupos</option>
            {groupOptions.map((g) => (
              <option key={g} value={g}>Grupo {g}</option>
            ))}
          </select>
        </div>

        <div className="selections-grid">
          {filteredTeams.map((team) => (
            <TeamCard key={team.id || team.name} team={team} onClick={() => setSelectedTeam(team)} />
          ))}
        </div>
      </section>

      {selectedTeam && (
        <TeamDetailsModal
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
          matches={matches}
        />
      )}

      <footer>
        Dados fornecidos pela OpenLigaDB.
      </footer>
    </main>
  );
}