const defaultKits = {
  home: {
    label: "Principal",
    shirt: "#f4f7f5",
    trim: "#35d98b",
    shorts: "#151b1a",
    number: "#101413",
    description: "Base clara"
  },
  away: {
    label: "Reserva",
    shirt: "#151b1a",
    trim: "#dce5df",
    shorts: "#f4f7f5",
    number: "#f4f7f5",
    description: "Base escura"
  },
  goalkeeper: {
    label: "Goleiro",
    shirt: "#35d98b",
    trim: "#dce5df",
    shorts: "#0b1211",
    number: "#07100d",
    description: "Verde"
  }
};

export const teamKits = {
  Argentina: {
    home: { label: "Principal", shirt: "#d7f2ff", trim: "#6bb7df", shorts: "#f8fbff", number: "#102b44", description: "Celeste e branco" },
    away: { label: "Reserva", shirt: "#26265f", trim: "#8ee0ff", shorts: "#111238", number: "#f8fbff", description: "Azul escuro" },
    goalkeeper: { label: "Goleiro", shirt: "#f26749", trim: "#222222", shorts: "#161616", number: "#111111", description: "Laranja" }
  },
  Brasil: {
    home: { label: "Principal", shirt: "#f7df3e", trim: "#1f8f4e", shorts: "#1b4aa8", number: "#1a45a0", description: "Amarelo, verde e azul" },
    away: { label: "Reserva", shirt: "#1d58b7", trim: "#f4df3f", shorts: "#ffffff", number: "#ffffff", description: "Azul" },
    goalkeeper: { label: "Goleiro", shirt: "#1fd16f", trim: "#f7df3e", shorts: "#10231b", number: "#07100d", description: "Verde" }
  },
  Espanha: {
    home: { label: "Principal", shirt: "#c91e2c", trim: "#f7d648", shorts: "#263b7f", number: "#f8fbff", description: "Vermelho" },
    away: { label: "Reserva", shirt: "#f2f2eb", trim: "#d43c34", shorts: "#f2f2eb", number: "#22314f", description: "Claro" },
    goalkeeper: { label: "Goleiro", shirt: "#78d6b3", trim: "#1f5c48", shorts: "#0b2a21", number: "#09231b", description: "Verde água" }
  },
  Franca: {
    home: { label: "Principal", shirt: "#213d91", trim: "#ffffff", shorts: "#ffffff", number: "#ffffff", description: "Azul" },
    away: { label: "Reserva", shirt: "#ffffff", trim: "#d92332", shorts: "#213d91", number: "#213d91", description: "Branco" },
    goalkeeper: { label: "Goleiro", shirt: "#f2a23a", trim: "#213d91", shorts: "#161616", number: "#161616", description: "Laranja" }
  },
  Inglaterra: {
    home: { label: "Principal", shirt: "#f7f7f2", trim: "#253c7f", shorts: "#253c7f", number: "#253c7f", description: "Branco" },
    away: { label: "Reserva", shirt: "#9b2434", trim: "#f1d4c9", shorts: "#9b2434", number: "#ffffff", description: "Vinho" },
    goalkeeper: { label: "Goleiro", shirt: "#70d656", trim: "#122018", shorts: "#122018", number: "#122018", description: "Verde" }
  },
  Mexico: {
    home: { label: "Principal", shirt: "#166b3b", trim: "#ffffff", shorts: "#ffffff", number: "#ffffff", description: "Verde" },
    away: { label: "Reserva", shirt: "#f1efe7", trim: "#af1d35", shorts: "#af1d35", number: "#166b3b", description: "Claro" },
    goalkeeper: { label: "Goleiro", shirt: "#7c2ad1", trim: "#f4e74c", shorts: "#101010", number: "#ffffff", description: "Roxo" }
  },
  Portugal: {
    home: { label: "Principal", shirt: "#b9152d", trim: "#17643a", shorts: "#17643a", number: "#f8fbff", description: "Vermelho e verde" },
    away: { label: "Reserva", shirt: "#f2f0e6", trim: "#b9152d", shorts: "#f2f0e6", number: "#17643a", description: "Claro" },
    goalkeeper: { label: "Goleiro", shirt: "#111111", trim: "#d6d6d6", shorts: "#111111", number: "#ffffff", description: "Preto" }
  },
  Uruguai: {
    home: { label: "Principal", shirt: "#8fd5f7", trim: "#111111", shorts: "#111111", number: "#111111", description: "Celeste" },
    away: { label: "Reserva", shirt: "#ffffff", trim: "#8fd5f7", shorts: "#8fd5f7", number: "#111111", description: "Branco" },
    goalkeeper: { label: "Goleiro", shirt: "#f4c342", trim: "#111111", shorts: "#111111", number: "#111111", description: "Amarelo" }
  }
};

function repairKitText(value) {
  if (typeof value !== "string" || !/[ÃÂ]/.test(value)) {
    return value;
  }

  try {
    return decodeURIComponent(
      value
        .split("")
        .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`)
        .join("")
    );
  } catch {
    return value;
  }
}

function kitKey(value) {
  return repairKitText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const aliases = {
  Franca: "Franca",
  Mexico: "Mexico"
};

export function getTeamKits(team) {
  const repairedTeam = repairKitText(team);
  const normalizedTeam = kitKey(team);
  return teamKits[team] || teamKits[repairedTeam] || teamKits[aliases[normalizedTeam]] || defaultKits;
}
