# costtab.py <cost dir>: the cost A/B in pass 13's costtab layout (pass-13/D2-Bp-crit-records/sum/costtab.txt). Per row
# (throttle x seats, mode) and per build and round: over25ms/dtMax (mainTaskMsPerFrame; load at the cell). Then the frames
# over 25 ms summed over the 4x 20/40 rows, and the 4x40 lead main-thread ms per frame range per build.
import json, sys, os, glob, re
d = sys.argv[1]; R = {}
for f in sorted(glob.glob(os.path.join(d, "cost-*-chromium-r*.json"))):
    m = re.search(r"cost-(\w+)-chromium-r(\d)\.json", f); b, k = m.group(1), int(m.group(2))
    for c in json.load(open(f))["cells"]:
        if c.get("arm") != "pcost": continue
        R.setdefault((c["throttle"], c["seats"], c["mode"]), {}).setdefault(b, {})[k] = c
over = {}; lead = {}
for (t, s, mo) in sorted(R, key=lambda x: (x[2] != "expand", x[0], x[1])):
    print(f"{t}x {s} {mo}")
    for b in ("bp12", "bp13", "fv5"):
        rs = R[(t, s, mo)].get(b, {})
        print(f"  {b:5} " + " · ".join(f"r{k} {c['over25ms']}/{c['dtMax']} ({c['trace']['mainTaskMsPerFrame']}; {c['load']})" for k, c in sorted(rs.items())))
        if t == 4 and s in (20, 40): over[b] = over.get(b, 0) + sum(c["over25ms"] for c in rs.values())
        if t == 4 and s == 40 and mo == "lead": lead[b] = [c["trace"]["mainTaskMsPerFrame"] for c in rs.values()]
print("frames over 25 ms, the 4x 20/40 rows:", json.dumps(over))
print("main-thread ms per frame, 4x40 lead:", json.dumps({b: [min(v), max(v)] for b, v in lead.items()}))
loads = [c["load"] for r in R.values() for b in r.values() for c in b.values()]
print("cell loads: %.2f-%.2f" % (min(loads), max(loads)) if loads else "no cells")
