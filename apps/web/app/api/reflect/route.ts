import { reflectJournal } from "@repo/core";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "invalid JSON" }, { status: 400 });
  }
  const text = (body as { text?: unknown }).text;
  const seedRaw = (body as { seed?: unknown }).seed;
  if (typeof text !== "string" || text.trim().length === 0) {
    return Response.json(
      { ok: false, error: "text is required" },
      { status: 400 },
    );
  }
  const seed = typeof seedRaw === "number" ? seedRaw : 7331;
  return Response.json({ ok: true, ...reflectJournal(text, seed) });
}
