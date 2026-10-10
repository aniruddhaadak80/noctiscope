from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_healthz():
    r = client.get("/healthz")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"


def test_reflect_deterministic():
    a = client.post("/reflect", json={"text": "hello", "seed": 7}).json()
    b = client.post("/reflect", json={"text": "hello", "seed": 7}).json()
    assert a == b
