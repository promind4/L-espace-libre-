/**
 * Paires Avant/Après — preuve sociale.
 *
 * 1ère paire = images RÉELLES fournies par le PO (garage girondin).
 * Paires 2-5 = placeholders haute qualité jusqu'à fourniture de clichés
 * réels. Marqués `placeholder: true` pour affichage discret de la
 * mention « Photo d'illustration ».
 *
 * Optimisation cible : AVIF + WebP < 200 Ko (S5.2.3). V1 livre du JPEG
 * compressé en attendant le pipeline d'optimisation.
 */

export interface BeforeAfterPair {
  id: string;
  /** Type de bien intervenu. */
  type: string;
  /** Commune où l'intervention a eu lieu. */
  commune: string;
  /** Durée d'intervention typique pour l'illustration. */
  duree: string;
  before: {
    src: string;
    alt: string;
  };
  after: {
    src: string;
    alt: string;
  };
  /** Si vrai, on affiche la mention « Photo d'illustration ». */
  placeholder: boolean;
}

export const BEFORE_AFTER_PAIRS: readonly BeforeAfterPair[] = [
  {
    id: "garage-merignac",
    type: "Garage",
    commune: "Mérignac",
    duree: "4 h d'intervention",
    before: {
      src: "/images/before-after/garage-avant.jpg",
      alt: "Garage encombré avant débarras : sacs, outils, étagères en désordre",
    },
    after: {
      src: "/images/before-after/garage-apres.jpg",
      alt: "Garage entièrement vidé après débarras, sol propre, espace libéré",
    },
    placeholder: false,
  },
  // ============================================================
  //  Paires 2-5 : placeholders v1.
  //  Les `src` réutilisent temporairement les images du garage réel
  //  pour que la pile soit visuellement fonctionnelle dès le bootstrap.
  //  À mesure que le PO fournit des clichés réels, mettre à jour les
  //  `src` ET passer `placeholder` à `false`. Aucun changement de code
  //  n'est nécessaire — seul ce fichier de données évolue.
  // ============================================================
  {
    id: "cuisine-bordeaux",
    type: "Cuisine de succession",
    commune: "Bordeaux Chartrons",
    duree: "1 journée",
    before: {
      src: "/images/before-after/garage-avant.jpg",
      alt: "Photo d'illustration — cuisine à débarrasser dans une succession",
    },
    after: {
      src: "/images/before-after/garage-apres.jpg",
      alt: "Photo d'illustration — cuisine vidée et nettoyée",
    },
    placeholder: true,
  },
  {
    id: "bureau-pessac",
    type: "Bureau professionnel",
    commune: "Pessac",
    duree: "2 jours",
    before: {
      src: "/images/before-after/garage-avant.jpg",
      alt: "Photo d'illustration — bureau encombré en fin de bail",
    },
    after: {
      src: "/images/before-after/garage-apres.jpg",
      alt: "Photo d'illustration — bureau remis en état",
    },
    placeholder: true,
  },
  {
    id: "cave-talence",
    type: "Cave",
    commune: "Talence",
    duree: "3 h",
    before: {
      src: "/images/before-after/garage-avant.jpg",
      alt: "Photo d'illustration — cave d'immeuble encombrée",
    },
    after: {
      src: "/images/before-after/garage-apres.jpg",
      alt: "Photo d'illustration — cave vidée et balayée",
    },
    placeholder: true,
  },
  {
    id: "grenier-le-bouscat",
    type: "Grenier",
    commune: "Le Bouscat",
    duree: "1 journée",
    before: {
      src: "/images/before-after/garage-avant.jpg",
      alt: "Photo d'illustration — grenier familial après succession",
    },
    after: {
      src: "/images/before-after/garage-apres.jpg",
      alt: "Photo d'illustration — grenier libéré",
    },
    placeholder: true,
  },
] as const;
