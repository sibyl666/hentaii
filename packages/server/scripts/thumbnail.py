import os
from PIL import Image

manga_folder = "./mangas"
new_thumb_height = 500
quality = 35

for manga_id in os.listdir(manga_folder):
    for img in os.listdir(f"./{manga_folder}/{manga_id}"):
        img_path = f"{manga_folder}/{manga_id}/{img}"

        if img.endswith(".png"):
            img = Image.open(img_path).convert("RGB")
            img.save(img_path.replace(".png", ".jpg"), optimize=True, quality=quality)

            os.remove(img_path)

    thumbnail_path = f"{manga_folder}/{manga_id}"
    jpg_thumbnail = f"{thumbnail_path}/001t.jpg"

    # jpg doesn't exist. create it.
    if not os.path.isfile(jpg_thumbnail):
        first_img = Image.open(f"{thumbnail_path}/001.jpg")
        width, height = first_img.size

        ratio = width / height
        new_width = int(ratio * new_thumb_height)

        img = first_img.resize((new_width, new_thumb_height), Image.LANCZOS)
        img.save(jpg_thumbnail, optimize=True, quality=quality)
