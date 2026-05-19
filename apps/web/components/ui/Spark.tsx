/**
 * <Spark> — glyphe de signature de marque (Concept B).
 *
 * Étoile à 5 rais + bulbe, extraite du logo BrandWordmark.
 * Hérite la couleur du parent via `currentColor` — toujours émeraude
 * (cf. `colors_and_type.css` : --cr-emerald-600 / 300).
 *
 * 5 tailles canoniques uniquement (12, 14, 16, 22, 24). Toute autre
 * taille trahit une utilisation hors cadre.
 *
 * Décoratif par défaut (`aria-hidden`). Aucune animation native —
 * l'animation de hover est gérée côté CSS par le parent (cf. classe
 * `.link__spark` de tiers.css).
 */

export interface SparkProps {
  /**
   * Taille canonique en pixels. Liste fermée :
   *  - 12 : inline body
   *  - 14 : eyebrow, sidenav active, bullets
   *  - 16 : bullets de liste, hover de lien
   *  - 18 : séparateur (pullquote, dans tier Editorial)
   *  - 22 / 24 : end-mark (fin d'article, fermeture)
   */
  size?: 12 | 14 | 16 | 18 | 22 | 24;
  /** "light" = couleur emerald-300 (lisible sur tier Deep). */
  variant?: "default" | "light";
  className?: string;
  style?: React.CSSProperties;
}

export function Spark({
  size = 14,
  variant = "default",
  className,
  style,
}: SparkProps) {
  const cls = [
    "spark",
    variant === "light" ? "spark--light" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={cls} style={style} aria-hidden>
      <svg
        width={size}
        height={size}
        viewBox="-30 -30 60 60"
        focusable="false"
      >
        <g
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        >
          <line x1="0" y1="-2" x2="0" y2="-22" />
          <line x1="-14" y1="2" x2="-22" y2="-14" />
          <line x1="14" y1="2" x2="22" y2="-14" />
          <line x1="-22" y1="14" x2="-30" y2="6" />
          <line x1="22" y1="14" x2="30" y2="6" />
        </g>
        <circle cx="0" cy="6" r="3.5" fill="currentColor" />
      </svg>
    </span>
  );
}
