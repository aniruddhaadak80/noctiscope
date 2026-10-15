import { ARCHETYPE_TALES } from "@repo/core/generated/archetype-tales";

export default function GalleryPage() {
  return (
    <div>
      <h1 className="text-3xl font-black">Tale Gallery</h1>
      <p className="mt-2 text-slate-300">
        {ARCHETYPE_TALES.length} generated micro-tales — each archetype meeting each dream symbol.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {ARCHETYPE_TALES.map((t) => (
          <article key={t.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-widest text-violet-300">
              {t.archetype} · {t.symbol}
            </p>
            <p className="mt-2 text-sm text-slate-300">{t.moral}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
