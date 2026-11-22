# unlisted9.py [a-b]: MEASURE-9 part H, item H12 (C8-M12): useDockBody.ts's code lines (the counter's rule) outside the
# 344 that MEASURE-8 M4's table ties to a ruled behaviour, printed with their numbers (optionally only within a-b), and
# their count. The table's ranges are copied from MEASURE-8.md's M4 (the tip's src, unchanged since).
import sys
F = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/src/components/dock/composables/useDockBody.ts"
M4 = "24-26,701,711,726,729,828,893,1265-1273,1296-1306,1425,668-687,772,889,1358-1417,376-380,210-216,776-790,816-826,845-860,1133-1142,1238-1241,605-666,298-332,967-975,1210-1220,1250-1253,509-519,545-547,570-572,731-737,1275-1291,1293-1295,232-235,417-425,738-745,1309-1325,689-691,712-718,865-869,1090-1102,157-164,695,228-231,357-358,414-415,749,1123-1124,1074-1076,1227-1230"
listed = set()
for r in M4.split(","):
    a, b = (r.split("-") + [r])[:2]; listed |= set(range(int(a), int(b) + 1))
lines = open(F).read().split("\n")
code, inc = set(), False
for i, l in enumerate(lines, 1):
    s = l.strip()
    if inc:
        if "*/" in s: inc = False
        continue
    if s.startswith("/*") and "*/" not in s: inc = True; continue
    if s and not s.startswith(("//", "/*")): code.add(i)
un = sorted(code - listed)
print(f"code {len(code)}, listed {len(code & listed)}, unlisted {len(un)}")
if len(sys.argv) > 1:
    a, b = map(int, sys.argv[1].split("-"))
    for i in un:
        if a <= i <= b: print(f"{i:5d} {lines[i-1].rstrip()[:150]}")
