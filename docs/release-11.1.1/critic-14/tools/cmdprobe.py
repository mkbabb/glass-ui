# Critic 13 (copied by critic 14): the palette probe's readings, one line per cell: status, and each attachment's JSON
# (the query and rows after the exit, and at the next open).   cmdprobe.py <report>...
import json, sys, re, base64
for path in sys.argv[1:]:
    r = json.load(open(path))
    def walk(s):
        for sp in s.get("specs", []):
            for t in sp["tests"]:
                for res in t["results"]:
                    print(path.split("/")[-1], "|", sp["title"][:60], "|", res["status"])
                    for a in res.get("attachments", []):
                        body = a.get("body")
                        if body:
                            try: body = base64.b64decode(body).decode()
                            except Exception: pass
                            print("    ", a["name"], body[:400])
        for c in s.get("suites", []): walk(c)
    for s in r["suites"]: walk(s)
