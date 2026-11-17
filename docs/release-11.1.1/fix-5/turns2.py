import json, sys, base64
# Fix seat 5: the reads behind fix-5.md.
# turns2.py <report.json>...: every turn and unread attachment, in run order
def walk(s, out):
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            for r in t["results"]:
                atts = []
                for a in r.get("attachments", []):
                    if a["name"] in ("turn", "unread"):
                        body = a.get("body")
                        if body: body = json.loads(base64.b64decode(body).decode())
                        atts.append((a["name"], body))
                out.append((r.get("startTime", ""), sp["title"], t.get("projectName"), r["status"], atts))
    for c in s.get("suites", []): walk(c, out)
for path in sys.argv[1:]:
    out = []
    d = json.load(open(path))
    for s in d["suites"]: walk(s, out)
    out.sort()
    print("==", path.split("/")[-1])
    for st, title, proj, status, atts in out:
        if not atts: continue
        desc = " | ".join(f"{n} atTurn {b['atTurn']} turnedAt {b['turnedAt']} share {b['share']} end {b['end']} hole {b.get('hole')}" for n, b in atts)
        print(f"{status:7} {title[10:62]:52} {desc}")
