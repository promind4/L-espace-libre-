import type { Metadata } from "next";
import { BUSINESS } from "@/config/business";

export const metadata: Metadata = {
  title: "Mentions Légales | L'Espace Libre",
  description: "Mentions légales de l'entreprise L'Espace Libre.",
  robots: "noindex, follow",
};

export default function MentionsLegalesPage() {
  return (
    <main className="tier tier-light" style={{ paddingBlock: "var(--space-10)" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <h1 style={{ marginBottom: "var(--space-6)" }}>Mentions Légales</h1>

        <section style={{ marginBottom: "var(--space-6)" }}>
          <h2>1. Éditeur du site</h2>
          <p>
            Le site <strong>{BUSINESS.nom}</strong> est édité par {BUSINESS.raisonSociale},
            auto-entrepreneur domicilié à {BUSINESS.adresse.rue},{" "}
            {BUSINESS.adresse.codePostal} {BUSINESS.adresse.ville}.
          </p>
          <p><strong>SIRET :</strong> {BUSINESS.siret}</p>
          <p><strong>Téléphone :</strong> {BUSINESS.contact.telephoneAffichage}</p>
          <p><strong>E-mail :</strong> {BUSINESS.contact.email}</p>
          <p>Directeur de la publication : {BUSINESS.nom}.</p>
        </section>

        <section style={{ marginBottom: "var(--space-6)" }}>
          <h2>2. Hébergement</h2>
          <p>Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.</p>
        </section>

        <section style={{ marginBottom: "var(--space-6)" }}>
          <h2>3. Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu (textes, images, visuels) de ce site est protégé par le droit d'auteur.
            Toute reproduction, même partielle, est strictement interdite sans accord préalable et exprès de {BUSINESS.nom}.
          </p>
        </section>

        <section style={{ marginBottom: "var(--space-6)" }}>
          <h2>4. Responsabilité</h2>
          <p>
            {BUSINESS.nom} s'efforce d'assurer l'exactitude des informations diffusées sur ce site.
            Nous déclinons toute responsabilité en cas d'imprécision ou d'omission.
          </p>
        </section>

        <section style={{ marginBottom: "var(--space-6)" }}>
          <h2>5. Données personnelles</h2>
          <p>
            Les données collectées via le formulaire de contact sont utilisées uniquement pour traiter
            votre demande de devis. Elles sont conservées {BUSINESS.conservationRgpdMois} mois
            à compter du dernier contact, conformément au RGPD.
            Vous pouvez demander leur effacement à tout moment à l'adresse {BUSINESS.contact.email}.
          </p>
        </section>

        <section style={{ marginBottom: "var(--space-6)" }}>
          <h2>6. Médiation</h2>
          <p>
            Conformément à l'article L 612-1 du Code de la consommation, vous pouvez recourir
            gratuitement à un médiateur de la consommation en cas de litige.
          </p>
        </section>
      </div>
    </main>
  );
}
