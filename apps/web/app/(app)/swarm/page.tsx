"use client";

import {
  type AgentState,
  type SwarmAgent,
  spawnSwarm,
  swarmCensus,
  tickSwarm,
} from "@repo/core";
import { useEffect, useMemo, useRef, useState } from "react";

const COLORS: Record<AgentState, string> = {
  "deep-sleep": "#38bdf8",
  dreaming: "#a78bfa",
  resting: "#64748b",
  "deep-work": "#34d399",
  flow: "#f0abfc",
  anxious: "#f87171",
};

export default function SwarmPage() {
  const ref = useRef<HTMLCanvasElement>(null);
  const agents = useMemo(() => ({ current: spawnSwarm(1000, 7331) }), []);
  const [census, setCensus] = useState(() => swarmCensus(agents.current));
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    let raf = 0;
    let step = 0;
    const loop = () => {
      step += 1;
      const next: SwarmAgent[] = tickSwarm(agents.current, 7331, step);
      agents.current = next;
      const canvas = ref.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) {
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        const w = canvas.clientWidth * dpr;
        const h = canvas.clientHeight * dpr;
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
        ctx.fillStyle = "#070810";
        ctx.fillRect(0, 0, w, h);
        for (const a of next) {
          ctx.fillStyle = COLORS[a.state];
          ctx.globalAlpha = 0.35 + a.energy * 0.6;
          ctx.beginPath();
          ctx.arc(a.x * w, a.y * h, 1.6 * dpr, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      if (step % 15 === 0) {
        setCensus(swarmCensus(next));
        setTicks(step);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [agents]);

  return (
    <div>
      <h1 className="text-3xl font-black">Night Swarm</h1>
      <p className="mt-2 text-slate-300">
        1,000 subconscious agents drifting live — deterministic from seed 7331.
        Tick {ticks}.
      </p>
      <canvas
        ref={ref}
        className="mt-4 h-[420px] w-full rounded-2xl border border-white/10"
        aria-label="Live swarm visualization"
      />
      <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-6">
        {Object.entries(census).map(([state, n]) => (
          <div
            key={state}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-center text-sm"
          >
            <p
              className="font-bold"
              style={{ color: COLORS[state as AgentState] }}
            >
              {n}
            </p>
            <p className="text-xs text-slate-400">{state}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
