import type { Metadata } from "next";
import { AboutPageTemplate } from "@/components/about/AboutPageTemplate";
import { JsonLd } from "@/components/seo/JsonLd";
import { ABOUT } from "@/content/about";
import { SITE } from "@/config/site";
import {
  buildAboutPageJsonLd,
  buildBreadcrumbList,
} from "@/lib/seo";

/**
 * /a-propos — page « Qui sommes-nous » en mode édito magazine.
 *
 * Sprint R4 du redesign v2 (cf. concepts/C-edito.md).
 * Server Component SSG : tout est rendu au build.
 *
 * IMPORTANT — Contenu placeholder :
 * Les chaînes rédactionnelles proviennent de `content/about.ts` et
 * sont marquées TODO PO. À valider avec le fondateur avant la mise
 * en production publique.
 */

const TITLE = `À propos — ${SITE.nom}`;
const DESCRIPTION =
  "L'Espace Libre : un acteur girondin du débarras professionnel. Histoire, fondateur, équipe, engagements légaux et charte 0 gaspillage.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE.url.replace(/\/$/, "")}/a-propos` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url.replace(/\/$/, "")}/a-propos`,
  },
};

export default function AboutPage() {
  const baseUrl = SITE.url.replace(/\/$/, "");

  const jsonLd = [
    buildAboutPageJsonLd({
      founderName: ABOUT.founder.name,
      description: DESCRIPTION,
    }),
    buildBreadcrumbList([
      { name: "Accueil", url: `${baseUrl}/` },
      { name: "À propos" },
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <AboutPageTemplate />
    </>
  );
}
