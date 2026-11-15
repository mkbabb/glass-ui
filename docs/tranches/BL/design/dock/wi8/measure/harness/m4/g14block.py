# g14block.py <log> <file:line> [n]: print the first failure block at that site
import re, sys
log, site = sys.argv[1], sys.argv[2]; n = int(sys.argv[3]) if len(sys.argv) > 3 else 30
L = open(log, encoding="utf-8").read().split("\n")
H = re.compile(r"^\s+\d+\) \[")
for i, l in enumerate(L):
    if H.match(l) and site in l:
        j = i + 1
        while j < len(L) and not H.match(L[j]) and j - i < n: j += 1
        print("\n".join(L[i:j])); break
