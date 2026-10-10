import { DEFENSE_MECHANISMS } from "@repo/core";

export default function DefensesPage() {
  return (
    <div>
      <h1 className="text-3xl font-black">Defense Mechanism Mapper</h1>
      <p className="mt-2 text-slate-300">
        How the ego protects itself — and what each defense costs you.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {DEFENSE_MECHANISMS.map((d) => (
          <article
            key={d.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h2 className="font-bold">{d.name}</h2>
            <p className="mt-1 text-sm text-slate-300">{d.description}</p>
            <p className="mt-2 text-sm">Example: {d.example}</p>
            <p className="mt-1 text-sm text-emerald-300">
              Healthier move: {d.healthier}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
