export async function GET() {
  return Response.json({
    status: "ok",
    service: "noctiscope",
    seed: 7331,
    time: new Date().toISOString(),
  });
}
