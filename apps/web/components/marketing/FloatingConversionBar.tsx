"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function FloatingConversionBar() {
  const [isVisible, setIsVisible] = useState(false);

  // Apparition de la barre après un léger scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        zIndex: 100,
      }}
    >
      <a
        href="/contact"
        title="Demander un devis"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "var(--cr-navy-900)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "var(--shadow-md)",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <Icon name="mail" size={22} />
      </a>
      
      <a
        href="/contact"
        title="Simulateur de prix"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "var(--cr-emerald-600)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "var(--shadow-md)",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <Icon name="calculator" size={22} />
      </a>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        title="Remonter en haut"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "white",
          color: "var(--cr-navy-900)",
          border: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "var(--shadow-sm)",
          transition: "transform 0.2s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <Icon name="arrow-up" size={22} />
      </button>
    </div>
  );
}
