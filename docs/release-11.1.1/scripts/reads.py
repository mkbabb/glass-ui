# Print one attachment kind per test from a Playwright JSON report: reads.py <report> <name> [chars]
import json, base64, sys
r = json.load(open(sys.argv[1])); name = sys.argv[2]; n = int(sys.argv[3]) if len(sys.argv) > 3 else 300
def walk(s):
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            for res in t["results"]:
                for a in res.get("attachments", []):
                    if a["name"] == name:
                        d = json.loads(base64.b64decode(a["body"]))
                        if isinstance(d, dict): d = {k: v for k, v in d.items() if k != "frames"}
                        print(t.get("projectName", ""), "|", sp["title"][:60], "|", json.dumps(d)[:n])
    for c in s.get("suites", []): walk(c)
for s in r["suites"]: walk(s)
