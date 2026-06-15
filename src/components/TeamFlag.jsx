import { flagCodes } from "../data/tournament";

const fallbackLabels = {
  "gb-eng": "ENG",
  "gb-sct": "SCO"
};

function flagLabel(code) {
  return fallbackLabels[code] || code.toUpperCase();
}

export function TeamFlag({ team, className = "" }) {
  const code = flagCodes[team];

  if (!code) {
    return <span className={`flag-fallback ${className}`} aria-hidden="true" />;
  }

  return (
    <span className={`team-flag-wrap ${className}`} aria-hidden="true">
      <span className="flag-fallback">{flagLabel(code)}</span>
      <img
        src={`https://flagcdn.com/w40/${code}.png`}
        srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
        alt=""
        className="team-flag"
        loading="lazy"
        onLoad={(event) => {
          event.currentTarget.previousElementSibling.hidden = true;
        }}
        onError={(event) => {
          event.currentTarget.remove();
        }}
      />
    </span>
  );
}

export function TeamName({ team }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-2 align-middle">
      <TeamFlag team={team} />
      <span className="truncate">{team}</span>
    </span>
  );
}
