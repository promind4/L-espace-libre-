/**
 * Données de la page FAQ exhaustive (/faq).
 *
 * 8 catégories × ~4 questions = 35 questions au total. Inspiré du
 * périmètre SEO d'acteurs leader du secteur (Les Compagnons
 * Débarrasseurs, 80+ questions) mais réécrit dans la voix de marque
 * L'Espace Libre : FR-FR vouvoiement, calme, factuel, aucun emoji,
 * aucune exclamation.
 *
 * Couverture sémantique large pour favoriser le ranking sur des
 * requêtes long-tail (« peut-on payer après la vente d'une maison »,
 * « débarras maison sans entrer », etc.).
 *
 * Les réponses supportent une syntaxe inline minimale :
 *   **gras**  → <strong>
 *   [texte](/url) → <a href="/url">
 */

import type { IconName } from "@/components/ui/Icon";

export interface FaqItem {
  /** Slug d'ancre pour le sommaire et le lien direct. */
  id: string;
  q: string;
  a: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  icon: IconName;
  description: string;
  items: readonly FaqItem[];
}

export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  // ============================================================
  //  1. Tarifs et devis
  // ============================================================
  {
    id: "tarifs",
    title: "Tarifs et devis",
    icon: "calculator",
    description: "Comment se calcule un devis, ce qu'il inclut et ce qui peut le faire varier.",
    items: [
      {
        id: "combien-coute-debarras",
        q: "Combien coûte un débarras en Gironde ?",
        a: "Le tarif dépend du **volume à évacuer**, du type de bien, de l'**accessibilité** (étage, ascenseur, stationnement) et de la valeur des biens revendables. À titre indicatif sur Bordeaux Métropole : une **cave de 15 m²** se situe entre 290 € et 390 €, un **appartement T3 de 60 m²** entre 940 € et 1 270 €, une **maison de 120 m²** entre 2 740 € et 3 710 €. Le devis ferme arrive **sous 2 heures** après envoi de quelques photos. [Obtenez une estimation immédiate](/contact) via notre formulaire.",
      },
      {
        id: "facteurs-prix",
        q: "Quels facteurs influencent le prix d'un débarras ?",
        a: "Quatre paramètres majeurs : le **volume à évacuer** (calculé à partir de la surface et d'un coefficient de densité), l'**étage et l'accessibilité** (un troisième étage sans ascenseur majore de 30 %), la **salubrité du bien** (poussiéreux × 1,2 / insalubre × 1,5 / Diogène × 2,5) et la **distance** au-delà de Bordeaux Métropole (forfait Gironde hors CUB ou frais kilométriques au-delà du département).",
      },
      {
        id: "devis-gratuit",
        q: "Le devis est-il vraiment gratuit et sans engagement ?",
        a: "Oui, intégralement. Notre devis ferme par photo est gratuit, ne déclenche aucun engagement contractuel et n'implique **aucun appel commercial non sollicité**. Si vous ne donnez pas suite, vos coordonnées sont conservées 3 ans à compter du dernier contact (RGPD), puis effacées. Vous pouvez demander leur effacement immédiat à tout moment.",
      },
      {
        id: "acompte-paiement",
        q: "Faut-il payer un acompte à la signature du devis ?",
        a: "**Aucun acompte n'est exigé** à la signature. Le paiement intervient au plus tôt à la fin de l'intervention, après votre validation de l'état rendu du logement. Pour les volumes importants ou les interventions sur plusieurs jours, un échéancier peut être convenu avant intervention, toujours sans avance.",
      },
      {
        id: "facture-debarras",
        q: "Recevez-vous une facture en bonne et due forme ?",
        a: "Oui. Chaque intervention donne lieu à une **facture conforme** (article 289 du CGI) avec mention de la TVA, du SIRET, du détail des prestations et du volume évacué. Pour une succession ou une fin de bail, nous joignons sur demande des **photos avant/après**, un **bordereau de tri** et un **récapitulatif des dons** réalisés.",
      },
    ],
  },

  // ============================================================
  //  2. Délais et planning d'intervention
  // ============================================================
  {
    id: "delais",
    title: "Délais et intervention",
    icon: "zap",
    description: "Quand intervenons-nous, sous combien de temps, et comment se déroule la journée.",
    items: [
      {
        id: "delai-intervention",
        q: "Sous combien de temps intervenez-vous après acceptation du devis ?",
        a: "Nous intervenons de **48 heures à 10 jours** après acceptation du devis, parfois le jour même pour les urgences. Le déplacement est programmé avec un calendrier convenu à l'avance pour optimiser les trajets dans toute notre zone d'intervention (Gironde, Landes, Lot-et-Garonne).",
      },
      {
        id: "intervention-urgente",
        q: "Pouvez-vous intervenir en urgence ?",
        a: "Oui, dans la limite des disponibilités. Les motifs typiques d'urgence : **vente notariée imminente**, **fin de bail commercial**, **problème sanitaire signalé par la mairie ou l'ARS**, **logement squatté venant d'être libéré**. Précisez le contexte dès la prise de contact — nous priorisons en fonction du caractère contraignant du délai.",
      },
      {
        id: "duree-debarras",
        q: "Combien de temps prend un débarras complet ?",
        a: "Pour un **appartement standard de 60 m²**, une journée complète (8 h). Pour une **maison de 120 m² avec dépendances**, 2 à 3 jours. Pour une **cave ou un garage** isolé, 3 à 6 heures. Un cas de **syndrome de Diogène** ou d'insalubrité majeure peut demander 3 à 7 jours selon l'état.",
      },
      {
        id: "presence-pendant",
        q: "Faut-il être présent pendant l'intervention ?",
        a: "Non, ce n'est pas obligatoire. Beaucoup de nos clients nous remettent les clés (directement, via leur notaire, leur syndic ou leur agence). Nous restituons les clés au mandataire à la fin et vous envoyons un compte-rendu photo de l'état rendu. C'est particulièrement utile en cas de **succession à distance**.",
      },
      {
        id: "intervention-weekend",
        q: "Intervenez-vous le samedi, le dimanche ou en soirée ?",
        a: "Oui, le **samedi sans majoration** sur Bordeaux Métropole. Le **dimanche et les jours fériés** restent possibles pour des cas justifiés (continuité d'exploitation, urgence sanitaire) avec une majoration de 25 %. Les **interventions en soirée** sont privilégiées pour les locaux professionnels actifs, sans surcoût significatif.",
      },
    ],
  },

  // ============================================================
  //  3. Succession et héritiers
  // ============================================================
  {
    id: "succession",
    title: "Succession et héritiers",
    icon: "scroll-text",
    description: "Coordination avec le notaire, biens désignés, justificatifs et délais successoraux.",
    items: [
      {
        id: "qui-paie-debarras-succession",
        q: "Qui paie le débarras dans le cadre d'une succession ?",
        a: "Les frais de débarras sont supportés par les **héritiers**, généralement déduits de l'actif successoral si le notaire l'approuve. En cas d'**indivision**, l'accord écrit de tous les héritiers (ou du mandataire successoral) est requis avant intervention. Nous pouvons facturer après vente du bien immobilier si toutes les parties signent un accord en ce sens.",
      },
      {
        id: "delai-succession",
        q: "Combien de temps a-t-on pour vider une maison après un décès ?",
        a: "Aucun délai légal strict ne s'impose pour le débarras lui-même. En revanche, la **succession doit être acceptée ou refusée dans les 6 mois** (article 768 du Code civil). Si le bien est mis en vente, l'acheteur exige généralement un logement vide au compromis ou à l'acte — comptez 1 à 3 mois selon les termes négociés.",
      },
      {
        id: "objets-valeur-succession",
        q: "Que devient un objet de valeur découvert pendant le débarras ?",
        a: "Tout objet susceptible d'avoir une valeur marchande ou sentimentale (bijoux, montres, œuvres, archives, espèces) est **immédiatement mis de côté, photographié et remis au mandataire** (notaire, héritier référent, exécuteur testamentaire). Nous ne disposons d'aucun bien découvert sans accord écrit explicite.",
      },
      {
        id: "coordination-notaire",
        q: "Travaillez-vous directement avec les notaires ?",
        a: "Oui, régulièrement. Plusieurs études girondines nous mandatent. Nous adaptons notre protocole aux exigences de l'étude : **inventaire écrit préalable**, **conservation des biens désignés**, **justificatifs annexés au dossier de succession**, **planning aligné sur l'instruction notariale** et la date de vente éventuelle.",
      },
      {
        id: "heritier-desaccord",
        q: "Que se passe-t-il en cas de désaccord entre héritiers ?",
        a: "Nous attendons l'**arbitrage du notaire** ou la **nomination d'un mandataire successoral** par le tribunal. Nous ne nous substituons jamais à une décision familiale et n'intervenons qu'avec un mandat écrit clair. Si la succession est bloquée par un litige, nous pouvons reporter l'intervention en attendant sa résolution.",
      },
    ],
  },

  // ============================================================
  //  4. Syndrome de Diogène et insalubrité
  // ============================================================
  {
    id: "diogene",
    title: "Diogène et insalubrité",
    icon: "sparkles",
    description: "Cas critiques, protocole spécifique, confidentialité et aides financières.",
    items: [
      {
        id: "syndrome-diogene-definition",
        q: "Qu'est-ce que le syndrome de Diogène, exactement ?",
        a: "Le syndrome de Diogène associe une **accumulation compulsive d'objets sans valeur**, un retrait social progressif et une **incurie domestique** (rétention d'aliments, déchets, parfois animaux). Il touche tous les milieux sociaux, plus fréquemment les personnes âgées isolées. Le repérage est souvent fait par les services sociaux, le syndic ou la famille au moment d'un événement (chute, hospitalisation, décès).",
      },
      {
        id: "debarras-diogene-cout",
        q: "Combien coûte un débarras pour un cas de Diogène ?",
        a: "Le coefficient de salubrité **Diogène (× 2,5)** s'applique à l'évaluation standard. Pour une maison de 100 m² en cas Diogène classé en zone CUB, comptez environ **4 355 €** hors options. À ce tarif s'ajoutent éventuellement : **désinsectisation** ou **dératisation** (sous-traitance agréée), **décontamination renforcée** si fluides corporels ou nuisibles avérés.",
      },
      {
        id: "diogene-protocole",
        q: "Quel protocole appliquez-vous sur un cas critique ?",
        a: "Un **diagnostic préalable confidentiel** est systématique. L'intervention suit trois temps : **évacuation** en EPI complet (combinaison, masque FFP3, gants nitrile), **nettoyage profond** aux produits virucides, **désinsectisation/dératisation** si nécessaire (sous-traitance agréée). Les déchets dangereux rejoignent les **filières réglementaires** (DASRI, déchets diffus ménagers) avec bordereaux conformes.",
      },
      {
        id: "diogene-aides-financieres",
        q: "Existe-t-il des aides financières pour un cas Diogène ?",
        a: "Plusieurs dispositifs peuvent couvrir tout ou partie : **FSL** (Fonds de Solidarité Logement), **APA** (Allocation Personnalisée d'Autonomie), **fonds municipaux d'urgence** (CCAS), **assurance habitation** (clause dégât des eaux ou catastrophe sanitaire selon contrat). Nous orientons les familles vers les bons interlocuteurs et adaptons la facturation au tiers payeur (Conseil départemental, CCAS, mandataire judiciaire).",
      },
    ],
  },

  // ============================================================
  //  5. Éco-responsabilité et tri
  // ============================================================
  {
    id: "eco",
    title: "Éco-responsabilité et tri",
    icon: "recycle",
    description: "Où vont vos objets, quelles filières, quels justificatifs.",
    items: [
      {
        id: "que-deviennent-objets",
        q: "Que deviennent les objets que vous emportez ?",
        a: "Nous appliquons une **charte 0 gaspillage**. Trois flux principaux : **don aux associations locales** (Emmaüs Gironde, Le Relais 33, ressourceries girondines) pour le mobilier et l'électroménager en bon état ; **recyclage en filières agréées** (DEEE pour l'électronique, métaux, textiles) ; **déchèterie professionnelle 33** pour les encombrants non valorisables. Seul l'irrécupérable rejoint la filière déchets.",
      },
      {
        id: "loi-agec",
        q: "Êtes-vous conformes à la loi AGEC sur le tri ?",
        a: "Oui. La **loi AGEC** (Anti-Gaspillage pour une Économie Circulaire, 2020-2022) impose un tri sélectif strict et l'utilisation de filières agréées pour les déchets professionnels. Nous tenons à jour les bordereaux de suivi, accessibles sur demande pour vos déclarations administratives ou notariales.",
      },
      {
        id: "valorisation-deduite",
        q: "La valorisation des biens réduit-elle le devis ?",
        a: "Oui, dans une certaine mesure. Le mobilier ancien, l'électroménager récent, les livres, vinyles et **vins de garde** sont identifiés à la prise de devis et leur valeur estimative est **déduite du tarif final**. Pour les **caves à vin de valeur** (cas fréquent en Bordelais), nous proposons une expertise complémentaire par un commissaire-priseur partenaire.",
      },
      {
        id: "justificatif-dons",
        q: "Fournissez-vous un récapitulatif des dons réalisés ?",
        a: "Oui, sur demande. Le récapitulatif liste les **associations destinataires**, les **catégories et quantités** de biens transmis, et les **dates** de remise. Utile pour la conscience des héritiers, parfois pour des **déductions fiscales** si vous êtes une entreprise donatrice (vérifier avec votre comptable).",
      },
    ],
  },

  // ============================================================
  //  6. Assurance, sécurité et confidentialité
  // ============================================================
  {
    id: "assurance",
    title: "Assurance et confidentialité",
    icon: "shield-check",
    description: "Couverture professionnelle, sécurité des biens, confidentialité absolue.",
    items: [
      {
        id: "assurance-rc-pro",
        q: "Êtes-vous assurés en responsabilité civile professionnelle ?",
        a: "Oui, intégralement. Notre **assurance Responsabilité Civile Professionnelle** est souscrite auprès d'un assureur français. L'**attestation est jointe à chaque devis** avant signature et couvre vos biens, votre logement, le bâtiment (parties communes) et nos intervenants pendant toute la durée de la mission.",
      },
      {
        id: "degats-pendant-intervention",
        q: "Que se passe-t-il en cas de dégât accidentel ?",
        a: "Tout dommage (parquet rayé, mur abîmé, dégât chez un voisin) est **constaté contradictoirement**, photographié, et déclaré à notre assurance dans les 5 jours ouvrés. L'indemnisation intervient selon les termes du contrat. C'est l'une des différences majeures avec un intervenant non assuré : votre patrimoine reste protégé.",
      },
      {
        id: "confidentialite",
        q: "Garantissez-vous la confidentialité de l'intervention ?",
        a: "Oui, par **charte écrite**. Aucune information personnelle, aucune photo, aucun témoignage public n'est partagé sans votre accord exprès. Les voisins ne sont informés que si nous devons utiliser des parties communes (montée d'escalier, parking). Pour les cas Diogène et les successions sensibles, nous appliquons un protocole de discrétion renforcé.",
      },
      {
        id: "equipe-formee",
        q: "Vos intervenants sont-ils formés et déclarés ?",
        a: "Oui. Tous nos intervenants sont **salariés ou auto-entrepreneurs déclarés**, équipés des EPI réglementaires, formés à la manutention, au port de charge et au tri sélectif. Pour les cas Diogène, l'équipe est spécialisée et formée à la gestion psychologique des situations sensibles.",
      },
    ],
  },

  // ============================================================
  //  7. Zones d'intervention
  // ============================================================
  {
    id: "zones",
    title: "Zones d'intervention",
    icon: "map-pin",
    description: "Où nous nous déplaçons, frais kilométriques, communes desservies.",
    items: [
      {
        id: "zones-couvertes",
        q: "Quelles communes desservez-vous ?",
        a: "Nous intervenons dans **toute la Gironde** (534 communes), avec une présence renforcée sur **Bordeaux Métropole** (Bordeaux, Mérignac, Pessac, Talence, Bègles, Le Bouscat et 22 autres communes de la CUB). Nous nous déplaçons également dans les **Landes (40)** et le **Lot-et-Garonne (47)** pour les interventions programmées. Pour les communes au-delà, contactez-nous : nous étudions chaque demande au cas par cas.",
      },
      {
        id: "frais-kilometriques",
        q: "Y a-t-il des frais kilométriques ?",
        a: "**Sur Bordeaux Métropole (CUB) : 0 €**, pas de frais de déplacement. **Gironde hors CUB** : forfait de 65 €. **Hors département** (Landes, Lot-et-Garonne, autres) : 0,60 €/km depuis Bordeaux Centre, arrondi à l'euro, indiqué clairement sur le devis. Aucun frais caché ne s'ajoute après signature.",
      },
      {
        id: "intervention-rurale",
        q: "Intervenez-vous dans les zones rurales et isolées ?",
        a: "Oui, particulièrement pour les **fermes**, les **maisons de campagne en succession** et les **chai/cave viticole**. Le devis intègre les frais kilométriques et le temps de trajet. Pour les volumes importants, l'intervention peut être étalée sur 2 à 3 jours avec hébergement de l'équipe à proximité — solution généralement plus économique qu'un aller-retour quotidien.",
      },
      {
        id: "centre-ville-acces",
        q: "Comment gérez-vous les accès difficiles en centre-ville bordelais ?",
        a: "Bordeaux, Bègles, La Bastide et plusieurs quartiers historiques imposent des **contraintes de stationnement** (zones piétonnes, rues étroites, autorisations municipales). Nous demandons l'**arrêté de stationnement temporaire** auprès de la mairie 5 jours avant l'intervention. Pour les **immeubles haussmanniens** sans ascenseur, nous adaptons l'équipe (monte-meubles si nécessaire, factuel sur le devis).",
      },
    ],
  },

  // ============================================================
  //  8. Estimation en ligne (formulaire de demande de devis)
  // ============================================================
  {
    id: "simulateur",
    title: "Estimation et demande de devis",
    icon: "calculator",
    description: "Comment fonctionne notre formulaire en ligne, sa précision, et la transformation en devis ferme.",
    items: [
      {
        id: "comment-fonctionne-formulaire",
        q: "Comment fonctionne le formulaire d'estimation en ligne ?",
        a: "Notre [formulaire de demande de devis](/contact) collecte en un coup d'œil les informations utiles : **type de bien** (maison, appartement, cave/garage), **surface approximative** (en m²), précisions d'accès et vos coordonnées. Une **fourchette indicative** s'affiche à mesure que vous remplissez. Au final, votre demande nous parvient avec votre estimation, et notre équipe revient vers vous sous deux heures ouvrées avec un devis ferme. Aucune création de compte requise.",
      },
      {
        id: "estimation-precise",
        q: "L'estimation indicative est-elle précise ?",
        a: "Oui, dans une fourchette de **±15 % autour du nominal**. C'est une estimation basée sur des paramètres standardisés (salubrité « normale », zone CUB par défaut). Pour le **devis ferme**, nous affinons sur photo en intégrant la salubrité réelle, l'accessibilité précise, les frais kilométriques éventuels et la valorisation des biens identifiables.",
      },
      {
        id: "donnees-personnelles-formulaire",
        q: "Que faites-vous de mes coordonnées laissées sur le formulaire ?",
        a: "Vos coordonnées servent **uniquement** à traiter votre demande de devis et à vous transmettre l'estimation et le devis ferme. Aucun e-mail commercial sortant non sollicité, aucune revente, aucun transfert tiers. Les données sont conservées **3 ans à compter du dernier contact** (RGPD), puis effacées. Vous pouvez demander leur effacement immédiat à tout moment via [contact](/contact).",
      },
      {
        id: "passer-formulaire-devis",
        q: "Comment passer d'une estimation à un devis ferme ?",
        a: "Après réception de votre fourchette par e-mail, envoyez-nous **5 à 10 photos du bien** (chaque pièce, dépendances, accès). Sous **2 heures ouvrées**, vous recevez un devis ferme et détaillé avec attestation d'assurance jointe. Aucune visite physique n'est requise dans la majorité des cas — c'est ce qui nous permet de tenir la promesse des 2 h.",
      },
    ],
  },
] as const;

/** Aplatit toutes les questions pour le JSON-LD FAQPage. */
export function getAllFaqItems(): FaqItem[] {
  return FAQ_CATEGORIES.flatMap((c) => c.items);
}
