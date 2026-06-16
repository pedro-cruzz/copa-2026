import { CalendarDays, ShieldCheck } from "lucide-react";
import { TeamFlag } from "./TeamFlag";
import { repairText } from "../utils/text";

export function TeamCard({ team, onClick }) {
  const teamMatches = Array.isArray(team.matches) ? team.matches : [];
  const nextMatch = teamMatches[0];
  const sourceLabel = team.sportmonksId ? "SportMonks conectado" : team.source || "OpenLigaDB";
  const displayName = team.displayName || repairText(team.name);

  return (
    <button type="button" className="selection-card" onClick={onClick}>
      <span className="selection-card-top">
        <TeamFlag team={team.name} />
        <span>Grupo {team.group || "-"}</span>
      </span>

      <strong>{displayName}</strong>
      <span className="selection-card-note">{repairText(team.note) || "Seleção cadastrada na Copa 2026."}</span>

      <span className="selection-card-meta">
        <CalendarDays size={15} />
        {teamMatches.length} jogos na fase de grupos
      </span>

      {nextMatch && (
        <span className="selection-card-match">
          {repairText(nextMatch.day)} · {nextMatch.time} · {repairText(nextMatch.home)} x {repairText(nextMatch.away)}
        </span>
      )}

      <span className={`selection-card-source ${team.sportmonksId ? "is-live-ready" : ""}`}>
        <ShieldCheck size={15} />
        {sourceLabel}
      </span>
    </button>
  );
}
