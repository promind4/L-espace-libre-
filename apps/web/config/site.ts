/**
 * Configuration globale du site.
 * Source unique pour toutes les métadonnées par défaut.
 */

export const SITE = {
  nom: "L'Espace Libre",
  baseline: "Débarras haute performance, Bordeaux Métropole & Nouvelle-Aquitaine",
  url:
    process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://lespacelibre.fr",
  locale: "fr-FR",
  region: "Nouvelle-Aquitaine",
  description:
    "Débarras complet, tri responsable, devis final sous 2h par photo. Bordeaux, Gironde, Landes, Lot-et-Garonne.",
  defaultOgImage: "/logo.png",
  twitter: "@lespacelibre",
} as const;
