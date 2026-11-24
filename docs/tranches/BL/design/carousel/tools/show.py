# show.py <summary.json> [cell-id-substring ...] — prints the per-gesture numbers analyze.mjs wrote
import json, sys
d = json.load(open(sys.argv[1]))
want = sys.argv[2:]
for c in d["cells"]:
    if "error" in c:
        print(c); continue
    if want and not any(w in c["id"] + "." + c["engine"] for w in want): continue
    print("=====", c["id"], c["engine"], "frames", c["frames"], "act", c["activeBefore"], "->", c["activeAfter"], "load", c["load"], "fig", c.get("figures"))
    for g in c["gestures"]:
        mo = g["motion"]; ar = g.get("afterRelease") or {}
        print(" --", g["name"], "up", g["upAt"], "dt", g["dt"], "hand", g.get("hand"))
        print("    motion", {k: mo.get(k) for k in ["firstMoveMs", "lastMoveMs", "travel", "ms", "peak", "overshoot", "maxStep", "endOffCentre"]}, "uneven", {k: (mo.get("uneven") or {}).get(k) for k in ["reversals", "stalls", "abrupt"]})
        if ar: print("    after-release", {k: ar.get(k) for k in ["firstMoveMs", "lastMoveMs", "travel", "ms", "peak", "overshoot", "maxStep"]}, {k: (ar.get("uneven") or {}).get(k) for k in ["reversals", "stalls", "abrupt", "abruptFrames", "revFrames"]})
        if g.get("glide"): print("    glide", g["glide"])
        if "scroll" in g: print("    scroll", {k: g["scroll"][k] for k in ["from", "to", "travel", "snapError"]}, "offScroll", g.get("offScroll"))
        print("    commits", g["commits"], "dots", g["dotChanges"])
        print("    calls", [(x["t"], x["fn"], x["args"], x["sl"]) for x in g["calls"]])
        print("    writes", g["writes"])
        print("    events", g["events"])
        print("    long", g["long"])
        if g.get("pictures"): print("    pictures", g["pictures"])
        if g.get("trace"): print("    trace", {k: v for k, v in g["trace"].items() if k != "decodes"}, "decodes", [(x["t"], x["dur"], x["name"]) for x in g["trace"]["decodes"]][:8])
