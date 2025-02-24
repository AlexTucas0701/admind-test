import asyncio
import base64
import json

from fastapi import APIRouter, File, HTTPException, UploadFile, status
from starlette.responses import StreamingResponse

from app.controllers.image import BackgroundImageController
from app.controllers.portrait import PortraitController

router = APIRouter()


@router.get("/")
async def get_portrait():
    portrait = PortraitController().portrait
    if portrait is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "error": "Upload the portrait",
            },
        )
    return portrait.http_response


@router.post("/")
async def upload_portrait(portrait: UploadFile = File(...)):
    portrait_controller = PortraitController()
    await portrait_controller.store_portrait(portrait)
    return {
        "status": "Uploaded the portrait",
    }


@router.post("/upload-and-remove-background")
async def remove_background(portrait: UploadFile = File(...)):
    portrait_controller = PortraitController()
    await portrait_controller.store_portrait(portrait)

    bg_removed_portrait = portrait_controller.remove_background()

    content_type = portrait.content_type or "image/png"
    base64_encoded = base64.b64encode(bg_removed_portrait.content).decode()
    base64_url_image = f"data:{content_type};base64,{base64_encoded}"
    return {
        "bg_removed_portrait": base64_url_image,
    }


@router.get("/remove-background-stream")
async def stream_remove_background():
    async def streamer():
        portrait_controller = PortraitController()

        yield "data: " + json.dumps({"status": "Uploaded the portrait"}) + "\n\n"
        yield "data: " +  json.dumps({"status": "Removing the background"}) + "\n\n"
        bg_removed_portrait = portrait_controller.remove_background()
        yield "data: " +  json.dumps({"status": "Removed the background"}) + "\n\n"
        content_type = "image/png"
        base64_encoded = base64.b64encode(bg_removed_portrait.content).decode()
        base64_url_image = f"data:{content_type};base64,{base64_encoded}"
        yield "data: " +  json.dumps({"bg_removed_portrait": base64_url_image}) + "\n\n"

    return StreamingResponse(streamer(), media_type="text/event-stream")


@router.get("/merge")
async def merge_portrait(background_image_id: int):
    portrait_controller = PortraitController()
    bg_removed_portrait = portrait_controller.bg_removed_portrait
    if bg_removed_portrait is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "error": "Upload the portrait and remove the background",
            },
        )

    background_image = BackgroundImageController().get_image(background_image_id)
    if background_image is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "error": "Not found the background image",
            },
        )
    portrait_controller.merge_background(background_image)
    return {
        "result": "success",
    }


@router.get("/merged-portrait")
async def get_merged_portrait():
    merged_portrait = PortraitController().merged_portrait
    if merged_portrait is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "error": "Not found the merged portrait",
            },
        )
    response = merged_portrait.http_response
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response
