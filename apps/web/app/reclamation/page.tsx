import type { Metadata } from "next";
import { SITE } from "@/config/site";
import { BUSINESS } from "@/config/business";

export const metadata: Metadata = {
  title: `Réclamation et Service Client | ${SITE.nom}`,
  description: "Vous avez rencontré un problème lors d'une intervention ? Notre service réclamation est à votre écoute pour trouver une solution rapidement.",
};

export default function ReclamationPage() {
  return (
    <main className="container" style={{ padding: "var(--space-8) 0" }}>
      <h1>Service Réclamation</h1>
      <p>La satisfaction de nos clients est notre priorité absolue. Si vous avez rencontré le moindre problème lors d&apos;une de nos interventions, nous sommes là pour le résoudre.</p>

      <section style={{ marginTop: "var(--space-6)" }}>
        <h2>Comment déposer une réclamation ?</h2>
        <p>Veuillez nous contacter via le formulaire ci-dessous ou directement par e-mail en précisant le numéro de votre devis ou facture, ainsi que la date de l&apos;intervention. Nous nous engageons à vous apporter une réponse sous 48 heures ouvrées.</p>

        <div style={{ marginTop: "var(--space-4)", padding: "var(--space-4)", background: "var(--bg-sunken)", borderRadius: "var(--radius-md)" }}>
          <h3>Contact Service Client</h3>
          <p>Email : {BUSINESS.contact.email}</p>
          <p>Téléphone : {BUSINESS.contact.telephoneAffichage}</p>
        </div>
      </section>
    </main>
  );
}
