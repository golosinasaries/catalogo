from PIL import Image
from pathlib import Path

for p in Path("img").rglob("*"):
    if not p.is_file() or p.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
        continue
    try:
        with Image.open(p) as im:
            if im.width <= 1200 and im.height <= 1200 and p.stat().st_size < 300_000:
                continue
            im.thumbnail((1200, 1200))
            if p.suffix.lower() in {".jpg", ".jpeg"}:
                if im.mode not in ("RGB", "L"):
                    im = im.convert("RGB")
                im.save(p, quality=82, optimize=True, progressive=True)
            elif p.suffix.lower() == ".webp":
                im.save(p, quality=82, method=6)
            else:
                im.save(p, optimize=True)
            print("Optimizada:", p)
    except Exception as e:
        print("Error:", p, e)
print("Listo.")
