# Critic 1: per-title status from Playwright JSON reports.
#   status.py <report>             one line per title
#   status.py <green> <red>        the two side by side, with a verdict per title
import json, sys
def load(p):
    out = {}
    def walk(s):
        for sp in s.get("specs", []):
            for t in sp["tests"]:
                st = t["results"][-1]["status"] if t["results"] else "none"
                out[sp["title"]] = st
        for c in s.get("suites", []): walk(c)
    for s in json.load(open(p))["suites"]: walk(s)
    return out
a = load(sys.argv[1])
if len(sys.argv) == 2:
    for k, v in a.items(): print(v, "|", k)
else:
    b = load(sys.argv[2]); tally = {}
    for k in a:
        g, r = a[k], b.get(k, "absent")
        verdict = {("passed", "failed"): "R/G", ("passed", "passed"): "G/G", ("failed", "failed"): "R/R", ("failed", "passed"): "G/R!", ("passed", "timedOut"): "R/G", ("timedOut", "failed"): "R/R"}.get((g, r), f"{r}/{g}")
        tally[verdict] = tally.get(verdict, 0) + 1
        print(verdict, "|", k)
    print(tally)
