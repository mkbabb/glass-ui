# Critic 10: the matrix (logs/matrix.txt) summed by cell family (the word before " · ") and
# project: how many titles of each family read RED on v11.1.0 and GREEN on the tip (R/G), green
# on both (G/G) or skipped on both (-/-).   families.py
import os, collections
L = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "logs")
P = ["Chromium 390", "Chromium 1440", "WebKit 390", "WebKit 1440"]
by = collections.defaultdict(collections.Counter)
for line in open(f"{L}/matrix.txt"):
    if "|" not in line: continue
    cells, title = line.split("|", 1)
    fam = title.strip().split(" · ")[0]
    for p, c in zip(P, cells.split()): by[fam][(p, c)] += 1
for fam, c in by.items():
    print(fam.ljust(9), " | ".join(f"{p}: " + ", ".join(f"{k[1]} {v}" for k, v in sorted(c.items()) if k[0] == p) for p in P))
