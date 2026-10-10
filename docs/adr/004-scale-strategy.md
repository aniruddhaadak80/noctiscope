# ADR-004: Scale via data/docs/i18n, not heavy routes

Date: 2026-10-11 · Status: accepted

Context: 1M lines must not destroy `next build` times.
Decision: Bulk lines live in seed JSON, i18n catalogs, docs, and typed data modules; routes stay lightweight.
Consequences: Build stays under budget while LOC grows legitimately.
