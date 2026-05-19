/**
 * Données des avis clients — écosystème "Avis" (Dark Route MVP).
 *
 * Ce fichier sera alimenté progressivement avec de vrais avis vérifiés.
 * Le tableau `REVIEWS` est vide au lancement pour éviter tout faux
 * signal E-E-A-T auprès de Google.
 *
 * Structure stricte pour garantir la cohérence des composants UI
 * (`ReviewCard`, `ReviewGrid`) et du JSON-LD `AggregateRating`.
 */

export interface Review {
  /** Identifiant unique (kebab-case, ex: "mme-r-bordeaux-01"). */
  id: string;
  /** Prénom + initiale du nom (ex: "Marie R."). */
  nomClient: string;
  /** Note sur 5 (entier ou demi-point, ex: 5, 4.5). */
  noteSur5: number;
  /** Texte complet de l'avis (2-4 phrases idéalement). */
  texteAvis: string;
  /** Date ISO de l'avis (ex: "2026-03-15"). */
  date: string;
  /** Slug du service concerné (doit correspondre à `services.ts`). */
  serviceConcerne: string;
  /** Commune d'intervention (optionnel, renforce le signal local). */
  commune?: string;
}

/**
 * Base d'avis clients — VIDE AU LANCEMENT.
 *
 * Quand des vrais avis seront collectés, ajouter ici :
 * ```ts
 * {
 *   id: "mme-r-bordeaux-01",
 *   nomClient: "Marie R.",
 *   noteSur5: 5,
 *   texteAvis: "Équipe ponctuelle et respectueuse...",
 *   date: "2026-03-15",
 *   serviceConcerne: "debarras-maison-appartement",
 *   commune: "Bordeaux",
 * },
 * ```
 */
export const REVIEWS: readonly Review[] = [
  // ── Placeholder technique (commenté) ──────────────────────────
  // {
  //   id: "placeholder-technique",
  //   nomClient: "Prénom N.",
  //   noteSur5: 5,
  //   texteAvis:
  //     "Avis placeholder — à remplacer par un vrai témoignage vérifié avant activation de la page.",
  //   date: "2026-01-01",
  //   serviceConcerne: "debarras-maison-appartement",
  //   commune: "Bordeaux",
  // },
];

/* ── Helpers ──────────────────────────────────────────────────── */

/** Nombre total d'avis publiés. */
export function getReviewCount(): number {
  return REVIEWS.length;
}

/** Note moyenne arrondie à 1 décimale (0 si aucun avis). */
export function getAverageRating(): number {
  if (REVIEWS.length === 0) return 0;
  const sum = REVIEWS.reduce((acc, r) => acc + r.noteSur5, 0);
  return Math.round((sum / REVIEWS.length) * 10) / 10;
}

/** Filtre les avis par slug de service. */
export function getReviewsByService(slug: string): readonly Review[] {
  return REVIEWS.filter((r) => r.serviceConcerne === slug);
}
