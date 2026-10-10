import Link from "next/link";

const CARDS = [
  {
    href: "/atlas",
    title: "Subconscious Atlas",
    body: "12 brain regions, what each whispers to you at night.",
  },
  {
    href: "/dreams",
    title: "Dream Decoder",
    body: "Type a dream. Get symbols, affect, and a reflection.",
  },
  {
    href: "/biases",
    title: "Cognitive Bias Lab",
    body: "18 biases you can trigger on yourself, safely.",
  },
  {
    href: "/archetypes",
    title: "Archetype Explorer",
    body: "Jung's cast of characters living in you.",
  },
  {
    href: "/neurochem",
    title: "Neurochemistry Sim",
    body: "Dopamine, serotonin, cortisol — poke the soup.",
  },
  {
    href: "/defenses",
    title: "Defense Mapper",
    body: "Denial, projection, sublimation — spot yours.",
  },
  {
    href: "/sleep",
    title: "Sleep & Hypnosis",
    body: "REM cycles, hypnagogia, and trance states.",
  },
  {
    href: "/memory",
    title: "Memory Palace",
    body: "How the hippocampus files your life away.",
  },
  {
    href: "/emotions",
    title: "Emotion Waves",
    body: "Name it to tame it — limbic resonance lab.",
  },
  {
    href: "/brainwaves",
    title: "Brainwave Observatory",
    body: "Delta → gamma live simulation.",
  },
  {
    href: "/journal",
    title: "Shadow Journal",
    body: "A deterministic reflective agent. Zero keys.",
  },
  {
    href: "/timemachine",
    title: "Time Machine",
    body: "Replay any mental state, event by event.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="brain-glow rounded-3xl border border-white/10 p-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-violet-300">
          psychology · neuroscience · subconscious
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
          The observatory for your{" "}
          <span className="text-violet-300">subconscious mind</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          Dreams, biases, archetypes, neurotransmitters, defense mechanisms,
          sleep, memory, emotion and brainwaves — simulated deterministically in
          your browser. No API keys. No accounts. Just you and the night shift
          of your brain.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/atlas"
            className="rounded-full bg-violet-400 px-5 py-2 font-semibold text-black"
          >
            Enter the atlas
          </Link>
          <Link
            href="/dreams"
            className="rounded-full border border-white/20 px-5 py-2"
          >
            Decode a dream
          </Link>
        </div>
        <p className="mt-4 text-xs text-slate-400">
          Universe seed 7331 · deterministic · works offline
        </p>
      </section>
      <section aria-label="Features" className="mt-8 grid gap-4 md:grid-cols-3">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10"
          >
            <h2 className="font-bold">{c.title}</h2>
            <p className="mt-1 text-sm text-slate-300">{c.body}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
