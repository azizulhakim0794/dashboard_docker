# Docker Dashboard

The dashboard is a static HTML, Tailwind CSS, and vanilla JavaScript frontend
served by the existing FastAPI application. It uses the Docker Engine through
the existing API routes and does not contain mock resource data. Before clone start the docker application

## Run after cloning (Windows)

### Prerequisites

- Git
- Python 3.14
- [uv](https://docs.astral.sh/uv/getting-started/installation/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (installed
  and running)

### Clone and start

1. Open PowerShell and clone the repository. Replace the example URL with the
   actual URL of this repository:

```powershell
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

If the repository contains this project in a subdirectory, change into that
directory as well (the one containing `pyproject.toml` and `main.py`).

2. Install the project dependencies:

```powershell
uv sync
```

3. Start Docker Desktop and wait until its Docker Engine is running.

4. Start the FastAPI application:

```powershell
uv run uvicorn main:app --reload --host 127.0.0.1 --port 8001
```

5. Open the dashboard in your browser:
   [http://127.0.0.1:8001/dashboard/](http://127.0.0.1:8001/dashboard/)

Keep the PowerShell window open while using the dashboard. Press **Ctrl+C** in
that window to stop the application. The FastAPI API documentation is available
at [http://127.0.0.1:8001/docs](http://127.0.0.1:8001/docs).

If the dashboard reports that it cannot connect to Docker, check that Docker
Desktop is running and that its engine is ready, then refresh the page.

## API configuration

The frontend calls the existing `/docker/containes`, `/docker/images`, and
`/docker/volumes` routes, plus the existing container start/stop routes. To use
a different backend address or port, update `DOCKER_API_BASE_URL` in
`static/assets/config.js` to match the address and port used by Uvicorn. For
example, if you start Uvicorn with `--port 8002`, set it to
`http://127.0.0.1:8002`.
