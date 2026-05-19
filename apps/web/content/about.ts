/**
 * Données de la page À propos (/a-propos).
 *
 * IMPORTANT — Contenu rédactionnel placeholder :
 * Toutes les chaînes ci-dessous sont des **placeholders v1 à valider
 * par le PO** avant publication. Marquées `TODO PO` dans les
 * commentaires de chaque bloc. Le code de la page se contente de
 * lire ces données — aucune logique métier.
 *
 * Anatomie (cf. Concept C / redesign-v2/plan.md §3.2) :
 *   01 Cover         (Light)    eyebrow + H1 + portrait + meta
 *   02 Ancrage       (Light)    chapter label + texte
 *   03 Charte        (Editorial) pull-quote XL + commentaire
 *   04 Fondateur     (Paper)    portrait + texte signé
 *   05 Équipe        (Light)    grille 4 portraits
 *   06 Credentials   (Paper)    key/value table
 *   07 Closing       (Deep)     manifeste + CTA + end-mark
 */

export interface AboutCover {
  eyebrow: string;
  /** H1 cassé en 3 lignes via `<br/>` côté composant. */
  titleLines: readonly [string, string, string];
  /** Mot en italique émeraude dans le titre (extrait des lignes). */
  emphasizedWord?: string;
  lede: string;
  portraitInitials: string;
  portraitCaption: string;
  meta: readonly { label: string; value: string }[];
}

export interface AboutChapter {
  /** Numéro affiché en mono émeraude (ex: "01"). */
  num: string;
  /** Label en MAJUSCULES (ex: "NOTRE ANCRAGE"). */
  label: string;
  /** Slug d'ancre pour le sommaire latéral. */
  id: string;
  /** H2 (max 22ch, balance). */
  h2: string;
  /** Paragraphes du corps de texte. Le premier reçoit la drop-cap. */
  body: readonly string[];
  /** Puces optionnelles (sparkle émeraude). */
  puces?: readonly string[];
}

export interface AboutPullQuote {
  num: string;
  label: string;
  id: string;
  /** Citation XL en italique (max 24ch). */
  citation: string;
  attribution: string;
  /** Texte explicatif sous la citation. */
  body: string;
}

export interface AboutFounder {
  num: string;
  label: string;
  id: string;
  h2: string;
  body: readonly string[];
  name: string;
  role: string;
  initials: string;
  /** Variante d'avatar (couleur du dégradé). */
  avatarVariant: "navy" | "emerald" | "pearl";
}

export interface AboutTeamMember {
  initials: string;
  name: string;
  role: string;
  citation: string;
  variant: "navy" | "emerald" | "pearl" | "alt";
}

export interface AboutCredential {
  key: string;
  value: string;
}

export interface AboutClosing {
  eyebrow: string;
  h2: string;
  body: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export interface AboutContent {
  cover: AboutCover;
  chapters: readonly AboutChapter[];
  pullQuote: AboutPullQuote;
  founder: AboutFounder;
  teamLabel: { num: string; label: string; id: string; h2: string; intro: string };
  team: readonly AboutTeamMember[];
  credentialsLabel: { num: string; label: string; id: string; h2: string };
  credentials: readonly AboutCredential[];
  closing: AboutClosing;
}

// =========================================================
//  Données v1 — toutes marquées TODO PO pour validation
// =========================================================

export const ABOUT: AboutContent = {
  // -------- COVER --------
  // TODO PO : valider l'angle narratif (corvée → logistique fluide).
  cover: {
    eyebrow: "Qui sommes-nous",
    titleLines: [
      "Une corvée stressante,",
      "une logistique",
      "fluide.",
    ],
    emphasizedWord: "une logistique",
    lede:
      "L’Espace Libre est née d’un constat simple : à Bordeaux, vider un logement après un décès, un déménagement ou une rupture de bail relève souvent du chaos. Trois prestataires, deux assurances, aucun bordereau. Nous avons construit l’inverse — un service unique, traçable, rapide.",
    portraitInitials: "NM",
    portraitCaption: "Portrait du fondateur",
    meta: [
      // TODO PO : confirmer dates et données légales avant publication.
      { label: "Fondé en", value: "2024 · Bordeaux" },
      { label: "Statut", value: "Auto-entrepreneur" },
      { label: "Couverture", value: "Gironde · Landes · Lot-et-Garonne" },
      { label: "Assurance", value: "RC Pro" },
    ],
  },

  // -------- CHAPITRES --------
  chapters: [
    // -- 01 Notre ancrage -----------------------------------
    {
      num: "01",
      label: "Notre ancrage",
      id: "ancrage",
      h2: "Bordelais, et ça se voit dans chaque devis.",
      body: [
        // TODO PO : remplacer par la vraie localisation et les vrais partenaires associatifs.
        "Notre atelier de tri est en Gironde. Notre camion stationne en métropole. Nos partenaires associatifs — Emmaüs Gironde, Le Relais 33, ressourceries girondines — sont à moins de quinze minutes. Cette proximité n’est pas un argument marketing : c’est ce qui rend possible un devis ferme sous deux heures et une intervention sous quarante-huit.",
        "Quand un héritier nous appelle depuis Lyon ou Paris, nous mesurons en direct le trajet de chaque carton : le bureau du défunt à la chaîne de tri, du tri au don, du don au justificatif renvoyé au notaire. Rien n’est sous-traité, rien ne disparaît.",
      ],
      puces: [
        "Atelier de tri local, jamais de transit longue distance",
        "Réseau associatif girondin tissé sur deux ans",
        "Aucun frais kilométrique sur la Métropole",
      ],
    },
  ],

  // -------- 02 CHARTE (PULL-QUOTE) --------
  pullQuote: {
    num: "02",
    label: "Notre charte",
    id: "charte",
    citation: "Rien de ce qui peut servir ne part en déchèterie.",
    attribution: "La charte 0 gaspillage · Article 1",
    body:
      "Une promesse écrite, signée, et vérifiable. Chaque intervention se termine par un bordereau qui indique, en kilogrammes, ce qui a été donné, recyclé, et — seulement en dernier recours — éliminé. Nos clients le reçoivent dans les 48 heures qui suivent la restitution des clés.",
  },

  // -------- 03 FONDATEUR --------
  founder: {
    num: "03",
    label: "Le fondateur",
    id: "fondateur",
    // TODO PO : valider la bio du fondateur.
    h2: "Une carrière en logistique, un constat sur le terrain.",
    body: [
      "Avant L’Espace Libre, le fondateur a piloté des opérations de déménagement industriel sur le grand Sud-Ouest : entrepôts entiers, inventaires à six chiffres, chaînes de tri pour grandes enseignes. Le métier connu dans sa version « gros volume, gros budget ».",
      "En accompagnant deux proches dans des successions difficiles, le même schéma revient : un débarrasseur trop pressé, un transporteur sans inventaire, et au bout du compte des objets de valeur perdus, des héritiers en colère, et zéro justificatif pour le notaire. L’écart entre les standards de la logistique professionnelle et la prestation offerte aux particuliers saute aux yeux.",
      "L’Espace Libre est née de cet écart. L’idée : appliquer à un débarras de 65 m² la même rigueur de traçabilité qu’à un déménagement d’entrepôt de 5 000 m². Et facturer un prix juste, parce que la rigueur ne coûte rien quand elle est dans les processus.",
    ],
    name: "Nicolas Martin",
    role: "Fondateur",
    initials: "NM",
    avatarVariant: "navy",
  },

  // -------- 04 ÉQUIPE --------
  teamLabel: {
    num: "04",
    label: "L’équipe",
    id: "equipe",
    h2: "Quatre profils, une équipe assurée et identifiée.",
    intro:
      "Chaque intervention est menée par une équipe en uniforme L’Espace Libre. Vous savez qui vient chez vous.",
  },
  team: [
    // TODO PO : remplacer par les vrais membres et leurs vrais rôles.
    {
      initials: "NM",
      name: "Nicolas Martin",
      role: "Fondateur · Chef d’équipe",
      citation:"Mon rôle : assurer que chaque dossier soit traité comme une succession personnelle.",
      variant: "navy",
    },
    {
      initials: "AT",
      name: "À nommer",
      role: "Logisticienne · Coordination",
      citation:"Devis sous 2 heures, ce n’est pas une promesse marketing — c’est un planning.",
      variant: "emerald",
    },
    {
      initials: "RB",
      name: "À nommer",
      role: "Manutentionnaire senior",
      citation:"Le port de charge, le tri sur place, la protection des sols : la routine technique.",
      variant: "pearl",
    },
    {
      initials: "SD",
      name: "À nommer",
      role: "Spécialiste décontamination",
      citation:"Diogène, insalubrité, fluides corporels : nous avons les EPI et le protocole.",
      variant: "alt",
    },
  ],

  // -------- 05 CREDENTIALS --------
  credentialsLabel: {
    num: "05",
    label: "Engagements légaux",
    id: "credentials",
    h2: "Ce que vous pouvez vérifier avant de signer.",
  },
  credentials: [
    // TODO PO : remplir avec les données réelles SIRET / assureur / etc.
    { key: "SIRET", value: "À renseigner avant publication" },
    { key: "Forme juridique", value: "Auto-entrepreneur" },
    { key: "Assurance RC Pro", value: "Attestation jointe à chaque devis" },
    { key: "Filières déchets", value: "DEEE agréées 33 · partenariats Emmaüs, Le Relais" },
    { key: "Loi AGEC", value: "Bordereaux de tri remis sous 48 h" },
    { key: "Médiation", value: "Conformément à l’article L 612-1 du Code de la consommation" },
  ],

  // -------- 07 CLOSING --------
  closing: {
    eyebrow: "Et maintenant",
    h2: "Une corvée vous attend. Délégons-la.",
    body:
      "Quelques photos, deux heures, et vous avez un devis ferme avec attestation d’assurance jointe. Aucun acompte. Aucun engagement.",
    ctaPrimary: { label: "Demander une estimation", href: "/contact" },
    ctaSecondary: { label: "Nous écrire", href: "/contact" },
  },
};
