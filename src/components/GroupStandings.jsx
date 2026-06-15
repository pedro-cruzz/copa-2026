import { Trophy } from "lucide-react";
import { TeamFlag } from "./TeamFlag";
import { calculateGroupStandings, formatStandingsForDisplay } from "../data/groupsUtils";
import "../styles/group-standings.css";

export function GroupStandings({ groupName, apiMatches = [] }) {
  const standings = calculateGroupStandings(groupName, apiMatches);
  const formattedStandings = formatStandingsForDisplay(standings);

  return (
    <div className="group-standings">
      <table className="standings-table">
        <thead>
          <tr>
            <th className="col-position">#</th>
            <th className="col-team">Seleção</th>
            <th className="col-stat">J</th>
            <th className="col-stat">V</th>
            <th className="col-stat">E</th>
            <th className="col-stat">D</th>
            <th className="col-stat">GP</th>
            <th className="col-stat">GC</th>
            <th className="col-stat">SG</th>
            <th className="col-points">Pts</th>
          </tr>
        </thead>
        <tbody>
          {formattedStandings.map((team) => (
            <tr key={team.name} className={`team-row position-${team.position}`}>
              <td className="col-position">
                <span className="position-badge">{team.position}</span>
              </td>
              <td className="col-team">
                <div className="team-cell">
                  <TeamFlag team={team.name} />
                  <span className="team-name">{team.name}</span>
                </div>
              </td>
              <td className="col-stat">{team.played}</td>
              <td className="col-stat">{team.wins}</td>
              <td className="col-stat">{team.draws}</td>
              <td className="col-stat">{team.losses}</td>
              <td className="col-stat">{team.goalsFor}</td>
              <td className="col-stat">{team.goalsAgainst}</td>
              <td className="col-stat">
                <span className={team.goalDifference >= 0 ? "positive" : "negative"}>
                  {team.goalDifference >= 0 ? "+" : ""}{team.goalDifference}
                </span>
              </td>
              <td className="col-points">
                <span className="points-badge">{team.points}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="standings-legend">
        <span><strong>J:</strong> Jogos</span>
        <span><strong>V:</strong> Vitórias</span>
        <span><strong>E:</strong> Empates</span>
        <span><strong>D:</strong> Derrotas</span>
        <span><strong>GP:</strong> Gols Pró</span>
        <span><strong>GC:</strong> Gols Contra</span>
        <span><strong>SG:</strong> Saldo de Gols</span>
        <span><strong>Pts:</strong> Pontos</span>
      </div>
    </div>
  );
}
