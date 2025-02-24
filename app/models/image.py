import io
import mimetypes
import os
from functools import cached_property
from pathlib import Path

from PIL import Image
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from app.utils.image import image_from_bytes, image_to_bytes


class HttpImage(BaseModel):
    filepath: Path = Field(..., frozen=True)
    content: bytes = Field(..., frozen=True)

    def thumbnail(self, size: int):
        image = image_from_bytes(self.content)
        image.thumbnail((size, size))
        thumbnail_content = image_to_bytes(image, self.file_extension)
        return HttpImage(
            filepath=self.filepath,
            content=thumbnail_content,
        )

    @classmethod
    def from_filepath(cls, image_filepath: Path) -> "HttpImage":
        with open(image_filepath, 'rb') as image_file:
            content = image_file.read()
        return cls(filepath=image_filepath, content=content)

    @classmethod
    def from_pil_image(cls, image: Image.Image, filepath: str) -> "HttpImage":
        content = image_to_bytes(image)
        return cls(
            filepath=Path(filepath),
            content=content,
        )

    @cached_property
    def mimetype(self):
        return mimetypes.guess_type(self.filepath.name)[0] or 'application/octet-stream'

    @property
    def http_response(self):
        return StreamingResponse(io.BytesIO(self.content), media_type=self.mimetype)

    @property
    def pil_image(self):
        return Image.open(io.BytesIO(self.content))

    @property
    def base64_url_image(self):
        return

    @property
    def file_extension(self):
        return os.path.splitext(self.filepath.name)[1].strip(".")
