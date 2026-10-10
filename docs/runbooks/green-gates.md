# Runbook: green gates

```powershell
bun install
bun run typecheck
bun run lint
bun run test
bun run build --filter=@noctiscope/web
```
