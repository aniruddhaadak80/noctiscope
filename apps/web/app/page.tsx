import Link from "next/link";
import { Hero } from "../components/hero";

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
  {
    href: "/quiz",
    title: "Mind Quizzes",
    body: "Big-five, chronotype and stress index in 2 minutes.",
  },
  {
    href: "/search",
    title: "Deep Search",
    body: "One query across regions, symbols, biases and archetypes.",
  },
];

export default function HomePage() {
  return (
    <div>
      <Hero />
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
