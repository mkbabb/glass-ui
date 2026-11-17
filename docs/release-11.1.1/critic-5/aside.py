# Critic 5: the probe's second recorder, per reopen cell: the frame cadence before the
# closing tap, between the closing tap and the reopening tap, and after it until the
# region rests; the scroll offset over the same stretches; and the writes to an
# animation's currentTime (the turn's seek): how many, when, and over how long.
#   aside.py <report>
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
                unread = sum(1 for x in res.get("attachments", []) if x["name"] == "unread")
                rows.append((sp["title"], res["status"], unread, a))
    for c in s.get("suites", []): walk(c)
for s in r["suites"]: walk(s)
med = lambda x: round(statistics.median(x)) if x else None
for title, st, unread, a in rows:
    taps = [t for k, t in a["inputs"] if k == "touchstart"]
    if len(taps) < 2: continue
    close, reopen = taps[-2], taps[-1]
    fr = a["frames"]
    coll = "Collapsible" in title
    hcol = 6 if coll else 10
    def gaps(t0, t1):
        f = [x for x in fr if t0 <= x[0] < t1]
        return [f[i + 1][0] - f[i][0] for i in range(len(f) - 1)], f
    pre, fpre = gaps(close - 600, close)
    mid, fmid = gaps(close, reopen)
    # rest: the first frame after the reopen at which the region's height stops changing for 5 frames
    after = [x for x in fr if x[0] >= reopen]
    restI = next((i for i in range(len(after) - 5) if all(after[i + k][hcol] == after[i][hcol] for k in range(1, 6))), len(after) - 1)
    post = [after[i + 1][0] - after[i][0] for i in range(restI)]
    rest = [after[i + 1][0] - after[i][0] for i in range(restI, min(len(after) - 1, restI + 30))]
    scrolls = sorted({x[1] for x in fr if close - 600 <= x[0] <= (after[restI][0] if after else reopen)})
    seeks = [t for t in a["seeks"] if t >= close - 5]
    sk = f"seeks {len(seeks)} from +{round(seeks[0] - reopen)} to +{round(seeks[-1] - reopen)} ms after the reopen tap" if seeks else "seeks 0"
    kind = "reopen" if "reopen" in title else "closed"
    stall = "STALL" if (post and max(post) > 33) else ""
    print(f"{kind:6s} {('Coll' if coll else 'Acc '):4s} {st:6s} unread={unread} tap-gap={round(reopen - close)}ms pre-med={med(pre)} pre-max={max(pre) if pre else None} mid={mid} post-med={med(post)} post-max={max(post) if post else None} rest-med={med(rest)} scrollY={scrolls[:4]} {sk} {stall}")
