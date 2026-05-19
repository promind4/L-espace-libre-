/**
 * Types pour le contenu blog.
 *
 * Choix pragmatique v1 : pas de MDX, articles en données TypeScript
 * structurées par blocs (Constitution P1.4 — pas de dépendance frivole).
 * Migration MDX possible en v2 si l'autonomie rédactionnelle l'exige.
 */

export type BlogBlock =
  | { type: "p"; content: string }
  | { type: "h2"; content: string }
  | { type: "h3"; content: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; content: string; tone?: "info" | "warning" }
  | { type: "quote"; content: string; attribution?: string };

export type BlogCategory =
  | "Tarifs"
  | "Succession"
  | "Diogène & insalubrité"
  | "Éco-responsabilité"
  | "Logistique"
  | "Cadre légal"
  | "Patrimoine"
  | "Pro & entreprises"
  | "Valorisation"
  | "Acteur local";

export interface BlogPost {
  slug: string;
  titre: string;
  /** Description courte affichée sur l'index (50-90 mots). */
  excerpt: string;
  /** Méta-description SEO (≤ 160 caractères). */
  metaDescription: string;
  /** ISO date string `YYYY-MM-DD`. */
  publishedAt: string;
  /** Estimation lecture en minutes. */
  readingTimeMin: number;
  category: BlogCategory;
  tags: string[];
  /** Auteur — placeholder éditorial L'Espace Libre. */
  auteur: string;
  /** Contenu structuré. */
  blocks: BlogBlock[];
  /** Slugs des articles connexes. */
  related?: string[];
}
