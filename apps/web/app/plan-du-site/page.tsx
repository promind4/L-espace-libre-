/**
 * Plan du site HTML — maillage interne SEO.
 *
 * Rôle : distribuer le jus SEO vers les 25 pages de zones et les pages
 * de services sans alourdir la navigation principale.
 *
 * Règles :
 *   - Indexable (pas de noindex) — exclu du sitemap.xml (voir sitemap.ts)
 *   - Design purement textuel (zéro image, zéro JS client) pour la vitesse
 *   - Lié depuis la section juridique du footer global
 */
import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/config/site";
import { SERVICES } from "@/content/services";
import { ZONES, ZONES_BY_DEPARTEMENT } from "@/content/zones";
import { BLOG_POSTS } from "@/content/blog/posts";

export const metadata: Metadata = {
  title: `Plan du site | ${SITE.nom}`,
  description:
    "Liste exhaustive des pages du site L'Espace Libre : services de débarras, zones d'intervention en Gironde et Nouvelle-Aquitaine, articles et informations pratiques.",
  alternates: { canonical: `${SITE.url}/plan-du-site` },
};

const linkStyle = {
  color: "var(--fg-secondary, #4B5566)",
  textDecoration: "none",
  fontSize: "0.9375rem",
  lineHeight: 1.8,
} as const;

const h2Style = {
  fontSize: "1.125rem",
  fontWeight: 700,
  color: "var(--fg-primary, #1F2733)",
  margin: "0 0 12px",
  paddingBottom: "8px",
  borderBottom: "2px solid var(--border-subtle, #E9ECF1)",
} as const;

const listStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column" as const,
  gap: "2px",
} as const;

export default function PlanDuSitePage() {
  return (
    <main style={{ maxWidth: "860px", margin: "0 auto", padding: "48px 24px 80px" }}>

      <nav aria-label="Plan du site">

        {/* ── En-tête ─────────────────────────────────────────────── */}
        <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent, #0E8F70)", marginBottom: "8px" }}>
          L&apos;Espace Libre
        </p>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--fg-primary, #1F2733)", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
          Plan du site
        </h1>
        <p style={{ fontSize: "0.9375rem", color: "var(--fg-secondary, #4B5566)", marginBottom: "48px" }}>
          Toutes les pages du site — débarras professionnel en Gironde et Nouvelle-Aquitaine.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "40px 48px" }}>

          {/* ── Nos services ──────────────────────────────────────── */}
          <section>
            <h2 style={h2Style}>Nos services</h2>
            <ul style={listStyle}>
              <li>
                <Link href="/services" style={linkStyle}>Tous nos services</Link>
              </li>
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} style={linkStyle}>
                    {s.titre}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Zones d'intervention ──────────────────────────────── */}
          <section>
            <h2 style={h2Style}>Zones d&apos;intervention</h2>
            <ul style={listStyle}>
              <li>
                <Link href="/zones" style={linkStyle}>Toutes les zones</Link>
              </li>
            </ul>
            {Object.entries(ZONES_BY_DEPARTEMENT).map(([dep, zones]) => (
              <div key={dep} style={{ marginTop: "16px" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-tertiary, #8A93A2)", margin: "0 0 6px" }}>
                  Département {dep}
                </p>
                <ul style={listStyle}>
                  {zones.map((z) => (
                    <li key={z.slug}>
                      <Link href={`/zones/${z.slug}`} style={linkStyle}>
                        Débarras à {z.nom}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* ── Actualités ────────────────────────────────────────── */}
          <section>
            <h2 style={h2Style}>Actualités</h2>
            <ul style={listStyle}>
              <li>
                <Link href="/blog" style={linkStyle}>Tous les articles</Link>
              </li>
              {BLOG_POSTS.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} style={linkStyle}>
                    {p.titre}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Informations ──────────────────────────────────────── */}
          <section>
            <h2 style={h2Style}>Informations</h2>
            <ul style={listStyle}>
              <li><Link href="/" style={linkStyle}>Accueil</Link></li>
              <li><Link href="/faq" style={linkStyle}>FAQ — Questions fréquentes</Link></li>
              <li><Link href="/contact" style={linkStyle}>Contact &amp; Devis gratuit</Link></li>
              <li><Link href="/espace-pro" style={linkStyle}>Espace Professionnel</Link></li>
              <li><Link href="/a-propos" style={linkStyle}>À propos</Link></li>
            </ul>
          </section>

        </div>
      </nav>
    </main>
  );
}
