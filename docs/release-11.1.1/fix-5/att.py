import json, sys, base64
# att.py <report.json> <attachment name>: print each result's status and the named attachment
def walk(s, out):
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            for r in t["results"]:
                for a in r.get("attachments", []):
                    if a["name"] == sys.argv[2]:
                        body = a.get("body")
                        if body: body = base64.b64decode(body).decode()
                        out.append((sp["title"], t.get("projectName"), r["status"], body))
    for c in s.get("suites", []): walk(c, out)
out = []
d = json.load(open(sys.argv[1]))
for s in d["suites"]: walk(s, out)
for title, proj, st, body in out:
    print(st, proj, title[:70]); print("  ", body[:3000])
