import { SYMBOL_MATRIX } from "@repo/core/generated/symbol-matrix";

export async function GET() {
  const symbols = Object.entries(SYMBOL_MATRIX).map(([symbol, entry]) => ({
    symbol,
    ...entry,
  }));
  return Response.json({
    ok: true,
    count: symbols.length,
    symbols: symbols.slice(0, 200),
  });
}
