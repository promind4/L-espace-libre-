import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { Spark } from "@/components/ui/Spark";
import { JsonLd } from "@/components/seo/JsonLd";
import { SERVICES } from "@/content/services";
import { SITE } from "@/config/site";
import { buildBreadcrumbList } from "@/lib/seo";

const TITLE = "Nos services — Débarras professionnel en Nouvelle-Aquitaine | L'Espace Libre";
const DESCRIPTION =
  "Maison, succession, bureaux, Diogène, dépendances : cinq prestations adaptées à chaque situation. Acteur girondin rayonnant en Nouvelle-Aquitaine.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE.url.replace(/\/$/, "")}/services` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url.replace(/\/$/, "")}/services`,
  },
};

export default function ServicesIndexPage() {
  const baseUrl = SITE.url.replace(/\/$/, "");
  const breadcrumb = buildBreadcrumbList([
    { name: "Accueil", url: `${baseUrl}/` },
    { name: "Services" },
  ]);

  return (
    <main>
      <JsonLd data={breadcrumb} />

      <section
        className="tier tier-deep"
        data-tier="deep"
        data-rhythm-index={1}
        style={{
          color: "var(--fg-on-dark)",
          paddingBlock: "var(--space-9)",
        }}
      >
        <div className="container">
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: "var(--fs-12)",
              fontWeight: 600,
              letterSpacing: "var(--tracking-eyebrow)",
              textTransform: "uppercase",
              color: "var(--cr-emerald-300)",
              marginBottom: "var(--space-4)",
            }}
          >
            <Spark size={14} variant="light" />
            Nos prestations
          </span>
          <h1
            style={{
              fontSize: "clamp(var(--fs-30), 4vw + 1rem, var(--fs-48))",
              color: "var(--fg-on-dark)",
              marginBottom: "var(--space-4)",
            }}
          >
            Une solution pour chaque situation.
          </h1>
          <p
            style={{
              fontSize: "var(--fs-18)",
              color: "var(--fg-on-dark-muted)",
              maxWidth: "64ch",
            }}
          >
            Particuliers, héritiers, notaires, gestionnaires de biens,
            services sociaux — nous adaptons l&apos;intervention à votre
            contexte. Cinq prestations distinctes, une seule équipe
            assurée, un seul interlocuteur.
          </p>
        </div>
      </section>

      <section style={{ paddingBlock: "var(--space-8)" }}>
        <div className="container">
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "var(--space-5)",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <a
                  href={`/services/${s.slug}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-3)",
                    height: "100%",
                    padding: "var(--space-6)",
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow-sm)",
                    textDecoration: "none",
                    color: "inherit",
                    transition:
                      "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      width: 44,
                      height: 44,
                      alignItems: "center",
                      justifyContent: "center",
                      background: "var(--cr-navy-100)",
                      color: "var(--cr-navy-900)",
                      borderRadius: "var(--radius-md)",
                    }}
                  >
                    <Icon name={s.icon} size={22} />
                  </span>
                  <h2
                    style={{
                      fontSize: "var(--fs-20)",
                      fontWeight: 700,
                      color: "var(--fg-strong)",
                      margin: 0,
                    }}
                  >
                    {s.titre}
                  </h2>
                  <p
                    style={{
                      fontSize: "var(--fs-14)",
                      color: "var(--fg-default)",
                      margin: 0,
                      lineHeight: "var(--lh-relaxed)",
                    }}
                  >
                    {s.baseline}
                  </p>
                  <span
                    style={{
                      marginTop: "auto",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "var(--space-2)",
                      fontSize: "var(--fs-14)",
                      fontWeight: 600,
                      color: "var(--cr-emerald-600)",
                    }}
                  >
                    Découvrir
                    <Icon name="arrow-right" size={16} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
            Une situation particulière non listée ici&nbsp;? Contactez-nous,
            nous étudions toutes les demandes de débarras professionnel.
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
