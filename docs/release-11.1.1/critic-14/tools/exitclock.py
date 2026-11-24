# Critic 11: the exit cells ("exit · X leaves on the exit curve"): per film, the time from the
# close's mark to the first frame below full light, to the last frame with any light, and the
# light lost in the first moving frame.   exitclock.py <report>...
import json, base64, sys, os
for path in sys.argv[1:]:
    r = json.load(open(path))
    def walk(s):
        for sp in s.get("specs", []):
            if not sp["title"].startswith("exit · "): continue
            for t in sp["tests"]:
                for res in t["results"]:
                    for a in res.get("attachments", []):
                        if "body" not in a: continue
                        try: d = json.loads(base64.b64decode(a["body"]))
                        except Exception: continue
                        def find(o, k=""):
                            if isinstance(o, dict):
                                if "frames" in o and isinstance(o["frames"], list): yield k, o
                                for kk, v in o.items(): yield from find(v, f"{k}.{kk}" if k else kk)
                        for k, o in find(d, a["name"]):
                            fr = [f for f in o["frames"] if isinstance(f, list) and len(f) >= 2]
                            if len(fr) < 3: continue
                            vals = [f[1] for f in fr]
                            if not (max(vals) <= 1.0001 and min(vals) >= -0.0001): continue
                            down = vals[-1] < vals[0]
                            if not down: continue
                            first = next((f for f in fr if f[1] < 0.999), None)
                            lit = [f for f in fr if f[1] > 0.001]
                            i = fr.index(first) if first else None
                            lost = (fr[i - 1][1] - fr[i][1]) if i else None
                            print(f"{os.path.basename(path)[:26]:26s} {sp['title'][7:47]:40s} {res['status'][:4]} {k[:14]:14s} first<1 {first and round(first[0])} ms, last lit {lit and round(lit[-1][0])} ms, first step {lost and round(lost,3)}, n {len(fr)}")
        for c in s.get("suites", []): walk(c)
    for s in r["suites"]: walk(s)
