#!/usr/bin/env python3
# Fix seat 14: each JSON report in logs/ as "report · cell: statuses", with the first line of
# each failing reading's error.
import json, pathlib, sys

logs = pathlib.Path(__file__).resolve().parent.parent / "logs"
names = sys.argv[1:] or sorted(p.stem for p in logs.glob("*-*-*.json"))
for name in names:
    report = json.loads((logs / f"{name}.json").read_text())
    cells = {}
    def walk(suite):
        for spec in suite.get("specs", []):
            for t in spec["tests"]:
                for r in t["results"]:
                    err = (r.get("error") or {}).get("message", "").strip().splitlines()
                    cells.setdefault(spec["title"], []).append((r["status"] if t["status"] != "skipped" else "skipped", err[0][:160] if err else ""))
        for s in suite.get("suites", []):
            walk(s)
    for s in report["suites"]:
        walk(s)
    for title, rs in cells.items():
        st = " ".join(s for s, _ in rs)
        errs = sorted({e for _, e in rs if e})
        print(f"{name} · {title.split(' · ')[0]}: {st}" + (f"  [{'; '.join(errs)}]" if errs else ""))
