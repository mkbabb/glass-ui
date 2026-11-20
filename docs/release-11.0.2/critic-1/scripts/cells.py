# Prints a Playwright JSON report as one line per test: project | file | title | status.
#   python3 cells.py <report.json> [status-filter]
import json, sys
d = json.load(open(sys.argv[1])); want = sys.argv[2] if len(sys.argv) > 2 else None
def walk(s, f):
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            st = t["results"][-1]["status"] if t["results"] else "none"
            if want is None or st == want or (want == "bad" and st not in ("passed", "skipped")):
                print(t["projectName"], "|", f, "|", sp["title"], "|", st)
    for c in s.get("suites", []): walk(c, f)
for s in d["suites"]: walk(s, s.get("file", ""))
