import { ARCHETYPES } from "@repo/core";

export default function ArchetypesPage() {
  return (
    <div>
      <h1 className="text-3xl font-black">Archetype Explorer</h1>
      <p className="mt-2 text-slate-300">
        Jung&apos;s recurring characters — light, shadow, and integration path.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {ARCHETYPES.map((a) => (
          <article
            key={a.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h2 className="font-bold">{a.name}</h2>
            <p className="mt-1 text-sm text-slate-300">{a.description}</p>
            <p className="mt-2 text-sm text-fuchsia-300">Shadow: {a.shadow}</p>
            <p className="mt-1 text-sm text-emerald-300">
              Integrate: {a.integration}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
