# strips7.py <crops-dir> <owner-dir> <old-strips-dir> <logs-dir> <out-dir> <sha>: MEASURE-7 step 9. The strips for the
# owner's questions 10 and 12 to 18 and the six earlier strips (fold, swap, seatset, hover, many, glyph), every frame
# labelled in plain words. RU-59's scheme check: a frame whose label names a scheme other than the one the page had at
# the shot is refused (printed, left out). Q10's rows carry the plate against the field under it from the ladder's ink7
# logs (dials, over the field, the same scheme and posture). Writes <out>/strip-*-7*.png.
import sys, os, json, glob, re
from PIL import Image, ImageDraw
crops, owner, old, logs, out, sha = sys.argv[1:7]
ENG = {"chromium": "Chromium", "webkit": "Safari's engine (Playwright WebKit 2287)"}
PCT = ["rest", "10 %", "30 %", "50 %", "70 %", "90 %", "rest"]
refused = []

def scheme_ok(m):
    words = re.findall(r"\b(light|dark)\b", m.get("label", ""))
    if not words or m.get("scheme") in (None, words[-1]):
        return True
    refused.append(f'{m.get("set")} {os.path.basename(m.get("file", ""))}: label says {words[-1]}, the page was {m.get("scheme")}')
    return False

def grid(items, cols, title, dest, scale=0.5):
    ims = []
    for lab, p in items:
        if not p or not os.path.exists(p): continue
        im = Image.open(p).convert("RGB"); im = im.resize((max(1, round(im.width * scale)), max(1, round(im.height * scale))), Image.LANCZOS)
        ims.append((lab, im))
    if not ims:
        print("nothing for", dest); return
    cw = max(max(i.width for _, i in ims) + 12, 300); ch = max(i.height for _, i in ims) + 44
    rows = -(-len(ims) // cols)
    W = max(cols * cw + 6, 700); H = 28 + rows * ch + 6
    c = Image.new("RGB", (W, H), "white"); dr = ImageDraw.Draw(c); dr.text((6, 8), title, fill="black")
    for k, (lab, im) in enumerate(ims):
        x = 6 + (k % cols) * cw; y = 28 + (k // cols) * ch
        per = max(10, int((cw - 8) / 6))
        lines = [lab[i:i + per] for i in range(0, len(lab), per)][:2]
        for j, l in enumerate(lines): dr.text((x, y + j * 12), l, fill=(40, 40, 40))
        c.paste(im, (x, y + 28))
    c.save(dest, optimize=True); print("wrote", dest, c.size)

def held(name, before_file, before_h, title, scale, cols, dest):
    try:
        before = Image.open(f"{old}/{before_file}").convert("RGB"); before = before.crop((0, 0, before.width, before_h))
    except FileNotFoundError:
        before = Image.new("RGB", (10, 1), "white")
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
    cw = max(im.width for _, ims in blocks for im in ims) + 6; ch = max(im.height for _, ims in blocks for im in ims) + 16
    W = max(before.width, cols * cw); rows_per = -(-7 // cols)
    H = before.height + sum(18 + rows_per * ch for _ in blocks) + 6
    c = Image.new("RGB", (W, H), "white"); c.paste(before, (0, 0)); dr = ImageDraw.Draw(c); y = before.height
    for label, ims in blocks:
        dr.text((6, y + 3), label, fill="black"); y += 18
        for i, im in enumerate(ims):
            x = (i % cols) * cw + 3; yy = y + (i // cols) * ch
            dr.text((x + 2, yy), PCT[i], fill=(60, 60, 60)); c.paste(im, (x, yy + 12))
        y += rows_per * ch
    c.save(dest, optimize=True); print("wrote", dest, c.size)

def plate_reading(rung, w, scheme, posture, engine):
    tag = f"ladder{rung}" + ("-390" if w == 390 else "")
    try:
        d = json.load(open(f"{logs}/m7-ink-{tag}.{engine}.json"))
    except FileNotFoundError:
        return None
    for c in d.get("cells", []):
        if c.get("page") == "dials" and c.get("ground") == "field" and c.get("scheme") == scheme and c.get("posture") == posture and c.get("plate"):
            return c["plate"][0].get("plateVsField")
    return None

held("fold", "strip-fold.png", 730, "the fold, held at seven points", 0.5, 4, f"{out}/strip-fold-7.png")
held("swap", "strip-swap.png", 642, "a layer change (two rows to four), held at seven points", 0.5, 7, f"{out}/strip-swap-7.png")
for engine in ("chromium", "webkit"):
    by = {}
    for src in (f"{owner}/owner.{engine}.json", f"{owner}/owner8.{engine}.json"):
        try:
            meta = json.load(open(src))
        except FileNotFoundError:
            continue
        for m in meta:
            if not m.get("file") or not scheme_ok(m): continue
            lab = m["label"]
            if m["set"] == "ladder":
                pr = plate_reading(m["rung"], m["w"], m.get("scheme"), m["posture"], engine)
                lab = f'{lab}; the plate against the field under it {pr if pr is not None else "unread"}:1'
            by.setdefault(m["set"], []).append((lab, os.path.join(owner, os.path.basename(m["file"]))))
    E = ENG[engine]
    grid(by.get("ladder", []), 4, f"Q10, a firmer dock: the dials dock at five levels and v11.0.2's veil, words at full strength, folded and open, dark and light, at 1440 and 390; {E}; build {sha}", f"{out}/strip-ladder-7.{engine}.png", 0.5)
    grid(by.get("phone", []), 1, f"Q13, a page name on a phone: a seat pressed and held; {E}; build {sha}", f"{out}/strip-phone-7.{engine}.png", 0.5)
    grid(by.get("legend", []), 3, f"Q14, a dock in a row: atlas's head row, folded, open over its legend, and in the linger; {E}; build {sha}", f"{out}/strip-legend-7.{engine}.png", 0.5)
    grid(by.get("transport", []), 2, f"Q15, a dock with a button that always shows: keyframes's transport as shipped and with anchor=start; {E}; build {sha}", f"{out}/strip-transport-7.{engine}.png", 0.5)
    grid(by.get("cue", []), 1, f"Q16, more icons than fit on a phone: the run cut at a whole seat, no cue; {E}; build {sha}", f"{out}/strip-cue-7.{engine}.png", 0.5)
    grid(by.get("glyph3", []), 2, f"Q17, big icons beside words: share 0.5 (v11.0.2), 0.9 (this build), and sized from the words; the tab glyph; {E}; build {sha}", f"{out}/strip-glyph3-7.{engine}.png", 0.5)
    grid(by.get("hover3", []), 2, f"Q18, a hovered seat against the current page's: three strengths, each frame's ratio read from its pixels; {E}; build {sha}", f"{out}/strip-hover3-7.{engine}.png", 0.5)
    grid(by.get("glyph", []), 4, f"The glyph's share of its seat at 0.5, 0.75 and 0.9 (nav, over the stage's field, open), no size class; {E}; build {sha}", f"{out}/strip-glyph-7.{engine}.png", 0.5)
    grid(by.get("hover", []), 3, f"A seat at rest, hovered and pressed: no box moves; {E}; build {sha}", f"{out}/strip-hover-7.{engine}.png", 0.5)
    grid(by.get("seatset", []), 4, f"A change of seat set (a seat added), frames about 40 ms apart; {E}; build {sha}", f"{out}/strip-seatset-7.{engine}.png", 0.5)
many = []
for f in sorted(glob.glob(f"{owner}/many.*.png")):
    _, engine, width, pos, _ = os.path.basename(f).split(".")
    many.append((f"{ENG.get(engine, engine)}, {width} px wide, the run at its {pos}", f))
grid(many, 2, f"The seven-seat dock open at rest (five tabs, two avatar seats); build {sha}", f"{out}/crop-many-7.png", 0.5)
# RU-61's prototype (step 6): the in-flow dock open over its row with the margin, from inflow7's shots, the cover in the label.
for engine in ("chromium", "webkit"):
    try:
        cells = json.load(open(f"{logs}/m7-inflow-ru61.{engine}.json"))["cells"]
    except FileNotFoundError:
        continue
    items = []
    for f in sorted(glob.glob(f"{owner}/inflow/ru61-{engine}-*.png")):
        cell, mode = os.path.basename(f)[len(f"ru61-{engine}-"):-4].rsplit("-", 1)
        v = cells.get(f"{cell} {mode}", {})
        cov = v.get("cover", {})
        items.append((f"{cell}, {mode}: neighbours moved {v.get('worst')} px at most; the open plate covers {cov.get('under')} px of them; a focusable under it: {', '.join(cov.get('focusables') or []) or 'none'}; light", f))
    grid(items, 2, f"RU-61's prototype (not in this build): the in-flow dock open over its row with the negative margin; {ENG[engine]}; build {sha}", f"{out}/strip-inflow-7.{engine}.png", 0.35)
# Q12 is a list, not a picture: the names the removals delete, as text.
try:
    names = open(f"{logs}/m7p-names.txt").read().strip().splitlines()[-40:]
except FileNotFoundError:
    names = ["(the name table was not read)"]
img = Image.new("RGB", (1100, 24 + 14 * (len(names) + 2)), "white"); dr = ImageDraw.Draw(img)
dr.text((6, 6), f"Q12, delete what no site uses now: the public-name table against v11.1.0 (m7/names.mjs), build {sha}", fill="black")
for i, l in enumerate(names): dr.text((6, 28 + 14 * i), l[:180], fill=(40, 40, 40))
img.save(f"{out}/strip-names-7.png", optimize=True); print("wrote", f"{out}/strip-names-7.png")
print("refused by the scheme check:", len(refused)); [print("  ", r) for r in refused]
