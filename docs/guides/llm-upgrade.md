# Plugging a real LLM (optional)

The demo never needs it. To upgrade the journal mirror:

1. Keep `reflectJournal` as the offline fallback.
2. Add `LLM_API_KEY` to `.env` (never commit).
3. Call your model in the `/api/dreams` route, then fall back on error.
4. Keep the seeded path in tests so CI stays deterministic.
