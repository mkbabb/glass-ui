# Fix seat 6: every tap in every disclosure cell of a probe report, with the frame
# cadence while the region moves after it: which taps the stall follows.
#   taps.py <report>
import json, base64, sys, statistics
r = json.load(open(sys.argv[1]))
rows = []
def walk(s):
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            for res in t["results"]:
                att = {a["name"]: a for a in res.get("attachments", []) if "body" in a}
                if "aside" not in att: continue
                a = json.loads(base64.b64decode(att["aside"]["body"]))
                rows.append((sp["title"], res["status"], a))
    for c in s.get("suites", []): walk(c)
for s in r["suites"]: walk(s)
summary = {}
for title, st, a in rows:
    coll = "Collapsible" in title
    hcol = 6 if coll else 10
    fr = a["frames"]
    taps = [t for k, t in a["inputs"] if k == "touchstart"]
    out = []
    for i, tap in enumerate(taps):
        nxt = taps[i + 1] if i + 1 < len(taps) else tap + 1200
        f = [x for x in fr if tap <= x[0] < min(nxt, tap + 600)]
        before = [x for x in fr if x[0] < tap]
        h0 = before[-1][hcol] if before else None
        moving = []
        for j in range(1, len(f)):
            if f[j][hcol] != f[j - 1][hcol]:
                moving.append(f[j][0] - f[j - 1][0])
        h1 = f[-1][hcol] if f else None
        mx = max(moving) if moving else 0
        md = statistics.median(moving) if moving else 0
        kind = "open" if (h0 is not None and h0 <= 0) else ("close" if h1 is not None and h0 is not None and h1 < h0 else "?")
        out.append(f"{kind}:{h0}->{h1} med{md:.0f}/max{mx}{'*' if mx > 33 else ''}")
        key = (("reopen" if "reopen" in title else "closed"), i, kind)
        summary.setdefault(key, [0, 0])
        summary[key][0] += 1
        summary[key][1] += mx > 33
    print(f"{('reopen' if 'reopen' in title else 'closed'):6s} {('Coll' if coll else 'Acc '):4s} {st:6s} " + " | ".join(out))
print("\nper tap index: cell, tap, kind -> stalled / taps")
for k in sorted(summary): print(k, f"{summary[k][1]} / {summary[k][0]}")
