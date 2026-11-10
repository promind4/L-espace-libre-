/**
 * Umami auto-hébergé : le site relaie lui-même le script et les mesures sous sa propre adresse
 * (/m/s.js et /m/api/send). Pour le navigateur tout vient de lespace-libre.fr, ce qui évite
 * l'essentiel des blocages par les bloqueurs de publicité. Actif seulement si
 * NEXT_PUBLIC_UMAMI_SRC pointe vers une instance auto-hébergée (pas Umami Cloud).
 */
const UMAMI_ORIGIN = (() => {
  try {
    const u = new URL(process.env.NEXT_PUBLIC_UMAMI_SRC || "");
    return u.hostname.endsWith("umami.is") ? null : u.origin;
  } catch {
    return null;
  }
})();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Les erreurs <a> vs <Link> sont fonctionnellement sans impact en SSG.
    // TODO: remplacer les <a> internes par <Link> dans un commit de nettoyage.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async rewrites() {
    return [
      {
        source: "/rendez-vous-rcd-decennale-mutuelle",
        destination: "/rdv",
      },
      {
        source: "/lespace-libre/rendez-vous-rcd-decennale-mutuelle",
        destination: "/rdv",
      },
      {
        source: "/rdv/:id",
        destination: "/rdv?id=:id",
      },
      ...(UMAMI_ORIGIN
        ? [
            { source: "/m/s.js", destination: `${UMAMI_ORIGIN}/script.js` },
            { source: "/m/api/send", destination: `${UMAMI_ORIGIN}/api/send` },
          ]
        : []),
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
