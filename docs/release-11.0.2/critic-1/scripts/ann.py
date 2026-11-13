# Prints each matching test's annotations from a Playwright JSON report.
#   python3 ann.py <report.json> <title-substring>
import json, sys
d = json.load(open(sys.argv[1])); q = sys.argv[2]
def walk(s):
    for sp in s.get("specs", []):
        if q in sp["title"]:
            for t in sp["tests"]:
                r = t["results"][-1]
                a = [x.get("description") for x in t.get("annotations", []) + r.get("annotations", [])]
                print(t["projectName"], "|", sp["title"], "|", r["status"], "|", " ".join(str(x) for x in a)[:900])
    for c in s.get("suites", []): walk(c)
for s in d["suites"]: walk(s)
