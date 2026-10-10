import { BRAIN_REGIONS } from "@repo/core";

export const dynamic = "force-dynamic";

export default function AtlasPage() {
  return (
    <div>
      <h1 className="text-3xl font-black">Subconscious Atlas</h1>
      <p className="mt-2 text-slate-300">
        Twelve regions running the night shift. Each card shows its job, its
        shadow, and a reflection prompt used by therapists and neuroscientists.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {BRAIN_REGIONS.map((r) => (
          <article
            key={r.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h2 className="font-bold">
              {r.name}{" "}
              <span className="text-xs text-slate-400">· {r.system}</span>
            </h2>
            <p className="mt-1 text-sm text-slate-300">{r.role}</p>
            <p className="mt-2 text-sm">
              <span className="text-violet-300">Subconscious whisper: </span>
              {r.whisper}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              <span className="text-amber-300">Reflect: </span>
              {r.prompt}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
