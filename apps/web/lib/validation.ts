/**
 * Schémas Zod de validation.
 * Source unique pour les inputs publics (Simulateur) et admin.
 */
import { z } from "zod";
import { PRICING_CONSTANTS } from "@/lib/pricing";

export const BienTypeSchema = z.enum([
  "maison",
  "appartement",
  "cave",
  "bureau",
]);

export const FloorAccessSchema = z.enum([
  "rdc",
  "etage-asc",
  "etage-sans-asc",
  "haut-sans-asc",
]);

export const SalubritySchema = z.enum([
  "normal",
  "poussiereux",
  "insalubre",
  "diogene",
]);

export const ZoneSchema = z.enum([
  "cub",
  "gironde-hors-cub",
  "hors-departement",
]);

/**
 * Schéma de soumission du Simulateur public.
 * Salubrité et zone sont fixées par défaut côté public.
 */
export const SimulatorPublicSubmissionSchema = z.object({
  type: BienTypeSchema,
  surface_m2: z
    .number()
    .int()
    .min(PRICING_CONSTANTS.SURFACE_MIN_PUBLIC)
    .max(PRICING_CONSTANTS.SURFACE_MAX_PUBLIC),
  floor: FloorAccessSchema,
  email: z
    .string()
    .email("Adresse e-mail invalide")
    .max(254),
  consent: z
    .literal(true, {
      errorMap: () => ({
        message: "Le consentement est requis pour recevoir l'estimation.",
      }),
    }),
  // Champ honeypot anti-bot (doit rester vide).
  website: z.string().max(0).optional(),
});

export type SimulatorPublicSubmission = z.infer<
  typeof SimulatorPublicSubmissionSchema
>;

/**
 * Schéma admin — expose tous les champs incluant salubrité, zone,
 * distance et coefficient correctif personnalisé.
 */
export const SimulatorAdminInputSchema = z.object({
  type: BienTypeSchema,
  surface_m2: z
    .number()
    .min(PRICING_CONSTANTS.SURFACE_MIN_ADMIN)
    .max(PRICING_CONSTANTS.SURFACE_MAX_ADMIN),
  floor: FloorAccessSchema,
  salubrity: SalubritySchema,
  zone: ZoneSchema,
  distance_km: z.number().min(0).optional(),
  custom_coefficient: z
    .number()
    .min(PRICING_CONSTANTS.CUSTOM_COEFF_MIN)
    .max(PRICING_CONSTANTS.CUSTOM_COEFF_MAX)
    .optional(),
  notes_internes: z.string().max(2000).optional(),
});

export type SimulatorAdminInput = z.infer<typeof SimulatorAdminInputSchema>;

/**
 * Schéma de la page Contact — formulaire plat « Value-First » (v3).
 *
 * Combine les critères techniques (type, surface à débarrasser,
 * annexes, salubrité, accessibilité, précisions) avec les
 * coordonnées de capture (prénom, téléphone, e-mail) — version
 * **simplifiée** : pas de nom de famille, pas de code postal,
 * pas de statut professionnel.
 *
 * Tous les critères techniques sont **obligatoires** sauf les annexes
 * (optionnelles) et le téléphone (optionnel mais recommandé pour
 * accélérer le devis ferme).
 *
 * Le calcul tarifaire utilise les vrais champs choisis par
 * l'utilisateur (plus de défauts hardcodés salubrity=normal /
 * floor=rdc). Zone reste cub par défaut public — affinée
 * manuellement au devis ferme.
 */
export const ContactQuoteSchema = z.object({
  // ===== Le bien =====
  type: BienTypeSchema,
  /** Surface réelle à débarrasser — peut être inférieure à la surface
      habitable totale (cas du débarras partiel). */
  surface_m2: z
    .number()
    .int("La surface doit être un nombre entier")
    .min(
      PRICING_CONSTANTS.SURFACE_MIN_PUBLIC,
      `Surface minimum : ${PRICING_CONSTANTS.SURFACE_MIN_PUBLIC} m²`,
    )
    .max(
      PRICING_CONSTANTS.SURFACE_MAX_PUBLIC,
      `Surface maximum : ${PRICING_CONSTANTS.SURFACE_MAX_PUBLIC} m²`,
    ),

  // ===== Annexes (optionnel) =====
  annexes: z
    .array(z.enum(["garage", "cave", "sous-sol", "dependance"]))
    .max(4)
    .optional()
    .default([]),
  annexes_surface_m2: z
    .number()
    .int()
    .min(0)
    .max(PRICING_CONSTANTS.ANNEX_SURFACE_MAX)
    .optional()
    .default(0),

  // ===== État et accès =====
  salubrity: SalubritySchema,
  floor: FloorAccessSchema,

  // ===== Précisions textuelles (optionnel) =====
  acces: z.string().max(500).optional(),

  // ===== Coordonnées de capture (mini-form) =====
  prenom: z.string().min(1, "Prénom requis").max(80, "Prénom trop long"),
  email: z.string().email("Adresse e-mail invalide").max(254),
  telephone: z
    .string()
    .max(30, "Numéro trop long")
    .regex(
      /^[\d\s+().\-]{6,30}$/,
      "Numéro invalide (chiffres, espaces, +, -, (), . autorisés)",
    )
    .optional()
    .or(z.literal("")),

  // ===== Consentement RGPD =====
  consent: z.literal(true, {
    errorMap: () => ({
      message:
        "Le consentement est requis pour traiter votre demande de devis.",
    }),
  }),

  // ===== Honeypot anti-bot =====
  website: z.string().max(0).optional(),
});

export type ContactQuoteSubmission = z.infer<typeof ContactQuoteSchema>;
