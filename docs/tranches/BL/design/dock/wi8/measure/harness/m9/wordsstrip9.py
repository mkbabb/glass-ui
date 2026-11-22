# wordsstrip9.py <crops-dir> <out-dir>: MEASURE-9 part H, item H10 (RU-101 as amended for C8-M2). The frame strip of
# w-words's growth and shrink in Chromium (m9/frames9.mjs on a frozen clock, 60 Hz frames, dpr 2): frames 0, 1, 2, 3, 4,
# 6, 8, 12 and 16 of each travel stacked, each labelled with its frame, its time and the plate's width. The crops the
# strips do not use are deleted (the disk rule). Writes <out>/m9-words-<travel>.<scheme>.chromium.png.
import json, os, sys, glob
from PIL import Image, ImageDraw, ImageFont
src, out = sys.argv[1], sys.argv[2]
KEEP = [0, 1, 2, 3, 4, 6, 8, 12, 16]
f13 = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 22)
os.makedirs(out, exist_ok=True)
used = set()
for stem, what in (("w-words-grow.light.chromium", "the middle Select's value becomes 'View: Contracted bandwidth' (light)"), ("w-words-grow.dark.chromium", "the same growth (dark)"), ("w-words-shrink.light.chromium", "the value goes back to 'View: Bandwidth' (light)")):
    meta = json.load(open(os.path.join(src, f"{stem}.json")))
    ims = []
    for k in KEEP:
        p = os.path.join(src, f"{stem}.f{k:02d}.png")
        if not os.path.exists(p): continue
        used.add(os.path.abspath(p)); fr = meta["frames"][k]
        ims.append((f"frame {k}, {k * 1000 / 60:.0f} ms: the plate {fr['again']['plate'][2] if fr.get('again') else fr['plate'][2]:.1f} px wide", Image.open(p).convert("RGB")))
    title = f"w-words: {what}. Chromium; each frame 1/60 s on a frozen clock."
    W = max(max(i.width for _, i in ims) + 24, int(f13.getlength(title)) + 24); H = sum(i.height + 34 for _, i in ims) + 60
    c = Image.new("RGB", (W, H), "white"); d = ImageDraw.Draw(c)
    d.text((12, 12), title, fill="black", font=f13)
    y = 52
    for lab, im in ims:
        d.text((12, y), lab, fill=(50, 50, 50), font=f13); c.paste(im, (12, y + 28)); y += im.height + 34
    dest = os.path.join(out, f"m9-{stem.replace('w-words-', 'words-')}.png"); c.save(dest, optimize=True); print("wrote", dest, c.size)
for p in glob.glob(os.path.join(src, "*.png")):
    if os.path.abspath(p) not in used: os.remove(p)
print("crops kept:", len(used))
