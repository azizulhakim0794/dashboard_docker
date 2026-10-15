from fastapi import FastAPI
import docker
from pathlib import Path
from fastapi.staticfiles import StaticFiles
from routers.docker import router as docker_router

client = docker.from_env()

app = FastAPI(title="Docker Dashboard API")

API_PREFIX = "/docker"


@app.get("/")
def home():
    return {"message": "Docker Dashboard API is running!"}


app.include_router(
    docker_router,
    prefix=f"{API_PREFIX}",
    tags=["Dockers"],
)

app.mount(
    "/dashboard",
    StaticFiles(directory=Path(__file__).parent / "static", html=True),
    name="dashboard",
)


@app.get("/health")
def health():
    return {"status": "healthy"}


# python -m uvicorn main:app --reload --port 8001
