import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["packages/**/tests/**/*.test.ts", "apps/web/**/*.test.ts"],
    environment: "node",
  },
});
