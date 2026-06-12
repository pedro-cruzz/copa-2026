import { Activity, CalendarDays, Download, GitBranch, Home, Shield, Trophy } from "lucide-react";
import { useInstallPrompt } from "../hooks/useInstallPrompt";

export function Navigation({ page }) {
  const installPrompt = useInstallPrompt();

  return (
    <>
      <header className="topbar" aria-label="Navegação principal">
        <a href="/" className="brand-mark" aria-label="Copa 2026 página inicial">
          <span className="brand-icon" aria-hidden="true">
            <Trophy size={20} />
          </span>
          <span>
            <span className="brand-title">Copa 2026</span>
            <span className="brand-subtitle">Horário de Brasília</span>
          </span>
        </a>

        <nav className="nav-links">
          <a href="/#groups" className={page === "home" ? "" : ""}>
            Grupos
          </a>
          <a href="/#live-center">Ao vivo</a>
          <a href="/selecoes" className={page === "teams" ? "active" : ""}>
            Selecoes
          </a>
          <a href="/chaveamento.html" className={page === "bracket" ? "active" : ""}>
            Chaveamento
          </a>
          <a href="/#schedule">Jogos</a>
          {installPrompt.canInstall && (
            <button type="button" className="install-button" onClick={installPrompt.install}>
              <Download size={16} />
              Instalar App
            </button>
          )}
        </nav>
      </header>

      <nav className="bottom-nav" aria-label="Navegação inferior">
        <a href="/" className={page === "home" ? "active" : ""}>
          <Home size={20} />
          <span>Início</span>
        </a>
        <a href="/#groups">
          <Trophy size={20} />
          <span>Grupos</span>
        </a>
        <a href="/#live-center">
          <Activity size={20} />
          <span>Ao vivo</span>
        </a>
        <a href="/selecoes" className={page === "teams" ? "active" : ""}>
          <Shield size={20} />
          <span>Times</span>
        </a>
        <a href="/#schedule">
          <CalendarDays size={20} />
          <span>Jogos</span>
        </a>
        <a href="/chaveamento.html" className={page === "bracket" ? "active" : ""}>
          <GitBranch size={20} />
          <span>Chaves</span>
        </a>
      </nav>
    </>
  );
}
