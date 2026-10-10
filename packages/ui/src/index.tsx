import type { ReactNode } from "react";

export function Card({
  title,
  children,
}: { title: string; children: ReactNode }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="font-bold">{title}</h2>
      <div className="mt-2 text-sm text-slate-300">{children}</div>
    </article>
  );
}

export function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div className="mt-2">
      <div className="flex justify-between text-xs text-slate-400">
        <span>{label}</span>
        <span>{value}/100</span>
      </div>
      <div
        className="h-2 rounded-full bg-white/10"
        role="progressbar"
        tabIndex={0}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className="h-2 rounded-full bg-violet-400"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/15 px-3 py-1 text-xs">
      {children}
    </span>
  );
}
