import os
from pathlib import Path

ROOT_DIR = Path(os.getcwd())
RESOURCES_DIR = ROOT_DIR / "resources"
IMAGES_DIR = RESOURCES_DIR / "images"
BACKGROUND_IMAGES_DIR = IMAGES_DIR / "backgrounds"
UPLOAD_IMAGES_DIR = IMAGES_DIR / "uploads"

APPLICATION_TITLE = "Portrait Editor"
APPLICATION_INITIAL_GEOMETRY = (100, 100, 1024, 768)
