# Prints a Playwright JSON report as one line per title: title | status per project.
#   python3 cells.py <report.json> [bad]
import json, sys, collections
d = json.load(open(sys.argv[1])); bad = len(sys.argv) > 2
rows = collections.OrderedDict()
def walk(s, f):
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            st = t["results"][-1]["status"] if t["results"] else "none"
            rows.setdefault((f, sp["title"]), {})[t["projectName"]] = st
    for c in s.get("suites", []): walk(c, f)
for s in d["suites"]: walk(s, s.get("file", ""))
for (f, title), v in rows.items():
    if bad and all(x in ("passed", "skipped") for x in v.values()): continue
    print(f.replace("release-", "r").replace(".spec.ts", ""), "|", title[:110], "|", " ".join(f"{k[:2]}={x}" for k, x in sorted(v.items())))
