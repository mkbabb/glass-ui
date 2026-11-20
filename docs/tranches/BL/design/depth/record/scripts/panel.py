"""Compose a labelled panel from named frames, all scaled to one height, 4 px gutters, max 1600 wide (wraps).
usage: python3 -I panel.py <out.png> <height> <frame>:<label> ...   (frames are paths)"""
import sys
from PIL import Image, ImageDraw
out, H = sys.argv[1], int(sys.argv[2])
items = [a.rsplit(':', 1) for a in sys.argv[3:]]
ims = []
for p, lab in items:
    im = Image.open(p).convert('RGB'); im = im.resize((max(1, int(im.width * H / im.height)), H), Image.LANCZOS)
    d = ImageDraw.Draw(im); tw = d.textlength(lab) + 10
    d.rectangle([0, 0, tw, 16], fill='white'); d.text((5, 2), lab, fill='black'); ims.append(im)
rows, row, w = [], [], 0
for im in ims:
    if row and w + im.width > 1600: rows.append(row); row, w = [], 0
    row.append(im); w += im.width + 4
rows.append(row)
W = max(sum(i.width for i in r) + 4 * (len(r) - 1) for r in rows)
sheet = Image.new('RGB', (W, len(rows) * (H + 4) - 4), 'white')
for k, r in enumerate(rows):
    x = 0
    for im in r: sheet.paste(im, (x, k * (H + 4))); x += im.width + 4
sheet.save(out, optimize=True); print(out, sheet.size)
