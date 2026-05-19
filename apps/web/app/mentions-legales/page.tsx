import type { Metadata } from "next";

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
          <p>Le site <strong>L'Espace Libre</strong> est édité par l'entreprise L'Espace Libre, domiciliée à Bordeaux Métropole.</p>
          <p>Directeur de la publication : L'Espace Libre.</p>
        </section>

        <section style={{ marginBottom: "var(--space-6)" }}>
          <h2>2. Hébergement</h2>
          <p>Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.</p>
        </section>

        <section style={{ marginBottom: "var(--space-6)" }}>
          <h2>3. Propriété Intellectuelle</h2>
          <p>L'ensemble du contenu (textes, images, vidéos) de ce site est protégé par le droit d'auteur. Toute reproduction, même partielle, est strictement interdite sans accord expresse et préalable.</p>
        </section>

        <section style={{ marginBottom: "var(--space-6)" }}>
          <h2>4. Responsabilité</h2>
          <p>L'Espace Libre s'efforce d'assurer au mieux l'exactitude des informations diffusées sur le site. Toutefois, nous déclinons toute responsabilité en cas d'imprécision ou d'omission concernant ces informations.</p>
        </section>
      </div>
    </main>
  );
}
