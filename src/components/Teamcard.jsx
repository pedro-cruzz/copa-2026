import { CalendarDays, ShieldCheck } from "lucide-react";
import { TeamFlag } from "./TeamFlag";

export function TeamCard({ team, onClick }) {
  const teamMatches = Array.isArray(team.matches) ? team.matches : [];
  const nextMatch = teamMatches[0];
  const sourceLabel = team.sportmonksId ? "SportMonks conectado" : team.source || "OpenLigaDB";

  return (
    <button type="button" className="selection-card" onClick={onClick}>
      <span className="selection-card-top">
        <TeamFlag team={team.name} />
        <span>Grupo {team.group || "-"}</span>
      </span>

      <strong>{team.name}</strong>
      <span className="selection-card-note">{team.note || "Selecao cadastrada na Copa 2026."}</span>

      <span className="selection-card-meta">
        <CalendarDays size={15} />
        {teamMatches.length} jogos na fase de grupos
      </span>

      {nextMatch && (
        <span className="selection-card-match">
          {nextMatch.day} · {nextMatch.time} · {nextMatch.home} x {nextMatch.away}
        </span>
      )}

      <span className={`selection-card-source ${team.sportmonksId ? "is-live-ready" : ""}`}>
        <ShieldCheck size={15} />
        {sourceLabel}
      </span>
    </button>
  );
}
