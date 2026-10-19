"""MS8-context.py · prints each printed line of R-21 (b)'s list with the comment or sentence around it (±N lines,
merged per file), from the minor v8 tree, marking '>' the printed lines and '+' the lines the patch writes. The reading
aid for R-26 (every clause of the line and of its sentence). Usage: python3 -I MS8-context.py <tree> <sweep LIST log>
<written-by-patch list> [N] [file-substring]"""
import re, sys
tree, log, wr = sys.argv[1:4]
N = int(sys.argv[4]) if len(sys.argv) > 4 else 4
only = sys.argv[5] if len(sys.argv) > 5 else None
printed = {}
for line in open(log, encoding='utf-8'):
    m = re.match(r'^· (\S+):(\d+) ', line)
    if m: printed.setdefault(m.group(1), set()).add(int(m.group(2)))
written = {}
for line in open(wr):
    f, n = line.strip().rsplit(':', 1); written.setdefault(f, set()).add(int(n))
for f in sorted(printed):
    if only and only not in f: continue
    lines = open(f"{tree}/{f}", encoding='utf-8').read().split('\n')
    want = sorted(printed[f]); ranges = []
    for n in want:
        a, b = max(1, n - N), min(len(lines), n + N)
        if ranges and a <= ranges[-1][1] + 1: ranges[-1][1] = max(ranges[-1][1], b)
        else: ranges.append([a, b])
    print(f"=== {f}")
    for a, b in ranges:
        for i in range(a, b + 1):
            mk = ('>' if i in printed[f] else ' ') + ('+' if i in written.get(f, ()) else ' ')
            print(f"{mk}{i:5d}| {lines[i-1][:170]}")
        print("   ---")
