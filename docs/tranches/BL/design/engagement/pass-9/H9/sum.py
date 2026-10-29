#!/usr/bin/env python3
# H9: one line per new cell per build log: status and the cell's figure (for H9.md §3). Usage: sum.py <log> ...
import re, sys
pats = [
    (r"clip feather · (\w+)", r"ratio of ratios ([\d.]+)"),
    (r"anc (\w+) · (\w+)", r"(?:hit (NOT the slider))?.*?(?:ratio of ratios ([\d.]+)|engaged over released ×([\d.]+))"),
    (r"trail · ([\w-]+) · engaged", r"engaged: (.*?) · bound ≤ .*?= ([\d.]+) px; (\d+) of (\d+)"),
    (r"glidescale · (\w+)", r"moved ([\d.]+) px in the insertion's frame"),
    (r"dlg · (\w+)", r"largest one-frame step ([\d.]+)(?: at \+\d+ ms)? against the plate's own ([\d.]+)"),
    (r"loupe place · (\w+) · (\w+)", r"= ×([\d.]+) .*?Δ against untransformed ([-\d.]+) px.*?\(Δ ([-\d.]+) px"),
    (r"loupe viewport · (\w+)", r"(\d+) of (\d+) lens rows painted \(([\d.]+) %"),
    (r"loupe whole · (\w+) · (\w+)", r"(\d+) of (\d+) lens rows painted"),
]
for path in sys.argv[1:]:
    print(f"== {path.split('/')[-1]}")
    for line in open(path, encoding="utf-8"):
        m0 = re.match(r"\s+(PASS|FAIL|REPORT|UNMEASURED)\s+E-1[03] (\S+) (.*)", line)
        if not m0: continue
        st, sc, rest = m0.groups()
        for name, fig in pats:
            n = re.match(name, rest)
            if not n: continue
            if name.startswith("anc"):
                rr = re.search(r"ratio of ratios ([\d.]+)", rest); k = re.search(r"released ×([\d.]+)", rest)
                print(f"  {st:10} {n.group(0):34} {'rr ' + rr.group(1) if rr else 'k ' + (k.group(1) if k else '-')}{' NOT DRIVEN' if 'NOT DRIVEN' in rest else ''}{' MISSED' if 'NOT the slider' in rest else ''}")
            elif "trail" in name:
                f = re.search(r"worst ([\d.]+) px off", rest)
                worst = re.findall(r"worst ([\d.]+) px off", rest.split(" · bound")[0])
                b = re.search(r"= ([\d.]+) px; (\d+) of (\d+)", rest)
                print(f"  {st:10} {n.group(0):34} worst per engaged film {','.join(worst)} px; bound {b.group(1) if b else '?'}; over {b.group(2) if b else '?'}/{b.group(3) if b else '?'}{' NOT DRIVEN' if 'NOT DRIVEN' in rest else ''}")
            else:
                g = re.search(fig, rest)
                print(f"  {st:10} {n.group(0):34} {' '.join(x for x in (g.groups() if g else ()) if x) if g else '-'}{' NOT DRIVEN' if 'NOT DRIVEN' in rest else ''}")
            break
