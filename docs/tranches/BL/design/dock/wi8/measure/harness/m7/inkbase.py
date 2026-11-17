# inkbase.py <ink7-log> <v11.0.2-ink7-log>: MEASURE-7 step 8. The pass queue (m7/q/step8b.q) ran ink7 with
# `--base ../logs/m7-ink-base1102.E.json`, a path that does not exist, so ink7 read no v11.0.2 base and printed no mark
# or loose clause. This applies the two clauses after the fact exactly as ink7 writes them (the mark of each open
# cell no weaker than the same cell's v11.0.2 mark less 0.02; the loose DockControl's current and hover fills within
# 0.02 of v11.0.2's), from the marks the run recorded. The words and the hover clause do not read the base.
import json, sys
d, B = json.load(open(sys.argv[1])), json.load(open(sys.argv[2]))
def base_mark(page, ground, scheme, dock, name):
    c = next((c for c in B["cells"] if c.get("page") == page and c.get("ground") == ground and c.get("scheme") == scheme and c.get("posture") == "open" and (c.get("dock") == dock or page == "loose")), None)
    m = next((m for m in (c or {}).get("marks") or [] if m.get("name") == name), None)
    return m["mark"] if m else None
mf, lf, n = [], [], 0
for c in d["cells"]:
    if c.get("page") == "loose" and "mark" in c:
        b = next((x for x in B["cells"] if x.get("page") == "loose" and x.get("ground") == c["ground"] and x.get("scheme") == c["scheme"]), None)
        if not b: continue
        bm, bh = b.get("mark"), ((b.get("marks") or [{}])[0].get("hover") or {}).get("againstGround")
        hv = ((c.get("marks") or [{}])[0].get("hover") or {}).get("againstGround")
        if bm is not None and c.get("mark") is not None and abs(c["mark"] - bm) > 0.02: lf.append(f'loose {c["ground"]} {c["scheme"]}: current fill {c["mark"]} against v11.0.2 {bm}')
        if bh is not None and hv is not None and abs(hv - bh) > 0.02: lf.append(f'loose {c["ground"]} {c["scheme"]}: hover fill {hv} against v11.0.2 {bh}')
        continue
    if c.get("posture") != "open" or not c.get("marks"): continue
    for m in c["marks"]:
        bm = base_mark(c["page"], c["ground"], c["scheme"], c.get("dock"), m.get("name"))
        if bm is None: continue
        n += 1
        if m["mark"] < bm - 0.02: mf.append(f'{c["page"]} {c["ground"]} {c["scheme"]} {c.get("dock")}: mark {m["name"]} {m["mark"]} < v11.0.2 {bm}')
print(json.dumps({"engine": d.get("engine"), "marksWithBase": n, "markFails": len(mf), "looseFails": len(lf)}))
for x in mf + lf: print("  ", x)
