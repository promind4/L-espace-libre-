/**
 * Données des 25 communes desservies en SEO local.
 * 15 Gironde (33) + 5 Landes (40) + 5 Lot-et-Garonne (47).
 *
 * Toute évolution éditoriale passe par ce fichier — il alimente :
 *   - app/zones/[commune]/page.tsx (SSG)
 *   - app/sitemap.ts
 *   - components/marketing/Zones.tsx (chips en page d'accueil)
 *   - JSON-LD LocalBusiness
 */

export type Departement = "33" | "40" | "47";

export interface Zone {
  slug: string;
  nom: string;
  codePostal: string;
  departement: Departement;
  departementNom: string;
  region: "Nouvelle-Aquitaine";
  quartiers?: string[];
  /** Distance approximative depuis Bordeaux Centre en km. */
  distanceKmDepuisBordeaux: number;
  /** Communes limitrophes — alimente le maillage interne. Slugs uniquement. */
  limitrophes: string[];
  /** Métadonnée SEO : description courte (~155 caractères). */
  metaDescription: string;
  /** Témoignage textuel ancré localement. */
  temoignage: {
    auteur: string;
    contexte: string;
    citation: string;
  };
}

export const ZONES: readonly Zone[] = [
  // ===== Gironde (33) — Bordeaux Métropole =====
  {
    slug: "bordeaux",
    nom: "Bordeaux",
    codePostal: "33000",
    departement: "33",
    departementNom: "Gironde",
    region: "Nouvelle-Aquitaine",
    quartiers: ["Chartrons", "Bastide", "Saint-Michel", "Caudéran", "Bacalan"],
    distanceKmDepuisBordeaux: 0,
    limitrophes: ["merignac", "pessac", "talence", "begles", "le-bouscat"],
    metaDescription:
      "Débarras à Bordeaux : devis gratuit sous 2h, intervention rapide, tri responsable. Couverture tous quartiers, des Chartrons à Caudéran.",
    temoignage: {
      auteur: "Mme R., Bordeaux Chartrons",
      contexte: "Succession appartement haussmannien",
      citation:
        "Une équipe ponctuelle, discrète et respectueuse. Tout a été vidé et trié en une journée.",
    },
  },
  {
    slug: "merignac",
    nom: "Mérignac",
    codePostal: "33700",
    departement: "33",
    departementNom: "Gironde",
    region: "Nouvelle-Aquitaine",
    quartiers: ["Arlac", "Capeyron", "Beaudésert"],
    distanceKmDepuisBordeaux: 7,
    limitrophes: ["bordeaux", "pessac", "le-bouscat", "eysines", "bruges"],
    metaDescription:
      "Débarras à Mérignac : maison, appartement, bureaux. Devis sous 2h, tri responsable. Acteur local Bordeaux Métropole.",
    temoignage: {
      auteur: "M. D., Mérignac Arlac",
      contexte: "Vide-maison avant mise en vente",
      citation:
        "Travail soigné, devis tenu au centime près. Nous recommandons sans réserve.",
    },
  },
  {
    slug: "pessac",
    nom: "Pessac",
    codePostal: "33600",
    departement: "33",
    departementNom: "Gironde",
    region: "Nouvelle-Aquitaine",
    quartiers: ["Saige", "Le Bourg", "Cap de Bos"],
    distanceKmDepuisBordeaux: 8,
    limitrophes: ["bordeaux", "merignac", "talence", "gradignan"],
    metaDescription:
      "Débarras à Pessac : intervention rapide, charte 0 gaspillage. Maisons, appartements, bureaux. Devis gratuit sous 2h.",
    temoignage: {
      auteur: "Étude notariale, Pessac",
      contexte: "Succession instruction notariale",
      citation:
        "Coordination irréprochable avec l'étude. Restitution des clés dans les délais.",
    },
  },
  {
    slug: "talence",
    nom: "Talence",
    codePostal: "33400",
    departement: "33",
    departementNom: "Gironde",
    region: "Nouvelle-Aquitaine",
    quartiers: ["Médoquine", "Thouars"],
    distanceKmDepuisBordeaux: 5,
    limitrophes: ["bordeaux", "pessac", "begles", "gradignan"],
    metaDescription:
      "Débarras à Talence : étudiants, particuliers, héritiers. Tri responsable et tarifs transparents. Devis sous 2h.",
    temoignage: {
      auteur: "Mme L., Talence Thouars",
      contexte: "Désencombrement avant déménagement",
      citation:
        "Beaucoup d'écoute, aucun jugement. Le résultat dépasse mes attentes.",
    },
  },
  {
    slug: "begles",
    nom: "Bègles",
    codePostal: "33130",
    departement: "33",
    departementNom: "Gironde",
    region: "Nouvelle-Aquitaine",
    distanceKmDepuisBordeaux: 4,
    limitrophes: ["bordeaux", "talence", "villenave-d-ornon", "floirac"],
    metaDescription:
      "Débarras à Bègles : maison, garage, cave. Intervention sous 7 jours, devis ferme par photo. Acteur local.",
    temoignage: {
      auteur: "M. K., Bègles centre",
      contexte: "Débarras garage et cave",
      citation:
        "Rapide, propre, et respectueux du voisinage. Aucune trace après leur passage.",
    },
  },
  {
    slug: "le-bouscat",
    nom: "Le Bouscat",
    codePostal: "33110",
    departement: "33",
    departementNom: "Gironde",
    region: "Nouvelle-Aquitaine",
    distanceKmDepuisBordeaux: 4,
    limitrophes: ["bordeaux", "bruges", "merignac", "eysines"],
    metaDescription:
      "Débarras au Bouscat : appartements, maisons familiales, successions. Devis sous 2h, assurance RC Pro incluse.",
    temoignage: {
      auteur: "Famille B., Le Bouscat",
      contexte: "Succession parentale",
      citation:
        "Un accompagnement humain dans un moment difficile. Merci à toute l'équipe.",
    },
  },
  {
    slug: "villenave-d-ornon",
    nom: "Villenave-d'Ornon",
    codePostal: "33140",
    departement: "33",
    departementNom: "Gironde",
    region: "Nouvelle-Aquitaine",
    distanceKmDepuisBordeaux: 8,
    limitrophes: ["begles", "talence", "gradignan", "floirac"],
    metaDescription:
      "Débarras à Villenave-d'Ornon : maisons individuelles, dépendances. Charte 0 gaspillage. Devis gratuit sous 2h.",
    temoignage: {
      auteur: "M. T., Villenave-d'Ornon",
      contexte: "Débarras maison familiale",
      citation:
        "Devis ferme respecté, équipe sérieuse. Le tri éco-responsable était un vrai plus pour nous.",
    },
  },
  {
    slug: "gradignan",
    nom: "Gradignan",
    codePostal: "33170",
    departement: "33",
    departementNom: "Gironde",
    region: "Nouvelle-Aquitaine",
    distanceKmDepuisBordeaux: 10,
    limitrophes: ["pessac", "talence", "villenave-d-ornon"],
    metaDescription:
      "Débarras à Gradignan : pavillons, locaux pro, garages. Intervention rapide, tarif au volume transparent.",
    temoignage: {
      auteur: "Mme P., Gradignan",
      contexte: "Désencombrement après veuvage",
      citation:
        "Beaucoup de tact et un travail méticuleux. Je les recommande à mes voisins.",
    },
  },
  {
    slug: "floirac",
    nom: "Floirac",
    codePostal: "33270",
    departement: "33",
    departementNom: "Gironde",
    region: "Nouvelle-Aquitaine",
    distanceKmDepuisBordeaux: 6,
    limitrophes: ["bordeaux", "cenon", "begles", "villenave-d-ornon"],
    metaDescription:
      "Débarras à Floirac : appartements, maisons, caves. Tri sélectif rigoureux et restitution propre.",
    temoignage: {
      auteur: "Bailleur social, Floirac",
      contexte: "Remise en état logement",
      citation: "Délais tenus, partenaire fiable pour nos rotations.",
    },
  },
  {
    slug: "cenon",
    nom: "Cenon",
    codePostal: "33150",
    departement: "33",
    departementNom: "Gironde",
    region: "Nouvelle-Aquitaine",
    distanceKmDepuisBordeaux: 5,
    limitrophes: ["bordeaux", "lormont", "floirac"],
    metaDescription:
      "Débarras à Cenon : interventions discrètes, équipe formée aux situations sensibles. Devis sous 2h.",
    temoignage: {
      auteur: "Mme G., Cenon Palmer",
      contexte: "Débarras appartement T3",
      citation: "Tout a été vidé en une matinée. Service impeccable.",
    },
  },
  {
    slug: "bruges",
    nom: "Bruges",
    codePostal: "33520",
    departement: "33",
    departementNom: "Gironde",
    region: "Nouvelle-Aquitaine",
    distanceKmDepuisBordeaux: 5,
    limitrophes: ["bordeaux", "le-bouscat", "merignac", "eysines"],
    metaDescription:
      "Débarras à Bruges : maisons, locaux pro, dépendances. Acteur local Bordeaux Métropole, devis gratuit sous 2h.",
    temoignage: {
      auteur: "M. H., Bruges",
      contexte: "Vidage bureau professionnel",
      citation:
        "Réactivité exemplaire avant ma mise à neuf. Local rendu impeccable au bailleur.",
    },
  },
  {
    slug: "lormont",
    nom: "Lormont",
    codePostal: "33310",
    departement: "33",
    departementNom: "Gironde",
    region: "Nouvelle-Aquitaine",
    distanceKmDepuisBordeaux: 7,
    limitrophes: ["cenon", "bordeaux", "ambares-et-lagrave"],
    metaDescription:
      "Débarras à Lormont : appartements, maisons, garages. Intervention sous 7 jours, tri responsable.",
    temoignage: {
      auteur: "Mme V., Lormont Génicart",
      contexte: "Succession appartement",
      citation: "Équipe rassurante, prix juste, tri éthique. Merci.",
    },
  },
  {
    slug: "saint-medard-en-jalles",
    nom: "Saint-Médard-en-Jalles",
    codePostal: "33160",
    departement: "33",
    departementNom: "Gironde",
    region: "Nouvelle-Aquitaine",
    distanceKmDepuisBordeaux: 12,
    limitrophes: ["eysines", "merignac"],
    metaDescription:
      "Débarras à Saint-Médard-en-Jalles : pavillons, maisons familiales, dépendances. Devis sous 2h.",
    temoignage: {
      auteur: "Famille C., Saint-Médard",
      contexte: "Vide-maison après décès",
      citation:
        "Aucun objet de valeur perdu, beaucoup ont trouvé une seconde vie. Bravo.",
    },
  },
  {
    slug: "eysines",
    nom: "Eysines",
    codePostal: "33320",
    departement: "33",
    departementNom: "Gironde",
    region: "Nouvelle-Aquitaine",
    distanceKmDepuisBordeaux: 9,
    limitrophes: ["bruges", "le-bouscat", "merignac", "saint-medard-en-jalles"],
    metaDescription:
      "Débarras à Eysines : maisons, appartements, locaux pro. Acteur Bordeaux Métropole, devis transparent.",
    temoignage: {
      auteur: "M. F., Eysines",
      contexte: "Vidage maison en succession",
      citation: "Travail rapide et propre. Devis ferme respecté à l'euro près.",
    },
  },
  {
    slug: "ambares-et-lagrave",
    nom: "Ambarès-et-Lagrave",
    codePostal: "33440",
    departement: "33",
    departementNom: "Gironde",
    region: "Nouvelle-Aquitaine",
    distanceKmDepuisBordeaux: 14,
    limitrophes: ["lormont"],
    metaDescription:
      "Débarras à Ambarès-et-Lagrave : maisons individuelles, hangars, caves. Charte 0 gaspillage.",
    temoignage: {
      auteur: "M. M., Ambarès",
      contexte: "Vidage hangar agricole",
      citation: "Capacité logistique au rendez-vous. Très bonne prestation.",
    },
  },

  // ===== Landes (40) =====
  {
    slug: "mont-de-marsan",
    nom: "Mont-de-Marsan",
    codePostal: "40000",
    departement: "40",
    departementNom: "Landes",
    region: "Nouvelle-Aquitaine",
    distanceKmDepuisBordeaux: 130,
    limitrophes: ["dax"],
    metaDescription:
      "Débarras à Mont-de-Marsan (40) : acteur girondin intervenant en Landes. Devis transparent, frais kilométriques expliqués.",
    temoignage: {
      auteur: "Notaire, Mont-de-Marsan",
      contexte: "Succession en zone rurale",
      citation:
        "Une rare capacité à intervenir hors métropole avec un même niveau d'exigence.",
    },
  },
  {
    slug: "dax",
    nom: "Dax",
    codePostal: "40100",
    departement: "40",
    departementNom: "Landes",
    region: "Nouvelle-Aquitaine",
    distanceKmDepuisBordeaux: 150,
    limitrophes: ["saint-paul-les-dax", "mont-de-marsan"],
    metaDescription:
      "Débarras à Dax (40) : intervention sous 7 jours, frais kilométriques chiffrés. Acteur Nouvelle-Aquitaine basé à Bordeaux.",
    temoignage: {
      auteur: "Mme A., Dax",
      contexte: "Vide-maison post-cure",
      citation: "Équipe sérieuse venue de Bordeaux, tout s'est passé en une journée.",
    },
  },
  {
    slug: "saint-paul-les-dax",
    nom: "Saint-Paul-lès-Dax",
    codePostal: "40990",
    departement: "40",
    departementNom: "Landes",
    region: "Nouvelle-Aquitaine",
    distanceKmDepuisBordeaux: 152,
    limitrophes: ["dax"],
    metaDescription:
      "Débarras à Saint-Paul-lès-Dax : pavillons, maisons landaises. Intervention par notre équipe girondine, devis sous 48h.",
    temoignage: {
      auteur: "M. R., Saint-Paul-lès-Dax",
      contexte: "Désencombrement maison familiale",
      citation: "Distance gérée, devis honnête, travail propre.",
    },
  },
  {
    slug: "capbreton",
    nom: "Capbreton",
    codePostal: "40130",
    departement: "40",
    departementNom: "Landes",
    region: "Nouvelle-Aquitaine",
    distanceKmDepuisBordeaux: 170,
    limitrophes: [],
    metaDescription:
      "Débarras à Capbreton (40) : résidences secondaires, locations saisonnières. Acteur Nouvelle-Aquitaine basé à Bordeaux.",
    temoignage: {
      auteur: "Propriétaire bailleur, Capbreton",
      contexte: "Remise en état location saisonnière",
      citation: "Réactivité parfaite avant la haute saison.",
    },
  },
  {
    slug: "biscarrosse",
    nom: "Biscarrosse",
    codePostal: "40600",
    departement: "40",
    departementNom: "Landes",
    region: "Nouvelle-Aquitaine",
    distanceKmDepuisBordeaux: 110,
    limitrophes: [],
    metaDescription:
      "Débarras à Biscarrosse (40) : maisons forestières, résidences secondaires. Devis sous 48h, frais kilométriques transparents.",
    temoignage: {
      auteur: "Famille L., Biscarrosse",
      contexte: "Vidage maison familiale",
      citation: "Service haut de gamme à un tarif clair. Merci à l'équipe.",
    },
  },

  // ===== Lot-et-Garonne (47) =====
  {
    slug: "agen",
    nom: "Agen",
    codePostal: "47000",
    departement: "47",
    departementNom: "Lot-et-Garonne",
    region: "Nouvelle-Aquitaine",
    distanceKmDepuisBordeaux: 140,
    limitrophes: ["le-passage"],
    metaDescription:
      "Débarras à Agen (47) : maisons, appartements, locaux pro. Acteur girondin rayonnant en Nouvelle-Aquitaine.",
    temoignage: {
      auteur: "Étude notariale, Agen",
      contexte: "Succession centre-ville",
      citation:
        "Un partenaire fiable hors Gironde, c'est suffisamment rare pour être souligné.",
    },
  },
  {
    slug: "marmande",
    nom: "Marmande",
    codePostal: "47200",
    departement: "47",
    departementNom: "Lot-et-Garonne",
    region: "Nouvelle-Aquitaine",
    distanceKmDepuisBordeaux: 90,
    limitrophes: ["tonneins"],
    metaDescription:
      "Débarras à Marmande (47) : maisons, fermes, dépendances. Frais kilométriques chiffrés, devis sous 48h.",
    temoignage: {
      auteur: "M. B., Marmande",
      contexte: "Vide-ferme",
      citation: "Capacité logistique solide pour un débarras volumineux.",
    },
  },
  {
    slug: "villeneuve-sur-lot",
    nom: "Villeneuve-sur-Lot",
    codePostal: "47300",
    departement: "47",
    departementNom: "Lot-et-Garonne",
    region: "Nouvelle-Aquitaine",
    distanceKmDepuisBordeaux: 150,
    limitrophes: [],
    metaDescription:
      "Débarras à Villeneuve-sur-Lot : maisons, appartements, caves. Intervention par notre équipe basée à Bordeaux.",
    temoignage: {
      auteur: "Mme S., Villeneuve-sur-Lot",
      contexte: "Désencombrement avant vente",
      citation: "Équipe ponctuelle et soignée malgré la distance.",
    },
  },
  {
    slug: "tonneins",
    nom: "Tonneins",
    codePostal: "47400",
    departement: "47",
    departementNom: "Lot-et-Garonne",
    region: "Nouvelle-Aquitaine",
    distanceKmDepuisBordeaux: 110,
    limitrophes: ["marmande"],
    metaDescription:
      "Débarras à Tonneins (47) : pavillons, maisons de bourg, dépendances. Devis transparent incluant les frais kilométriques.",
    temoignage: {
      auteur: "M. C., Tonneins",
      contexte: "Vide-maison familiale",
      citation: "Travail respectueux des lieux et des objets de famille.",
    },
  },
  {
    slug: "le-passage",
    nom: "Le Passage",
    codePostal: "47520",
    departement: "47",
    departementNom: "Lot-et-Garonne",
    region: "Nouvelle-Aquitaine",
    distanceKmDepuisBordeaux: 142,
    limitrophes: ["agen"],
    metaDescription:
      "Débarras au Passage (47) : maisons, locaux pro, garages. Acteur Nouvelle-Aquitaine fiable, devis sous 48h.",
    temoignage: {
      auteur: "Mme N., Le Passage",
      contexte: "Débarras suite à donation",
      citation: "Travail discret et bien organisé. Nous sommes pleinement satisfaits.",
    },
  },
] as const;

export const ZONES_BY_DEPARTEMENT = ZONES.reduce(
  (acc, zone) => {
    (acc[zone.departement] ??= []).push(zone);
    return acc;
  },
  {} as Record<Departement, Zone[]>,
);

export function getZone(slug: string): Zone | undefined {
  return ZONES.find((z) => z.slug === slug);
}

export function getZoneSlugs(): string[] {
  return ZONES.map((z) => z.slug);
}
