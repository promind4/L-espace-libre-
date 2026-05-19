/**
 * BlogPostTemplate — gabarit des 10 pages d'article.
 *
 * Server Component composant : bandeau (catégorie + date + temps de
 * lecture + auteur + titre + excerpt), fil d'Ariane, contenu via
 * BlogContent, tags, articles connexes, CTA de fermeture, JSON-LD
 * (Article + BreadcrumbList).
 */
import { Icon } from "@/components/ui/Icon";
import { Spark } from "@/components/ui/Spark";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlogContent } from "./BlogContent";
import { getRelatedPosts } from "@/content/blog/posts";
import type { BlogPost } from "@/content/blog/types";
import { SITE } from "@/config/site";
import {
  buildArticleJsonLd,
  buildBreadcrumbList,
} from "@/lib/seo";
import styles from "./BlogPostTemplate.module.css";

export interface BlogPostTemplateProps {
  post: BlogPost;
}

const DATE_FMT = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function BlogPostTemplate({ post }: BlogPostTemplateProps) {
  const baseUrl = SITE.url.replace(/\/$/, "");
  const related = getRelatedPosts(post, 3);

  const jsonLd = [
    buildArticleJsonLd(post),
    buildBreadcrumbList([
      { name: "Accueil", url: `${baseUrl}/` },
      { name: "Blog", url: `${baseUrl}/blog` },
      { name: post.titre },
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ===== Bandeau d'en-tête (Hero Image) ===== */}
      <header
        className={`${styles.hero} tier tier-deep`}
        data-tier="deep"
        data-rhythm-index={1}
        style={{
          backgroundImage: "url('/images/hero/art.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "var(--fg-on-dark)",
        }}
      >
        <div className={styles.heroContainer}>
          <div className={styles.heroMeta}>
            <Spark size={14} variant="light" />
            <span>{post.category}</span>
            <span className={styles.heroSep} aria-hidden>
              ·
            </span>
            <span>
              <time dateTime={post.publishedAt}>
                {DATE_FMT.format(new Date(post.publishedAt))}
              </time>
            </span>
            <span className={styles.heroSep} aria-hidden>
              ·
            </span>
            <span>{post.readingTimeMin} min de lecture</span>
          </div>
          <h1 className={styles.heroTitle}>{post.titre}</h1>
          <p className={styles.heroExcerpt}>{post.excerpt}</p>
        </div>
      </header>

      {/* ===== Fil d'Ariane ===== */}
      <nav className="container" aria-label="Fil d'Ariane">
        <div className={styles.breadcrumb}>
          <a href="/">Accueil</a>
          <span className={styles.breadcrumbSep} aria-hidden>
            ›
          </span>
          <a href="/blog">Blog</a>
          <span className={styles.breadcrumbSep} aria-hidden>
            ›
          </span>
          <span aria-current="page">{post.titre}</span>
        </div>
      </nav>

      {/* ===== Article ===== */}
      <article className={styles.article}>
        <div className={styles.articleContainer}>
          <BlogContent blocks={post.blocks} />

          <ul className={styles.tags} aria-label="Étiquettes">
            {post.tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                #{tag}
              </li>
            ))}
          </ul>

          {/* End-mark sparkle : fleuron de fin d'article (Concept B usage 4) */}
          <div className="spark-end" style={{ marginTop: 48 }}>
            <Spark size={24} />
          </div>
        </div>
      </article>

      {/* ===== Articles connexes (Tier Paper — grille blueprint) ===== */}
      {related.length > 0 && (
        <section
          className={`${styles.related} tier tier-paper`}
          data-tier="paper"
          data-rhythm-index={3}
          aria-labelledby="related-heading"
        >
          <div className="container">
            <header className={styles.relatedHead}>
              <span
                className={styles.relatedEyebrow}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  justifyContent: "center",
                }}
              >
                <Spark size={14} />
                À lire aussi
              </span>
              <h2 id="related-heading" style={{ margin: 0 }}>
                Trois autres lectures qui pourraient vous intéresser.
              </h2>
            </header>
            <div className={styles.relatedGrid}>
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className={styles.relatedCard}
                >
                  <span className={styles.relatedCategory}>{r.category}</span>
                  <h3 className={styles.relatedTitle}>{r.titre}</h3>
                  <p className={styles.relatedExcerpt}>{r.excerpt}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== Bandeau de fermeture (Tier Light) ===== */}
      <aside
        className={`${styles.closing} tier tier-light`}
        data-tier="light"
        data-rhythm-index={4}
      >
        <div className="container">
          <h3>Une demande à formuler ?</h3>
          <p>
            Notre Simulateur vous donne une fourchette en 30 secondes. Le
            devis ferme arrive sous deux heures après envoi de quelques
            photos.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "var(--space-4)" }}>
            <a href="/services/debarras-maison-appartement" className="btn btn--secondary btn--sm" style={{ textDecoration: "none" }}>Débarras Maison</a>
            <a href="/services/succession-notaire" className="btn btn--secondary btn--sm" style={{ textDecoration: "none" }}>Succession</a>
            <a href="/services/nettoyage-extreme-diogene" className="btn btn--secondary btn--sm" style={{ textDecoration: "none" }}>Nettoyage Diogène</a>
          </div>
          <a className={styles.closingCta} href="/contact">
            Demander mon estimation
            <Icon name="arrow-right" size={18} />
          </a>
        </div>
      </aside>
    </>
  );
}
