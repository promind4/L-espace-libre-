/**
 * Formatage des devis fermes produits depuis /admin/estimateur.
 *
 * Deux formats :
 *  - `formatQuoteForClient` : texte brut prêt à coller dans un e-mail
 *    envoyé au prospect. N'inclut PAS les notes internes.
 *  - `formatQuoteForOperator` : texte de référence interne, avec le
 *    détail complet du calcul et les notes internes.
 */
import {
  formatEuros,
  TYPE_LABELS,
  FLOOR_LABELS,
  SALUBRITY_LABELS,
  ZONE_LABELS,
  type PricingInput,
  type PricingOutput,
} from "@/lib/pricing";
import { BUSINESS } from "@/config/business";

export interface QuoteFormatContext {
  /** Numéro de référence, généré côté UI (ex : `LEL-20260511-001`). */
  reference: string;
  /** Date d'émission, format ISO ; sera mise au format français. */
  emittedAt: Date;
  /** Notes commerciales internes (omises dans la version client). */
  notesInternes?: string;
  /** Champs saisis par l'opérateur. */
  input: PricingInput;
  /** Résultat de `computeEstimate`. */
  output: PricingOutput;
}

const DATE_FMT = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

// ============================================================
//  Format CLIENT (à coller dans un e-mail)
// ============================================================
export function formatQuoteForClient(ctx: QuoteFormatContext): string {
  const range = `${formatEuros(ctx.output.low)} — ${formatEuros(ctx.output.high)}`;
  return [
    `Devis estimatif L'Espace Libre`,
    `Référence : ${ctx.reference}`,
    `Émis le ${DATE_FMT.format(ctx.emittedAt)}`,
    ``,
    `Bonjour,`,
    ``,
    `Suite à votre demande, voici notre devis estimatif basé sur les`,
    `caractéristiques que vous nous avez transmises :`,
    ``,
    `  • Type de bien   : ${TYPE_LABELS[ctx.input.type]}`,
    `  • Surface        : ${ctx.input.surface_m2} m²`,
    `  • Étage et accès : ${FLOOR_LABELS[ctx.input.floor]}`,
    `  • État du bien   : ${SALUBRITY_LABELS[ctx.input.salubrity]}`,
    `  • Zone           : ${ZONE_LABELS[ctx.input.zone]}`,
    ctx.input.zone === "hors-departement" && ctx.input.distance_km !== undefined
      ? `  • Distance       : ${ctx.input.distance_km} km depuis Bordeaux Centre`
      : null,
    ``,
    `Fourchette de prix : ${range}`,
    `Devis nominal     : ${formatEuros(ctx.output.nominal)}`,
    ``,
    `Nos engagements inclus dans ce tarif :`,
    `  · Assurance Responsabilité Civile Professionnelle.`,
    `  · Charte 0 gaspillage — dons aux associations locales`,
    `    (Emmaüs, Le Relais) et tri sélectif rigoureux.`,
    `  · Restitution du bien propre, balayage inclus.`,
    `  · Aucun acompte exigé à la signature.`,
    ``,
    `Conditions :`,
    `  · Devis valable 30 jours après la date d'émission.`,
    `  · La fourchette tient compte des aléas raisonnables sur place.`,
    `  · Toute variation significative donnera lieu à un avenant écrit`,
    `    et validé avant intervention.`,
    ``,
    `Pour confirmer votre intervention ou poser une question, il vous`,
    `suffit de répondre à ce message.`,
    ``,
    `Cordialement,`,
    `L'équipe L'Espace Libre`,
    ``,
    `${BUSINESS.nom} — ${BUSINESS.adresse.ville}`,
    `Téléphone : ${BUSINESS.contact.telephoneAffichage}`,
    `E-mail    : ${BUSINESS.contact.email}`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

// ============================================================
//  Format OPÉRATEUR (référence interne)
// ============================================================
export function formatQuoteForOperator(ctx: QuoteFormatContext): string {
  const range = `${formatEuros(ctx.output.low)} — ${formatEuros(ctx.output.high)}`;
  const lines = [
    `# Devis interne — ${ctx.reference}`,
    `Émis le : ${DATE_FMT.format(ctx.emittedAt)}`,
    ``,
    `## Caractéristiques`,
    `  Type             : ${TYPE_LABELS[ctx.input.type]} (${ctx.input.type})`,
    `  Surface          : ${ctx.input.surface_m2} m²`,
    `  Étage et accès   : ${FLOOR_LABELS[ctx.input.floor]} (${ctx.input.floor})`,
    `  Salubrité        : ${SALUBRITY_LABELS[ctx.input.salubrity]} (${ctx.input.salubrity})`,
    `  Zone             : ${ZONE_LABELS[ctx.input.zone]} (${ctx.input.zone})`,
  ];
  if (ctx.input.zone === "hors-departement" && ctx.input.distance_km !== undefined) {
    lines.push(`  Distance         : ${ctx.input.distance_km} km`);
  }
  if (
    ctx.input.custom_coefficient !== undefined &&
    ctx.input.custom_coefficient !== 1
  ) {
    lines.push(`  Coef. correctif  : ×${ctx.input.custom_coefficient}`);
  }
  lines.push(
    ``,
    `## Détail du calcul`,
    `  Volume évacué    : ${ctx.output.volume_evacue_m3.toFixed(1)} m³`,
    `  Travail          : ${formatEuros(Math.round(ctx.output.travail))}`,
    `  Base (forfait+t) : ${formatEuros(Math.round(ctx.output.base))}`,
    `  Coef. étage      : ×${ctx.output.coefficient_etage}`,
    `  Coef. salubrité  : ×${ctx.output.coefficient_salubrity}`,
    `  Coef. correctif  : ×${ctx.output.coefficient_custom}`,
    `  Frais km         : ${formatEuros(ctx.output.frais_km)}`,
    `  ─────────────────────────────`,
    `  Nominal          : ${formatEuros(ctx.output.nominal)}`,
    `  Fourchette       : ${range}`,
  );
  if (ctx.notesInternes && ctx.notesInternes.trim().length > 0) {
    lines.push(``, `## Notes internes (non transmises)`, ctx.notesInternes.trim());
  }
  return lines.join("\n");
}

// ============================================================
//  Génération de référence
// ============================================================
/**
 * Génère une référence type `LEL-YYYYMMDD-XXX` où XXX est un compteur
 * basé sur le timestamp. Pas de persistance — chaque session peut
 * recréer la même référence par hasard, c'est acceptable en v1 où le
 * PO archive lui-même les devis dans son client mail.
 */
export function generateReference(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const hhmmss =
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0") +
    String(now.getSeconds()).padStart(2, "0");
  return `LEL-${y}${m}${d}-${hhmmss}`;
}
