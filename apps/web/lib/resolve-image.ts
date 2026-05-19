/**
 * Résolution conditionnelle d'images statiques.
 *
 * Permet aux composants Server de pointer vers un chemin attendu
 * (`/images/team/equipe-principale.jpg`) sans crasher si le fichier
 * n'existe pas encore. La fonction vérifie au moment du rendu serveur
 * la présence physique du fichier dans `public/` :
 *  - fichier présent → renvoie le path → image affichée via next/image
 *  - fichier absent  → renvoie undefined → placeholder élégant affiché
 *
 * Appelée au build pour les routes SSG. Coût négligeable.
 * En cas d'usage côté client (par mégarde), retourne undefined silencieusement.
 */

export function resolveImage(publicPath: string): string | undefined {
  // Côté navigateur : pas de fs, on ne peut pas vérifier — on retourne
  // undefined pour rester sur le placeholder (sécurité par défaut).
  if (typeof window !== "undefined") return undefined;

  try {
    // Import dynamique pour éviter que webpack bundle `fs` côté client.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("node:fs") as typeof import("node:fs");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("node:path") as typeof import("node:path");
    const fullPath = path.join(process.cwd(), "public", publicPath);
    return fs.existsSync(fullPath) ? publicPath : undefined;
  } catch {
    return undefined;
  }
}
