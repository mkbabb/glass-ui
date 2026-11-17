# Fix seat 3: each cell's verdict and its attached reading, from a Playwright JSON report.
#   python3 att.py <report.json> [...]
import base64, json, sys
def walk(s, out):
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            for r in t["results"]:
                body = [base64.b64decode(a["body"]).decode() for a in r.get("attachments", []) if a.get("body")]
                err = (r.get("errors") or [{}])[0].get("message", "").split("\n")[0][:240]
                out.append((t["projectName"], sp["title"], t.get("status"), r["status"], body, err))
    for c in s.get("suites", []): walk(c, out)
for path in sys.argv[1:]:
    out = []
    for s in json.load(open(path))["suites"]: walk(s, out)
    print("==", path.split("/")[-1])
    for p, title, status, rs, body, err in out:
        print(f"  {rs:8} {p:17} {title}")
        for b in body: print("           ", b[:900])
        if err and rs != "passed": print("           ERR", err)
