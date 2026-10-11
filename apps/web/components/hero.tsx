"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="brain-glow rounded-3xl border border-white/10 p-10 text-center"
    >
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
        your browser. No API keys. No accounts. Just you and the night shift of
        your brain.
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
    </motion.section>
  );
}
