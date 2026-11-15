# Prints each test of a Playwright JSON report: project, title, status, first annotation, error head.
import json, sys
d = json.load(open(sys.argv[1]))
def walk(s):
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            for r in t["results"]:
                ann = [a.get("description") for a in t.get("annotations", []) + r.get("annotations", [])][:1]
                err = (r.get("error") or {}).get("message", "")[:160].replace("\n", " ")
                print(t["projectName"][:14], "|", sp["title"][-70:], "|", r["status"], "|", ann, "|", err)
    for c in s.get("suites", []): walk(c)
for s in d["suites"]: walk(s)
