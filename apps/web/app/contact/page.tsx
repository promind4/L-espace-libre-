import type { Metadata } from "next";
import { ContactQuoteForm } from "@/components/contact/ContactQuoteForm";
import { Spark } from "@/components/ui/Spark";
import { Tier } from "@/components/ui/Tier";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/config/site";
import { BUSINESS } from "@/config/business";
import { buildBreadcrumbList } from "@/lib/seo";

/**
 * /contact — page de conversion principale (redesign v3).
 *
 * Remplace l'ancien Simulator wizard 3 étapes par un formulaire plat
 * unique (Concept D). Tous les liens « Estimation gratuite » du site
 * pointent désormais sur cette page.
 *
 * Server Component qui embarque un Client Component pour le formulaire.
 */

const TITLE = `Estimation gratuite & contact — ${SITE.nom}`;
const DESCRIPTION =
  "Demandez votre devis de débarras en quelques secondes. Estimation indicative immédiate, devis ferme sous 2 heures après vos photos. Aucun engagement.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE.url.replace(/\/$/, "")}/contact` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url.replace(/\/$/, "")}/contact`,
  },
};

export default function ContactPage() {
  const baseUrl = SITE.url.replace(/\/$/, "");

  const breadcrumb = buildBreadcrumbList([
    { name: "Accueil", url: `${baseUrl}/` },
    { name: "Estimation et contact" },
  ]);

  // ContactPoint JSON-LD pour signaler que cette page est le point
  // d'entrée principal de contact pour l'entreprise.
  const contactPoint = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: TITLE,
    url: `${baseUrl}/contact`,
    description: DESCRIPTION,
    mainEntity: {
      "@type": "Organization",
      name: BUSINESS.nom,
      url: baseUrl,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: BUSINESS.contact.email,
        availableLanguage: ["French"],
        areaServed: ["FR-33", "FR-40", "FR-47"],
      },
    },
  };

  return (
    <main>
      <JsonLd data={[contactPoint, breadcrumb]} />

      {/* ===== Hero (Tier Light) ===== */}
      <Tier variant="light" as="header" rhythmIndex={1}>
        <div
          className="container"
          style={{ maxWidth: 1080, textAlign: "center" }}
        >
          <span
            className="tier__eyebrow"
            style={{ justifyContent: "center" }}
          >
            <Spark size={14} />
            Estimation gratuite
          </span>
          <h1
            style={{
              fontSize: "clamp(32px, 4vw + 1rem, 56px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              color: "var(--cr-navy-950)",
              margin: "0 0 20px",
              textWrap: "balance",
            }}
          >
            Une corvée, deux heures, <em style={{ color: "var(--cr-emerald-600)", fontStyle: "normal" }}>un devis ferme.</em>
          </h1>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: "var(--cr-pearl-700)",
              maxWidth: 60,
              margin: "0 auto",
              maxInlineSize: "60ch",
            }}
          >
            Renseignez votre projet ci-dessous. Vous recevez une fourchette
            indicative immédiate, puis un devis ferme sous deux heures
            ouvrées après envoi de quelques photos. Aucun engagement,
            aucun acompte demandé.
          </p>
        </div>
      </Tier>

      {/* ===== Formulaire (Tier Paper — grille blueprint) ===== */}
      <Tier variant="paper" as="section" rhythmIndex={2}>
        <div className="container">
          <ContactQuoteForm />
        </div>
      </Tier>

      {/* ===== Alternative directe par e-mail (Tier Light) ===== */}
      <Tier variant="light" as="section" rhythmIndex={3}>
        <div
          className="container"
          style={{ maxWidth: 760, textAlign: "center" }}
        >
          <span
            className="tier__eyebrow"
            style={{ justifyContent: "center" }}
          >
            <Spark size={14} />
            Préférez l&apos;e-mail direct
          </span>
          <h2
            style={{
              fontSize: "clamp(24px, 2vw + 1rem, 32px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--cr-navy-950)",
              margin: "0 0 14px",
            }}
          >
            Une question avant de remplir le formulaire&nbsp;?
          </h2>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.65,
              color: "var(--cr-pearl-700)",
              margin: "0 0 24px",
            }}
          >
            Écrivez-nous directement à{" "}
            <a
              href={`mailto:${BUSINESS.contact.email}`}
              style={{
                color: "var(--cr-emerald-700)",
                fontWeight: 600,
              }}
            >
              {BUSINESS.contact.email}
            </a>
            . Nous répondons sous deux heures ouvrées.
          </p>
        </div>
      </Tier>
    </main>
  );
}
