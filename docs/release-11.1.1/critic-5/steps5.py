# Critic 5: the largest change between two CONSECUTIVE samples of every frame table in a
# report, as a share of the table's travel, unscaled (the gate's own read pairs a sample
# with the first one at least 16.7 ms later and scales the change to one frame, which
# shrinks a step that lands between two samples less than a frame apart). One line per
# table whose largest consecutive step exceeds a fifth.   steps5.py <report>...
import json, base64, sys, os
def tables(d, name=""):
    if isinstance(d, list) and len(d) >= 3 and all(isinstance(x, list) and len(x) >= 2 and isinstance(x[0], (int, float)) and isinstance(x[1], (int, float)) for x in d):
        yield name, [(x[0], x[1]) for x in d]
    elif isinstance(d, dict):
        for k, v in d.items(): yield from tables(v, f"{name}.{k}" if name else k)
for path in sys.argv[1:]:
    r = json.load(open(path)); n = 0; over = []
    def walk(s):
        global n
        for sp in s.get("specs", []):
            for t in sp["tests"]:
                for res in t["results"]:
                    for a in res.get("attachments", []):
                        if "body" not in a: continue
                        try: d = json.loads(base64.b64decode(a["body"]))
                        except Exception: continue
                        for name, pts in tables(d, a["name"]):
                            vals = [p[1] for p in pts]; hi, lo = max(vals), min(vals)
                            if hi - lo <= 0: continue
                            travel = 1 if hi <= 1.0001 and lo >= -0.0001 else hi - lo
                            n += 1
                            best = max(((abs(pts[i + 1][1] - pts[i][1]) / travel, pts[i + 1][0] - pts[i][0], i) for i in range(len(pts) - 1)))
                            if best[0] > 0.2: over.append((sp["title"][:70], name[:30], res["status"], round(best[0], 3), round(best[1], 1), pts[max(0, best[2] - 1):best[2] + 3]))
        for c in s.get("suites", []): walk(c)
    for s in r["suites"]: walk(s)
    print("==", os.path.basename(path), "tables", n, "with a consecutive step over a fifth:", len(over))
    for o in over: print("   ", o)

# Films kept as frame objects: the opacity seen (0 once unmounted) after the first frame
# whose opacity departs from its start, consecutive steps unscaled.
def films(d, name=""):
    if isinstance(d, list) and d and isinstance(d[0], dict) and "t" in d[0] and any("op" in f for f in d):
        yield name, d
    elif isinstance(d, dict):
        for k, v in d.items(): yield from films(v, f"{name}.{k}" if name else k)
print("== frame-object films")
for path in sys.argv[1:]:
    r = json.load(open(path)); worst = []
    def walk2(s):
        for sp in s.get("specs", []):
            for t in sp["tests"]:
                for res in t["results"]:
                    for a in res.get("attachments", []):
                        if "body" not in a: continue
                        try: d = json.loads(base64.b64decode(a["body"]))
                        except Exception: continue
                        for name, fr in films(d, a["name"]):
                            op = [(f["t"], (f.get("op") or 0) if f.get("present", True) else 0) for f in fr]
                            if len(op) < 3 or max(v for _, v in op) - min(v for _, v in op) < 0.5: continue
                            st = max(((abs(op[i + 1][1] - op[i][1]), op[i + 1][0] - op[i][0], i) for i in range(len(op) - 1)))
                            worst.append((round(st[0], 3), round(st[1], 1), sp["title"][:60], name[:20], [(round(a_, 1), round(b_, 3)) for a_, b_ in op[max(0, st[2] - 1):st[2] + 3]]))
        for c in s.get("suites", []): walk2(c)
    for s in r["suites"]: walk2(s)
    worst.sort(reverse=True)
    print(" ", os.path.basename(path), "films", len(worst), "largest consecutive opacity steps:", worst[:2])
