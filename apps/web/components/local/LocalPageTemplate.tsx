/**
 * LocalPageTemplate — gabarit unique des 25 pages locales.
 *
 * Server Component (par défaut Next.js App Router). Compose les
 * différentes sections : bandeau, fil d'Ariane, Simulateur (Client),
 * témoignage, services, zones limitrophes, JSON-LD.
 *
 * Ce composant est invoqué uniquement depuis `app/zones/[commune]/page.tsx`.
 * Toute la logique de routage et de génération statique reste dans la page.
 */
import { Icon } from "@/components/ui/Icon";
import { Spark } from "@/components/ui/Spark";
import { JsonLd } from "@/components/seo/JsonLd";
import { ImagePlaceholder } from "@/components/marketing/ImagePlaceholder";
import { SERVICES } from "@/content/services";
import { getZone, type Zone } from "@/content/zones";
import {
  buildBreadcrumbList,
  buildDelaiIntervention,
  buildLocalBusinessJsonLd,
  buildZoneH1,
} from "@/lib/seo";
import { SITE } from "@/config/site";
import { resolveImage } from "@/lib/resolve-image";
import zonesDataRaw from "@/content/zonesData.json";
import styles from "./LocalPageTemplate.module.css";

// Typer le JSON pour éviter les any
type ZonesData = Record<string, {
  nom_ville: string;
  code_postal: string;
  distance_base: string;
  point_tri_local: string;
  partenaire_solidaire: string;
}>;

const zonesData = zonesDataRaw as ZonesData;

export interface LocalPageTemplateProps {
  zone: Zone;
}

export function LocalPageTemplate({ zone }: LocalPageTemplateProps) {
  const baseUrl = SITE.url.replace(/\/$/, "");
  const delai = buildDelaiIntervention(zone);

  // Maillage interne : on hydrate les communes limitrophes (au plus 5).
  const nearby = zone.limitrophes
    .map((slug) => getZone(slug))
    .filter((z): z is Zone => Boolean(z))
    .slice(0, 5);

  // Récupération des données dynamiques pour la zone
  const localInfo = zonesData[zone.slug] || {
    nom_ville: zone.nom,
    code_postal: zone.codePostal,
    distance_base: `${zone.distanceKmDepuisBordeaux} km`,
    point_tri_local: "Centre de tri partenaire agréé",
    partenaire_solidaire: "Les associations caritatives locales",
  };

  const isBordeauxMetropole = [
    "bordeaux", "merignac", "pessac", "talence", "begles", "le-bouscat",
    "villenave-d-ornon", "gradignan", "floirac", "cenon", "bruges"
  ].includes(zone.slug);

  let heroImageSrc = undefined;
  if (zone.departement === "40" || zone.departement === "47") {
    heroImageSrc = resolveImage("/images/hero/de.avif");
  } else if (isBordeauxMetropole) {
    heroImageSrc = resolveImage("/images/archi1.avif");
  }

  const jsonLd = [
    buildLocalBusinessJsonLd(zone),
    buildBreadcrumbList([
      { name: "Accueil", url: `${baseUrl}/` },
      { name: "Zones d'intervention", url: `${baseUrl}/zones` },
      { name: zone.nom },
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ===== Bandeau d'en-tête (Tier Deep) : fond plein écran + texte ===== */}
      <header
        className={`${styles.hero} tier tier-deep`}
        data-tier="deep"
        data-rhythm-index={1}
      >
        <div className={styles.heroBackground}>
          <ImagePlaceholder
            src={heroImageSrc}
            alt={`Débarras à ${zone.nom} (${zone.codePostal}) — équipe L'Espace Libre en intervention`}
            label={`Photo : équipe en intervention à ${zone.nom}`}
            icon="users"
            tone="dark"
            hint="Image de fond plein écran (ex: 1920x1080)"
            priority
            sizes="100vw"
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContainer}>
          <div>
            <span className={styles.heroEyebrow}>
              <Spark size={14} variant="light" />
              {zone.departementNom} ({zone.departement}) — {zone.region}
            </span>
            {/*
              H1 unifié — Phase 2 SEO (meta.md §5). Gabarit unique pour
              les 25 communes : « Débarras à {nom} : Maisons, Locaux et
              Encombrants ». Valide l'intention de recherche locale du
              particulier ET du professionnel sans surcharger la page.
            */}
            <h1 className={styles.heroTitle}>{buildZoneH1(zone)}</h1>
            <p className={styles.heroLead}>{zone.metaDescription}</p>
            <div className={styles.heroMeta}>
              <span className={styles.heroChip}>
                <Icon name="map-pin" size={14} />
                Code postal {zone.codePostal}
              </span>
              <span className={styles.heroChip}>
                <Icon name="zap" size={14} />
                {delai}
              </span>
              {zone.distanceKmDepuisBordeaux > 0 && (
                <span className={styles.heroChip}>
                  <Icon name="arrow-right" size={14} />
                  {zone.distanceKmDepuisBordeaux} km depuis Bordeaux Centre
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ===== Fil d'Ariane ===== */}
      <nav className="container" aria-label="Fil d'Ariane">
        <div className={styles.breadcrumb}>
          <a href="/">Accueil</a>
          <span className={styles.breadcrumbSep} aria-hidden>
            ›
          </span>
          <a href="/zones">Zones d&apos;intervention</a>
          <span className={styles.breadcrumbSep} aria-hidden>
            ›
          </span>
          <span aria-current="page">{zone.nom}</span>
        </div>
      </nav>

      {/* ===== Bandeau CTA vers /contact (remplace l'ancien Simulator) ===== */}
      <section
        className={`${styles.section} tier tier-light`}
        data-tier="light"
        data-rhythm-index={3}
        style={{ textAlign: "center" }}
      >
        <div className="container" style={{ maxWidth: 720 }}>
          <span
            className="tier__eyebrow"
            style={{ justifyContent: "center" }}
          >
            <Spark size={14} />
            Estimation gratuite à {zone.nom}
          </span>
          <h2
            className={styles.sectionTitle}
            style={{ margin: "0 0 14px" }}
          >
            Combien coûte un débarras à {zone.nom}&nbsp;?
          </h2>
          <p
            className={styles.sectionLead}
            style={{ marginInline: "auto", maxInlineSize: "56ch" }}
          >
            Quelques infos, deux heures, et vous avez votre devis ferme.
            Sans engagement, sans acompte.
          </p>
          <a
            className="btn btn--primary btn--lg"
            href="/contact"
            style={{ marginTop: 24 }}
          >
            Demander mon estimation
            <Icon name="arrow-right" size={18} />
          </a>
        </div>
      </section>

      {/* ===== SEO Text Local (Densification Sémantique) ===== */}
      <section className={styles.section} style={{ padding: "var(--space-6) 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--space-6)", fontSize: "var(--fs-15)", lineHeight: "var(--lh-relaxed)", color: "var(--cr-pearl-700)" }}>
            <div>
              <h3 style={{ fontSize: "var(--fs-18)", color: "var(--cr-navy-950)", marginBottom: "var(--space-3)" }}>
                Votre expert en débarras à {localInfo.nom_ville} ({localInfo.code_postal})
              </h3>
              <p>
                Intervenir à <strong>{localInfo.nom_ville}</strong> ({localInfo.code_postal}) et dans le département {zone.departementNom} demande une logistique rigoureuse adaptée à la zone (située à environ {localInfo.distance_base} de notre base). L'Espace Libre s'est spécialisé dans le désencombrement rapide et éthique pour les particuliers et professionnels de la région. Que vous fassiez face à une <strong>succession complexe</strong>, un besoin de vider une maison avant une vente immobilière, ou un cas extrême nécessitant un nettoyage approfondi, nos équipes formées intervenons avec réactivité et discrétion.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "var(--fs-18)", color: "var(--cr-navy-950)", marginBottom: "var(--space-3)" }}>
                Recyclage, dons et démarche zéro gaspillage
              </h3>
              <p>
                Conformément à notre charte environnementale, chaque intervention de vidage à {localInfo.nom_ville} inclut un tri minutieux. Les biens réutilisables sont orientés vers nos partenaires locaux (notamment <strong>{localInfo.partenaire_solidaire}</strong>) afin de profiter d'une seconde vie. Les matériaux non valorisables (ferraille, gravats, D3E) sont transportés en filière courte vers les sites agréés comme <strong>{localInfo.point_tri_local}</strong>. Faire appel à notre entreprise, c'est l'assurance d'un service de débarras responsable et sans surprise tarifaire.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ===== Services disponibles (Tier Paper) ===== */}
      <section
        className={`${styles.section} tier tier-paper`}
        data-tier="paper"
        data-rhythm-index={5}
      >
        <div className="container">
          <header className={styles.sectionHead}>
            <span
              className={styles.sectionEyebrow}
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <Spark size={14} />
              Nos services à {zone.nom}
            </span>
            <h2 className={styles.sectionTitle}>
              Une solution pour chaque situation.
            </h2>
            <p className={styles.sectionLead}>
              L&apos;ensemble de nos prestations est disponible à {zone.nom}
              {zone.departement !== "33"
                ? " — avec frais kilométriques transparents indiqués au devis."
                : "."}
            </p>
          </header>
          <div className={styles.servicesGrid}>
            {SERVICES.map((service) => (
              <a
                key={service.slug}
                href={`/services/${service.slug}`}
                className={styles.serviceCard}
              >
                <h3 className={styles.serviceCardTitle}>{service.titre}</h3>
                <p className={styles.serviceCardBaseline}>{service.baseline}</p>
                <span className={styles.serviceCardLink}>
                  En savoir plus
                  <Icon name="arrow-right" size={16} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Zones limitrophes (Tier Light) ===== */}
      {nearby.length > 0 && (
        <section
          className={`${styles.section} tier tier-light`}
          data-tier="light"
          data-rhythm-index={6}
        >
          <div className="container">
            <header className={styles.sectionHead}>
              <span
                className={styles.sectionEyebrow}
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <Spark size={14} />
                Communes limitrophes
              </span>
              <h2 className={styles.sectionTitle}>
                Nous intervenons également à proximité.
              </h2>
              <p className={styles.sectionLead}>
                Si {zone.nom} n&apos;est pas votre commune, retrouvez nos pages
                dédiées aux villes voisines.
              </p>
            </header>
            <div className={styles.nearbyGrid}>
              {nearby.map((n) => (
                <a
                  key={n.slug}
                  href={`/zones/${n.slug}`}
                  className={styles.nearbyChip}
                >
                  <Icon name="map-pin" size={14} />
                  {n.nom}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== Bandeau de fermeture (fond clair pearl, texte navy) ===== */}
      <aside
        className={styles.closing}
        data-tier="light"
        data-rhythm-index={7}
      >
        <div className="container">
          <h3>Prêts à libérer votre espace à {zone.nom}&nbsp;?</h3>
          <p>
            Aucun engagement, recevez votre devis sous deux heures pendant les horaires d&apos;ouverture.
          </p>
          <a className={styles.closingCta} href="/contact">
            Demander mon estimation
            <Icon name="arrow-right" size={18} />
          </a>
          <div className="spark-end" style={{ marginTop: 40 }}>
            <Spark size={22} />
          </div>
        </div>
      </aside>
    </>
  );
}
