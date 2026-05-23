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

function flagImg(team) {
  const code = flagCodes[team];

  if (!code) {
    return "";
  }

  return `
    <img
      src="https://flagcdn.com/w40/${code}.png"
      srcset="https://flagcdn.com/w80/${code}.png 2x"
      alt="Bandeira de ${team}"
      class="team-flag"
      loading="lazy"
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
            onclick="selectTeam('${team}')"
          >
            ${teamWithFlag(team)}
          </button>
        `).join("")}
      </div>
    </article>
  `).join("");
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
  if (!searchInput || !groupFilter || !teamFilter) {
    window.location.href = `index.html#schedule`;
    return;
  }

  searchInput.value = "";
  groupFilter.value = "all";
  teamFilter.value = team;
  renderSchedule();

  document.querySelector("#schedule").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

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
renderBrazilInfo();
renderGroups();
renderVisualBracket();
renderBracket();
renderSchedule();
