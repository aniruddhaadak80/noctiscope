# ADR-002: Turborepo monorepo with Bun

Date: 2026-10-11 · Status: accepted

Context: Need shared domain logic across web, SDK, and services.
Decision: Turborepo + Bun workspaces; `packages/core` is dependency-free pure logic.
Consequences: Fast installs; clear ownership boundaries for parallel agents.
