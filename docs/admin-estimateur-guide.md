# Guide utilisateur — outil interne `/admin/estimateur`

**Destinataires** : Product Owner et équipe commerciale L'Espace Libre.
**Statut** : v1, en attente de retour PO.

---

## Accès

- URL : `https://lespacelibre.fr/admin/estimateur`
- Protection : **Vercel Password Protection** (mot de passe partagé,
  géré dans le dashboard Vercel du projet, section *Settings →
  Deployment Protection*).
- La page est **non indexée** (meta `robots noindex/nofollow`,
  `Disallow: /admin/` dans `robots.txt`, exclue du `sitemap.xml`).

## Quand l'utiliser

Cet outil produit des **devis fermes** après réception des photos d'un
prospect. Il diffère du **Simulateur public** sur trois points :

| Aspect | Simulateur public | `/admin/estimateur` |
|---|---|---|
| Salubrité | Toujours `normal` | Sélectionnable (4 niveaux) |
| Zone géographique | Toujours `CUB` | Sélectionnable (3 zones) |
| Coefficient correctif | Indisponible | Disponible (0,01 à 5) |
| Notes internes | Non | Champ libre, non transmis |
| Plage de surface | 10–250 m² | 10–500 m² |

---

## Parcours type — production d'un devis ferme

1. **Recevez les photos du prospect** par e-mail ou WhatsApp.
2. **Évaluez sur photo** la salubrité (normal / poussiéreux /
   insalubre / Diogène) et l'étage/accès.
3. **Ouvrez `/admin/estimateur`** et renseignez tous les champs.
4. **Le calcul se met à jour en direct** : volume évacué, base, coefs,
   nominal, fourchette.
5. **Notez en interne** tout ce qui est utile à la mémoire opérationnelle
   (points de vigilance sur photos, conditions négociées…) dans le champ
   « Notes commerciales internes » — il ne sera **jamais transmis** au
   prospect.
6. **Cliquez sur « Copier le devis client »**. Un texte formaté est
   placé dans le presse-papiers, prêt à coller dans votre réponse
   e-mail au prospect. Les notes internes en sont absentes.
7. **Pour vos archives** : « Copier la fiche interne » (avec notes) ou
   « Imprimer » pour PDF.

## Coefficients — rappel

### Salubrité (multiplicateur sur la base)
- **Normal** ×1,0 — logement entretenu.
- **Poussiéreux** ×1,2 — long stockage, encombrement passif.
- **Insalubre** ×1,5 — saletés, nuisibles, EPI requis.
- **Diogène** ×2,5 — équipe spécialisée, décontamination.

### Étage (multiplicateur additionnel)
- RDC ou ascenseur → ×1,0
- 1ᵉʳ-2ᵉ sans ascenseur → ×1,15
- 3ᵉ et plus sans ascenseur → ×1,30

### Frais kilométriques
- CUB (Bordeaux Métropole) → 0 €
- Gironde hors CUB → forfait 65 €
- Hors département → 0,60 €/km depuis Bordeaux Centre

### Coefficient correctif (admin uniquement)
Champ libre 0,01 à 5,00. Multiplie le sous-total (avant frais km).
Utiliser pour :
- ajuster un cas atypique non capturé par les coefficients standard ;
- accorder une remise commerciale (par ex. 0,90 = -10 %) ;
- intégrer une majoration ponctuelle (par ex. 1,20 = +20 %).

À utiliser avec parcimonie : **toute valeur ≠ 1,00 est consignée** dans
la fiche interne pour traçabilité.

---

## Référence canonique de validation

> **Diogène 100 m² RDC CUB → 4 355 €** exactement.

Cette valeur est figée en test unitaire dans
`apps/web/tests/unit/pricing.test.ts`. Si elle change, c'est qu'on a
modifié l'algorithme — alerter le PO avant tout déploiement.

## En cas d'écart avec le prospect

Si le prospect conteste le devis ou demande un ajustement :
1. Reproduire les conditions exactes dans l'outil
   (incluant photos jointes éventuelles).
2. Documenter le motif d'ajustement dans les notes internes.
3. Émettre un nouveau devis avec `custom_coefficient` ajusté.
4. Conserver la fiche interne pour traçabilité.

---

*Pour toute évolution de la grille tarifaire, contacter Claude Code.
Toute modification de `lib/pricing.ts` doit s'accompagner d'une mise
à jour des tests unitaires et d'une validation explicite du PO.*
