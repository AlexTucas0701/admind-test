from functools import cached_property, cache
from pathlib import Path
from typing import Optional

from app.constants import BACKGROUND_IMAGES_DIR
from app.models.image import HttpImage
from app.utils import AbstractGlobalInstance


class ImageDirectoryController(AbstractGlobalInstance):
    IMAGE_DIR: Path

    def __init__(self):
        self.__image_files = [
            image_file
            for image_file in self.IMAGE_DIR.iterdir()
            if image_file.is_file()
        ]

    def get_image(self, image_id: int) -> Optional[HttpImage]:
        if image_id >= self.total_images:
            return None
        return HttpImage.from_filepath(self.image_files[image_id])

    @cached_property
    def total_images(self):
        return len(self.image_files)

    @cached_property
    def image_files(self):
        return list(sorted(self.__image_files))


class BackgroundImageController(ImageDirectoryController):
    IMAGE_DIR = BACKGROUND_IMAGES_DIR


class UploadImageController(ImageDirectoryController):
    IMAGE_DIR = BACKGROUND_IMAGES_DIR
