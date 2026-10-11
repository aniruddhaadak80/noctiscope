# API reference

- `GET /api/healthz` → `{ status, service, seed, time }`
- `GET /api/dreams` → example dream reading (deterministic)
- `GET /api/symbols` → `{ ok, count, symbols[] }` from the generated symbol matrix
- `POST /reflect` (Python service :8000) → `{ mirror, seed }`
- `POST /api/reflect` → `{ ok, mirror, pattern, nextStep }` (body: `{ text, seed? }`)
