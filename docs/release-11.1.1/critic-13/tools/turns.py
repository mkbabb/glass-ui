# Critic 5: every turn film in a report (the read film, "turn", and any first film set
# aside, "unread"): its status, hole, where it turned, the frame share, and the cadence
# after the second input while the surface still moves against the cadence once it has
# come to rest (median gap, ms), so a stall that lasts exactly as long as the motion
# reads as such.   turns.py <report>...
import json, sys, base64, os, statistics
def walk(s, out):
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            for r in t["results"]:
                for a in r.get("attachments", []):
                    if a["name"] in ("turn", "unread"):
                        out.append((sp["title"], a["name"], r["status"], json.loads(base64.b64decode(a["body"]).decode())))
    for c in s.get("suites", []): walk(c, out)
for path in sys.argv[1:]:
    out = []
    for s in json.load(open(path))["suites"]: walk(s, out)
    print("==", os.path.basename(path), "films", len(out), "unread", sum(1 for o in out if o[1] == "unread"))
    for title, name, st, b in [o for o in out if isinstance(o[3], dict) and "hole" in o[3]]:
        fr = b["frames"]; ends_open = "reopen" in title
        arr = next((i for i, (t, v) in enumerate(fr) if (v > 0.95 if ends_open else v < 0.02)), len(fr) - 1)
        moving = [fr[i + 1][0] - fr[i][0] for i in range(arr)]
        rest = [fr[i + 1][0] - fr[i][0] for i in range(arr, min(len(fr) - 1, arr + 30))]
        med = lambda x: round(statistics.median(x)) if x else None
        flag = "STALL" if b["hole"] > 33.4 else ""
        print(f"  {name:6s} {st:6s} {title[10:62]:52s} hole={b['hole']:3d} atTurn={b['atTurn']:.3f} turnedAt={b['turnedAt']:.3f} share={b['share']:.3f} moving-gap-med={med(moving)} max={max(moving) if moving else None} rest-gap-med={med(rest)} {flag}")
