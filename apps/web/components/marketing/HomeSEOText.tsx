/**
 * HomeSEOText — Sprint R2 (redesign v2) + ajustement alignement v3.
 *
 * Tier Paper (grille blueprint). Trois colonnes éditoriales avec
 * eyebrow + H2 centré et corps de texte en grille fixe 3 colonnes.
 *
 * Alignement uniforme : grille `repeat(3, 1fr)` stricte, titres h3
 * alignés via `min-height`, paragraphes démarrant au même niveau
 * (cf. classes `.expert-cols` / `.expert-col` dans tiers.css).
 */
import { Spark } from "@/components/ui/Spark";
import { Tier } from "@/components/ui/Tier";

export function HomeSEOText() {
  return (
    <Tier variant="paper" as="section" rhythmIndex={5}>
      <div className="container">
        <header
          className="section__head"
          style={{
            textAlign: "center",
            maxWidth: "720px",
            margin: "0 auto 56px",
          }}
        >
          <span
            className="tier__eyebrow"
            style={{ justifyContent: "center" }}
          >
            <Spark size={14} />
            Votre expert local
          </span>
          <h2 className="section__title">
            Entreprise de débarras en Gironde, Landes et Lot-et-Garonne.
          </h2>
        </header>

        <div className="expert-cols">
          <div className="expert-col">
            <h3>Une solution complète de désencombrement.</h3>
            <p>
              Faire appel à <strong>L&apos;Espace Libre</strong>,
              c&apos;est choisir une entreprise de débarras professionnelle
              et réactive. Nous intervenons pour le vidage complet ou
              partiel de tous types de locaux&nbsp;:{" "}
              <strong>
                maisons, appartements, caves, garages, greniers et
                bureaux professionnels
              </strong>
              . Que ce soit suite à un déménagement, une vente
              immobilière ou un besoin de libérer de l&apos;espace, nous
              gérons l&apos;intégralité de la manutention et de
              l&apos;évacuation des encombrants avec soin et efficacité.
            </p>
          </div>

          <div className="expert-col">
            <h3>Spécialiste succession et nettoyage Diogène.</h3>
            <p>
              Certaines situations exigent une attention particulière.
              Lors d&apos;un{" "}
              <strong>débarras après succession</strong>, nous
              travaillons en étroite collaboration avec les notaires et
              les héritiers pour garantir l&apos;inventaire et la
              conservation des objets de valeur. Face à un{" "}
              <strong>syndrome de Diogène</strong> ou à un logement
              insalubre, notre équipe spécialisée déploie un protocole
              de nettoyage extrême, avec décontamination et respect
              strict de la confidentialité, pour remettre le logement
              en état.
            </p>
          </div>

          <div className="expert-col">
            <h3>Éco-responsabilité et recyclage garantis.</h3>
            <p>
              Notre charte <strong>zéro gaspillage</strong> garantit une
              gestion éthique de vos biens. Les objets, meubles et
              vêtements en bon état sont systématiquement{" "}
              <strong>donnés à des associations caritatives locales</strong>{" "}
              (Emmaüs, Le Relais). Les déchets non valorisables, gravats
              et déchets d&apos;équipements électriques et électroniques
              (DEEE) sont acheminés vers des{" "}
              <strong>déchèteries professionnelles agréées</strong>.
              Demandez votre devis gratuit et profitez d&apos;une
              tarification au mètre cube claire et sans surprise.
            </p>
          </div>
        </div>
      </div>
    </Tier>
  );
}
