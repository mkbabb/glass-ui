# analyse.py <crops-dir> <engine>: FOLD-2 (C2-6). Reads crop.mjs's pairs (the dock, and the
# same clip with the dock hidden) and judges the outline the dock paints against a stadium:
# the mask is every pixel the dock changes by more than 40 of 255 (the shadow outside changes it by 30 or less); per row (or per column,
# for a shape taller than wide) its first and last pixel are compared with the stadium of
# the mask's own bounding box. Prints one line per crop. Device pixels are halved to CSS px.
import json, sys, math
from PIL import Image, ImageChops
d, engine = sys.argv[1], sys.argv[2]
meta = json.load(open(f"{d}/crops.{engine}.json"))
out = []
for m in meta:
    if not m.get("pair"):
        continue
    a = Image.open(f"{d}/{m['file']}").convert("RGB")
    b = Image.open(f"{d}/{m['file'].replace('.png', '.bare.png')}").convert("RGB")
    diff = ImageChops.difference(a, b)
    W, H = diff.size
    px = diff.load()
    mask = [[max(px[x, y]) > 40 for x in range(W)] for y in range(H)]
    rows = [(y, [x for x in range(W) if mask[y][x]]) for y in range(H)]
    rows = [(y, xs) for y, xs in rows if len(xs) > 6]
    if not rows:
        out.append({"crop": m["file"], "error": "no mask"}); continue
    # the plate's rows: the longest run of consecutive rows
    runs, cur = [], [rows[0]]
    for r in rows[1:]:
        if r[0] == cur[-1][0] + 1: cur.append(r)
        else: runs.append(cur); cur = [r]
    runs.append(cur)
    rows = max(runs, key=len)
    T, B = rows[0][0], rows[-1][0]
    L = min(xs[0] for _, xs in rows); R = max(xs[-1] for _, xs in rows)
    w, h = R - L + 1, B - T + 1
    tall = h > w
    r = min(w, h) / 2
    dev = 0.0; devAt = None; flat = 0
    if not tall:
        for y, xs in rows[1:-1]:
            dy = abs(y + 0.5 - (T + h / 2))
            inset = r - math.sqrt(max(0.0, r * r - dy * dy))
            for got, exp in ((xs[0], L + inset), (xs[-1], R - inset)):
                if abs(got - exp) > dev: dev, devAt = abs(got - exp), (got, y)
            if xs[0] - L <= 1: flat += 1
        span = h
    else:
        for x in range(L + 1, R):
            ys = [y for y, xs in rows if x in set(xs)] if False else [y for y in range(T, B + 1) if mask[y][x]]
            if not ys: continue
            dx = abs(x + 0.5 - (L + w / 2))
            inset = r - math.sqrt(max(0.0, r * r - dx * dx))
            for got, exp in ((ys[0], T + inset), (ys[-1], B - inset)):
                if abs(got - exp) > dev: dev, devAt = abs(got - exp), (x, got)
            if ys[0] - T <= 1: flat += 1
        span = w
    # a stadium's own share of end rows within 1 device px of the extreme
    own = 2 * math.sqrt(2 * r - 1) / (2 * r) if r > 1 else 1
    p = m["plate"]
    out.append({"crop": m["file"], "maskCss": [round(w / 2, 1), round(h / 2, 1)], "plateCss": [round(p["w"], 1), round(p["h"], 1)], "written": p["r"], "devCssPx": round(dev / 2, 2), "flatShare": round(flat / span, 2), "stadiumFlatShare": round(own, 2)})
for o in out: print(json.dumps(o))
json.dump(out, open(f"{d}/outline.{engine}.json", "w"), indent=1)
