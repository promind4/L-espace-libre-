import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { Spark } from "@/components/ui/Spark";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ_CATEGORIES, getAllFaqItems } from "@/content/faq";
import { SITE } from "@/config/site";
import {
  buildBreadcrumbList,
  buildFaqPageJsonLd,
} from "@/lib/seo";

/**
 * Page FAQ exhaustive — /faq
 *
 * 35 questions réparties en 8 catégories thématiques, optimisées pour
 * le ranking SEO sur des requêtes long-tail (« peut-on payer débarras
 * après vente », « combien coûte débarras Diogène », etc.).
 *
 * Toutes les questions sont émises en JSON-LD `FAQPage` pour exposer
 * un snippet enrichi sur Google.
 *
 * Aucun accordéon : texte brut question + paragraphe, ancres directes
 * (lien partageable vers une question précise via `#id-question`).
 */

const TITLE = "FAQ — Toutes les questions sur le débarras professionnel | L'Espace Libre";
const DESCRIPTION =
  "35 réponses détaillées : tarifs, délais, succession, Diogène, éco-responsabilité, assurance, zones d'intervention. La FAQ complète d'un débarrasseur professionnel en Gironde et Nouvelle-Aquitaine.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE.url.replace(/\/$/, "")}/faq` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url.replace(/\/$/, "")}/faq`,
  },
};

/**
 * Mini-parseur inline pour les réponses : convertit `**gras**` →
 * `<strong>` et `[texte](/url)` → `<a>`. Les autres caractères sont
 * échappés pour éviter toute injection.
 */
function renderInline(s: string): string {
  // 1. Échappement HTML basique
  const escaped = s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  // 2. Liens [texte](url)
  const withLinks = escaped.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2">$1</a>',
  );
  // 3. Gras **texte**
  return withLinks.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

export default function FaqPage() {
  const baseUrl = SITE.url.replace(/\/$/, "");
  const allItems = getAllFaqItems();

  const jsonLd = [
    buildFaqPageJsonLd(
      allItems.map((it) => ({
        // Pour le JSON-LD on supprime le balisage inline
        q: it.q,
        a: it.a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, ""),
      })),
    ),
    buildBreadcrumbList([
      { name: "Accueil", url: `${baseUrl}/` },
      { name: "FAQ" },
    ]),
  ];

  return (
    <main>
      <JsonLd data={jsonLd} />

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
            src="/images/hero/faq.avif"
            alt="Logement vidé et nettoyé après intervention L'Espace Libre — questions fréquentes débarras Gironde"
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
            Foire aux questions
          </span>
          <h1
            style={{
              fontSize: "clamp(var(--fs-30), 4vw + 1rem, var(--fs-48))",
              color: "var(--cr-white)",
              marginBottom: "var(--space-4)",
              maxWidth: "800px",
            }}
          >
            Toutes les réponses sur le débarras professionnel en Gironde et Nouvelle-Aquitaine.
          </h1>
          <p
            style={{
              fontSize: "var(--fs-18)",
              color: "var(--cr-white)",
              maxWidth: "60ch",
              opacity: 0.9,
            }}
          >
            35 questions, classées en 8 thèmes : tarifs, délais, succession, Diogène, éco-responsabilité, assurance, zones d&apos;intervention et estimation en ligne. Une question manque&nbsp;?
            <a
              href="/contact"
              style={{ color: "#fff", textDecoration: "underline", marginLeft: 4 }}
            >
              Écrivez-nous
            </a>
            .
          </p>
        </div>
      </header>

      {/* ===== Fil d'Ariane ===== */}
      <nav className="container" aria-label="Fil d'Ariane">
        <div className="faq-page__crumb">
          <a href="/">Accueil</a>
          <span className="faq-page__crumb-sep" aria-hidden>
            ›
          </span>
          <span aria-current="page">FAQ</span>
        </div>
      </nav>

      {/* ===== Sommaire ===== */}
      <div className="container">
        <nav className="faq-toc" aria-label="Sommaire des catégories">
          <h2 className="faq-toc__title">Sommaire</h2>
          <div className="faq-toc__grid">
            {FAQ_CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="faq-toc__item"
              >
                <span>
                  <p className="faq-toc__item-title">{cat.title}</p>
                  <p className="faq-toc__item-count">
                    {cat.items.length} questions
                  </p>
                </span>
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* ===== Sections (alternance Light/Paper par catégorie) ===== */}
      <section className="faq-page__sections">
        <div className="container">
          {FAQ_CATEGORIES.map((cat, i) => (
            <section
              key={cat.id}
              id={cat.id}
              className={`faq-page__category tier ${
                i % 2 === 0 ? "tier-light" : "tier-paper"
              }`}
              data-tier={i % 2 === 0 ? "light" : "paper"}
              data-rhythm-index={3 + i}
              aria-labelledby={`${cat.id}-title`}
            >
              <header className="faq-page__category-head">
                <div>
                  <h2 id={`${cat.id}-title`}>{cat.title}</h2>
                  <p className="faq-page__category-desc">{cat.description}</p>
                </div>
              </header>

              <div className="faq-page__items">
                {cat.items.map((item) => (
                  <article
                    key={item.id}
                    id={item.id}
                    className="faq-page__item"
                  >
                    <h3>{item.q}</h3>
                    <p
                      className="faq-page__item-answer"
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{
                        __html: renderInline(item.a),
                      }}
                    />
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      {/* ===== CTA fermeture ===== */}
      <aside
        className="tier"
        data-rhythm-index={20}
        style={{ 
          background: "var(--cr-pearl-100)", 
          paddingBlock: "var(--space-10)", 
          textAlign: "center" 
        }}
      >
        <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h3 style={{ margin: "0", textAlign: "center" }}>
            Vous n&apos;avez pas trouvé votre réponse&nbsp;?
          </h3>
          <p style={{ maxWidth: "60ch", margin: "var(--space-4) 0 var(--space-6)" }}>
            Posez votre question directement à notre équipe. Nous répondons
            sous deux heures ouvrées, sans engagement.
          </p>
          <div
            style={{
              display: "inline-flex",
              justifyContent: "center",
            }}
          >
            <a className="btn btn--primary" href="/contact">
              Demander une estimation
              <Icon name="arrow-right" size={16} />
            </a>
          </div>
        </div>
      </aside>
    </main>
  );
}
