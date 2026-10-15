import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { CommandPalette } from "../components/command-palette";
import { Providers } from "../components/theme-provider";
import { ThemeToggle } from "../components/theme-toggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noctiscope — Explore the Subconscious Mind",
  description:
    "An interactive observatory for psychology, neuroscience and the subconscious: dreams, biases, archetypes, brainwaves, memory and emotion.",
  metadataBase: new URL("https://noctiscope.vercel.app"),
  openGraph: {
    title: "Noctiscope — Explore the Subconscious Mind",
    description:
      "Dream decoder, bias lab, archetype explorer, brainwave observatory. Zero keys needed.",
    images: ["/images/og.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#070810",
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <Providers>
          <a href="#main" className="sr-only focus:not-sr-only">
            Skip to content
          </a>
          <header className="border-b border-white/10">
            <nav
              aria-label="Primary"
              className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3"
            >
              <a href="/" className="text-lg font-bold tracking-tight">
                🌙 Noctiscope
              </a>
              <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                <a href="/atlas">Atlas</a>
                <a href="/dreams">Dreams</a>
                <a href="/biases">Biases</a>
                <a href="/archetypes">Archetypes</a>
                <a href="/neurochem">Neurochem</a>
                <a href="/brainwaves">Brainwaves</a>
                <a href="/journal">Journal</a>
                <a href="/timemachine">Time machine</a>
                <a href="/quiz">Quiz</a>
                <a href="/search">Search</a>
                <a href="/swarm">Swarm</a>
                <a href="/breathe">Breathe</a>
                <a href="/focus">Focus</a>
                <a href="/mood">Mood</a>
              </div>
              <span className="ml-auto">
                <ThemeToggle />
              </span>
            </nav>
          </header>
          <main id="main" className="mx-auto max-w-6xl px-4 py-8">
            <CommandPalette />
            {children}
          </main>
          <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-400">
            Noctiscope · deterministic local simulation · no API keys needed ·
            MIT
          </footer>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
