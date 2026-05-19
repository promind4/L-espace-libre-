/**
 * TrustPillars — trois engagements de marque.
 * Port fidèle du prototype `ui_kits/marketing-site/Sections.jsx`.
 */
import { Icon, type IconName } from "@/components/ui/Icon";

interface Pillar {
  icon: IconName;
  title: string;
  body: string;
  tone: "navy" | "eco";
}

const PILLARS: Pillar[] = [
  {
    icon: "shield-check",
    title: "Sécurité",
    body: "Assurance RC Pro incluse. Vos biens et votre logement protégés pendant toute l'intervention.",
    tone: "navy",
  },
  {
    icon: "recycle",
    title: "Éthique",
    body: "Charte 0 gaspillage. Dons aux associations locales et tri vers les filières de Recyclage 33.",
    tone: "eco",
  },
  {
    icon: "zap",
    title: "Vitesse",
    body: "Devis final sous 2 heures par photo. Intervention planifiée dans la semaine, parfois sous 48 h.",
    tone: "navy",
  },
];

export function TrustPillars() {
  return (
    <section className="trust">
      <div className="container">
        <div className="section__head">
          <div className="section__eyebrow">Nos engagements</div>
          <h2 className="section__title">Trois piliers, zéro mauvaise surprise.</h2>
          <p className="section__lead">
            Nous savons qu&apos;un débarras arrive rarement dans un bon moment.
            Chacun de nos engagements est conçu pour vous décharger.
          </p>
        </div>
        <div className="pillars">
          {PILLARS.map((p) => (
            <div className="pillar" key={p.title}>
              <div className={`pillar__icon ${p.tone === "eco" ? "eco" : ""}`}>
                <Icon name={p.icon} />
              </div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
