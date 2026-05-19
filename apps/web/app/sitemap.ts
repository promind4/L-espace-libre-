import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { ZONES } from "@/content/zones";
import { SERVICES } from "@/content/services";
import { BLOG_POSTS } from "@/content/blog/posts";

const LEGAL_SLUGS = [
  "mentions-legales",
  "politique-de-confidentialite",
  "cgv",
  "cookies",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = SITE.url.replace(/\/$/, "");

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...SERVICES.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...ZONES.map((z) => ({
      url: `${base}/zones/${z.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
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
    {
      // Page FAQ exhaustive (35 questions / 8 catégories) — forte
      // priorité SEO en raison du volume de questions long-tail
      // couvertes et du JSON-LD FAQPage exposé.
      url: `${base}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      // /contact = page de conversion principale depuis le redesign v3.
      // Tous les CTA « Estimation gratuite » pointent vers cette page.
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...["reclamation", "plan-du-site"].map((slug) => ({
      url: `${base}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...LEGAL_SLUGS.map((slug) => ({
      url: `${base}/${slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
    // NB : /admin/* est EXCLU délibérément — Constitution P4.7.
  ];
}
