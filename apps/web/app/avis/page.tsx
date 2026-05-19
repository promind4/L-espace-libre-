import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { Spark } from "@/components/ui/Spark";
// import { JsonLd } from "@/components/seo/JsonLd";
import { ReviewGrid } from "@/components/marketing/ReviewGrid";
import {
  REVIEWS,
  getReviewCount,
  getAverageRating,
} from "@/content/reviews";
import { SITE } from "@/config/site";
// import { buildBreadcrumbList } from "@/lib/seo";

/**
 * Page Avis Clients — /avis (DARK ROUTE MVP)
 *
 * ⚠️  STATUT DORMANT — Cette page existe dans l'architecture mais est
 * totalement invisible au lancement :
 *   - Aucun lien dans Header, Footer, ou Drawer mobile.
 *   - Non référencée dans sitemap.ts.
 *   - `robots: noindex, nofollow` pour empêcher toute indexation accidentelle.
 *
 * Activation future : supprimer le `robots`, décommenter le JSON-LD,
 * ajouter le lien dans la navigation et sitemap.ts.
 */

const TITLE = "Avis Clients — Témoignages Vérifiés | L'Espace Libre";
const DESCRIPTION =
  "Découvrez les avis de nos clients sur nos services de débarras en Gironde et Nouvelle-Aquitaine. Témoignages vérifiés, notes et retours d'expérience.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE.url.replace(/\/$/, "")}/avis` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url.replace(/\/$/, "")}/avis`,
  },
  // ── DARK ROUTE : empêche toute indexation tant que la page est dormante ──
  robots: {
    index: false,
    follow: false,
  },
};

export default function AvisPage() {
  // _baseUrl utilisé dans le JSON-LD commenté ci-dessous — renommé
  // pour éviter le warning TS tant que le bloc est désactivé.
  const _baseUrl = SITE.url.replace(/\/$/, "");
  const count = getReviewCount();
  const avg = getAverageRating();

  /* ── JSON-LD AggregateRating + Review — DÉSACTIVÉ (base vide) ──────
   * Décommenter uniquement quand REVIEWS.length >= 1 pour éviter
   * un AggregateRating vide qui déclenche une erreur dans Google
   * Search Console (ratingCount: 0 est invalide).
   *
   * const jsonLd = [
   *   buildBreadcrumbList([
   *     { name: "Accueil", url: `${baseUrl}/` },
   *     { name: "Avis clients" },
   *   ]),
   *   ...(count > 0
   *     ? [
   *         {
   *           "@context": "https://schema.org",
   *           "@type": "LocalBusiness",
   *           name: SITE.nom,
   *           aggregateRating: {
   *             "@type": "AggregateRating",
   *             ratingValue: avg.toString(),
   *             bestRating: "5",
   *             ratingCount: count.toString(),
   *           },
   *           review: REVIEWS.map((r) => ({
   *             "@type": "Review",
   *             author: { "@type": "Person", name: r.nomClient },
   *             datePublished: r.date,
   *             reviewRating: {
   *               "@type": "Rating",
   *               ratingValue: r.noteSur5.toString(),
   *               bestRating: "5",
   *             },
   *             reviewBody: r.texteAvis,
   *           })),
   *         },
   *       ]
   *     : []),
   * ];
   */

  return (
    <main>
      {/* <JsonLd data={jsonLd} /> */}

      {/* ===== Hero ===== */}
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
          minHeight: "40vh",
          background: "var(--cr-navy-900)",
        }}
      >
        {/* Overlay gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 90% 20%, rgba(14, 143, 112, 0.15), transparent 50%), radial-gradient(ellipse at 0% 100%, rgba(61, 98, 138, 0.18), transparent 50%)",
            pointerEvents: "none",
          }}
        />

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
            Témoignages vérifiés
          </span>
          <h1
            style={{
              fontSize: "clamp(var(--fs-30), 4vw + 1rem, var(--fs-48))",
              color: "var(--cr-white)",
              marginBottom: "var(--space-4)",
              maxWidth: "800px",
            }}
          >
            Ce que nos clients disent de nous.
          </h1>
          <p
            style={{
              fontSize: "var(--fs-18)",
              color: "var(--cr-white)",
              maxWidth: "56ch",
              opacity: 0.9,
            }}
          >
            {count > 0
              ? `${count} avis vérifiés — note moyenne de ${avg}/5.`
              : "Les premiers avis seront publiés prochainement."}
          </p>
        </div>
      </header>

      {/* ===== Fil d'Ariane ===== */}
      <nav className="container" aria-label="Fil d'Ariane">
        <div
          style={{
            fontSize: "var(--fs-13)",
            color: "var(--cr-pearl-500)",
            paddingBlock: "var(--space-4)",
          }}
        >
          <a
            href="/"
            style={{ color: "var(--cr-navy-800)", textDecoration: "none" }}
          >
            Accueil
          </a>
          <span
            style={{
              margin: "0 var(--space-2)",
              color: "var(--cr-pearl-400)",
            }}
            aria-hidden
          >
            ›
          </span>
          <span aria-current="page">Avis clients</span>
        </div>
      </nav>

      {/* ===== Grille d'avis ===== */}
      <section
        style={{
          paddingBlock: "var(--space-8)",
          background: "var(--bg-page)",
        }}
      >
        <div className="container">
          <ReviewGrid reviews={REVIEWS} />
        </div>
      </section>

      {/* ===== CTA fermeture ===== */}
      <aside
        style={{
          background: "var(--bg-sunken)",
          paddingBlock: "var(--space-8)",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h3 style={{ marginBottom: "var(--space-3)" }}>
            Vous aussi, faites confiance à L&apos;Espace Libre.
          </h3>
          <p
            style={{
              color: "var(--fg-default)",
              maxWidth: "56ch",
              margin: "0 auto var(--space-5)",
            }}
          >
            Estimation gratuite, sans engagement, réponse sous deux heures.
          </p>
          <a
            className="btn btn--primary"
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
            }}
          >
            Demander mon estimation
            <Icon name="arrow-right" size={18} />
          </a>
        </div>
      </aside>
    </main>
  );
}

