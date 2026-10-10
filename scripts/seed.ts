import { mkdirSync, writeFileSync } from "node:fs";

mkdirSync("packages/seed/data", { recursive: true });
writeFileSync(
  "packages/seed/seed.json",
  JSON.stringify(
    {
      seed: 7331,
      generatedAt: new Date().toISOString(),
      worlds: ["dreams", "biases", "agents"],
    },
    null,
    2,
  ),
);
console.log("seeded");
