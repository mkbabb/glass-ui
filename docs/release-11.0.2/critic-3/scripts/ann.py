# Prints the annotations a passing or failing cell recorded, trimmed.
#   python3 ann.py <report.json> <title-substring> [project-prefix] [chars]
import json, sys
d = json.load(open(sys.argv[1])); sub = sys.argv[2]; pre = sys.argv[3] if len(sys.argv) > 3 else ""; n = int(sys.argv[4]) if len(sys.argv) > 4 else 500
def walk(s):
    for sp in s.get("specs", []):
        if sub in sp["title"]:
            for t in sp["tests"]:
                if not t["projectName"].startswith(pre) or not t["results"]: continue
                r = t["results"][-1]
                a = [x.get("description", "") for x in (t.get("annotations") or []) + (r.get("annotations") or []) if x.get("type") != "skip"]
                print(t["projectName"][:2], "|", sp["title"][:60], "|", r["status"], "|", " ".join(a)[:n])
    for c in s.get("suites", []): walk(c)
for s in d["suites"]: walk(s)
