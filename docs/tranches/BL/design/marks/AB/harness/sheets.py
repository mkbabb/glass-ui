# Side-by-side sheets from the AB captures: control | A | B | C, one file per question.
#   python3 -I sheets.py <AB dir>
import json, os, sys
from PIL import Image, ImageDraw, ImageFont

AB = sys.argv[1]
PNG = os.path.join(AB, "data", "png")
OUT = os.path.join(AB, "sheets")
os.makedirs(OUT, exist_ok=True)
CANDS = [("ctl", "control (11.1.0 HandMark)"), ("a", "proposal A"), ("b", "proposal B"), ("c", "proposal C (atlas)")]
try:
    FONT = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 28)
    SMALL = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 20)
except Exception:
    FONT = SMALL = ImageFont.load_default()


def side(files, labels, out, crop=None, scale=1.0, gap=24):
    ims = []
    for f in files:
        p = os.path.join(PNG, f)
        if not os.path.exists(p):
            ims.append(None)
            continue
        im = Image.open(p).convert("RGB")
        if crop:
            im = im.crop(crop)
        if scale != 1.0:
            im = im.resize((int(im.width * scale), int(im.height * scale)), Image.LANCZOS)
        ims.append(im)
    w = max((i.width for i in ims if i), default=200)
    h = max((i.height for i in ims if i), default=200)
    sheet = Image.new("RGB", (len(ims) * (w + gap) + gap, h + 70), (128, 128, 128))
    d = ImageDraw.Draw(sheet)
    for k, (im, lab) in enumerate(zip(ims, labels)):
        x = gap + k * (w + gap)
        d.text((x, 18), lab, fill=(255, 255, 255), font=FONT if w > 600 else SMALL)
        if im:
            sheet.paste(im, (x, 60))
        else:
            d.text((x, 100), "(missing)", fill=(255, 255, 255), font=FONT)
    sheet.save(os.path.join(OUT, out), optimize=True)


for eng in ("chromium", "webkit"):
    for vp in (390, 1440):
        for shape in ("underline", "highlight"):
            for state in ("light", "dark", "mid50", "mid30-markpass", "pass-mark"):
                side([f"{eng}-{vp}-{c}-{shape}-{state}.png" for c, _ in CANDS], [f"{lab} · {eng} {vp} {shape} {state}" if i == 0 else lab for i, (c, lab) in enumerate(CANDS)],
                     f"{eng}-{vp}-{shape}-{state}.png", scale=0.5 if vp == 1440 else 0.75)
    # The still states, 1440 light: one sheet per state.
    for shape in ("underline", "highlight"):
        for state in ("reduced", "print", "forced", "noscript-screen", "noscript-print"):
            side([f"{eng}-1440-{c}-{shape}-{state}.png" for c, _ in CANDS], [f"{lab} · {eng} {shape} {state}" if i == 0 else lab for i, (c, lab) in enumerate(CANDS)],
                 f"{eng}-1440-{shape}-{state}.png", scale=0.5)

# Descender close-ups at 1440, light: the 112 px headline and the body row, from the sheet geometry.
for eng in ("chromium", "webkit"):
    jp = os.path.join(AB, "data", f"sheet-{eng}.json")
    if not os.path.exists(jp):
        continue
    rec = json.load(open(jp))
    for shape in ("underline", "highlight"):
        for spec, ids in (("h112", ["h112"]), ("body", ["wake", "google"]), ("atlas42", ["atlas42"]), ("wrap", ["wrap"]), ("rtl", ["rtl"]), ("byprog", ["byprog"]), ("h85", ["h85"])):
            cell = next((c for c in rec["cells"] if c["vp"] == 1440 and c["cand"] == "ctl" and c["shape"] == shape), None)
            if not cell:
                continue
            rows = [r for i in ids for r in cell["marks"][i]["rows"]]
            fs = cell["marks"][ids[0]]["fs"]
            l = min(r[0] for r in rows) - 0.6 * fs; t = min(r[1] for r in rows) - 0.3 * fs
            r_ = max(r[2] for r in rows) + 0.6 * fs; b = max(r[3] for r in rows) + 0.3 * fs
            box = tuple(int(v * 2) for v in (max(0, l), max(0, t), r_, b))
            for theme in ("light", "dark", "pass-mark"):
                side([f"{eng}-1440-{c}-{shape}-{theme}.png" for c, _ in CANDS], [lab.replace(" (11.1.0 HandMark)", "") for c, lab in CANDS],
                     f"closeup-{eng}-{spec}-{shape}-{theme}.png", crop=box, scale=1.0 if spec != "body" else 1.0)
print("sheets in", OUT)
