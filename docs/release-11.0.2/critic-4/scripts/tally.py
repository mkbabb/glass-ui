# Prints, per spec file and project, the count of tests by final status.
#   python3 tally.py <report.json>...
import json, sys, collections
for f in sys.argv[1:]:
    d = json.load(open(f)); c = collections.Counter()
    def walk(s, file):
        for sp in s.get("specs", []):
            for t in sp["tests"]:
                st = t["results"][-1]["status"] if t["results"] else "none"
                c[(file, t["projectName"], st)] += 1
        for x in s.get("suites", []): walk(x, file)
    for s in d["suites"]: walk(s, s.get("file", ""))
    print(f)
    for (file, proj, st), n in sorted(c.items()): print(f"   {file:44s} {proj:24s} {st:8s} {n}")
