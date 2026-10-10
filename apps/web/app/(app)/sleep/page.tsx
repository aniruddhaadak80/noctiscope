import { SLEEP_STAGES } from "@repo/core";

export default function SleepPage() {
  return (
    <div>
      <h1 className="text-3xl font-black">Sleep &amp; Hypnosis</h1>
      <p className="mt-2 text-slate-300">
        A 90-minute cycle map plus trance states. Educational only.
      </p>
      <div className="mt-6 space-y-3">
        {SLEEP_STAGES.map((s, i) => (
          <article
            key={s.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h2 className="font-bold">
              {i + 1}. {s.name}{" "}
              <span className="text-xs text-slate-400">· {s.duration}</span>
            </h2>
            <p className="mt-1 text-sm text-slate-300">{s.description}</p>
            <p className="mt-1 text-sm text-violet-300">
              Subconscious work: {s.subconsciousWork}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
