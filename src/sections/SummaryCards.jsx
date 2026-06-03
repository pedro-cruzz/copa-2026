import { motion } from "framer-motion";
import { Goal, ShieldCheck, Trophy } from "lucide-react";

const cards = [
  {
    icon: ShieldCheck,
    eyebrow: "Formato",
    title: "48 seleções",
    text: "A fase de grupos tem 12 grupos com 4 seleções. Avançam os 2 primeiros de cada grupo e os 8 melhores terceiros colocados."
  },
  {
    icon: Goal,
    eyebrow: "Fase de grupos",
    title: "72 jogos",
    text: "Cada seleção joga 3 vezes. Os jogos da última rodada de cada grupo acontecem simultaneamente."
  },
  {
    icon: Trophy,
    eyebrow: "Mata-mata",
    title: "32 classificados",
    text: "O mata-mata começa na fase de 32 avos de final e segue até a final."
  }
];

export function SummaryCards() {
  return (
    <section className="summary-grid" aria-label="Resumo do torneio">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.article
            key={card.title}
            className="info-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.06, duration: 0.45 }}
          >
            <Icon size={22} aria-hidden="true" />
            <p className="eyebrow">{card.eyebrow}</p>
            <h2>{card.title}</h2>
            <p>{card.text}</p>
          </motion.article>
        );
      })}
    </section>
  );
}
