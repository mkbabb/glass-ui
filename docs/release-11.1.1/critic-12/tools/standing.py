# Critic 6: every standing cell's share in the run reports given, one line per reading,
# for the cells whose title matches the pattern.   standing.py <pattern> <report>...
import json, base64, sys, re
pat = re.compile(sys.argv[1])
for f in sys.argv[2:]:
    try: d = json.load(open(f))
    except Exception: continue
    if not isinstance(d, dict): continue
    def walk(s):
        for sp in s.get("specs", []):
            if not pat.search(sp["title"]): continue
            for t in sp["tests"]:
                for r in t["results"]:
                    for a in r.get("attachments", []):
                        if "body" not in a: continue
                        try: j = json.loads(base64.b64decode(a["body"]))
                        except Exception: continue
                        if isinstance(j, dict) and "share" in j:
                            print(f.split("release-11.1.1/")[-1][:48].ljust(48), t.get("projectName", "")[:16].ljust(16), sp["title"][:60].ljust(60), r["status"][:4], j["share"], j.get("travelShare"))
        for c in s.get("suites", []): walk(c)
    for s in d.get("suites", []): walk(s)
