# Critic 14: one cell's attachments from a run report: every attachment's keys (frames left out)
# and its frame table, first N frames.   film.py <report> <title substring> [N]
import json, base64, sys
rep, sub = sys.argv[1], sys.argv[2]
n = int(sys.argv[3]) if len(sys.argv) > 3 else 40
def walk(s):
    for sp in s.get("specs", []):
        if sub not in sp["title"]: continue
        for t in sp["tests"]:
            for r in t["results"]:
                print(t["projectName"], sp["title"][:90], r["status"])
                for a in r.get("attachments", []):
                    if not a.get("body"): continue
                    try: d = json.loads(base64.b64decode(a["body"]))
                    except Exception: continue
                    if isinstance(d, dict):
                        print("  ", a["name"], {k: v for k, v in d.items() if k != "frames" and not isinstance(v, list)})
                        if isinstance(d.get("frames"), list): print("     frames", d["frames"][:n])
    for c in s.get("suites", []): walk(c)
for s in json.load(open(rep))["suites"]: walk(s)
