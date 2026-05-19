/**
 * HomeReviews — bandeau avis Google sombre (navy 950).
 *
 * Trois témoignages clients en cartes vitrées (backdrop-filter), avec
 * note Google chiffrée à droite du titre. Section sombre pour casser
 * le rythme des sections claires et donner du contraste visuel.
 *
 * Les témoignages sont des **placeholders v1** à valider/remplacer
 * par le PO avant publication. La structure des données est prête
 * à recevoir un flux d'avis Google Places ou un export Trustpilot
 * en v2 sans toucher au composant.
 */
import { Icon } from "@/components/ui/Icon";

interface Review {
  author: string;
  context: string;
  citation: string;
  rating: number;
  /** Couleur d'avatar (initiale colorée). */
  avatarColor: string;
}

const REVIEWS: Review[] = [
  {
    author: "Mme R.",
    context: "Bordeaux Chartrons · Succession",
    citation:
      "Une équipe ponctuelle, discrète et respectueuse. Tout a été vidé et trié en une journée. Le récapitulatif des dons a beaucoup compté pour nous.",
    rating: 5,
    avatarColor: "var(--cr-emerald-300)",
  },
  {
    author: "Étude notariale",
    context: "Pessac · Succession",
    citation:
      "Coordination irréprochable avec l'étude. Restitution des clés dans les délais, dossier d'intervention complet annexé au dossier de succession.",
    rating: 5,
    avatarColor: "#B5D4F2",
  },
  {
    author: "M. H.",
    context: "Mérignac · Bureaux professionnels",
    citation:
      "Réactivité exemplaire avant ma mise à neuf. Local rendu impeccable au bailleur, certificat DEEE en main propre.",
    rating: 5,
    avatarColor: "#F2D8B5",
  },
];

const GOOGLE_SCORE = "4,8";
const GOOGLE_REVIEWS_COUNT = 142;

function Stars({ count }: { count: number }) {
  return (
    <span
      className="review-card__stars"
      aria-label={`Note : ${count} étoiles sur 5`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Icon key={i} name="star" />
      ))}
    </span>
  );
}

export function HomeReviews() {
  return (
    <section
      className="reviews-home"
      aria-labelledby="reviews-home-title"
    >
      <div className="container reviews-home__inner">
        <header className="reviews-home__head">
          <div>
            <span
              className="section__eyebrow"
              style={{ color: "var(--cr-emerald-300)" }}
            >
              Avis vérifiés
            </span>
            <h2 id="reviews-home-title" className="reviews-home__title">
              Ils nous ont confié <em>leur espace.</em>
            </h2>
          </div>
          <div className="reviews-home__score">
            <span className="reviews-home__score-num">
              {GOOGLE_SCORE}
              <small>/ 5</small>
            </span>
            <Stars count={5} />
            <span className="reviews-home__score-label">
              Note Google · {GOOGLE_REVIEWS_COUNT} avis
            </span>
          </div>
        </header>

        <div className="reviews-home__grid">
          {REVIEWS.map((r) => {
            const initials = r.author
              .replace(/[^A-ZÀ-Ý]/gi, " ")
              .trim()
              .split(/\s+/)
              .map((s) => s[0] ?? "")
              .slice(0, 2)
              .join("")
              .toUpperCase();
            return (
              <article key={r.author} className="review-card">
                <Stars count={r.rating} />
                <p className="review-card__quote">«&nbsp;{r.citation}&nbsp;»</p>
                <footer className="review-card__footer">
                  <span
                    className="review-card__avatar"
                    style={{ background: r.avatarColor }}
                    aria-hidden
                  >
                    {initials}
                  </span>
                  <span className="review-card__meta">
                    <span className="review-card__author">{r.author}</span>
                    <span className="review-card__context">{r.context}</span>
                  </span>
                </footer>
              </article>
            );
          })}
        </div>

        <div className="reviews-home__footer">
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lire les {GOOGLE_REVIEWS_COUNT} avis sur Google
            <Icon name="arrow-right" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
