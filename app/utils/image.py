import io

from PIL import Image


def image_from_bytes(image):
    return Image.open(io.BytesIO(image))


def image_to_bytes(image: Image.Image, image_format: str = "png"):
    image_bytes = io.BytesIO()
    image.save(image_bytes, format=image_format)
    return image_bytes.getvalue()


def thumbnail(image: Image.Image, size: int):
    return image.thumbnail((size, size))


def merge_images(background_image: Image.Image, foreground_image: Image.Image):
    background_image_copy = background_image.copy().convert("RGBA")
    background_image_copy.paste(foreground_image, (0, 0), foreground_image)
    return background_image_copy
