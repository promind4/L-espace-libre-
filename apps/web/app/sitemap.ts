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
 *   - Zones hors périmètre actif (Landes, Lot-et-Garonne) — noindex
 *
 * `lastModified` : dates réelles de révision (et non la date du build),
 * pour que Google puisse s'y fier. À mettre à jour lors d'une modif.
 */
import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { ZONES_ACTIVES, ZONES_UPDATED_AT } from "@/content/zones";
import { SERVICES } from "@/content/services";
import { BLOG_POSTS } from "@/content/blog/posts";

/** Dernière révision des pages éditoriales (accueil, services, FAQ, contact). */
const PAGES_UPDATED_AT = new Date("2026-09-26");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = PAGES_UPDATED_AT;
  const zonesUpdatedAt = new Date(ZONES_UPDATED_AT);
  const lastPost = new Date(
    Math.max(...BLOG_POSTS.map((p) => new Date(p.publishedAt).getTime())),
  );
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
      lastModified: zonesUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...ZONES_ACTIVES.map((z) => ({
      url: `${base}/zones/${z.slug}`,
      lastModified: zonesUpdatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // ── Blog ──────────────────────────────────────────────────
    {
      url: `${base}/blog`,
      lastModified: lastPost,
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
