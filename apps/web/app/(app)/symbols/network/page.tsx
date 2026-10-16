"use client";

import { SYMBOL_MATRIX } from "@repo/core/generated/symbol-matrix";
import { Fragment, useMemo, useState } from "react";

interface SymbolNode {
  id: string;
  meaning: string;
  x: number;
  y: number;
}

function buildNodes(limit: number): SymbolNode[] {
  const symbols = Object.keys(SYMBOL_MATRIX).slice(0, limit);
  return symbols.map((symbol, index) => {
    const level = Math.floor(index / 8);
    const place = index % 8;
    const angle = (place / 8) * Math.PI * 2;
    const radius = 90 + level * 78;
    const cx = 360 + Math.cos(angle) * radius;
    const cy = 240 + Math.sin(angle) * radius;
    return {
      id: symbol,
      meaning: SYMBOL_MATRIX[symbol]?.meaning ?? "",
      x: cx,
      y: cy,
    };
  });
}

export default function SymbolNetworkPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string>("abyss");
  const nodes = useMemo(() => buildNodes(24), []);
  const visible = useMemo(
    () =>
      query === ""
        ? nodes
        : nodes.filter((node) => node.id.includes(query.toLowerCase())),
    [nodes, query],
  );
  const map = useMemo(
    () => new Map(nodes.map((node) => [node.id, node])),
    [nodes],
  );
  const active = map.get(selected) ?? nodes[0];

  if (!active) return null;

  return (
    <div>
      <h1 className="text-3xl font-black">Symbol Constellation</h1>
      <p className="mt-2 text-slate-300">
        A relational geometry of recurring dream material.
      </p>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search a node"
        className="mt-4 w-full rounded-xl border border-white/15 bg-white/5 p-3 text-sm md:w-80"
      />
      <div className="mt-4 overflow-auto rounded-2xl border border-white/10 bg-[#0b0d1a] p-3">
        <svg viewBox="0 0 720 480" className="h-[420px] w-[720px]">
          <title>Noctiscope symbols</title>
          <g opacity={0.3}>
            {nodes.map((node, index) => {
              const next = nodes[(index + 1) % nodes.length] ?? node;
              const wrap = nodes[(index + 7) % nodes.length] ?? node;
              return (
                <Fragment key={node.id}>
                  <line
                    key={`${node.id}-next`}
                    x1={node.x}
                    y1={node.y}
                    x2={next.x}
                    y2={next.y}
                    stroke="rgba(167, 139, 250, .5)"
                  />
                  <line
                    key={`${node.id}-wrap`}
                    x1={node.x}
                    y1={node.y}
                    x2={wrap.x}
                    y2={wrap.y}
                    stroke="rgba(103, 232, 249, .25)"
                  />
                </Fragment>
              );
            })}
          </g>
          {nodes.map((node) => {
            const activeNode = node.id === active.id;
            return (
              <g key={node.id} transform={`translate(${node.x},${node.y})`}>
                <circle
                  r={activeNode ? 14 : 8}
                  fill={activeNode ? "#a78bfa" : "#1f2540"}
                  stroke="#a78bfa"
                  strokeWidth={activeNode ? 2 : 1}
                />
                <title>{node.id}</title>
                <text
                  x={15}
                  y={0}
                  fill={activeNode ? "#c7d2fe" : "#94a3b8"}
                  fontSize="11"
                >
                  {node.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {visible.map((node) => (
          <button
            key={node.id}
            type="button"
            onClick={() => setSelected(node.id)}
            className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-300 hover:bg-white/10"
          >
            {node.id}
          </button>
        ))}
      </div>
      <aside className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs uppercase tracking-widest text-violet-300">
          {active.id}
        </p>
        <p className="mt-2 text-slate-300">{active.meaning}</p>
        <div className="mt-3 flex gap-2">
          <a
            href={`/symbols/${active.id}`}
            className="rounded-full border border-white/20 px-4 py-1 text-sm"
          >
            Open symbol
          </a>
        </div>
      </aside>
    </div>
  );
}
