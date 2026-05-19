import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | L'Espace Libre",
  description: "Politique de confidentialité et protection des données personnelles.",
  robots: "noindex, follow",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="tier tier-light" style={{ paddingBlock: "var(--space-10)" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <h1 style={{ marginBottom: "var(--space-6)" }}>Politique de Confidentialité</h1>
        
        <section style={{ marginBottom: "var(--space-6)" }}>
          <h2>1. Collecte des données</h2>
          <p>Dans le cadre de notre formulaire de devis et de contact, nous collectons les données strictement nécessaires au traitement de votre demande : nom, adresse e-mail, téléphone, adresse du bien à débarrasser et caractéristiques du bien.</p>
        </section>

        <section style={{ marginBottom: "var(--space-6)" }}>
          <h2>2. Utilisation des données</h2>
          <p>Vos données sont utilisées <strong>exclusivement</strong> pour :</p>
          <ul style={{ paddingLeft: "var(--space-4)", marginBottom: "var(--space-4)" }}>
            <li>L'élaboration de votre devis.</li>
            <li>La planification et le suivi de l'intervention.</li>
            <li>La facturation et le respect de nos obligations comptables.</li>
          </ul>
          <p>Vos informations ne sont jamais revendues ou cédées à des tiers à des fins commerciales.</p>
        </section>

        <section style={{ marginBottom: "var(--space-6)" }}>
          <h2>3. Durée de conservation</h2>
          <p>Conformément à la réglementation RGPD, les données des prospects sont conservées pendant une durée maximale de 3 ans à compter du dernier contact. Les données de facturation sont conservées pendant 10 ans (obligation légale).</p>
        </section>

        <section style={{ marginBottom: "var(--space-6)" }}>
          <h2>4. Vos droits</h2>
          <p>Vous disposez d'un droit d'accès, de rectification, de portabilité et de suppression de vos données. Pour exercer ce droit, vous pouvez nous contacter via notre formulaire de contact.</p>
        </section>
      </div>
    </main>
  );
}
