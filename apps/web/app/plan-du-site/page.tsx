import type { Metadata } from "next";
import { SITE } from "@/config/site";
import { SERVICES } from "@/content/services";
import { ZONES, ZONES_BY_DEPARTEMENT } from "@/content/zones";
import { BLOG_POSTS } from "@/content/blog/posts";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Plan du Site | ${SITE.nom}`,
  description: "Retrouvez l'ensemble des pages, services, zones d'intervention et articles du site L'Espace Libre.",
};

export default function SitemapHtmlPage() {
  return (
    <main className="container" style={{ padding: "var(--space-8) 0" }}>
      <h1>Plan du Site</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--space-6)", marginTop: "var(--space-6)" }}>
        <section>
          <h2>Nos Services</h2>
          <ul>
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>{s.titre}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Zones d'intervention</h2>
          {Object.entries(ZONES_BY_DEPARTEMENT).map(([dep, zones]) => (
            <div key={dep} style={{ marginBottom: "var(--space-4)" }}>
              <h3>Département {dep}</h3>
              <ul>
                {zones.map((z) => (
                  <li key={z.slug}>
                    <Link href={`/zones/${z.slug}`}>Débarras à {z.nom}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>L'Entreprise</h2>
          <ul>
            <li><Link href="/">Accueil</Link></li>
            {/* « Qui sommes-nous ? » masqué en Phase 1 — page conservée
                dans l'architecture, sans entrée publique pendant V1. */}
            <li><Link href="/espace-pro">Espace Professionnel</Link></li>
            <li><Link href="/contact">Contact & Devis</Link></li>
            <li><Link href="/reclamation">Réclamation</Link></li>
          </ul>
        </section>

        <section>
          <h2>Blog & Conseils</h2>
          <ul>
            <li><Link href="/blog">Tous les articles</Link></li>
            {BLOG_POSTS.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`}>{p.titre}</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
