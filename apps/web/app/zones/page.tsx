import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { Spark } from "@/components/ui/Spark";
import { JsonLd } from "@/components/seo/JsonLd";
import { ZONES, ZONES_BY_DEPARTEMENT, type Departement } from "@/content/zones";
import { SITE } from "@/config/site";
import { buildBreadcrumbList } from "@/lib/seo";

const TITLE =
  "Zones d'intervention en Gironde, Landes et Lot-et-Garonne | L'Espace Libre";
const DESCRIPTION =
  "L'Espace Libre intervient dans 25 communes de Nouvelle-Aquitaine (Gironde 33, Landes 40, Lot-et-Garonne 47). Trouvez votre ville pour un devis localisé.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE.url.replace(/\/$/, "")}/zones` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url.replace(/\/$/, "")}/zones`,
  },
};

const DEPT_ORDER: Departement[] = ["33", "40", "47"];

const DEPT_INFO: Record<Departement, { titre: string; sous: string }> = {
  "33": {
    titre: "Gironde",
    sous: "Bordeaux Métropole — intervention de 48 heures à 10 jours.",
  },
  "40": {
    titre: "Landes",
    sous: "Acteur girondin en déplacement programmé — de 48 heures à 10 jours.",
  },
  "47": {
    titre: "Lot-et-Garonne",
    sous: "Acteur girondin en déplacement programmé — de 48 heures à 10 jours.",
  },
};

export default function ZonesIndexPage() {
  const baseUrl = SITE.url.replace(/\/$/, "");
  const breadcrumb = buildBreadcrumbList([
    { name: "Accueil", url: `${baseUrl}/` },
    { name: "Zones d'intervention" },
  ]);

  return (
    <main>
      <JsonLd data={breadcrumb} />

      <section
        style={{
          position: "relative",
          width: "100%",
          paddingBlock: "var(--space-12)",
          overflow: "hidden",
          color: "var(--cr-white)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
        }}
      >
        {/* Background Image & Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundColor: "var(--cr-navy-900)",
          }}
        >
          <img
            src="/images/hero/zone.avif"
            alt="Zones d'intervention L'Espace Libre — Gironde, Landes et Lot-et-Garonne"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            }}
          />
        </div>

        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
              fontSize: "var(--fs-12)",
              fontWeight: 600,
              letterSpacing: "var(--tracking-eyebrow)",
              textTransform: "uppercase",
              color: "var(--cr-emerald-300)",
              marginBottom: "var(--space-4)",
            }}
          >
            <Spark size={14} variant="light" />
            Nouvelle-Aquitaine
          </span>
          <h1
            style={{
              fontSize: "clamp(var(--fs-30), 4vw + 1rem, var(--fs-48))",
              color: "var(--cr-white)",
              marginBottom: "var(--space-4)",
            }}
          >
            25 communes desservies en Gironde, Landes et Lot-et-Garonne.
          </h1>
          <p
            style={{
              fontSize: "var(--fs-18)",
              color: "var(--cr-white)",
              maxWidth: "60ch",
              opacity: 0.9,
            }}
          >
            Notre équipe est basée à Bordeaux et intervient dans toute la
            Nouvelle-Aquitaine ouest. Sélectionnez votre commune pour
            consulter sa page dédiée — délai, témoignage local et estimation
            en quelques clics.
          </p>
        </div>
      </section>

      {DEPT_ORDER.map((dept) => {
        const zones = ZONES_BY_DEPARTEMENT[dept] ?? [];
        const info = DEPT_INFO[dept];
        return (
          <section
            key={dept}
            style={{
              paddingBlock: "var(--space-8)",
            }}
          >
            <div className="container">
              <header style={{ marginBottom: "var(--space-6)" }}>
                <span
                  style={{
                    fontSize: "var(--fs-12)",
                    fontWeight: 600,
                    letterSpacing: "var(--tracking-eyebrow)",
                    textTransform: "uppercase",
                    color: "var(--cr-navy-700)",
                    display: "block",
                    marginBottom: "var(--space-3)",
                  }}
                >
                  Département {dept}
                </span>
                <h2
                  style={{
                    fontSize: "var(--fs-30)",
                    marginBottom: "var(--space-3)",
                  }}
                >
                  {info.titre}
                </h2>
                <p
                  style={{
                    color: "var(--fg-default)",
                    maxWidth: "60ch",
                    margin: 0,
                  }}
                >
                  {info.sous}
                </p>
              </header>

              <ul
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: "var(--space-3)",
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                {zones.map((z) => (
                  <li key={z.slug}>
                    <a
                      href={`/zones/${z.slug}`}
                      className="zone-index-card"
                    >
                      <span
                        style={{
                          fontSize: "var(--fs-16)",
                          fontWeight: 600,
                          color: "var(--fg-strong)",
                        }}
                      >
                        {z.nom}
                      </span>
                      <span
                        style={{
                          fontSize: "var(--fs-13)",
                          color: "var(--fg-muted)",
                        }}
                      >
                        {z.codePostal}
                        {z.distanceKmDepuisBordeaux > 0 &&
                          ` · ${z.distanceKmDepuisBordeaux} km`}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section
        style={{
          background: "var(--bg-sunken)",
          paddingBlock: "var(--space-7)",
          textAlign: "center",
        }}
      >
        <div className="container">
          <p
            style={{
              color: "var(--fg-default)",
              maxWidth: "56ch",
              margin: "0 auto var(--space-5)",
            }}
          >
            Votre commune ne figure pas dans la liste&nbsp;? Nous étudions les
            interventions ponctuelles partout en Nouvelle-Aquitaine sur
            demande.
          </p>
          <a
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
              padding: "var(--space-3) var(--space-6)",
              background: "var(--cr-emerald-600)",
              color: "var(--cr-white)",
              borderRadius: "var(--radius-pill)",
              fontWeight: 600,
              textDecoration: "none",
              minHeight: "44px",
            }}
          >
            Nous contacter
            <Icon name="arrow-right" size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}

void ZONES; // satisfait l'analyseur qui veut signaler ZONES non utilisé
