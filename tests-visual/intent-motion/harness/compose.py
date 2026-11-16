# Compose film strips: one PNG per cell, the "in" row over the "out" row, frames evenly
# spaced in animation time, at most 1200 px wide.
# usage: python3 compose.py <runDir> <engine> <outDir> <owner.png>
import json, os, sys
from PIL import Image, ImageDraw, ImageFont

run, engine, out, owner = sys.argv[1:5]
MAXW = 1200
FULL = None  # every cell at l1440
SUBSET = {"plate-hover-seat44", "plate-hover-row", "plate-hover-g16", "plate-hover-g24", "glyph-nudge", "glyph-draw",
          "glyph-flip", "plate-press", "plate-focus", "plate-busy", "presence-swap", "presence-reclaim", "follow-cmd", "presence-stay-mark"}
font = ImageFont.load_default()

def label_row(files, title):
    ims = [Image.open(f["path"]).convert("RGB") for f in files]
    h = max(i.height for i in ims)
    gap = 4
    w = sum(i.width for i in ims) + gap * (len(ims) - 1)
    row = Image.new("RGB", (w, h + 14), (255, 255, 255))
    d = ImageDraw.Draw(row)
    x = 0
    for f, im in zip(files, ims):
        row.paste(im, (x, 14))
        t = f["t"] if isinstance(f["t"], str) else f'{f["t"]} ms'
        d.text((x + 2, 1), t, fill=(90, 90, 90), font=font)
        x += im.width + gap
    return row

def compose(cell, res, path):
    rows = []
    for k in ("in", "out"):
        r = res.get(k) or {}
        if not r.get("film"):
            continue
        rows.append(label_row(r["film"], k))
    if not rows:
        return False
    w = max(r.width for r in rows)
    h = sum(r.height for r in rows) + 18 + 6 * (len(rows) - 1)
    sheet = Image.new("RGB", (w, h), (255, 255, 255))
    d = ImageDraw.Draw(sheet)
    d.text((2, 2), cell, fill=(0, 0, 0), font=font)
    y = 18
    for r in rows:
        sheet.paste(r, (0, y))
        y += r.height + 6
    if sheet.width > MAXW:
        s = MAXW / sheet.width
        sheet = sheet.resize((MAXW, max(1, int(sheet.height * s))), Image.LANCZOS)
    sheet.save(path, optimize=True)
    return True

made = 0
for fn in sorted(os.listdir(run)):
    if not fn.startswith("results-") or not fn.endswith(".json"):
        continue
    d = json.load(open(os.path.join(run, fn)))
    for cfg, c in d.get("configs", {}).items():
        dst = os.path.join(out, engine, cfg)
        os.makedirs(dst, exist_ok=True)
        for cell, res in c["cells"].items():
            if cfg != "l1440" and cell not in SUBSET:
                continue
            if compose(cell, res, os.path.join(dst, f"{cell}.png")):
                made += 1

# The owner's frame beside this icon bar: rest and the pin hovered, light and dark.
def bar_frame(cfg, which):
    for fn in os.listdir(run):
        if fn.startswith("results-") and fn.endswith(".json"):
            d = json.load(open(os.path.join(run, fn)))
            c = d.get("configs", {}).get(cfg)
            if c:
                film = c["cells"]["plate-hover-b-pin"]["in"]["film"]
                return Image.open(film[0 if which == "rest" else -1]["path"]).convert("RGB")
    return None

tiles = [("owner, Google Chat (hover on Board)", Image.open(owner).convert("RGB"))]
for cfg in ("l1440", "d1440"):
    for which in ("rest", "hover"):
        im = bar_frame(cfg, which)
        if im is not None:
            tiles.append((f"glass plate, {cfg[0] == 'l' and 'light' or 'dark'}, {which}", im))
th = 110
scaled = [(t, im.resize((int(im.width * th / im.height), th), Image.LANCZOS)) for t, im in tiles]
cols = 2
cw = max(im.width for _, im in scaled)
rows_n = (len(scaled) + cols - 1) // cols
sheet = Image.new("RGB", (cols * cw + (cols + 1) * 10, rows_n * (th + 26) + 10), (255, 255, 255))
d = ImageDraw.Draw(sheet)
for i, (t, im) in enumerate(scaled):
    x = 10 + (i % cols) * (cw + 10)
    y = 10 + (i // cols) * (th + 26)
    d.text((x, y), t, fill=(0, 0, 0), font=font)
    sheet.paste(im, (x, y + 14))
if sheet.width > MAXW:
    s = MAXW / sheet.width
    sheet = sheet.resize((MAXW, int(sheet.height * s)), Image.LANCZOS)
sheet.save(os.path.join(os.path.dirname(out.rstrip("/")), f"icon-bar-vs-owner-{engine}.png"), optimize=True)
print("strips", made)
