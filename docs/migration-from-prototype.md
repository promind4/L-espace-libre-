# Migration depuis le prototype React UMD

**Date** : 2026-05-11
**Statut** : terminée
**Constitution** : v1.1.0, principe P4.3 NON NÉGOCIABLE (Next.js + SSG)

---

## Contexte

Le prototype d'origine (`ui_kits/marketing-site/` à la racine du dépôt)
chargeait React 18 + ReactDOM + Babel standalone depuis des CDN UMD,
compilait le JSX à l'exécution dans le navigateur, et exposait ses
composants via des variables globales (`window.Hero`, `window.Simulator`).
Ce modèle convenait à la phase de design mais reste **explicitement
banni de la production** (Constitution P4.3) pour deux raisons :

1. **Performance** — chargement initial > 300 Ko de Babel, recompilation
   JSX à chaque visite.
2. **SEO** — aucun HTML pré-rendu, indexabilité Google compromise (le
   pilier stratégique « pages locales SEO » exige du HTML pur).

---

## Stack cible

| Domaine | Choix |
|---|---|
| Framework | Next.js 15 App Router |
| Mode rendu | SSG par défaut (`generateStaticParams` + `dynamicParams = false`) |
| TS | strict, `noUncheckedIndexedAccess: true` |
| Styling | CSS Modules + tokens hérités (`styles/tokens.css`) |
| Animations | CSS + un hook React (`usePrefersReducedMotion`) — pas de Framer Motion |
| Polices | Inter auto-hébergé via `next/font/local` |
| Backend | Vercel Functions (Node) + Resend |
| Analytics | Plausible (zéro cookie) |

---

## Correspondance composant ancien → composant nouveau

| Prototype JSX | Nouveau composant TSX |
|---|---|
| `ui_kits/marketing-site/Header.jsx` | _à porter_ (S1.3.4) |
| `ui_kits/marketing-site/Hero.jsx` | _à porter_ (S1.3.5) — actuellement hero provisoire inline dans `app/page.tsx` |
| `ui_kits/marketing-site/Simulator.jsx` | `components/simulator/Simulator.tsx` (Client Component) |
| `ui_kits/marketing-site/BeforeAfterStack.jsx` | `components/before-after/BeforeAfterStack.tsx` (Client Component, PointerEvents unifiés) |
| `ui_kits/marketing-site/Sections.jsx` (TrustPillars + Services + Zones) | _à porter_ — 3 Server Components à scinder |
| `ui_kits/marketing-site/FAQ.jsx` | _à porter_ |
| `ui_kits/marketing-site/Footer.jsx` | _à porter_ |
| `ui_kits/marketing-site/Icon.jsx` | `components/ui/Icon.tsx` (wrapper Lucide) |
| `ui_kits/marketing-site/BrandWordmark.jsx` | _à porter_ |

---

## Évolutions au passage

### Simulator
- Parcours **identique** (3 étapes) mais étape 2 fusionne désormais
  surface + étage (vs surface seule dans le prototype).
- Affichage **temps réel du volume évacué** (m³) calculé via
  `surface × DENSITY_COEFF` (0,38).
- Validation Zod côté serveur ajoutée.
- E-mails transactionnels via Resend (prospect + back-office).
- Rate-limit 10 req/IP/h.
- Honeypot anti-bot.

### BeforeAfterStack
- Passage de l'API legacy `mousedown/touchstart` à **PointerEvents
  unifiés** (souris + tactile + stylet).
- Support clavier ajouté (`→`, `←`, `Entrée`/`Espace`).
- Respect `prefers-reduced-motion` (désactive les rotations).
- Pile de 5 paires au lieu d'une seule (paire « garage » réelle + 4
  placeholders).

### Tokens et CSS
- `colors_and_type.css` **copié à l'identique** dans
  `apps/web/styles/tokens.css`. Aucune transformation.
- Import Google Fonts **supprimé** ; Inter auto-hébergé via
  `next/font/local`.

---

## Devenir du dossier `ui_kits/marketing-site/`

Le prototype reste accessible à la racine du dépôt à des fins de
référence visuelle. Recommandation pour la v1.0 production :

1. Pendant les 4 premières semaines post-lancement → conserver pour
   comparaison visuelle.
2. À J+30 → archiver dans une branche git dédiée
   (`archive/prototype-react-umd`) et supprimer du `main`.
