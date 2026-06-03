import { useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { RefreshCw } from "lucide-react";
import { BackgroundFX } from "./components/BackgroundFX";
import { Navigation } from "./components/Navigation";
import { BracketPage } from "./sections/BracketPage";
import { GroupsSection } from "./sections/GroupsSection";
import { Hero } from "./sections/Hero";
import { ScheduleSection } from "./sections/ScheduleSection";
import { SummaryCards } from "./sections/SummaryCards";
import { TeamModal } from "./sections/TeamModal";

function UpdateToast() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW({
    onRegistered(registration) {
      registration?.update?.();
    }
  });

  if (!needRefresh) {
    return null;
  }

  return (
    <div className="update-toast" role="status">
      <span>Nova versão disponível.</span>
      <button type="button" onClick={() => updateServiceWorker(true)}>
        <RefreshCw size={16} />
        Atualizar
      </button>
      <button type="button" onClick={() => setNeedRefresh(false)} aria-label="Fechar aviso">
        Depois
      </button>
    </div>
  );
}

function HomePage() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [filters, setFilters] = useState({ search: "", group: "all", team: "all" });

  useEffect(() => {
    document.body.classList.toggle("modal-open", Boolean(selectedTeam));
    return () => document.body.classList.remove("modal-open");
  }, [selectedTeam]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedTeam(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filterTeam = (team) => {
    setSelectedTeam(null);
    setFilters({ search: "", group: "all", team });
    requestAnimationFrame(() => {
      document.querySelector("#schedule")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <main className="page-shell">
      <Navigation page="home" />
      <Hero />
      <SummaryCards />
      <GroupsSection onSelectTeam={setSelectedTeam} />
      <ScheduleSection filters={filters} setFilters={setFilters} />
      <TeamModal team={selectedTeam} onClose={() => setSelectedTeam(null)} onFilterTeam={filterTeam} />
      <footer>Dados organizados para visualização. Confira a tabela oficial antes dos jogos, pois horários podem mudar.</footer>
    </main>
  );
}

export default function App() {
  const isBracketPage = window.location.pathname.toLowerCase().includes("chaveamento");

  return (
    <>
      <BackgroundFX />
      {isBracketPage ? <BracketPage /> : <HomePage />}
      <UpdateToast />
    </>
  );
}
