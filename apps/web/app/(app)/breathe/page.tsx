"use client";

import { BREATH_PROTOCOLS, getProtocol, sessionSeconds } from "@repo/core";
import { useEffect, useMemo, useState } from "react";

export default function BreathePage() {
  const [protocolId, setProtocolId] = useState("box");
  const protocol = useMemo(() => getProtocol(protocolId), [protocolId]);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const total = sessionSeconds(protocol);

  useEffect(() => {
    if (!running) return;
    if (elapsed >= total) {
      setRunning(false);
      return;
    }
    const t = setTimeout(() => setElapsed((e) => e + 1), 1000);
    return () => clearTimeout(t);
  }, [running, elapsed, total]);

  const cycleLen = protocol.cycle.reduce((n, p) => n + p.seconds, 0);
  const inCycle = elapsed % cycleLen;
  let acc = 0;
  const phase =
    protocol.cycle.find((p) => {
      acc += p.seconds;
      return inCycle < acc;
    }) ?? protocol.cycle[0];
  const round = Math.min(protocol.rounds, Math.floor(elapsed / cycleLen) + 1);
  const scale =
    phase && phase.name === "inhale"
      ? 1.35
      : phase && phase.name === "exhale"
        ? 0.85
        : 1.1;

  return (
    <div>
      <h1 className="text-3xl font-black">Breath Pacer</h1>
      <p className="mt-2 text-slate-300">
        Follow the orb. Four evidence-backed protocols.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {BREATH_PROTOCOLS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              setProtocolId(p.id);
              setElapsed(0);
              setRunning(false);
            }}
            className={`rounded-full px-4 py-1 text-sm ${protocolId === p.id ? "bg-violet-400 text-black" : "border border-white/20"}`}
          >
            {p.name}
          </button>
        ))}
      </div>
      <p className="mt-2 text-sm text-slate-400">{protocol.description}</p>
      <div className="mt-6 flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-10">
        <div
          aria-hidden
          className="flex h-40 w-40 items-center justify-center rounded-full bg-violet-400/30 text-center transition-transform duration-1000"
          style={{ transform: `scale(${running ? scale : 1})` }}
        >
          <div>
            <p className="text-xl font-black">
              {running && phase ? phase.name : "ready"}
            </p>
            <p className="text-xs text-slate-300">
              {running && phase ? phase.hint : `${total}s session`}
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-300" aria-live="polite">
          {running
            ? `Round ${round}/${protocol.rounds} · ${elapsed}s / ${total}s`
            : "Press start, breathe with the orb."}
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() =>
              elapsed >= total ? setElapsed(0) : setRunning((r) => !r)
            }
            className="rounded-full bg-violet-400 px-5 py-2 text-sm font-semibold text-black"
          >
            {elapsed >= total ? "Again" : running ? "Pause" : "Start"}
          </button>
          <button
            type="button"
            onClick={() => {
              setRunning(false);
              setElapsed(0);
            }}
            className="rounded-full border border-white/20 px-5 py-2 text-sm"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
