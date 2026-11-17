# Fix seat 6: in each disclosure cell of a probe report, the frame cadence while the page
# is idle (before the first tap, and in the rests between taps once the region has
# stopped) against the cadence while the region moves.
#   idle.py <report>
import json, base64, sys, statistics
r = json.load(open(sys.argv[1]))
def walk(s, out):
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            for i, res in enumerate(t["results"]):
                att = {a["name"]: a for a in res.get("attachments", []) if "body" in a}
                if "aside" in att:
                    out.append((sp["title"], t.get("repeatEachIndex", "?"), res["status"], json.loads(base64.b64decode(att["aside"]["body"]))))
    for c in s.get("suites", []): walk(c, out)
rows = []
for s in r["suites"]: walk(s, rows)
for title, rep, st, a in rows:
    coll = "Collapsible" in title
    hcol = 6 if coll else 10
    fr = a["frames"]
    idle, moving = [], []
    for j in range(1, len(fr)):
        g = fr[j][0] - fr[j - 1][0]
        (moving if fr[j][hcol] != fr[j - 1][hcol] else idle).append(g)
    taps = [t for k, t in a["inputs"] if k == "touchstart"]
    pre = [fr[j][0] - fr[j - 1][0] for j in range(1, len(fr)) if taps and fr[j][0] < taps[0]]
    q = lambda x: f"{statistics.median(x):.0f}/{max(x)}" if x else "-"
    print(f"{('reopen' if 'reopen' in title else 'closed'):6s} {('Coll' if coll else 'Acc '):4s} rep{rep} {st:6s} frames={len(fr)} pre-first-tap={q(pre)} (n={len(pre)}) idle={q(idle)} moving={q(moving)}")
