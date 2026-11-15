# Prints each failed test of a Playwright JSON report with the first lines of its error.
#   python3 why.py <report.json> [project-prefix]
import json, re, sys
d = json.load(open(sys.argv[1])); pre = sys.argv[2] if len(sys.argv) > 2 else ""
ansi = re.compile(r"\x1b\[[0-9;]*m")
def walk(s):
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            if not t["projectName"].startswith(pre) or not t["results"]: continue
            r = t["results"][-1]
            if r["status"] in ("passed", "skipped"): continue
            m = ansi.sub("", (r.get("error") or {}).get("message", "")).strip().splitlines()
            m = [x.strip() for x in m if x.strip()][:5]
            print(t["projectName"][:2], "|", sp["title"][:70], "|", r["status"], "|", " / ".join(m)[:330])
    for c in s.get("suites", []): walk(c)
for s in d["suites"]: walk(s)
