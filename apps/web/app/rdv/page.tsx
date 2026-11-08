import { Suspense } from "react";
import type { Metadata } from "next";
import { RdvFunnel } from "./RdvFunnel";

export const metadata: Metadata = {
  title: "Point Téléphonique 10 min — Optimisation Assurances BTP | Kesiah & Partenaires",
  description:
    "Réservez votre point téléphonique de 10 minutes avec Kesiah & Partenaires, apporteur d'affaires partenaire du cabinet de courtage APC (ORIAS 16 001 495). Audit gratuit de vos contrats Décennale, Mutuelle TNS et Prévoyance.",
  alternates: {
    canonical: "https://www.lespace-libre.fr/rendez-vous-rcd-decennale-mutuelle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
