/**
 * ServicePageTemplate — gabarit unique des 5 pages services.
 *
 * Server Component composant : bandeau, fil d'Ariane, contenu
 * rédactionnel structuré (intro + sections H3), bloc « Inclus »,
 * Simulator (Client) pré-rempli avec `defaultType`, témoignage,
 * FAQ <details>, cross-services, fermeture, JSON-LD complet
 * (Service + FAQPage + BreadcrumbList).
 */
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Spark } from "@/components/ui/Spark";
import { JsonLd } from "@/components/seo/JsonLd";
import { SERVICES, type Service } from "@/content/services";
import { ImageComparison, ImageComparisonImage, ImageComparisonSlider } from "@/components/ui/ImageComparison";
import { ImagePlaceholder } from "@/components/marketing/ImagePlaceholder";
import { resolveImage } from "@/lib/resolve-image";
import { ZONES_BY_DEPARTEMENT } from "@/content/zones";
import { getPostsByDateDesc } from "@/content/blog/posts";
import { SITE } from "@/config/site";
import {
  buildBreadcrumbList,
  buildFaqPageJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo";
import styles from "./ServicePageTemplate.module.css";

export interface ServicePageTemplateProps {
  service: Service;
}

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const baseUrl = SITE.url.replace(/\/$/, "");

  // Cross-services : tous sauf le courant, max 4.
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);

  const jsonLd = [
    buildServiceJsonLd(service),
    buildFaqPageJsonLd(service.faq),
    buildBreadcrumbList([
      { name: "Accueil", url: `${baseUrl}/` },
      { name: "Services", url: `${baseUrl}/services` },
      { name: service.titre },
    ]),
  ];

  // Mapping dynamique des assets Avant / Après (Phase 3 — AVIF responsive).
  // Chaque service expose deux images contextualisées : `alt` enrichi par
  // un libellé Google Images friendly (mot-clé local + verbe d'action).
  const getBeforeAfterImages = (slug: string): {
    avant: string;
    apres: string;
    altPrefix: string;
  } => {
    switch (slug) {
      case "cave-garage-grenier":
        return {
          avant: "garage1.avif",
          apres: "garage2.avif",
          altPrefix: "Désencombrement d'un garage en Gironde",
        };
      case "debarras-maison-appartement":
        return {
          avant: "maison1.avif",
          apres: "maison2.avif",
          altPrefix: "Débarras complet d'une maison à Bordeaux",
        };
      case "succession-notaire":
        return {
          avant: "S1.avif",
          apres: "S2.avif",
          altPrefix: "Débarras de succession en Gironde",
        };
      case "bureaux-locaux-professionnels":
        return {
          avant: "bureaux1.avif",
          apres: "bureaux2.avif",
          altPrefix: "Débarras de bureaux professionnels en Gironde",
        };
      case "nettoyage-extreme-diogene":
        return {
          avant: "dio1.avif",
          apres: "dio2.avif",
          altPrefix: "Nettoyage syndrome de Diogène en Aquitaine",
        };
      default:
        return {
          avant: "garage1.avif",
          apres: "garage2.avif",
          altPrefix: "Intervention de débarras professionnel en Gironde",
        };
    }
  };

  const images = getBeforeAfterImages(service.slug);

  // `bdx.avif` sert d'image hero commune aux pages services
  // (vue de Bordeaux Métropole — territoire d'intervention).
  const heroImage = resolveImage("/images/hero/bdx.avif");

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ===== Bandeau d'en-tête (Tier Deep) ===== */}
      <header
        className={`${styles.hero} tier tier-deep`}
        data-tier="deep"
        data-rhythm-index={1}
        style={{ position: "relative", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--cr-navy-950)", color: "#f8fafc", textAlign: "center", padding: "4rem 0", overflow: "hidden" }}
      >
        {/* Image / Placeholder en fond */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <ImagePlaceholder
            src={heroImage}
            alt={`${service.seoH1.replace(/\.$/, "")} — Bordeaux Métropole & Nouvelle-Aquitaine`}
            label="Image commune Services"
            tone="dark"
            hint="Format paysage HD"
            priority
          />
        </div>

        {/* Background Overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 1 }} />
        
        <div className={styles.heroContainer} style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "800px" }}>
          <span className={styles.heroEyebrow} style={{ display: "inline-flex", justifyContent: "center", color: "var(--cr-emerald-300)" }}>
            <Spark size={14} variant="light" />
            Service · Bordeaux Métropole &amp; Nouvelle-Aquitaine
          </span>
          {/*
            H1 Phase 2 SEO (meta.md §4) — version concise et conversion-
            ciblée par service, distincte du `service.titre` éditorial
            (qui reste utilisé en breadcrumb / footer / JSON-LD).
          */}
          <h1 className={styles.heroTitle} style={{ color: "#fff", fontSize: "clamp(2.5rem, 5vw, 3.5rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            {service.seoH1}
          </h1>
          <p className={styles.heroLead} style={{ color: "var(--cr-pearl-200)", fontSize: "1.25rem", maxWidth: "600px", margin: "0 auto" }}>
            {service.baseline}
          </p>
        </div>
      </header>

      {/* ===== Fil d'Ariane ===== */}
      <nav className="container" aria-label="Fil d'Ariane">
        <div className={styles.breadcrumb}>
          <Link href="/">Accueil</Link>
          <span className={styles.breadcrumbSep} aria-hidden>
            ›
          </span>
          <Link href="/services">Services</Link>
          <span className={styles.breadcrumbSep} aria-hidden>
            ›
          </span>
          <span aria-current="page">{service.titre}</span>
        </div>
      </nav>

      {/* ===== Intro + Inclus ===== */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.split}>
            <div className={styles.prose}>
              <p
                style={{
                  fontSize: "var(--fs-18)",
                  color: "var(--fg-strong)",
                  lineHeight: "var(--lh-relaxed)",
                  marginBottom: "var(--space-6)",
                }}
              >
                {service.intro}
              </p>
              {service.sections.map((section) => (
                <div key={section.heading}>
                  <h3>{section.heading}</h3>
                  <p>{section.body}</p>
                </div>
              ))}
            </div>

            <aside className={styles.includedCard} style={{ height: "fit-content", position: "sticky", top: "120px" }}>
              <h2 className={styles.includedTitle}>
                <Spark size={18} />
                Inclus dans la prestation
              </h2>
              <ul className={styles.includedList}>
                {service.inclus.map((item) => (
                  <li key={item} className={styles.includedItem}>
                    <Spark size={14} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* ===== Confrontation Visuelle (Avant / Après) Full-Width ===== */}
      <section style={{ width: "100%", position: "relative", overflow: "hidden" }}>
        <style dangerouslySetInnerHTML={{__html: `
          .before-after-full {
            width: 100%;
            aspect-ratio: 16/7;
            position: relative;
          }
          @media (min-width: 768px) {
            .before-after-full {
              aspect-ratio: 21/9;
            }
          }
        `}} />
        <div className="before-after-full">
          <ImageComparison enableHover>
            {/*
              Alt SEO enrichis pour Google Images — combinent action,
              localité et terme métier ; format optimisé pour les
              recherches « avant après débarras + ville ».
            */}
            <ImageComparisonImage
              src={`/images/before-after/${images.apres}`}
              alt={`Après — ${images.altPrefix} par L'Espace Libre`}
              position="right"
            />
            <ImageComparisonImage
              src={`/images/before-after/${images.avant}`}
              alt={`Avant — ${images.altPrefix} (état initial)`}
              position="left"
            />
            <ImageComparisonSlider style={{ backgroundColor: "white" }}>
              <div style={{ width: 40, height: 40, backgroundColor: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 10px rgba(0,0,0,0.3)", color: "var(--cr-navy-900)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: -12 }}><path d="M9 18l6-6-6-6"/></svg>
              </div>
            </ImageComparisonSlider>
          </ImageComparison>
          
          {/* Badges */}
          <span style={{ position: "absolute", top: "24px", left: "24px", background: "var(--cr-emerald-600)", color: "white", padding: "6px 16px", borderRadius: 20, fontSize: "14px", fontWeight: 600, pointerEvents: "none", zIndex: 10 }}>
            Après
          </span>
          <span style={{ position: "absolute", top: "24px", right: "24px", background: "rgba(0,0,0,0.7)", color: "white", padding: "6px 16px", borderRadius: 20, fontSize: "14px", fontWeight: 600, pointerEvents: "none", zIndex: 10 }}>
            Avant
          </span>
        </div>
      </section>

      {/* ===== Bandeau CTA vers /contact (remplace l'ancien Simulator) ===== */}
      <section
        className={`${styles.section} tier tier-light`}
        data-tier="light"
        data-rhythm-index={3}
        style={{ textAlign: "center" }}
      >
        <div className="container" style={{ maxWidth: 720 }}>
          <span
            className="tier__eyebrow"
            style={{ justifyContent: "center" }}
          >
            <Spark size={14} />
            Estimation gratuite
          </span>
          <h2
            className={styles.sectionTitle}
            style={{ margin: "0 0 14px" }}
          >
            Combien coûte ce service&nbsp;?
          </h2>
          <p
            className={styles.sectionLead}
            style={{ marginInline: "auto", maxInlineSize: "56ch" }}
          >
            Demandez votre estimation indicative immédiate puis un devis
            ferme sous deux heures après envoi de quelques photos. Aucun
            engagement, aucun acompte.
          </p>
          <a
            className="btn btn--primary btn--lg"
            href="/contact"
            style={{ marginTop: 24 }}
          >
            Demander mon estimation
            <Icon name="arrow-right" size={18} />
          </a>
        </div>
      </section>



      {/* ===== FAQ (Tier Paper) ===== */}
      <section
        className={`${styles.section} tier tier-paper`}
        data-tier="paper"
        data-rhythm-index={5}
      >
        <div className="container">
          <header className={styles.sectionHead}>
            <span
              className={styles.sectionEyebrow}
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <Spark size={14} />
              Questions fréquentes
            </span>
            <h2 className={styles.sectionTitle}>
              Les réponses aux questions qui reviennent souvent.
            </h2>
          </header>
          <div className={styles.faqList}>
            {service.faq.map((item) => (
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqSummary}>{item.q}</summary>
                <p className={styles.faqAnswer}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Cross-services (Tier Light) ===== */}
      <section
        className={`${styles.section} tier tier-light`}
        data-tier="light"
        data-rhythm-index={6}
      >
        <div className="container">
          <header className={styles.sectionHead}>
            <span
              className={styles.sectionEyebrow}
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <Spark size={14} />
              Nos autres services
            </span>
            <h2 className={styles.sectionTitle}>
              D&apos;autres prestations qui pourraient vous concerner.
            </h2>
          </header>
          <div className={styles.servicesGrid}>
            {otherServices.map((s) => (
              <a
                key={s.slug}
                href={`/services/${s.slug}`}
                className={styles.serviceCard}
              >
                <h3 className={styles.serviceCardTitle}>{s.titre}</h3>
                <p className={styles.serviceCardBaseline}>{s.baseline}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Villes majeures (Maillage SEO) ===== */}
      <section className={styles.section}>
        <div className="container">
          <header className={styles.sectionHead}>
            <span className={styles.sectionEyebrow}>Intervention locale</span>
            <h2 className={styles.sectionTitle}>
              Nos principales zones d&apos;intervention pour ce service.
            </h2>
          </header>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {["bordeaux", "merignac", "pessac", "mont-de-marsan", "agen"].map((slug) => {
              const zone = ZONES_BY_DEPARTEMENT["33"]?.find(z => z.slug === slug) 
                        || ZONES_BY_DEPARTEMENT["40"]?.find(z => z.slug === slug)
                        || ZONES_BY_DEPARTEMENT["47"]?.find(z => z.slug === slug);
              if (!zone) return null;
              return (
                <Link key={slug} href={`/zones/${slug}`} className="btn btn--secondary btn--sm" style={{ textDecoration: "none" }}>
                  Débarras à {zone.nom}
                </Link>
              );
            })}
            <Link href="/zones" className="btn btn--secondary btn--sm" style={{ textDecoration: "none" }}>Voir toutes les villes...</Link>
          </div>
        </div>
      </section>

      {/* ===== Derniers articles (Maillage SEO) ===== */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <header className={styles.sectionHead}>
            <span className={styles.sectionEyebrow}>Conseils & Guides</span>
            <h2 className={styles.sectionTitle}>
              Approfondir le sujet.
            </h2>
          </header>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {getPostsByDateDesc().slice(0, 4).map((post) => (
              <a key={post.slug} href={`/blog/${post.slug}`} className={styles.serviceCard}>
                <h3 className={styles.serviceCardTitle}>{post.titre}</h3>
                <p className={styles.serviceCardBaseline}>{post.excerpt}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Fermeture (fond clair pearl, texte navy) ===== */}
      <aside
        className={styles.closing}
        data-tier="light"
        data-rhythm-index={9}
      >
        <div className="container">
          <h3>Prêts à demander une estimation pour {service.titre.toLowerCase()}&nbsp;?</h3>
          <p>
            Trois questions, aucun engagement. Le devis ferme arrive par photo
            sous deux heures pendant les horaires d&apos;ouverture.
          </p>
          <a className={styles.closingCta} href="/contact">
            Demander mon estimation
            <Icon name="arrow-right" size={18} />
          </a>
          <div className="spark-end" style={{ marginTop: 40 }}>
            <Spark size={22} />
          </div>
        </div>
      </aside>
    </>
  );
}
