/**
 * HomeZones — section de la page d'accueil listant les zones desservies.
 * Port du prototype `ui_kits/marketing-site/Sections.jsx`, étendu aux
 * 25 communes (Gironde + Landes + Lot-et-Garonne).
 */
import { Spark } from "@/components/ui/Spark";
import { Tier } from "@/components/ui/Tier";
import { ZonesMap } from "@/components/zones/ZonesMap";
import { ZONES_BY_DEPARTEMENT } from "@/content/zones";

export function HomeZones() {
  const featured = (ZONES_BY_DEPARTEMENT["33"] ?? []).slice(0, 4);
  const others33 = (ZONES_BY_DEPARTEMENT["33"] ?? []).slice(4);
  const landes = ZONES_BY_DEPARTEMENT["40"] ?? [];
  const lot = ZONES_BY_DEPARTEMENT["47"] ?? [];

  return (
    <Tier variant="light" as="section" rhythmIndex={10} id="zones" className="zones-home">
      <div className="container zones-home__grid">
        <div className="zones-home__map">
          {/* Carte Leaflet + OpenStreetMap (sans clé API).
              Composant Client, monte au mount uniquement. */}
          <ZonesMap />
        </div>
        <div>
          <div className="tier__eyebrow">
            <Spark size={14} />
            Zones d&apos;intervention
          </div>
          <h2
            className="section__title"
            style={{ textAlign: "left" }}
          >
            Toute la Gironde, et au-delà.
          </h2>
          <p
            className="section__lead"
            style={{ textAlign: "left" }}
          >
            Basés à Bordeaux, nous couvrons l&apos;ensemble de la métropole
            sans frais kilométriques, et nous déplaçons en Gironde, dans les
            Landes et le Lot-et-Garonne avec frais transparents.
          </p>
          <div className="zones-home__list">
            {featured.map((z) => (
              <a
                key={z.slug}
                href={`/zones/${z.slug}`}
                className="zones-home__chip featured"
              >
                {z.nom}
              </a>
            ))}
            {others33.map((z) => (
              <a
                key={z.slug}
                href={`/zones/${z.slug}`}
                className="zones-home__chip"
              >
                {z.nom}
              </a>
            ))}
            {landes.map((z) => (
              <a
                key={z.slug}
                href={`/zones/${z.slug}`}
                className="zones-home__chip"
              >
                {z.nom} (40)
              </a>
            ))}
            {lot.map((z) => (
              <a
                key={z.slug}
                href={`/zones/${z.slug}`}
                className="zones-home__chip"
              >
                {z.nom} (47)
              </a>
            ))}
          </div>
          <p style={{ marginTop: 20, fontSize: 14 }}>
            <a
              href="/zones"
              style={{
                color: "var(--cr-emerald-600)",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Voir toutes les zones →
            </a>
          </p>
        </div>
      </div>
    </Tier>
  );
}
