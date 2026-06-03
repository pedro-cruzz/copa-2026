function getMatchDate(match) {
  return new Date(`${match.date}T${match.time}:00-03:00`);
}

export function getMatchStatus(match, nextMatch) {
  const now = new Date();
  const start = getMatchDate(match);
  const end = new Date(start.getTime() + 115 * 60 * 1000);
  const todayKey = now.toISOString().slice(0, 10);

  if (now >= start && now <= end) {
    return { label: "AO VIVO", tone: "live" };
  }

  if (match.date === todayKey) {
    return { label: "HOJE", tone: "today" };
  }

  if (nextMatch && match.date === nextMatch.date && match.time === nextMatch.time && match.home === nextMatch.home) {
    return { label: "PRÓXIMO JOGO", tone: "next" };
  }

  if (now > end) {
    return { label: "ENCERRADO", tone: "ended" };
  }

  return { label: `GRUPO ${match.group}`, tone: "group" };
}

export function StatusBadge({ status }) {
  return <span className={`status-badge status-${status.tone}`}>{status.label}</span>;
}
