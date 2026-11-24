# Critic 14: every attachment of a given name in a Playwright JSON report, one line per result:
# title, status, and the listed keys of the attachment's JSON.   attach.py <report> <name> key...
import json, base64, sys
rep, name, keys = sys.argv[1], sys.argv[2], sys.argv[3:]
def walk(s):
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            for r in t["results"]:
                for a in r.get("attachments", []):
                    if a.get("name") == name and a.get("body"):
                        d = json.loads(base64.b64decode(a["body"]))
                        print(t["projectName"], sp["title"][:70], r["status"], {k: d.get(k) for k in keys})
    for c in s.get("suites", []): walk(c)
for s in json.load(open(rep))["suites"]: walk(s)
