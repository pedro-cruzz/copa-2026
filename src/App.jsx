import { Component, lazy, Suspense, useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { RefreshCw } from "lucide-react";
import { AppFooter } from "./components/AppFooter";
import { BackgroundFX } from "./components/BackgroundFX";
import { Navigation } from "./components/Navigation";
import { GroupsSection } from "./sections/GroupsSection";
import { Hero } from "./sections/Hero";
import { ScheduleSection } from "./sections/ScheduleSection";
import { SummaryCards } from "./sections/SummaryCards";
import { TeamModal } from "./sections/TeamModal";
// import { TodayMatchesSection } from "./sections/TodayMatchesSection";
import { TeamsPage } from "./TeamsPage"; // nova página de seleções

const BracketPage = lazy(() => 
  import("./sections/BracketPage").then((module) => ({ default: module.BracketPage }))
);

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    if (this.state.error) {
      return (
        <main className="page-shell">
          <section className="app-error-panel">
            <span className="live-chip">Erro no app</span>
            <h1>O site nao conseguiu renderizar.</h1>
            <p>{this.state.error.message || "Erro desconhecido."}</p>
            <button type="button" className="primary-action" onClick={() => window.location.reload()}>
              Recarregar
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

function UpdateToast() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW({
    onRegistered(registration) {
      registration?.update?.();
    }
  });

  if (!needRefresh) return null;

  return (
    <div className="update-toast" role="status">
      <span>Nova versão disponível.</span>
      <button type="button" onClick={() => updateServiceWorker(true)}>
        <RefreshCw size={16} /> Atualizar
      </button>
      <button type="button" onClick={() => setNeedRefresh(false)} aria-label="Fechar aviso">
        Depois
      </button>
    </div>
  );
}

function HomePageWrapper() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [filters, setFilters] = useState({ search: "", group: "all", team: "all" });

  useEffect(() => {
    document.body.classList.toggle("modal-open", Boolean(selectedTeam));
    return () => document.body.classList.remove("modal-open");
  }, [selectedTeam]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedTeam(null);
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
      {/* <TodayMatchesSection /> */}
      <GroupsSection onSelectTeam={setSelectedTeam} />
      <ScheduleSection filters={filters} setFilters={setFilters} />
      <TeamModal team={selectedTeam} onClose={() => setSelectedTeam(null)} onFilterTeam={filterTeam} />
      <AppFooter note="Dados organizados para visualizacao. Confira a tabela oficial antes dos jogos, pois horarios podem mudar." />
    </main>
  );
}

export default function App() {
  const pathname = window.location.pathname.toLowerCase();
  const isBracketPage = pathname.includes("chaveamento");
  const isTeamsPage = pathname.includes("selecoes");

  return (
    <>
      <BackgroundFX />
      <AppErrorBoundary>
        {isBracketPage ? (
          <Suspense fallback={null}>
            <BracketPage />
          </Suspense>
        ) : isTeamsPage ? (
          <TeamsPage />
        ) : (
          <HomePageWrapper />
        )}
        <UpdateToast />
      </AppErrorBoundary>
    </>
  );
}
