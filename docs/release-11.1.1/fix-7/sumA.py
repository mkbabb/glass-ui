# Fix seat 7: row A's cell, summed per delay: hits, closes, when the read landed, how far
# the button stood from its rest, and each miss.
#   sumA.py <report.json>...
import base64, json, sys
from collections import defaultdict
def specs(s):
    for sp in s.get("specs", []): yield sp
    for c in s.get("suites", []): yield from specs(c)
for path in sys.argv[1:]:
    rep = json.load(open(path))
    for su in rep["suites"]:
        for sp in specs(su):
            if "rises" not in sp["title"]: continue
            for t in sp["tests"]:
                for r in t["results"]:
                    for a in r.get("attachments", []):
                        if a["name"] != "sheet" or not a.get("body"): continue
                        v = json.loads(base64.b64decode(a["body"]))
                        rise = {k: x for k, x in v["rise"].items() if k != "frames"}
                        print(path.split("/")[-1], r["status"], "rise", rise)
                        g = defaultdict(list)
                        for tp in v["taps"]: g[tp["after"]].append(tp)
                        for after, ts in g.items():
                            print(f"  +{after}: hit {sum(x['hit'] for x in ts)}/20 closed {sum(x['closed'] for x in ts)}/20"
                                  f" read at {min(x['at'] for x in ts)}-{max(x['at'] for x in ts)} ms"
                                  f" dy {min(x['dy'] for x in ts)}-{max(x['dy'] for x in ts)} px events {sorted(set(x['events'] for x in ts))}")
                            for x in ts:
                                if not (x["hit"] and x["closed"]): print("     miss", x)
