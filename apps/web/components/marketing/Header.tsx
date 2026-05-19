"use client";

/**
 * Header sticky avec dropdowns Services / Zones (desktop) et
 * **drawer mobile** (< 900 px) déclenché par le bouton burger.
 *
 * Le drawer est un panneau plein écran qui slide depuis le haut.
 * Il referme automatiquement au clic sur un lien (utile pour la
 * navigation entre pages) et au clic sur le backdrop.
 */
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { SERVICES } from "@/content/services";
import { ZONES, ZONES_BY_DEPARTEMENT } from "@/content/zones";
import { BUSINESS } from "@/config/business";

type DropdownKey = "services" | "zones" | null;

export function Header() {
  const [open, setOpen] = useState<DropdownKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  // Le drawer mobile est en flow naturel : la page reste scrollable
  // (le menu se déploie sans hauteur max, pas de bloque-scroll).

  // Ferme le drawer mobile au passage en desktop large
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 900) setMobileOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function closeMobile() {
    setMobileOpen(false);
  }

  // 5 services principaux pour le dropdown
  const headerServices = SERVICES.slice(0, 5);

  // Zones à afficher : 11 communes phares + lien « Toute la Gironde »
  const featuredZones = ZONES_BY_DEPARTEMENT["33"]?.slice(0, 11) ?? [];

  return (
    <header className="header">
      <div className="header__inner">
        <a className="header__logo" href="/" aria-label="L'Espace Libre">
          {/* Logo circulaire complet (texte + arbre + emerald) en PNG.
              `priority` car c'est l'élément above-the-fold critique.
              Dimensions intrinsèques 96×96 (taille rendue contrôlée par
              `.header__mark` en CSS, responsive). */}
          <Image
            src="/logo.png"
            alt="L'Espace Libre"
            width={96}
            height={96}
            priority
            sizes="(max-width: 600px) 60px, 76px"
            className="header__mark"
          />
        </a>

        <nav className="header__nav" ref={navRef} aria-label="Navigation principale">
          <button
            type="button"
            className="nav__item"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(open === "services" ? null : "services");
            }}
            aria-expanded={open === "services"}
            aria-haspopup="true"
          >
            Nos services
            <Icon name="chevron-down" />
            {open === "services" && (
              <div
                className="dropdown"
                onClick={(e) => e.stopPropagation()}
                role="menu"
              >
                {headerServices.map((s) => (
                  <a
                    key={s.slug}
                    className="dropdown__item"
                    href={`/services/${s.slug}`}
                    role="menuitem"
                  >
                    <span>
                      <div className="dropdown__title">{s.titre}</div>
                      <div className="dropdown__desc">{s.baseline}</div>
                    </span>
                  </a>
                ))}
              </div>
            )}
          </button>

          <button
            type="button"
            className="nav__item"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(open === "zones" ? null : "zones");
            }}
            aria-expanded={open === "zones"}
            aria-haspopup="true"
          >
            Zones
            <Icon name="chevron-down" />
            {open === "zones" && (
              <div
                className="dropdown"
                style={{ minWidth: 320 }}
                onClick={(e) => e.stopPropagation()}
                role="menu"
              >
                <div
                  style={{
                    padding: "8px 12px 4px",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: "var(--cr-pearl-500)",
                  }}
                >
                  Bordeaux Métropole &amp; Nouvelle-Aquitaine
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    padding: "8px 12px 8px",
                  }}
                >
                  {featuredZones.map((z) => (
                    <a
                      key={z.slug}
                      href={`/zones/${z.slug}`}
                      role="menuitem"
                      className="dropdown__zone-link"
                    >
                      {z.nom}
                    </a>
                  ))}
                </div>
                <a
                  href="/zones"
                  className="dropdown__item"
                  style={{ borderTop: "1px solid var(--border-subtle)", marginTop: 4 }}
                  role="menuitem"
                >
                  <span>
                    <div className="dropdown__title">Toutes les zones</div>
                    <div className="dropdown__desc">
                      25 communes — Gironde, Landes, Lot-et-Garonne
                    </div>
                  </span>
                </a>
              </div>
            )}
          </button>

          <a className="nav__item" href="/blog">
            Articles
          </a>
          <a className="nav__item" href="/faq">
            FAQ
          </a>
          {/* <a className="nav__item" href="/a-propos">
            À propos
          </a> */}
          <a className="nav__item" href="/contact">
            Contact
          </a>
        </nav>

        <div className="header__actions">
          <a className="header__phone" href={`tel:${BUSINESS.contact.telephone.replace(/\s/g, "")}`}>
            <Icon name="phone" />
            {BUSINESS.contact.telephoneAffichage}
          </a>
          <a 
            className="btn btn--primary btn--sm btn-sweep-anim" 
            href="/contact"
            style={{ position: "relative", overflow: "hidden" }}
          >
            Estimation gratuite
            {/* Effet de balayage brillant via CSS */}
            <span
              style={{ pointerEvents: "none" }}
              className="sweep-overlay absolute inset-0 z-10 block rounded-[inherit]"
            />
          </a>
          <button
            type="button"
            className="header__burger"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            aria-controls="header-mobile-drawer"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Icon name={mobileOpen ? "arrow-right" : "menu"} />
          </button>
        </div>
      </div>

      {/* ===== Drawer mobile (< 900 px uniquement, géré par CSS) =====
           Liste plate de 6 liens directs + CTA + téléphone.
           Desktop strictement inchangé (le drawer reste display:none ≥ 900 px). */}
      {mobileOpen && (
        <>
          <div
            className="header__mobile-backdrop"
            onClick={closeMobile}
            aria-hidden
          />
          <nav
            id="header-mobile-drawer"
            className="header__mobile-drawer"
            aria-label="Navigation mobile"
          >
            <ul className="header__mobile-list header__mobile-list--flat">
              <li>
                <a href="/services" onClick={closeMobile}>
                  Nos services
                </a>
              </li>
              <li>
                <a href="/zones" onClick={closeMobile}>
                  Zone d&apos;intervention
                </a>
              </li>
              <li>
                <a href="/blog" onClick={closeMobile}>
                  Articles
                </a>
              </li>
              <li>
                <a href="/faq" onClick={closeMobile}>
                  FAQ
                </a>
              </li>
              {/* Lien « À propos » masqué en Phase 1 — la page reste
                  accessible directement par URL pour usage interne et sera
                  réintégrée à la navigation lors de la Phase 2. */}
              <li>
                <a href="/contact" onClick={closeMobile}>
                  Contact
                </a>
              </li>
            </ul>

            <div className="header__mobile-actions">
              <a
                className="btn btn--primary btn--lg"
                href="/contact"
                onClick={closeMobile}
                style={{ width: "100%", justifyContent: "center" }}
              >
                Estimation gratuite
              </a>
              <a
                className="header__mobile-phone"
                href={`tel:${BUSINESS.contact.telephone.replace(/\s/g, "")}`}
                onClick={closeMobile}
              >
                <Icon name="phone" size={16} />
                {BUSINESS.contact.telephoneAffichage}
              </a>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
