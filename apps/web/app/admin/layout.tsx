/**
 * Layout commun à toutes les routes `/admin/*`.
 *
 * Rôles principaux :
 *  1. Imposer `noindex, nofollow` à l'échelle du sous-arbre admin
 *     (Constitution P4.7 — exclu également de `sitemap.ts` et bloqué
 *     dans `robots.txt`).
 *  2. Note de protection d'accès : la protection d'accès elle-même est
 *     activée côté Vercel (Password Protection dans le dashboard du
 *     projet), pas dans le code. Aucune logique d'authentification ici.
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
