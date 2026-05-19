import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { Spark } from "@/components/ui/Spark";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPostsByDateDesc } from "@/content/blog/posts";
import { SITE } from "@/config/site";
import { buildBreadcrumbList } from "@/lib/seo";

const TITLE = "Blog L'Espace Libre — Débarras, succession, éco-responsabilité en Nouvelle-Aquitaine";
const DESCRIPTION =
  "Nos 10 articles régionaux : tarifs, succession, Diogène, éco-responsabilité, patrimoine viticole, pages pros. Guide pratique du débarras en Gironde et Nouvelle-Aquitaine.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE.url.replace(/\/$/, "")}/blog` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url.replace(/\/$/, "")}/blog`,
  },
};

const DATE_FMT = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function BlogIndexPage() {
  const baseUrl = SITE.url.replace(/\/$/, "");
  const breadcrumb = buildBreadcrumbList([
    { name: "Accueil", url: `${baseUrl}/` },
    { name: "Blog" },
  ]);

  const posts = getPostsByDateDesc();

  return (
    <main>
      <JsonLd data={breadcrumb} />

      <header
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
            src="/images/hero/articles.avif"
            alt="Guides et conseils pratiques sur le débarras professionnel en Gironde et Nouvelle-Aquitaine"
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
            Blog · Guide pratique
          </span>
          <h1
            style={{
              fontSize: "clamp(var(--fs-30), 4vw + 1rem, var(--fs-48))",
              color: "var(--cr-white)",
              marginBottom: "var(--space-4)",
              maxWidth: "800px",
            }}
          >
            Comprendre le débarras en Nouvelle-Aquitaine.
          </h1>
          <p
            style={{
              fontSize: "var(--fs-18)",
              color: "var(--cr-white)",
              maxWidth: "60ch",
              opacity: 0.9,
            }}
          >
            Tarifs, démarches de succession, syndrome de Diogène, valorisation
            éco-responsable, patrimoine viticole, pages pros — tout ce qu&apos;il
            faut savoir avant de mandater une équipe de débarras.
          </p>
        </div>
      </header>

      <section style={{ paddingBlock: "var(--space-8)" }}>
        <div className="container">
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "var(--space-5)",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {posts.map((p) => (
              <li key={p.slug}>
                <a
                  href={`/blog/${p.slug}`}
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
                  <div
                    style={{
                      display: "flex",
                      gap: "var(--space-3)",
                      alignItems: "center",
                      fontSize: "var(--fs-12)",
                      letterSpacing: "var(--tracking-eyebrow)",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    <span style={{ color: "var(--cr-emerald-600)" }}>
                      {p.category}
                    </span>
                    <span style={{ color: "var(--fg-muted)" }}>
                      {p.readingTimeMin} min
                    </span>
                  </div>
                  <h2
                    style={{
                      fontSize: "var(--fs-20)",
                      fontWeight: 700,
                      color: "var(--fg-strong)",
                      margin: 0,
                      lineHeight: "var(--lh-snug)",
                    }}
                  >
                    {p.titre}
                  </h2>
                  <p
                    style={{
                      fontSize: "var(--fs-14)",
                      color: "var(--fg-default)",
                      margin: 0,
                      lineHeight: "var(--lh-relaxed)",
                    }}
                  >
                    {p.excerpt}
                  </p>
                  <div
                    style={{
                      marginTop: "auto",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "var(--space-3)",
                      borderTop: "1px dashed var(--border-subtle)",
                    }}
                  >
                    <time
                      dateTime={p.publishedAt}
                      style={{
                        fontSize: "var(--fs-13)",
                        color: "var(--fg-muted)",
                      }}
                    >
                      {DATE_FMT.format(new Date(p.publishedAt))}
                    </time>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "var(--space-2)",
                        fontSize: "var(--fs-13)",
                        fontWeight: 600,
                        color: "var(--cr-emerald-600)",
                      }}
                    >
                      Lire
                      <Icon name="arrow-right" size={14} />
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
