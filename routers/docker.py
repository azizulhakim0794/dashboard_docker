from fastapi import APIRouter
from servies import docker as docker_service
import docker

router = APIRouter()
client = docker.from_env()


@router.post("/container/start/{container_id}")
async def start_container(container_id: str):
    return await docker_service.start_container(container_id)


@router.post("/container/stop/{container_id}")
async def stop_container(container_id: str):
    return await docker_service.stop_container(container_id)


@router.get("/containes")
async def get_all_containers():
    return await docker_service.get_all_containers()


@router.get("/images")
async def get_all_images():
    return await docker_service.get_all_images()


@router.get("/volumes")
async def get_all_volumes():
    return await docker_service.get_all_volumes()


@router.get("/networks")
async def get_all_networks():
    return await docker_service.get_all_networks()
