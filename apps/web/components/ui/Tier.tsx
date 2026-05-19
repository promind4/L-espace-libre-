/**
 * <Tier> — wrapper de section pour le système de rythme en bandeaux
 * (Concept A).
 *
 * Pose la classe utilitaire correspondante (`tier tier-${variant}`)
 * et expose un `data-tier` + `data-rhythm-index` pour permettre à un
 * futur linter de vérifier l'alternance (« pas plus de 2 tiers
 * identiques consécutifs »).
 *
 * Server Component pur — aucun state, aucun effet, aucun JS runtime.
 */

import type { ElementType, ReactNode, CSSProperties } from "react";

export type TierName = "light" | "paper" | "deep" | "editorial";

export interface TierProps {
  variant: TierName;
  /** Balise rendue. Par défaut `section`. */
  as?: "section" | "header" | "footer" | "aside" | "div";
  /** Index dans la séquence rythmique (audit visuel). */
  rhythmIndex?: number;
  /** ID pour ancre. */
  id?: string;
  className?: string;
  style?: CSSProperties;
  /** Attribut ARIA pour titrer la section. */
  ariaLabelledby?: string;
  ariaLabel?: string;
  children: ReactNode;
}

export function Tier({
  variant,
  as = "section",
  rhythmIndex,
  id,
  className,
  style,
  ariaLabelledby,
  ariaLabel,
  children,
}: TierProps) {
  const Tag = as as ElementType;
  const cls = ["tier", `tier-${variant}`, className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      id={id}
      className={cls}
      style={style}
      data-tier={variant}
      data-rhythm-index={rhythmIndex}
      aria-labelledby={ariaLabelledby}
      aria-label={ariaLabel}
    >
      {children}
    </Tag>
  );
}
