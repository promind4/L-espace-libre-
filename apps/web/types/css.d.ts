/**
 * Déclaration générique pour les imports de fichiers `.css`
 * provenant de paquets externes (Leaflet, etc.).
 *
 * Next.js sait charger ces fichiers au runtime mais TypeScript ne
 * fournit pas leurs types par défaut — d'où cette déclaration.
 */
declare module "*.css";
