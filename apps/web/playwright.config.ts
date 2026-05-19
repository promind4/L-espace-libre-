import { defineConfig, devices } from "@playwright/test";

/**
 * Configuration Playwright — Constitution P2.3 :
 * tests E2E sur Chrome mobile, Safari mobile, Chrome desktop.
 *
 * Lance automatiquement `pnpm dev` si `PLAYWRIGHT_BASE_URL` n'est pas
 * défini ; sinon (CI Vercel preview), pointe sur l'URL fournie.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env["CI"],
  retries: process.env["CI"] ? 1 : 0,
  workers: process.env["CI"] ? 1 : undefined,
  reporter: [
    ["html", { open: "never" }],
    ["list"],
  ],
  timeout: 30_000,
  expect: { timeout: 8_000 },
  use: {
    baseURL: process.env["PLAYWRIGHT_BASE_URL"] ?? "http://localhost:3000",
    trace: "on-first-retry",
    locale: "fr-FR",
    timezoneId: "Europe/Paris",
  },
  projects: [
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "chromium-mobile",
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "webkit-mobile",
      use: { ...devices["iPhone 14"] },
    },
  ],
  webServer: process.env["PLAYWRIGHT_BASE_URL"]
    ? undefined
    : {
        command: "pnpm dev",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env["CI"],
        timeout: 120_000,
      },
});
