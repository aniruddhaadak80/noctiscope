"use client";

import { type DreamStar, composeDreamscape } from "@repo/core";
import { useEffect, useRef, useState } from "react";

function frame(d: ReturnType<typeof composeDreamscape>, tick: number) {
  return composeDreamscape(d.seed, Math.floor(tick / 10) % 64);
}

export default function ComposePage() {
  const [seed, setSeed] = useState(7331);
  const [playing, setPlaying] = useState(false);
  const [tick, setTick] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const loop = (next: number) => {
      setTick((t) => t + (next - last));
      last = next;
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf.current);
    };
  }, [playing]);

  const d = composeDreamscape(seed, Math.floor(tick / 2000) % 64);

  return (
    <div>
      <h1 className="text-3xl font-black">Dream Composer</h1>
      <p className="mt-2 text-slate-300">
        Deterministic generative nightscapes. Same seed, same universe.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="rounded-full bg-violet-400 px-5 py-2 text-sm font-semibold text-black"
        >
          {playing ? "Stop drifting" : "Start drifting"}
        </button>
        <button
          type="button"
          onClick={() => {
            setSeed(Math.floor(Math.random() * 99999));
            setTick(0);
          }}
          className="rounded-full border border-white/20 px-5 py-2 text-sm"
        >
          New seed
        </button>
        <span className="text-xs text-slate-400">
          seed {d.seed} · tick {d.stars[0]?.o ?? 0}%
        </span>
      </div>
      <div className="mt-4 overflow-auto rounded-2xl border border-white/10">
        <svg
          viewBox="0 0 1000 560"
          className="h-[380px] w-[1000px]"
          role="img"
          aria-label={`Dreamscape seed ${d.seed}`}
        >
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={d.palette.sky2} />
              <stop offset="100%" stopColor={d.palette.sky1} />
            </linearGradient>
          </defs>
          <rect width="1000" height="560" fill="url(#sky)" />
          {d.clusters.map((c, i) => (
            <g key={`c-${i}`} opacity={c.opacity}>
              <ellipse
                cx={c.x}
                cy={c.y}
                rx={c.rx}
                ry={c.ry}
                fill={c.color}
                transform={`rotate(${c.rotate} ${c.x} ${c.y})`}
              />
            </g>
          ))}
          {d.stars.map((s: DreamStar, i) => (
            <circle
              key={`s-${i}`}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="#e2e8f0"
              opacity={s.o}
            />
          ))}
        </svg>
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Zero network · zero model · seed {seed} is the only author.
      </p>
    </div>
  );
}
