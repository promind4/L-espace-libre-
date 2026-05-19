/**
 * ProcessSteps — 4 étapes du processus de débarras.
 * Sprint R2 (redesign v2) : ancré dans le tier Deep du Concept A,
 * eyebrow avec Spark variant light, end-mark sous le CTA.
 *
 * La transparence du processus reste l'un des meilleurs outils de
 * réassurance — surtout pour un visiteur qui n'a jamais mandaté
 * un débarrasseur et qui veut savoir « ce qui va m'arriver ».
 */
import { Icon, type IconName } from "@/components/ui/Icon";
import { Spark } from "@/components/ui/Spark";
import { Tier } from "@/components/ui/Tier";

interface Step {
  num: string;
  icon: IconName;
  title: string;
  body: string;
  meta: string;
}

const STEPS: Step[] = [
  {
    num: "1",
    icon: "phone",
    title: "Prise de contact",
    body: "Vous nous écrivez par formulaire, e-mail ou WhatsApp avec quelques photos du bien à débarrasser. Pas besoin de mesurer ni de trier — nous nous chargeons de tout évaluer sur photo.",
    meta: "5 minutes de votre côté",
  },
  {
    num: "2",
    icon: "scroll-text",
    title: "Devis personnalisé",
    body: "Sous deux heures ouvrées, vous recevez un devis chiffré et détaillé, avec attestation d'assurance RC Pro jointe. Le tarif inclut le tri responsable et la déduction des biens valorisables.",
    meta: "Devis ferme sous 2 h",
  },
  {
    num: "3",
    icon: "truck",
    title: "Intervention rapide",
    body: "Équipe en uniforme L'Espace Libre, EPI conformes, tri sélectif sur place. Intervention planifiée selon votre disponibilité, parfois sous 48 h pour les petits volumes.",
    meta: "Équipe identifiée · 0 € d'acompte",
  },
  {
    num: "4",
    icon: "check-circle",
    title: "Validation et restitution",
    body: "Vous validez l'état rendu du logement (balayé, vide, propre). Clés restituées au mandataire ou à vous-même. Justificatifs envoyés : facture, photos avant/après, bordereaux de tri.",
    meta: "Dossier complet remis",
  },
];

export function ProcessSteps() {
  return (
    <Tier
      variant="deep"
      as="section"
      rhythmIndex={8}
      className="process-steps"
      ariaLabelledby="process-steps-title"
    >
      <div className="container process-steps__inner">
        <header className="process-steps__head">
          <span
            className="process-steps__eyebrow"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Spark size={14} variant="light" />
            Comment ça se passe
          </span>
          <h2 id="process-steps-title" className="process-steps__title">
            De la prise de contact à la <em>restitution des clés.</em>
          </h2>
          <p className="process-steps__lead">
            Quatre étapes balisées, sans zone grise. Vous savez à tout
            moment qui intervient, à quel coût, dans quel délai et avec
            quels justificatifs en retour.
          </p>
        </header>

        <ol className="process-steps__grid">
          {STEPS.map((step) => (
            <li key={step.num} className="process-step">
              <span className="process-step__num">{step.num}</span>
              <span className="process-step__icon" aria-hidden>
                <Icon name={step.icon} />
              </span>
              <h3 className="process-step__title">{step.title}</h3>
              <p className="process-step__body">{step.body}</p>
              <span className="process-step__meta">
                {step.meta}
              </span>
            </li>
          ))}
        </ol>

        <div className="process-steps__cta">
          <a className="btn btn--primary btn--lg" href="/contact">
            Commencer mon estimation
            <Icon name="arrow-right" size={18} />
          </a>
          <span className="process-steps__cta-note">
            Sans engagement · Devis sous 2 h
          </span>
        </div>

        <div className="spark-end" style={{ marginTop: "var(--space-7)" }}>
          <Spark size={22} variant="light" />
        </div>
      </div>
    </Tier>
  );
}
