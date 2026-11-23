"""Fix seat 13: each test of a Playwright JSON report, its status, and its first error line.
   python3 -I summary.py <report.json>..."""
import json, re, sys

def walk(suite, path=()):
    for s in suite.get("suites", []):
        yield from walk(s, path + (s["title"],))
    for spec in suite.get("specs", []):
        for t in spec["tests"]:
            for r in t["results"]:
                yield spec["title"], r

for f in sys.argv[1:]:
    print(f"== {f.rsplit('/', 1)[-1]}")
    rep = json.load(open(f))
    for s in rep["suites"]:
        for title, r in walk(s):
            err = ""
            if r.get("errors"):
                msg = re.sub(r"\x1b\[[0-9;]*m", "", r["errors"][0].get("message", ""))
                err = msg.splitlines()[0][:150]
            print(f"  {r['status']:8} {title[:95]:95} {err}")
