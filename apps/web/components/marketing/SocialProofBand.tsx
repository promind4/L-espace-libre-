/**
 * SocialProofBand — bandeau de réassurance sous le Hero.
 *
 * IMPORTANT — Conformité commerciale (DGCCRF) :
 * Aucun indicateur de social proof inventé. L'entreprise est en phase
 * de lancement. Les chiffres affichés ici sont uniquement des
 * **engagements et faits vérifiables**, pas des statistiques d'usage.
 *
 * Indicateurs :
 *  1. Délai de devis (promesse de marque)
 *  2. Couverture géographique : 534 communes de Gironde (fait INSEE)
 *  3. Assurance RC Pro incluse (fait administratif)
 *  4. Aucun acompte exigé (engagement commercial)
 *
 * Quand vous aurez accumulé un volume d'interventions et d'avis
 * authentiques (Google, Trustpilot), nous pourrons les remettre.
 */
import { Icon } from "@/components/ui/Icon";

export function SocialProofBand() {
  return (
    <section className="social-proof" aria-label="Nos engagements concrets">
      <div className="container">
        <div className="social-proof__grid">
          <div className="social-proof__item">
            <span className="social-proof__num social-proof__num--emerald">
              2h
            </span>
            <span className="social-proof__label">
              <strong>Devis ferme</strong> par photo, sans engagement
            </span>
          </div>

          <div className="social-proof__item">
            <span className="social-proof__num">534</span>
            <span className="social-proof__label">
              <strong>Communes</strong> de Gironde couvertes
              <br />
              <span style={{ color: "var(--cr-pearl-500)", fontSize: 12 }}>
                Toute la Gironde · Landes · Lot-et-Garonne
              </span>
            </span>
          </div>

          <div className="social-proof__item">
            <span className="social-proof__num" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              <Icon name="shield-check" size={28} />
              <span style={{ fontSize: 20 }}>RC&nbsp;Pro</span>
            </span>
            <span className="social-proof__label">
              <strong>Assurance professionnelle</strong> incluse, attestation
              jointe au devis
            </span>
          </div>

          <div className="social-proof__item">
            <span className="social-proof__num">
              0&nbsp;€
            </span>
            <span className="social-proof__label">
              <strong>Aucun acompte</strong> exigé à la signature
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
