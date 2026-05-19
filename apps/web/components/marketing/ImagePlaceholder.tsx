/**
 * ImagePlaceholder — slot d'image élégant.
 *
 * Tant que `src` n'est pas fourni, affiche un placeholder graphique
 * (dégradé navy/emerald + quadrillage subtil + icône + label) qui
 * indique clairement ce qui doit y aller.
 *
 * Dès qu'une vraie photo est fournie via `src`, on rend directement
 * un `<Image>` Next.js optimisé (AVIF/WebP, lazy, dimensions
 * appropriées). Aucune modification de code n'est nécessaire — il
 * suffit de passer le `src` ou de modifier le fichier de données qui
 * appelle ce composant.
 *
 * Specs des images à fournir :
 *  - Format : AVIF/WebP/JPG paysage ou portrait selon aspectRatio
 *  - Compression : < 250 Ko après optimisation
 *  - Style : daylight, photographies cool white-balance (cf. README §
 *    « Imagery direction »).
 */
import Image from "next/image";
import { Icon, type IconName } from "@/components/ui/Icon";

export interface ImagePlaceholderProps {
  /** Si fourni, affiche l'image réelle. Sinon, affiche le placeholder. */
  src?: string;
  /** Texte alternatif obligatoire (utilisé dans les deux cas). */
  alt: string;
  /** Label visible sur le placeholder (ex: « Photo : équipe en uniforme »). */
  label: string;
  /** Icône Lucide pour le placeholder. */
  icon?: IconName;
  /** Variante visuelle. */
  tone?: "light" | "dark";
  /** Texte secondaire optionnel (ex: « 1200×800 »). */
  hint?: string;
  /** Priorité de chargement Next.js (utile pour le LCP). */
  priority?: boolean;
  /** Sizes attribute pour next/image. */
  sizes?: string;
}

export function ImagePlaceholder({
  src,
  alt,
  label,
  icon = "camera",
  tone = "light",
  hint,
  priority = false,
  sizes,
}: ImagePlaceholderProps) {
  if (src) {
    return (
      <div className="img-real">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? "(max-width: 880px) 100vw, 600px"}
        />
      </div>
    );
  }

  return (
    <div
      className={`img-ph ${tone === "dark" ? "img-ph--dark" : ""}`}
      role="img"
      aria-label={alt}
    >
      <div className="img-ph__inner">
        <span className="img-ph__icon">
          <Icon name={icon} />
        </span>
        <span className="img-ph__label">{label}</span>
        {hint && <span className="img-ph__hint">{hint}</span>}
      </div>
    </div>
  );
}
