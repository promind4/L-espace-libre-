/**
 * WhyPro — Sprint R2 (redesign v2) + slot image asymétrique v3.
 *
 * Tier Editorial (filet émeraude vertical à gauche) + slot image
 * vertical asymétrique pleine hauteur à droite (38 % de la largeur,
 * collé au bord d'écran). Le texte reste centré dans sa zone à
 * gauche, le mot émeraude « se mettre à l'abri » est en italique.
 *
 * Si une image est présente à
 * `apps/web/public/images/why-pro/intervention.jpg`, elle s'affiche
 * automatiquement (via lib/resolve-image). Sinon le placeholder
 * élégant reste affiché.
 */
import { Spark } from "@/components/ui/Spark";
import { Tier } from "@/components/ui/Tier";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { resolveImage } from "@/lib/resolve-image";

const BULLETS = [
  "Responsabilité couverte — l'assurance RC Pro indemnise les dégâts accidentels, attestation jointe au devis.",
  "Tri conforme à la loi AGEC — filières DEEE, DASRI, déchèteries 33 avec bordereaux.",
  "Valorisation déduite du devis — mobilier, livres, vinyles, vins identifiés et déduits du tarif final.",
  "Justificatifs administratifs — factures, photos avant/après, bordereaux pour succession, fin de bail ou vente notariée.",
];

export function WhyPro() {
  const image = resolveImage("/images/why-pro/pro.avif");

  return (
    <Tier
      variant="editorial"
      as="section"
      rhythmIndex={7}
      ariaLabelledby="why-pro-title"
      className="why-pro-asymetric"
      style={{ padding: 0 }} // Remove default vertical padding so image can stretch full height
    >
      <div 
        className="why-pro-flex-wrapper"
        style={{
          display: "flex",
          flexDirection: "row-reverse", // Image à GAUCHE, Texte à DROITE
          minHeight: "80vh",
          alignItems: "stretch",
          flexWrap: "wrap",
          position: "relative",
        }}
      >
        {/* Colonne Gauche : Texte centré dans sa propre colonne */}
        <div 
          className="why-pro-text-col"
          style={{
            flex: "1 1 60%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem 2rem",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div style={{ maxWidth: "640px", width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <span className="tier__eyebrow">
              <Spark size={14} />
              Pourquoi un professionnel
            </span>

            <h2
              id="why-pro-title"
              style={{
                fontSize: "clamp(28px, 3vw + 1rem, 42px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "var(--cr-navy-950)",
                margin: "0 0 var(--space-4)",
                textWrap: "balance",
              }}
            >
              Déléguer un débarras, ce n&apos;est pas gagner du temps. C&apos;est
              se mettre à l&apos;abri.
            </h2>

            <p className="manifesto__quote">
              «&nbsp;Un dégât accidentel sur un parquet, un mur, un voisin&nbsp;:
              l&apos;assurance RC Pro indemnise. Une équipe non assurée vous
              expose seul. C&apos;est aussi simple que ça. Le tri conforme à la
              loi AGEC, les justificatifs administratifs, la valorisation des
              biens&nbsp;: ce sont des couches que vous ne voyez pas — et que
              vous ne pouvez pas couvrir sans nous.&nbsp;»
            </p>

            <ul
              className="bullets-spark"
              style={{ marginTop: "var(--space-6)" }}
            >
              {BULLETS.map((b) => (
                <li key={b}>
                  <Spark size={14} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Colonne Droite : Image */}
        <div 
          className="why-pro-img-col"
          aria-hidden={!image}
          style={{
            flex: "1 1 40%",
            minWidth: "300px",
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", inset: 0 }}>
            <ImagePlaceholder
              src={image}
              alt="Équipe professionnelle L'Espace Libre en intervention de débarras — entreprise certifiée Gironde"
              label="Photo : intervention en cours, port d'EPI"
              icon="users"
              tone="dark"
              hint="900 × 1400 px · portrait"
              sizes="(max-width: 1080px) 100vw, 40vw"
            />
          </div>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 1080px) {
          .why-pro-flex-wrapper {
            flex-direction: column !important;
          }
          .why-pro-text-col {
            padding: 4rem 1.5rem !important;
            flex: none !important;
            width: 100% !important;
          }
          .why-pro-img-col {
            flex: none !important;
            width: 100% !important;
            min-height: 500px !important;
          }
        }
        /* L'imagePlaceholder a des classes .img-ph et .img-real qui gèrent width/height 100% object-cover */
        .why-pro-img-col .img-ph, .why-pro-img-col .img-real {
          border-radius: 0 !important;
          width: 100% !important;
          height: 100% !important;
          position: absolute !important;
          top: 0; left: 0;
        }
      `}</style>
    </Tier>
  );
}
