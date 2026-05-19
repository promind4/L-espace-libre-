/**
 * StatsBand — Sprint R2 (redesign v2).
 *
 * Ancien `SocialProofBand` renommé pour refléter la nature des
 * indicateurs (engagements vérifiables, pas social proof).
 *
 * Tier Paper (grille SVG inline) avec 4 chiffres-clés en font-size 40
 * et séparateurs verticaux pearl-200. Aucun chiffre inventé — tous
 * les indicateurs sont des engagements ou faits administratifs
 * vérifiables.
 *
 * Voir `redesign-v2/plan.md` §3.1 pour la rationalité.
 */
import { Icon } from "@/components/ui/Icon";
import { Tier } from "@/components/ui/Tier";

export function StatsBand() {
  return (
    <Tier
      variant="paper"
      as="section"
      rhythmIndex={2}
      ariaLabel="Nos engagements concrets"
    >
      <div className="container">
        <div className="stats-band">
          {/* 1 — Délai de devis */}
          <div className="stats-band__item">
            <span className="stats-band__num">
              2<small>h</small>
            </span>
            <span className="stats-band__label">
              <strong>Devis ferme</strong> par photo, sans engagement.
            </span>
          </div>

          {/* 2 — Couverture territoriale */}
          <div className="stats-band__item">
            <span className="stats-band__num">534</span>
            <span className="stats-band__label">
              <strong>Communes</strong> de Gironde couvertes.
              <span className="stats-band__label-sub">
                Landes &amp; Lot-et-Garonne sur demande.
              </span>
            </span>
          </div>

          {/* 3 — Assurance professionnelle */}
          <div className="stats-band__item">
            <span className="stats-band__num stats-band__num--icon">
              <Icon name="shield-check" size={32} />
              RC&nbsp;Pro
            </span>
            <span className="stats-band__label">
              <strong>Assurance professionnelle</strong> incluse, attestation jointe au devis.
            </span>
          </div>

          {/* 4 — Aucun acompte */}
          <div className="stats-band__item">
            <span className="stats-band__num">
              0<small>&nbsp;€</small>
            </span>
            <span className="stats-band__label">
              <strong>Aucun acompte</strong> exigé à la signature.
            </span>
          </div>
        </div>
      </div>
    </Tier>
  );
}
