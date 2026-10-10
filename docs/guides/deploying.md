# Deploying Noctiscope

## Vercel (recommended)
```powershell
bunx vercel --prod
```
Set `NEXT_PUBLIC_APP_URL` and `NEXT_PUBLIC_SEED=7331`.

## Docker
```powershell
docker compose up --build
```

## Fly.io
```powershell
fly launch
fly deploy
```

## Render
Connect the repo; `render.yaml` provisions the web service with `/api/healthz` checks.
