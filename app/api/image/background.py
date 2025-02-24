from fastapi import APIRouter, HTTPException, Request, status

from app.controllers.image import  BackgroundImageController

router = APIRouter()


@router.get("/")
async def background_image(request: Request):
    total_images = BackgroundImageController().total_images
    request_path = request.url.path.lstrip("/")
    current_http_link = f"{request.base_url}{request_path}"
    return {
        "total_count": total_images,
        "backgrounds": [
            {
                "key": idx,
                "link": f"{current_http_link}{idx}",
                "thumbnail": f"{current_http_link}{idx}/thumbnail",
            }
            for idx in range(total_images)
        ],
    }


@router.get("/{image_id}")
async def background_image(image_id: int):
    image = BackgroundImageController().get_image(image_id)
    if image is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"error": "Image not found"})
    return image.http_response


@router.get("/{image_id}/thumbnail")
async def background_image_thumbnail(image_id: int, size: int = 256):
    image = BackgroundImageController().get_image(image_id)
    if image is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"error": "Image not found"})
    return image.thumbnail(size).http_response
