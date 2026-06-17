import { matches } from "../data/tournament";

function asText(value) {
  return typeof value === "string" ? value : "";
}

export function buildMatchHistoryHref(match) {
  const params = new URLSearchParams({
    date: asText(match?.date),
    time: asText(match?.time),
    home: asText(match?.home),
    away: asText(match?.away),
    group: asText(match?.group)
  });

  return `/historico?${params.toString()}`;
}

export function getMatchFromHistorySearch(search = window.location.search) {
  const params = new URLSearchParams(search);
  const target = {
    date: params.get("date") || "",
    time: params.get("time") || "",
    home: params.get("home") || "",
    away: params.get("away") || "",
    group: params.get("group") || ""
  };

  const localMatch =
    matches.find(
      (match) =>
        match.date === target.date &&
        match.time === target.time &&
        match.home === target.home &&
        match.away === target.away
    ) ||
    matches.find((match) => match.home === target.home && match.away === target.away);

  return localMatch || target;
}
