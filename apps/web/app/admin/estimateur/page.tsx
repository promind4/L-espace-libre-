import type { Metadata } from "next";
import { AdminEstimateur } from "@/components/admin/AdminEstimateur";

/**
 * Page non indexée (couplée au layout `/admin/` qui force le robots
 * noindex). Le `metadata.robots` ci-dessous redouble la protection au
 * niveau de la page, par sécurité — si le layout évoluait, la page
 * resterait fermée à l'indexation.
 */
export const metadata: Metadata = {
  title: "Estimateur interne — Admin | L'Espace Libre",
  description: "Outil interne de production de devis fermes. Accès restreint.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
    },
  },
};

export default function AdminEstimateurPage() {
  return (
    <main>
      <AdminEstimateur />
    </main>
  );
}
