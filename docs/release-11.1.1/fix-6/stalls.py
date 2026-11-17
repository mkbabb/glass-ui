# Fix seat 6: how many turn films in a report hold a hole of more than two frames, by
# cell kind (reopened while it closes, closed while it opens), and how many cells failed.
#   stalls.py <report>
import json, base64, sys
r = json.load(open(sys.argv[1]))
n = {}
def walk(s):
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            for res in t["results"]:
                kind = "reopen" if "reopened" in sp["title"] else "closed"
                films = [json.loads(base64.b64decode(a["body"])) for a in res.get("attachments", []) if "body" in a and a["name"] in ("unread", "turn")]
                c = n.setdefault(kind, [0, 0, 0, 0])
                c[0] += len(films); c[1] += sum(f["hole"] > 1000 / 30 for f in films)
                c[2] += 1; c[3] += res["status"] != "passed"
    for c in s.get("suites", []): walk(c)
for s in r["suites"]: walk(s)
print(" ".join(f"{k}: {v[1]}/{v[0]} films holed, {v[3]}/{v[2]} cells failed;" for k, v in sorted(n.items())))
