from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="noctiscope-agents", version="0.1.0")

SEED = 7331


class ReflectRequest(BaseModel):
    text: str
    seed: int = SEED


MIRRORS = [
    "I hear postponement protecting you from judgment.",
    "I hear exhaustion bargaining for rest.",
    "I hear a part of you that wants to be chosen.",
]


@app.get("/healthz")
def healthz():
    return {"status": "ok", "service": "noctiscope-agents", "seed": SEED}


@app.post("/reflect")
def reflect(req: ReflectRequest):
    idx = (len(req.text) + req.seed) % len(MIRRORS)
    return {"mirror": MIRRORS[idx], "seed": req.seed}
