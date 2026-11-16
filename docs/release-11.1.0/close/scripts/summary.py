# 10.1.5 release close: visual-suite title sets from Playwright JSON reports.
#   python3 -I docs/release-10.1.5/scripts/close-summary.py fails <report.json>...   -> TSV of non-passing titles
#   python3 -I docs/release-10.1.5/scripts/close-summary.py files  <report.json>...   -> spec files with a failure
#   python3 -I docs/release-10.1.5/scripts/close-summary.py all    <report.json>...   -> TSV of every title + status
# A title is (project, spec file, describe path > test title). "Non-passing" is Playwright's
# test status `unexpected` (failed, timed out, interrupted) or `flaky`; `skipped` is not a failure.
import json
import sys


def walk(suite, path, out):
    for s in suite.get("suites", []) or []:
        walk(s, path + ([s["title"]] if s.get("title") and not s["title"].endswith(".ts") else []), out)
    for spec in suite.get("specs", []) or []:
        for t in spec.get("tests", []):
            title = " > ".join(path + [spec["title"]])
            out.append((t.get("projectName", ""), spec.get("file", ""), title, t.get("status", "")))


def rows(paths):
    out = []
    for p in paths:
        d = json.load(open(p))
        for s in d.get("suites", []):
            walk(s, [], out)
    return out


mode, paths = sys.argv[1], sys.argv[2:]
r = rows(paths)
if mode == "fails":
    for proj, f, title, st in sorted(set(x for x in r if x[3] in ("unexpected", "flaky"))):
        print(f"{proj}\t{f}\t{title}\t{st}")
elif mode == "files":
    for f in sorted(set(x[1] for x in r if x[3] in ("unexpected", "flaky"))):
        print(f)
else:
    for proj, f, title, st in sorted(set(r)):
        print(f"{proj}\t{f}\t{title}\t{st}")
