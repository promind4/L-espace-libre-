/**
 * BrandWordmark — port fidèle du composant prototype.
 * Le « L » avec son burst (étoile abstraite) figure l'identité graphique
 * de L'Espace Libre. Rendu en HTML/CSS natif pour que le positionnement
 * du burst reste correct quelles que soient les métriques de la police.
 */

export interface BrandWordmarkProps {
  variant?: "dark" | "light";
  size?: number;
}

export function BrandWordmark({
  variant = "dark",
  size = 26,
}: BrandWordmarkProps) {
  const navy = variant === "light" ? "#FFFFFF" : "#1D3E61";
  const accent = variant === "light" ? "#15A985" : "#0E8F70";
  const dotColor = variant === "light" ? "#FFFFFF" : "#1D3E61";
  return (
    <span className="brand-wordmark" style={{ fontSize: size, color: navy }}>
      <span className="brand-wordmark__text">L&rsquo;ESPACE&nbsp;L</span>
      <span className="brand-wordmark__i">
        <span className="brand-wordmark__burst" aria-hidden="true">
          <svg viewBox="-30 -30 60 60" width="100%" height="100%">
            <g
              stroke={accent}
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
          </svg>
        </span>
        <span
          className="brand-wordmark__dot"
          style={{ background: dotColor }}
        />
        <span
          className="brand-wordmark__bar"
          style={{ background: navy }}
        />
      </span>
      <span className="brand-wordmark__text">BRE</span>
    </span>
  );
}
