# Critic 3: the raw per-sample steps of every frame table in a run report (any attachment
# whose JSON carries `frames` as [ms, value] pairs): the first move, the largest, the last,
# and any move against the leg's direction.   steps.py <report> [title substring]
import json, base64, sys
r = json.load(open(sys.argv[1])); sub = sys.argv[2] if len(sys.argv) > 2 else ""
def judge(fr):
    pts = [(f[0], f[1]) for f in fr if isinstance(f, list) and len(f) >= 2 and isinstance(f[1], (int, float))]
    if len(pts) < 3: return None
    # The tables hold shares of the travel (0 to 1); a table in another unit is scaled by its range.
    hi = max(p[1] for p in pts); lo = min(p[1] for p in pts)
    if hi - lo <= 0: return None
    travel = 1 if hi <= 1.0001 and lo >= -0.0001 else hi - lo
    steps = [(pts[i+1][0], (pts[i+1][1] - pts[i][1]) / travel, pts[i+1][0] - pts[i][0]) for i in range(len(pts) - 1)]
    moving = [s for s in steps if abs(s[1]) > 1e-9]
    if not moving: return None
    down = pts[-1][1] < (hi + lo) / 2
    first, big, last = moving[0], max(moving, key=lambda s: abs(s[1])), moving[-1]
    against = [s for s in moving if (s[1] > 0.02 if down else s[1] < -0.02)]
    per60 = lambda s: abs(s[1]) * (16.667 / max(s[2], 16.667))
    # The most any 16.7 ms window carries: each sample against the first one a frame later.
    w60 = 0
    for i in range(len(pts) - 1):
        j = i + 1
        while j + 1 < len(pts) and pts[j][0] - pts[i][0] < 16.6: j += 1
        dt = max(16.667, pts[j][0] - pts[i][0])
        w60 = max(w60, abs(pts[j][1] - pts[i][1]) / travel * 16.667 / dt)
    return dict(n=len(moving), first=f"{first[1]:+.3f}/{first[2]}ms", big=f"{big[1]:+.3f}/{big[2]}ms@{big[0]}", big60=f"{max(per60(s) for s in moving):.3f}", w60=f"{w60:.3f}",
                last=f"{last[1]:+.3f}/{last[2]}ms", against=len(against), span=moving[-1][0] - (moving[0][0] - moving[0][2]))
def walk(s):
    for sp in s.get("specs", []):
        if sub not in sp["title"]: continue
        for t in sp["tests"]:
            for res in t["results"]:
                for a in res.get("attachments", []):
                    if "body" not in a: continue
                    try: d = json.loads(base64.b64decode(a["body"]))
                    except Exception: continue
                    fr = d.get("frames") if isinstance(d, dict) else None
                    if not fr: continue
                    j = judge(fr)
                    if j: print(res["status"][:4], "|", sp["title"][:70].ljust(70), "|", a["name"][:8].ljust(8), "|", " ".join(f"{k}={v}" for k, v in j.items()))
    for c in s.get("suites", []): walk(c)
for s in r["suites"]: walk(s)
