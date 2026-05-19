import { test, expect } from "@playwright/test";

/**
 * Smoke tests SEO — Constitution P4.7.
 *
 * Vérifie que chaque route critique livre :
 *  - un <title>
 *  - une <meta name="description">
 *  - un <link rel="canonical">
 *  - au moins un <script type="application/ld+json">
 *
 * Vérifie également :
 *  - /robots.txt : Disallow /api/ et /admin/
 *  - /sitemap.xml : référence les routes critiques
 *  - /admin/estimateur : meta robots noindex
 */

const ROUTES_INDEXABLES = [
  "/",
  "/zones",
  "/zones/bordeaux",
  "/zones/mont-de-marsan",
  "/services",
  "/services/debarras-maison-appartement",
  "/services/nettoyage-extreme-diogene",
  "/blog",
  "/blog/prix-debarras-gironde-2026",
];

test.describe("SEO smoke — métadonnées obligatoires", () => {
  for (const route of ROUTES_INDEXABLES) {
    test(`${route} expose title + description + canonical + JSON-LD`, async ({
      page,
    }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBeLessThan(400);

      // <title> — Phase 2 SEO (meta.md) : la mention « L'Espace Libre »
      // n'est plus systématiquement présente dans le <title> (budget de
      // 40–60 caractères figé par la feuille de route). On vérifie
      // uniquement que la balise existe et est non triviale.
      const title = await page.title();
      expect(title.length).toBeGreaterThan(10);

      // <meta name="description">
      const description = await page
        .locator('head meta[name="description"]')
        .getAttribute("content");
      expect(description?.length ?? 0).toBeGreaterThan(20);

      // <link rel="canonical">
      const canonical = await page
        .locator('head link[rel="canonical"]')
        .getAttribute("href");
      expect(canonical).toMatch(/^https?:\/\//);

      // JSON-LD présent
      const ldCount = await page
        .locator('script[type="application/ld+json"]')
        .count();
      expect(ldCount).toBeGreaterThanOrEqual(1);
    });
  }
});

test.describe("SEO infrastructure — robots et sitemap", () => {
  test("/robots.txt bloque /api/ et /admin/", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/Disallow:\s*\/api\//i);
    expect(body).toMatch(/Disallow:\s*\/admin\//i);
    expect(body).toMatch(/Sitemap:\s*https?:\/\//i);
  });

  test("/sitemap.xml référence les routes critiques", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("/zones/bordeaux");
    expect(body).toContain("/zones/mont-de-marsan");
    expect(body).toContain("/services/debarras-maison-appartement");
    expect(body).toContain("/blog/prix-debarras-gironde-2026");
    // Le sitemap ne doit PAS exposer /admin
    expect(body).not.toContain("/admin");
  });
});

test.describe("SEO admin — page non indexable", () => {
  test("/admin/estimateur émet meta robots noindex", async ({ page }) => {
    await page.goto("/admin/estimateur");
    const robots = await page
      .locator('head meta[name="robots"]')
      .getAttribute("content");
    expect(robots).toBeTruthy();
    expect(robots!.toLowerCase()).toContain("noindex");
    expect(robots!.toLowerCase()).toContain("nofollow");
  });
});

test.describe("JSON-LD structuré — validation des types schema.org", () => {
  test("page locale Bordeaux contient LocalBusiness + BreadcrumbList", async ({
    page,
  }) => {
    await page.goto("/zones/bordeaux");
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const json = scripts.map((s) => JSON.parse(s));
    const types = json.map((j) => j["@type"]);
    expect(types).toContain("LocalBusiness");
    expect(types).toContain("BreadcrumbList");
  });

  test("page service contient Service + FAQPage + BreadcrumbList", async ({
    page,
  }) => {
    await page.goto("/services/debarras-maison-appartement");
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const json = scripts.map((s) => JSON.parse(s));
    const types = json.map((j) => j["@type"]);
    expect(types).toContain("Service");
    expect(types).toContain("FAQPage");
    expect(types).toContain("BreadcrumbList");
  });

  test("article blog contient Article + BreadcrumbList", async ({ page }) => {
    await page.goto("/blog/prix-debarras-gironde-2026");
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const json = scripts.map((s) => JSON.parse(s));
    const types = json.map((j) => j["@type"]);
    expect(types).toContain("Article");
    expect(types).toContain("BreadcrumbList");
  });
});
