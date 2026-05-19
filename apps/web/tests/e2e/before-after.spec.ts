import { test, expect } from "@playwright/test";

/**
 * E2E Slider Avant/Après — Constitution P2.3 :
 * test tactile sur mobile + clavier sur desktop.
 */

test.describe("BeforeAfterStack — interaction tactile et clavier", () => {
  test("compteur visible et indique 1 sur 5", async ({ page }) => {
    await page.goto("/");
    await page.locator("section").filter({ hasText: /avant\s*\/\s*après/i }).first().scrollIntoViewIfNeeded();
    await expect(page.getByText(/1.*sur.*5/i)).toBeVisible();
  });

  test("flèche droite révèle la paire et avance le compteur (clavier)", async ({
    page,
  }) => {
    await page.goto("/");
    // Cibler la carte interactive « before »
    const card = page.getByRole("button", {
      name: /glissez pour révéler l'après/i,
    });
    await card.focus();
    await page.keyboard.press("ArrowRight");

    // Attendre la fin de l'animation (release + reset → 480 ms)
    await page.waitForTimeout(700);

    await expect(page.getByText(/2.*sur.*5/i)).toBeVisible();
  });

  test("bouton 'Recommencer' désactivé au départ", async ({ page }) => {
    await page.goto("/");
    const recommencer = page.getByRole("button", { name: /recommencer/i });
    await expect(recommencer).toBeDisabled();
  });

  test("badge 'Photo d'illustration' apparaît sur les paires placeholder", async ({
    page,
  }) => {
    await page.goto("/");
    const card = page.getByRole("button", {
      name: /glissez pour révéler l'après/i,
    });
    await card.focus();

    // Paire 1 : réelle (pas de badge)
    await expect(page.getByText(/photo d'illustration/i)).toHaveCount(0);

    // Avancer à la paire 2 (placeholder)
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(700);
    await expect(page.getByText(/photo d'illustration/i)).toBeVisible();
  });
});

test.describe("BeforeAfterStack — tactile (mobile uniquement)", () => {
  test.skip(
    ({ browserName, isMobile }) => !isMobile,
    "Test uniquement pertinent sur appareil tactile",
  );

  test("glissement tactile suffisant révèle la carte", async ({ page }) => {
    await page.goto("/");
    const card = page.getByRole("button", {
      name: /glissez pour révéler l'après/i,
    });
    await card.scrollIntoViewIfNeeded();

    const box = await card.boundingBox();
    if (!box) throw new Error("card boundingBox introuvable");

    const startX = box.x + 50;
    const startY = box.y + box.height / 2;
    const endX = startX + 200; // largement au-dessus du seuil de 120 px

    // Geste tactile : down → moves → up
    await page.touchscreen.tap(startX, startY);
    // Playwright n'a pas d'API tactile native drag : on simule via pointer events.
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + 60, startY, { steps: 5 });
    await page.mouse.move(endX, startY, { steps: 10 });
    await page.mouse.up();

    await page.waitForTimeout(700);
    await expect(page.getByText(/2.*sur.*5/i)).toBeVisible();
  });
});
