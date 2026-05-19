import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { getService, getServiceSlugs } from "@/content/services";
import { SITE } from "@/config/site";
import { buildServiceTitle, buildServiceDescription } from "@/lib/seo";

interface RouteParams {
  slug: string;
}

interface PageProps {
  params: Promise<RouteParams>;
}

export function generateStaticParams(): RouteParams[] {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) {
    return { title: "Service inconnu | L'Espace Libre" };
  }
  const title = buildServiceTitle(service);
  const description = buildServiceDescription(service);
  const canonical = `${SITE.url.replace(/\/$/, "")}/services/${service.slug}`;
  // Phase 2 SEO : `title.absolute` bypass le template du layout racine
  // afin de servir la formule exacte de meta.md §4 (budget 60 caract.).
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

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) {
    notFound();
  }
  return (
    <main>
      <ServicePageTemplate service={service} />
    </main>
  );
}
