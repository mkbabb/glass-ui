# rangecode.py <file> <a-b[,c-d...]>...: code lines (ORCH-LINES-7 line 2: not blank, not opening or continuing a comment)
# in each named set of line ranges of a file at the tip; prints the count per set. Part M's list of the code that could go.
import sys, re
f = sys.argv[1]; lines = open(f).read().split("\n")
def code(i):
    s = lines[i - 1].strip()
    return bool(s) and not (s.startswith("//") or s.startswith("/*") or s.startswith("*") or s.startswith("<!--"))
incomment = False
iscode = {}
for i, l in enumerate(lines, 1):
    s = l.strip()
    if incomment:
        iscode[i] = False
        if "*/" in s: incomment = False
        continue
    if s.startswith("/*") and "*/" not in s: incomment = True; iscode[i] = False; continue
    iscode[i] = bool(s) and not (s.startswith("//") or s.startswith("/*") or s.startswith("<!--"))
for spec in sys.argv[2:]:
    name, rs = spec.split("=") if "=" in spec else (spec, spec)
    n = 0
    for r in rs.split(","):
        a, b = (r.split("-") + [r])[:2]
        n += sum(1 for i in range(int(a), int(b) + 1) if iscode.get(i))
    print(f"{n:4d}  {name}")
