import type { Metadata } from "next";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: `Espace Pro : Notaires & Agences | ${SITE.nom}`,
  description: "Services de débarras dédiés aux professionnels de l'immobilier, notaires, mandataires judiciaires et syndics en Nouvelle-Aquitaine.",
  // Page masquée Phase 1 — à activer avec contenu validé.
  robots: { index: false, follow: false },
};

export default function EspaceProPage() {
  return (
    <main className="container" style={{ padding: "var(--space-8) 0" }}>
      <h1>Espace Professionnel</h1>
      <p className="lead">Des solutions logistiques sur mesure pour les notaires, agences immobilières, mandataires judiciaires et bailleurs.</p>
      
      <section style={{ marginTop: "var(--space-6)" }}>
        <h2>Partenaire de confiance des Études Notariales</h2>
        <p>Nous coordonnons directement avec votre étude pour les successions, assurons la conservation des biens désignés, et fournissons tous les justificatifs nécessaires à l'instruction de vos dossiers.</p>
      </section>

      <section style={{ marginTop: "var(--space-6)" }}>
        <h2>Agences Immobilières et Syndics</h2>
        <p>Réactivité maximale pour vider et nettoyer un logement avant remise en vente ou relocation. Nous gérons également les caves, garages et locaux communs encombrés.</p>
      </section>

      <section style={{ marginTop: "var(--space-6)" }}>
        <h2>Mandataires Judiciaires</h2>
        <p>Intervention encadrée suite à des liquidations judiciaires. Inventaire précis, mise en sécurité des biens et évacuation complète des locaux commerciaux ou industriels.</p>
      </section>
    </main>
  );
}
