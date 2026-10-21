# D4 pass 9 · RE-MEASURE · t6-classify.py: sorts digest/compare-p8.txt's MOVED T-6 cells (verdict held, line changed)
# into: only the load moved; only loads, ms timings and frame counts moved; anything else (printed in full).
#   python3 -I t6-classify.py digest/compare-p8.txt
import re, sys
t = open(sys.argv[1]).read().split("\nMOVED ")[1:]
load = timing = 0; other = []
s = lambda x: re.sub(r"load [\d. /]+", "", x)
w = lambda x: re.sub(r"\d+(\.\d+)? ?ms|\d+ frames|\d+-\d+ ms", "T", s(x))
for b in t:
    h, p8, p9 = b.split("\n")[:3]
    if "T-6" not in h: continue
    a, c = p8.strip()[3:], p9.strip()[3:]
    if s(a) == s(c): load += 1
    elif w(a) == w(c): timing += 1
    else: other.append((h, a, c))
print(f"T-6 moved: load only {load} · loads, ms timings and frame counts only {timing} · other {len(other)}")
for h, a, c in other: print(h); print("  p8", a); print("  p9", c)
