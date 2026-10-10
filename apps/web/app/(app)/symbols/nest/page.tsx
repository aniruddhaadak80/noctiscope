import Link from "next/link";

export default function SymbolPage() {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-slate-400">
        dream symbol
      </p>
      <h1 className="text-3xl font-black">nest</h1>
      <p className="mt-2 text-slate-300">need for home.</p>
      <p className="mt-1 text-sm text-violet-300">Affect: nesting</p>
      <Link
        href="/dreams"
        className="mt-4 inline-block rounded-full border border-white/20 px-4 py-1 text-sm"
      >
        Decode your dream
      </Link>
    </div>
  );
}
