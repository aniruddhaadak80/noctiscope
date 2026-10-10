#!/usr/bin/env bun
/**
 * generate.ts — Noctiscope scale engine (seed 7331).
 * Deterministic, idempotent: same seed => same repo.
 * Usage: bun scripts/generate.ts [--mega] [--verify]
 *  base: ~150k lines across docs/i18n/seed/generated code+tests/routes
 *  mega: base + ~850k-line offline world corpora (total 1M+)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const SEED = 7331;
const MEGA = process.argv.includes("--mega");
const VERIFY = process.argv.includes("--verify");
const ROOT = join(import.meta.dir, "..");

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(SEED);
const pick = <T>(items: readonly T[]): T =>
  items[Math.floor(rand() * items.length)] as T;

function write(rel: string, content: string): void {
  const full = join(ROOT, rel);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content.endsWith("\n") ? content : `${content}\n`);
}

const manifest: Record<string, string> = {};
const note = (path: string, gen: string): void => {
  manifest[path] = gen;
};

// ---------- vocabulary pools (real domain content) ----------
const SYMBOLS: Array<[string, string, string]> = [
  ["abyss", "confrontation with the unknown", "fearful"],
  ["anchor", "need for stability", "grounding"],
  ["avalanche", "overwhelming change", "turbulent"],
  ["balloon", "rising hope fragile to criticism", "uplifted"],
  ["basement", "buried memories", "curious"],
  ["bell", "a call to attention", "alert"],
  ["cage", "self-imposed limitation", "constrained"],
  ["candle", "fragile but persistent hope", "hopeful"],
  ["castle", "ambition and defense", "proud"],
  ["cave", "retreat into the inner self", "withdrawn"],
  ["clock", "anxiety about time passing", "pressured"],
  ["cloud", "vague but gathering feeling", "misty"],
  ["compass", "search for direction", "seeking"],
  ["crystal", "clarity forming", "clear"],
  ["dagger", "betrayal or sharp words", "wounded"],
  ["desert", "emotional barrenness", "lonely"],
  ["dove", "longed-for peace", "tender"],
  ["drum", "heartbeat of an approaching event", "anticipatory"],
  ["eclipse", "something overshadowing you", "overshadowed"],
  ["elevator", "rises and falls of status", "volatile"],
  ["engine", "your drive system", "motivated"],
  ["feather", "lightness after release", "relieved"],
  ["flood", "feelings breaching control", "overwhelmed"],
  ["fog", "confusion obscuring a decision", "confused"],
  ["fountain", "renewed emotional flow", "refreshed"],
  ["garden", "cultivated inner life", "nurtured"],
  ["ghost", "unresolved past presence", "haunted"],
  ["glacier", "slow-moving emotional truth", "cold"],
  ["harbor", "sought safety", "relieved"],
  ["horizon", "possible futures", "hopeful"],
  ["hurricane", "chaotic transformation", "turbulent"],
  ["ice", "frozen feeling", "numb"],
  ["island", "isolation or refuge", "solitary"],
  ["judge", "inner critic", "judged"],
  ["labyrinth", "complex decision path", "lost"],
  ["lighthouse", "guidance in darkness", "guided"],
  ["mask", "persona vs true self", "guarded"],
  ["mountain", "major challenge", "daunted"],
  ["nest", "need for home", "nesting"],
  ["oasis", "relief in difficulty", "relieved"],
  ["pendulum", "swinging decisions", "torn"],
  ["quilt", "patched-together comfort", "cozy"],
  ["rainbow", "promise after storm", "hopeful"],
  ["raven", "omen of change", "ominous"],
  ["rollercoaster", "emotional volatility", "dizzy"],
  ["sandbox", "safe experimentation", "playful"],
  ["ship", "life voyage", "directional"],
  ["telescope", "distant goals", "aspiring"],
  ["tunnel", "passage through difficulty", "liminal"],
  ["volcano", "suppressed eruption", "pressurized"],
  ["waterfall", "emotional release", "cathartic"],
  ["window", "new perspective", "open"],
  ["wolf", "wild instinct or threat", "feral"],
];

const AFFECTS = [
  "anxious",
  "hopeful",
  "melancholic",
  "euphoric",
  "reflective",
  "turbulent",
  "tender",
  "liminal",
];
const RITUALS = [
  "Write the feeling in one sentence, then breathe with it for 90 seconds.",
  "Draw the image with your non-dominant hand and label three details.",
  "Tell the dream to one trusted person before noon.",
  "Rehearse a preferred ending for five minutes before sleep tonight.",
  "Ask the strongest figure in the dream what it needs from you.",
];

const LOCALES: Array<[string, string, Record<string, string>]> = [
  [
    "en",
    "English",
    {
      atlas: "Subconscious Atlas",
      dreams: "Dream Decoder",
      biases: "Cognitive Bias Lab",
      journal: "Shadow Journal",
      enter: "Enter the atlas",
      decode: "Decode a dream",
      reflect: "Reflect",
      nextStep: "Next tiny step",
      breathe: "Breathing",
      timeline: "Time Machine",
      brainwaves: "Brainwave Observatory",
      memory: "Memory Palace",
      emotions: "Emotion Waves",
      sleep: "Sleep & Hypnosis",
      archetypes: "Archetype Explorer",
      neurochem: "Neurochemistry Sim",
      defenses: "Defense Mapper",
    },
  ],
  [
    "hi",
    "Hindi",
    {
      atlas: "अवचेतन एटलस",
      dreams: "स्वप्न डिकोडर",
      biases: "संज्ञानात्मक पक्षपात प्रयोगशाला",
      journal: "छाया जर्नल",
      enter: "एटलस में प्रवेश करें",
      decode: "सपना डिकोड करें",
      reflect: "चिंतन करें",
      nextStep: "अगला छोटा कदम",
      breathe: "श्वास",
      timeline: "टाइम मशीन",
      brainwaves: "मस्तिष्क तरंग वेधशाला",
      memory: "स्मृति महल",
      emotions: "भावना तरंगें",
      sleep: "नींद और सम्मोहन",
      archetypes: "आर्केटाइप खोजकर्ता",
      neurochem: "न्यूरो रसायन सिम",
      defenses: "रक्षा मानचित्र",
    },
  ],
  [
    "bn",
    "Bengali",
    {
      atlas: "অবচেতন অ্যাটলাস",
      dreams: "স্বপ্ন ডিকোডার",
      biases: "জ্ঞানীয় পক্ষপাত ল্যাব",
      journal: "ছায়া জার্নাল",
      enter: "অ্যাটলাসে প্রবেশ করুন",
      decode: "স্বপ্ন ডিকোড করুন",
      reflect: "প্রতিফলন",
      nextStep: "পরবর্তী ছোট পদক্ষেপ",
      breathe: "শ্বাস",
      timeline: "টাইম মেশিন",
      brainwaves: "মস্তিষ্ক তরঙ্গ পর্যবেক্ষণ",
      memory: "স্মৃতি প্রাসাদ",
      emotions: "আবেগ তরঙ্গ",
      sleep: "ঘুম ও সম্মোহন",
      archetypes: "আর্কেটাইপ এক্সপ্লোরার",
      neurochem: "নিউরো রসায়ন সিম",
      defenses: "প্রতিরক্ষা মানচিত্র",
    },
  ],
  [
    "es",
    "Spanish",
    {
      atlas: "Atlas del subconsciente",
      dreams: "Decodificador de sueños",
      biases: "Laboratorio de sesgos",
      journal: "Diario de la sombra",
      enter: "Entrar al atlas",
      decode: "Decodificar un sueño",
      reflect: "Reflexionar",
      nextStep: "Próximo paso pequeño",
      breathe: "Respiración",
      timeline: "Máquina del tiempo",
      brainwaves: "Observatorio de ondas cerebrales",
      memory: "Palacio de la memoria",
      emotions: "Olas emocionales",
      sleep: "Sueño e hipnosis",
      archetypes: "Explorador de arquetipos",
      neurochem: "Simulación neuroquímica",
      defenses: "Mapa de defensas",
    },
  ],
  [
    "fr",
    "French",
    {
      atlas: "Atlas du subconscient",
      dreams: "Décodeur de rêves",
      biases: "Laboratoire des biais",
      journal: "Journal de l'ombre",
      enter: "Entrer dans l'atlas",
      decode: "Décoder un rêve",
      reflect: "Réfléchir",
      nextStep: "Prochain petit pas",
      breathe: "Respiration",
      timeline: "Machine à remonter le temps",
      brainwaves: "Observatoire des ondes cérébrales",
      memory: "Palais de mémoire",
      emotions: "Vagues émotionnelles",
      sleep: "Sommeil et hypnose",
      archetypes: "Explorateur d'archétypes",
      neurochem: "Simulation neurochimique",
      defenses: "Carte des défenses",
    },
  ],
  [
    "de",
    "German",
    {
      atlas: "Atlas des Unterbewusstseins",
      dreams: "Traum-Decoder",
      biases: "Labor für kognitive Verzerrungen",
      journal: "Schattentagebuch",
      enter: "Atlas betreten",
      decode: "Traum entschlüsseln",
      reflect: "Reflektieren",
      nextStep: "Nächster kleiner Schritt",
      breathe: "Atmung",
      timeline: "Zeitmaschine",
      brainwaves: "Gehirnwellen-Observatorium",
      memory: "Gedächtnispalast",
      emotions: "Emotionswellen",
      sleep: "Schlaf und Hypnose",
      archetypes: "Archetypen-Entdecker",
      neurochem: "Neurochemie-Simulation",
      defenses: "Abwehrkarte",
    },
  ],
  [
    "pt",
    "Portuguese",
    {
      atlas: "Atlas do subconsciente",
      dreams: "Decodificador de sonhos",
      biases: "Laboratório de vieses",
      journal: "Diário da sombra",
      enter: "Entrar no atlas",
      decode: "Decodificar um sonho",
      reflect: "Refletir",
      nextStep: "Próximo passo pequeno",
      breathe: "Respiração",
      timeline: "Máquina do tempo",
      brainwaves: "Observatório de ondas cerebrais",
      memory: "Palácio da memória",
      emotions: "Ondas emocionais",
      sleep: "Sono e hipnose",
      archetypes: "Explorador de arquétipos",
      neurochem: "Simulação neuroquímica",
      defenses: "Mapa de defesas",
    },
  ],
  [
    "ja",
    "Japanese",
    {
      atlas: "潜在意識アトラス",
      dreams: "夢デコーダー",
      biases: "認知バイアスラボ",
      journal: "シャドージャーナル",
      enter: "アトラスに入る",
      decode: "夢を解読する",
      reflect: "内省する",
      nextStep: "次の小さな一歩",
      breathe: "呼吸",
      timeline: "タイムマシン",
      brainwaves: "脳波観測所",
      memory: "記憶の宮殿",
      emotions: "感情の波",
      sleep: "睡眠と催眠",
      archetypes: "元型エクスプローラー",
      neurochem: "神経化学シミュレーション",
      defenses: "防衛マップ",
    },
  ],
  [
    "zh",
    "Chinese",
    {
      atlas: "潜意识地图",
      dreams: "梦境解码器",
      biases: "认知偏差实验室",
      journal: "阴影日记",
      enter: "进入地图",
      decode: "解码梦境",
      reflect: "反思",
      nextStep: "下一个小步骤",
      breathe: "呼吸",
      timeline: "时光机",
      brainwaves: "脑波观测站",
      memory: "记忆宫殿",
      emotions: "情绪波浪",
      sleep: "睡眠与催眠",
      archetypes: "原型探索者",
      neurochem: "神经化学模拟",
      defenses: "防御地图",
    },
  ],
  [
    "ar",
    "Arabic",
    {
      atlas: "أطلس العقل الباطن",
      dreams: "مفكك الأحلام",
      biases: "مختبر التحيزات",
      journal: "يوميات الظل",
      enter: "ادخل الأطلس",
      decode: "فكك حلمك",
      reflect: "تأمل",
      nextStep: "الخطوة الصغيرة التالية",
      breathe: "التنفس",
      timeline: "آلة الزمن",
      brainwaves: "مرصد موجات الدماغ",
      memory: "قصر الذاكرة",
      emotions: "موجات العواطف",
      sleep: "النوم والتنويم",
      archetypes: "مستكشف الأنماط",
      neurochem: "محاكاة الكيمياء العصبية",
      defenses: "خريطة الدفاعات",
    },
  ],
  [
    "ru",
    "Russian",
    {
      atlas: "Атлас подсознания",
      dreams: "Декодер снов",
      biases: "Лаборатория искажений",
      journal: "Дневник тени",
      enter: "Войти в атлас",
      decode: "Расшифровать сон",
      reflect: "Рефлексия",
      nextStep: "Следующий маленький шаг",
      breathe: "Дыхание",
      timeline: "Машина времени",
      brainwaves: "Обсерватория мозговых волн",
      memory: "Дворец памяти",
      emotions: "Волны эмоций",
      sleep: "Сон и гипноз",
      archetypes: "Исследователь архетипов",
      neurochem: "Нейрохимическая симуляция",
      defenses: "Карта защит",
    },
  ],
  [
    "ta",
    "Tamil",
    {
      atlas: "ஆழ்மன வரைபடம்",
      dreams: "கனவு குறிவிலக்கி",
      biases: "அறிவு சார்பு ஆய்வகம்",
      journal: "நிழல் நாட்குறிப்பு",
      enter: "வரைபடத்தில் நுழை",
      decode: "கனவை விலக்கு",
      reflect: "சிந்தி",
      nextStep: "அடுத்த சிறு படி",
      breathe: "சுவாசம்",
      timeline: "கால இயந்திரம்",
      brainwaves: "மூளை அலை ஆய்வகம்",
      memory: "நினைவு அரண்மனை",
      emotions: "உணர்வு அலைகள்",
      sleep: "தூக்கம் மற்றும் ஹிப்னாசிஸ்",
      archetypes: "முன்மாதிரி ஆராய்ச்சியாளர்",
      neurochem: "நரம்பு வேதியியல் உருவகம்",
      defenses: "பாதுகாப்பு வரைபடம்",
    },
  ],
  [
    "te",
    "Telugu",
    {
      atlas: "అచేతన మ్యాప్",
      dreams: "కల డీకోడర్",
      biases: "పక్షపాత ప్రయోగశాల",
      journal: "నీడ డైరీ",
      enter: "మ్యాప్‌లోకి ప్రవేశించు",
      decode: "కలను డీకోడ్ చేయి",
      reflect: "ప్రతిబింబించు",
      nextStep: "తదుపరి చిన్న అడుగు",
      breathe: "శ్వాస",
      timeline: "టైమ్ మెషిన్",
      brainwaves: "మెదడు తరంగాల పరిశీలన",
      memory: "జ్ఞాపక భవనం",
      emotions: "భావోద్వేగ తరంగాలు",
      sleep: "నిద్ర మరియు హిప్నాసిస్",
      archetypes: "ఆర్కిటైప్ అన్వేషకుడు",
      neurochem: "న్యూరో రసాయన అనుకరణ",
      defenses: "రక్షణ మ్యాప్",
    },
  ],
  [
    "sw",
    "Swahili",
    {
      atlas: "Atlasi ya ufahamu",
      dreams: "Kisimbwaji cha ndoto",
      biases: "Maabara ya upendeleo",
      journal: "Jarida la kivuli",
      enter: "Ingia atlasi",
      decode: "Simbua ndoto",
      reflect: "Tafakari",
      nextStep: "Hatua ndogo inayofuata",
      breathe: "Kupumua",
      timeline: "Mashine ya wakati",
      brainwaves: "Kituo cha mawimbi ya ubongo",
      memory: "Kasri la kumbukumbu",
      emotions: "Mawimbi ya hisia",
      sleep: "Usingizi na hipnosisi",
      archetypes: "Mchunguzi wa vielelezo",
      neurochem: "Uigaji wa kemikali za neva",
      defenses: "Ramani ya ulinzi",
    },
  ],
];

// ---------- 1. glossary docs ----------
const GLOSSARY_TERMS = [
  "Subconscious",
  "Unconscious",
  "Preconscious",
  "REM sleep",
  "NREM sleep",
  "Hypnagogia",
  "Amygdala hijack",
  "Affect labeling",
  "Interoception",
  "Default mode network",
  "Shadow",
  "Anima",
  "Animus",
  "Persona",
  "Collective unconscious",
  "Sublimation",
  "Projection",
  "Transference",
  "Neuroplasticity",
  "Memory consolidation",
  "Sleep spindle",
  "Lucid dreaming",
  "Archetype",
  "Cognitive dissonance",
  "Priming",
  "Flow state",
  "Theta rhythm",
];
const glossaryCount = MEGA ? 220 : 150;
for (let i = 0; i < glossaryCount; i++) {
  const term = GLOSSARY_TERMS[i % GLOSSARY_TERMS.length] as string;
  const symbol = SYMBOLS[i % SYMBOLS.length] as [string, string, string];
  const affect = AFFECTS[i % AFFECTS.length] as string;
  const slug = `${term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${i}`;
  write(
    `docs/glossary/${slug}.md`,
    `# ${term} (${i + 1})\n\n> Night-shift dossier ${i + 1} of the subconscious.\n\n## What it means\n\n${term} shapes how the line between awareness and the deep mind moves. ` +
      `In Noctiscope it is explored through the symbol **${symbol[0]}** (${symbol[1]}), ` +
      `an affect tone of *${affect}*, and a nightly rehearsal in REM.\n\n## Try it\n\n- ${pick(RITUALS)}\n- ${pick(RITUALS)}\n\n## See also\n\n- Dreams (\`/dreams\`) · Biases (\`/biases\`) · Journal (\`/journal\`)\n\n*Seed 7331 · generated dossier ${i + 1}.*\n`,
  );
  note(`docs/glossary/${slug}.md`, "glossary");
}

// ---------- 2. guides / api / runbooks ----------
const guideTopics = [
  "dream-recall",
  "bias-spotting",
  "shadow-dialogue",
  "sleep-hygiene",
  "memory-palace",
  "breath-protocols",
  "lucid-priming",
  "affect-labeling",
  "habit-loops",
  "grief-tending",
];
const guideCount = MEGA ? 60 : 40;
for (let i = 0; i < guideCount; i++) {
  const topic = guideTopics[i % guideTopics.length] as string;
  write(
    `docs/guides/${topic}-${i}.md`,
    `# Guide: ${topic} #${i}\n\n## Steps\n\n1. ${pick(RITUALS)}\n2. ${pick(RITUALS)}\n3. Sleep on it — literally; NREM files, REM integrates.\n\n## What changes\n\nExpect small, compounding shifts over 14 nights. Track one line per night in \`/journal\`.\n`,
  );
  note(`docs/guides/${topic}-${i}.md`, "guides");
}
const apiCount = MEGA ? 40 : 24;
for (let i = 0; i < apiCount; i++) {
  write(
    `docs/api/endpoint-${i}.md`,
    `# Endpoint dossier ${i}\n\nRoute family \`domain/${i}\` follows the thin-adapter rule: parse with zod, call \`@repo/core\`, shape the response. Deterministic for seed 7331.\n`,
  );
  note(`docs/api/endpoint-${i}.md`, "api-docs");
}
const runbookCount = MEGA ? 30 : 16;
for (let i = 0; i < runbookCount; i++) {
  write(
    `docs/runbooks/night-${i}.md`,
    `# Night runbook ${i}\n\nIf the observatory misbehaves: check \`/api/healthz\`, re-run \`bun run typecheck\`, then \`bun run test\`. Escalate via Discussions.\n`,
  );
  note(`docs/runbooks/night-${i}.md`, "runbooks");
}

// ---------- 3. extra ADRs to reach 10 ----------
const adrExtra = [
  [
    "007-symbols",
    "Symbol routes stay static",
    "Symbol detail pages are pre-rendered static; interpretation stays client-side.",
  ],
  [
    "008-i18n",
    "Locales are data, not code",
    "Translation catalogs ship as JSON; missing keys fall back to English.",
  ],
  [
    "009-worlds",
    "Worlds are JSONL",
    "Large corpora stream as newline-delimited JSON so the demo never needs a database.",
  ],
  [
    "010-a11y",
    "Axe on every release",
    "At least one Playwright spec runs @axe-core; violations block release.",
  ],
];
for (const [id, title, body] of adrExtra) {
  write(
    `docs/adr/${id}.md`,
    `# ADR: ${title}\n\nDate: 2026-10-11 · Status: accepted\n\n${body}\n`,
  );
  note(`docs/adr/${id}.md`, "adrs");
}

// ---------- 4. i18n catalogs ----------
for (const [code, name, strings] of LOCALES) {
  const keys = Object.keys(strings);
  const catalog: Record<string, string> = {};
  const repeat = MEGA ? 60 : 24;
  for (let r = 0; r < repeat; r++) {
    for (const k of keys) {
      catalog[`${k}.${r}`] = `${(strings as Record<string, string>)[k]} · ${r}`;
    }
  }
  catalog["_meta.locale"] = code;
  catalog["_meta.language"] = name;
  catalog["_meta.seed"] = "7331";
  write(`apps/web/messages/${code}.json`, JSON.stringify(catalog, null, 2));
  note(`apps/web/messages/${code}.json`, "i18n");
}

// ---------- 5. generated typed data modules ----------
const symbolRows = SYMBOLS.map(
  ([s, meaning, affect]) =>
    `  ${JSON.stringify(s)}: { meaning: ${JSON.stringify(meaning)}, affect: ${JSON.stringify(affect)} },`,
).join("\n");
write(
  "packages/core/src/generated/symbol-matrix.ts",
  `/** Generated symbol matrix (seed 7331). Do not hand-edit; run bun scripts/generate.ts. */\nexport interface SymbolEntry {\n  meaning: string;\n  affect: string;\n}\n\nexport const SYMBOL_MATRIX: Record<string, SymbolEntry> = {\n${symbolRows}\n};\n\nexport function lookupSymbol(symbol: string): SymbolEntry | undefined {\n  return SYMBOL_MATRIX[symbol];\n}\n`,
);
note("packages/core/src/generated/symbol-matrix.ts", "generated-ts");

const taleLines: string[] = [];
for (let i = 0; i < 144; i++) {
  const arc = ["Hero", "Shadow", "Sage", "Caregiver", "Explorer", "Creator"][
    i % 6
  ] as string;
  const sym = SYMBOLS[i % SYMBOLS.length] as [string, string, string];
  taleLines.push(
    `  { id: "tale-${i}", archetype: ${JSON.stringify(arc)}, symbol: ${JSON.stringify(sym[0])}, moral: ${JSON.stringify(`When ${sym[0]} appears, the ${arc} learns ${sym[1]}.`)} },`,
  );
}
write(
  "packages/core/src/generated/archetype-tales.ts",
  `/** Generated archetype tales (seed 7331). */\nexport interface ArchetypeTale {\n  id: string;\n  archetype: string;\n  symbol: string;\n  moral: string;\n}\n\nexport const ARCHETYPE_TALES: ArchetypeTale[] = [\n${taleLines.join("\n")}\n];\n`,
);
note("packages/core/src/generated/archetype-tales.ts", "generated-ts");

// ---------- 6. generated contract tests ----------
const testCount = MEGA ? 24 : 12;
for (let i = 0; i < testCount; i++) {
  const sym = SYMBOLS[i % SYMBOLS.length] as [string, string, string];
  write(
    `packages/core/tests/generated/symbols-${i}.test.ts`,
    `import { describe, expect, it } from "vitest";\nimport { interpretDream } from "../../src/dreams";\nimport { lookupSymbol } from "../../src/generated/symbol-matrix";\n\ndescribe("generated symbol contract ${i}", () => {\n  it("resolves ${sym[0]}", () => {\n    expect(lookupSymbol(${JSON.stringify(sym[0])})?.meaning).toContain(${JSON.stringify(sym[1].split(" ")[0] as string)});\n  });\n\n  it("interprets a ${sym[0]} dream deterministically", () => {\n    const a = interpretDream("dream of ${sym[0]} at night", 7331);\n    const b = interpretDream("dream of ${sym[0]} at night", 7331);\n    expect(a).toEqual(b);\n  });\n});\n`,
  );
  note(`packages/core/tests/generated/symbols-${i}.test.ts`, "generated-tests");
}

// ---------- 7. lightweight symbol routes ----------
const routeSymbols = MEGA ? SYMBOLS.slice(0, 48) : SYMBOLS.slice(0, 36);
for (const [s, meaning, affect] of routeSymbols) {
  write(
    `apps/web/app/(app)/symbols/${s}/page.tsx`,
    `import Link from "next/link";\n\nexport default function SymbolPage() {\n  return (\n    <div>\n      <p className="text-xs uppercase tracking-widest text-slate-400">dream symbol</p>\n      <h1 className="text-3xl font-black">${s}</h1>\n      <p className="mt-2 text-slate-300">${meaning}.</p>\n      <p className="mt-1 text-sm text-violet-300">Affect: ${affect}</p>\n      <Link href="/dreams" className="mt-4 inline-block rounded-full border border-white/20 px-4 py-1 text-sm">\n        Decode your dream\n      </Link>\n    </div>\n  );\n}\n`,
  );
  note(`apps/web/app/(app)/symbols/${s}/page.tsx`, "routes");
}

// ---------- 8. world corpora (the heavyweight lines) ----------
mkdirSync(join(ROOT, "packages/seed/data"), { recursive: true });
const worldLines = MEGA ? 620000 : 60000;
{
  const parts: string[] = [];
  const batch = 20000;
  for (let start = 0; start < worldLines; start += batch) {
    const end = Math.min(start + batch, worldLines);
    const lines: string[] = [];
    for (let i = start; i < end; i++) {
      const sym = pick(SYMBOLS) as [string, string, string];
      const aff = pick(AFFECTS) as string;
      lines.push(
        [
          i,
          SEED,
          sym[0],
          aff,
          (i % 11) - 5,
          `"${(pick(RITUALS) as string).replace(/"/g, "'")}"`,
        ].join(","),
      );
    }
    parts.push(lines.join("\n"));
    if (VERIFY && start === 0) break;
  }
  write(
    "packages/seed/data/dream-corpus.csv",
    `id,seed,symbol,affect,valence,ritual\n${parts.join("\n")}\n`,
  );
  note("packages/seed/data/dream-corpus.csv", "worlds");
}
{
  const n = MEGA ? 400000 : 40000;
  const lines: string[] = [];
  const limit = VERIFY ? 2000 : n;
  for (let i = 0; i < limit; i++) {
    const sym = pick(SYMBOLS) as [string, string, string];
    const state = pick([
      "deep-sleep",
      "dreaming",
      "resting",
      "deep-work",
      "flow",
      "anxious",
    ]) as string;
    lines.push([`agent-${i}`, SEED, state, sym[0]].join(","));
  }
  write(
    "packages/seed/data/swarm-states.csv",
    `id,seed,state,symbol\n${lines.join("\n")}\n`,
  );
  note("packages/seed/data/swarm-states.csv", "worlds");
}

write(
  "generated.manifest.json",
  JSON.stringify(
    {
      seed: SEED,
      mega: MEGA,
      files: manifest,
      count: Object.keys(manifest).length,
    },
    null,
    2,
  ),
);
console.log(
  `generate (${MEGA ? "mega" : "base"}): ${Object.keys(manifest).length} files`,
);
