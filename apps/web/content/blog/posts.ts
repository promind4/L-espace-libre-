/**
 * Les 10 articles régionaux du blog L'Espace Libre.
 *
 * Sujets validés par le PO (specify v1.1 R8, version « Grand Sud-Ouest »).
 * Contenu rédactionnel v1 — moelle épinière à valider par le PO avant
 * publication.
 *
 * Cible SEO : long-tail régional (Gironde, Nouvelle-Aquitaine, Bordeaux,
 * Mont-de-Marsan, Agen). Vouvoiement systématique. Aucun emoji, aucun
 * point d'exclamation (Constitution I.2).
 */
import type { BlogPost } from "./types";

const AUTEUR = "L'Espace Libre";

export const BLOG_POSTS: readonly BlogPost[] = [
  // ============================================================
  //  1. Prix d'un débarras en Gironde — Guide tarifs 2026
  // ============================================================
  {
    slug: "prix-debarras-gironde-2026",
    titre: "Prix d'un débarras en Gironde : guide des tarifs 2026",
    excerpt:
      "Comment se calcule un devis débarras en 2026 ? Quels paramètres font varier le prix entre 300 € et 5 000 € ? Notre méthode transparente, exemples chiffrés à l'appui.",
    metaDescription:
      "Tarifs débarras en Gironde 2026 : méthode de calcul transparente, exemples chiffrés, facteurs qui font varier le devis. Guide L'Espace Libre.",
    publishedAt: "2026-05-11",
    readingTimeMin: 6,
    category: "Tarifs",
    tags: ["tarifs", "gironde", "guide", "devis"],
    auteur: AUTEUR,
    blocks: [
      {
        type: "p",
        content:
          "Combien coûte un débarras en Gironde en 2026 ? La question revient à chaque demande. Les écarts entre prestataires sont parfois importants, et l'absence de grille publique entretient l'opacité. À L'Espace Libre, nous avons fait le choix d'une méthode de calcul transparente, identique pour tous les clients. Ce guide vous explique comment se construit un devis et ce qui le fait varier.",
      },
      { type: "h2", content: "Le volume évacué, base de tout calcul" },
      {
        type: "p",
        content:
          "Un débarras n'est pas tarifé au temps passé ni au nombre de personnes mobilisées : il est tarifé au volume réellement évacué. Pour un logement de 60 m², on estime que le volume à débarrasser représente en moyenne 38 % de la surface habitable, soit environ 23 m³. Cette densité métier (0,38) est une moyenne empirique qui fonctionne pour la majorité des situations standard.",
      },
      {
        type: "p",
        content:
          "À ce volume on applique un tarif unitaire (45 € par m³ pour 2026), auquel s'ajoute un forfait fixe de 80 € couvrant le déplacement et la logistique de base. Pour un appartement de 60 m² en rez-de-chaussée à Bordeaux Métropole, cela donne une base d'environ 1 100 €.",
      },
      { type: "h2", content: "Trois coefficients qui font varier le devis" },
      {
        type: "p",
        content:
          "Au-delà de la base, trois variables modifient significativement le prix final.",
      },
      {
        type: "ul",
        items: [
          "L'étage et l'accès. Un appartement au 3ᵉ sans ascenseur majore le devis de 30 %, à cause du temps de portage et du risque de casse.",
          "L'état de salubrité. Un logement entretenu (coefficient 1,0) ne mobilise pas les mêmes moyens qu'un logement post-Diogène (coefficient 2,5), qui exige EPI, décontamination et filière déchets dangereux.",
          "La distance. Sur Bordeaux Métropole, aucun frais kilométrique. En Gironde hors CUB, un forfait de 65 €. Hors département (Landes, Lot-et-Garonne), 0,60 € par km depuis Bordeaux Centre.",
        ],
      },
      { type: "h2", content: "Quelques exemples chiffrés" },
      {
        type: "p",
        content:
          "Pour vous donner des ordres de grandeur réalistes, voici quatre cas typiques que nous traitons régulièrement :",
      },
      {
        type: "ul",
        items: [
          "Cave d'immeuble de 15 m² en bon état, à Bordeaux : environ 290 € à 390 €.",
          "Appartement T3 de 60 m² au 2ᵉ sans ascenseur, état normal : environ 1 080 € à 1 460 €.",
          "Maison de 120 m² à Pessac, état insalubre : environ 2 740 € à 3 710 €.",
          "Maison Diogène de 100 m² à Mont-de-Marsan (150 km) : environ 3 780 € à 5 110 €, frais kilométriques inclus.",
        ],
      },
      { type: "h2", content: "Comment éviter les mauvaises surprises" },
      {
        type: "p",
        content:
          "Trois pièges fréquents sur le marché. Le prix d'appel téléphonique, qui explose une fois sur place. La rémunération via valorisation, où le prestataire prétend « se payer en revendant », mais facture finalement le manque-à-gagner. L'absence de devis écrit ferme. Notre engagement est inverse : devis ferme sous deux heures par photo, prix tenu au centime près, aucun supplément le jour de l'intervention. Pour cadrer votre budget avant tout échange, vous pouvez <a href=\"/contact\">obtenir une estimation chiffrée en ligne en quelques secondes</a>.",
      },
      {
        type: "callout",
        content:
          "Notre Simulateur en ligne donne une fourchette en 30 secondes. Le devis ferme arrive sous deux heures après envoi de quelques photos. Aucun engagement.",
        tone: "info",
      },
    ],
    related: [
      "valorisation-brocante-nouvelle-aquitaine",
      "acteur-local-bordeaux-region",
      "eco-responsable-33-40-47",
    ],
  },

  // ============================================================
  //  2. Succession en Nouvelle-Aquitaine
  // ============================================================
  {
    slug: "succession-nouvelle-aquitaine",
    titre:
      "Succession : comment vider une maison de famille en Nouvelle-Aquitaine ?",
    excerpt:
      "Coordination avec le notaire, gestion des biens désignés, justificatifs, calendrier d'intervention : les bonnes pratiques pour vider sereinement un logement après un décès.",
    metaDescription:
      "Succession en Nouvelle-Aquitaine : guide complet pour vider une maison familiale après décès. Coordination notaire, biens désignés, calendrier.",
    publishedAt: "2026-05-09",
    readingTimeMin: 7,
    category: "Succession",
    tags: ["succession", "notaire", "héritage", "deuil"],
    auteur: AUTEUR,
    blocks: [
      {
        type: "p",
        content:
          "Vider la maison d'un parent défunt n'est jamais un débarras ordinaire. Au stress logistique s'ajoutent les contraintes juridiques, la distance émotionnelle nécessaire, et bien souvent l'éloignement géographique entre héritiers et logement. En Nouvelle-Aquitaine, où nous intervenons régulièrement pour des successions, certaines bonnes pratiques permettent de traverser cette étape avec sérénité.",
      },
      { type: "h2", content: "Étape 1 : coordonner avec le notaire" },
      {
        type: "p",
        content:
          "Avant tout débarras, le notaire chargé de la succession doit donner son accord, ou les héritiers doivent l'avoir mandaté. Cette précaution n'est pas une simple formalité : elle protège chacun en cas de désaccord ultérieur. Le notaire transmet généralement une liste écrite des biens à conserver (mobilier de famille, objets désignés par testament, documents personnels, archives) et précise le calendrier compatible avec l'instruction du dossier.",
      },
      { type: "h2", content: "Étape 2 : identifier les biens à conserver" },
      {
        type: "p",
        content:
          "Les héritiers identifient les biens qu'ils souhaitent récupérer ou conserver. Il est utile de les marquer physiquement (étiquettes, pièce dédiée, étiquette discrète sous le meuble) avant l'arrivée de l'équipe de débarras. Pour les objets de valeur (bijoux, œuvres, vins de garde, archives), un inventaire écrit et photographique est recommandé. À L'Espace Libre, nous appliquons un protocole renforcé pour ces objets sensibles : photos, inventaire signé, remise en main propre.",
      },
      { type: "h2", content: "Étape 3 : choisir le bon prestataire" },
      {
        type: "p",
        content:
          "Quelques critères de sélection pour ce type d'intervention :",
      },
      {
        type: "ul",
        items: [
          "Assurance Responsabilité Civile Professionnelle, indispensable en cas de dégât.",
          "Habitude du travail avec les études notariales — beaucoup d'offices girondins mandatent les mêmes prestataires depuis des années.",
          "Capacité à fournir justificatifs : photos avant/après, inventaire écrit, bordereaux de dons et de recyclage.",
          "Charte de confidentialité signée — l'intimité du défunt et de la famille doit être protégée.",
        ],
      },
      { type: "h2", content: "Étape 4 : le jour de l'intervention" },
      {
        type: "p",
        content:
          "L'idéal est qu'un héritier ou un mandataire soit présent au début pour confirmer les biens à conserver, puis nous laisse opérer. Si tous les héritiers sont à distance, nous travaillons souvent en relation directe avec le notaire qui valide la procédure. À l'issue de l'intervention, nous remettons un dossier complet : photos, inventaire des dons effectués, coordonnées des associations bénéficiaires. Ce dossier s'intègre généralement au dossier de succession.",
      },
      { type: "h2", content: "Combien de temps, combien ça coûte ?" },
      {
        type: "p",
        content:
          "Une succession standard de 80 à 120 m² est traitée en deux à trois jours. Le coût varie selon le volume, l'état du logement et l'éloignement depuis Bordeaux. Pour une maison girondine de 100 m² en état normal, comptez entre 1 800 € et 2 500 €. Pour une maison plus volumineuse ou éloignée, jusqu'à 4 000-5 000 €. Notre devis ferme est toujours établi sous deux heures après envoi de photos. Vous pouvez <a href=\"/contact\">chiffrer en ligne le débarras de la succession en quelques minutes</a>, sans engagement.",
      },
      {
        type: "callout",
        content:
          "Plusieurs études notariales girondines nous mandatent récurremment. Si votre notaire a un prestataire de confiance, n'hésitez pas à lui demander conseil.",
        tone: "info",
      },
    ],
    related: [
      "deces-insalubrite-cadre-legal",
      "prix-debarras-gironde-2026",
      "cave-chai-patrimoine-viticole",
    ],
  },

  // ============================================================
  //  3. Diogène entre Bordeaux et Mont-de-Marsan
  // ============================================================
  {
    slug: "diogene-bordeaux-mont-de-marsan",
    titre:
      "Syndrome de Diogène : les solutions d'urgence entre Bordeaux et Mont-de-Marsan",
    excerpt:
      "Reconnaître le syndrome, mobiliser les bons interlocuteurs, accompagner la famille : ce qu'il faut savoir avant de déclencher une intervention sur ces situations sensibles.",
    metaDescription:
      "Syndrome de Diogène en Gironde et Landes : reconnaître, intervenir, accompagner. Protocole spécifique, services sociaux, dispositifs d'aide.",
    publishedAt: "2026-05-07",
    readingTimeMin: 8,
    category: "Diogène & insalubrité",
    tags: ["diogène", "insalubrité", "services sociaux", "urgence"],
    auteur: AUTEUR,
    blocks: [
      {
        type: "p",
        content:
          "Le syndrome de Diogène ne se limite pas à un logement encombré. C'est un trouble psychique reconnu qui se traduit par une accumulation extrême, une rétention compulsive d'objets sans valeur, et une perte progressive du lien social. Entre Bordeaux et Mont-de-Marsan, nous intervenons sur ce type de situations en moyenne deux fois par mois, souvent à la demande des services sociaux, des syndics ou des familles.",
      },
      { type: "h2", content: "Reconnaître la situation" },
      {
        type: "p",
        content:
          "Le diagnostic n'est pas le rôle du débarrasseur, mais quelques signes alertent. Une porte qu'on ne peut plus ouvrir entièrement. Une odeur perceptible depuis le palier. Un voisinage qui signale. Des sacs accumulés sans logique. Souvent, la personne concernée nie le problème, refuse les visites, et la famille découvre l'ampleur lors d'une hospitalisation ou d'un décès. La situation est rarement détectée tôt.",
      },
      { type: "h2", content: "Qui intervient et dans quel ordre" },
      {
        type: "p",
        content:
          "Une intervention Diogène mobilise plusieurs acteurs successifs :",
      },
      {
        type: "ol",
        items: [
          "Le médecin traitant ou un service psychiatrique, qui évalue l'état psychique de la personne et propose un suivi.",
          "Les services sociaux (CCAS, Conseil départemental), qui activent les dispositifs d'aide et coordonnent les intervenants.",
          "Une équipe spécialisée de débarras et nettoyage, qui réalise l'intervention physique avec EPI et protocole sanitaire.",
          "Le cas échéant, une société de désinsectisation/dératisation partenaire.",
          "Un suivi post-intervention pour éviter la rechute (visites régulières, accompagnement psychique).",
        ],
      },
      { type: "h2", content: "Le protocole d'intervention" },
      {
        type: "p",
        content:
          "Notre équipe intervient en équipement de protection individuelle complet : combinaison jetable, masque FFP3, gants nitrile, surchaussures. Le diagnostic préalable identifie les risques (nuisibles, fluides corporels, déchets dangereux). L'intervention suit un protocole en trois temps : évacuation des biens et déchets, nettoyage profond avec produits virucides, puis désinsectisation si nécessaire. Les déchets dangereux rejoignent les filières réglementaires (DASRI, DDM) avec bordereaux conformes.",
      },
      { type: "h2", content: "Les aides financières mobilisables" },
      {
        type: "p",
        content:
          "Le coût d'une intervention Diogène (souvent entre 3 000 € et 8 000 € selon l'ampleur) peut être pris en charge partiellement ou totalement par les dispositifs ci-dessous. Pour préparer un dossier solide auprès du tiers payeur, il est utile de <a href=\"/contact\">chiffrer en toute confidentialité l'intervention sur photos</a> avant la première demande :",
      },
      {
        type: "ul",
        items: [
          "Le Fonds de Solidarité pour le Logement (FSL) du Conseil départemental.",
          "L'Allocation Personnalisée d'Autonomie (APA) si la personne est âgée et dépendante.",
          "Les fonds municipaux d'aide d'urgence dans certaines communes (Bordeaux, Mérignac, Mont-de-Marsan).",
          "L'assurance habitation, parfois, dans le cadre de garanties spécifiques.",
          "Les caisses de retraite complémentaires, sur dossier.",
        ],
      },
      { type: "h2", content: "L'accompagnement humain prime" },
      {
        type: "p",
        content:
          "Une intervention réussie n'est pas seulement logistique. La personne concernée traverse une étape psychiquement difficile. Les proches sont souvent épuisés et culpabilisent de n'avoir pas vu plus tôt. Notre équipe est formée à cette dimension : discrétion, vouvoiement systématique, pas de jugement, respect du rythme. La confidentialité est absolue.",
      },
      {
        type: "callout",
        content:
          "Si vous êtes confronté à une situation de Diogène, contactez d'abord un médecin et les services sociaux. Le débarras n'est qu'une étape d'un parcours plus large d'accompagnement.",
        tone: "warning",
      },
    ],
    related: [
      "deces-insalubrite-cadre-legal",
      "succession-nouvelle-aquitaine",
      "acteur-local-bordeaux-region",
    ],
  },

  // ============================================================
  //  4. Éco-responsable 33 / 40 / 47
  // ============================================================
  {
    slug: "eco-responsable-33-40-47",
    titre:
      "Débarras éco-responsable : où vont vos objets dans le 33, le 40 et le 47 ?",
    excerpt:
      "Charte 0 gaspillage, associations partenaires, filières de recyclage : le parcours réel de vos biens après un débarras en Nouvelle-Aquitaine.",
    metaDescription:
      "Débarras éco-responsable en Gironde, Landes et Lot-et-Garonne : où partent réellement vos objets. Charte 0 gaspillage, associations, filières.",
    publishedAt: "2026-05-04",
    readingTimeMin: 5,
    category: "Éco-responsabilité",
    tags: ["écologie", "valorisation", "associations", "recyclage"],
    auteur: AUTEUR,
    blocks: [
      {
        type: "p",
        content:
          "Quand vous demandez un débarras, vos objets ne disparaissent pas par magie. Une fois sortis du logement, ils suivent un parcours précis qui dépend de leur état et de leur nature. À L'Espace Libre, ce parcours est documenté, traçable, et structuré autour d'une charte 0 gaspillage que nous appliquons depuis notre création.",
      },
      { type: "h2", content: "Le tri en trois flux" },
      {
        type: "p",
        content:
          "Sur place, notre équipe répartit chaque objet dans l'un des trois flux suivants :",
      },
      {
        type: "ul",
        items: [
          "Don aux associations — pour tout ce qui est en bon état d'usage : mobilier, électroménager fonctionnel, vaisselle, livres, vêtements, jouets.",
          "Recyclage filière — pour ce qui n'est plus utilisable mais peut être valorisé matière : DEEE (déchets électriques), métaux, bois, textile usagé.",
          "Déchèterie professionnelle — pour le reste : encombrants non valorisables, gravats légers, mobilier cassé.",
        ],
      },
      { type: "h2", content: "Nos associations partenaires" },
      {
        type: "p",
        content:
          "Sur la Gironde, nous travaillons régulièrement avec Emmaüs Bordeaux et la Communauté Emmaüs de Lormont, Le Relais Gironde pour le textile, ainsi que plusieurs ressourceries locales (Recyclo'Camp, La Recycl'Erie). Dans les Landes, Emmaüs Mont-de-Marsan et Le Relais Landes reçoivent nos dons. En Lot-et-Garonne, Emmaüs Agen est notre partenaire principal.",
      },
      { type: "h2", content: "Les filières de recyclage 33/40/47" },
      {
        type: "p",
        content:
          "Pour les déchets électriques et électroniques, nous travaillons avec les éco-organismes agréés (Ecologic, Ecosystem) qui assurent la traçabilité jusqu'au démantèlement. Pour les matelas et la literie, l'éco-organisme Valdelia. Pour le mobilier, Eco-mobilier. Chaque flux dispose d'un bordereau de suivi nominatif que nous archivons.",
      },
      { type: "h2", content: "Les justificatifs sur demande" },
      {
        type: "p",
        content:
          "Sur demande, nous fournissons un récapitulatif écrit de l'intervention : volumes traités, biens donnés (avec coordonnées des associations bénéficiaires), filières de recyclage utilisées, et le cas échéant photos avant/après. Pour les successions et les interventions professionnelles, ce dossier est généralement annexé au dossier client.",
      },
      { type: "h2", content: "Une démarche qui a un coût (modéré)" },
      {
        type: "p",
        content:
          "Le tri responsable demande du temps et une logistique supplémentaire (multiples points de dépose, parfois pris de rendez-vous avec les associations). Ce surcoût est intégré dans nos tarifs standard : nous ne facturons pas la charte 0 gaspillage en supplément. C'est notre conviction qu'un débarras professionnel ne peut pas se faire au mépris de la valorisation des biens. Vous pouvez <a href=\"/contact\">demander un devis transparent intégrant la charte 0 gaspillage</a> pour votre commune.",
      },
      {
        type: "callout",
        content:
          "Plus de 60 % des biens que nous évacuons trouvent une seconde vie via les associations ou les filières de recyclage. Le reste part en déchèterie professionnelle.",
        tone: "info",
      },
    ],
    related: [
      "valorisation-brocante-nouvelle-aquitaine",
      "prix-debarras-gironde-2026",
      "acteur-local-bordeaux-region",
    ],
  },

  // ============================================================
  //  5. Centre-ville vs ferme isolée
  // ============================================================
  {
    slug: "centre-ville-versus-ferme-isolee",
    titre:
      "Logistique : vider un appartement en centre-ville ou une ferme isolée, quelles différences ?",
    excerpt:
      "Stationnement, accès, équipe, calendrier, coûts : pourquoi un débarras urbain et un débarras rural ne se gèrent pas de la même façon en Nouvelle-Aquitaine.",
    metaDescription:
      "Différences logistiques entre débarras urbain et rural en Nouvelle-Aquitaine : accès, équipe, planning, coûts. Guide L'Espace Libre.",
    publishedAt: "2026-05-02",
    readingTimeMin: 6,
    category: "Logistique",
    tags: ["logistique", "centre-ville", "rural", "comparaison"],
    auteur: AUTEUR,
    blocks: [
      {
        type: "p",
        content:
          "Un débarras à Bordeaux Chartrons et un débarras dans une ferme du Lot-et-Garonne ne se gèrent pas de la même façon. Les contraintes physiques, le calendrier, le matériel mobilisé, et même le profil de l'équipe diffèrent. Cet article compare honnêtement les deux contextes pour vous aider à anticiper.",
      },
      { type: "h2", content: "En centre-ville : contraintes urbaines" },
      {
        type: "p",
        content:
          "Le débarras urbain pose des défis spécifiques au stationnement et à l'accès. Quelques exemples girondins :",
      },
      {
        type: "ul",
        items: [
          "Stationnement : à Bordeaux centre, il faut souvent demander une autorisation municipale 48 h à l'avance pour stationner le camion.",
          "Accès au bâtiment : ascenseur de service indisponible, escaliers étroits typiques de l'habitat haussmannien, code d'accès à coordonner.",
          "Voisinage : intervention discrète exigée, horaires limités (généralement 8 h-18 h en semaine).",
          "Évacuation : il faut prévoir un quai de chargement temporaire ou plusieurs allers-retours vers le camion garé à distance.",
        ],
      },
      { type: "h2", content: "En zone rurale : autres défis" },
      {
        type: "p",
        content:
          "Le débarras rural a l'avantage du stationnement et de l'horaire libre, mais d'autres contraintes apparaissent :",
      },
      {
        type: "ul",
        items: [
          "Accès au site : chemins de campagne parfois impraticables aux gros camions, nécessité d'un véhicule plus petit ou de plusieurs rotations.",
          "Volumes plus importants : une ferme accumule souvent du matériel agricole, des dépendances entières (granges, hangars), des décennies de stockage.",
          "Filières de recyclage moins denses : la déchèterie professionnelle peut être à 30-40 km, multipliant les trajets.",
          "Spécificités locales : matériel viticole, vins de garde, archives familiales centenaires demandent un traitement spécifique.",
        ],
      },
      { type: "h2", content: "Adaptation de l'équipe et du matériel" },
      {
        type: "p",
        content:
          "Pour un débarras urbain, l'équipe est compacte (deux à trois personnes), équipée de monte-charge si nécessaire, et la rotation entre logement et camion est optimisée. Pour un débarras rural volumineux, l'équipe peut compter quatre à cinq personnes, le camion est plus gros (jusqu'à 30 m³), et un véhicule utilitaire complémentaire est souvent prévu pour les zones d'accès difficile.",
      },
      { type: "h2", content: "Et côté tarif ?" },
      {
        type: "p",
        content:
          "Sur Bordeaux Métropole, aucun frais kilométrique ne s'applique. En Gironde hors CUB, un forfait de 65 € couvre le déplacement. Pour les Landes et le Lot-et-Garonne, les frais kilométriques (0,60 €/km depuis Bordeaux Centre) sont systématiquement détaillés dans le devis. À volume égal, un débarras à Bordeaux et un à Mont-de-Marsan diffèrent surtout par cette ligne kilométrique, jamais par une opacité tarifaire. Vous pouvez <a href=\"/contact\">obtenir une estimation chiffrée pour votre commune</a> avant même de demander un devis ferme.",
      },
      {
        type: "callout",
        content:
          "Que vous soyez en centre-ville bordelais ou en zone rurale girondine ou landaise, notre devis est ferme et détaillé. Aucun supplément le jour de l'intervention.",
        tone: "info",
      },
    ],
    related: [
      "acteur-local-bordeaux-region",
      "cave-chai-patrimoine-viticole",
      "prix-debarras-gironde-2026",
    ],
  },

  // ============================================================
  //  6. Décès, insalubrité, cadre légal
  // ============================================================
  {
    slug: "deces-insalubrite-cadre-legal",
    titre:
      "Nettoyage après décès et insalubrité : le cadre légal en Gironde",
    excerpt:
      "Obligations, démarches administratives, responsabilités du bailleur, du propriétaire ou des héritiers : le cadre juridique précis du nettoyage post-décès en Gironde.",
    metaDescription:
      "Cadre légal du nettoyage post-décès et insalubrité en Gironde : démarches, responsabilités, délais, aides. Guide L'Espace Libre.",
    publishedAt: "2026-04-29",
    readingTimeMin: 7,
    category: "Cadre légal",
    tags: ["décès", "insalubrité", "cadre légal", "gironde"],
    auteur: AUTEUR,
    blocks: [
      {
        type: "p",
        content:
          "Un décès dans un logement, surtout s'il n'est pas découvert immédiatement, déclenche un protocole juridique précis. En Gironde comme partout en France, plusieurs acteurs entrent en jeu et chacun a ses obligations. Cet article fait le point sur le cadre légal — sans jargon — pour les proches, les bailleurs et les syndics confrontés à ces situations.",
      },
      { type: "h2", content: "Les premiers réflexes immédiats" },
      {
        type: "p",
        content:
          "Découverte du décès : le 17 (police) ou le 112 doit être prévenu immédiatement, qui mobilise la police judiciaire et un médecin légiste. Aucun nettoyage, aucun déplacement d'objet n'est autorisé avant la levée du corps et l'éventuelle enquête. Une fois ces étapes franchies, l'autorisation de nettoyage est donnée par les services compétents.",
      },
      { type: "h2", content: "Qui est responsable du nettoyage ?" },
      {
        type: "p",
        content:
          "La règle varie selon le statut du logement :",
      },
      {
        type: "ul",
        items: [
          "Le défunt était locataire : les héritiers sont responsables de la restitution du logement au bailleur, en état correct, à charge éventuellement de l'assurance habitation du défunt.",
          "Le défunt était propriétaire : les héritiers (ou le notaire mandaté) prennent en charge le nettoyage et le débarras dans le cadre de la succession.",
          "Aucun héritier identifié ou succession refusée : c'est la commune ou le département qui peut intervenir au titre de l'aide sociale, ou le bien tombe en déshérence (récupéré par l'État).",
        ],
      },
      { type: "h2", content: "Les délais à connaître" },
      {
        type: "p",
        content:
          "Pour un logement loué, le bailleur est tenu de patienter le temps des démarches successorales (généralement six mois). Pour un logement insalubre signalé, l'ARS (Agence Régionale de Santé) peut prendre un arrêté d'insalubrité dans un délai de quelques semaines, imposant des travaux. Ces arrêtés sont publiés et opposables.",
      },
      { type: "h2", content: "Le rôle de l'assurance habitation" },
      {
        type: "p",
        content:
          "L'assurance habitation du défunt peut couvrir tout ou partie du nettoyage post-décès, notamment si une garantie « dommages aux biens » ou une garantie spécifique « décès dans le logement » est souscrite. Le délai de déclaration est généralement de cinq jours ouvrés. Il est essentiel de contacter l'assureur avant tout nettoyage et de conserver photos, devis et bordereaux.",
      },
      { type: "h2", content: "Insalubrité avérée : qui paie ?" },
      {
        type: "p",
        content:
          "Si un logement est déclaré insalubre par arrêté préfectoral, le propriétaire est responsable du nettoyage et des travaux de remise en état. En cas de location, le bailleur ne peut pas reporter l'intégralité du coût sur le locataire défaillant : la loi protège ce dernier dans certaines limites. La Préfecture de la Gironde dispose d'un service dédié pour l'arbitrage.",
      },
      { type: "h2", content: "Confidentialité et discrétion" },
      {
        type: "p",
        content:
          "Le respect de l'intimité du défunt et de sa famille est une obligation morale autant qu'éthique. Notre charte interne interdit toute photo publique, tout témoignage non anonymisé, toute information transmise à des tiers. Nous travaillons à porte fermée, sans drapeau ni inscription visible sur nos véhicules quand la situation l'exige. Vous pouvez <a href=\"/contact\">demander un devis confidentiel par e-mail sur simple envoi de photos</a>, sans visite préalable.",
      },
      {
        type: "callout",
        content:
          "Pour les situations sensibles, demandez un devis confidentiel par e-mail. Aucune visite préalable de courtoisie n'est obligatoire — les photos suffisent dans la grande majorité des cas.",
        tone: "info",
      },
    ],
    related: [
      "diogene-bordeaux-mont-de-marsan",
      "succession-nouvelle-aquitaine",
      "acteur-local-bordeaux-region",
    ],
  },

  // ============================================================
  //  7. Cave et chai bordelais
  // ============================================================
  {
    slug: "cave-chai-patrimoine-viticole",
    titre:
      "Débarras de cave et de chai : spécificités du patrimoine viticole bordelais",
    excerpt:
      "Vins de garde, matériel de vinification, archives, étiquettes, fûts : comment vider un chai bordelais sans détruire sa valeur patrimoniale.",
    metaDescription:
      "Débarras cave et chai bordelais : vins de garde, matériel viticole, archives. Valorisation patrimoniale et confidentialité absolue.",
    publishedAt: "2026-04-26",
    readingTimeMin: 6,
    category: "Patrimoine",
    tags: ["vin", "chai", "patrimoine", "bordeaux"],
    auteur: AUTEUR,
    blocks: [
      {
        type: "p",
        content:
          "Vider une cave ou un chai bordelais n'a rien à voir avec un débarras classique. Au-delà de la logistique, c'est un patrimoine — parfois familial sur plusieurs générations — qu'il faut traiter avec discernement. Bouteilles de garde, matériel de vinification, étiquettes, archives commerciales : chaque objet peut avoir une valeur économique ou sentimentale qu'on doit identifier avant tout déplacement.",
      },
      { type: "h2", content: "Première étape : l'inventaire des bouteilles" },
      {
        type: "p",
        content:
          "Avant toute intervention, un inventaire des bouteilles est essentiel. Cinq paramètres comptent : appellation, millésime, niveau dans la bouteille, état de l'étiquette, conditions de conservation (température et humidité). Un Pessac-Léognan 1989 en parfait état peut valoir plusieurs centaines d'euros, le même mal stocké ne vaut rien. Si vous n'êtes pas expert, un caviste local ou un commissaire-priseur (Maître Briscadieu à Bordeaux, par exemple) peut estimer gracieusement les lots importants.",
      },
      { type: "h2", content: "Que faire des vins identifiés ?" },
      {
        type: "p",
        content:
          "Selon la valeur, plusieurs options se présentent :",
      },
      {
        type: "ul",
        items: [
          "Conservation par les héritiers — l'option la plus simple pour les bouteilles à valeur sentimentale ou de garde courte.",
          "Vente aux enchères publiques — pour les bouteilles de valeur, les ventes Briscadieu, Baron-Ribeyre & Associés ou les ventes spécialisées en ligne (iDealwine, Catawiki) offrent une bonne traçabilité.",
          "Vente à un caviste local — solution rapide pour des lots moyens, à un tarif souvent décoté de 30-40 % par rapport aux enchères.",
          "Don à une œuvre caritative — certaines associations organisent des ventes au profit de causes locales, déductible fiscalement.",
        ],
      },
      { type: "h2", content: "Le matériel de vinification" },
      {
        type: "p",
        content:
          "Un chai abrite souvent un patrimoine matériel : fûts en chêne (parfois centenaires), pressoir traditionnel, cuves inox, étiqueteuse, capsuleuse, bouteilles vides. Ces équipements ont une valeur sur le marché de l'occasion viticole. Nous orientons systématiquement vers les revendeurs spécialisés (Tonnellerie Vicard, Vincal, plusieurs négociants girondins) avant toute évacuation.",
      },
      { type: "h2", content: "Archives, étiquettes, mémoire de la propriété" },
      {
        type: "p",
        content:
          "Les archives d'une propriété viticole sont parfois un trésor. Registres de production, factures historiques, étiquettes anciennes, correspondance avec les acheteurs : ces documents intéressent les archives départementales de la Gironde, certains musées (Cité du Vin, Musée du Vin et du Négoce), ou les nouveaux propriétaires en cas de cession. À l'Espace Libre, nous mettons systématiquement ces archives de côté avant tout tri.",
      },
      { type: "h2", content: "Confidentialité commerciale" },
      {
        type: "p",
        content:
          "Pour les propriétés en activité ou récemment cédées, la confidentialité commerciale est cruciale. Les documents sensibles (livres de comptes, listes clients, recettes propres) sont remis directement au mandataire ou détruits sur place avec attestation. Nous signons systématiquement un accord de confidentialité avec les propriétés viticoles qui le demandent. Pour une étude initiale sans engagement, vous pouvez <a href=\"/contact\">demander un devis confidentiel adapté à votre patrimoine viticole</a>.",
      },
      {
        type: "callout",
        content:
          "Pour un chai d'envergure, nous travaillons en coordination avec un commissaire-priseur ou un caviste mandaté. La valorisation des bouteilles couvre parfois tout le coût du débarras.",
        tone: "info",
      },
    ],
    related: [
      "succession-nouvelle-aquitaine",
      "valorisation-brocante-nouvelle-aquitaine",
      "eco-responsable-33-40-47",
    ],
  },

  // ============================================================
  //  8. Bureaux Mérignac / Pessac
  // ============================================================
  {
    slug: "bureaux-merignac-pessac",
    titre:
      "Vider ses bureaux à Mérignac ou Pessac : la check-list pour les pros",
    excerpt:
      "Résiliation de bail, DEEE, RGPD, calendrier : la check-list complète pour vider un local professionnel sans mauvaise surprise sur Bordeaux Métropole.",
    metaDescription:
      "Vider des bureaux à Mérignac ou Pessac : check-list complète pour les pros. Fin de bail, DEEE, RGPD, calendrier. L'Espace Libre.",
    publishedAt: "2026-04-23",
    readingTimeMin: 6,
    category: "Pro & entreprises",
    tags: ["bureaux", "pro", "mérignac", "pessac", "fin de bail"],
    auteur: AUTEUR,
    blocks: [
      {
        type: "p",
        content:
          "Vous quittez vos bureaux à Mérignac, Pessac, Bordeaux ou ailleurs sur la métropole ? La fin de bail commercial impose une remise en état précise et des obligations réglementaires sous-estimées. Cette check-list rassemble ce qu'il faut anticiper, idéalement deux mois avant la date de libération du local.",
      },
      { type: "h2", content: "J-60 : préparer la résiliation du bail" },
      {
        type: "p",
        content:
          "Un bail commercial 3-6-9 se résilie par lettre recommandée avec accusé de réception, six mois avant l'échéance triennale. Vérifiez votre date de tacite reconduction et le préavis exact (souvent trois ou six mois selon le bail). Un état des lieux d'entrée précis est votre meilleur allié : il sert de référence pour la sortie. Si vous ne le retrouvez pas, demandez-le au bailleur immédiatement.",
      },
      { type: "h2", content: "J-30 : inventaire et catégorisation" },
      {
        type: "p",
        content:
          "Faites un inventaire rapide en cinq catégories :",
      },
      {
        type: "ul",
        items: [
          "Mobilier déménageable (suit dans les nouveaux locaux).",
          "Mobilier à céder ou donner (associations professionnelles, recycleurs).",
          "Matériel informatique et électronique (DEEE — voir ci-dessous).",
          "Données et archives (RGPD — voir ci-dessous).",
          "Encombrants et déchets non valorisables (déchèterie pro).",
        ],
      },
      { type: "h2", content: "Gestion DEEE : obligations" },
      {
        type: "p",
        content:
          "Les équipements électriques et électroniques (DEEE) sont soumis à la directive européenne 2012/19/UE. En tant que professionnel, vous êtes responsable de leur orientation vers une filière agréée et devez conserver un bordereau de suivi pendant cinq ans. Le débarrasseur que vous mandatez doit pouvoir vous fournir ce bordereau avec votre nom de société comme producteur. À défaut, l'amende administrative peut atteindre plusieurs milliers d'euros.",
      },
      { type: "h2", content: "RGPD : destruction sécurisée des données" },
      {
        type: "p",
        content:
          "Les disques durs, sauvegardes, archives papier confidentielles doivent être détruits selon un protocole sécurisé. La CNIL recommande la destruction physique ou la dégaussage pour les supports magnétiques, et le déchiquetage croisé niveau P-5 minimum pour les documents papier sensibles. Un prestataire spécialisé fournit un certificat de destruction nominatif, à conserver dans votre dossier de conformité RGPD.",
      },
      { type: "h2", content: "J-7 : intervention et coordination bailleur" },
      {
        type: "p",
        content:
          "Idéalement, l'intervention de débarras a lieu une semaine avant l'état des lieux de sortie, pour laisser le temps à un dernier nettoyage. Nous coordonnons avec votre bailleur ou son agence si nécessaire, et fournissons photos avant/après pour étayer la demande de restitution du dépôt de garantie. Pour les locaux en activité jusqu'à la dernière minute, l'intervention peut se faire le weekend, sans surcoût significatif. Selon votre rétroplanning, vous pouvez <a href=\"/contact\">planifier l'intervention coordonnée avec votre bailleur en quelques clics</a>.",
      },
      { type: "h2", content: "Coûts indicatifs sur Bordeaux Métropole" },
      {
        type: "p",
        content:
          "Pour un bureau standard de 80 m² avec mobilier classique, comptez entre 1 200 € et 1 800 €. Pour un plateau de 300 m² avec démontage de cloisons, jusqu'à 5 000 €. Les certificats DEEE et RGPD sont inclus dans nos tarifs si vous les demandez.",
      },
      {
        type: "callout",
        content:
          "Pour les déménagements d'entreprise multi-sites, demandez un devis groupé. Une équipe coordonnée traite plusieurs locaux en parallèle, avec une réduction de coût significative.",
        tone: "info",
      },
    ],
    related: [
      "prix-debarras-gironde-2026",
      "acteur-local-bordeaux-region",
      "eco-responsable-33-40-47",
    ],
  },

  // ============================================================
  //  9. Valorisation et brocante
  // ============================================================
  {
    slug: "valorisation-brocante-nouvelle-aquitaine",
    titre:
      "Valorisation et brocante : comment réduire sa facture de débarras en Nouvelle-Aquitaine ?",
    excerpt:
      "Antiquaires, brocanteurs, vide-greniers, ventes aux enchères : les bons réflexes pour transformer des objets en compensation financière avant un débarras.",
    metaDescription:
      "Réduire sa facture de débarras en valorisant ses objets : antiquaires, brocanteurs, enchères en Nouvelle-Aquitaine. Conseils L'Espace Libre.",
    publishedAt: "2026-04-21",
    readingTimeMin: 6,
    category: "Valorisation",
    tags: ["valorisation", "brocante", "antiquaire", "enchères"],
    auteur: AUTEUR,
    blocks: [
      {
        type: "p",
        content:
          "Avant tout débarras, une question mérite d'être posée : que peut-on valoriser, et auprès de qui ? Une partie significative des biens présents dans un logement à débarrasser peut être vendue, ce qui réduit la facture finale. Voici les bons réflexes pour identifier le valorisable et trouver les bons interlocuteurs en Nouvelle-Aquitaine.",
      },
      { type: "h2", content: "Ce qui se vend en 2026" },
      {
        type: "p",
        content:
          "Le marché de l'occasion connaît des cycles. Voici ce qui se vend bien actuellement :",
      },
      {
        type: "ul",
        items: [
          "Mobilier scandinave des années 50-70 (Wegner, Jacobsen, et leurs équivalents français).",
          "Vaisselle ancienne (Bernardaud, Limoges, Sèvres) en bon état.",
          "Vinyles, surtout jazz, rock et chanson française des années 50-80.",
          "Livres anciens (avant 1900) en bon état, et éditions originales du XXᵉ.",
          "Bijoux, montres anciennes, pièces en argent (cours métal incompressible).",
          "Vins de garde (voir notre article dédié au patrimoine viticole).",
          "Outils anciens, instruments de musique vintage, jouets en métal d'avant 1970.",
        ],
      },
      { type: "h2", content: "À qui s'adresser ?" },
      {
        type: "p",
        content:
          "Quatre catégories d'acheteurs, selon le type d'objet :",
      },
      {
        type: "ol",
        items: [
          "Antiquaires — pour le mobilier de qualité, les objets décoratifs, les bijoux anciens. En Gironde, la rue Notre-Dame à Bordeaux concentre les antiquaires sérieux.",
          "Brocanteurs et vide-greniers — pour les lots moyens, sans valeur exceptionnelle mais avec du potentiel. Les vide-greniers de Talence et de Pessac le dimanche sont fréquentés.",
          "Commissaires-priseurs — pour les pièces rares, les collections, les vins de garde. Maître Briscadieu et Baron-Ribeyre & Associés sont les références girondines.",
          "Ventes en ligne (Selency, eBay, Vinted) — pour les particuliers, sans intermédiaire, mais demande du temps et de la logistique.",
        ],
      },
      { type: "h2", content: "Faire estimer avant de jeter" },
      {
        type: "p",
        content:
          "Le réflexe le plus rentable : faire estimer gratuitement les pièces douteuses. Beaucoup d'antiquaires et de commissaires-priseurs proposent des expertises gracieuses sur photos. Vous évitez ainsi de jeter un objet qui aurait pu compenser le coût du débarras. À L'Espace Libre, nous identifions sur place les pièces susceptibles d'avoir une valeur et vous orientons systématiquement vers une estimation avant tout déplacement.",
      },
      { type: "h2", content: "Notre démarche : pas de prise d'intérêt" },
      {
        type: "p",
        content:
          "Certains débarrasseurs proposent une prestation « gratuite » en échange de la propriété de tous les biens valorisables. Nous refusons ce modèle : il pousse à minimiser la valorisation auprès du client et conduit à des conflits d'intérêt. Notre démarche est inverse : nous facturons notre intervention au volume, et vous gardez la totale liberté sur ce que vous souhaitez valoriser avant notre arrivée. Pour anticiper le coût net après valorisation, vous pouvez <a href=\"/contact\">estimer en ligne le débarras au volume restant</a>.",
      },
      { type: "h2", content: "Limites : l'illusion de la valeur" },
      {
        type: "p",
        content:
          "Beaucoup d'objets qu'on pense précieux ne le sont plus. Le mobilier rustique en chêne massif, les services à thé des grands-mères, les pendules de salon, les services en porcelaine non signés : le marché de l'occasion est saturé et les prix ont chuté. N'investissez pas de temps déraisonnable dans la valorisation de ces objets — donnez-les plutôt à une association.",
      },
      {
        type: "callout",
        content:
          "En moyenne, valoriser une partie des biens permet de réduire la facture de débarras de 10 à 30 %. Pour les cas exceptionnels (collections, mobilier de qualité), la valorisation peut couvrir l'intégralité du coût.",
        tone: "info",
      },
    ],
    related: [
      "cave-chai-patrimoine-viticole",
      "eco-responsable-33-40-47",
      "prix-debarras-gironde-2026",
    ],
  },

  // ============================================================
  //  10. Acteur local Bordeaux
  // ============================================================
  {
    slug: "acteur-local-bordeaux-region",
    titre:
      "Débarras urgent : pourquoi choisir un acteur local basé à Bordeaux pour intervenir en région ?",
    excerpt:
      "Réactivité, connaissance du terrain, frais kilométriques transparents, engagements locaux : ce qu'apporte un débarrasseur ancré à Bordeaux pour les interventions en Nouvelle-Aquitaine.",
    metaDescription:
      "Débarras urgent en Nouvelle-Aquitaine : pourquoi choisir un acteur local basé à Bordeaux. Réactivité, terrain, transparence. L'Espace Libre.",
    publishedAt: "2026-04-18",
    readingTimeMin: 5,
    category: "Acteur local",
    tags: ["acteur local", "bordeaux", "urgence", "régional"],
    auteur: AUTEUR,
    blocks: [
      {
        type: "p",
        content:
          "Quand un débarras doit se faire en urgence — succession, déménagement précipité, situation d'insalubrité signalée — le choix du prestataire est critique. Les grands réseaux nationaux promettent souvent la rapidité, mais c'est l'ancrage local qui fait la différence dans l'exécution. Voici pourquoi choisir un acteur basé à Bordeaux peut être préférable à un opérateur centralisé, même pour une intervention dans les Landes ou en Lot-et-Garonne.",
      },
      { type: "h2", content: "Réactivité réelle, pas téléphonique" },
      {
        type: "p",
        content:
          "Un prestataire national vous répond en moins d'une heure, c'est vrai. Mais cette réactivité concerne le commercial, pas l'intervention. L'équipe physique sur le terrain est sous-traitée, souvent sans contact préalable. Un acteur local possède son équipe propre, ses véhicules, son matériel. La réactivité commerciale et la réactivité opérationnelle sont identiques : 48 heures pour les petits volumes, sept jours pour les grosses interventions, sans intermédiaire.",
      },
      { type: "h2", content: "Connaissance fine du terrain" },
      {
        type: "p",
        content:
          "Un débarrasseur girondin connaît son territoire :",
      },
      {
        type: "ul",
        items: [
          "Les déchèteries professionnelles de chaque commune et leurs horaires.",
          "Les associations partenaires fiables (Emmaüs, Le Relais, ressourceries locales).",
          "Les autorités administratives à contacter pour les autorisations de stationnement.",
          "Les commissaires-priseurs, antiquaires et brocanteurs susceptibles de valoriser.",
          "Les particularités de l'habitat local (échoppes bordelaises, maisons landaises, fermes lot-et-garonnaises).",
        ],
      },
      { type: "h2", content: "Frais kilométriques transparents" },
      {
        type: "p",
        content:
          "Pour une intervention hors Bordeaux Métropole, le coût du déplacement est inévitable. La question est de savoir s'il est annoncé clairement avant l'intervention, ou intégré opaquement dans un tarif global. À L'Espace Libre, les frais kilométriques sont explicites : 0 € sur la CUB, forfait de 65 € en Gironde hors CUB, 0,60 € par kilomètre depuis Bordeaux Centre pour les départements limitrophes. Vous savez à l'euro près ce que coûte le déplacement, et pouvez <a href=\"/contact\">obtenir un devis indicatif intégrant les frais kilométriques</a> en quelques secondes.",
      },
      { type: "h2", content: "Engagements locaux concrets" },
      {
        type: "p",
        content:
          "Un acteur local s'inscrit dans son écosystème territorial. Nous travaillons avec des associations girondines (Emmaüs Bordeaux, Le Relais Gironde), des ressourceries locales, des artisans de réparation. Nos camions sont entretenus par des garages bordelais. Notre comptable est à Pessac. Ces choix maintiennent une économie locale et donnent à votre intervention une circularité que les grands réseaux ne peuvent pas offrir.",
      },
      { type: "h2", content: "Et l'intervention à 150 km, alors ?" },
      {
        type: "p",
        content:
          "Une question légitime : un acteur bordelais est-il vraiment compétitif pour intervenir à Mont-de-Marsan, Agen ou Capbreton ? La réponse dépend du volume. Pour un débarras de petit volume (cave, garage), un acteur local de la commune cible reste préférable. Pour un volume moyen à important (maison entière, succession, Diogène), notre coût intégral — main d'œuvre + frais kilométriques + qualité d'exécution — reste très compétitif, et la coordination centralisée depuis Bordeaux est souvent plus simple à gérer pour les héritiers à distance.",
      },
      {
        type: "callout",
        content:
          "Pour les interventions hors Gironde, notre Simulateur intègre les frais kilométriques dans le devis. Vous savez immédiatement à combien revient l'intervention complète.",
        tone: "info",
      },
    ],
    related: [
      "centre-ville-versus-ferme-isolee",
      "prix-debarras-gironde-2026",
      "diogene-bordeaux-mont-de-marsan",
    ],
  },

  // ============================================================
  //  11. Succession / Conflit familial / Notaire
  // ============================================================
  {
    slug: "debarras-maison-indivision-desaccord-gironde",
    titre: "Désaccord entre héritiers et indivision : comment débloquer légalement le débarras d'une maison en Gironde ?",
    excerpt: "Découvrez les solutions juridiques pour procéder au débarras d'une maison en indivision bloquée par un conflit familial, avec l'aide du notaire.",
    metaDescription: "Conflit familial et indivision : comment débloquer le débarras d'une maison en Gironde. Solutions juridiques, rôle du notaire et accompagnement.",
    publishedAt: "2026-05-18",
    readingTimeMin: 7,
    category: "Succession",
    tags: ["succession", "indivision", "notaire", "conflit familial", "gironde"],
    auteur: AUTEUR,
    blocks: [
      {
        type: "p",
        content: "Le décès d'un proche est souvent suivi de formalités complexes, particulièrement lorsque la fratrie ou les héritiers sont en désaccord. En situation d'indivision, l'incapacité à s'entendre sur le partage ou la vente des biens peut geler complètement un bien immobilier. Ce blocage génère des frais (taxes, entretien) et empêche la mise sur le marché. En Gironde, le notaire reste le chef d'orchestre pour sortir de cette impasse et mandater légalement l'évacuation du logement. Pour préparer le dossier, vous pouvez <a href=\"/contact\">obtenir une estimation rapide de l'opération</a> à présenter aux co-indivisaires."
      },
      { type: "h2", content: "Le cadre légal de l'indivision" },
      {
        type: "p",
        content: "Par défaut, les décisions importantes concernant un bien en indivision requièrent l'unanimité. Cependant, pour éviter la paralysie, la loi permet qu'une décision d'administration (comme le nettoyage ou la sécurisation) soit prise à la majorité des deux tiers. Si le désaccord persiste et met le bien en péril, il est même possible de demander une autorisation judiciaire. C'est dans ce cadre strictement réglementé que notre équipe intervient en <a href='/services/succession-notaire' style='color: var(--cr-emerald-500); text-decoration: underline; font-weight: 500;'>coordination avec votre notaire pour un débarras de succession sécurisé</a>."
      },
      { type: "h2", content: "L'inventaire : la clé pour rassurer toutes les parties" },
      {
        type: "p",
        content: "Lorsqu'il y a suspicion de recel successoral ou simple méfiance, la transparence est vitale. Le notaire ou un commissaire-priseur peut réaliser un inventaire officiel. De notre côté, nous appliquons un protocole de traçabilité strict. Chaque meuble, chaque document personnel trouvé est répertorié. Si la maison de famille doit être vidée, nous isolons les objets litigieux et assurons un <a href='/services/succession-notaire' style='color: var(--cr-emerald-500); text-decoration: underline; font-weight: 500;'>débarras encadré par le notaire</a>, garantissant qu'aucun bien ne disparaît."
      },
      {
        type: "callout",
        content: "Ne procédez jamais au vidage partiel ou total du logement sans l'accord écrit des co-indivisaires ou un mandat clair du notaire, au risque d'être accusé de recel successoral.",
        tone: "warning"
      }
    ],
    related: ["succession-nouvelle-aquitaine", "deces-insalubrite-cadre-legal", "prix-debarras-gironde-2026"],
  },

  // ============================================================
  //  12. Logique Seniors / Transition de vie
  // ============================================================
  {
    slug: "depart-ehpad-debarras-logement-senior-bordeaux",
    titre: "Départ en EHPAD dans le 33 : organiser le débarras bienveillant du logement d'un proche âgé",
    excerpt: "Accompagner un parent âgé en maison de retraite implique souvent de vider son domicile. Conseils pour un débarras respectueux et efficace en Gironde.",
    metaDescription: "Départ en EHPAD ou maison de retraite en Gironde (33) : organiser le débarras du logement d'un parent âgé avec bienveillance et rapidité.",
    publishedAt: "2026-05-19",
    readingTimeMin: 6,
    category: "Logistique",
    tags: ["EHPAD", "senior", "transition", "bordeaux", "famille"],
    auteur: AUTEUR,
    blocks: [
      {
        type: "p",
        content: "Le départ d'un parent en EHPAD ou en résidence senior est une étape de vie bouleversante. Pour les enfants, c'est souvent une course contre la montre : il faut aménager la nouvelle chambre, gérer les démarches administratives, et surtout, libérer l'ancien logement, parfois loué avec un préavis très court. Ce moment exige une organisation sans faille pour ne pas ajouter de l'épuisement à la charge émotionnelle. Pour gagner du temps dès le premier jour, vous pouvez <a href=\"/contact\">estimer en ligne le coût du débarras complet du logement</a> sans engagement."
      },
      { type: "h2", content: "Séparer l'essentiel de l'encombrant" },
      {
        type: "p",
        content: "La première étape consiste à sélectionner les quelques meubles et objets personnels qui accompagneront votre proche dans sa nouvelle chambre (fauteuil, cadres, souvenirs). La chambre d'EHPAD étant exiguë, la majeure partie d'une vie entière restera sur place. C'est à ce stade qu'un professionnel peut intervenir pour vous soulager. Notre équipe propose une solution de <a href='/services/debarras-maison-appartement' style='color: var(--cr-emerald-500); text-decoration: underline; font-weight: 500;'>débarras d'appartement complet et clés en main</a>."
      },
      { type: "h2", content: "Déléguer pour se concentrer sur l'essentiel" },
      {
        type: "p",
        content: "Trier les affaires de toute une vie demande des semaines d'effort physique. Pour respecter les délais de préavis de l'ancien logement sans vous épuiser, il est conseillé de confier l'évacuation massive des meubles, du gros électroménager et de la vaisselle restante. Nous gérons le tri, le don aux associations (Le Relais, Emmaüs) et la mise en déchèterie. Le <a href='/services/debarras-maison-appartement' style='color: var(--cr-emerald-500); text-decoration: underline; font-weight: 500;'>vidage de la maison est réalisé en toute sérénité</a>, vous permettant de passer ce temps précieux auprès de votre parent."
      }
    ],
    related: ["prix-debarras-gironde-2026", "eco-responsable-33-40-47", "acteur-local-bordeaux-region"],
  },

  // ============================================================
  //  13. Cave, Garage, Grenier / Risques cachés
  // ============================================================
  {
    slug: "vider-grenier-amiante-plomb-nouvelle-aquitaine",
    titre: "Vider un vieux grenier ou une grange en Nouvelle-Aquitaine : risques cachés et précautions",
    excerpt: "L'intervention dans un grenier ancien ou une grange expose à de multiples dangers. Focus sur l'amiante, le plomb et la sécurité.",
    metaDescription: "Risques liés au vidage d'un vieux grenier ou grange en Nouvelle-Aquitaine : amiante, plomb, nuisibles. Précautions indispensables et intervention professionnelle.",
    publishedAt: "2026-05-20",
    readingTimeMin: 5,
    category: "Logistique",
    tags: ["grenier", "grange", "sécurité", "amiante", "nouvelle-aquitaine"],
    auteur: AUTEUR,
    blocks: [
      {
        type: "p",
        content: "Vider le grenier d'une bâtisse rurale ou d'une maison ancienne en Nouvelle-Aquitaine n'est pas une simple corvée de week-end. Ces espaces, souvent laissés à l'abandon pendant des décennies, concentrent des risques sanitaires et structurels insoupçonnés. Plancher vermoulu, poussières toxiques, amiante ou nids de frelons asiatiques : la prudence est de mise avant d'entamer la moindre manutention. Pour évaluer l'opération sans vous exposer, vous pouvez <a href=\"/contact\">chiffrer une intervention sécurisée par une équipe équipée</a> à partir de simples photos."
      },
      { type: "h2", content: "Les ennemis invisibles : Amiante et Plomb" },
      {
        type: "p",
        content: "Dans les maisons construites avant 1997, l'isolation des combles, les conduits ou les plaques de toiture peuvent contenir de l'amiante. De même, les vieilles malles et portes empilées recèlent souvent des peintures au plomb qui s'écaillent. Remuer ces éléments libère des particules extrêmement nocives. Faire appel à des professionnels équipés pour un <a href='/services/cave-garage-grenier' style='color: var(--cr-emerald-500); text-decoration: underline; font-weight: 500;'>débarras de grenier et espaces confinés</a> est indispensable pour éviter l'inhalation de ces substances."
      },
      { type: "h2", content: "Salubrité, nuisibles et accès difficiles" },
      {
        type: "p",
        content: "Outre les substances toxiques, l'accumulation de cartons et de vieux tissus attire les rongeurs, qui dégradent le matériel et déposent des agents pathogènes. S'ajoute à cela la difficulté de descendre des meubles massifs par des trappes étroites ou des échelles de meunier. Plutôt que de risquer une chute grave, notre service de <a href='/services/cave-garage-grenier' style='color: var(--cr-emerald-500); text-decoration: underline; font-weight: 500;'>désencombrement sécurisé de combles et dépendances</a> apporte les moyens techniques nécessaires : EPI complets, éclairage portatif, et même monte-meuble si la configuration l'exige."
      }
    ],
    related: ["cave-chai-patrimoine-viticole", "centre-ville-versus-ferme-isolee", "eco-responsable-33-40-47"],
  },

  // ============================================================
  //  14. B2B / Immobilier / Gestion de crise
  // ============================================================
  {
    slug: "debarras-squat-expulsion-bordeaux",
    titre: "Fin de squat, vandalisme ou expulsion à Bordeaux : le protocole d'urgence pour sécuriser un bien immobilier",
    excerpt: "Comment gérer le nettoyage et le débarras d'un logement insalubre après un squat ou une expulsion sur Bordeaux et la Gironde.",
    metaDescription: "Débarras après squat ou expulsion à Bordeaux : protocole d'urgence, désinfection, sécurisation pour bailleurs et agences immobilières.",
    publishedAt: "2026-05-21",
    readingTimeMin: 7,
    category: "Pro & entreprises",
    tags: ["squat", "expulsion", "immobilier", "urgence", "bordeaux"],
    auteur: AUTEUR,
    blocks: [
      {
        type: "p",
        content: "Récupérer son bien immobilier après une période de squat, un acte de vandalisme ou une expulsion complexe est une épreuve choquante pour un propriétaire bailleur. L'état de dégradation des lieux (détritus jonchant le sol, portes fracturées, risques biologiques, déjections) nécessite une réaction rapide pour remettre le bien sur le marché et éviter l'intrusion de nouveaux occupants illégaux. Pour activer le protocole sans délai, vous pouvez <a href=\"/contact\">obtenir un devis d'urgence pour sécuriser et vider le bien</a> sous quelques heures."
      },
      { type: "h2", content: "Sécurisation immédiate et protocole d'intervention" },
      {
        type: "p",
        content: "La première urgence est la sécurisation des accès (fermeture provisoire ou remplacement des serrures) en parallèle avec le retrait de tous les déchets volumineux. Nous collaborons étroitement avec les syndics de copropriété et les agences de gestion locative pour exécuter un <a href='/services/bureaux-locaux-professionnels' style='color: var(--cr-emerald-500); text-decoration: underline; font-weight: 500;'>vidage intensif du local immobilier</a> endommagé. Les matelas souillés, le mobilier cassé et les gravats sont rapidement extraits pour laisser place à l'évaluation des travaux."
      },
      { type: "h2", content: "Désinfection et remise en état locatif" },
      {
        type: "p",
        content: "Au-delà de la logistique, l'insalubrité liée à un squat exige une désinfection lourde (produits bactéricides et fongicides). Les déchets potentiellement toxiques ou coupants (seringues, verre brisé) sont évacués vers les filières appropriées. En mandatant notre expertise pour une <a href='/services/bureaux-locaux-professionnels' style='color: var(--cr-emerald-500); text-decoration: underline; font-weight: 500;'>remise en état professionnelle de votre bien commercial ou résidentiel</a>, vous vous assurez d'une restitution saine, prête pour l'intervention de vos artisans rénovateurs."
      }
    ],
    related: ["bureaux-merignac-pessac", "diogene-bordeaux-mont-de-marsan", "acteur-local-bordeaux-region"],
  },

  // ============================================================
  //  15. Garage / Traitement des déchets toxiques
  // ============================================================
  {
    slug: "debarras-garage-produits-chimiques-gironde",
    titre: "Peintures, solvants et batteries : comment vider un garage en Gironde en respectant les normes d'éco-toxicité ?",
    excerpt: "La gestion des déchets toxiques stockés dans un garage requiert une filière spécialisée. Comprendre la réglementation en Gironde.",
    metaDescription: "Débarras de garage en Gironde et recyclage des déchets toxiques (peintures, solvants, batteries). Filières spécialisées et normes éco-toxicité.",
    publishedAt: "2026-05-22",
    readingTimeMin: 6,
    category: "Éco-responsabilité",
    tags: ["garage", "produits chimiques", "recyclage", "toxicité", "gironde"],
    auteur: AUTEUR,
    blocks: [
      {
        type: "p",
        content: "Le garage est souvent le lieu de stockage des produits dont on ne sait que faire. Bidons de white-spirit à moitié vides, vieux pots de peinture durcie, huiles de vidange de la tondeuse, liquides de refroidissement, batteries usagées... Au moment de déménager, ces produits chimiques (DDS - Déchets Diffus Spécifiques) se révèlent être un véritable casse-tête, car il est strictement interdit de les jeter aux ordures ménagères ou de les vider dans les égouts. Plutôt que de prendre des risques, vous pouvez <a href=\"/contact\">déléguer l'évacuation conforme à un débarrasseur certifié</a> en quelques clics."
      },
      { type: "h2", content: "Les risques d'un mauvais traitement" },
      {
        type: "p",
        content: "Outre le risque d'amende et de pollution grave des nappes phréatiques, la manipulation de produits inflammables ou toxiques anciens expose à des brûlures chimiques et des intoxications. Faire appel à des professionnels pour un <a href='/services/cave-garage-grenier' style='color: var(--cr-emerald-500); text-decoration: underline; font-weight: 500;'>débarras de garage spécialisé</a> garantit que chaque déchet liquide ou pâteux sera trié, conditionné en toute sécurité et manipulé avec l'équipement de protection adéquat."
      },
      { type: "h2", content: "La filière des Déchets Diffus Spécifiques" },
      {
        type: "p",
        content: "À L'Espace Libre, notre charte éco-responsable englobe la totalité des déchets, y compris les plus nocifs. Lors de la libération de votre atelier, nous organisons l'acheminement des pneus, huiles et solvants vers les points de collecte industriels spécialisés (ÉcoDDS, filières de retraitement régionales). Ce niveau de rigueur environnementale, inhérent à notre offre de <a href='/services/cave-garage-grenier' style='color: var(--cr-emerald-500); text-decoration: underline; font-weight: 500;'>désencombrement de dépendances</a>, est la garantie d'une intervention conforme aux réglementations d'éco-toxicité en Nouvelle-Aquitaine."
      }
    ],
    related: ["eco-responsable-33-40-47", "cave-garage-grenier", "prix-debarras-gironde-2026"],
  }
] as const;

// ============================================================
//  Helpers
// ============================================================
export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}

export function getRelatedPosts(post: BlogPost, max = 3): BlogPost[] {
  const slugs = post.related ?? [];
  return slugs
    .map((slug) => getPost(slug))
    .filter((p): p is BlogPost => Boolean(p))
    .slice(0, max);
}

/** Articles triés par date décroissante. */
export function getPostsByDateDesc(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );
}
