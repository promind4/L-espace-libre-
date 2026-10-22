import { Suspense } from "react";
import type { Metadata } from "next";
import { RdvFunnel } from "./RdvFunnel";

export const metadata: Metadata = {
  title: "Point Téléphonique 10 min — Optimisation Assurances BTP | Kesiah & Partenaires",
  description:
    "Réservez votre point téléphonique de 10 minutes avec Kesiah Ntumba, mandataire assurance BTP en Gironde. Audit gratuit de vos contrats Décennale, Mutuelle TNS et Prévoyance.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RdvPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0C1F33",
            color: "#ffffff",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Chargement de votre créneau...
        </div>
      }
    >
      <RdvFunnel />
    </Suspense>
  );
}
