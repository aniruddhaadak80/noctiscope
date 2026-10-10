# ADR-006: Polyglot services mirror core logic

Date: 2026-10-11 · Status: accepted

Context: Variety proves the domain model is language-agnostic.
Decision: Python FastAPI mirrors `reflectJournal`; Rust crate mirrors brainwave mixing; Ruby/Perl own pipelines.
Consequences: Each polyglot piece has tests, README, and CI job.
