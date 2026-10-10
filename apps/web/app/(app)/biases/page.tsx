import { COGNITIVE_BIASES } from "@repo/core";

export default function BiasesPage() {
  return (
    <div>
      <h1 className="text-3xl font-black">Cognitive Bias Lab</h1>
      <p className="mt-2 text-slate-300">
        {COGNITIVE_BIASES.length} biases, each with a trigger, an experiment,
        and a debias ritual.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {COGNITIVE_BIASES.map((b) => (
          <article
            key={b.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h2 className="font-bold">{b.name}</h2>
            <p className="mt-1 text-sm text-slate-300">{b.description}</p>
            <p className="mt-2 text-sm">
              <strong>Try it: </strong>
              {b.experiment}
            </p>
            <p className="mt-1 text-sm text-emerald-300">
              <strong>Debias: </strong>
              {b.debias}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
