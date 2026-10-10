# Contributing to Noctiscope

## Quickstart
```powershell
git clone https://github.com/aniruddhaadak80/noctiscope
cd noctiscope
bun install
bun scripts/seed.ts
bun run dev
```

## Rules
- Conventional Commits (`feat:`, `fix:`, `docs:`, `test:`, `chore:`)
- One logical change per commit
- `packages/core` stays React-free and fully tested
- `bun run typecheck`, `lint`, `test`, `build` must pass
- Good first issues are labeled `good first issue`
