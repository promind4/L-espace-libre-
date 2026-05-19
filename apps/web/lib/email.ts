/**
 * Envoi des e-mails transactionnels via Resend.
 *
 * Deux destinations à chaque soumission du Simulateur :
 *   1. Prospect — reçoit sa fourchette (HTML + texte brut, vouvoiement).
 *   2. Back-office — adresse leads@lespacelibre.fr (R12).
 *
 * Templates : français FR-FR, calme, factuel, aucun emoji, aucun
 * point d'exclamation (Constitution I.2).
 */
import { Resend } from "resend";
import { BUSINESS } from "@/config/business";
import { SITE } from "@/config/site";
import {
  formatEuros,
  TYPE_LABELS,
  FLOOR_LABELS,
  SALUBRITY_LABELS,
  type PricingOutput,
  type BienType,
  type FloorAccess,
  type SalubrityLevel,
} from "@/lib/pricing";

export interface LeadContext {
  type: BienType;
  surface_m2: number;
  floor: FloorAccess;
  email: string;
  estimate: PricingOutput;
  meta: {
    submittedAt: Date;
    userAgent: string;
    ip: string;
    referer: string;
  };
}

const FROM_PROSPECT = `L'Espace Libre <devis@lespacelibre.fr>`;
const FROM_BACKOFFICE = `Simulateur <notifications@lespacelibre.fr>`;
const REPLY_TO = BUSINESS.contact.email;

let _resend: Resend | null = null;
function resend(): Resend {
  if (_resend) return _resend;
  const key = process.env["RESEND_API_KEY"];
  if (!key) {
    throw new Error(
      "RESEND_API_KEY est manquante dans l'environnement. Configurer la variable dans Vercel ou .env.local.",
    );
  }
  _resend = new Resend(key);
  return _resend;
}

export async function sendLeadEmails(context: LeadContext): Promise<void> {
  const tasks: Array<Promise<unknown>> = [
    resend().emails.send(buildProspectEmail(context)),
    resend().emails.send(buildBackofficeEmail(context)),
  ];
  // En cas d'échec d'un des deux envois, on lève une erreur mais on
  // tente quand même le second (pas de short-circuit côté Resend).
  const results = await Promise.allSettled(tasks);
  const failures = results.filter((r) => r.status === "rejected");
  if (failures.length > 0) {
    throw new Error(
      `Resend a échoué sur ${failures.length} envoi(s) : ${failures
        .map((f) => (f as PromiseRejectedResult).reason)
        .join(" | ")}`,
    );
  }
}

// ============================================================
//  Template — Prospect
// ============================================================
function buildProspectEmail(ctx: LeadContext) {
  const typeLabel = TYPE_LABELS[ctx.type].toLowerCase();
  const range = `${formatEuros(ctx.estimate.low)} — ${formatEuros(ctx.estimate.high)}`;

  const subject = `Votre estimation L'Espace Libre — ${range}`;

  const text = [
    `Bonjour,`,
    ``,
    `Voici la fourchette de prix indicative pour votre projet de débarras :`,
    ``,
    `  ${range}`,
    ``,
    `Détail :`,
    `  Type de bien     : ${TYPE_LABELS[ctx.type]}`,
    `  Surface          : ${ctx.surface_m2} m²`,
    `  Étage et accès   : ${FLOOR_LABELS[ctx.floor]}`,
    ``,
    `Cette fourchette est indicative. Pour obtenir un devis ferme, il`,
    `nous suffit de quelques photos du bien. Vous pouvez les envoyer en`,
    `réponse à ce message — nous revenons vers vous sous deux heures,`,
    `pendant les horaires d'ouverture.`,
    ``,
    `Nos engagements :`,
    `  · Assurance Responsabilité Civile Professionnelle incluse.`,
    `  · Charte 0 gaspillage — dons aux associations locales`,
    `    (Emmaüs, Le Relais) et tri sélectif rigoureux.`,
    `  · Aucun engagement, aucun appel commercial non sollicité.`,
    ``,
    `Vos données — Conformément au RGPD, votre adresse e-mail est`,
    `conservée ${BUSINESS.conservationRgpdMois} mois (3 ans) à compter du dernier contact. Vous`,
    `pouvez demander leur effacement à tout moment à`,
    `${BUSINESS.contact.email}.`,
    ``,
    `L'équipe L'Espace Libre`,
    `${SITE.url}`,
  ].join("\n");

  const html = renderHtml({
    title: "Votre estimation L'Espace Libre",
    preheader: `Fourchette indicative : ${range}. Détails et prochaine étape ci-dessous.`,
    body: `
      <p style="margin:0 0 16px;">Bonjour,</p>
      <p style="margin:0 0 16px;">Voici la fourchette de prix indicative pour votre projet de débarras&nbsp;:</p>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:16px 0 24px;background:#FAFBFC;border:1px solid #E9ECF1;border-radius:14px;">
        <tr><td style="padding:24px;text-align:center;">
          <div style="font-size:32px;font-weight:800;color:#1D3E61;letter-spacing:-0.02em;line-height:1.1;">
            ${escapeHtml(range)}
          </div>
          <div style="font-size:13px;color:#8A93A2;margin-top:8px;">Fourchette indicative</div>
        </td></tr>
      </table>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 24px;font-size:14px;color:#4B5566;">
        <tr><td style="padding:6px 0;width:160px;color:#8A93A2;">Type de bien</td><td style="padding:6px 0;">${escapeHtml(TYPE_LABELS[ctx.type])}</td></tr>
        <tr><td style="padding:6px 0;color:#8A93A2;">Surface</td><td style="padding:6px 0;">${ctx.surface_m2}&nbsp;m²</td></tr>
        <tr><td style="padding:6px 0;color:#8A93A2;">Étage et accès</td><td style="padding:6px 0;">${escapeHtml(FLOOR_LABELS[ctx.floor])}</td></tr>
      </table>

      <p style="margin:0 0 16px;">
        Cette fourchette est indicative. Pour obtenir un devis ferme,
        il nous suffit de quelques photos du bien. Vous pouvez les
        envoyer en réponse à ce message — nous revenons vers vous sous
        deux heures, pendant les horaires d'ouverture.
      </p>

      <p style="margin:24px 0 12px;font-size:12px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#3D628A;">Nos engagements</p>
      <ul style="margin:0 0 24px;padding-left:20px;color:#4B5566;font-size:14px;">
        <li style="margin:0 0 8px;">Assurance Responsabilité Civile Professionnelle incluse.</li>
        <li style="margin:0 0 8px;">Charte 0 gaspillage — dons aux associations locales (Emmaüs, Le Relais) et tri sélectif rigoureux.</li>
        <li style="margin:0 0 8px;">Aucun engagement, aucun appel commercial non sollicité.</li>
      </ul>

      <p style="margin:24px 0 0;font-size:12px;color:#8A93A2;line-height:1.5;">
        Vos données — Conformément au RGPD, votre adresse e-mail est conservée
        ${BUSINESS.conservationRgpdMois}&nbsp;mois (3&nbsp;ans) à compter du dernier contact.
        Vous pouvez demander leur effacement à tout moment à
        <a href="mailto:${BUSINESS.contact.email}" style="color:#3D628A;">${BUSINESS.contact.email}</a>.
      </p>
    `,
  });

  return {
    from: FROM_PROSPECT,
    to: ctx.email,
    replyTo: REPLY_TO,
    subject,
    text,
    html,
    headers: {
      "List-Unsubscribe": `<mailto:${BUSINESS.contact.email}?subject=Désabonnement>`,
    },
  };
}

// ============================================================
//  Template — Back-office
// ============================================================
function buildBackofficeEmail(ctx: LeadContext) {
  const range = `${formatEuros(ctx.estimate.low)} — ${formatEuros(ctx.estimate.high)}`;
  const subject = `[Lead] ${TYPE_LABELS[ctx.type]} ${ctx.surface_m2}m² — ${range}`;

  const text = [
    `Nouveau lead capté via le Simulateur.`,
    ``,
    `=== Coordonnées ===`,
    `E-mail   : ${ctx.email}`,
    ``,
    `=== Demande ===`,
    `Type            : ${TYPE_LABELS[ctx.type]} (${ctx.type})`,
    `Surface         : ${ctx.surface_m2} m²`,
    `Volume évacué   : ${ctx.estimate.volume_evacue_m3.toFixed(1)} m³`,
    `Étage et accès  : ${FLOOR_LABELS[ctx.floor]} (${ctx.floor})`,
    `Coef. étage     : ×${ctx.estimate.coefficient_etage}`,
    `Coef. salubrité : ×${ctx.estimate.coefficient_salubrity} (normal — défaut public)`,
    `Frais km        : ${formatEuros(ctx.estimate.frais_km)} (CUB — défaut public)`,
    ``,
    `=== Estimation ===`,
    `Nominal         : ${formatEuros(ctx.estimate.nominal)}`,
    `Fourchette      : ${range}`,
    ``,
    `=== Méta ===`,
    `Soumis le       : ${ctx.meta.submittedAt.toISOString()}`,
    `IP              : ${ctx.meta.ip}`,
    `User agent      : ${ctx.meta.userAgent}`,
    `Referer         : ${ctx.meta.referer}`,
    ``,
    `Pour produire un devis ferme avec tous les coefficients :`,
    `${SITE.url}/admin/estimateur`,
  ].join("\n");

  return {
    from: FROM_BACKOFFICE,
    to: BUSINESS.contact.emailLeads,
    replyTo: ctx.email,
    subject,
    text,
  };
}

// ============================================================
//  Helpers
// ============================================================
function renderHtml({
  title,
  preheader,
  body,
}: {
  title: string;
  preheader: string;
  body: string;
}): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#FAFBFC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1F2733;">
  <span style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;color:#FAFBFC;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preheader)}</span>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#FAFBFC;">
    <tr><td style="padding:32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;margin:0 auto;background:#FFFFFF;border:1px solid #E9ECF1;border-radius:14px;">
        <tr><td style="padding:32px;">
          <div style="font-size:13px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#3D628A;margin-bottom:16px;">L'Espace Libre</div>
          <h1 style="margin:0 0 24px;font-size:24px;font-weight:700;color:#1F2733;letter-spacing:-0.01em;line-height:1.25;">${escapeHtml(title)}</h1>
          ${body}
        </td></tr>
      </table>
      <p style="text-align:center;font-size:12px;color:#8A93A2;margin:16px 0 0;">
        L'Espace Libre — Débarras professionnel, Bordeaux Métropole &amp; Nouvelle-Aquitaine.
      </p>
    </td></tr>
  </table>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ============================================================
//  Contact quote — formulaire plat (redesign v3)
// ============================================================

type AnnexId = "garage" | "cave" | "sous-sol" | "dependance";

const ANNEX_LABELS: Readonly<Record<AnnexId, string>> = {
  garage: "Garage",
  cave: "Cave",
  "sous-sol": "Sous-sol",
  dependance: "Dépendance",
};

export interface ContactQuoteEmailContext {
  type: BienType;
  /** Surface à débarrasser (m²) — peut être inférieure à la surface
      habitable totale du bien (cas du débarras partiel). */
  surface_m2: number;
  annexes?: readonly AnnexId[];
  annexes_surface_m2?: number;
  salubrity: SalubrityLevel;
  floor: FloorAccess;
  acces?: string;
  /** Mini-form simplifié : prénom + e-mail + téléphone optionnel.
      Nom de famille retiré (capture v3 zéro-tension). */
  prenom: string;
  email: string;
  telephone?: string;
  estimate: PricingOutput;
  meta: {
    submittedAt: Date;
    userAgent: string;
    ip: string;
    referer: string;
  };
}

/**
 * Variante de `sendLeadEmails` adaptée au formulaire de contact
 * (qui collecte prénom/nom/téléphone en plus de l'e-mail).
 *
 * Envoie deux courriers : un au prospect (avec son estimation et
 * la suite des opérations), un au back-office (avec toutes les
 * coordonnées pour rappel et préparation du devis ferme).
 */
export async function sendContactQuoteEmails(
  ctx: ContactQuoteEmailContext,
): Promise<void> {
  const tasks: Array<Promise<unknown>> = [
    resend().emails.send(buildContactProspectEmail(ctx)),
    resend().emails.send(buildContactBackofficeEmail(ctx)),
  ];
  const results = await Promise.allSettled(tasks);
  const failures = results.filter((r) => r.status === "rejected");
  if (failures.length > 0) {
    throw new Error(
      `Resend a échoué sur ${failures.length} envoi(s) : ${failures
        .map((f) => (f as PromiseRejectedResult).reason)
        .join(" | ")}`,
    );
  }
}

function buildContactProspectEmail(ctx: ContactQuoteEmailContext) {
  const typeLabel = TYPE_LABELS[ctx.type].toLowerCase();
  const range = `${formatEuros(ctx.estimate.low)} — ${formatEuros(ctx.estimate.high)}`;
  const subject = `Votre estimation L'Espace Libre — ${range}`;
  const annexesList = (ctx.annexes ?? [])
    .map((a) => ANNEX_LABELS[a])
    .join(", ");
  const annexesLine =
    ctx.annexes && ctx.annexes.length > 0
      ? `  Annexes          : ${annexesList} (${ctx.annexes_surface_m2 ?? 0} m²)`
      : "";

  const text = [
    `Bonjour ${ctx.prenom},`,
    ``,
    `Merci pour votre demande. Voici la fourchette de prix indicative`,
    `pour votre projet de débarras :`,
    ``,
    `  ${range}`,
    ``,
    `Détail :`,
    `  Type de bien     : ${TYPE_LABELS[ctx.type]}`,
    `  Surface à vider  : ${ctx.surface_m2} m²`,
    annexesLine,
    `  Salubrité        : ${SALUBRITY_LABELS[ctx.salubrity]}`,
    `  Accès            : ${FLOOR_LABELS[ctx.floor]}`,
    ctx.acces ? `  Précisions accès : ${ctx.acces}` : "",
    ``,
    `Cette fourchette est indicative. Notre équipe revient vers vous`,
    `sous deux heures ouvrées avec un devis ferme dès réception de`,
    `quelques photos du bien — vous pouvez les envoyer en réponse à ce`,
    `message.`,
    ``,
    `Nos engagements :`,
    `  · Assurance Responsabilité Civile Professionnelle incluse.`,
    `  · Charte 0 gaspillage — dons aux associations locales`,
    `    (Emmaüs, Le Relais) et tri sélectif rigoureux.`,
    `  · Aucun engagement, aucun appel commercial non sollicité.`,
    ``,
    `Vos données — Conformément au RGPD, vos coordonnées sont`,
    `conservées ${BUSINESS.conservationRgpdMois} mois (3 ans) à compter du dernier contact.`,
    `Vous pouvez demander leur effacement à tout moment à`,
    `${BUSINESS.contact.email}.`,
    ``,
    `L'équipe L'Espace Libre`,
    `${SITE.url}`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = renderHtml({
    title: `Bonjour ${escapeHtml(ctx.prenom)}, voici votre estimation`,
    preheader: `Fourchette indicative : ${range}. Détails et prochaine étape ci-dessous.`,
    body: `
      <p style="margin:0 0 16px;">Merci pour votre demande.</p>
      <p style="margin:0 0 16px;">Voici la fourchette de prix indicative pour votre projet de débarras (${escapeHtml(
        typeLabel,
      )}, ${ctx.surface_m2}&nbsp;m² à vider)&nbsp;:</p>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:16px 0 24px;background:#FAFBFC;border:1px solid #E9ECF1;border-radius:14px;">
        <tr><td style="padding:24px;text-align:center;">
          <div style="font-size:32px;font-weight:800;color:#1D3E61;letter-spacing:-0.02em;line-height:1.1;">
            ${escapeHtml(range)}
          </div>
          <div style="font-size:13px;color:#8A93A2;margin-top:8px;">Fourchette indicative</div>
        </td></tr>
      </table>

      <p style="margin:0 0 16px;">
        Notre équipe revient vers vous sous deux heures ouvrées avec un
        devis ferme dès réception de quelques photos du bien — vous
        pouvez les envoyer en réponse à ce message.
      </p>

      <p style="margin:24px 0 12px;font-size:12px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#3D628A;">Nos engagements</p>
      <ul style="margin:0 0 24px;padding-left:20px;color:#4B5566;font-size:14px;">
        <li style="margin:0 0 8px;">Assurance Responsabilité Civile Professionnelle incluse.</li>
        <li style="margin:0 0 8px;">Charte 0 gaspillage — dons aux associations locales (Emmaüs, Le Relais) et tri sélectif rigoureux.</li>
        <li style="margin:0 0 8px;">Aucun engagement, aucun appel commercial non sollicité.</li>
      </ul>

      <p style="margin:24px 0 0;font-size:12px;color:#8A93A2;line-height:1.5;">
        Vos données — Conformément au RGPD, vos coordonnées sont conservées
        ${BUSINESS.conservationRgpdMois}&nbsp;mois (3&nbsp;ans) à compter du dernier contact.
        Vous pouvez demander leur effacement à tout moment à
        <a href="mailto:${BUSINESS.contact.email}" style="color:#3D628A;">${BUSINESS.contact.email}</a>.
      </p>
    `,
  });

  return {
    from: FROM_PROSPECT,
    to: ctx.email,
    replyTo: REPLY_TO,
    subject,
    text,
    html,
    headers: {
      "List-Unsubscribe": `<mailto:${BUSINESS.contact.email}?subject=Désabonnement>`,
    },
  };
}

function buildContactBackofficeEmail(ctx: ContactQuoteEmailContext) {
  const range = `${formatEuros(ctx.estimate.low)} — ${formatEuros(ctx.estimate.high)}`;
  const subject = `[Devis] ${ctx.prenom} — ${TYPE_LABELS[ctx.type]} ${ctx.surface_m2}m² ${SALUBRITY_LABELS[ctx.salubrity]} — ${range}`;
  const annexesList = (ctx.annexes ?? [])
    .map((a) => ANNEX_LABELS[a])
    .join(", ");

  const text = [
    `Nouvelle demande de devis via /contact.`,
    ``,
    `=== Coordonnées ===`,
    `Prénom    : ${ctx.prenom}`,
    `E-mail    : ${ctx.email}`,
    `Téléphone : ${ctx.telephone ?? "(non renseigné)"}`,
    ``,
    `=== Demande ===`,
    `Type            : ${TYPE_LABELS[ctx.type]} (${ctx.type})`,
    `Surface à vider : ${ctx.surface_m2} m²`,
    ctx.annexes && ctx.annexes.length > 0
      ? `Annexes         : ${annexesList} (${ctx.annexes_surface_m2 ?? 0} m²)`
      : `Annexes         : (aucune)`,
    `Salubrité       : ${SALUBRITY_LABELS[ctx.salubrity]} (${ctx.salubrity})`,
    `Accès           : ${FLOOR_LABELS[ctx.floor]} (${ctx.floor})`,
    `Volume évacué   : ${ctx.estimate.volume_evacue_m3.toFixed(1)} m³`,
    `Précisions accès: ${ctx.acces ?? "(aucune)"}`,
    ``,
    `=== Estimation ===`,
    `Nominal         : ${formatEuros(ctx.estimate.nominal)}`,
    `Fourchette      : ${range}`,
    `Coef. salubrité : ×${ctx.estimate.coefficient_salubrity}`,
    `Coef. étage     : ×${ctx.estimate.coefficient_etage}`,
    ``,
    `=== Méta ===`,
    `Soumis le       : ${ctx.meta.submittedAt.toISOString()}`,
    `IP              : ${ctx.meta.ip}`,
    `User agent      : ${ctx.meta.userAgent}`,
    `Referer         : ${ctx.meta.referer}`,
    ``,
    `Pour produire le devis ferme final :`,
    `${SITE.url}/admin/estimateur`,
  ].join("\n");

  return {
    from: FROM_BACKOFFICE,
    to: BUSINESS.contact.emailLeads,
    replyTo: ctx.email,
    subject,
    text,
  };
}
