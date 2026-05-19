"use client";

/**
 * ZonesMap — carte dynamique des communes desservies (Leaflet + OSM).
 *
 * Choix techniques :
 *  - **Leaflet + tuiles OpenStreetMap** : aucune clé API requise, gratuit,
 *    attribution OSM obligatoire (rendue dans le bandeau bas-droit).
 *  - **Import dynamique** dans un useEffect : Leaflet touche `window`,
 *    incompatible SSR. La carte ne se monte qu'au client.
 *  - **Coordonnées hardcodées** : pas de géocodage en ligne, latitudes
 *    et longitudes statiques pour les 25 communes desservies.
 *
 * Performance : Leaflet ~42 KB JS + ~50 KB tuiles initiales. Le
 * composant n'est pas pré-chargé — il s'initialise au mount.
 */

import { useEffect, useRef } from "react";

// Bordeaux centre (point d'ancrage par défaut)
const CENTER: [number, number] = [44.8378, -0.5792];
const ZOOM = 9;

/**
 * Coordonnées des 25 communes desservies (alignées sur `content/zones.ts`)
 * + secteur supplémentaire Libourne (26e marqueur visuel, sans page
 * dédiée — clic renvoie vers /contact).
 * Sources : Wikipédia / OpenStreetMap (centres administratifs).
 */
type CommuneEntry = {
  /** Slug `content/zones.ts` ou null si secteur sans page dédiée. */
  slug: string | null;
  nom: string;
  coords: [number, number];
  dpt: "33" | "40" | "47";
};

const COMMUNES: readonly CommuneEntry[] = [
  // ===== Gironde (33) — 15 communes desservies =====
  { slug: "bordeaux", nom: "Bordeaux", coords: [44.8378, -0.5792], dpt: "33" },
  { slug: "merignac", nom: "Mérignac", coords: [44.8404, -0.6432], dpt: "33" },
  { slug: "pessac", nom: "Pessac", coords: [44.8067, -0.6314], dpt: "33" },
  { slug: "talence", nom: "Talence", coords: [44.8089, -0.5897], dpt: "33" },
  { slug: "begles", nom: "Bègles", coords: [44.8081, -0.5483], dpt: "33" },
  { slug: "le-bouscat", nom: "Le Bouscat", coords: [44.8631, -0.6011], dpt: "33" },
  { slug: "villenave-d-ornon", nom: "Villenave-d'Ornon", coords: [44.7822, -0.5747], dpt: "33" },
  { slug: "gradignan", nom: "Gradignan", coords: [44.7800, -0.6128], dpt: "33" },
  { slug: "floirac", nom: "Floirac", coords: [44.8336, -0.5258], dpt: "33" },
  { slug: "cenon", nom: "Cenon", coords: [44.8589, -0.5267], dpt: "33" },
  { slug: "bruges", nom: "Bruges", coords: [44.8772, -0.5972], dpt: "33" },
  { slug: "lormont", nom: "Lormont", coords: [44.8783, -0.5217], dpt: "33" },
  { slug: "saint-medard-en-jalles", nom: "Saint-Médard-en-Jalles", coords: [44.8964, -0.7197], dpt: "33" },
  { slug: "eysines", nom: "Eysines", coords: [44.8856, -0.6536], dpt: "33" },
  { slug: "ambares-et-lagrave", nom: "Ambarès-et-Lagrave", coords: [44.9211, -0.4783], dpt: "33" },
  // ===== Landes (40) — 5 communes desservies =====
  { slug: "mont-de-marsan", nom: "Mont-de-Marsan", coords: [43.8908, -0.5006], dpt: "40" },
  { slug: "dax", nom: "Dax", coords: [43.7106, -1.0511], dpt: "40" },
  { slug: "saint-paul-les-dax", nom: "Saint-Paul-lès-Dax", coords: [43.7253, -1.0656], dpt: "40" },
  { slug: "capbreton", nom: "Capbreton", coords: [43.6428, -1.4364], dpt: "40" },
  { slug: "biscarrosse", nom: "Biscarrosse", coords: [44.3939, -1.1633], dpt: "40" },
  // ===== Lot-et-Garonne (47) — 5 communes desservies =====
  { slug: "agen", nom: "Agen", coords: [44.2017, 0.6219], dpt: "47" },
  { slug: "marmande", nom: "Marmande", coords: [44.5008, 0.1664], dpt: "47" },
  { slug: "villeneuve-sur-lot", nom: "Villeneuve-sur-Lot", coords: [44.4067, 0.7050], dpt: "47" },
  { slug: "tonneins", nom: "Tonneins", coords: [44.3953, 0.3119], dpt: "47" },
  { slug: "le-passage", nom: "Le Passage", coords: [44.1925, 0.5953], dpt: "47" },
  // ===== Secteur supplémentaire — Libourne (Gironde, sans page dédiée) =====
  { slug: null, nom: "Libourne (secteur)", coords: [44.9131, -0.2434], dpt: "33" },
];

const COLORS = {
  // Marqueurs par département — palette de marque
  "33": "#0E8F70", // emerald-600
  "40": "#3D628A", // navy-600
  "47": "#6B85A6", // navy-500
} as const;

export function ZonesMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let mapInstance: import("leaflet").Map | null = null;

    (async () => {
      // Imports dynamiques — Leaflet ne tourne qu'au client (touche `window`).
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (cancelled || !containerRef.current) return;

      // 1. Détection mobile pour adapter la taille des marqueurs.
      const isMobile = window.matchMedia("(max-width: 720px)").matches;

      // 2. Carte centrée sur Bordeaux, zoom adapté pour couvrir la
      // Gironde + extrémités Landes/Lot-et-Garonne.
      mapInstance = L.map(containerRef.current, {
        center: CENTER,
        zoom: ZOOM,
        scrollWheelZoom: false, // évite de bloquer le scroll de la page
        attributionControl: true,
      });

      // 3. Tuiles OpenStreetMap (libres, attribution requise).
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
        minZoom: 7,
      }).addTo(mapInstance);

      // 4. Marqueurs custom — un par commune desservie (26 au total :
      // 25 zones avec page dédiée + Libourne en secteur supplémentaire).
      // `divIcon` plutôt que les PNG natifs Leaflet (bundler-friendly).
      COMMUNES.forEach((c) => {
        const color = COLORS[c.dpt];
        const isBdx = c.slug === "bordeaux";
        // Tailles adaptées : un peu plus grandes sur mobile pour rester
        // visibles et tappables, plus modérées sur desktop.
        const size = isBdx
          ? isMobile ? 20 : 16
          : isMobile ? 13 : 10;

        const icon = L.divIcon({
          className: "zones-map__marker",
          html: `<span style="
            display:block;
            width:${size}px;
            height:${size}px;
            border-radius:50%;
            background:${color};
            border:2px solid #fff;
            box-shadow:0 1px 4px rgba(0,0,0,0.18);
          "></span>`,
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });

        // Popup différent selon que la commune a une page dédiée ou non.
        const popupHtml = c.slug
          ? `<strong>${c.nom}</strong><br/><a href="/zones/${c.slug}" style="color:#0E8F70;">Débarras à ${c.nom} →</a>`
          : `<strong>${c.nom}</strong><br/><span style="color:#5A6573;font-size:12px;">Secteur desservi sur demande</span><br/><a href="/contact" style="color:#0E8F70;">Demander un devis →</a>`;

        L.marker(c.coords, { icon })
          .addTo(mapInstance!)
          .bindPopup(popupHtml);
      });
    })();

    return () => {
      cancelled = true;
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="zones-map"
      role="region"
      aria-label="Carte des communes desservies"
    />
  );
}
