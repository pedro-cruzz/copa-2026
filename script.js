const matches = [
  { date: "2026-06-11", day: "Quinta, 11/06", time: "16:00", group: "A", home: "México", away: "África do Sul" },
  { date: "2026-06-11", day: "Quinta, 11/06", time: "23:00", group: "A", home: "Coreia do Sul", away: "República Tcheca" },

  { date: "2026-06-12", day: "Sexta, 12/06", time: "16:00", group: "B", home: "Canadá", away: "Bósnia e Herzegovina" },
  { date: "2026-06-12", day: "Sexta, 12/06", time: "22:00", group: "D", home: "Estados Unidos", away: "Paraguai" },

  { date: "2026-06-13", day: "Sábado, 13/06", time: "16:00", group: "B", home: "Catar", away: "Suíça" },
  { date: "2026-06-13", day: "Sábado, 13/06", time: "19:00", group: "C", home: "Brasil", away: "Marrocos" },
  { date: "2026-06-13", day: "Sábado, 13/06", time: "22:00", group: "C", home: "Haiti", away: "Escócia" },

  { date: "2026-06-14", day: "Domingo, 14/06", time: "01:00", group: "D", home: "Austrália", away: "Turquia" },
  { date: "2026-06-14", day: "Domingo, 14/06", time: "14:00", group: "E", home: "Alemanha", away: "Curaçao" },
  { date: "2026-06-14", day: "Domingo, 14/06", time: "17:00", group: "F", home: "Holanda", away: "Japão" },
  { date: "2026-06-14", day: "Domingo, 14/06", time: "20:00", group: "E", home: "Costa do Marfim", away: "Equador" },
  { date: "2026-06-14", day: "Domingo, 14/06", time: "23:00", group: "F", home: "Suécia", away: "Tunísia" },

  { date: "2026-06-15", day: "Segunda, 15/06", time: "13:00", group: "H", home: "Espanha", away: "Cabo Verde" },
  { date: "2026-06-15", day: "Segunda, 15/06", time: "16:00", group: "G", home: "Bélgica", away: "Egito" },
  { date: "2026-06-15", day: "Segunda, 15/06", time: "19:00", group: "H", home: "Arábia Saudita", away: "Uruguai" },
  { date: "2026-06-15", day: "Segunda, 15/06", time: "22:00", group: "G", home: "Irã", away: "Nova Zelândia" },

  { date: "2026-06-16", day: "Terça, 16/06", time: "16:00", group: "I", home: "França", away: "Senegal" },
  { date: "2026-06-16", day: "Terça, 16/06", time: "19:00", group: "I", home: "Iraque", away: "Noruega" },
  { date: "2026-06-16", day: "Terça, 16/06", time: "22:00", group: "J", home: "Argentina", away: "Argélia" },

  { date: "2026-06-17", day: "Quarta, 17/06", time: "01:00", group: "J", home: "Áustria", away: "Jordânia" },
  { date: "2026-06-17", day: "Quarta, 17/06", time: "14:00", group: "K", home: "Portugal", away: "RD Congo" },
  { date: "2026-06-17", day: "Quarta, 17/06", time: "17:00", group: "L", home: "Inglaterra", away: "Croácia" },
  { date: "2026-06-17", day: "Quarta, 17/06", time: "20:00", group: "L", home: "Gana", away: "Panamá" },
  { date: "2026-06-17", day: "Quarta, 17/06", time: "23:00", group: "K", home: "Uzbequistão", away: "Colômbia" },

  { date: "2026-06-18", day: "Quinta, 18/06", time: "13:00", group: "A", home: "República Tcheca", away: "África do Sul" },
  { date: "2026-06-18", day: "Quinta, 18/06", time: "16:00", group: "B", home: "Suíça", away: "Bósnia e Herzegovina" },
  { date: "2026-06-18", day: "Quinta, 18/06", time: "19:00", group: "B", home: "Canadá", away: "Catar" },
  { date: "2026-06-18", day: "Quinta, 18/06", time: "22:00", group: "A", home: "México", away: "Coreia do Sul" },

  { date: "2026-06-19", day: "Sexta, 19/06", time: "16:00", group: "D", home: "Estados Unidos", away: "Austrália" },
  { date: "2026-06-19", day: "Sexta, 19/06", time: "19:00", group: "C", home: "Escócia", away: "Marrocos" },
  { date: "2026-06-19", day: "Sexta, 19/06", time: "21:30", group: "C", home: "Brasil", away: "Haiti" },

  { date: "2026-06-20", day: "Sábado, 20/06", time: "00:00", group: "D", home: "Turquia", away: "Paraguai" },
  { date: "2026-06-20", day: "Sábado, 20/06", time: "14:00", group: "F", home: "Holanda", away: "Suécia" },
  { date: "2026-06-20", day: "Sábado, 20/06", time: "17:00", group: "E", home: "Alemanha", away: "Costa do Marfim" },
  { date: "2026-06-20", day: "Sábado, 20/06", time: "21:00", group: "E", home: "Equador", away: "Curaçao" },

  { date: "2026-06-21", day: "Domingo, 21/06", time: "01:00", group: "F", home: "Tunísia", away: "Japão" },
  { date: "2026-06-21", day: "Domingo, 21/06", time: "13:00", group: "H", home: "Espanha", away: "Arábia Saudita" },
  { date: "2026-06-21", day: "Domingo, 21/06", time: "16:00", group: "G", home: "Bélgica", away: "Irã" },
  { date: "2026-06-21", day: "Domingo, 21/06", time: "19:00", group: "H", home: "Uruguai", away: "Cabo Verde" },
  { date: "2026-06-21", day: "Domingo, 21/06", time: "22:00", group: "G", home: "Nova Zelândia", away: "Egito" },

  { date: "2026-06-22", day: "Segunda, 22/06", time: "14:00", group: "J", home: "Argentina", away: "Áustria" },
  { date: "2026-06-22", day: "Segunda, 22/06", time: "18:00", group: "I", home: "França", away: "Iraque" },
  { date: "2026-06-22", day: "Segunda, 22/06", time: "21:00", group: "I", home: "Noruega", away: "Senegal" },

  { date: "2026-06-23", day: "Terça, 23/06", time: "00:00", group: "J", home: "Jordânia", away: "Argélia" },
  { date: "2026-06-23", day: "Terça, 23/06", time: "14:00", group: "K", home: "Portugal", away: "Uzbequistão" },
  { date: "2026-06-23", day: "Terça, 23/06", time: "17:00", group: "L", home: "Inglaterra", away: "Gana" },
  { date: "2026-06-23", day: "Terça, 23/06", time: "20:00", group: "L", home: "Panamá", away: "Croácia" },
  { date: "2026-06-23", day: "Terça, 23/06", time: "23:00", group: "K", home: "Colômbia", away: "RD Congo" },

  { date: "2026-06-24", day: "Quarta, 24/06", time: "16:00", group: "B", home: "Bósnia e Herzegovina", away: "Catar" },
  { date: "2026-06-24", day: "Quarta, 24/06", time: "16:00", group: "B", home: "Suíça", away: "Canadá" },
  { date: "2026-06-24", day: "Quarta, 24/06", time: "19:00", group: "C", home: "Marrocos", away: "Haiti" },
  { date: "2026-06-24", day: "Quarta, 24/06", time: "19:00", group: "C", home: "Escócia", away: "Brasil" },
  { date: "2026-06-24", day: "Quarta, 24/06", time: "22:00", group: "A", home: "República Tcheca", away: "México" },
  { date: "2026-06-24", day: "Quarta, 24/06", time: "22:00", group: "A", home: "África do Sul", away: "Coreia do Sul" },

  { date: "2026-06-25", day: "Quinta, 25/06", time: "17:00", group: "E", home: "Curaçao", away: "Costa do Marfim" },
  { date: "2026-06-25", day: "Quinta, 25/06", time: "17:00", group: "E", home: "Equador", away: "Alemanha" },
  { date: "2026-06-25", day: "Quinta, 25/06", time: "20:00", group: "F", home: "Japão", away: "Suécia" },
  { date: "2026-06-25", day: "Quinta, 25/06", time: "20:00", group: "F", home: "Tunísia", away: "Holanda" },
  { date: "2026-06-25", day: "Quinta, 25/06", time: "23:00", group: "D", home: "Paraguai", away: "Austrália" },
  { date: "2026-06-25", day: "Quinta, 25/06", time: "23:00", group: "D", home: "Turquia", away: "Estados Unidos" },

  { date: "2026-06-26", day: "Sexta, 26/06", time: "16:00", group: "I", home: "Noruega", away: "França" },
  { date: "2026-06-26", day: "Sexta, 26/06", time: "16:00", group: "I", home: "Senegal", away: "Iraque" },
  { date: "2026-06-26", day: "Sexta, 26/06", time: "21:00", group: "H", home: "Cabo Verde", away: "Arábia Saudita" },
  { date: "2026-06-26", day: "Sexta, 26/06", time: "21:00", group: "H", home: "Uruguai", away: "Espanha" },

  { date: "2026-06-27", day: "Sábado, 27/06", time: "00:00", group: "G", home: "Egito", away: "Irã" },
  { date: "2026-06-27", day: "Sábado, 27/06", time: "00:00", group: "G", home: "Nova Zelândia", away: "Bélgica" },
  { date: "2026-06-27", day: "Sábado, 27/06", time: "19:00", group: "L", home: "Croácia", away: "Gana" },
  { date: "2026-06-27", day: "Sábado, 27/06", time: "19:00", group: "L", home: "Panamá", away: "Inglaterra" },
  { date: "2026-06-27", day: "Sábado, 27/06", time: "21:30", group: "K", home: "Colômbia", away: "Portugal" },
  { date: "2026-06-27", day: "Sábado, 27/06", time: "21:30", group: "K", home: "RD Congo", away: "Uzbequistão" },
  { date: "2026-06-27", day: "Sábado, 27/06", time: "23:00", group: "J", home: "Argélia", away: "Áustria" },
  { date: "2026-06-27", day: "Sábado, 27/06", time: "23:00", group: "J", home: "Jordânia", away: "Argentina" }
];

const groups = {
  A: ["México", "África do Sul", "Coreia do Sul", "República Tcheca"],
  B: ["Canadá", "Bósnia e Herzegovina", "Catar", "Suíça"],
  C: ["Brasil", "Marrocos", "Haiti", "Escócia"],
  D: ["Estados Unidos", "Paraguai", "Austrália", "Turquia"],
  E: ["Alemanha", "Curaçao", "Costa do Marfim", "Equador"],
  F: ["Holanda", "Japão", "Suécia", "Tunísia"],
  G: ["Bélgica", "Egito", "Irã", "Nova Zelândia"],
  H: ["Espanha", "Cabo Verde", "Arábia Saudita", "Uruguai"],
  I: ["França", "Senegal", "Iraque", "Noruega"],
  J: ["Argentina", "Argélia", "Áustria", "Jordânia"],
  K: ["Portugal", "RD Congo", "Uzbequistão", "Colômbia"],
  L: ["Inglaterra", "Croácia", "Gana", "Panamá"]
};

const flagCodes = {
  "África do Sul": "za",
  "Alemanha": "de",
  "Arábia Saudita": "sa",
  "Argélia": "dz",
  "Argentina": "ar",
  "Austrália": "au",
  "Áustria": "at",
  "Bélgica": "be",
  "Bósnia e Herzegovina": "ba",
  "Brasil": "br",
  "Cabo Verde": "cv",
  "Canadá": "ca",
  "Catar": "qa",
  "Colômbia": "co",
  "Coreia do Sul": "kr",
  "Costa do Marfim": "ci",
  "Croácia": "hr",
  "Curaçao": "cw",
  "Egito": "eg",
  "Equador": "ec",
  "Escócia": "gb-sct",
  "Espanha": "es",
  "Estados Unidos": "us",
  "França": "fr",
  "Gana": "gh",
  "Haiti": "ht",
  "Holanda": "nl",
  "Inglaterra": "gb-eng",
  "Irã": "ir",
  "Iraque": "iq",
  "Japão": "jp",
  "Jordânia": "jo",
  "Marrocos": "ma",
  "México": "mx",
  "Noruega": "no",
  "Nova Zelândia": "nz",
  "Panamá": "pa",
  "Paraguai": "py",
  "Portugal": "pt",
  "RD Congo": "cd",
  "República Tcheca": "cz",
  "Senegal": "sn",
  "Suécia": "se",
  "Suíça": "ch",
  "Tunísia": "tn",
  "Turquia": "tr",
  "Uruguai": "uy",
  "Uzbequistão": "uz"
};

const subdivisionFlagEmojis = {
  "gb-eng": "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67\uDB40\uDC7F",
  "gb-sct": "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74\uDB40\uDC7F"
};

function flagEmoji(code) {
  if (subdivisionFlagEmojis[code]) {
    return subdivisionFlagEmojis[code];
  }

  if (!/^[a-z]{2}$/.test(code)) {
    return "";
  }

  return code
    .toUpperCase()
    .split("")
    .map(letter => String.fromCodePoint(letter.charCodeAt(0) + 127397))
    .join("");
}

const teamCuriosityNotes = {
  "África do Sul": "Foi o primeiro país africano a sediar uma Copa do Mundo, em 2010.",
  "Alemanha": "É tetracampeã mundial e uma das seleções mais constantes em fases finais.",
  "Arábia Saudita": "Assinou uma das maiores zebras recentes ao vencer a Argentina na Copa de 2022.",
  "Argélia": "A campanha de 1982 ficou marcada por vitórias fortes na fase de grupos.",
  "Argentina": "É tricampeã mundial, com títulos em 1978, 1986 e 2022.",
  "Austrália": "Passou a disputar as Eliminatórias Asiáticas depois de deixar a Oceania.",
  "Áustria": "Foi terceira colocada na Copa de 1954, sua melhor campanha no torneio.",
  "Bélgica": "Terminou a Copa de 2018 em terceiro lugar, sua melhor posição histórica.",
  "Bósnia e Herzegovina": "Disputou sua primeira Copa como país independente em 2014.",
  "Brasil": "É o maior campeão mundial e a única seleção presente em todas as Copas.",
  "Cabo Verde": "Tem uma seleção marcada pela diáspora e pelo crescimento recente no futebol africano.",
  "Canadá": "É uma das sedes da Copa de 2026, junto de Estados Unidos e México.",
  "Catar": "Sediou a Copa de 2022, a primeira realizada no Oriente Médio.",
  "Colômbia": "Chegou às quartas de final em 2014, sua melhor campanha em Copas.",
  "Coreia do Sul": "Foi semifinalista em 2002, quando sediou o torneio com o Japão.",
  "Costa do Marfim": "É conhecida pelo apelido Elefantes e por gerações muito físicas.",
  "Croácia": "Foi finalista em 2018 e terceira colocada em 1998 e 2022.",
  "Curaçao": "Carrega a herança futebolística das antigas Antilhas Holandesas.",
  "Egito": "Foi a primeira seleção africana a disputar uma Copa, em 1934.",
  "Equador": "Estreou em Copas em 2002 e cresceu muito no cenário sul-americano.",
  "Escócia": "É uma das seleções mais antigas do futebol internacional.",
  "Espanha": "Foi campeã mundial em 2010, com uma geração famosa pela posse de bola.",
  "Estados Unidos": "É uma das sedes de 2026 e disputou a primeira Copa, em 1930.",
  "França": "É bicampeã mundial, com títulos em 1998 e 2018.",
  "Gana": "Chegou às quartas de final em 2010, campanha histórica para o país.",
  "Haiti": "Disputou a Copa de 1974, sua participação mais lembrada no torneio.",
  "Holanda": "É famosa pelo futebol total e por três finais de Copa.",
  "Inglaterra": "Foi campeã mundial em 1966, jogando em casa.",
  "Irã": "Estreou em Copas em 1978 e virou presença frequente no torneio.",
  "Iraque": "Disputou sua primeira Copa do Mundo em 1986.",
  "Japão": "Está presente em todas as Copas desde 1998.",
  "Jordânia": "Vem se destacando no futebol asiático em campanhas recentes.",
  "Marrocos": "Foi a primeira seleção africana a chegar às semifinais de uma Copa, em 2022.",
  "México": "É uma das sedes de 2026 e tem forte tradição em jogos de Copa.",
  "Noruega": "Venceu o Brasil na Copa de 1998, em um dos jogos mais lembrados do país.",
  "Nova Zelândia": "Terminou a fase de grupos de 2010 invicta.",
  "Panamá": "Fez sua estreia em Copas em 2018.",
  "Paraguai": "Chegou às quartas de final em 2010, sua melhor campanha.",
  "Portugal": "Foi terceiro colocado em 1966, com Eusébio como grande destaque.",
  "RD Congo": "Disputou a Copa de 1974 com o nome Zaire.",
  "República Tcheca": "Herda a tradição da Tchecoslováquia, finalista em 1934 e 1962.",
  "Senegal": "Chegou às quartas de final em 2002, logo em sua estreia em Copas.",
  "Suécia": "Foi vice-campeã mundial em 1958, quando sediou o torneio.",
  "Suíça": "É presença frequente em Copas recentes e costuma ser competitiva defensivamente.",
  "Tunísia": "Conquistou a primeira vitória africana em Copas, em 1978.",
  "Turquia": "Foi terceira colocada na Copa de 2002.",
  "Uruguai": "Foi o primeiro campeão mundial, em 1930, e também venceu em 1950.",
  "Uzbequistão": "É uma força tradicional da Ásia Central e costuma revelar equipes competitivas."
};

function flagImg(team) {
  const code = flagCodes[team];

  if (!code) {
    return "";
  }

  return `
    <span class="team-flag-fallback" aria-hidden="true">${flagEmoji(code)}</span>
    <img
      src="https://flagcdn.com/w40/${code}.png"
      srcset="https://flagcdn.com/w80/${code}.png 2x"
      alt="Bandeira de ${team}"
      class="team-flag"
      loading="lazy"
      onload="this.previousElementSibling.hidden = true"
      onerror="this.remove()"
    />
  `;
}

function teamWithFlag(team) {
  return `
    <span class="team-with-flag">
      ${flagImg(team)}
      <span>${team}</span>
    </span>
  `;
}

const bracket = [
  {
    phase: "32 avos de final",
    matches: [
      "1º Grupo A x 3º Grupo C/D/E/F/I",
      "2º Grupo L x 2º Grupo E",
      "1º Grupo C x 3º Grupo H/I/J/K/L",
      "1º Grupo E x 3º Grupo A/B/C/D/F",
      "1º Grupo I x 3º Grupo C/D/F/G/H",
      "2º Grupo A x 2º Grupo B",
      "1º Grupo L x 3º Grupo E/H/I/J/K",
      "1º Grupo D x 3º Grupo B/E/F/I/J",
      "1º Grupo G x 3º Grupo A/E/H/I/J",
      "2º Grupo K x 2º Grupo I",
      "1º Grupo B x 3º Grupo E/F/G/I/J",
      "1º Grupo J x 3º Grupo C/D/F/G/H",
      "1º Grupo H x 3º Grupo A/B/C/D/F",
      "2º Grupo F x 2º Grupo C",
      "1º Grupo K x 3º Grupo D/E/I/J/L",
      "2º Grupo D x 2º Grupo G"
    ]
  },
  {
    phase: "Oitavas de final",
    matches: [
      "Vencedor Jogo 73 x Vencedor Jogo 74",
      "Vencedor Jogo 75 x Vencedor Jogo 76",
      "Vencedor Jogo 77 x Vencedor Jogo 78",
      "Vencedor Jogo 79 x Vencedor Jogo 80",
      "Vencedor Jogo 81 x Vencedor Jogo 82",
      "Vencedor Jogo 83 x Vencedor Jogo 84",
      "Vencedor Jogo 85 x Vencedor Jogo 86",
      "Vencedor Jogo 87 x Vencedor Jogo 88"
    ]
  },
  {
    phase: "Quartas de final",
    matches: [
      "Vencedor Oitavas 1 x Vencedor Oitavas 2",
      "Vencedor Oitavas 3 x Vencedor Oitavas 4",
      "Vencedor Oitavas 5 x Vencedor Oitavas 6",
      "Vencedor Oitavas 7 x Vencedor Oitavas 8"
    ]
  },
  {
    phase: "Semifinais e finais",
    matches: [
      "Vencedor Quartas 1 x Vencedor Quartas 2",
      "Vencedor Quartas 3 x Vencedor Quartas 4",
      "Disputa de 3º lugar",
      "Final"
    ]
  }
];

const groupsGrid = document.querySelector("#groupsGrid");
const bracketGrid = document.querySelector("#bracketGrid");
const visualBracket = document.querySelector("#visualBracket");
const schedule = document.querySelector("#scheduleList");
const searchInput = document.querySelector("#searchInput");
const groupFilter = document.querySelector("#groupFilter");
const teamFilter = document.querySelector("#teamFilter");
const clearBtn = document.querySelector("#clearBtn");
const totalMatches = document.querySelector("#totalMatches");
const visibleCount = document.querySelector("#visibleCount");
const brazilInfo = document.querySelector("#brazilInfo");
const installAppButtons = [...document.querySelectorAll("[data-install-app]")];
let teamModalBackdrop = null;
let lastFocusedElement = null;
let deferredInstallPrompt = null;

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isBrazilMatch(match) {
  return match.home === "Brasil" || match.away === "Brasil";
}

function getTeams() {
  return [...new Set(matches.flatMap(match => [match.home, match.away]))].sort((a, b) =>
    a.localeCompare(b, "pt-BR")
  );
}

function getGroups() {
  return [...new Set(matches.map(match => match.group))].sort();
}

function fillFilters() {
  if (!groupFilter || !teamFilter) {
    return;
  }

  getGroups().forEach(group => {
    const option = document.createElement("option");
    option.value = group;
    option.textContent = `Grupo ${group}`;
    groupFilter.appendChild(option);
  });

  getTeams().forEach(team => {
    const option = document.createElement("option");
    option.value = team;
    option.textContent = team;
    teamFilter.appendChild(option);
  });
}

function getFilteredMatches() {
  if (!searchInput || !groupFilter || !teamFilter) {
    return matches;
  }

  const search = normalizeText(searchInput.value.trim());
  const selectedGroup = groupFilter.value;
  const selectedTeam = teamFilter.value;

  return matches.filter(match => {
    const teams = `${match.home} ${match.away}`;
    const searchMatch = normalizeText(teams).includes(search);
    const groupMatch = selectedGroup === "all" || match.group === selectedGroup;
    const teamMatch = selectedTeam === "all" || match.home === selectedTeam || match.away === selectedTeam;

    return searchMatch && groupMatch && teamMatch;
  });
}

function groupByDay(filteredMatches) {
  return filteredMatches.reduce((acc, match) => {
    if (!acc[match.day]) {
      acc[match.day] = [];
    }

    acc[match.day].push(match);
    return acc;
  }, {});
}

function renderSchedule() {
  if (!schedule || !visibleCount) {
    return;
  }

  const filteredMatches = getFilteredMatches();
  const matchesByDay = groupByDay(filteredMatches);

  schedule.innerHTML = "";
  visibleCount.textContent = `${filteredMatches.length} de ${matches.length} jogos exibidos`;

  if (filteredMatches.length === 0) {
    schedule.innerHTML = `
      <div class="empty-state">
        Nenhum jogo encontrado com esses filtros.
      </div>
    `;
    return;
  }

  Object.entries(matchesByDay).forEach(([day, dayMatches]) => {
    const card = document.createElement("article");
    card.className = "day-card";

    card.innerHTML = `
      <header class="day-head">
        <h3>${day}</h3>
        <span>${dayMatches.length} jogo(s)</span>
      </header>

      <div>
        ${dayMatches.map(match => `
          <div class="match-card ${isBrazilMatch(match) ? "brazil-match" : ""}">
            <strong class="match-time">${match.time}</strong>
            <span class="match-group">
              Grupo ${match.group}
            </span>
            <p class="teams-row">
              ${teamWithFlag(match.home)} <span class="versus">x</span> ${teamWithFlag(match.away)}
            </p>
          </div>
        `).join("")}
      </div>
    `;

    schedule.appendChild(card);
  });
}

function renderBrazilInfo() {
  if (!brazilInfo) {
    return;
  }

  const brazilMatches = matches.filter(isBrazilMatch);

  brazilInfo.innerHTML = brazilMatches.map(match => `
    <article class="brazil-highlight">
      <strong>${match.day}, ${match.time}</strong>
      <p class="teams-row">
        ${teamWithFlag(match.home)} <span class="versus">x</span> ${teamWithFlag(match.away)}
      </p>
    </article>
  `).join("");
}

function setupCounters() {
  if (!totalMatches) {
    return;
  }

  totalMatches.textContent = matches.length;
}

function clearFilters() {
  if (!searchInput || !groupFilter || !teamFilter) {
    return;
  }

  searchInput.value = "";
  groupFilter.value = "all";
  teamFilter.value = "all";
  renderSchedule();
}

function getTeamGroup(team) {
  const foundGroup = Object.entries(groups).find(([, teams]) => teams.includes(team));

  return foundGroup ? foundGroup[0] : "";
}

function getTeamMatches(team) {
  return matches.filter(match => match.home === team || match.away === team);
}

function getOpponent(match, team) {
  return match.home === team ? match.away : match.home;
}

function formatTeamList(teams) {
  if (teams.length <= 1) {
    return teams[0] || "";
  }

  return `${teams.slice(0, -1).join(", ")} e ${teams[teams.length - 1]}`;
}

function getTeamCuriosities(team) {
  const teamMatches = getTeamMatches(team);
  const group = getTeamGroup(team);
  const opponents = teamMatches.map(match => getOpponent(match, team));
  const lastMatch = teamMatches[teamMatches.length - 1];
  const facts = [];

  if (teamCuriosityNotes[team]) {
    facts.push(teamCuriosityNotes[team]);
  }

  if (group) {
    facts.push(`Está no Grupo ${group} e tem ${teamMatches.length} jogos cadastrados na fase de grupos.`);
  }

  if (opponents.length > 0) {
    facts.push(`Enfrenta ${formatTeamList(opponents)} na primeira fase.`);
  }

  if (lastMatch) {
    facts.push(`Fecha a fase de grupos em ${lastMatch.day}, às ${lastMatch.time}, contra ${getOpponent(lastMatch, team)}.`);
  }

  return facts;
}

function ensureTeamModal() {
  if (teamModalBackdrop) {
    return;
  }

  teamModalBackdrop = document.createElement("div");
  teamModalBackdrop.className = "team-modal-backdrop";
  teamModalBackdrop.setAttribute("aria-hidden", "true");

  teamModalBackdrop.addEventListener("click", event => {
    if (event.target === teamModalBackdrop || event.target.closest("[data-close-team-modal]")) {
      closeTeamModal();
    }
  });

  document.body.appendChild(teamModalBackdrop);
}

function openTeamModal(team) {
  ensureTeamModal();

  const teamMatches = getTeamMatches(team);
  const group = getTeamGroup(team);
  const curiosities = getTeamCuriosities(team);
  lastFocusedElement = document.activeElement;

  teamModalBackdrop.innerHTML = `
    <section class="team-modal" role="dialog" aria-modal="true" aria-labelledby="teamModalTitle">
      <header class="team-modal-head">
        <div>
          <p class="eyebrow green">Seleção</p>
          <h2 id="teamModalTitle">${teamWithFlag(team)}</h2>
          <span>Grupo ${group} • ${teamMatches.length} jogos cadastrados</span>
        </div>

        <button type="button" class="modal-close-button" aria-label="Fechar modal" data-close-team-modal>
          ×
        </button>
      </header>

      <div class="team-modal-grid">
        <section class="team-modal-section">
          <h3>Jogos</h3>
          <div class="modal-match-list">
            ${teamMatches.map(match => `
              <article class="modal-match-card ${isBrazilMatch(match) ? "brazil-match" : ""}">
                <strong>${match.day}</strong>
                <span>${match.time} • Grupo ${match.group}</span>
                <p class="teams-row">
                  ${teamWithFlag(match.home)} <span class="versus">x</span> ${teamWithFlag(match.away)}
                </p>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="team-modal-section">
          <h3>Curiosidades</h3>
          <ul class="curiosity-list">
            ${curiosities.map(fact => `<li>${fact}</li>`).join("")}
          </ul>
        </section>
      </div>

      <footer class="team-modal-actions">
        <button type="button" class="secondary-action" data-close-team-modal>Fechar</button>
        <button type="button" class="primary-action" data-filter-team="${team}">Ver na agenda</button>
      </footer>
    </section>
  `;

  const filterButton = teamModalBackdrop.querySelector("[data-filter-team]");
  const closeButton = teamModalBackdrop.querySelector("[data-close-team-modal]");

  filterButton.addEventListener("click", () => filterTeamSchedule(team));

  teamModalBackdrop.classList.add("is-open");
  teamModalBackdrop.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  closeButton.focus();
}

function closeTeamModal() {
  if (!teamModalBackdrop) {
    return;
  }

  teamModalBackdrop.classList.remove("is-open");
  teamModalBackdrop.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

function filterTeamSchedule(team) {
  if (!searchInput || !groupFilter || !teamFilter) {
    window.location.href = `index.html#schedule`;
    return;
  }

  closeTeamModal();
  searchInput.value = "";
  groupFilter.value = "all";
  teamFilter.value = team;
  renderSchedule();

  document.querySelector("#schedule").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function renderGroups() {
  if (!groupsGrid) {
    return;
  }

  groupsGrid.innerHTML = Object.entries(groups).map(([group, teams]) => `
    <article class="group-card">
      <div class="group-head">
        <h3>Grupo ${group}</h3>
        <span class="group-badge">
          4 seleções
        </span>
      </div>

      <div class="team-list">
        ${teams.map(team => `
          <button
            type="button"
            class="team-pill"
            data-team="${team}"
            aria-haspopup="dialog"
          >
            <span class="team-card-main">${teamWithFlag(team)}</span>
            <span class="team-card-meta">Grupo ${group} • ${getTeamMatches(team).length} jogos</span>
          </button>
        `).join("")}
      </div>
    </article>
  `).join("");

  groupsGrid.querySelectorAll(".team-pill").forEach(button => {
    button.addEventListener("click", () => openTeamModal(button.dataset.team));
  });
}

function renderBracket() {
  if (!bracketGrid) {
    return;
  }

  const visiblePhases = visualBracket ? bracket.slice(1) : bracket;

  bracketGrid.innerHTML = visiblePhases.map(phase => `
    <article class="bracket-card">
      <header class="bracket-phase-title">
        <h3>${phase.phase}</h3>
      </header>

      <div class="bracket-list">
        ${phase.matches.map((match, index) => `
          <div class="bracket-item">
            <p class="match-index">
              Jogo ${index + 1}
            </p>
            <p>${match}</p>
          </div>
        `).join("")}
      </div>
    </article>
  `).join("");
}

function renderVisualBracket() {
  if (!visualBracket) {
    return;
  }

  const roundOf16 = bracket[1].matches;
  const quarterFinals = bracket[2].matches;
  const semiFinals = bracket[3].matches.slice(0, 2);

  visualBracket.innerHTML = `
    <div class="knockout-board">
      <svg class="bracket-lines" viewBox="0 0 1200 720" preserveAspectRatio="none" aria-hidden="true">
        <path d="M170 104 H226 V194 H288" />
        <path d="M170 260 H226 V194" />
        <path d="M170 416 H226 V506 H288" />
        <path d="M170 572 H226 V506" />

        <path d="M370 194 H420 V360 H470" />
        <path d="M370 506 H420 V360" />
        <path d="M540 360 H585" />

        <path d="M1030 104 H974 V194 H912" />
        <path d="M1030 260 H974 V194" />
        <path d="M1030 416 H974 V506 H912" />
        <path d="M1030 572 H974 V506" />

        <path d="M830 194 H780 V360 H730" />
        <path d="M830 506 H780 V360" />
        <path d="M660 360 H615" />
      </svg>

      ${renderVisualStage("Oitavas", roundOf16.slice(0, 4), 89, "left", "r16")}
      ${renderVisualStage("Quartas", quarterFinals.slice(0, 2), 97, "left", "qf")}
      ${renderVisualStage("Semifinal", semiFinals.slice(0, 1), 101, "left", "sf")}

      <section class="champion-stage" aria-label="Campeão">
        <p>Road to 2026</p>
        <img
          src="img/world-cup-trophy.png"
          alt="Troféu da Copa do Mundo"
          class="world-cup-trophy"
        />
        <h3>Campeão</h3>
        <span>Vencedor da final</span>
      </section>

      ${renderVisualStage("Semifinal", semiFinals.slice(1, 2), 102, "right", "sf")}
      ${renderVisualStage("Quartas", quarterFinals.slice(2, 4), 99, "right", "qf")}
      ${renderVisualStage("Oitavas", roundOf16.slice(4, 8), 93, "right", "r16")}
    </div>
  `;
}

function renderVisualStage(title, matches, firstGameNumber, side, round) {
  return `
    <section class="visual-stage visual-stage-${round} visual-stage-${side}">
      <h3>${title}</h3>
      <div class="visual-stage-matches">
        ${matches.map((match, index) => renderVisualMatch(match, firstGameNumber + index, side)).join("")}
      </div>
    </section>
  `;
}

function renderVisualMatch(match, gameNumber, side) {
  const [homePosition, awayPosition] = match.split(" x ");

  return `
    <article class="visual-match visual-match-${side}">
      <span>Jogo ${gameNumber}</span>
      <strong>${homePosition}</strong>
      <strong>${awayPosition}</strong>
    </article>
  `;
}

function selectTeam(team) {
  openTeamModal(team);
}

function setupServiceWorker() {
  if (!("serviceWorker" in navigator) || !window.isSecureContext) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(error => {
      console.warn("Service worker registration failed:", error);
    });
  });
}

function isAppInstalled() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
}

function getInstallHelpMessage() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isIos = /iphone|ipad|ipod/.test(userAgent);
  const isAndroid = /android/.test(userAgent);

  if (isAppInstalled()) {
    return "O app ja esta instalado neste dispositivo.";
  }

  if (isIos) {
    return "No iPhone/iPad, toque em Compartilhar e depois em Adicionar a Tela de Inicio.";
  }

  if (isAndroid) {
    return "No Android, abra o menu do navegador e toque em Instalar app ou Adicionar a tela inicial.";
  }

  return "No Chrome ou Edge desktop, use o icone de instalar na barra de endereco ou o menu do navegador.";
}

function setupInstallPrompt() {
  if (!installAppButtons.length) {
    return;
  }

  installAppButtons.forEach(button => {
    button.hidden = isAppInstalled();
  });

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredInstallPrompt = event;
    installAppButtons.forEach(button => {
      button.hidden = false;
    });
  });

  installAppButtons.forEach(button => button.addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
      window.alert(getInstallHelpMessage());
      return;
    }

    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
  }));

  window.addEventListener("appinstalled", () => {
    installAppButtons.forEach(button => {
      button.hidden = true;
    });
    deferredInstallPrompt = null;
  });
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && teamModalBackdrop?.classList.contains("is-open")) {
    closeTeamModal();
  }
});

if (searchInput) {
  searchInput.addEventListener("input", renderSchedule);
}

if (groupFilter) {
  groupFilter.addEventListener("change", renderSchedule);
}

if (teamFilter) {
  teamFilter.addEventListener("change", renderSchedule);
}

if (clearBtn) {
  clearBtn.addEventListener("click", clearFilters);
}

fillFilters();
setupCounters();
setupServiceWorker();
setupInstallPrompt();
renderBrazilInfo();
renderGroups();
renderVisualBracket();
renderBracket();
renderSchedule();
