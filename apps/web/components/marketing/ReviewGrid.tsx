/**
 * ReviewGrid — grille responsive des avis clients.
 *
 * Server Component. Affiche les ReviewCard dans une grille CSS auto-fit
 * (1 colonne mobile → 2 tablette → 3 desktop). Gère l'état vide
 * avec un message placeholder discret.
 */
import type { Review } from "@/content/reviews";
import { ReviewCard } from "./ReviewCard";
import styles from "./ReviewGrid.module.css";

export interface ReviewGridProps {
  reviews: readonly Review[];
}

export function ReviewGrid({ reviews }: ReviewGridProps) {
  if (reviews.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>
          Les avis clients seront disponibles prochainement.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
