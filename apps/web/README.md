# L'Espace Libre — Application web

Application Next.js (App Router, SSG) — débarras professionnel Bordeaux
Métropole & Nouvelle-Aquitaine.

> **Source de vérité produit** : voir `.specify/memory/` à la racine du
> dépôt (Constitution v1.1.0, specify v1.1.0, plan v1.1.0, tasks v1.0.0).

## Démarrage

```bash
pnpm install
pnpm dev
```

Le serveur démarre sur http://localhost:3000.

Pour les polices Inter auto-hébergées, télécharger les fichiers
`Inter-Regular.woff2`, `Inter-Medium.woff2`, `Inter-SemiBold.woff2`,
`Inter-Bold.woff2`, `Inter-ExtraBold.woff2` depuis
[rsms.me/inter](https://rsms.me/inter/) et les placer dans
`public/fonts/`.

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Serveur de développement |
| `pnpm build` | Build production (SSG) |
| `pnpm start` | Serveur production |
| `pnpm lint` | ESLint Next.js |
| `pnpm lint:copy` | Linter de voix de marque (Constitution I.2) |
| `pnpm typecheck` | Vérification TypeScript |
| `pnpm test` | Tests unitaires Vitest |
| `pnpm test:coverage` | Couverture (cible 100 % sur `lib/pricing.ts`) |
| `pnpm e2e` | Tests Playwright (Simulator, BeforeAfter, SEO smoke) |
| `pnpm e2e:install` | Installe les navigateurs Playwright |
| `pnpm lighthouse` | Lighthouse CI selon budgets Constitution Art. IV |
| `pnpm format` | Formatage Prettier |

## Variables d'environnement

Copier `.env.example` en `.env.local` et renseigner :

- `RESEND_API_KEY` — clé API Resend (e-mail transactionnel)
- `LEADS_INBOX_EMAIL` — adresse de réception des leads
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — domaine Plausible
- `NEXT_PUBLIC_SITE_URL` — URL de production

En production, ces variables sont configurées dans le dashboard Vercel.

## Architecture

```
apps/web/
├── app/                    # App Router (Next.js)
│   ├── layout.tsx          # racine
│   ├── page.tsx            # accueil
│   ├── sitemap.ts          # SEO P4.7
│   ├── robots.ts           # SEO P4.7
│   └── globals.css
├── styles/
│   └── tokens.css          # Design tokens (Claude Design — P1.1)
├── components/
│   ├── ui/                 # primitives
│   ├── marketing/          # Header, Hero, Footer, etc.
│   ├── simulator/          # 3-step + résultat
│   ├── before-after/       # Slider stacked tactile
│   ├── seo/                # JsonLd, metadata helpers
│   └── analytics/          # PlausibleScript
├── content/
│   ├── zones.ts            # 25 communes (33 + 40 + 47)
│   ├── services.ts         # 5 services
│   └── blog/               # 10 articles MDX
├── lib/
│   ├── pricing.ts          # Algorithme tarifaire (testé 100%)
│   ├── email.ts            # Resend
│   ├── validation.ts       # Zod
│   └── seo.ts              # helpers metadata
├── config/
│   ├── site.ts
│   └── business.ts         # coordonnées (placeholders)
├── public/
│   ├── fonts/              # Inter auto-hébergé
│   └── images/
└── tests/
    ├── unit/               # Vitest
    └── e2e/                # Playwright
```

## Conformité Constitution v1.1.0

- ✅ **P1.1** — tokens lus depuis `styles/tokens.css`, source unique.
- ✅ **P4.3** — SSG natif via App Router + `generateStaticParams`.
- ✅ **P4.4** — Inter auto-hébergé via `next/font/local`.
- ✅ **P4.7** — `sitemap.ts` et `robots.ts` génèrent automatiquement.
- ✅ **P2.1** — `lib/pricing.ts` couvert à 100% par Vitest.

## Prototype historique

Le prototype React UMD + Babel d'origine reste accessible dans
`../../ui_kits/marketing-site/` (à la racine du dépôt) à des fins de
référence visuelle. Il sera archivé en branche git dédiée une fois la
v1 livrée.
