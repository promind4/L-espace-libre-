import type { Metadata } from "next";
import { Tier } from "@/components/ui/Tier";
import { Spark } from "@/components/ui/Spark";

/**
 * Page de démonstration interne — Sprint R1 du redesign v2.
 *
 * Affiche les 4 tiers du système de rythme + les 6 usages canoniques
 * du sparkle, sur une seule page. Sert à valider visuellement la
 * fondation avant d'attaquer les vraies pages du site.
 *
 * Non listée au sitemap, marquée noindex/nofollow. Accessible
 * uniquement par URL directe : /_demo/tiers
 */

export const metadata: Metadata = {
  title: "Démo · Tiers + Sparkle | L'Espace Libre",
  robots: { index: false, follow: false },
};

export default function TiersDemoPage() {
  return (
    <main>
      {/* ===== Cover (Light) ===== */}
      <Tier variant="light" rhythmIndex={0}>
        <div className="container">
          <span className="tier__eyebrow">
            <Spark size={14} />
            Sprint R1 · Fondation
          </span>
          <h1 style={{ marginBottom: "var(--space-3)" }}>
            Tiers + Sparkle — page de démonstration interne
          </h1>
          <p
            style={{
              fontSize: "17px",
              color: "var(--cr-pearl-700)",
              maxWidth: "60ch",
              margin: 0,
            }}
          >
            Cette page affiche les 4 tiers de fond (Light, Paper, Deep,
            Editorial) et les 6 usages canoniques du sparkle dans des
            conditions isolées. Aucune page de production n&apos;est
            altérée pour l&apos;instant.
          </p>
        </div>
      </Tier>

      {/* ===== Tier Light ===== */}
      <Tier variant="light" rhythmIndex={1}>
        <div className="container">
          <span className="tier__eyebrow">
            <Spark size={14} />
            Tier Light
          </span>
          <h2>Le silence neutre où la voix se pose.</h2>
          <p
            style={{
              maxWidth: "60ch",
              color: "var(--cr-pearl-700)",
              lineHeight: 1.6,
            }}
          >
            Fond <code>--bg-page</code> (#FAFBFC), texte navy-950. C&apos;est
            le tier par défaut — celui du Hero, du corps de texte courant,
            des cartes de service.
          </p>
        </div>
      </Tier>

      {/* ===== Tier Paper ===== */}
      <Tier variant="paper" rhythmIndex={2}>
        <div className="container">
          <span className="tier__eyebrow">
            <Spark size={14} />
            Tier Paper
          </span>
          <h2>Le blueprint du métier.</h2>
          <p
            style={{
              maxWidth: "60ch",
              color: "var(--cr-pearl-700)",
              lineHeight: 1.6,
            }}
          >
            Grille SVG 40×40 navy-300 @ 0.35 d&apos;opacité, inlinée en
            data-URI (~180 bytes, zéro requête HTTP). Sert pour les
            sections d&apos;expertise, de méthode, de chiffres-clés.
          </p>
          <ul className="bullets-spark" style={{ maxWidth: "60ch" }}>
            <li>
              <Spark size={14} />
              Texture qui évoque le plan d&apos;intervention
            </li>
            <li>
              <Spark size={14} />
              Aligné avec la promesse de marque (logistique, mesure)
            </li>
            <li>
              <Spark size={14} />
              Aucun coût performance : data-URI inline, cache infini
            </li>
          </ul>
        </div>
      </Tier>

      {/* ===== Tier Deep ===== */}
      <Tier variant="deep" rhythmIndex={3}>
        <div className="container">
          <span className="tier__eyebrow">
            <Spark size={14} variant="light" />
            Tier Deep
          </span>
          <h2>Le tier qui affirme.</h2>
          <p style={{ maxWidth: "60ch", lineHeight: 1.6 }}>
            Navy-950 plein avec une highlight radiale subtile en haut à
            droite et une grille fantôme à 4% d&apos;opacité. Sert au
            process, aux KPI, au manifeste de fermeture, au footer.
          </p>
          <div className="spark-end" style={{ marginTop: "var(--space-7)" }}>
            <Spark size={22} variant="light" />
          </div>
        </div>
      </Tier>

      {/* ===== Tier Editorial ===== */}
      <Tier variant="editorial" rhythmIndex={4} className="pullquote">
        <div className="container">
          <div className="pullquote__sep">
            <Spark size={18} />
          </div>
          <blockquote>
            « Rien de ce qui peut servir ne part en déchèterie. »
          </blockquote>
          <div className="pullquote__attr">La charte 0 gaspillage</div>
          <p
            style={{
              maxWidth: "48ch",
              marginTop: "var(--space-5)",
              fontSize: "16px",
              lineHeight: 1.7,
              color: "var(--cr-pearl-700)",
            }}
          >
            Pearl-100 avec un filet vertical émeraude 1px positionné à
            64px du bord du container. Le contenu démarre à 128px (au-delà
            du filet). Tier des citations, manifestes, page À propos.
          </p>
        </div>
      </Tier>

      {/* ===== Spark — les 5 tailles ===== */}
      <Tier variant="light" rhythmIndex={5}>
        <div className="container">
          <span className="tier__eyebrow">
            <Spark size={14} />
            Tailles canoniques
          </span>
          <h2>Cinq tailles, et seulement cinq.</h2>
          <p
            style={{
              maxWidth: "60ch",
              color: "var(--cr-pearl-700)",
              lineHeight: 1.6,
              marginBottom: "var(--space-6)",
            }}
          >
            Le sparkle existe en 12 (inline body), 14 (eyebrow), 16 (bullet
            de liste), 22 (séparateur) et 24 (end-mark). Toute autre taille
            trahit une utilisation hors cadre.
          </p>
          <div
            style={{
              display: "flex",
              gap: "var(--space-7)",
              alignItems: "flex-end",
              flexWrap: "wrap",
            }}
          >
            {([12, 14, 16, 22, 24] as const).map((s) => (
              <div
                key={s}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Spark size={s} />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--cr-pearl-700)",
                  }}
                >
                  {s} px
                </span>
              </div>
            ))}
          </div>
        </div>
      </Tier>

      {/* ===== Spark — les 6 usages canoniques ===== */}
      <Tier variant="paper" rhythmIndex={6}>
        <div className="container">
          <span className="tier__eyebrow">
            <Spark size={14} />
            Six usages canoniques
          </span>
          <h2>Un sparkle, un rôle.</h2>

          <div
            style={{
              display: "grid",
              gap: "var(--space-7)",
              marginTop: "var(--space-7)",
            }}
          >
            {/* Usage 1 : Eyebrow */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--cr-pearl-500)",
                  marginBottom: "var(--space-3)",
                }}
              >
                01 — Eyebrow
              </div>
              <span className="tier__eyebrow">
                <Spark size={14} />
                Nos services
              </span>
              <h3 style={{ margin: "var(--space-2) 0 0", fontSize: "22px" }}>
                Une solution pour chaque situation.
              </h3>
            </div>

            {/* Usage 2 : Bullet */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--cr-pearl-500)",
                  marginBottom: "var(--space-3)",
                }}
              >
                02 — Bullet de liste
              </div>
              <ul className="bullets-spark" style={{ marginTop: 0 }}>
                <li>
                  <Spark size={14} />
                  Assurance Responsabilité Civile Professionnelle incluse
                </li>
                <li>
                  <Spark size={14} />
                  Charte 0 gaspillage, dons et recyclage 33
                </li>
                <li>
                  <Spark size={14} />
                  Devis ferme sous 2 heures par photo
                </li>
              </ul>
            </div>

            {/* Usage 3 : Séparateur (rare) */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--cr-pearl-500)",
                  marginBottom: "var(--space-3)",
                }}
              >
                03 — Séparateur (rare, 1 par page max)
              </div>
              <div className="spark-sep">
                <Spark size={18} />
              </div>
            </div>

            {/* Usage 4 : End-mark */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--cr-pearl-500)",
                  marginBottom: "var(--space-3)",
                }}
              >
                04 — Marqueur de fin d&apos;article
              </div>
              <div className="spark-end">
                <Spark size={24} />
              </div>
            </div>

            {/* Usage 5 : Hover de lien */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--cr-pearl-500)",
                  marginBottom: "var(--space-3)",
                }}
              >
                05 — Hover de lien (survolez pour voir l&apos;animation)
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-4)",
                }}
              >
                <a href="#" className="link-spark">
                  <span className="link__spark">
                    <Spark size={16} />
                  </span>
                  En savoir plus sur la succession
                </a>
                <a href="#" className="link-spark">
                  <span className="link__spark">
                    <Spark size={16} />
                  </span>
                  Découvrir notre charte 0 gaspillage
                </a>
              </div>
            </div>

            {/* Usage 6 : Sidenav active */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--cr-pearl-500)",
                  marginBottom: "var(--space-3)",
                }}
              >
                06 — Indicateur de section active (sidenav)
              </div>
              <ul className="sidenav">
                <li>
                  <a href="#">
                    <span className="sidenav__num">01</span>Notre histoire
                  </a>
                </li>
                <li className="active">
                  <Spark size={14} />
                  <span className="sidenav__num">02</span>La charte 0 gaspillage
                </li>
                <li>
                  <a href="#">
                    <span className="sidenav__num">03</span>L&apos;équipe et le fondateur
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="sidenav__num">04</span>Nos partenaires
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Tier>

      {/* ===== Carte service numérotée (Concept D variante 1) ===== */}
      <Tier variant="light" rhythmIndex={7}>
        <div className="container">
          <span className="tier__eyebrow">
            <Spark size={14} />
            Cartes services
          </span>
          <h2>Numérotation typographique, pas d&apos;icône Lucide.</h2>
          <p
            style={{
              maxWidth: "60ch",
              color: "var(--cr-pearl-700)",
              lineHeight: 1.6,
              marginBottom: "var(--space-6)",
            }}
          >
            On retire l&apos;icône <code>home</code> / <code>building</code> /{" "}
            <code>archive</code> et on confie le travail à la typographie.
            Cohérent avec le chapitrage de la page À propos.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "var(--space-4)",
            }}
          >
            <a href="#" className="service-card-num">
              <div className="service-card-num__num">01</div>
              <div>
                <h3>Débarras maison &amp; appartement</h3>
                <p>
                  Vidage complet ou partiel, tri sur place, balayage et
                  remise en état pour mise en vente ou location.
                </p>
                <span className="service-card-num__link">
                  En savoir plus →
                </span>
              </div>
            </a>
            <a href="#" className="service-card-num">
              <div className="service-card-num__num">02</div>
              <div>
                <h3>Succession &amp; notaires</h3>
                <p>
                  Inventaire, débarras coordonné avec l&apos;étude
                  notariale, restitution des clés au mandataire.
                </p>
                <span className="service-card-num__link">
                  En savoir plus →
                </span>
              </div>
            </a>
            <a href="#" className="service-card-num">
              <div className="service-card-num__num">03</div>
              <div>
                <h3>Bureaux &amp; locaux pro</h3>
                <p>
                  Fin de bail, déménagement d&apos;entreprise, mise à neuf
                  rapide pour le nouvel occupant.
                </p>
                <span className="service-card-num__link">
                  En savoir plus →
                </span>
              </div>
            </a>
            <a href="#" className="service-card-num">
              <div className="service-card-num__num">04</div>
              <div>
                <h3>Nettoyage extrême (Diogène)</h3>
                <p>
                  Situations critiques, décontamination, équipe spécialisée
                  et confidentialité absolue.
                </p>
                <span className="service-card-num__link">
                  En savoir plus →
                </span>
              </div>
            </a>
          </div>
        </div>
      </Tier>

      {/* ===== Chapter label (Concept C) ===== */}
      <Tier variant="paper" rhythmIndex={8}>
        <div className="container">
          <div className="chapter">
            <span className="chapter__num">01</span>
            <span>Chapter label</span>
            <span className="chapter__line"></span>
          </div>
          <h2 style={{ maxWidth: "22ch" }}>
            Pour la page À propos en mode magazine.
          </h2>
          <p
            style={{
              maxWidth: "60ch",
              color: "var(--cr-pearl-700)",
              lineHeight: 1.7,
            }}
          >
            Mono 13px émeraude, suivi d&apos;un filet qui s&apos;étend
            jusqu&apos;au bord du container. Pose le chapitrage typographique
            au-dessus de chaque section longue de la page À propos.
          </p>
        </div>
      </Tier>

      {/* ===== Closing Deep avec end-mark ===== */}
      <Tier variant="deep" rhythmIndex={9}>
        <div
          className="container"
          style={{ textAlign: "center", maxWidth: "720px" }}
        >
          <span className="tier__eyebrow" style={{ justifyContent: "center" }}>
            <Spark size={14} variant="light" />
            Fin de la démo
          </span>
          <h2 style={{ marginInline: "auto", maxWidth: "22ch" }}>
            La fondation est posée. À valider avant Sprint R2.
          </h2>
          <p style={{ marginInline: "auto", maxWidth: "56ch", marginTop: 24 }}>
            Si l&apos;alternance des fonds, le sparkle, et la numérotation
            typographique des cartes services vous conviennent, je passe à
            la refonte de la home (R2).
          </p>
          <div className="spark-end" style={{ marginTop: "var(--space-7)" }}>
            <Spark size={24} variant="light" />
          </div>
        </div>
      </Tier>
    </main>
  );
}
