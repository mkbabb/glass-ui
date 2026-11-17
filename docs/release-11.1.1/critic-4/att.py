# Critic 4: the attachments of the cells whose title matches a pattern, raw.
#   att.py <pattern> <report>...
import json, base64, sys, re, os
pat = re.compile(sys.argv[1])
for path in sys.argv[2:]:
    r = json.load(open(path))
    def walk(s):
        for sp in s.get("specs", []):
            if not pat.search(sp["title"]): continue
            for t in sp["tests"]:
                for i, res in enumerate(t["results"]):
                    errs = [re.sub(r"\x1b\[[0-9;]*m", "", e.get("message", "")).split("\n")[0][:200] for e in res.get("errors", [])]
                    for a in res.get("attachments", []):
                        if "body" not in a: continue
                        print(os.path.basename(path), res["status"], sp["title"][:60], a["name"], base64.b64decode(a["body"]).decode()[:1500])
                    if errs: print("   ERR", errs[0])
        for c in s.get("suites", []): walk(c)
    for s in r["suites"]: walk(s)
