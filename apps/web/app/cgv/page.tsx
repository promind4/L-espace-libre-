import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente (CGV) | L'Espace Libre",
  description: "Conditions Générales de Vente de L'Espace Libre.",
  robots: "noindex, follow",
};

export default function CgvPage() {
  return (
    <main className="tier tier-light" style={{ paddingBlock: "var(--space-10)" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <h1 style={{ marginBottom: "var(--space-6)" }}>Conditions Générales de Vente (CGV)</h1>
        
        <section style={{ marginBottom: "var(--space-6)" }}>
          <h2>1. Champ d'application</h2>
          <p>Les présentes CGV s'appliquent à l'ensemble des prestations de services de débarras et de nettoyage proposées par L'Espace Libre pour les particuliers et professionnels.</p>
        </section>

        <section style={{ marginBottom: "var(--space-6)" }}>
          <h2>2. Devis et Commandes</h2>
          <p>Chaque intervention est précédée d'un devis gratuit, ferme et détaillé. La signature du devis par le client, accompagnée de la mention "Bon pour accord", vaut acceptation des présentes CGV et commande définitive de la prestation.</p>
        </section>

        <section style={{ marginBottom: "var(--space-6)" }}>
          <h2>3. Tarification et Paiement</h2>
          <p>Les prix sont indiqués en euros (HT et TTC). Sauf mention expresse contraire sur le devis, aucun acompte n'est exigé avant le début de l'intervention. Le règlement total de la prestation est exigible à la fin de l'intervention, à réception de la facture.</p>
        </section>

        <section style={{ marginBottom: "var(--space-6)" }}>
          <h2>4. Exécution de la prestation</h2>
          <p>L'Espace Libre s'engage à exécuter la prestation aux dates convenues sur le devis, sous réserve de la remise effective des clés et d'un accès dégagé au bien. En cas de force majeure, la date d'intervention pourra être repoussée d'un commun accord.</p>
        </section>

        <section style={{ marginBottom: "var(--space-6)" }}>
          <h2>5. Assurance et Responsabilité</h2>
          <p>L'entreprise L'Espace Libre est titulaire d'une assurance Responsabilité Civile Professionnelle couvrant d'éventuels dommages causés pendant l'intervention. Tout objet de valeur non préalablement signalé qui serait endommagé fera l'objet d'un constat contradictoire.</p>
        </section>

        <section style={{ marginBottom: "var(--space-6)" }}>
          <h2>6. Clause de valorisation</h2>
          <p>La valeur des biens récupérables est estimée en amont par notre équipe et est directement déduite du coût du devis. Une fois l'intervention achevée, les biens récupérés deviennent la propriété de L'Espace Libre, sauf accord préalable explicite pour une mise de côté spécifique.</p>
        </section>
      </div>
    </main>
  );
}
