# Critic 11: row A's tap cell in the run reports given: per run, its status, the rise's height
# spread and share, and per delay the taps counted aimed, late, aimed misses, and every late
# tap's events.   rowa.py <report>...
import json, base64, sys, os
for path in sys.argv[1:]:
    r = json.load(open(path))
    def walk(s):
        for sp in s.get("specs", []):
            if "rises into place" not in sp["title"]: continue
            for t in sp["tests"]:
                for res in t["results"]:
                    for a in res.get("attachments", []):
                        if a.get("name") != "sheet" or "body" not in a: continue
                        d = json.loads(base64.b64decode(a["body"]))
                        rise, taps = d["rise"], d["taps"]
                        print(os.path.basename(path), t["projectName"], res["status"], "spread", rise["heightSpread"], "share", rise["share"], "taps", len(taps))
                        for after in (120, 190, 250, 400):
                            these = [x for x in taps if x["after"] == after]
                            aimed = [x for x in these if x["aimed"]]
                            late = [x for x in these if not x["aimed"]]
                            miss = [x for x in aimed if not x["hit"] or not x["closed"]]
                            print(f"   +{after}: aimed {len(aimed)} hit {sum(x['hit'] for x in aimed)} closed {sum(x['closed'] for x in aimed)} late {len(late)} aimed-misses {len(miss)}")
                            for x in late + miss: print("      ", "late" if not x["aimed"] else "MISS", x["at"], x["dy"], x["events"])
        for c in s.get("suites", []): walk(c)
    for s in r["suites"]: walk(s)
