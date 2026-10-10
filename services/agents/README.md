# Noctiscope agent service (Python/FastAPI)

Deterministic reflective-agent microservice. Mirrors the TypeScript
`reflectJournal` logic server-side for deployments that want it.

```powershell
pip install -r requirements.txt
uvicorn main:app --port 8000
pytest
```
