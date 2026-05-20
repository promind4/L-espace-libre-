/**
 * Données entreprise — placeholders v1.1.
 * Le PO remplacera les valeurs marquées TODO avant la mise en ligne.
 * Alimente :
 *   - le Footer
 *   - le JSON-LD LocalBusiness (toutes pages locales)
 *   - les pages mentions légales et CGV
 */

export const BUSINESS = {
  nom: "L'Espace Libre",
  raisonSociale: "L'Espace Libre",
  siret: "", // À renseigner lors de la mise en ligne définitive (lancement V1 — test marché).
  formeJuridique: "",
  capital: "",

  adresse: {
    rue: "TODO Adresse Bordeaux Centre",
    codePostal: "33000",
    ville: "Bordeaux",
    pays: "FR",
  },

  contact: {
    telephone: "+33 5 00 00 00 00", // TODO PO
    telephoneAffichage: "05 00 00 00 00", // TODO PO
    email: "contact@lespace-libre.fr",
    // Adresse de réception back-office des leads — validée par le PO (R12).
    emailLeads: process.env["LEADS_INBOX_EMAIL"] ?? "leads@lespacelibre.fr",
  },

  // Conservation RGPD des leads — validée par le PO (R11).
  conservationRgpdMois: 36,

  assurance: {
    nom: "Responsabilité Civile Professionnelle",
    // Mention générique uniquement (V1 — test marché) :
    // « Interventions couvertes par une Responsabilité Civile Professionnelle ».
    // Les coordonnées précises (compagnie, n° de police) seront ajoutées
    // après souscription, dès la première demande de devis validée.
    compagnie: "",
    police: "",
  },

  reseauxSociaux: {
    // Liens facultatifs ; chaîne vide = lien masqué.
    facebook: "",
    instagram: "",
    linkedin: "",
  },

  /** Coordonnées géographiques pour le JSON-LD LocalBusiness. */
  geo: {
    latitude: 44.8378,
    longitude: -0.5792,
  },

  /** Plage horaire de prise de contact. */
  horaires: {
    lundiVendredi: "08:00–19:00",
    samedi: "09:00–17:00",
    dimanche: "Fermé",
  },
} as const;
