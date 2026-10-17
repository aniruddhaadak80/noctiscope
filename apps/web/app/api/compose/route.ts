import { composeDreamscape } from "@repo/core";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const rawSeed = url.searchParams.get("seed");
  const rawStep = url.searchParams.get("step");
  const seed = rawSeed ? Number(rawSeed) || 7331 : 7331;
  const step = rawStep ? Math.max(0, Number(rawStep) || 0) : 0;
  const dreamscape = composeDreamscape(seed, step);
  return Response.json({
    ok: true,
    seed: dreamscape.seed,
    palette: dreamscape.palette,
    stars: dreamscape.stars.length,
    clusters: dreamscape.clusters.length,
  });
}
