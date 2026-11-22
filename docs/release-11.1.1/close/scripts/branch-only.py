# The 11.1.1 close: a project's branch-only titles (failing here, not in the 11.1.0 close's failing
# set), from the suite reports given, less any title a later report reads as passing (a rerun on
# the full tree of a title that failed only for the worktree's sparse checkout).
#   python3 -I branch-only.py <11.1.0 set> <report>... [--minus-pass <report>...]
import json, sys
args = sys.argv[1:]
base = {l.rstrip("\n") for l in open(args[0]) if l.strip()}
rest = args[1:]
cut = rest.index("--minus-pass") if "--minus-pass" in rest else len(rest)
reports, minus = rest[:cut], rest[cut + 1:]
def rows(path):
    out = []
    def walk(s, p):
        for c in s.get("suites", []) or []:
            walk(c, p + ([c["title"]] if c.get("title") and not c["title"].endswith(".ts") else []))
        for sp in s.get("specs", []) or []:
            for t in sp.get("tests", []):
                out.append((sp.get("file", ""), " > ".join(p + [sp["title"]]), t.get("status", "")))
    for s in json.load(open(path)).get("suites", []):
        walk(s, [])
    return out
failing = {f"{f}\t{t}" for r in reports for f, t, st in rows(r) if st in ("unexpected", "flaky")}
passing = {f"{f}\t{t}" for r in minus for f, t, st in rows(r) if st == "expected"}
for line in sorted((failing - passing) - base):
    print(line)
