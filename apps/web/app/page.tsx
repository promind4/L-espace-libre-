import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { StatsBand } from "@/components/marketing/StatsBand";
import { TeamShowcase } from "@/components/marketing/TeamShowcase";
import { HomeServices } from "@/components/marketing/HomeServices";
import { WhyPro } from "@/components/marketing/WhyPro";
import { ProcessSteps } from "@/components/marketing/ProcessSteps";
import { HomeZones } from "@/components/marketing/HomeZones";
import { HomeFAQ } from "@/components/marketing/HomeFAQ";
import { HomeSEOText } from "@/components/marketing/HomeSEOText";
import { resolveImage } from "@/lib/resolve-image";
import { SITE } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildSiteLocalBusinessJsonLd } from "@/lib/seo";

/**
 * Métadonnées HOME — Phase 2 SEO (cf. meta.md §3).
 *
 * Le `title.absolute` court-circuite le `template: "%s | L'Espace Libre"`
 * déclaré dans le layout racine — la formule exacte de la roadmap doit
 * être servie au robot sans suffixe parasite (budget : 56 caractères).
 */
export const metadata: Metadata = {
  title: {
    absolute: "Débarras Gironde & Aquitaine | Maisons, Locaux, Diogène",
  },
  description:
    "Débarras complet en Gironde et Nouvelle-Aquitaine : maisons, locaux, encombrants et syndrome de Diogène. Obtenez votre estimation instantanément.",
  alternates: { canonical: SITE.url },
};

/**
 * Page d'accueil — redesign v3 (Simulator retiré au profit de /contact).
 *
 * Système de rythme en bandeaux du Concept A. Séquence cible :
 *   1 Hero          — Light    CTA « Estimation gratuite » → /contact
 *   2 StatsBand     — Paper    (grille blueprint)
 *   3 TeamShowcase  — Light    (photo + 4 garanties)
 *   4 HomeSEOText   — Paper
 *   5 HomeServices  — Light    (cartes 2×2 numérotées sans icône)
 *   6 WhyPro        — Editorial (manifeste signé du fondateur)
 *   7 ProcessSteps  — Deep
 *   8 HomeFAQ       — Paper
 *   9 HomeZones     — Light
 *   (Footer rendu par le layout — Tier Deep)
 *
 * NB : le Simulator wizard 3 étapes a été retiré de la home par
 * décision PO (17-mai). Le code reste dans `components/simulator/`
 * pour usage admin futur, mais il n'est plus exposé publiquement.
 * Toute conversion passe désormais par /contact (formulaire plat).
 */
export default function HomePage() {
  return (
    <main>
      <JsonLd data={buildSiteLocalBusinessJsonLd()} />
      <Hero />
      <StatsBand />
      {/*
        La photo s'affichera automatiquement dès qu'un fichier sera
        présent à : apps/web/public/images/teck_1.png
      */}
      <TeamShowcase
        mainSrc={resolveImage("/images/teck_1.avif")}
      />
      <HomeSEOText />
      <HomeServices />
      <WhyPro />
      <ProcessSteps />
      <HomeFAQ />
      <HomeZones />
    </main>
  );
}
