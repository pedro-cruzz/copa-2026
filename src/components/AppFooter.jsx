import { CalendarDays, GitBranch, Shield, Trophy } from "lucide-react";

export function AppFooter({ note }) {
  return (
    <footer className="app-footer">
      <div className="app-footer-main">
        <a href="/" className="app-footer-brand" aria-label="Copa 2026 pagina inicial">
          <span className="app-footer-icon" aria-hidden="true">
            <Trophy size={20} />
          </span>
          <span>
            <strong>Copa 2026</strong>
            <span>Horarios, grupos e chaveamento</span>
          </span>
        </a>

        <nav className="app-footer-links" aria-label="Links do rodape">
          <a href="/#groups">
            <Trophy size={16} />
            Grupos
          </a>
          <a href="/#schedule">
            <CalendarDays size={16} />
            Jogos
          </a>
          <a href="/selecoes">
            <Shield size={16} />
            Selecoes
          </a>
          <a href="/chaveamento.html">
            <GitBranch size={16} />
            Chaveamento
          </a>
        </nav>
      </div>

      <div className="app-footer-bottom">
        <span>Feito por <strong>Pedro</strong></span>
        {note && <span>{note}</span>}
      </div>
    </footer>
  );
}
