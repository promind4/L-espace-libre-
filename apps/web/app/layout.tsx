import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE } from "@/config/site";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";

/**
 * Google Analytics 4 — branché conditionnellement.
 *
 * Activation : positionner `NEXT_PUBLIC_GA_MEASUREMENT_ID` dans Vercel
 * (format `G-XXXXXXXXXX`). Tant que la variable n'est pas définie,
 * aucun script tiers n'est chargé — utile en dev local et pour les
 * previews Vercel anonymes.
 *
 * RGPD : ce branchement charge GA dès la première page vue. Pour la
 * production publique en France, il faut soit (a) ajouter une CMP
 * (cookie banner) qui n'appelle `gtag('config', …)` qu'après
 * consentement, soit (b) configurer le Consent Mode v2 côté GA avec
 * un état initial « denied » — au choix du PO. Le code ci-dessous est
 * compatible avec ces deux stratégies sans modification.
 */
const GA_ID = process.env["NEXT_PUBLIC_GA_MEASUREMENT_ID"];

// `next/font/google` télécharge Inter AU BUILD et la sert depuis le
// domaine local (pas de requête runtime vers Google — Constitution P4.4
// respectée). Si vous préférez l'auto-hébergement manuel via
// `next/font/local`, voir le commit précédent ou docs/migration-from-prototype.md.
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans-loaded",
  display: "swap",
  preload: true,
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1D3E61",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.nom} — ${SITE.baseline}`,
    template: `%s | ${SITE.nom}`,
  },
  description: SITE.description,
  applicationName: SITE.nom,
  authors: [{ name: SITE.nom }],
  keywords: [
    "débarras",
    "vide-maison",
    "succession",
    "Bordeaux",
    "Gironde",
    "Nouvelle-Aquitaine",
    "désencombrement",
    "Diogène",
  ],
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.nom,
    title: `${SITE.nom} — ${SITE.baseline}`,
    description: SITE.description,
    images: [{ url: SITE.defaultOgImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.nom} — ${SITE.baseline}`,
    description: SITE.description,
    images: [SITE.defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  // ============================================================
  //  Pack favicons (Next.js Metadata API)
  //  Source : apps/web/public/ (favicon.ico, favicon-*x*.png,
  //  apple-touch-icon.png, android-chrome-*x*.png, site.webmanifest)
  //  Toutes les déclarations sont injectées dans le <head> au build.
  // ============================================================
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      {
        url: "/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>
        <Header />
        {children}
        <Footer />
        {GA_ID && (
          <>
            {/*
              `afterInteractive` : GA est chargé une fois la page
              hydratée et interactive, sans bloquer le LCP.
              `strategy="afterInteractive"` est la valeur par défaut
              recommandée par Next.js pour les analytics tiers.
            */}
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
