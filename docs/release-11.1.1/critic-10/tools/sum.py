# Critic 3: per run report, the tally of cells and the extremes of every frame table (any
# attachment whose JSON carries `frames` as [ms, value] pairs, in shares of the travel):
# the most one 16.7 ms window carries, the largest first and last moving samples, the
# longest hole between two samples of a moving table, and every cell with a sample against
# its leg's direction outside the turn cells.   sum.py <report>...
import json, base64, sys, os

def judge(fr):
    pts = [(f[0], f[1]) for f in fr if isinstance(f, list) and len(f) >= 2 and isinstance(f[1], (int, float))]
    if len(pts) < 3: return None
    hi = max(p[1] for p in pts); lo = min(p[1] for p in pts)
    if hi - lo <= 0: return None
    travel = 1 if hi <= 1.0001 and lo >= -0.0001 else hi - lo
    steps = [(pts[i + 1][0], (pts[i + 1][1] - pts[i][1]) / travel, pts[i + 1][0] - pts[i][0]) for i in range(len(pts) - 1)]
    moving = [s for s in steps if abs(s[1]) > 1e-9]
    if not moving: return None
    down = pts[-1][1] < (hi + lo) / 2
    against = [s for s in moving if (s[1] > 0.02 if down else s[1] < -0.02)]
    w60 = 0
    for i in range(len(pts) - 1):
        j = i + 1
        while j + 1 < len(pts) and pts[j][0] - pts[i][0] < 16.6: j += 1
        dt = max(16.667, pts[j][0] - pts[i][0])
        w60 = max(w60, abs(pts[j][1] - pts[i][1]) / travel * 16.667 / dt)
    return dict(w60=w60, first=abs(moving[0][1]), firstdt=moving[0][2], last=abs(moving[-1][1]), lastdt=moving[-1][2],
                hole=max(s[2] for s in moving), against=len(against), n=len(moving))

for path in sys.argv[1:]:
    r = json.load(open(path))
    tally = {}; rows = []
    def walk(s):
        for sp in s.get("specs", []):
            for t in sp["tests"]:
                res = t["results"][-1] if t["results"] else None
                st = res["status"] if res else "none"
                tally[st] = tally.get(st, 0) + 1
                if st == "failed": print("   FAILED:", sp["title"])
                for a in (res or {}).get("attachments", []):
                    if "body" not in a: continue
                    try: d = json.loads(base64.b64decode(a["body"]))
                    except Exception: continue
                    fr = d.get("frames") if isinstance(d, dict) else None
                    j = judge(fr) if fr else None
                    if j: rows.append((sp["title"], j))
        for c in s.get("suites", []): walk(c)
    for s in r["suites"]: walk(s)
    name = os.path.basename(path).replace(".json", "")
    if not rows:
        print(name, tally, "no frame tables"); continue
    top = lambda k: max(rows, key=lambda x: x[1][k])
    plain = [x for x in rows if not any(w in x[0] for w in ("turns from", "reopens it", "handed"))]
    ag = [x[0][:60] for x in plain if x[1]["against"]]
    w, f, l, h = top("w60"), top("first"), top("last"), top("hole")
    print(f"{name} {tally} tables={len(rows)}")
    print(f"   most in one 16.7 ms window {w[1]['w60']:.3f} ({w[0][:50]})")
    print(f"   largest first sample {f[1]['first']:.3f}/{f[1]['firstdt']}ms ({f[0][:50]})")
    print(f"   largest last sample {l[1]['last']:.3f}/{l[1]['lastdt']}ms ({l[0][:50]})")
    print(f"   longest hole {h[1]['hole']}ms ({h[0][:50]}); against direction outside turns: {ag if ag else 'none'}")
