#!/usr/bin/env python3
"""G-14's new failures by cause. Reads the tip's playwright logs (pm-g14-tip-*.log), takes each
failure block's first error lines, and sorts it under a cause:
  stadium  - the pill's computed corner is the stadium's infinite length, which Chromium
             serializes as 3.35544e+07px (or reads as 33554400 px) where the spec reads a
             length of half the cross extent;
  other    - everything else, printed with its first error line.
Usage: g14why.py <logs-dir>"""
import glob, os, re, sys, collections

logs = sys.argv[1]
HEAD = re.compile(r"^\s+\d+\) \[([^\]]+)\] › (?:tests-visual/)?(\S+?):(\d+):\d+ › (.*?)\s*$")
STADIUM = re.compile(r"3\.35544e\+07|3355\d{4}")


def blocks(path):
    t = open(path, errors="replace").read().split("\n")
    i = 0
    while i < len(t):
        m = HEAD.match(t[i])
        if not m:
            i += 1
            continue
        body = []
        j = i + 1
        while j < len(t) and not HEAD.match(t[j]) and len(body) < 60:
            body.append(t[j])
            j += 1
        yield m.group(1), m.group(2), int(m.group(3)), m.group(4), body
        i = j


def first_error(body):
    out = []
    for s in body:
        s = s.strip()
        if s.startswith(("Error:", "Expected", "Received", "- Expected", "+ Received")) or STADIUM.search(s):
            out.append(s[:170])
        if len(out) >= 3:
            break
    return " | ".join(out)


rows = collections.OrderedDict()
for f in sorted(glob.glob(os.path.join(logs, "pm-g14-tip-*.log"))):
    engine = "webkit" if "-webkit-" in f else "chromium"
    for proj, spec, line, title, body in blocks(f):
        key = (proj, spec, line, title)
        if key in rows:
            continue  # a retry's block repeats the test
        text = "\n".join(body)
        cause = "stadium" if STADIUM.search(text) else "other"
        rows[key] = (cause, first_error(body), engine)

by = collections.Counter((k[0], v[0]) for k, v in rows.items())
for proj in sorted({k[0] for k in rows}):
    print(f"{proj}: {by[(proj, 'stadium')]} failures on the stadium's corner, {by[(proj, 'other')]} other")
print()
for (proj, spec, line, title), (cause, err, eng) in rows.items():
    if cause == "other":
        print(f"[{proj}] {spec}:{line} {title[:110]}\n      {err}")
print()
spec_count = collections.Counter((k[0], k[1], v[0]) for k, v in rows.items())
for (proj, spec, cause), n in sorted(spec_count.items()):
    print(f"  {proj:22s} {spec:28s} {cause:8s} {n}")
