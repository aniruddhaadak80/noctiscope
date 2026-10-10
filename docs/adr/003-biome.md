# ADR-003: Biome for lint+format

Date: 2026-10-11 · Status: accepted

Context: ESLint+Prettier config drift slows contributors.
Decision: Single tool Biome with recommended rules, `noExplicitAny` as error.
Consequences: One config, fast CI, zero warning tolerance.
