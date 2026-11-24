# Critic 10: a detented Sheet's close, read from the routes cells' films (`routes.after`):
# the time from the close's mark to the frame where under 1 % of its resting height still
# shows, and to the frame its top edge reaches the foot, with the frame it unmounts.
#   detent_close.py <report>...
import json, base64, sys, os
for path in sys.argv[1:]:
    r = json.load(open(path))
    def walk(s):
        for sp in s.get("specs", []):
            if "detented Sheet leaves whole" not in sp["title"]: continue
            for t in sp["tests"]:
                for res in t["results"]:
                    for a in res.get("attachments", []):
                        if a.get("name") != "routes" or "body" not in a: continue
                        d = json.loads(base64.b64decode(a["body"]))
                        rest = d["rest"]; fr = d["after"]
                        foot = rest["y"] + rest["h"]
                        t0 = fr[0]["t"]
                        shown = lambda f: max(0, foot - f["y"]) if f["present"] else 0
                        under1 = next((f["t"] - t0 for f in fr if shown(f) < 0.01 * rest["h"]), None)
                        atfoot = next((f["t"] - t0 for f in fr if f["present"] and f["y"] >= foot - 0.5), None)
                        gone = next((f["t"] - t0 for f in fr if not f["present"]), None)
                        print(f"{os.path.basename(path)[:28]:28s} {sp['title'][-30:]:30s} {res['status'][:4]} rest y{rest['y']} h{rest['h']} under1% {under1 and round(under1)} ms, at foot {atfoot and round(atfoot)} ms, unmounted {gone and round(gone)} ms")
        for c in s.get("suites", []): walk(c)
    for s in r["suites"]: walk(s)
