import { mulberry32, pickSeeded } from "./rng";

export interface DreamStar {
  x: number;
  y: number;
  r: number;
  o: number;
}

export interface DreamCluster {
  x: number;
  y: number;
  rx: number;
  ry: number;
  rotate: number;
  opacity: number;
  color: string;
}

export interface DreamscapePalette {
  sky1: string;
  sky2: string;
  accent1: string;
  accent2: string;
}

export interface Dreamscape {
  seed: number;
  palette: DreamscapePalette;
  stars: DreamStar[];
  clusters: DreamCluster[];
}

const SKYS = ["#0a1024", "#101028", "#070d1e", "#0b1330"] as const;
const ACCENT1 = ["#a78bfa", "#8b5cf6", "#6d28d9", "#c4b5fd"] as const;
const ACCENT2 = ["#22d3ee", "#38bdf8", "#34d399", "#f0abfc"] as const;

/** Deterministic generative dreamscape: same seed + step => identical frame. */
export function composeDreamscape(seed = 7331, step = 0): Dreamscape {
  const rand = mulberry32(seed + step * 977);
  const palette: DreamscapePalette = {
    sky1: pickSeeded(rand, SKYS),
    sky2: pickSeeded(rand, SKYS),
    accent1: pickSeeded(rand, ACCENT1),
    accent2: pickSeeded(rand, ACCENT2),
  };

  const stars: DreamStar[] = Array.from<unknown, DreamStar>(
    { length: 48 },
    () => ({
      x: Math.round(rand() * 1000),
      y: Math.round(rand() * 560),
      r: Math.round((0.8 + rand() * 2.2) * 10) / 10,
      o: Math.round((0.3 + rand() * 0.7) * 100) / 100,
    }),
  );

  const clusters: DreamCluster[] = Array.from<unknown, DreamCluster>(
    { length: 5 },
    (unused, i) => ({
      x: Math.round(rand() * 900) + 40,
      y: 140 + Math.round(rand() * 320),
      rx: Math.round(70 + rand() * 110),
      ry: Math.round(50 + rand() * 90),
      rotate: Math.round(rand() * 180),
      opacity: Math.round((0.12 + rand() * 0.2) * 100) / 100,
      color: i % 2 === 0 ? palette.accent1 : palette.accent2,
    }),
  );

  return { seed, palette, stars, clusters };
}
