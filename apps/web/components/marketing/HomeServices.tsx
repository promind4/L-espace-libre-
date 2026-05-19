/**
 * HomeServices — Sprint R2 (redesign v2).
 *
 * Concept D variante 1 : suppression des icônes Lucide, remplacées
 * par une **numérotation typographique** mono émeraude (`01`, `02`,
 * `03`, `04`). Cohérent avec le chapitrage de la page À propos
 * (Concept C).
 *
 * Tier Light. Le lien « En savoir plus » utilise la classe
 * `link-spark` pour le hover de sparkle (Concept B usage 5).
 */
import { Spark } from "@/components/ui/Spark";
import { Tier } from "@/components/ui/Tier";
import { SERVICES } from "@/content/services";

export function HomeServices() {
  // 5 services principaux sur la home
  const services = SERVICES.slice(0, 5);

  return (
    <Tier
      variant="light"
      as="section"
      rhythmIndex={6}
      id="services"
      ariaLabel="Nos services"
    >
      <div className="container">
        <div
          className="section__head"
          style={{
            textAlign: "center",
            maxWidth: "640px",
            margin: "0 auto 48px",
          }}
        >
          <span
            className="tier__eyebrow"
            style={{ justifyContent: "center" }}
          >
            <Spark size={14} />
            Nos services
          </span>
          <h2 className="section__title">
            Une solution pour chaque situation.
          </h2>
          <p className="section__lead">
            Particuliers, héritiers, notaires, gestionnaires de biens —
            nous adaptons l&apos;intervention à votre contexte.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <a
              key={s.slug}
              className="service-card-num"
              href={`/services/${s.slug}`}
            >
              <div className="service-card-num__num">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="service-card-num__body">
                <h3>{s.titre}</h3>
                <p>{s.baseline}</p>
                <span className="service-card-num__link link-spark">
                  <span className="link__spark">
                    <Spark size={14} />
                  </span>
                  En savoir plus →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Tier>
  );
}
