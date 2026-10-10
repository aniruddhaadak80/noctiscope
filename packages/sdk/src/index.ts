/** Typed client for the Noctiscope API routes. Zero dependencies. */
export interface HealthResponse {
  status: string;
  service: string;
  seed: number;
  time: string;
}

export async function fetchHealth(baseUrl: string): Promise<HealthResponse> {
  const res = await fetch(`${baseUrl}/api/healthz`);
  if (!res.ok) throw new Error(`health check failed: ${res.status}`);
  return (await res.json()) as HealthResponse;
}
