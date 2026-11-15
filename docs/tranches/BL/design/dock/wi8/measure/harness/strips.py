# strips.py <crops-dir> <old-strips-dir> <out-dir> <sha>: FOLD-2 (C2-19). Composes the two
# strips OWNER-READ cites: v11.0.1 above (the rows of the first strips, kept as shot) and
# this build below, the travel held at 0, 10, 30, 50, 70, 90 and 100 %, in Chromium and in
# Playwright WebKit. Also copies the tall dock's rest crop.
import sys
from PIL import Image, ImageDraw
d, old, out, sha = sys.argv[1:5]
PCT = ["rest", "10 %", "30 %", "50 %", "70 %", "90 %", "rest"]
def row(name, engine, scale):
    ims = [Image.open(f"{d}/{name}.{engine}.{i}.png").convert("RGB") for i in range(7)]
    ims = [im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS) for im in ims]
    return ims
def strip(name, before_file, before_h, title, scale, cols, dest):
    before = Image.open(f"{old}/{before_file}").convert("RGB").crop((0, 0, None or Image.open(f"{old}/{before_file}").width, before_h))
    blocks = []
    for engine, label in (("chromium", "Chromium"), ("webkit", "Safari's engine (Playwright WebKit 2287)")):
        try: ims = row(name, engine, scale)
        except FileNotFoundError: continue
        blocks.append((f"AFTER, this build ({sha}), {label}: {title}", ims))
    cw = max(im.width for _, ims in blocks for im in ims) + 6
    ch = max(im.height for _, ims in blocks for im in ims) + 16
    W = max(before.width, cols * cw)
    rows_per = -(-7 // cols)
    H = before.height + sum(18 + rows_per * ch for _ in blocks) + 6
    canvas = Image.new("RGB", (W, H), "white")
    canvas.paste(before, (0, 0))
    dr = ImageDraw.Draw(canvas)
    y = before.height
    for label, ims in blocks:
        dr.text((6, y + 3), label, fill="black")
        y += 18
        for i, im in enumerate(ims):
            x = (i % cols) * cw + 3
            yy = y + (i // cols) * ch
            dr.text((x + 2, yy), PCT[i], fill=(60, 60, 60))
            canvas.paste(im, (x, yy + 12))
        y += rows_per * ch
    canvas.save(dest, optimize=True)
    print("wrote", dest, canvas.size)
strip("fold", "strip-fold.png", 730, "the fold, held at seven points", 0.5, 4, f"{out}/strip-fold-2.png")
strip("swap", "strip-swap.png", 642, "a layer change (two rows to four), held at seven points", 0.5, 7, f"{out}/strip-swap-2.png")
im = Image.open(f"{d}/tall-page.chromium.0.png").convert("RGB")
im = im.resize((im.width // 2, im.height // 2), Image.LANCZOS)
im.save(f"{out}/crop-tall.png", optimize=True)
print("wrote crop-tall", im.size)
