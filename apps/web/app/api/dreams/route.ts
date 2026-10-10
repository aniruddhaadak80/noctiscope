export async function GET() {
  const { interpretDream } = await import("@repo/core");
  return Response.json({
    ok: true,
    example: interpretDream(
      "I was flying over an ocean while being chased",
      7331,
    ),
  });
}
