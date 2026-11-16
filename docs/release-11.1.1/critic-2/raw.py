# Critic 2: print one cell's attachment bodies.   raw.py <report> <title substring> [max chars]
import json, base64, sys
r = json.load(open(sys.argv[1])); sub = sys.argv[2]; n = int(sys.argv[3]) if len(sys.argv) > 3 else 1500
def walk(s):
    for sp in s.get("specs", []):
        if sub in sp["title"]:
            for t in sp["tests"]:
                for res in t["results"]:
                    print("##", res["status"], sp["title"])
                    for e in res.get("errors", [])[:1]: print("   ERR", e.get("message", "")[:n])
                    for a in res.get("attachments", []):
                        if "body" in a: print("  ", a["name"], base64.b64decode(a["body"]).decode()[:n])
    for c in s.get("suites", []): walk(c)
for s in r["suites"]: walk(s)
