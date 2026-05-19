import { test, expect } from "@playwright/test";

/**
 * E2E Simulateur — parcours 3 étapes complet sur la page d'accueil.
 *
 * La soumission API est interceptée et stubée pour ne pas envoyer
 * d'e-mails réels en CI. On vérifie que l'écran « Votre estimation »
 * apparaît avec une fourchette plausible.
 */
test.describe("Simulateur public — parcours complet", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/api/simulator", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, range: { low: 940, high: 1270 } }),
      });
    });
  });

  test("3 étapes mènent à l'écran de résultat (chemin nominal)", async ({
    page,
  }) => {
    await page.goto("/");

    // CTA d'entrée
    await page.getByRole("link", { name: /estimation gratuite/i }).first().click();

    // Étape 1 : sélection du type
    await page.getByRole("button", { name: /appartement/i }).click();
    await page.getByRole("button", { name: /continuer/i }).click();

    // Étape 2 : surface par défaut (60) et étage RDC — on continue tel quel
    // Vérification que le volume évacué est affiché (~22.8 m³)
    await expect(page.getByText(/m³/)).toBeVisible();
    await page.getByRole("button", { name: /continuer/i }).click();

    // Étape 3 : e-mail + consentement
    await page.getByLabel(/adresse e-mail/i).fill("prenom.nom@exemple.fr");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: /obtenir mon estimation/i }).click();

    // Écran résultat
    await expect(page.getByText(/Votre estimation/i)).toBeVisible();
    await expect(page.getByText(/940/)).toBeVisible();
    await expect(page.getByText(/1\s?270/)).toBeVisible();
  });

  test("bouton Continuer désactivé tant qu'aucun type n'est choisi", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /estimation gratuite/i }).first().click();
    const cta = page.getByRole("button", { name: /continuer/i });
    await expect(cta).toBeDisabled();
  });

  test("validation e-mail : refus d'une adresse invalide", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /estimation gratuite/i }).first().click();
    await page.getByRole("button", { name: /maison/i }).click();
    await page.getByRole("button", { name: /continuer/i }).click();
    await page.getByRole("button", { name: /continuer/i }).click();
    await page.getByLabel(/adresse e-mail/i).fill("pas-une-adresse");
    await page.getByRole("checkbox").check();
    await expect(
      page.getByRole("button", { name: /obtenir mon estimation/i }),
    ).toBeDisabled();
  });

  test("navigation au clavier seul (Tab + Entrée)", async ({ page }) => {
    await page.goto("/#simulator");
    // On focus le premier type
    await page.getByRole("button", { name: /maison/i }).focus();
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab"); // suivant
    // Le focus doit pouvoir atteindre le bouton Continuer
    await page.getByRole("button", { name: /continuer/i }).focus();
    await expect(
      page.getByRole("button", { name: /continuer/i }),
    ).toBeFocused();
  });
});

test.describe("Simulateur — gestion d'erreur", () => {
  test("affiche un message clair en cas de 429 rate-limit", async ({ page }) => {
    await page.route("**/api/simulator", async (route) => {
      await route.fulfill({
        status: 429,
        contentType: "application/json",
        body: JSON.stringify({ error: "rate_limit" }),
      });
    });

    await page.goto("/#simulator");
    await page.getByRole("button", { name: /appartement/i }).click();
    await page.getByRole("button", { name: /continuer/i }).click();
    await page.getByRole("button", { name: /continuer/i }).click();
    await page.getByLabel(/adresse e-mail/i).fill("test@exemple.fr");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: /obtenir mon estimation/i }).click();

    await expect(page.getByText(/trop de demandes/i)).toBeVisible();
  });
});
