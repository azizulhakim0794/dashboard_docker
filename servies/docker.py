from fastapi import HTTPException
import docker
from docker.errors import NotFound, APIError

client = docker.from_env()


async def start_container(container_id: str):
    try:
        container = client.containers.get(container_id)

        if container.status == "running":
            return {
                "message": "Container is already running",
                "container": container.name,
                "status": container.status,
            }

        container.start()
        container.reload()

        return {
            "message": "Container started successfully",
            "container": container.name,
            "status": container.status,
        }

    except NotFound:
        raise HTTPException(
            status_code=404,
            detail="Container not found",
        )

    except APIError as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Docker error: {exc}",
        )


async def stop_container(container_id: str):
    try:
        container = client.containers.get(container_id)

        if container.status == "exited":
            return {
                "message": "Container is already stopped",
                "container": container.name,
                "status": container.status,
            }

        container.stop()
        container.reload()

        return {
            "message": "Container stopped successfully",
            "container": container.name,
            "status": container.status,
        }

    except NotFound:
        raise HTTPException(
            status_code=404,
            detail="Container not found",
        )

    except APIError as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Docker error: {exc}",
        )


async def get_all_containers():
    try:
        containers = client.containers.list(all=True)
        images = client.images.list()

        running = [c for c in containers if c.status == "running"]

        return {
            "total_images": len(images),
            "total_containers": len(containers),
            "running_containers": len(running),
            "stopped_containers": len(containers) - len(running),
            "containers": [
                {
                    "name": c.name,
                    "id": c.short_id,
                    "status": c.status,
                    "image": c.image.tags,
                    "ports": [
                        (
                            f"{binding.get('HostIp', '')}:{binding['HostPort']}"
                            f"->{container_port}"
                            if binding.get("HostPort")
                            else container_port
                        )
                        for container_port, bindings in (
                            c.attrs.get("NetworkSettings", {}).get("Ports") or {}
                        ).items()
                        for binding in (bindings or [None])
                        if binding is None or binding.get("HostPort")
                    ],
                    "created": c.attrs.get("Created"),
                }
                for c in containers
            ],
        }

    except docker.errors.DockerException as exc:
        raise HTTPException(
            status_code=503,
            detail="Cannot connect to Docker Engine. Check Docker socket access.",
        ) from exc


async def get_all_images():
    try:
        images = client.images.list()
        image_data = []

        for image in images:
            reference = image.tags[0] if image.tags else "<none>:<none>"
            separator = reference.rfind(":")
            has_tag = separator > reference.rfind("/")
            image_data.append(
                {
                    "name": reference,
                    "id": image.short_id,
                    "size": image.attrs["Size"],
                    "repository": reference[:separator] if has_tag else reference,
                    "tag": reference[separator + 1 :] if has_tag else "<none>",
                    "created": image.attrs.get("Created"),
                }
            )
        return {
            "total_images": len(images),
            "images": image_data,
        }

    except docker.errors.DockerException as exc:
        raise HTTPException(
            status_code=503,
            detail="Cannot connect to Docker Engine. Check Docker socket access.",
        ) from exc


async def get_all_volumes():
    try:
        volumes = client.volumes.list()

        return {
            "total_volumes": len(volumes),
            "volumes": [
                {
                    "name": i.id,
                    "id": i.short_id,
                    "driver": i.attrs.get("Driver"),
                    "mountpoint": i.attrs.get("Mountpoint"),
                    "created": i.attrs.get("CreatedAt"),
                }
                for i in volumes
            ],
        }

    except docker.errors.DockerException as exc:
        raise HTTPException(
            status_code=503,
            detail="Cannot connect to Docker Engine. Check Docker socket access.",
        ) from exc
