/**
 * Helpers SEO — métadonnées et JSON-LD.
 *
 * Source unique pour la composition des titres, descriptions et
 * données structurées des pages locales et services. Évite la
 * duplication entre `generateMetadata` et les composants JSON-LD.
 */
import { SITE } from "@/config/site";
import { BUSINESS } from "@/config/business";
import type { Zone } from "@/content/zones";
import type { Service, ServiceFaqItem } from "@/content/services";
import type { BlogPost } from "@/content/blog/types";

// ============================================================
//  Titres et descriptions par département — Phase 2 SEO
//  Formules figées par la feuille de route meta.md §5
//  (Programmatic SEO « cocon local »). Gabarit unique pour
//  toutes les communes desservies — la matrice 33/40/47 partage
//  la même syntaxe : ${nom} (${codePostal}) | Maisons & Pro.
//
//  Ces chaînes sont injectées via `title.absolute` dans la page
//  dynamique pour court-circuiter le template du layout racine
//  (« %s | L'Espace Libre ») et tenir le budget des 60 caractères.
// ============================================================
export function buildZoneTitle(zone: Zone): string {
  return `Débarras ${zone.nom} (${zone.codePostal}) | Maisons & Pro`;
}

export function buildZoneDescription(zone: Zone): string {
  return `Entreprise de débarras intégral à ${zone.nom} (${zone.codePostal}). Évacuation complète de maisons, appartements, caves et bureaux. Obtenez votre devis en ligne.`;
}

/**
 * H1 visible servi dans le Hero de la page commune. Formule premium
 * mais exhaustive (cf. meta.md §5) : valide instantanément l'intention
 * de recherche du visiteur (particulier OU professionnel local).
 */
export function buildZoneH1(zone: Zone): string {
  return `Débarras à ${zone.nom} : Maisons, Locaux et Encombrants`;
}

/**
 * Délai d'intervention typique selon la distance depuis Bordeaux Centre.
 * Utilisé sur les pages locales et dans le JSON-LD si pertinent.
 */
export function buildDelaiIntervention(zone: Zone): string {
  return "Intervention de 48 heures à 10 jours";
}

// ============================================================
//  JSON-LD builders
// ============================================================

/** Schema.org LocalBusiness pour une page locale. */
export function buildLocalBusinessJsonLd(zone: Zone) {
  const url = `${SITE.url.replace(/\/$/, "")}/zones/${zone.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": url,
    name: `${BUSINESS.nom} — ${zone.nom}`,
    description: zone.metaDescription,
    url,
    image: `${SITE.url.replace(/\/$/, "")}${SITE.defaultOgImage}`,
    telephone: BUSINESS.contact.telephone,
    email: BUSINESS.contact.email,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      addressLocality: zone.nom,
      postalCode: zone.codePostal,
      addressRegion: zone.region,
      addressCountry: "FR",
    },
    geo:
      zone.departement === "33"
        ? {
            "@type": "GeoCoordinates",
            latitude: BUSINESS.geo.latitude,
            longitude: BUSINESS.geo.longitude,
          }
        : undefined,
    areaServed: {
      "@type": "City",
      name: zone.nom,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "17:00",
      },
    ],
  };
}

// ============================================================
//  LocalBusiness global — page d'accueil
// ============================================================

/** Schema.org LocalBusiness pour la page d'accueil (signal SEO local principal). */
export function buildSiteLocalBusinessJsonLd() {
  const baseUrl = SITE.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": baseUrl,
    name: BUSINESS.nom,
    description: SITE.description,
    url: baseUrl,
    telephone: BUSINESS.contact.telephone,
    email: BUSINESS.contact.email,
    image: `${baseUrl}${SITE.defaultOgImage}`,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.adresse.rue,
      addressLocality: BUSINESS.adresse.ville,
      postalCode: BUSINESS.adresse.codePostal,
      addressCountry: BUSINESS.adresse.pays,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Gironde" },
      { "@type": "AdministrativeArea", name: "Landes" },
      { "@type": "AdministrativeArea", name: "Lot-et-Garonne" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "17:00",
      },
    ],
  };
}

// ============================================================
//  Service JSON-LD
// ============================================================
/**
 * Balise <title> exacte issue de la matrice meta.md §4.
 * Injectée via `title.absolute` pour bypass le template du layout.
 */
export function buildServiceTitle(service: Service): string {
  return service.seoTitle;
}

export function buildServiceDescription(service: Service): string {
  return service.metaDescription;
}

/** H1 visible affiché dans le Hero de la page service (meta.md §4). */
export function buildServiceH1(service: Service): string {
  return service.seoH1;
}

/** Schema.org Service pour une page service. */
export function buildServiceJsonLd(service: Service) {
  const url = `${SITE.url.replace(/\/$/, "")}/services/${service.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": url,
    name: service.titre,
    description: service.intro,
    url,
    serviceType: "Débarras professionnel",
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS.nom,
      telephone: BUSINESS.contact.telephone,
      email: BUSINESS.contact.email,
      url: SITE.url,
      address: {
        "@type": "PostalAddress",
        addressLocality: BUSINESS.adresse.ville,
        postalCode: BUSINESS.adresse.codePostal,
        addressCountry: BUSINESS.adresse.pays,
      },
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Gironde (33)" },
      { "@type": "AdministrativeArea", name: "Landes (40)" },
      { "@type": "AdministrativeArea", name: "Lot-et-Garonne (47)" },
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      url,
    },
  };
}

/** Schema.org FAQPage à partir d'une liste de Q/R. */
export function buildFaqPageJsonLd(items: readonly ServiceFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

// ============================================================
//  Article (blog) JSON-LD
// ============================================================
export function buildArticleTitle(post: BlogPost): string {
  return `${post.titre} | Blog L'Espace Libre`;
}

export function buildArticleDescription(post: BlogPost): string {
  return post.metaDescription;
}

/** Schema.org Article pour un article de blog. */
export function buildArticleJsonLd(post: BlogPost) {
  const url = `${SITE.url.replace(/\/$/, "")}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": url,
    headline: post.titre,
    description: post.metaDescription,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.auteur,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS.nom,
      url: SITE.url,
    },
    articleSection: post.category,
    keywords: post.tags.join(", "),
    inLanguage: "fr-FR",
  };
}

/** Schema.org BreadcrumbList. Le dernier item n'a volontairement pas d'`item`. */
export function buildBreadcrumbList(
  items: Array<{ name: string; url?: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.url ? { item: it.url } : {}),
    })),
  };
}

// ============================================================
//  Page À propos
// ============================================================

/**
 * AboutPage JSON-LD avec sub-organisation (founder, address, areaServed).
 * Pas de fausses données : on s'appuie sur `SITE` et `BUSINESS` du repo.
 */
export function buildAboutPageJsonLd(opts: {
  founderName: string;
  description: string;
}) {
  const baseUrl = SITE.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `À propos de ${SITE.nom}`,
    url: `${baseUrl}/a-propos`,
    description: opts.description,
    mainEntity: {
      "@type": "Organization",
      name: BUSINESS.nom,
      legalName: BUSINESS.nom,
      url: baseUrl,
      areaServed: ["Gironde", "Landes", "Lot-et-Garonne"],
      founder: {
        "@type": "Person",
        name: opts.founderName,
      },
    },
  };
}
