# Critic 1: for every frame table in a report, the raw per-sample steps: the first move,
# the largest, the last value still seen before gone, and any move against the direction.
#   steps.py <report> [title substring]
import json, base64, sys
r = json.load(open(sys.argv[1])); sub = sys.argv[2] if len(sys.argv) > 2 else ""
NAMES = {"exit", "routes", "standing", "turn", "enter", "leave", "handover"}
def judge(fr):
    pts = [(f[0], f[1]) for f in fr if isinstance(f, list) and len(f) >= 2 and f[1] is not None]
    if len(pts) < 3: return None
    v0 = pts[0][1]; vend = pts[-1][1]
    down = vend < v0
    steps = [(pts[i+1][0], pts[i+1][1] - pts[i][1], pts[i+1][0] - pts[i][0]) for i in range(len(pts) - 1)]
    moving = [s for s in steps if abs(s[1]) > 1e-9]
    if not moving: return None
    first = moving[0]; big = max(moving, key=lambda s: abs(s[1])); last = moving[-1]
    against = [s for s in moving if (s[1] > 0.02 if down else s[1] < -0.02)]
    # A stall: a sample gap of more than three frames while the value is mid-way.
    stalls = [s for s in steps if s[2] > 50 and 0.02 < (pts[[p[0] for p in pts].index(s[0])][1]) < 0.98]
    return dict(n=len(moving), first=f"{first[1]:+.3f}@{first[0]}ms/{first[2]}ms", big=f"{big[1]:+.3f}@{big[0]}ms/{big[2]}ms",
                last=f"{last[1]:+.3f}@{last[0]}ms/{last[2]}ms", against=len(against), span=moving[-1][0] - (moving[0][0] - moving[0][2]))
def walk(s):
    for sp in s.get("specs", []):
        if sub not in sp["title"]: continue
        for t in sp["tests"]:
            for res in t["results"]:
                for a in res.get("attachments", []):
                    if a["name"] in NAMES and "body" in a:
                        d = json.loads(base64.b64decode(a["body"]))
                        fr = d.get("frames") if isinstance(d, dict) else None
                        if not fr: continue
                        j = judge(fr)
                        if j: print(res["status"][:4], "|", sp["title"][:62].ljust(62), "|", " ".join(f"{k}={v}" for k, v in j.items()))
    for c in s.get("suites", []): walk(c)
for s in r["suites"]: walk(s)
