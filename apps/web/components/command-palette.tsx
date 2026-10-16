"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const ROUTES = [
  ["Atlas", "/atlas"],
  ["Dreams", "/dreams"],
  ["Biases", "/biases"],
  ["Archetypes", "/archetypes"],
  ["Neurochem", "/neurochem"],
  ["Defenses", "/defenses"],
  ["Sleep", "/sleep"],
  ["Memory", "/memory"],
  ["Emotions", "/emotions"],
  ["Brainwaves", "/brainwaves"],
  ["Journal", "/journal"],
  ["Time machine", "/timemachine"],
  ["Quiz", "/quiz"],
  ["Search", "/search"],
  ["Night swarm", "/swarm"],
  ["Habits", "/habits"],
  ["Attachment", "/attach"],
  ["Breath pacer", "/breathe"],
  ["Focus timer", "/focus"],
  ["Tale gallery", "/gallery"],
  ["Insight observatory", "/insights"],
  ["Symbol constellation", "/symbols/network"],
  ["Data vault", "/vault"],
  ["Mood log", "/mood"],
] as const;

/** Zero-dependency command palette (Ctrl/⌘+K). */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
        setActive(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const hits = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (
      q.length === 0
        ? ROUTES
        : ROUTES.filter(([name]) => name.toLowerCase().includes(q))
    ).slice(0, 12);
  }, [query]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: stable setter, hits.length only
  useEffect(() => {
    setActive(0);
  }, [hits.length, setActive]);

  if (!open) return null;
  return (
    // biome-ignore lint/a11y/useSemanticElements: overlay container
    <div
      role="dialog"
      aria-label="Navigate the observatory"
      className="fixed inset-0 z-50 bg-black/60 p-4"
      onClick={() => setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape" || e.key === "Enter") setOpen(false);
      }}
    >
      <div
        className="mx-auto mt-24 max-w-md rounded-2xl border border-white/15 bg-[#141828] p-3"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown")
              setActive((a) => Math.min(a + 1, hits.length - 1));
            if (e.key === "ArrowUp") setActive((a) => Math.max(a - 1, 0));
            if (e.key === "Enter" && hits[active]) {
              setOpen(false);
              router.push(hits[active][1]);
            }
          }}
          placeholder="Type a lab… (Esc to close)"
          aria-label="Search labs"
          className="w-full rounded-xl border border-white/15 bg-black/40 p-3 text-sm"
        />
        <ul className="mt-2 max-h-64 overflow-auto">
          {hits.length === 0 ? (
            <li className="p-3 text-sm text-slate-400">No lab found.</li>
          ) : (
            hits.map(([name, href], i) => (
              <li key={href}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => {
                    setOpen(false);
                    router.push(href);
                  }}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm ${i === active ? "bg-violet-400 text-black" : ""}`}
                >
                  {name}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
