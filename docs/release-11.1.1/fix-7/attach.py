# Fix seat 7: every attachment of the cells whose titles match, from Playwright JSON reports.
#   attach.py <title regex> <attachment name regex> <report.json>...
# Prints one line per test result: report, status, title, then each matching attachment
# (its JSON, with the `frames` lists cut to their first 12 rows unless FULL is set).
import base64, json, os, re, sys
pat, name = re.compile(sys.argv[1]), re.compile(sys.argv[2])
def cut(v):
    if os.environ.get("FULL"): return v
    if isinstance(v, dict): return {k: (x[:12] if k == "frames" and isinstance(x, list) else cut(x)) for k, x in v.items()}
    if isinstance(v, list): return [cut(x) for x in v]
    return v
def specs(s):
    for sp in s.get("specs", []): yield sp
    for c in s.get("suites", []): yield from specs(c)
for path in sys.argv[3:]:
    rep = json.load(open(path))
    for su in rep["suites"]:
        for sp in specs(su):
            if not pat.search(sp["title"]): continue
            for t in sp["tests"]:
                for r in t["results"]:
                    out = []
                    for a in r.get("attachments", []):
                        if name.search(a["name"]) and a.get("body"):
                            try: out.append((a["name"], cut(json.loads(base64.b64decode(a["body"])))))
                            except Exception: pass
                    print(os.path.basename(path), r["status"], sp["title"], json.dumps(out))
