import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.E2E_PORT ?? 3000);

export default defineConfig({
  testDir: "./apps/web/tests/e2e",
  fullyParallel: true,
  webServer: {
    command:
      "bun run build --filter=@noctiscope/web && bun run start --filter=@noctiscope/web",
    port,
    reuseExistingServer: !process.env.CI,
    timeout: 300000,
    env: { PORT: String(port) },
  },
  use: { baseURL: `http://127.0.0.1:${port}`, trace: "on-first-retry" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
