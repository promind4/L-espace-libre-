import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalPageTemplate } from "@/components/local/LocalPageTemplate";
import { getZone, getZoneSlugs } from "@/content/zones";
import { SITE } from "@/config/site";
import { buildZoneTitle, buildZoneDescription } from "@/lib/seo";

interface RouteParams {
  commune: string;
}

interface PageProps {
  params: Promise<RouteParams>;
}

/**
 * SSG : pré-rend les 25 pages locales au build (Constitution P4.3).
 * Aucune commune non listée ne peut s'afficher — `notFound()` ci-dessous.
 */
export function generateStaticParams(): RouteParams[] {
  return getZoneSlugs().map((commune) => ({ commune }));
}

/** Force le mode statique : pas de fallback dynamique. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { commune } = await params;
  const zone = getZone(commune);
  if (!zone) {
    return { title: "Zone inconnue | L'Espace Libre" };
  }
  const title = buildZoneTitle(zone);
  const description = buildZoneDescription(zone);
  const canonical = `${SITE.url.replace(/\/$/, "")}/zones/${zone.slug}`;
  // Phase 2 SEO : `title.absolute` court-circuite le template
  // « %s | L'Espace Libre » du layout racine — la formule programmatique
  // figée par meta.md §5 doit être servie verbatim au crawler.
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: SITE.locale,
      siteName: SITE.nom,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ZoneCommunePage({ params }: PageProps) {
  const { commune } = await params;
  const zone = getZone(commune);
  if (!zone) {
    notFound();
  }
  return (
    <main>
      <LocalPageTemplate zone={zone} />
    </main>
  );
}
