# Fix seat 2: each cell's status in one run report.  python3 summ.py <report.json>...
import json, sys
for f in sys.argv[1:]:
    try: r = json.load(open(f))
    except Exception as e: print(f, "unreadable", e); continue
    out = []
    def walk(s):
        for sp in s.get("specs", []):
            for t in sp["tests"]:
                st = t["results"][-1]["status"] if t["results"] else "none"
                out.append((sp["title"], t.get("status"), st))
        for c in s.get("suites", []): walk(c)
    for s in r["suites"]: walk(s)
    print("==", f)
    for title, status, st in out: print(f"  {st:8} {title}")
