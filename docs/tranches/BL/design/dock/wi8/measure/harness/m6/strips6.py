# strips6.py <crops-dir> <owner-dir> <old-strips-dir> <out-dir> <sha>: MEASURE-6, RU-49 step 7. The fold and the
# layer change as strips5.py composed them (v11.0.1 above, this build below, held at seven points, both engines),
# the seven-seat dock, and the owner's new strips from m6/owner.mjs: the glyph share at 0.5, 0.75 and 0.9, the
# plate at three firmnesses, a seat's hover and press, a change of seat set. Every frame carries its label in words.
import sys, os, json, glob
from PIL import Image, ImageDraw
crops, owner, old, out, sha = sys.argv[1:6]
PCT = ["rest", "10 %", "30 %", "50 %", "70 %", "90 %", "rest"]
ENG = {"chromium": "Chromium", "webkit": "Safari's engine (Playwright WebKit 2287)"}

def held(name, before_file, before_h, title, scale, cols, dest):
    before = Image.open(f"{old}/{before_file}").convert("RGB")
    before = before.crop((0, 0, before.width, before_h))
    blocks = []
    for engine in ("chromium", "webkit"):
        try:
            ims = [Image.open(f"{crops}/{name}.{engine}.{i}.png").convert("RGB") for i in range(7)]
        except FileNotFoundError:
            continue
        ims = [im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS) for im in ims]
        blocks.append((f"AFTER, this build ({sha}), {ENG[engine]}: {title}", ims))
    if not blocks:
        print("no crops for", name); return
    cw = max(im.width for _, ims in blocks for im in ims) + 6
    ch = max(im.height for _, ims in blocks for im in ims) + 16
    W = max(before.width, cols * cw)
    rows_per = -(-7 // cols)
    H = before.height + sum(18 + rows_per * ch for _ in blocks) + 6
    c = Image.new("RGB", (W, H), "white"); c.paste(before, (0, 0)); dr = ImageDraw.Draw(c); y = before.height
    for label, ims in blocks:
        dr.text((6, y + 3), label, fill="black"); y += 18
        for i, im in enumerate(ims):
            x = (i % cols) * cw + 3; yy = y + (i // cols) * ch
            dr.text((x + 2, yy), PCT[i], fill=(60, 60, 60)); c.paste(im, (x, yy + 12))
        y += rows_per * ch
    c.save(dest, optimize=True); print("wrote", dest, c.size)

def grid(items, cols, title, dest, scale=0.5):
    """items: [(label, path)]; labels in plain words above each frame."""
    ims = []
    for lab, p in items:
        if not p or not os.path.exists(p): continue
        im = Image.open(p).convert("RGB"); im = im.resize((max(1, round(im.width * scale)), max(1, round(im.height * scale))), Image.LANCZOS)
        ims.append((lab, im))
    if not ims:
        print("nothing for", dest); return
    cw = max(i.width for _, i in ims) + 12; ch = max(i.height for _, i in ims) + 30
    rows = -(-len(ims) // cols)
    W = max(cols * cw + 6, 600); H = 24 + rows * ch + 6
    c = Image.new("RGB", (W, H), "white"); dr = ImageDraw.Draw(c); dr.text((6, 6), title, fill="black")
    for k, (lab, im) in enumerate(ims):
        x = 6 + (k % cols) * cw; y = 24 + (k // cols) * ch
        dr.text((x, y), lab if len(lab) * 6 < cw else lab.split(": ", 1)[-1][:max(8, int(cw / 5.5))], fill=(40, 40, 40)); c.paste(im, (x, y + 14))
    c.save(dest, optimize=True); print("wrote", dest, c.size)

held("fold", "strip-fold.png", 730, "the fold, held at seven points", 0.5, 4, f"{out}/strip-fold-6.png")
held("swap", "strip-swap.png", 642, "a layer change (two rows to four), held at seven points", 0.5, 7, f"{out}/strip-swap-6.png")
for engine in ("chromium", "webkit"):
    try:
        meta = json.load(open(f"{owner}/owner.{engine}.json"))
    except FileNotFoundError:
        continue
    by = {}
    for m in meta:
        if m.get("file"): by.setdefault(m["set"], []).append((f'{ENG[engine]}: {m["label"]}', os.path.join(owner, os.path.basename(m["file"]))))
    grid(by.get("glyph", []), 4, f"The glyph's share of its seat at 0.5, 0.75 and 0.9 (nav, over the stage's field, open), {ENG[engine]}, build {sha}", f"{out}/strip-glyph-6.{engine}.png", 0.5)
    grid(by.get("plate", []), 4, f"The plate at three firmnesses (dials, over the stage's field), {ENG[engine]}, build {sha}", f"{out}/strip-plate-6.{engine}.png", 0.5)
    grid(by.get("hover", []), 3, f"A seat at rest, hovered and pressed: no box moves, {ENG[engine]}, build {sha}", f"{out}/strip-hover-6.{engine}.png", 0.5)
    grid(by.get("seatset", []), 4, f"A change of seat set (a seat added), frames about 40 ms apart, {ENG[engine]}, build {sha}", f"{out}/strip-seatset-6.{engine}.png", 0.5)
many = []
for f in sorted(glob.glob(f"{owner}/many.*.png")):
    _, engine, width, pos, _ = os.path.basename(f).split(".")
    many.append((f"{ENG.get(engine, engine)}, {width} px wide, the run at its {pos}", f))
grid(many, 2, f"The seven-seat dock open at rest (five tabs, two avatar seats), build {sha}", f"{out}/crop-many-6.png", 0.5)
