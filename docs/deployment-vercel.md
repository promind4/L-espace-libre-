# Déploiement Vercel + Ionos

**Date** : 2026-05-11
**Statut** : guide d'exécution pour le déploiement initial v1.

---

## Pré-requis

- Compte Vercel (Pro recommandé pour Password Protection).
- Dépôt GitHub privé contenant `apps/web/`.
- Domaine `lespacelibre.fr` enregistré chez Ionos (arbitrage R6).
- Compte Resend avec clé API et domaine d'envoi vérifié.
- Compte Plausible (`plausible.io`) pour le domaine cible.

## Étapes

### 1. Créer le projet Vercel

1. Aller sur https://vercel.com → *Add New → Project*.
2. Importer le dépôt GitHub.
3. **Configuration importante** :
   - Framework Preset : *Next.js*
   - Root Directory : **`apps/web`**
   - Build Command : `pnpm build` (auto-détecté)
   - Output Directory : `.next` (par défaut)
   - Install Command : `pnpm install --frozen-lockfile`

### 2. Variables d'environnement

Dans *Settings → Environment Variables*, ajouter pour les
environnements *Production*, *Preview* et *Development* :

| Variable | Valeur | Visibilité |
|---|---|---|
| `RESEND_API_KEY` | `re_…` | Server (secret) |
| `LEADS_INBOX_EMAIL` | `leads@lespacelibre.fr` | Server |
| `NEXT_PUBLIC_SITE_URL` | `https://lespacelibre.fr` (prod) / URL preview | Client |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | `lespacelibre.fr` | Client |

### 3. Configurer la protection admin

*Settings → Deployment Protection* :
- Activer **Password Protection** sur **toutes** les routes (Production +
  Preview), OU configurer un *Bypass* dédié pour `/admin/*` selon
  l'offre Vercel souscrite.

NB : Vercel Pro propose désormais le mode *Standard Protection* avec
liste de routes ; vérifier la version disponible au moment du
déploiement.

### 4. Configurer le domaine Ionos

Dans le dashboard Ionos, section *Domaines et SSL* :

1. Ajouter un enregistrement **CNAME** pour `www.lespacelibre.fr`
   pointant vers `cname.vercel-dns.com`.
2. Ajouter un enregistrement **A** pour `lespacelibre.fr` (apex)
   pointant vers `76.76.21.21` (IP statique Vercel).

Dans Vercel, *Settings → Domains*, ajouter `lespacelibre.fr` et
`www.lespacelibre.fr`. Vercel détecte automatiquement les DNS et
provisionne les certificats TLS (Let's Encrypt) sous quelques minutes.

### 5. Connecter Resend

1. Dans Resend, vérifier le domaine `lespacelibre.fr` (ajout
   d'enregistrements DKIM/SPF/DMARC chez Ionos).
2. Créer une clé API dédiée production, la coller dans la variable
   `RESEND_API_KEY` côté Vercel.
3. Tester l'envoi depuis le Simulateur public.

### 6. Connecter Plausible

1. Créer le site `lespacelibre.fr` sur https://plausible.io.
2. Ajouter le script via `components/analytics/PlausibleScript.tsx`
   (composant à créer en S4 — voir tasks.md).
3. Vérifier dans le dashboard Plausible que les visites sont remontées.

### 7. Google Search Console

1. Ajouter la propriété `https://lespacelibre.fr` (préfixe URL).
2. Validation via balise meta ou enregistrement DNS Ionos.
3. Soumettre le sitemap : `https://lespacelibre.fr/sitemap.xml`.
4. Vérifier l'indexation des 25 pages locales + 5 services + 10 articles
   dans les 7 jours qui suivent.

### 8. Vérifications post-déploiement

Checklist obligatoire avant communication publique :

- [ ] `https://lespacelibre.fr/` accessible en HTTPS.
- [ ] `https://lespacelibre.fr/robots.txt` retourne le bon contenu
  avec `Disallow: /admin/` et `Sitemap: …`.
- [ ] `https://lespacelibre.fr/sitemap.xml` liste les 45+ routes.
- [ ] `/admin/estimateur` demande un mot de passe.
- [ ] Le Simulateur envoie effectivement deux e-mails (prospect +
  back-office) lors d'un test réel.
- [ ] Plausible reçoit les premières visites.
- [ ] Google Rich Results Test valide les JSON-LD `LocalBusiness`,
  `Service`, `FAQPage`, `Article`.
- [ ] Tests Lighthouse mobile sur la page d'accueil : Perf ≥ 90,
  A11y = 100, SEO ≥ 95.

## Secrets GitHub Actions

Pour la CI Lighthouse, optionnel :
- `LHCI_GITHUB_APP_TOKEN` — token GitHub App Lighthouse CI, permet de
  commenter sur les PR.

## Rollback

En cas de régression critique en production :
- Vercel *Deployments* → cliquer sur le déploiement précédent → *Promote
  to Production*.
- Investigation en parallèle sur la branche `main` ou via un revert.

## Suite (post v1)

- Mettre en place les alertes Vercel (e-mail sur build failure).
- Configurer un domaine de prévisualisation explicite
  (`preview.lespacelibre.fr`).
- Migrer le rate-limit en mémoire vers Upstash KV si le volume dépasse
  60 leads/mois (cf. specify §6 trajectoire v2).
