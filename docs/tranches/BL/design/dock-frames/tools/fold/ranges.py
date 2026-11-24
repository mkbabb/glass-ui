# ranges.py <witness.json> [tree]: the fade, overlap, drift, duration and press/key ranges
# the fold's prose quotes, across the fourier repro, the grouped page and the harness page.
import json, sys
d = json.load(open(sys.argv[1])); tree = sys.argv[2] if len(sys.argv) > 2 else None
agg = {}
def add(k, v):
    if isinstance(v, (int, float)): agg.setdefault(k, []).append(v)
for c in d["cells"]:
    if tree and c["tree"] != tree: continue
    t = c["tree"]
    for p in c["pages"]:
        for k, side in (("fadeInOpen", "in"), ("fadeInClose", "in"), ("fadeOutOpen", "out"), ("fadeOutClose", "out")):
            x = p.get(k) or {}
            if x.get("ms") is not None: add((t, side, "ms"), x["ms"]); add((t, side, "step"), x["maxStep17"])
        if p["page"] in ("fourier-dock", "group-dock"):
            add((t, "both"), p.get("bothOpen")); add((t, "both"), p.get("bothClose"))
        for k in ("driftOpen", "leaveDriftClose"): add((t, "drift"), p.get(k))
        if p["page"] in ("fourier-dock", "group-dock"):
            add((t, "drift"), p.get("leaveDriftOpen")); add((t, "drift"), p.get("sealDriftClose"))
            add((t, "sealSettle"), abs(p.get("sealSettleJump") or 0))
        if p["page"] == "fourier-dock":
            add((t, "ms"), p.get("openMs")); add((t, "ms"), p.get("closeMs"))
        if p["page"] == "dock": add((t, "persSettle"), abs(p.get("persSettleJump") or 0))
        for k in ("press", "key"):
            x = p.get(k) or {}
            if x: print(t, c["w"], c["scheme"], k, x.get("move"), x.get("maxStep"), x.get("frames"))
for k, v in sorted(agg.items(), key=str):
    print(k, min(v), max(v))
