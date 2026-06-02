/**
 * Footer — Refonte immersive : fond texturé N&B, 4 colonnes full-width,
 * bande sous-footer verte avec couleurs exactes de la charte.
 * Logo circulaire complet (texte + arbre) en bandeau de tête.
 */
import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/content/services";
import { BUSINESS } from "@/config/business";

export function Footer() {
  const year = new Date().getFullYear();

  // Titres courts des services (on extrait avant le premier ":" ou "&" si trop long).
  // Les `?? s.titre` couvrent le cas (théorique) où `split` retournerait un tableau
  // sans premier élément — type-safety stricte (noUncheckedIndexedAccess).
  const serviceLinks = SERVICES.map((s) => {
    const beforeColon = s.titre.split(":")[0] ?? s.titre;
    const beforeAmp = beforeColon.split("&")[0] ?? beforeColon;
    return {
      slug: s.slug,
      titre: beforeAmp.trim(),
    };
  });

  return (
    <footer style={{ position: "relative", color: "#fff", display: "flex", flexDirection: "column" }}>

      {/* ===== SECTION PRINCIPALE ===== */}
      <div style={{ position: "relative", paddingBlock: "48px", overflow: "hidden" }}>

        {/* Image de fond N&B + voile sombre.
            Migrée vers `next/image` (Phase 3) pour bénéficier de la
            conversion AVIF/WebP serveur, du srcset responsive et du
            lazy-loading par défaut. Le footer est sur toutes les pages :
            le gain bande passante est massif.
            `alt=""` car purement décoratif (la sémantique vient du contenu). */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundColor: "#0C1F33" }}>
          <Image
            src="/images/footer.avif"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            style={{ objectFit: "cover", filter: "grayscale(100%)", opacity: 0.35 }}
          />
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.80)" }} />
        </div>

        {/* Contenu full-width (pas de .container pour briser les marges) */}
        <div style={{ position: "relative", zIndex: 1, width: "100%", padding: "0 48px", boxSizing: "border-box" }}>

          {/* Logo de marque — bandeau de tête */}
          <Link
            href="/"
            className="footer-brand-link"
            aria-label="L'Espace Libre — accueil"
            style={{ display: "inline-flex", marginBottom: "24px" }}
          >
            <Image
              src="/logo.png"
              alt="L'Espace Libre"
              width={80}
              height={80}
              sizes="80px"
              className="footer-brand-logo"
              style={{ display: "block", height: "auto", width: "80px" }}
            />
          </Link>

          <p style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#82D2BC",
            marginBottom: "32px",
          }}>
            POUR NOUS CONTACTER
          </p>

          <div className="footer-grid">

            {/* COL 1 — ADRESSE */}
            <div className="footer-col">
              <h3 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#82D2BC", marginBottom: "12px" }}>
                Adresse
              </h3>
              <p style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: "rgba(255,255,255,0.88)", margin: 0 }}>
                {BUSINESS.adresse.rue}<br />
                {BUSINESS.adresse.codePostal} {BUSINESS.adresse.ville}
              </p>
            </div>

            {/* COL 2 — CONTACT */}
            <div className="footer-col">
              <h3 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#82D2BC", marginBottom: "12px" }}>
                Contact
              </h3>
              <p style={{ fontSize: "1.5rem", fontWeight: 800, margin: "0 0 8px", color: "#fff", letterSpacing: "-0.01em" }}>
                {BUSINESS.contact.telephoneAffichage}
              </p>
              <a href="/contact" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", textDecoration: "underline" }}>
                Formulaire de contact
              </a>
            </div>

            {/* COL 3 — HORAIRES */}
            <div className="footer-col">
              <h3 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#82D2BC", marginBottom: "12px" }}>
                Horaires
              </h3>
              <p style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: "rgba(255,255,255,0.88)", margin: 0 }}>
                Ouvert toute la semaine :<br />
                <strong style={{ color: "#fff" }}>7j/7 de 8h à 20h</strong>
              </p>
            </div>

            {/* COL 4 — NOS SERVICES (titres bruts uniquement) */}
            <div className="footer-col">
              <h3 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#82D2BC", marginBottom: "12px" }}>
                Nos Services
              </h3>
              <ul className="footer-services-list" style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "5px" }}>
                {serviceLinks.map((s) => (
                  <li key={s.slug}>
                    <a
                      href={`/services/${s.slug}`}
                      style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.82)", textDecoration: "none" }}
                    >
                      {s.titre}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* BLOC CTA */}
            <div className="footer-cta-cell">
              <a
                href="/contact"
                className="footer-cta-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 28px",
                  backgroundColor: "#0E8F70",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.9375rem",
                  borderRadius: "999px",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  border: "2px solid #0E8F70",
                  transition: "background-color 140ms ease, border-color 140ms ease",
                }}
              >
                Demander un devis
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BANDE SOUS-FOOTER — Vert exact de la charte ===== */}
      <div className="footer-bottom" style={{ backgroundColor: "#0A6E55", paddingBlock: "14px" }}>
        <div className="footer-bottom-inner" style={{
          width: "100%",
          padding: "0 48px",
          boxSizing: "border-box",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }}>
          <div className="footer-bottom-links" style={{ display: "flex", flexWrap: "wrap", gap: "24px", fontSize: "0.8125rem", fontWeight: 500 }}>
            <a href="/mentions-legales" style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none" }}>Mentions Légales</a>
            <a href="/politique-de-confidentialite" style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none" }}>Politique de Confidentialité</a>
            <a href="/cgv" style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none" }}>CGV</a>
            <a href="/plan-du-site" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>Plan du site</a>
          </div>
          <div className="footer-bottom-copy" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
            © {year} {BUSINESS.nom} — Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
}
