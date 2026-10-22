import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { CommandPalette } from "../components/command-palette";
import { ServiceWorkerRegistration } from "../components/service-worker-registration";
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
      "An interactive observatory for psychology, neuroscience and the subconscious: dreams, biases, archetypes, brainwaves, memory and emotion.",
    url: "https://noctiscope.vercel.app",
    siteName: "Noctiscope",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noctiscope — Explore the Subconscious Mind",
  },
};

export const viewport: Viewport = {
  themeColor: "#070810",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#070810] text-slate-100 antialiased">
        <Providers>
          <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070810]/80 backdrop-blur">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
              <a href="/" className="font-black tracking-tight">
                NOCTISCOPE
              </a>
              <div className="hidden items-center gap-4 text-xs md:flex">
                <a href="/atlas">Atlas</a>
                <a href="/quiz">Quiz</a>
                <a href="/search">Search</a>
                <a href="/swarm">Swarm</a>
                <a href="/breathe">Breathe</a>
                <a href="/focus">Focus</a>
                <a href="/compose">Compose</a>
                <a href="/mood">Mood</a>
                <a href="/insights">Insights</a>
              </div>
              <ThemeToggle />
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
          <ServiceWorkerRegistration />
        </Providers>
      </body>
    </html>
  );
}
