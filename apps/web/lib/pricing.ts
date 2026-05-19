/**
 * Algorithme tarifaire — L'Espace Libre
 *
 * Source de vérité unique pour le Simulateur public ET l'outil interne
 * /admin/estimateur. Toute évolution de la grille passe par ce fichier
 * et ses tests (specify.md §3.6, plan.md §5).
 *
 * Constitution P2.1 : couverture de test 100% obligatoire.
 *
 * ============================================================
 *  RÈGLE MÉTIER (v1.1 — corrigée 2026-05-11)
 * ============================================================
 *  La hauteur sous plafond n'entre PAS dans le calcul.
 *  Le volume évacué est dérivé de la surface habitable via un
 *  coefficient de densité empirique (DENSITY_COEFF = 0,38)
 *  qui reflète la part réelle du logement à débarrasser.
 *
 *  Formule canonique :
 *    nominal = ( BASE_FORFAIT
 *              + (surface + annexes × 0,6) × DENSITY_COEFF × salubrity × RATE_PER_M3
 *              ) × coef_etage × coef_custom
 *              + frais_km
 *
 *  low  = roundToTen(nominal × RANGE_LOW)   // 0,65 — prix d'appel agressif v3
 *  high = roundToTen(nominal × RANGE_HIGH)  // 1,15 — borne haute conforme
 *
 *  Référence : Diogène 100 m² RDC CUB → 4 355 €.
 * ============================================================
 *
 * ============================================================
 *  AUDIT — Cohérence sur petites surfaces (vérifié 2026-05-17)
 * ============================================================
 *  La part du BASE_FORFAIT (80 €) pèse mécaniquement plus en
 *  pourcentage sur les très petites surfaces :
 *    - 10 m² → 251 € (BASE = 32 % du prix)
 *    -  60 m² → 1 106 € (BASE = 7 % du prix)
 *    - 100 m² → 1 790 € (BASE = 4,5 % du prix)
 *  C'est intentionnel : un déplacement et une mise en route ont
 *  un coût fixe quelle que soit la taille. Pas d'anomalie de
 *  surcoût détectée — la courbe nominal = f(surface) est
 *  monotone croissante sur tout l'intervalle [10, 250] m².
 * ============================================================
 */

export type BienType = "maison" | "appartement" | "cave" | "bureau";

export type FloorAccess =
  | "rdc"
  | "etage-asc"
  | "etage-sans-asc"
  | "haut-sans-asc";

export type SalubrityLevel =
  | "normal"
  | "poussiereux"
  | "insalubre"
  | "diogene";

export type Zone =
  | "cub"
  | "gironde-hors-cub"
  | "hors-departement";

export type Context = "public" | "admin";

export interface PricingInput {
  type: BienType;
  /**
   * Surface réelle à débarrasser (m²). Peut être inférieure à la
   * surface habitable totale du bien si le débarras est partiel
   * (ex : vider uniquement le grenier d'une maison de 120 m²).
   */
  surface_m2: number;
  /**
   * Surface additionnelle des annexes à débarrasser (m²) :
   * garage, cave, sous-sol, dépendance. Pondérée par
   * `ANNEX_DENSITY_RATIO` (0,6) pour refléter la densité plus faible
   * de ces espaces. Optionnel — défaut 0.
   */
  annexes_surface_m2?: number;
  floor: FloorAccess;
  salubrity: SalubrityLevel;
  zone: Zone;
  distance_km?: number;
  custom_coefficient?: number;
}

export interface PricingOutput {
  /** Volume estimé à évacuer (m³), dérivé de la surface via DENSITY_COEFF. */
  volume_evacue_m3: number;
  /** Coût brut du travail (avant étage, custom, km). */
  travail: number;
  /** BASE_FORFAIT + travail. Sous-total avant majorations. */
  base: number;
  coefficient_etage: number;
  coefficient_salubrity: number;
  coefficient_custom: number;
  frais_km: number;
  /** Montant nominal arrondi à l'euro (Math.round). */
  nominal: number;
  /** Borne basse de la fourchette (arrondie à la dizaine). */
  low: number;
  /** Borne haute de la fourchette (arrondie à la dizaine). */
  high: number;
}

export const PRICING_CONSTANTS = {
  /**
   * Coefficient de densité métier : volume évacué (m³) par m² habitable.
   * Valeur empirique (0.38) calibrée par le PO pour refléter le ratio
   * réel d'encombrement. Remplace l'erreur historique "× hauteur sous
   * plafond" qui assimilait à tort volume habitable et volume évacué.
   */
  DENSITY_COEFF: 0.38,
  /**
   * Coefficient de densité pour les annexes (garage, cave, sous-sol,
   * dépendance). Plus faible que `DENSITY_COEFF` car les annexes sont
   * généralement moins denses : objets entreposés, vélos, cartons —
   * pas de mobilier d'habitation. Une cave de 15 m² compte donc comme
   * environ 9 m² équivalents habitat.
   *
   * Valeur empirique calibrée à 0,6 (× le coef de densité standard).
   */
  ANNEX_DENSITY_RATIO: 0.6,
  BASE_FORFAIT: 80,
  RATE_PER_M3: 45,
  FLOOR_PENALTY: 0.15,
  /**
   * Bornes de la fourchette autour du nominal.
   *
   * STRATÉGIE COMMERCIALE (v3, décision PO) : la fourchette est
   * **asymétrique**. Le bas est volontairement abaissé à 0,65 (–35 %)
   * pour servir de **prix d'appel** affiché en simulation publique,
   * sous les standards du marché — maximise la capture de coordonnées.
   *
   * Le devis ferme final, calculé manuellement après photos, peut se
   * positionner plus haut dans cette fourchette grâce à la valorisation
   * des biens (revente, dons) qui n'est PAS intégrée dans le moteur
   * automatique. C'est cette mécanique qui rend le prix d'appel bas
   * commercialement défendable.
   *
   * Le haut (1,15 = +15 %) reste conforme aux standards de rentabilité.
   */
  RANGE_LOW: 0.65,
  RANGE_HIGH: 1.15,
  GIRONDE_HORS_CUB_FLAT: 65,
  RATE_PER_KM_HORS_DEPT: 0.6,
  SURFACE_MIN_PUBLIC: 10,
  SURFACE_MAX_PUBLIC: 250,
  ANNEX_SURFACE_MAX: 200,
  SURFACE_MIN_ADMIN: 10,
  SURFACE_MAX_ADMIN: 500,
  CUSTOM_COEFF_MIN: 0.01,
  CUSTOM_COEFF_MAX: 5,
} as const;

export const SALUBRITY_COEFFICIENTS: Readonly<Record<SalubrityLevel, number>> = {
  normal: 1.0,
  poussiereux: 1.2,
  insalubre: 1.5,
  diogene: 2.5,
};

export const FLOORS_WITHOUT_ELEVATOR: Readonly<Record<FloorAccess, number>> = {
  "rdc": 0,
  "etage-asc": 0,
  "etage-sans-asc": 1,
  "haut-sans-asc": 2,
};

export const SALUBRITY_LABELS: Readonly<Record<SalubrityLevel, string>> = {
  normal: "Normal",
  poussiereux: "Poussiéreux",
  insalubre: "Insalubre",
  diogene: "Diogène",
};

export const FLOOR_LABELS: Readonly<Record<FloorAccess, string>> = {
  "rdc": "Rez-de-chaussée",
  "etage-asc": "Étage avec ascenseur",
  "etage-sans-asc": "1er ou 2e sans ascenseur",
  "haut-sans-asc": "3e ou plus sans ascenseur",
};

export const ZONE_LABELS: Readonly<Record<Zone, string>> = {
  "cub": "Bordeaux Métropole (CUB)",
  "gironde-hors-cub": "Gironde hors CUB",
  "hors-departement": "Hors département",
};

export const TYPE_LABELS: Readonly<Record<BienType, string>> = {
  maison: "Maison",
  appartement: "Appartement",
  cave: "Cave / Garage",
  bureau: "Bureau / Local pro",
};

const VALID_TYPES: ReadonlySet<BienType> = new Set([
  "maison",
  "appartement",
  "cave",
  "bureau",
]);

const VALID_FLOORS: ReadonlySet<FloorAccess> = new Set([
  "rdc",
  "etage-asc",
  "etage-sans-asc",
  "haut-sans-asc",
]);

const VALID_SALUBRITY: ReadonlySet<SalubrityLevel> = new Set([
  "normal",
  "poussiereux",
  "insalubre",
  "diogene",
]);

const VALID_ZONES: ReadonlySet<Zone> = new Set([
  "cub",
  "gironde-hors-cub",
  "hors-departement",
]);

export function computeEstimate(
  input: PricingInput,
  context: Context = "public",
): PricingOutput {
  validateInput(input, context);

  // Volume évacué = (surface principale + surface annexes × ratio densité annexes)
  //               × coefficient de densité standard.
  const annexes_m2 = input.annexes_surface_m2 ?? 0;
  const equivalent_surface =
    input.surface_m2 + annexes_m2 * PRICING_CONSTANTS.ANNEX_DENSITY_RATIO;
  const volume_evacue_m3 =
    equivalent_surface * PRICING_CONSTANTS.DENSITY_COEFF;
  const coefficient_salubrity = SALUBRITY_COEFFICIENTS[input.salubrity];
  const coefficient_etage =
    1 + PRICING_CONSTANTS.FLOOR_PENALTY * FLOORS_WITHOUT_ELEVATOR[input.floor];
  const coefficient_custom = input.custom_coefficient ?? 1.0;

  const travail =
    volume_evacue_m3 * coefficient_salubrity * PRICING_CONSTANTS.RATE_PER_M3;
  const base = PRICING_CONSTANTS.BASE_FORFAIT + travail;
  const apres_etage = base * coefficient_etage * coefficient_custom;

  const frais_km = computeFraisKm(input.zone, input.distance_km);

  const nominal_exact = apres_etage + frais_km;

  return {
    volume_evacue_m3,
    travail,
    base,
    coefficient_etage,
    coefficient_salubrity,
    coefficient_custom,
    frais_km,
    nominal: Math.round(nominal_exact),
    low: roundToTen(nominal_exact * PRICING_CONSTANTS.RANGE_LOW),
    high: roundToTen(nominal_exact * PRICING_CONSTANTS.RANGE_HIGH),
  };
}

function computeFraisKm(zone: Zone, distance_km: number | undefined): number {
  switch (zone) {
    case "cub":
      return 0;
    case "gironde-hors-cub":
      return PRICING_CONSTANTS.GIRONDE_HORS_CUB_FLAT;
    case "hors-departement": {
      if (typeof distance_km !== "number" || Number.isNaN(distance_km)) {
        throw new PricingError(
          "distance_km est requis et numérique pour la zone hors département",
        );
      }
      if (distance_km < 0) {
        throw new PricingError("distance_km doit être positif ou nul");
      }
      return Math.round(distance_km * PRICING_CONSTANTS.RATE_PER_KM_HORS_DEPT);
    }
  }
}

function validateInput(input: PricingInput, context: Context): void {
  if (!VALID_TYPES.has(input.type)) {
    throw new PricingError(`type inconnu: ${input.type}`);
  }
  if (!VALID_FLOORS.has(input.floor)) {
    throw new PricingError(`floor inconnu: ${input.floor}`);
  }
  if (!VALID_SALUBRITY.has(input.salubrity)) {
    throw new PricingError(`salubrity inconnu: ${input.salubrity}`);
  }
  if (!VALID_ZONES.has(input.zone)) {
    throw new PricingError(`zone inconnue: ${input.zone}`);
  }

  const min =
    context === "admin"
      ? PRICING_CONSTANTS.SURFACE_MIN_ADMIN
      : PRICING_CONSTANTS.SURFACE_MIN_PUBLIC;
  const max =
    context === "admin"
      ? PRICING_CONSTANTS.SURFACE_MAX_ADMIN
      : PRICING_CONSTANTS.SURFACE_MAX_PUBLIC;

  if (
    typeof input.surface_m2 !== "number" ||
    Number.isNaN(input.surface_m2) ||
    input.surface_m2 < min ||
    input.surface_m2 > max
  ) {
    throw new PricingError(
      `surface_m2 hors bornes [${min}, ${max}] (contexte ${context}): ${input.surface_m2}`,
    );
  }

  // Validation des annexes (toujours optionnel, 0 par défaut).
  if (input.annexes_surface_m2 !== undefined) {
    if (
      typeof input.annexes_surface_m2 !== "number" ||
      Number.isNaN(input.annexes_surface_m2) ||
      input.annexes_surface_m2 < 0 ||
      input.annexes_surface_m2 > PRICING_CONSTANTS.ANNEX_SURFACE_MAX
    ) {
      throw new PricingError(
        `annexes_surface_m2 hors bornes [0, ${PRICING_CONSTANTS.ANNEX_SURFACE_MAX}]: ${input.annexes_surface_m2}`,
      );
    }
  }

  if (input.custom_coefficient !== undefined) {
    if (context !== "admin") {
      throw new PricingError(
        "custom_coefficient n'est autorisé que dans le contexte admin",
      );
    }
    if (
      typeof input.custom_coefficient !== "number" ||
      Number.isNaN(input.custom_coefficient) ||
      input.custom_coefficient < PRICING_CONSTANTS.CUSTOM_COEFF_MIN ||
      input.custom_coefficient > PRICING_CONSTANTS.CUSTOM_COEFF_MAX
    ) {
      throw new PricingError(
        `custom_coefficient hors bornes [${PRICING_CONSTANTS.CUSTOM_COEFF_MIN}, ${PRICING_CONSTANTS.CUSTOM_COEFF_MAX}]: ${input.custom_coefficient}`,
      );
    }
  }
}

function roundToTen(n: number): number {
  return Math.round(n / 10) * 10;
}

export class PricingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PricingError";
  }
}

export function formatEuros(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}
