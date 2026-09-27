/**
 * Configuration globale du site.
 * Source unique pour toutes les métadonnées par défaut.
 */

export const SITE = {
  nom: "L'Espace Libre",
  baseline: "Débarras haute performance, Bordeaux Métropole & Gironde",
  url:
    process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://www.lespace-libre.fr",
  locale: "fr-FR",
  region: "Nouvelle-Aquitaine",
  description:
    "Débarras complet, tri responsable, devis final sous 2h par photo. Bordeaux Métropole et Gironde.",
  defaultOgImage: "/logo.png",
  twitter: "@lespace_libre",
} as const;
