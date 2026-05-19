/**
 * TeamShowcase — section visuelle « Notre équipe en action ».
 *
 * Une seule grande photo « équipe en uniforme / intervention » +
 * bloc texte avec 4 garanties concrètes. Inspiré du secteur
 * (cf. les Compagnons Débarrasseurs qui s'appuient sur une photo
 * d'équipe en intervention pour rassurer dès le premier scroll).
 *
 * Photo à fournir :
 *   • `mainSrc` (1200×900 paysage idéalement) : équipe complète en
 *     uniforme devant le camion, ou en intervention.
 *     Spec : daylight, photographie cool white-balance.
 */
import { Icon, type IconName } from "@/components/ui/Icon";
import { Spark } from "@/components/ui/Spark";
import { Tier } from "@/components/ui/Tier";
import { ImagePlaceholder } from "./ImagePlaceholder";

interface Feature {
  icon: IconName;
  title: string;
  body: string;
}

const FEATURES: Feature[] = [
  {
    icon: "hard-hat",
    title: "Équipe formée et équipée",
    body: "Tous nos intervenants portent les EPI adaptés. Habilitations à jour pour le port de charge, manipulation et décontamination.",
  },
  {
    icon: "shield-check",
    title: "Assurance Responsabilité Civile Professionnelle",
    body: "Chaque mission est couverte. L'attestation est jointe au devis avant signature.",
  },
  {
    icon: "truck",
    title: "Flotte dédiée Bordeaux Métropole",
    body: "Véhicules immatriculés en Gironde, identifiés L'Espace Libre, calibrés pour les centres-villes et les rues étroites.",
  },
  {
    icon: "check-circle",
    title: "Charte qualité signée",
    body: "Tri responsable, dons aux associations locales, restitution propre, justificatifs sur demande.",
  },
];

export interface TeamShowcaseProps {
  /** Si fournie, affiche la vraie photo au lieu du placeholder. */
  mainSrc?: string;
}

export function TeamShowcase({ mainSrc }: TeamShowcaseProps = {}) {
  return (
    <Tier
      variant="light"
      as="section"
      rhythmIndex={3}
      className="team-showcase"
      ariaLabelledby="team-showcase-title"
    >
      <div className="container">
        <div className="team-showcase__grid">
          {/* ===== Texte de gauche ===== */}
          <div className="team-showcase__text">
            <span className="tier__eyebrow">
              <Spark size={14} />
              Notre équipe
            </span>
            <h2 id="team-showcase-title">
              Une équipe en chair et en os, pas un standard téléphonique.
            </h2>
            <p className="team-showcase__lead">
              Chaque intervention est menée par une équipe identifiée,
              formée et assurée. Vous savez qui vient chez vous, en
              uniforme L&apos;Espace Libre, avec le matériel adapté à
              votre situation.
            </p>

            <ul className="team-showcase__features">
              {FEATURES.map((f) => (
                <li key={f.title} className="team-showcase__feature">
                  <span className="team-showcase__feature-icon">
                    <Icon name={f.icon} />
                  </span>
                  <span className="team-showcase__feature-text">
                    <strong>{f.title}.</strong> {f.body}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA « En savoir plus sur l'équipe » masqué en Phase 1 :
                la page /a-propos reste en place dans le code mais n'est
                plus exposée par la navigation pendant le test marché V1. */}
          </div>

          {/* ===== Photo unique grand format ===== */}
          <div className="team-showcase__photos">
            <div className="team-showcase__photo">
              <ImagePlaceholder
                src={mainSrc}
                alt="Équipe L'Espace Libre en uniforme et EPI — entreprise de débarras professionnelle en Gironde et Nouvelle-Aquitaine"
                label="Photo : équipe en intervention / devant le camion"
                icon="users"
                hint="1200 × 900 px · paysage"
                priority
                sizes="(max-width: 880px) 100vw, 600px"
              />
            </div>
          </div>
        </div>
      </div>
    </Tier>
  );
}
