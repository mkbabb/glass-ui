# ink9sum.py <logs-dir>: MEASURE-9 part H, items H5 and H7 (RU-94, RU-97, RU-105). Prints m9/ink9.mjs's logs as one table
# (per step pair and engine: cells, failing cells, those failing only by an unsettled item, marks and their floor fails,
# hover reads and fails, the weakest word, glyph, mark and hover, and the loose fails), then RU-68's two readings from the
# same logs (RU-105): the segmented control's hover against the dock's token (dials), and the held press (dials and nav,
# both schemes, 1440), each at the 5 % hover and 10 % current steps; then the failing lines of each log by cell.
import glob, json, os, sys
L = sys.argv[1]
rows = []
for f in sorted(glob.glob(os.path.join(L, "m9-ink-h*-c*.*.json"))):
    d = json.load(open(f)); s = d["summary"]; tag = os.path.basename(f)[len("m9-ink-"):].rsplit(".", 2)[0]
    rows.append((tag, d["engine"], s, d))
print("steps | engine | cells | failing | unsettled | marks (fails, min) | hover reads (fails, min) | min word | min glyph | loose fails")
for tag, e, s, d in rows:
    print(f"{tag} | {e} | {s['cells']} | {s['failing']} | {s.get('unsettledFails')} | {s['marks']} ({s['markFails']}, {s.get('minMark')}) | {s['hoverReads']} ({s['hoverFails']}, {s.get('minHover')}) | {s.get('minText')} | {s.get('minIcon')} | {s.get('looseFails')}")
print("\nRU-68's readings (RU-105), at hover 5 % and current 10 %:")
for tag, e, s, d in rows:
    if tag != "h5-c10": continue
    for c in d["cells"]:
        if c.get("segmentedHover"): print(f"  segmented hover, {e} {c['page']} {c['ground']} {c['scheme']}: {json.dumps(c['segmentedHover'])[:260]}")
        if c.get("press"): print(f"  held press, {e} {c['page']} {c['ground']} {c['scheme']}: {json.dumps(c['press'])[:300]}")
print("\nfailing lines by cell:")
for tag, e, s, d in rows:
    for c in d["cells"]:
        fl = (c.get("fails") or []) + (c.get("markFails") or []) + (c.get("hoverFails") or [])
        if fl: print(f"  {tag} {e} {c['page']} {c['ground']} {c['scheme']} {c.get('posture')}: " + "; ".join(str(x)[:120] for x in fl[:4]) + (f" (+{len(fl) - 4})" if len(fl) > 4 else ""))
