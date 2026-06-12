const defaultKits = {
  home: {
    label: "Principal",
    shirt: "#f4f7f5",
    trim: "#35d98b",
    shorts: "#151b1a",
    number: "#101413"
  },
  away: {
    label: "Reserva",
    shirt: "#151b1a",
    trim: "#dce5df",
    shorts: "#f4f7f5",
    number: "#f4f7f5"
  },
  goalkeeper: {
    label: "Goleiro",
    shirt: "#35d98b",
    trim: "#dce5df",
    shorts: "#0b1211",
    number: "#07100d"
  }
};

export const teamKits = {
  Argentina: {
    home: { label: "Principal", shirt: "#d7f2ff", trim: "#6bb7df", shorts: "#f8fbff", number: "#102b44" },
    away: { label: "Reserva", shirt: "#26265f", trim: "#8ee0ff", shorts: "#111238", number: "#f8fbff" },
    goalkeeper: { label: "Goleiro", shirt: "#f26749", trim: "#222222", shorts: "#161616", number: "#111111" }
  },
  Brasil: {
    home: { label: "Principal", shirt: "#f7df3e", trim: "#1f8f4e", shorts: "#1b4aa8", number: "#1a45a0" },
    away: { label: "Reserva", shirt: "#1d58b7", trim: "#f4df3f", shorts: "#ffffff", number: "#ffffff" },
    goalkeeper: { label: "Goleiro", shirt: "#1fd16f", trim: "#f7df3e", shorts: "#10231b", number: "#07100d" }
  },
  Espanha: {
    home: { label: "Principal", shirt: "#c91e2c", trim: "#f7d648", shorts: "#263b7f", number: "#f8fbff" },
    away: { label: "Reserva", shirt: "#f2f2eb", trim: "#d43c34", shorts: "#f2f2eb", number: "#22314f" },
    goalkeeper: { label: "Goleiro", shirt: "#78d6b3", trim: "#1f5c48", shorts: "#0b2a21", number: "#09231b" }
  },
  Franca: {
    home: { label: "Principal", shirt: "#213d91", trim: "#ffffff", shorts: "#ffffff", number: "#ffffff" },
    away: { label: "Reserva", shirt: "#ffffff", trim: "#d92332", shorts: "#213d91", number: "#213d91" },
    goalkeeper: { label: "Goleiro", shirt: "#f2a23a", trim: "#213d91", shorts: "#161616", number: "#161616" }
  },
  Inglaterra: {
    home: { label: "Principal", shirt: "#f7f7f2", trim: "#253c7f", shorts: "#253c7f", number: "#253c7f" },
    away: { label: "Reserva", shirt: "#9b2434", trim: "#f1d4c9", shorts: "#9b2434", number: "#ffffff" },
    goalkeeper: { label: "Goleiro", shirt: "#70d656", trim: "#122018", shorts: "#122018", number: "#122018" }
  },
  Mexico: {
    home: { label: "Principal", shirt: "#166b3b", trim: "#ffffff", shorts: "#ffffff", number: "#ffffff" },
    away: { label: "Reserva", shirt: "#f1efe7", trim: "#af1d35", shorts: "#af1d35", number: "#166b3b" },
    goalkeeper: { label: "Goleiro", shirt: "#7c2ad1", trim: "#f4e74c", shorts: "#101010", number: "#ffffff" }
  },
  Portugal: {
    home: { label: "Principal", shirt: "#b9152d", trim: "#17643a", shorts: "#17643a", number: "#f8fbff" },
    away: { label: "Reserva", shirt: "#f2f0e6", trim: "#b9152d", shorts: "#f2f0e6", number: "#17643a" },
    goalkeeper: { label: "Goleiro", shirt: "#111111", trim: "#d6d6d6", shorts: "#111111", number: "#ffffff" }
  },
  Uruguai: {
    home: { label: "Principal", shirt: "#8fd5f7", trim: "#111111", shorts: "#111111", number: "#111111" },
    away: { label: "Reserva", shirt: "#ffffff", trim: "#8fd5f7", shorts: "#8fd5f7", number: "#111111" },
    goalkeeper: { label: "Goleiro", shirt: "#f4c342", trim: "#111111", shorts: "#111111", number: "#111111" }
  }
};

const aliases = {
  "Franca": "Franca",
  "França": "Franca",
  "Mexico": "Mexico",
  "México": "Mexico"
};

export function getTeamKits(team) {
  return teamKits[team] || teamKits[aliases[team]] || defaultKits;
}
