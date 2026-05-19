# L’Espace Libre — Design System

> **Mission** : Conception UI/UX de la plateforme « L’Espace Libre » — Débarras Haute Performance, Bordeaux Métropole & Gironde.
> Une interface mobile-first qui transforme une corvée stressante (vider un lieu) en une solution logistique fluide et rassurante.

---

## Brand at a glance

| | |
|---|---|
| **Name** | L’Espace Libre |
| **Sector** | Débarras / Clearing services (homes, succession, offices, extreme cleaning) |
| **Coverage** | Bordeaux Métropole & Gironde (Mérignac, Pessac, Talence, etc.) |
| **Audience** | Particuliers stressés (héritiers, déménageurs), notaires, gestionnaires de biens |
| **Mood** | Efficacité · Sérénité · Propreté |
| **Voice** | Calme, professionnel, rassurant. Vouvoiement systématique. Phrases courtes, factuelles. |
| **Status** | New brand — design system built from the strategic brief; no prior codebase or Figma. |

## Sources

This system was generated from a **strategic brief only** (provided in chat). No codebase, no Figma, no existing assets were attached. Every visual was created from the brief's guidance:

- Palette: « Bleu Ardoise Profond / Bleu Marine » primary, « Blanc Pur et Gris Perle » secondary, « Vert Émeraude doux / Bleu Cyan » action.
- Typography: « Sans-serif moderne (ex: Inter ou Montserrat) » → **Inter** chosen for its mobile legibility.
- Iconography: « Icônes filaires (Outline) élégantes » → **Lucide** chosen as the closest open match.

If you have a Figma file, brand guidelines PDF, logo files, or a working prototype — **please attach them** so the next iteration can match real assets instead of standing in.

---

## Index — what's in this folder

```
README.md                   ← you are here
SKILL.md                    ← agent-skill manifest (Claude Code compatible)
colors_and_type.css         ← every color, type, space, shadow, motion token
ICONOGRAPHY.md              ← icon strategy + Lucide usage notes
fonts/                      ← (empty — Inter loaded via Google Fonts CDN)
assets/
  logo-wordmark.svg         ← primary lockup
  logo-mark.svg             ← standalone monogram
  logo-wordmark-light.svg   ← reversed for dark surfaces
preview/                    ← Design System tab cards (one HTML per concept)
ui_kits/
  marketing-site/           ← landing page + components
    index.html              ← interactive marketing site recreation
    Header.jsx, Hero.jsx, Simulator.jsx, TrustPillars.jsx, Footer.jsx, …
```

---

## Content fundamentals

### Voice & tone
- **Language**: French (FR-FR). The brand serves Bordeaux Métropole — every customer-facing word is in French.
- **Address**: Always **vouvoiement** (« vous »). Professional distance; the customer is in a vulnerable moment (succession, déménagement, situation Diogène) and needs to feel handled by adults.
- **Register**: Calm, factual, **never breezy**. Avoid exclamation marks, hype, or emoji. The product handles real emotional weight — succession, hoarding, end-of-life logistics.
- **Person**: Brand speaks as « nous » (collective, reassuring) → customer as « vous » (respected). Never « je ».

### Casing & punctuation
- **Sentence case** for buttons and headings (`Estimation gratuite`, not `Estimation Gratuite`).
- Exception: brand name **Clarté & Relais** keeps both capitals.
- French typographic spaces: insécables before `:`, `;`, `?`, `!`, `»`, and after `«`. Use « » for quotation marks, not "".
- Numbers: « 48h », « 2h », « 0 gaspillage » — short, scannable.

### Specific copy examples (use these as templates)

| Surface | Copy |
|---|---|
| Hero title | **Votre espace libéré en quelques heures.** |
| Hero sub | Débarras complet, tri responsable, devis final sous 2h par photo. Bordeaux Métropole & Gironde. |
| Primary CTA | Estimation gratuite |
| Secondary CTA | Voir nos services |
| Trust badge 1 | Assurance RC Pro incluse |
| Trust badge 2 | Charte 0 gaspillage — Dons & Recyclage 33 |
| Trust badge 3 | Devis final sous 2h par photo |
| Service name | Débarras maison & appartement |
| Service name | Succession & notaires |
| Service name | Nettoyage extrême (Diogène) |
| Form label | Quel type de bien souhaitez-vous libérer ? |
| Empty state | Aucune intervention planifiée. Demandez votre estimation. |
| Confirmation | Merci. Vous recevez votre fourchette de prix dans la minute. |

### What to avoid
- ❌ « Hey ! », « Génial ! », emoji-laden microcopy
- ❌ « On vide tout, c'est facile ! » — too casual
- ❌ Aggressive sales language (« Profitez vite ! », « Offre exclusive »)
- ❌ Jargon métier sans contexte (« cubage », « DIB ») — expliquer ou éviter
- ❌ Anglicismes inutiles (dire « devis » pas « quote », « estimation » pas « pricing »)

---

## Visual foundations

### Color philosophy
The palette is built around the **emotional contract** of the service: a deep, institutional **navy** that signals competence and discretion, anchored on vast **white and pearl** surfaces that visually enact the « espace vide / propre » the brand delivers. **Emerald** appears sparingly — only on actions and the éco-responsabilité signature — so it always reads as forward motion, never decoration.

- **Navy** (`--cr-navy-900` #11203A) — primary brand, used for headers, headings, dark hero sections, primary text on light surfaces.
- **Pearl** (`--cr-pearl-50` → `--cr-pearl-300`) — neutral system. Pages float on `--cr-pearl-50`, cards on white, borders are barely-there `--cr-pearl-200`.
- **Emerald** (`--cr-emerald-600` #129975) — reserved for **primary CTA**, success states, and the « 0 gaspillage » éco-signature. Never used as a decorative fill.

### Typography
- **Family**: Inter (400/500/600/700/800). One family throughout — no display font, no serif. Discipline reinforces calm.
- **Scale**: modular 12 → 64px. On mobile, hero shrinks to 48px; section headings 30px; body holds 16px.
- **Headings**: weight 700/800, tight tracking (`-0.02em`), `text-wrap: balance`. Color `--fg-strong`.
- **Body**: 16/26 (1.625), weight 400, color `--fg-default`.
- **Eyebrow labels**: 12px, weight 600, uppercase, tracking `0.14em`, color `--cr-navy-700`. Used to label trust pillars, section eyebrows, simulator step indicators.

### Spacing & layout
- 4-px base unit, scale `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128`.
- **Generous vertical rhythm**: section padding is 96 px desktop / 64 px mobile. The brief is explicit: « beaucoup d'espaces blancs pour évoquer le concept de vide ».
- Max content width 1200 px; reading width 64 ch.
- 12-col grid desktop, single-column mobile. The simulator is **full-bleed on mobile** (no horizontal padding inside the card on < 480 px).

### Background system
- **Default page**: `--bg-page` (#FAFBFC pearl tint) — never pure white at page level.
- **Cards & surfaces**: `--bg-surface` (#FFFFFF), 1 px `--border-subtle`, `--shadow-sm`.
- **Hero / dark anchors**: `--cr-navy-900` solid, occasionally with a soft radial highlight (rgba(255,255,255,0.04)) for depth.
- **No imagery decoration**: backgrounds are flat. Photography appears in dedicated frames (hero illustration slot, blog cards) and is treated with cool, daylight white-balance — never warm or grainy.
- **No gradients** beyond subtle protection gradients on top of photography (navy → transparent, bottom-up) so white text stays legible.
- **No textures, no patterns**.

### Corners, borders, shadows
- **Radius**: `10 / 14 / 20 / 28 px` — soft but architectural. Pills (999 px) reserved for tags and the floating « Estimation gratuite » CTA.
- **Borders**: 1 px, `--border-subtle` (#E9ECF1) by default. Stronger `--border-default` only on inputs.
- **Shadows**: soft, low-contrast, slate-tinted (`rgba(17, 32, 58, …)`). Cards rest on `--shadow-sm`; hover lifts to `--shadow-md`; the simulator card uses `--shadow-lg`. No glow, no neon.

### Hover, press, focus
- **Hover**: links shift to emerald; buttons darken by one step (`--cr-emerald-700` for primary, `--cr-navy-800` for secondary); cards lift +2 px translateY and step up one shadow level.
- **Press**: `transform: scale(0.985)`; no color flash.
- **Focus**: visible 4-px ring — emerald on actions (`--shadow-focus`), navy on neutrals (`--shadow-focus-brand`). Never remove outlines.
- **Disabled**: `--cr-pearl-400` text, `--cr-pearl-200` background, cursor `not-allowed`, no shadow.

### Motion
- **Durations**: 140 / 220 / 360 ms. Default to 220 ms.
- **Easing**: `cubic-bezier(0.22, 1, 0.36, 1)` for entries (out), `cubic-bezier(0.65, 0, 0.35, 1)` for state changes (in-out).
- **No bounces**, no spring overshoot. The brand is calm — motion confirms, never celebrates.
- Section reveals: 8 px translateY + opacity fade, 360 ms.

### Transparency & blur
- Used **only** on the sticky header (background `rgba(255,255,255,0.78)` + `backdrop-filter: blur(12px)` once scrolled) and on protection gradients over hero imagery. Nowhere else.

### Imagery direction
- Cool daylight white-balance, slight desaturation, **no grain**.
- Subject matter: empty rooms post-intervention, light flooding through windows, neutral wood floors, white walls. The « after » never the « before ».
- People: hands at work, neutral uniforms, never staged smiles.

---

## Open questions / things to confirm

- **Logo** — recreated from user-supplied PNG sources (`assets/source-wordmark.png`, `assets/source-mark.png`) as crisp SVG (`logo-wordmark.svg`, `logo-mark.svg`). Source PNGs kept in `assets/` for reference. Provide vector originals if available.
- **Photography** — no photo library yet. Hero illustration slots are empty placeholders.
- **Colors** — palette derived from the supplied logos: navy `#1D3E61`, green `#0E8F70`. Sampled directly from `source-wordmark.png` / `source-mark.png`.
- **Font licensing** — Inter is OFL-licensed and free; can be self-hosted from `/fonts/` for prod.
