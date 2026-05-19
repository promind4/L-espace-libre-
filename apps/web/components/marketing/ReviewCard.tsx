/**
 * ReviewCard — carte individuelle d'un avis client.
 *
 * Server Component. Affiche le nom, la note (étoiles), le texte,
 * la date et le service concerné. Design strictement aligné sur
 * les tokens du design system (tokens.css).
 */
import type { Review } from "@/content/reviews";
import styles from "./ReviewCard.module.css";

export interface ReviewCardProps {
  review: Review;
}

/**
 * Génère un tableau de 5 étoiles (pleines, moitiés, vides)
 * à partir d'une note sur 5.
 */
function StarRating({ rating }: { rating: number }) {
  const stars: ("full" | "half" | "empty")[] = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push("full");
    else if (rating >= i - 0.5) stars.push("half");
    else stars.push("empty");
  }

  return (
    <span className={styles.stars} aria-label={`Note : ${rating} sur 5`}>
      {stars.map((type, i) => (
        <svg
          key={i}
          className={`${styles.star} ${styles[`star--${type}`]}`}
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          {type === "full" && (
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="currentColor"
            />
          )}
          {type === "half" && (
            <>
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="currentColor"
                opacity={0.25}
              />
              <path
                d="M12 2v15.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="currentColor"
              />
            </>
          )}
          {type === "empty" && (
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="currentColor"
              opacity={0.2}
            />
          )}
        </svg>
      ))}
    </span>
  );
}

export function ReviewCard({ review }: ReviewCardProps) {
  const dateObj = new Date(review.date);
  const dateFormatted = dateObj.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
  });

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        {/* Initiale avatar */}
        <span className={styles.avatar} aria-hidden>
          {review.nomClient.charAt(0).toUpperCase()}
        </span>
        <div>
          <p className={styles.name}>{review.nomClient}</p>
          <p className={styles.meta}>
            {dateFormatted}
            {review.commune && ` · ${review.commune}`}
          </p>
        </div>
      </header>

      <StarRating rating={review.noteSur5} />

      <p className={styles.text}>{review.texteAvis}</p>
    </article>
  );
}
