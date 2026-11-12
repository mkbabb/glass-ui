#!/usr/bin/env python3
"""10.1.5 critic-close-1: per-title pass/fail counts of Playwright JSON reports, with the
distinct failure messages. usage: critic-close-1-summary.py <report.json>..."""
import json, re, sys, collections

def walk(suite, out):
    for spec in suite.get("specs", []):
        for t in spec.get("tests", []):
            for r in t.get("results", []):
                msgs = [re.sub(r"\x1b\[[0-9;]*m", "", e.get("message", "")).split("\n")[0] for e in r.get("errors", [])]
                out[spec["title"]].append((r.get("status"), msgs))
    for s in suite.get("suites", []):
        walk(s, out)

for path in sys.argv[1:]:
    out = collections.defaultdict(list)
    for s in json.load(open(path)).get("suites", []):
        walk(s, out)
    tot = collections.Counter(st for rs in out.values() for st, _ in rs)
    print(f"== {path.split('/')[-1]}: {dict(tot)} over {len(out)} titles")
    for title, rs in out.items():
        bad = [r for r in rs if r[0] not in ("passed", "skipped")]
        if not bad:
            continue
        msgs = collections.Counter(m for _, ms in bad for m in ms)
        print(f"  {len(bad)}/{len(rs)} FAILED  {title}")
        for m, n in msgs.most_common(4):
            print(f"      x{n} {m[:230]}")
