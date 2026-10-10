import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./apps/web/tests/e2e",
  fullyParallel: true,
  webServer: {
    command:
      "bun run build --filter=@noctiscope/web && bun run start --filter=@noctiscope/web",
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 300000,
  },
  use: { baseURL: "http://127.0.0.1:3000", trace: "on-first-retry" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
