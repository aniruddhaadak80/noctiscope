# ADR-001: Deterministic local simulation over LLM APIs

Date: 2026-10-11 · Status: accepted

Context: The demo must run with zero keys, offline, reproducibly.
Decision: All "AI" behavior is seeded FSM + utility scoring in `@repo/core`.
Consequences: No network dependency; real LLMs pluggable later via `/reflect` API.
