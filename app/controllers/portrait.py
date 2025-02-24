import io
from pathlib import Path
from tempfile import TemporaryDirectory
from typing import Optional

import numpy as np
from fastapi import UploadFile
from PIL import Image
from rembg import remove

from app.models.image import HttpImage
from app.utils import AbstractGlobalInstance
from app.utils.image import merge_images


class PortraitController(AbstractGlobalInstance):
    def __init__(self):
        self.__portrait = None
        self.__bg_removed_portrait = None
        self.__merged_portrait = None
        self.__work_dir = TemporaryDirectory()

    async def store_portrait(self, file: UploadFile):
        file_content = await file.read()
        with open(self.work_dir / file.filename, "wb") as fp:
            fp.write(file_content)
            self.__portrait = HttpImage(
                filepath=self.work_dir / file.filename,
                content=file_content,
            )

    def remove_background(self):
        bg_removed_content = remove(self.portrait.content)
        self.__bg_removed_portrait = HttpImage(filepath=self.portrait.filepath, content=bg_removed_content)
        return self.bg_removed_portrait

    def merge_background(self, background_image: HttpImage):
        assert self.bg_removed_portrait is not None

        image = merge_images(
            background_image.pil_image,
            self.bg_removed_portrait.pil_image,
        )
        self.__merged_portrait = HttpImage.from_pil_image(image, "merged.png")
        return self.merged_portrait

    @property
    def portrait(self) -> HttpImage:
        return self.__portrait

    @portrait.setter
    def portrait(self, portrait: HttpImage):
        self.__portrait = portrait
        self.__bg_removed_portrait = None

    @property
    def bg_removed_portrait(self) -> Optional[HttpImage]:
        return self.__bg_removed_portrait

    @property
    def merged_portrait(self) -> Optional[HttpImage]:
        return self.__merged_portrait

    @property
    def work_dir(self):
        return Path(self.__work_dir.name)
