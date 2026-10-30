#!/usr/bin/env python3
# P-E9 summariser: the H9 family's figures per log (E-10's new cells, E-13's loupe cells), one line per cell.
#   sum.py <log>...
import re, sys
pat = [
 (r"E-10 clipstale clip feather · (\w+)", r"ratio of ratios ([\d.]+)"),
 (r"E-10 clipstale anc (\w+) · (\w+)", r"ratio of ratios ([\d.]+)"),
 (r"E-10 clipstale trail · ([\w-]+) · engaged", r"worst (\d+) px off"),
 (r"E-10 clipstale glidescale · (\w+)", r"moved ([\d.]+) px in the insertion"),
 (r"E-10 presented dlg · (\w+)", r"step ([\d.]+) at \S+ ms against the plate's own ([\d.]+)"),
 (r"E-13 \w+ loupe place · (\w+) · (\w+)", r"= ×([\d.]+) \(k max.*?its bottom ([-\d.]+) px"),
 (r"E-13 \w+ loupe viewport · (\w+)", r"(\d+) of (\d+) lens rows painted"),
 (r"E-13 \w+ loupe whole · (\w+) · (\w+)", r"(\d+) of (\d+) lens rows painted"),
 (r"E-13 slider loupe k max (\w+ \w+)", r"= ×([\d.]+)"),
]
for f in sys.argv[1:]:
    print(f"## {f}")
    for L in open(f, errors="replace"):
        m0 = re.match(r"\s+(PASS|FAIL|REPORT)\s+(.*)", L)
        if not m0: continue
        v, body = m0.groups()
        for c, val in pat:
            mc = re.match(c, body)
            if mc:
                vals = re.findall(val, body)
                ld = re.search(r"load ([\d./]+)\s*$", body)
                print(f"{v:6} {' '.join(mc.groups()):28} {vals} load {ld.group(1) if ld else '?'}")
                break
