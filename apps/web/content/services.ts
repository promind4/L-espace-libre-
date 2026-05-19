/**
 * Données des 5 services exposés en SEO long-tail thématique.
 * Alimente `app/services/[slug]/page.tsx`, le composant
 * `components/services/ServicePageTemplate.tsx` et les cards d'accueil.
 *
 * Contenu rédactionnel : v1 (templates IA). « Moelle épinière » à
 * valider par le PO avant publication (specify §6, R4).
 */
import type { BienType } from "@/lib/pricing";
import type { IconName } from "@/components/ui/Icon";

export interface ServiceSection {
  heading: string;
  body: string;
}

export interface ServiceFaqItem {
  q: string;
  a: string;
}

export interface ServiceTestimonial {
  auteur: string;
  contexte: string;
  citation: string;
}

export interface Service {
  slug: string;
  titre: string;
  /** Phrase courte pour la carte d'accueil. */
  baseline: string;
  /** Icône Lucide (référencée dans `components/ui/Icon.tsx`). */
  icon: IconName;
  /** Description longue inline (1 paragraphe d'intro). */
  intro: string;
  /** Sections détaillées (H3) pour le SEO long-tail. */
  sections: ServiceSection[];
  /** Liste de ce qui est inclus. */
  inclus: string[];
  /** Questions fréquentes — alimente le JSON-LD FAQPage. */
  faq: ServiceFaqItem[];
  /** Témoignage local (optionnel). */
  temoignage?: ServiceTestimonial;
  /** Type de bien pré-sélectionné dans le Simulateur (UX). */
  defaultType?: BienType;
  /** Méta-description SEO (≤ 160 caractères idéalement). */
  metaDescription: string;
  /**
   * Balise <title> exacte servie au robot (Phase 2 SEO — cf. meta.md §4).
   * Injectée via `title.absolute` pour bypass le template du layout racine.
   * Budget : 40–60 caractères, séparateur `|`, aucun suffixe automatique.
   */
  seoTitle: string;
  /**
   * H1 visible affiché dans le Hero de la page service (cf. meta.md §4).
   * Distinct de `titre` (qui reste la version éditoriale longue utilisée
   * dans le breadcrumb, le footer et les JSON-LD).
   */
  seoH1: string;
}

export const SERVICES: readonly Service[] = [
  // ============================================================
  //  1. Débarras maison & appartement
  // ============================================================
  {
    slug: "debarras-maison-appartement",
    titre: "Débarras Maison & Appartement : Formule Clés en Main",
    baseline:
      "Vidage complet ou partiel, tri sur place, remise en état pour vente ou location.",
    icon: "home",
    defaultType: "appartement",
    metaDescription:
      "Entreprise de débarras complet pour maisons et appartements en Gironde. Idéal successions et déménagements. Devis gratuit et ferme en 1 minute.",
    seoTitle: "Débarras Maison & Appartement Gironde | L'Espace Libre",
    seoH1: "Débarras complet de maisons et appartements.",
    intro:
      "Gérez votre transition de vie en toute sérénité grâce à notre solution de débarras résidentiel. Que vous prépariez un déménagement imminent ou que vous vidiez le logement d'un proche, nous vous offrons un service rapide, discret et intégralement pris en charge de A à Z. Ne vous souciez plus de rien : notre équipe s'occupe de redonner de la clarté à votre habitat.",
    sections: [
      {
        heading: "Simplicité absolue pour libérer l'habitat",
        body: "Déléguez la gestion de vos intérieurs et retrouvez un gain de place immédiat sans effort. Nous prenons en charge la totalité de votre mobilier, du canapé encombrant à la petite décoration. Notre processus commence par un tri sélectif rigoureux directement dans les pièces concernées, ce qui vous évite la corvée de la manutention lourde et garantit un espace propre à la fin de notre intervention.",
      },
      {
        heading: "Rapidité d'exécution et moyens adaptés",
        body: "Le temps est souvent compté lors d'un déménagement. C'est pourquoi nous intervenons avec réactivité en déployant un camion benne adapté au volume en m³ exact de votre propriété. Grâce à une évaluation précise, nos équipes maîtrisent les délais d'évacuation, vous permettant ainsi de respecter votre planning de restitution ou de mise en vente sans la moindre journée de retard.",
      },
      {
        heading: "Sérénité écologique et valorisation garantie",
        body: "Confiez-nous l'évacuation de vos encombrants en ayant la certitude d'adopter une démarche écoresponsable. Nous mettons un point d'honneur à organiser la valorisation systématique de tous les objets réutilisables. Ce qui peut trouver une seconde vie est redistribué via notre réseau associatif, vous offrant ainsi une tranquillité d'esprit totale quant à l'empreinte environnementale de votre débarras.",
      },
    ],
    inclus: [
      "Inventaire et tri sur place",
      "Évacuation complète des biens et déchets",
      "Don aux associations partenaires (Emmaüs, Le Relais)",
      "Balayage et remise en état basique du logement",
      "Restitution des clés au mandataire ou au propriétaire",
      "Récapitulatif écrit des dons sur demande",
    ],
    faq: [
      {
        q: "Combien de temps prend un débarras complet ?",
        a: "Pour un appartement de 60 m² standard, comptez une journée. Pour une maison de 120 m² avec dépendances, deux à trois jours. Le devis précise toujours la durée estimée.",
      },
      {
        q: "Faut-il être présent pendant l'intervention ?",
        a: "Non. De nombreux clients nous remettent les clés (ou nous coordonnons avec le notaire, l'agence ou le syndic). Nous vous envoyons des photos avant restitution si vous êtes à distance.",
      },
      {
        q: "Que devient le mobilier en bon état ?",
        a: "Il part en priorité chez Emmaüs ou Le Relais Gironde. Nous travaillons aussi avec des ressourceries locales pour le mobilier qualitatif. Aucun bien valorisable n'est mis en déchèterie.",
      },
      {
        q: "Combien coûte un débarras ?",
        a: "Notre Simulateur en ligne vous donne une fourchette en 30 secondes. Le devis ferme arrive sous deux heures après envoi de quelques photos. Aucun engagement.",
      },
    ],
    temoignage: {
      auteur: "Mme R., Bordeaux Chartrons",
      contexte: "Succession appartement haussmannien",
      citation:
        "Une équipe ponctuelle, discrète et respectueuse. Tout a été vidé et trié en une journée. Le récapitulatif des dons a beaucoup compté pour nous.",
    },
  },

  // ============================================================
  //  2. Succession & notaires
  // ============================================================
  {
    slug: "succession-notaire",
    titre: "Succession et Débarras Post-Mortem : Empathie et Rigueur",
    baseline:
      "Coordination avec l'étude notariale, inventaire et débarras sécurisé du logement.",
    icon: "scroll-text",
    defaultType: "appartement",
    metaDescription:
      "Accompagnement premium pour le débarras de maison après décès ou succession en Gironde. Partenaire direct des notaires et agences immobilières.",
    seoTitle: "Débarras de Succession & Valorisation | Gironde",
    seoH1: "Gestion de débarras de succession et valorisation.",
    intro:
      "Traverser la perte d'un proche est une épreuve douloureuse où les formalités ne devraient pas s'ajouter à votre peine. L'Espace Libre accompagne les familles endeuillées et les professionnels du droit avec une discrétion absolue et un profond respect. Nous sécurisons l'aspect matériel pour vous permettre de vous concentrer sur l'essentiel, tout en respectant scrupuleusement la réglementation en vigueur.",
    sections: [
      {
        heading: "Intervention sécurisée dans le cadre légal",
        body: "Lors d'un débarras post-mortem, la sécurisation du périmètre juridique est primordiale pour protéger chaque héritier. Nous travaillons en étroite collaboration avec votre notaire pour prévenir tout risque de recel successoral. Avant la moindre manipulation, nous vérifions que chaque étape est conforme aux directives stipulées dans l'acte notarié, garantissant ainsi une transparence totale pour l'ensemble de la famille.",
      },
      {
        heading: "Une méthodologie stricte pour le partage",
        body: "La clarté est le pilier d'une succession apaisée. Notre équipe réalise un inventaire de succession exhaustif du patrimoine mobilier du de cujus. Ce catalogage minutieux facilite le travail de l'exécuteur testamentaire et de l'étude notariale, posant ainsi les bases saines et documentées indispensables à un futur partage équitable entre tous les ayants droit.",
      },
      {
        heading: "Estimation éclairée pour une clôture sereine",
        body: "Évaluer correctement un patrimoine requiert une véritable expertise métier. Nous proposons une estimation des biens objective, reflétant fidèlement leur valeur nominale sur le marché actuel. Cette rigueur dans le chiffrage permet aux agences immobilières et aux notaires de clôturer le dossier successoral avec efficacité et d'éviter tout conflit d'intérêts résiduel.",
      },
    ],
    inclus: [
      "Coordination avec le notaire ou le mandataire",
      "Inventaire écrit des biens valorisables",
      "Conservation des biens désignés par les héritiers",
      "Confidentialité absolue garantie par charte écrite",
      "Justificatifs de dons et de recyclage fournis",
      "Planning aligné sur l'instruction notariale",
    ],
    faq: [
      {
        q: "Travaillez-vous directement avec les études notariales ?",
        a: "Oui. Plusieurs offices girondins nous mandatent régulièrement. Nous adaptons notre protocole aux exigences de l'étude (inventaire, conservation, justificatifs).",
      },
      {
        q: "Que se passe-t-il pour les objets de valeur découverts ?",
        a: "Tout objet susceptible d'avoir une valeur est mis de côté, photographié et remis au mandataire ou au notaire. Nous ne disposons d'aucun bien sans accord écrit.",
      },
      {
        q: "Faut-il un accord écrit des héritiers pour intervenir ?",
        a: "Oui, ou un mandat exprès du notaire. Nous ne déclenchons jamais une intervention sans cette base juridique claire.",
      },
      {
        q: "Pouvez-vous intervenir si les héritiers sont en désaccord ?",
        a: "En cas de désaccord, nous attendons l'arbitrage du notaire ou la nomination d'un mandataire successoral. Nous ne nous substituons jamais à une décision familiale.",
      },
    ],
    temoignage: {
      auteur: "Étude notariale, Pessac",
      contexte: "Succession instruction notariale",
      citation:
        "Coordination irréprochable avec l'étude. Restitution des clés dans les délais, dossier d'intervention complet annexé au dossier de succession.",
    },
  },

  // ============================================================
  //  3. Bureaux & locaux professionnels
  // ============================================================
  {
    slug: "bureaux-locaux-professionnels",
    titre: "Transfert d'Entreprise et Libération de Locaux Pro",
    baseline:
      "Fin de bail, déménagement d'entreprise, remise à neuf rapide pour le nouvel occupant.",
    icon: "building-2",
    defaultType: "appartement",
    seoTitle: "Débarras de Bureaux & Locaux Pro en Gironde | Entreprise",
    seoH1: "Débarras et valorisation de locaux professionnels.",
    metaDescription:
      "Service de débarras et désencombrement de bureaux, commerces, entrepôts et archives pour les professionnels en Gironde. Intervention rapide 48h.",
    intro:
      "Minimisez l'impact d'une transition sur votre chiffre d'affaires avec notre prestation B2B haut de gamme. Destinée aux chefs d'entreprise et directeurs administratifs, notre méthode garantit une continuité d'activité optimale lors de votre changement d'adresse. Nous allions vélocité opérationnelle et conformité environnementale pour répondre aux exigences les plus strictes du monde corporate.",
    sections: [
      {
        heading: "Vélocité et optimisation des espaces de travail",
        body: "Lors d'un transfert d'entreprise, chaque heure compte. Nos techniciens désinstallent et évacuent votre mobilier de bureau avec une rapidité millimétrée. L'objectif est double : libérer rapidement la surface pour respecter vos échéances de bail commercial, et contribuer à une véritable optimisation d'espace pro pour le futur locataire, sans jamais interrompre la productivité de vos équipes.",
      },
      {
        heading: "Destruction confidentielle et sécurité des données",
        body: "La protection de l'information stratégique est non négociable pour une entreprise moderne. Nous assurons la destruction d'archives sensibles directement sur protocole fermé, garantissant l'anonymat de vos données. Cette traçabilité rigoureuse protège votre société contre les fuites d'informations et respecte les normes de confidentialité imposées aux gestionnaires de parcs immobiliers.",
      },
      {
        heading: "Respect des normes RSE et gestion électronique",
        body: "S'inscrire dans une démarche responsable est essentiel pour votre image de marque. Nous traitons l'intégralité de votre parc informatique obsolète en respectant la directive stricte sur les DEEE. En fin d'intervention, nous vous remettons un certificat de recyclage officiel, document probant pour votre bilan RSE, tout en vous fournissant les éléments nécessaires pour faire valoir une TVA récupérable sur notre prestation.",
      },
    ],
    inclus: [
      "Démontage et évacuation du mobilier de bureau",
      "Gestion DEEE avec bordereau de suivi",
      "Destruction sécurisée de données (option, avec certificat)",
      "Intervention hors heures d'activité possible",
      "Coordination avec le bailleur ou l'agence",
      "Photos avant/après pour le dossier de restitution",
    ],
    faq: [
      {
        q: "Intervenez-vous le soir et le weekend ?",
        a: "Oui. Pour les locaux en activité, nous privilégions les interventions du vendredi soir au dimanche soir, sans surcoût significatif. Précisez votre contrainte au devis.",
      },
      {
        q: "Que devient le matériel informatique ?",
        a: "Les unités centrales, écrans et périphériques rejoignent la filière DEEE avec bordereau à votre nom. Pour les supports de données, nous proposons une destruction sécurisée avec certificat RGPD.",
      },
      {
        q: "Pouvez-vous démonter cloisons et mobilier intégré ?",
        a: "Oui, dans la limite du non-structurel. Cloisons amovibles, faux plafonds techniques, mobilier acoustique, postes informatiques — tout cela fait partie de notre prestation standard.",
      },
      {
        q: "Travaillez-vous avec les mandataires judiciaires ?",
        a: "Oui. Pour les liquidations, nous intervenons sur mandat avec inventaire préalable et conservation des biens désignés selon l'ordonnance du tribunal de commerce.",
      },
    ],
    temoignage: {
      auteur: "M. H., Bruges",
      contexte: "Vidage bureau professionnel",
      citation:
        "Réactivité exemplaire avant ma mise à neuf. Local rendu impeccable au bailleur, certificat DEEE en main propre.",
    },
  },

  // ============================================================
  //  4. Cave, garage et grenier
  // ============================================================
  {
    slug: "cave-garage-grenier",
    titre: "Désencombrement de Cave, Garage et Grenier",
    baseline:
      "Dépendances, locaux annexes, débarras au volume sans intervention dans l'habitation.",
    icon: "archive",
    defaultType: "cave",
    metaDescription:
      "Besoin de vider une cave, un garage ou d'évacuer des encombrants en Gironde ? Intervention rapide pour particuliers et syndics. Obtenez votre prix.",
    seoTitle: "Débarras de Caves, Garages & Encombrants | Gironde",
    seoH1: "Désencombrement de caves, garages et dépendances.",
    intro:
      "Reconquérez les mètres carrés perdus de vos espaces annexes et redonnez de l'oxygène à votre résidence secondaire. L'accumulation silencieuse finit toujours par saturer les sous-sols et les combles, transformant des zones de stockage en impasses inexploitables. Nous intervenons en profondeur pour assainir et libérer ces pièces souvent délaissées, avec une efficacité redoutable.",
    sections: [
      {
        heading: "Lutte contre les dommages liés au stockage",
        body: "Les environnements souterrains ou mal isolés favorisent la dégradation de vos biens. Au milieu des cartons accumulés depuis des décennies, l'humidité s'installe et le salpêtre attaque les murs, menaçant la salubrité même de votre bâti. Notre intervention stoppe cette détérioration silencieuse en vidant entièrement la zone, permettant ainsi aux murs de respirer à nouveau.",
      },
      {
        heading: "Maîtrise logistique des environnements contraints",
        body: "Opérer dans une cave ou sous les toits exige un savoir-faire spécifique face aux contraintes architecturales. Nos professionnels sont formés pour manœuvrer dans tout accès exigu avec sécurité et habileté. Lorsque la configuration des escaliers ou des fenêtres l'impose, nous déployons un monte-meuble adapté pour extraire les charges lourdes sans endommager les parties communes.",
      },
      {
        heading: "Tris minutieux et seconde vie des objets oubliés",
        body: "Un véritable désencombrement ne consiste pas seulement à tout jeter. Sous la poussière se cachent souvent de belles surprises. Nous opérons un tri de cartons méthodique pour séparer le déchet de ce qui peut être sauvé. Si nous détectons des pièces anciennes pertinentes, nous privilégions la valorisation de brocante pour alléger votre facture finale de façon intelligente.",
      },
    ],
    inclus: [
      "Vidage complet de la dépendance",
      "Tri responsable sur place",
      "Évacuation des encombrants en filière 33",
      "Balayage et remise en état basique",
      "Devis au volume transparent",
      "Aucune intervention dans le logement principal sauf demande explicite",
    ],
    faq: [
      {
        q: "Faut-il vider le logement principal en même temps ?",
        a: "Non. Nous intervenons uniquement sur la dépendance demandée. Beaucoup de clients commencent par la cave ou le garage avant d'envisager un débarras plus large.",
      },
      {
        q: "Combien coûte un débarras de cave ?",
        a: "Pour une cave d'immeuble de 10 m² en état standard, comptez entre 290 € et 390 € sur Bordeaux Métropole. Notre Simulateur vous donne une fourchette immédiate adaptée à votre cas.",
      },
      {
        q: "Faut-il être présent ?",
        a: "Non, dès lors que vous nous remettez les clés (cave ou garage). Pour les copropriétés, prévenez le syndic ou laissez-nous l'information.",
      },
      {
        q: "Pouvez-vous récupérer la cave d'un défunt ?",
        a: "Oui, dans le cadre d'une succession. Nous travaillons en coordination avec l'étude notariale et conservons les biens désignés par les héritiers (vins, archives, objets de famille).",
      },
    ],
  },

  // ============================================================
  //  5. Nettoyage extrême (Diogène)
  // ============================================================
  {
    slug: "nettoyage-extreme-diogene",
    titre: "Nettoyage Extrême et Syndrome de Diogène",
    baseline:
      "Situations critiques, décontamination, équipe spécialisée et confidentialité absolue.",
    icon: "sparkles",
    metaDescription:
      "Spécialiste du débarras et nettoyage extrême pour syndrome de Diogène et logements insalubres en Gironde et Aquitaine. Discrétion et tri sélectif.",
    seoTitle: "Nettoyage Diogène & Logement Insalubre | Aquitaine",
    seoH1: "Débarras technique et nettoyage syndrome de Diogène.",
    intro:
      "Face aux situations de détresse psychologique extrême, une approche purement logistique ne suffit pas. L'Espace Libre déploie un protocole technique de haut niveau doublé d'une profonde écoute humaine pour traiter l'insalubrité la plus sévère. Nous apportons une solution radicale et salvatrice aux travailleurs sociaux, aux syndics et aux familles confrontées à l'indicible.",
    sections: [
      {
        heading: "Approche psychologique de l'accumulation",
        body: "Intervenir chez une personne souffrant du syndrome de Diogène requiert un tact absolu et une absence totale de jugement. Nous comprenons que l'accumulation compulsive est une pathologie complexe qui fige la personne dans son environnement. Notre équipe spécialisée accompagne cette transition difficile avec douceur, préparant le terrain pour un retour à un cadre de vie digne et apaisé.",
      },
      {
        heading: "Éradication totale des risques biologiques",
        body: "Lorsque le logement bascule dans l'extrême, la santé publique est menacée. Nous déployons un protocole sanitaire draconien pour affronter un nettoyage insalubre de grande ampleur. Nos techniciens, équipés de combinaisons et masques intégraux, procèdent à la neutralisation méticuleuse de tous les agents pathogènes présents, assurant ainsi la sécurité absolue des futurs occupants et du voisinage direct.",
      },
      {
        heading: "Désinfection lourde et assainissement définitif",
        body: "Une fois les déchets évacués, l'assainissement en profondeur commence. Nous réalisons une désinfection complète des sols, des murs et des surfaces, couplée si nécessaire à une dératisation professionnelle pour éradiquer les foyers de nuisibles. Le processus s'achève par une élimination des odeurs persistantes grâce à des générateurs d'ozone, une étape cruciale souvent nécessaire après un nettoyage après décès complexe.",
      },
    ],
    inclus: [
      "Diagnostic préalable confidentiel",
      "Équipe spécialisée avec EPI complet",
      "Décontamination en trois temps",
      "Gestion réglementaire des déchets dangereux (DASRI, DDM)",
      "Coordination avec services sociaux et tuteurs",
      "Charte de confidentialité signée",
    ],
    faq: [
      {
        q: "Garantissez-vous la confidentialité ?",
        a: "Oui, par charte écrite. Aucune information, aucune photo, aucune référence publique. Les voisins ne sont informés que si nous devons utiliser les parties communes.",
      },
      {
        q: "Travaillez-vous avec les services sociaux ?",
        a: "Régulièrement. Nous intervenons sur mandat d'assistantes sociales du Conseil départemental, de mandataires judiciaires, de tuteurs et de syndics. Devis et factures sont adaptés au tiers payeur.",
      },
      {
        q: "Combien de temps prend une intervention ?",
        a: "De deux jours pour un studio en situation modérée à une semaine pour une maison en situation critique avec décontamination. Le diagnostic préalable fixe la durée.",
      },
      {
        q: "Le coût est-il pris en charge ?",
        a: "Certains dispositifs (FSL, APA, fonds d'aide municipaux, assurances habitation) couvrent tout ou partie. Nous orientons les familles vers les bons interlocuteurs et adaptons la facturation au tiers payeur.",
      },
    ],
    temoignage: {
      auteur: "Assistante sociale, Conseil départemental 33",
      contexte: "Intervention Diogène en coordination CCAS",
      citation:
        "Une équipe humaine et compétente. Le protocole sanitaire est rigoureux, et l'accompagnement de la famille a été exemplaire.",
    },
  },
] as const;

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug);
}
