/**
 * Hero — Sprint R2 (redesign v2) + ajustement v3.
 *
 * Le slider Avant/Après a été retiré : le slot visuel droit est
 * désormais un placeholder prêt à recevoir une image globale.
 *
 * Si un fichier est présent à
 * `apps/web/public/images/hero/equipe-intervention.jpg`, il s'affiche
 * automatiquement (via lib/resolve-image). Sinon, le placeholder
 * élégant reste affiché et le code ne plante pas.
 */
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Spark } from "@/components/ui/Spark";
import { Tier } from "@/components/ui/Tier";
import Image from "next/image";
import { resolveImage } from "@/lib/resolve-image";

export function Hero() {
  const heroImage = resolveImage("/images/hero/equipe-intervention.jpg");

  return (
    <Tier variant="deep" as="section" rhythmIndex={1} className="hero" style={{ position: "relative", minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--cr-navy-900)", color: "#f8fafc", textAlign: "center", padding: "4rem 0", overflow: "hidden" }}>
      {/* Image de fond hero (AVIF, source 278 KB pour 3 MB initiaux).
          `priority` car c'est le LCP de la home. */}
      <Image
        src="/images/hero/A2.avif"
        alt="Équipe L'Espace Libre en intervention de débarras à Bordeaux — Gironde et Nouvelle-Aquitaine"
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center" }}
        sizes="100vw"
      />
      
      {/* Background Overlay (60% opacity pour contraste absolu) */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 1 }} />
      
      <div className="container" style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "800px" }}>
        <span className="hero__eyebrow" style={{ display: "inline-flex", justifyContent: "center", color: "var(--cr-emerald-600)", fontWeight: 600 }}>
          <Spark size={14} />
          Bordeaux Métropole &amp; Nouvelle-Aquitaine
        </span>

        <h1 style={{ color: "#fff", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
          Votre espace libéré
          <br />
          en <em style={{ color: "var(--cr-emerald-300)", fontStyle: "normal" }}>Gironde</em> en quelques heures.
        </h1>

        <p className="hero__lead" style={{ color: "var(--cr-pearl-200)", fontSize: "1.25rem", maxWidth: "600px", margin: "0 auto 2.5rem" }}>
          Débarras complet, tri responsable, devis final sous 2&nbsp;h par
          photo. Une corvée stressante devient une logistique fluide.
        </p>

        <div className="hero__actions" style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: "3rem" }}>
          <a 
            className="btn btn--primary btn--lg btn-sweep-anim" 
            href="/contact"
            style={{ position: "relative", overflow: "hidden" }}
          >
            Estimation gratuite
            <Icon name="arrow-right" size={18} />
            {/* Effet de balayage brillant via CSS */}
            <span
              style={{ pointerEvents: "none" }}
              className="sweep-overlay absolute inset-0 z-10 block rounded-[inherit]"
            />
          </a>
          <Link className="btn btn--secondary btn--lg" href="/services" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}>
            Voir nos services
          </Link>
        </div>

        <style>{`
          .btn-sweep-anim:active {
            transform: scale(0.95);
            transition: transform 0.1s;
          }
          .sweep-overlay {
            background: linear-gradient(-75deg, transparent 0%, rgba(255,255,255,0.4) 15%, transparent 30%);
            background-size: 200% 100%;
            animation: sweep-bg 2.5s infinite;
          }
          @keyframes sweep-bg {
            0% { background-position: 200% 0; }
            100% { background-position: -100% 0; }
          }
        `}</style>

        <div className="hero__proof" style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
          <span className="hero__proof-item" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#ffffff", fontWeight: 500 }}>
            <Icon name="shield-check" size={18} />
            Assurance RC Pro incluse
          </span>
          <span className="hero__proof-item" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#ffffff", fontWeight: 500 }}>
            <Icon name="recycle" size={18} />
            Charte 0 gaspillage
          </span>
          <span className="hero__proof-item" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#ffffff", fontWeight: 500 }}>
            <Icon name="zap" size={18} />
            Devis sous 2 h
          </span>
        </div>
      </div>
    </Tier>
  );
}
