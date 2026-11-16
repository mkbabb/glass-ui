# Print the PROTOTYPE.md tables from the probe results of both engines.
# usage: python3 summarize.py <chromium.json> <webkit.json> [extras-chromium.json] [extras-webkit.json]
import json, sys

def load(p):
    try:
        return json.load(open(p))
    except Exception:
        return None

C = load(sys.argv[1]); W = load(sys.argv[2])
EC = load(sys.argv[3]) if len(sys.argv) > 3 else None
EW = load(sys.argv[4]) if len(sys.argv) > 4 else None
ENG = [("Chromium", C), ("WebKit", W)]
CFGS = ["l1440", "d1440", "l390", "d390", "rm1440"]

def verdict(r):
    if r is None: return "not run"
    if r.get("error"): return "error"
    if r.get("pass"): return "pass"
    cl = sorted({f["clause"] for f in r["findings"]})
    return "FAIL " + "+".join(cl)

cells = list(C["configs"]["l1440"]["cells"].keys())

print("### G-TWEEN, every cell, in / out\n")
print("| cell | " + " | ".join(f"{e} {c}" for e, _ in ENG for c in CFGS) + " |")
print("|---|" + "---|" * (len(ENG) * len(CFGS)))
for cell in cells:
    row = []
    for _, d in ENG:
        for c in CFGS:
            cc = (d or {}).get("configs", {}).get(c, {}).get("cells", {}).get(cell)
            if not cc: row.append("not run"); continue
            a, b = verdict(cc.get("in")), verdict(cc.get("out"))
            row.append("pass" if a == b == "pass" else f"{a} / {b}")
    print(f"| {cell} | " + " | ".join(row) + " |")

print("\n### Findings behind each FAIL at 1440 light\n")
for e, d in ENG:
    if not d: continue
    for cell in cells:
        cc = d["configs"].get("l1440", {}).get("cells", {}).get(cell, {})
        for k in ("in", "out"):
            r = cc.get(k) or {}
            for f in (r.get("findings") or [])[:3]:
                print(f"- {e}, {cell}, {k}: {f['clause']} on `{f['target']}` {f['property']}: {f['detail'][:110]}")

print("\n### Frame-delta table (G-TWEEN step clause), 1440 light, 60 Hz samples\n")
print("Largest step between two samples as a share of the leg's travel, against the largest step of the leg's own easing at the same spacing. The bound is 1.15.\n")
print("| cell | dir | target | property | Chromium step / eased / ratio | WebKit step / eased / ratio |")
print("|---|---|---|---|---|---|")
def legs(d, cell, k):
    r = (d or {}).get("configs", {}).get("l1440", {}).get("cells", {}).get(cell, {}).get(k) or {}
    return {(l["target"], l["property"]): l for l in (r.get("legs") or [])}
def fmt(l):
    if not l: return "-"
    e = l["easedMaxStep"]; r = l["ratio"]
    return f"{l['maxStep']:.3f} / {e:.3f} / {r:.2f}" if e else f"{l['maxStep']:.3f} / none / -"
for cell in cells:
    for k in ("in", "out"):
        lc, lw = legs(C, cell, k), legs(W, cell, k)
        for key in sorted(set(lc) | set(lw)):
            if key[1] == "box" and not ("follow" in cell or "reclaim" in cell): continue
            print(f"| {cell} | {k} | `{key[0]}` | {key[1]} | {fmt(lc.get(key))} | {fmt(lw.get(key))} |")

print("\n### G-COST: DOM nodes in the cell at rest, mid-change and after; properties animated (1440 light)\n")
print("| cell | Chromium nodes in (rest/mid/end), out | WebKit nodes in, out | properties animated (Chromium) | properties animated (WebKit) |")
print("|---|---|---|---|---|")
def nodes(d, cell):
    out = []
    cc = (d or {}).get("configs", {}).get("l1440", {}).get("cells", {}).get(cell, {})
    for k in ("in", "out"):
        n = (cc.get(k) or {}).get("nodeCounts") or {}
        out.append("/".join(str(n.get(x, "-")) for x in ("rest", "mid0", "end")) + (f" (+phase 2 mid {n['mid1']})" if "mid1" in n else ""))
    return ", ".join(out)
def props(d, cell):
    cc = (d or {}).get("configs", {}).get("l1440", {}).get("cells", {}).get(cell, {})
    s = set()
    for k in ("in", "out"):
        for p in (cc.get(k) or {}).get("props") or []: s.add(p)
    return "; ".join(sorted(s)) or "none"
for cell in cells:
    print(f"| {cell} | {nodes(C, cell)} | {nodes(W, cell)} | {props(C, cell)} | {props(W, cell)} |")

print("\n### G-PRM (reduced motion, 1440 light): spatial values, fade values, loops\n")
print("| cell | dir | Chromium: spatial legs with more than 2 values; fade values; loops | WebKit: same |")
print("|---|---|---|---|")
SPATIAL = ("scale", "translate", "rotate")
FADE = ("opacity", "background-color", "outline-color")
def prm(d, cell, k):
    r = (d or {}).get("configs", {}).get("rm1440", {}).get("cells", {}).get(cell, {}).get(k)
    if not r or r.get("error"): return "not run"
    sp, fa = [], []
    for t in (r.get("rest") or {}):
        for p in SPATIAL:
            vals = {round(float(x), 3) if x.replace('.','',1).replace('-','',1).isdigit() else x for x in [ (s["read"].get(t) or {}).get("values", {}).get(p) for s in r["series"]] + [(r["rest"].get(t) or {}).get("values", {}).get(p), (r["end"].get(t) or {}).get("values", {}).get(p)] if x is not None}
            if len(vals) > 2: sp.append(f"{t} {p} {len(vals)}")
        for p in FADE:
            vals = {(s["read"].get(t) or {}).get("values", {}).get(p) for s in r["series"]}
            vals.discard(None)
            if len(vals) >= 2: fa.append(f"{t} {p} {len(vals)}")
    loops = sum(1 for a in r.get("animations") or [] if a.get("infinite"))
    durs = sorted({round(a["duration"]) for a in r.get("animations") or []})
    return f"spatial>2: {', '.join(sp) or 'none'}; fades: {', '.join(fa) or 'none'} (clocks {durs or '-'} ms); loops {loops}"
for cell in cells:
    for k in ("in", "out"):
        print(f"| {cell} | {k} | {prm(C, cell, k)} | {prm(W, cell, k)} |")
