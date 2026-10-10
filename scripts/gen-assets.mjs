#!/usr/bin/env node
/** gen-assets.mjs — deterministic SVG assets for Noctiscope (seed 7331). */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const img = join(root, "apps/web/public/images");
mkdirSync(join(img, "screens"), { recursive: true });

const violet = "#a78bfa";
const abyss = "#070810";
const plasma = "#7dd3fc";

const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Noctiscope logo</title><rect width="128" height="128" rx="28" fill="${abyss}"/><path d="M64 18a34 34 0 1 0 24 58A27 27 0 0 1 64 18z" fill="${violet}"/><circle cx="86" cy="44" r="6" fill="${plasma}"/><circle cx="50" cy="80" r="3" fill="white" opacity="0.8"/><circle cx="72" cy="88" r="2" fill="white" opacity="0.6"/></svg>`;
writeFileSync(join(img, "logo.svg"), logo);

const banner = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 640"><title>Noctiscope banner</title><rect width="1280" height="640" fill="${abyss}"/><ellipse cx="640" cy="260" rx="420" ry="200" fill="${violet}" opacity="0.18"/><text x="640" y="300" text-anchor="middle" font-family="sans-serif" font-size="84" font-weight="900" fill="white">Noctiscope</text><text x="640" y="360" text-anchor="middle" font-family="sans-serif" font-size="30" fill="${plasma}">Explore the subconscious mind</text><text x="640" y="410" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#94a3b8">dreams - biases - archetypes - brainwaves - memory - emotion</text></svg>`;
writeFileSync(join(img, "banner.svg"), banner);

const og = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630"><title>Noctiscope social card</title><rect width="1200" height="630" fill="${abyss}"/><ellipse cx="600" cy="270" rx="400" ry="190" fill="${violet}" opacity="0.2"/><text x="600" y="300" text-anchor="middle" font-family="sans-serif" font-size="88" font-weight="900" fill="white">Noctiscope</text><text x="600" y="370" text-anchor="middle" font-family="sans-serif" font-size="32" fill="${plasma}">The observatory for your subconscious</text></svg>`;
writeFileSync(join(img, "og.svg"), og);
writeFileSync(join(root, "apps/web/public/favicon.svg"), logo);

const screens = [
  ["atlas.svg", "Subconscious Atlas", "12 regions - amygdala glowing"],
  ["dreams.svg", "Dream Decoder", "flying + ocean + chase = integration"],
  ["biases.svg", "Bias Lab", "18 biases with debias rituals"],
  ["brainwaves.svg", "Brainwave Observatory", "delta to gamma live bars"],
  ["journal.svg", "Shadow Journal", "deterministic mirror, zero keys"],
  ["timemachine.svg", "Time Machine", "replay t+0 to t+720"],
];
for (const [file, title, sub] of screens) {
  writeFileSync(
    join(img, "screens", file),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><title>${title}</title><rect width="800" height="500" rx="16" fill="#0d1020"/><rect x="0" y="0" width="800" height="44" rx="16" fill="#141828"/><circle cx="28" cy="22" r="6" fill="#f87171"/><circle cx="48" cy="22" r="6" fill="#fbbf24"/><circle cx="68" cy="22" r="6" fill="#34d399"/><text x="400" y="140" text-anchor="middle" font-family="sans-serif" font-size="44" font-weight="800" fill="white">${title}</text><text x="400" y="190" text-anchor="middle" font-family="sans-serif" font-size="22" fill="${plasma}">${sub}</text><rect x="120" y="240" width="560" height="180" rx="12" fill="white" opacity="0.06"/><rect x="140" y="260" width="300" height="18" rx="9" fill="${violet}" opacity="0.7"/><rect x="140" y="290" width="440" height="12" rx="6" fill="white" opacity="0.25"/><rect x="140" y="312" width="380" height="12" rx="6" fill="white" opacity="0.18"/><rect x="140" y="360" width="180" height="36" rx="18" fill="${violet}"/><text x="230" y="384" text-anchor="middle" font-family="sans-serif" font-size="16" fill="black">Explore</text></svg>`,
  );
}
console.log("assets written to apps/web/public/images");
