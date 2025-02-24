from fastapi import APIRouter

from app.api.image.background import router as background_router
from app.api.image.portrait import router as portrait_router

router = APIRouter()
router.include_router(background_router, prefix="/background")
router.include_router(portrait_router, prefix="/portrait")
