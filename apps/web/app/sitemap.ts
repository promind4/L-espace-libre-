/**
 * Sitemap XML — périmètre strict conversion.
 *
 * Inclus : Accueil, Services, Zones, Blog, FAQ, Contact,
 *          À propos, Espace Pro.
 *
 * Exclus délibérément :
 *   - Pages légales (noindex posé sur chaque page, pas de valeur SEO)
 *   - /reclamation (noindex, obligation légale sans valeur de conversion)
 *   - /cookies (page inexistante — supprimée de LEGAL_SLUGS)
 *   - /plan-du-site (supprimé — template relic, XML sitemap suffit)
 *   - /admin/* (Constitution P4.7)
 */
import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { ZONES } from "@/content/zones";
import { SERVICES } from "@/content/services";
import { BLOG_POSTS } from "@/content/blog/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = SITE.url.replace(/\/$/, "");

  return [
    // ── Accueil ───────────────────────────────────────────────
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // ── Services ──────────────────────────────────────────────
    {
      url: `${base}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...SERVICES.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),

    // ── Zones d'intervention ──────────────────────────────────
    {
      url: `${base}/zones`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...ZONES.map((z) => ({
      url: `${base}/zones/${z.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // ── Blog ──────────────────────────────────────────────────
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...BLOG_POSTS.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),

    // ── FAQ ───────────────────────────────────────────────────
    {
      url: `${base}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // ── Contact (page de conversion principale) ───────────────
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // NB : /a-propos et /espace-pro sont masquées (Phase 1, contenu
    //      placeholder) — noindex posé sur chaque page, exclues du sitemap.
  ];
}
