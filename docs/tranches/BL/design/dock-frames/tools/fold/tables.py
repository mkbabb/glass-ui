# tables.py <witness.json> [<witness-cure-rerun.json>]: the ROOT's witness tables, as markdown.
# A second file replaces the first file's cells for the trees it holds.
import json, sys
d = json.load(open(sys.argv[1]))
if len(sys.argv) > 2:
    e = json.load(open(sys.argv[2]))
    trees = set(c["tree"] for c in e["cells"])
    d["cells"] = [c for c in d["cells"] if c["tree"] not in trees] + e["cells"]
    d["extra"] = [x for x in d["extra"] if x["tree"] not in trees] + e["extra"]
order = {"base": 0, "cure": 1}
cells = sorted(d["cells"], key=lambda c: (-c["w"], c["scheme"] != "light", order.get(c["tree"], 9)))

def pg(c, name):
    return next((p for p in c["pages"] if p["page"] == name), {})

def fd(x):
    return "–" if not x or x.get("ms") is None else f"{x['ms']:.0f} / {x['maxStep17']:.2f}"

def v(x, nd=2):
    if x is None: return "–"
    if isinstance(x, float): return f"{x:.{nd}f}".rstrip("0").rstrip(".") if nd else f"{x:.0f}"
    return str(x)

print("**Faces and landing** (the fourier repro, and the grouped page's seal at the settle)\n")
print("| cell | tree | pop | entering fade, open: ms / largest 17.5 ms step | leaving fade, open | entering fade, close | leaving fade, close | both faces, open / close | seal at the settle (fourier / group) | tail (open / close) | open, close (ms) |")
print("| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |")
for c in cells:
    f, g = pg(c, "fourier-dock"), pg(c, "group-dock")
    if f.get("error"): print(f"| {c['w']} {c['scheme']} | {c['tree']} | error: {f['error'][:60]} |"); continue
    print(f"| {c['w']} {c['scheme']} | {c['tree']} | {v(f.get('popOpen'))} | {fd(f.get('fadeInOpen'))} | {fd(f.get('fadeOutOpen'))} | {fd(f.get('fadeInClose'))} | {fd(f.get('fadeOutClose'))} | {v(f.get('bothOpen'))} / {v(f.get('bothClose'))} | {v(f.get('sealSettleJump'))} / {v(g.get('sealSettleJump'))} | {v(f.get('tailOpenMs'),0)} / {v(f.get('tailCloseMs'),0)} | {v(f.get('openMs'),0)}, {v(f.get('closeMs'),0)} |")
print("\n**Drift, press and key**\n")
print("| cell | tree | entering seats' drift, open (fourier / group / harness) | leaving face's drift (seal on open / seats on close, fourier) | seal's drift, close (fourier / group) | harness persistent seat at the settle | press: move, largest step, frames | key: move, largest step, frames | run fits / overflow |")
print("| --- | --- | --- | --- | --- | --- | --- | --- | --- |")
for c in cells:
    f, g, h = pg(c, "fourier-dock"), pg(c, "group-dock"), pg(c, "dock")
    pr, k = f.get("press") or {}, f.get("key") or {}
    pm = lambda x: "–" if not x else f"{v(x.get('move'))}, {v(x.get('maxStep'))}, {x.get('frames')}" + (f" ({x['maxStepDt']} ms)" if x.get('maxStepDt') and x.get('maxStep') else "")
    b = (k.get("before") or pr.get("before") or {})
    print(f"| {c['w']} {c['scheme']} | {c['tree']} | {v(f.get('driftOpen'))} / {v(g.get('driftOpen'))} / {v(h.get('driftOpen')) if h else '–'} | {v(f.get('leaveDriftOpen'))} / {v(f.get('leaveDriftClose'))} | {v(f.get('sealDriftClose'))} / {v(g.get('sealDriftClose'))} | {v(h.get('persSettleJump')) if h else '–'} | {pm(pr)} | {pm(k)} | {b.get('fits')} / {b.get('overflow')} |")
print("\n**The harness page's persistent seat** (its step into the first frame, and its largest step, in px)\n")
for c in cells:
    h = pg(c, "dock")
    if not h or "persOpen" not in h: continue
    po, pc = h.get("persOpen") or {}, h.get("persClose") or {}
    print(f"- {c['w']} {c['scheme']} {c['tree']}: open {po.get('first')}, largest {po.get('max')}; close {pc.get('first')}, largest {pc.get('max')}")
print("\n**Last five plate-width steps into the settle frame** (fourier repro)\n")
for c in cells:
    f = pg(c, "fourier-dock")
    print(f"- {c['w']} {c['scheme']} {c['tree']}: open {f.get('openLastSteps')}; close {f.get('closeLastSteps')}; long frames in the close {f.get('longFramesClose')}")
print("\n**The collapsed seal's tooltip** (tip page, 1440)\n")
for c in cells:
    t = pg(c, "tip-dock").get("tip")
    if t: print(f"- {c['w']} {c['scheme']} {c['tree']}: opened {t['opened']}, open 1.5 s later {t['openAtEnd']}, last open at {t['lastOpenAt']} ms, travel {t['travel']} px")
print("\n**Extra cells** (1440 light)\n")
for x in sorted(d["extra"], key=lambda x: (x["cell"], order.get(x["tree"], 9))):
    if x.get("error"): print(f"- {x['cell']} {x['tree']}: error {x['error'][:80]}"); continue
    if x["cell"] == "vertical":
        print(f"- vertical {x['tree']}: pop {x.get('popOpen')}, entering seats' drift {x.get('driftOpen')}, leaving seal's drift on open {x.get('leaveDriftOpen')}, seal's drift on close {x.get('sealDriftClose')}, leaving seats' drift on close {x.get('leaveDriftClose')}, seal at the settle {x.get('sealSettleJump')}, entering fade {fd(x.get('fadeInOpen'))}, leaving fade on close {fd(x.get('fadeOutClose'))}, open {x.get('openMs')} ms, close {x.get('closeMs')} ms, last steps {x.get('openLastSteps')} / {x.get('closeLastSteps')}" + (f", persistent seat first / largest step open {x['persOpen'].get('first')} / {x['persOpen'].get('max')}, close {x['persClose'].get('first')} / {x['persClose'].get('max')}" if x.get('persOpen') else ""))
    else:
        print(f"- reduced motion {x['tree']}: width steps open {x.get('openWidthSteps')} close {x.get('closeWidthSteps')}; fades open in {fd(x.get('fadeInOpen'))} out {fd(x.get('fadeOutOpen'))}, close in {fd(x.get('fadeInClose'))} out {fd(x.get('fadeOutClose'))}; frames with the morph flag {x.get('morphFramesOpen')} / {x.get('morphFramesClose')}")
