# Contact sheet: python3 sheet.py <out.png> <cols> <scale> <label=path> ...
import sys
from PIL import Image, ImageDraw
out, cols, scale = sys.argv[1], int(sys.argv[2]), float(sys.argv[3])
items = [a.split("=", 1) for a in sys.argv[4:]]
tiles = []
for label, path in items:
    try:
        im = Image.open(path).convert("RGB")
    except Exception as e:
        im = Image.new("RGB", (200, 40), "white"); ImageDraw.Draw(im).text((4, 12), "missing", fill="red")
    if scale != 1: im = im.resize((max(1, int(im.width * scale)), max(1, int(im.height * scale))))
    tiles.append((label, im))
cw = max(t[1].width for t in tiles) + 12
rows = [tiles[i:i + cols] for i in range(0, len(tiles), cols)]
rh = [max(t[1].height for t in r) + 24 for r in rows]
sheet = Image.new("RGB", (cw * cols, sum(rh)), (128, 128, 128))
d = ImageDraw.Draw(sheet)
y = 0
for r, h in zip(rows, rh):
    for i, (label, im) in enumerate(r):
        d.text((i * cw + 4, y + 4), label, fill="white")
        sheet.paste(im, (i * cw + 6, y + 18))
    y += h
sheet.save(out)
print(out, sheet.size)
