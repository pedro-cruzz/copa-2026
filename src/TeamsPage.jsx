// import { useMemo, useState } from "react";
// import { Search, Users } from "lucide-react";
// import { AppFooter } from "./components/AppFooter";
// import { Navigation } from "./components/Navigation";
// import { SectionHeader } from "./components/SectionHeader";
// import { TeamCard } from "./components/Teamcard";
// import { groups, getTeamMatches, teamCuriosityNotes, normalizeText } from "./data/tournament";
// import { TeamModal } from "./sections/TeamModal";
// import { repairText } from "./utils/text";

// function buildLocalTeams() {
//   return Object.entries(groups).flatMap(([group, teamNames]) =>
//     teamNames.map((name) => ({
//       id: `${group}-${name}`,
//       name,
//       displayName: repairText(name),
//       group,
//       note: repairText(teamCuriosityNotes[name]),
//       matches: getTeamMatches(name),
//       source: "Base local + OpenLigaDB"
//     }))
//   );
// }

// export function TeamsPage() {
//   const [search, setSearch] = useState("");
//   const [group, setGroup] = useState("all");
//   const [selectedTeam, setSelectedTeam] = useState(null);
//   const teams = useMemo(() => buildLocalTeams(), []);
//   const groupOptions = useMemo(() => Object.keys(groups).sort(), []);

//   const filteredTeams = useMemo(() => {
//     const normalizedSearch = normalizeText(search.trim());

//     return teams.filter((team) => {
//       const matchesSearch =
//         !normalizedSearch ||
//         normalizeText(team.name).includes(normalizedSearch) ||
//         normalizeText(team.displayName).includes(normalizedSearch);
//       const matchesGroup = group === "all" || team.group === group;
//       return matchesSearch && matchesGroup;
//     });
//   }, [teams, search, group]);

//   return (
//     <main className="page-shell selections-page">
//       <Navigation page="teams" />

//       <section className="page-hero selections-hero">
//         <span className="live-chip">
//           <Users size={16} />
//           {teams.length} seleções
//         </span>
//         <h1>Seleções</h1>
//         <p>Cards para acompanhar grupos, jogos, uniformes e dados das seleções da Copa 2026.</p>
//       </section>

//       <section className="section-block">
//         <SectionHeader
//           eyebrow="Seleções"
//           title="Cards dos times"
//           right={<span className="visible-count">{filteredTeams.length} de {teams.length} exibidas</span>}
//         />

//         <div className="filter-bar selections-filter">
//           <label className="control-wrap">
//             <Search size={17} />
//             <input
//               type="search"
//               value={search}
//               placeholder="Buscar seleção"
//               onChange={(event) => setSearch(event.target.value)}
//             />
//           </label>

//           <select className="control-select" value={group} onChange={(event) => setGroup(event.target.value)}>
//             <option value="all">Todos os grupos</option>
//             {groupOptions.map((groupName) => (
//               <option key={groupName} value={groupName}>Grupo {groupName}</option>
//             ))}
//           </select>
//         </div>

//         <div className="selections-grid">
//           {filteredTeams.map((team) => (
//             <TeamCard key={team.id} team={team} onClick={() => setSelectedTeam(team)} />
//           ))}
//         </div>
//       </section>

//       <TeamModal team={selectedTeam} onClose={() => setSelectedTeam(null)} />

//       <AppFooter note="Dados organizados a partir da base local e OpenLigaDB. Elencos oficiais podem mudar até a estreia de cada seleção." />
//     </main>
//   );
// }

import { Navigation } from "./components/Navigation";
import { AppFooter } from "./components/AppFooter";

export function TeamsPage() {
  return (
    <main className="page-shell selections-page">
      <Navigation page="teams" />

      {/* Tela de Em Breve centralizada */}
      <section 
        className="page-hero selections-hero" 
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center", 
          minHeight: "50vh",
          textAlign: "center" 
        }}
      >
        <h1>⏳ Em Breve</h1>
      </section>

      <AppFooter note="Página em manutenção. Novidades em breve!" />
    </main>
  );
}
