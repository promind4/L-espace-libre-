/**
 * Tests pricing.ts — couverture 100% obligatoire (Constitution P2.1).
 *
 * RÉFÉRENCE CANONIQUE PO :
 *   Diogène 100 m² RDC CUB → 4 355 €
 *
 * Toute modification de la grille tarifaire DOIT mettre à jour ces
 * snapshots ET être validée par le PO.
 */
import { describe, it, expect } from "vitest";
import {
  computeEstimate,
  PricingError,
  PRICING_CONSTANTS,
  SALUBRITY_COEFFICIENTS,
  FLOORS_WITHOUT_ELEVATOR,
  formatEuros,
  type PricingInput,
} from "@/lib/pricing";

// ============================================================
//  RÉFÉRENCE CANONIQUE
// ============================================================
describe("computeEstimate — exemple canonique PO", () => {
  it("Diogène 100 m² RDC CUB doit donner EXACTEMENT 4 355 €", () => {
    const out = computeEstimate({
      type: "maison",
      surface_m2: 100,
      floor: "rdc",
      salubrity: "diogene",
      zone: "cub",
    });
    // Décomposition pédagogique pour audit :
    expect(out.volume_evacue_m3).toBe(38); // 100 × 0.38
    expect(out.travail).toBe(4275); // 38 × 2.5 × 45
    expect(out.base).toBe(4355); // 80 + 4275
    expect(out.coefficient_etage).toBe(1);
    expect(out.frais_km).toBe(0);
    expect(out.nominal).toBe(4355); // référence PO
  });
});

// ============================================================
//  TABLEAU D'EXEMPLES (specify.md §3.6)
// ============================================================
describe("computeEstimate — tableau d'exemples PO", () => {
  it("Cave 15 m² RDC normal CUB", () => {
    const out = computeEstimate({
      type: "cave",
      surface_m2: 15,
      floor: "rdc",
      salubrity: "normal",
      zone: "cub",
    });
    expect(out.volume_evacue_m3).toBeCloseTo(5.7, 10);
    expect(out.frais_km).toBe(0);
    expect(out.nominal).toBe(337);
    // RANGE_LOW = 0.65 (prix d'appel agressif v3) : 337 × 0.65 = 219.05 → 220
    expect(out.low).toBe(220);
    expect(out.high).toBe(390);
  });

  it("Appartement 60 m² RDC normal CUB", () => {
    const out = computeEstimate({
      type: "appartement",
      surface_m2: 60,
      floor: "rdc",
      salubrity: "normal",
      zone: "cub",
    });
    expect(out.nominal).toBe(1106);
    // 1106 × 0.65 = 718.9 → 720
    expect(out.low).toBe(720);
    expect(out.high).toBe(1270);
  });

  it("Appartement 60 m² 1-2e sans ascenseur normal CUB", () => {
    const out = computeEstimate({
      type: "appartement",
      surface_m2: 60,
      floor: "etage-sans-asc",
      salubrity: "normal",
      zone: "cub",
    });
    expect(out.coefficient_etage).toBe(1.15);
    expect(out.nominal).toBe(1272);
    // 1272 × 0.65 = 826.8 → 830
    expect(out.low).toBe(830);
    expect(out.high).toBe(1460);
  });

  it("Appartement 60 m² 1-2e sans asc. poussiéreux CUB", () => {
    const out = computeEstimate({
      type: "appartement",
      surface_m2: 60,
      floor: "etage-sans-asc",
      salubrity: "poussiereux",
      zone: "cub",
    });
    expect(out.coefficient_salubrity).toBe(1.2);
    expect(out.nominal).toBe(1508);
    // 1508 × 0.65 = 980.2 → 980
    expect(out.low).toBe(980);
    expect(out.high).toBe(1730);
  });

  it("Maison 120 m² RDC insalubre Gironde hors CUB", () => {
    const out = computeEstimate({
      type: "maison",
      surface_m2: 120,
      floor: "rdc",
      salubrity: "insalubre",
      zone: "gironde-hors-cub",
    });
    expect(out.coefficient_salubrity).toBe(1.5);
    expect(out.frais_km).toBe(65);
    expect(out.nominal).toBe(3223);
    // 3223 × 0.65 = 2094.95 → 2090
    expect(out.low).toBe(2090);
    expect(out.high).toBe(3710);
  });

  it("Diogène 100 m² RDC hors-département (150 km)", () => {
    const out = computeEstimate({
      type: "maison",
      surface_m2: 100,
      floor: "rdc",
      salubrity: "diogene",
      zone: "hors-departement",
      distance_km: 150,
    });
    expect(out.coefficient_salubrity).toBe(2.5);
    expect(out.frais_km).toBe(90);
    expect(out.nominal).toBe(4445);
    // 4445 × 0.65 = 2889.25 → 2890
    expect(out.low).toBe(2890);
    expect(out.high).toBe(5110);
  });
});

// ============================================================
//  AXES UNITAIRES
// ============================================================
describe("computeEstimate — coefficients d'étage", () => {
  const baseInput: PricingInput = {
    type: "appartement",
    surface_m2: 50,
    floor: "rdc",
    salubrity: "normal",
    zone: "cub",
  };

  it("RDC : 1.0", () => {
    expect(
      computeEstimate({ ...baseInput, floor: "rdc" }).coefficient_etage,
    ).toBe(1.0);
  });

  it("étage avec ascenseur : 1.0 (pas de pénalité)", () => {
    expect(
      computeEstimate({ ...baseInput, floor: "etage-asc" }).coefficient_etage,
    ).toBe(1.0);
  });

  it("étage 1-2 sans ascenseur : 1.15", () => {
    expect(
      computeEstimate({ ...baseInput, floor: "etage-sans-asc" })
        .coefficient_etage,
    ).toBe(1.15);
  });

  it("étage 3+ sans ascenseur : 1.30", () => {
    expect(
      computeEstimate({ ...baseInput, floor: "haut-sans-asc" })
        .coefficient_etage,
    ).toBeCloseTo(1.3, 10);
  });
});

describe("computeEstimate — coefficients de salubrité", () => {
  it.each([
    ["normal", 1.0],
    ["poussiereux", 1.2],
    ["insalubre", 1.5],
    ["diogene", 2.5],
  ] as const)("salubrité %s → coefficient %f", (salubrity, expected) => {
    const out = computeEstimate({
      type: "appartement",
      surface_m2: 50,
      floor: "rdc",
      salubrity,
      zone: "cub",
    });
    expect(out.coefficient_salubrity).toBe(expected);
  });
});

describe("computeEstimate — frais kilométriques", () => {
  const baseInput: PricingInput = {
    type: "appartement",
    surface_m2: 50,
    floor: "rdc",
    salubrity: "normal",
    zone: "cub",
  };

  it("CUB : 0 €", () => {
    expect(computeEstimate({ ...baseInput, zone: "cub" }).frais_km).toBe(0);
  });

  it("Gironde hors CUB : forfait 65 €", () => {
    expect(
      computeEstimate({ ...baseInput, zone: "gironde-hors-cub" }).frais_km,
    ).toBe(65);
  });

  it.each([
    [0, 0],
    [1, 1],
    [100, 60],
    [150, 90],
    [500, 300],
  ])("hors département %i km → %i €", (km, expected) => {
    expect(
      computeEstimate({
        ...baseInput,
        zone: "hors-departement",
        distance_km: km,
      }).frais_km,
    ).toBe(expected);
  });

  it("hors département sans distance → throw", () => {
    expect(() =>
      computeEstimate({ ...baseInput, zone: "hors-departement" }),
    ).toThrow(PricingError);
  });

  it("hors département distance négative → throw", () => {
    expect(() =>
      computeEstimate({
        ...baseInput,
        zone: "hors-departement",
        distance_km: -10,
      }),
    ).toThrow(PricingError);
  });

  it("hors département distance NaN → throw", () => {
    expect(() =>
      computeEstimate({
        ...baseInput,
        zone: "hors-departement",
        distance_km: Number.NaN,
      }),
    ).toThrow(PricingError);
  });
});

describe("computeEstimate — densité métier (0.38)", () => {
  it("DENSITY_COEFF est bien fixé à 0.38", () => {
    expect(PRICING_CONSTANTS.DENSITY_COEFF).toBe(0.38);
  });

  it("volume_evacue_m3 = surface × 0.38 (pas de hauteur sous plafond)", () => {
    const out = computeEstimate({
      type: "maison",
      surface_m2: 100,
      floor: "rdc",
      salubrity: "normal",
      zone: "cub",
    });
    expect(out.volume_evacue_m3).toBe(38);
    // Vérification anti-régression : si quelqu'un réintroduit ×2.5,
    // le volume serait 250 — on garantit que ce n'est PAS le cas.
    expect(out.volume_evacue_m3).not.toBe(250);
  });
});

describe("computeEstimate — bornes de surface", () => {
  const base = (s: number): PricingInput => ({
    type: "appartement",
    surface_m2: s,
    floor: "rdc",
    salubrity: "normal",
    zone: "cub",
  });

  it("public : surface 10 acceptée", () => {
    expect(() => computeEstimate(base(10), "public")).not.toThrow();
  });

  it("public : surface 250 acceptée", () => {
    expect(() => computeEstimate(base(250), "public")).not.toThrow();
  });

  it("public : surface 9 rejetée", () => {
    expect(() => computeEstimate(base(9), "public")).toThrow(PricingError);
  });

  it("public : surface 251 rejetée", () => {
    expect(() => computeEstimate(base(251), "public")).toThrow(PricingError);
  });

  it("admin : surface 500 acceptée", () => {
    expect(() => computeEstimate(base(500), "admin")).not.toThrow();
  });

  it("admin : surface 501 rejetée", () => {
    expect(() => computeEstimate(base(501), "admin")).toThrow(PricingError);
  });

  it("surface non numérique rejetée", () => {
    expect(() =>
      computeEstimate({
        ...base(50),
        // @ts-expect-error volontaire pour le test
        surface_m2: "abc",
      }),
    ).toThrow(PricingError);
  });

  it("surface NaN rejetée", () => {
    expect(() => computeEstimate(base(Number.NaN))).toThrow(PricingError);
  });
});

describe("computeEstimate — coefficient correctif admin", () => {
  const base: PricingInput = {
    type: "appartement",
    surface_m2: 50,
    floor: "rdc",
    salubrity: "normal",
    zone: "cub",
  };

  it("custom_coefficient = 1.0 ne change rien", () => {
    const sans = computeEstimate(base, "admin");
    const avec = computeEstimate(
      { ...base, custom_coefficient: 1.0 },
      "admin",
    );
    expect(avec.nominal).toBe(sans.nominal);
  });

  it("custom_coefficient = 0.5 divise approximativement par 2", () => {
    const sans = computeEstimate(base, "admin");
    const avec = computeEstimate(
      { ...base, custom_coefficient: 0.5 },
      "admin",
    );
    expect(avec.nominal).toBeLessThan(sans.nominal);
    // Tolérance ±5 € — les arrondis Math.round dans la formule
    // introduisent jusqu'à 0,5 € de déviation par opération.
    // toBeCloseTo(x, -1) → différence < 10^1 / 2 = 5.
    expect(avec.nominal).toBeCloseTo(sans.nominal / 2, -1);
  });

  it("custom_coefficient interdit en contexte public", () => {
    expect(() =>
      computeEstimate({ ...base, custom_coefficient: 0.5 }, "public"),
    ).toThrow(PricingError);
  });

  it("custom_coefficient <= 0 rejeté", () => {
    expect(() =>
      computeEstimate({ ...base, custom_coefficient: 0 }, "admin"),
    ).toThrow(PricingError);
  });

  it("custom_coefficient > 5 rejeté", () => {
    expect(() =>
      computeEstimate({ ...base, custom_coefficient: 5.1 }, "admin"),
    ).toThrow(PricingError);
  });
});

describe("computeEstimate — validations enum", () => {
  const base: PricingInput = {
    type: "appartement",
    surface_m2: 50,
    floor: "rdc",
    salubrity: "normal",
    zone: "cub",
  };

  it("type inconnu rejeté", () => {
    expect(() =>
      // @ts-expect-error volontaire pour le test
      computeEstimate({ ...base, type: "chateau" }),
    ).toThrow(PricingError);
  });

  it("floor inconnu rejeté", () => {
    expect(() =>
      // @ts-expect-error volontaire pour le test
      computeEstimate({ ...base, floor: "sous-sol" }),
    ).toThrow(PricingError);
  });

  it("salubrity inconnu rejeté", () => {
    expect(() =>
      // @ts-expect-error volontaire pour le test
      computeEstimate({ ...base, salubrity: "moisi" }),
    ).toThrow(PricingError);
  });

  it("zone inconnue rejetée", () => {
    expect(() =>
      // @ts-expect-error volontaire pour le test
      computeEstimate({ ...base, zone: "espagne" }),
    ).toThrow(PricingError);
  });
});

// ============================================================
//  ANNEXES — surface des dépendances (v3 redesign formulaire)
// ============================================================
describe("computeEstimate — annexes (garage, cave, sous-sol, dépendance)", () => {
  const base: PricingInput = {
    type: "appartement",
    surface_m2: 60,
    floor: "rdc",
    salubrity: "normal",
    zone: "cub",
  };

  it("annexes_surface_m2 absent ou 0 → résultat identique", () => {
    const sans = computeEstimate(base);
    const zero = computeEstimate({ ...base, annexes_surface_m2: 0 });
    expect(zero.nominal).toBe(sans.nominal);
    expect(zero.volume_evacue_m3).toBe(sans.volume_evacue_m3);
  });

  it("annexes_surface_m2 = 15 m² ajoute 15 × 0.6 = 9 m² équivalents", () => {
    const out = computeEstimate({ ...base, annexes_surface_m2: 15 });
    // volume = (60 + 15 × 0.6) × 0.38 = 69 × 0.38 = 26.22 m³
    expect(out.volume_evacue_m3).toBeCloseTo(26.22, 2);
  });

  it("annexes_surface_m2 = 50 m² (grande dépendance) majore proportionnellement", () => {
    const sans = computeEstimate(base);
    const avec = computeEstimate({ ...base, annexes_surface_m2: 50 });
    // 50 m² × 0.6 = 30 m² équivalents = 11.4 m³ supplémentaires × 45 € = +513 €
    expect(avec.nominal).toBeGreaterThan(sans.nominal);
    expect(avec.nominal - sans.nominal).toBeCloseTo(513, 0);
  });

  it("annexes_surface_m2 négatif rejeté", () => {
    expect(() =>
      computeEstimate({ ...base, annexes_surface_m2: -5 }),
    ).toThrow(PricingError);
  });

  it("annexes_surface_m2 > 200 m² rejeté", () => {
    expect(() =>
      computeEstimate({ ...base, annexes_surface_m2: 250 }),
    ).toThrow(PricingError);
  });

  it("ANNEX_DENSITY_RATIO est figé à 0.6", () => {
    expect(PRICING_CONSTANTS.ANNEX_DENSITY_RATIO).toBe(0.6);
  });
});

describe("constantes exposées", () => {
  it("PRICING_CONSTANTS est figé", () => {
    expect(PRICING_CONSTANTS.DENSITY_COEFF).toBe(0.38);
    expect(PRICING_CONSTANTS.BASE_FORFAIT).toBe(80);
    expect(PRICING_CONSTANTS.RATE_PER_M3).toBe(45);
    expect(PRICING_CONSTANTS.GIRONDE_HORS_CUB_FLAT).toBe(65);
    expect(PRICING_CONSTANTS.RATE_PER_KM_HORS_DEPT).toBe(0.6);
    expect(PRICING_CONSTANTS.ANNEX_DENSITY_RATIO).toBe(0.6);
    expect(PRICING_CONSTANTS.ANNEX_SURFACE_MAX).toBe(200);
  });

  it("SALUBRITY_COEFFICIENTS couvre les 4 niveaux", () => {
    expect(Object.keys(SALUBRITY_COEFFICIENTS).sort()).toEqual(
      ["diogene", "insalubre", "normal", "poussiereux"].sort(),
    );
  });

  it("FLOORS_WITHOUT_ELEVATOR couvre les 4 niveaux", () => {
    expect(Object.keys(FLOORS_WITHOUT_ELEVATOR).sort()).toEqual(
      ["etage-asc", "etage-sans-asc", "haut-sans-asc", "rdc"].sort(),
    );
  });
});

describe("formatEuros", () => {
  it("formate en euros français sans décimale", () => {
    const s = formatEuros(4355);
    expect(s).toMatch(/^4\s?355\s?€$/);
  });
});
