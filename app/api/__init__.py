from fastapi import APIRouter

from app.api.image import router as image_router

router = APIRouter()
router.include_router(image_router, prefix="/image", tags=["image"])
