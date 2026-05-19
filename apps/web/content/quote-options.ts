/**
 * Options affichables du formulaire de demande de devis (/contact).
 *
 * Données séparées du composant pour faciliter les itérations UX/copy
 * sans toucher au TSX. Les `id` correspondent **exactement** aux
 * valeurs attendues par `lib/pricing.ts` et `lib/validation.ts` —
 * source unique de vérité côté backend.
 *
 * NB : Pas de fichier traduit i18n pour l'instant (FR-FR uniquement).
 * Les hints sont calmes et factuels — voix de marque P1.2.
 */

import type { BienType, FloorAccess, SalubrityLevel } from "@/lib/pricing";

// ============================================================
//  Type de bien
// ============================================================

export interface BienOption {
  id: BienType;
  label: string;
  hint?: string;
}

export const BIEN_OPTIONS: readonly BienOption[] = [
  { id: "maison", label: "Maison" },
  { id: "appartement", label: "Appartement" },
  { id: "cave", label: "Cave / Garage" },
  { id: "bureau", label: "Bureau / Local pro" },
];

// ============================================================
//  Salubrité (4 niveaux unifiés — Constitution P2.1)
//  Affichage minimaliste : labels bruts sans hint.
// ============================================================

export interface SalubriteOption {
  id: SalubrityLevel;
  label: string;
}

export const SALUBRITE_OPTIONS: readonly SalubriteOption[] = [
  { id: "normal", label: "Normal" },
  { id: "poussiereux", label: "Poussiéreux" },
  { id: "insalubre", label: "Insalubre" },
  { id: "diogene", label: "Diogène" },
];

// ============================================================
//  Accessibilité (4 niveaux — alignés sur FloorAccess de pricing.ts)
//  Affichage minimaliste : labels bruts sans hint.
// ============================================================

export interface AccessibiliteOption {
  id: FloorAccess;
  label: string;
}

export const ACCESSIBILITE_OPTIONS: readonly AccessibiliteOption[] = [
  { id: "rdc", label: "Rez-de-chaussée" },
  { id: "etage-asc", label: "Étage avec ascenseur" },
  { id: "etage-sans-asc", label: "1er ou 2e sans ascenseur" },
  { id: "haut-sans-asc", label: "3e ou + sans ascenseur" },
];

// ============================================================
//  Annexes (dépendances multi-sélection)
// ============================================================

export type AnnexeId = "garage" | "cave" | "sous-sol" | "dependance";

export interface AnnexeOption {
  id: AnnexeId;
  label: string;
}

export const ANNEXES_OPTIONS: readonly AnnexeOption[] = [
  { id: "garage", label: "Garage" },
  { id: "cave", label: "Cave" },
  { id: "sous-sol", label: "Sous-sol" },
  { id: "dependance", label: "Dépendance" },
];
