# P-E15 part B · cell-by-cell comparison of graded logs (the harness's PASS/FAIL/UNMEASURED/REPORT lines), one column per log.
# The cell key is H15 sum15.py's: the text up to the first grade clause. Prints the totals per log and every row whose grades differ.
#   python3 -I cmp15.py <label>=<log> [<label>=<log> ...] [--all] [--only REGEX]
import re, sys
args = [a for a in sys.argv[1:] if not a.startswith("--")]
ALL = "--all" in sys.argv
ONLY = sys.argv[sys.argv.index("--only") + 1] if "--only" in sys.argv else None
if ONLY in args: args.remove(ONLY)
cols, rows, order = [], {}, []
SPLIT = r" · (the act on|glides \d|the root's|the train's|the card moved|rest \d|width |moved |on the insert|engaged |top: |the engine keeps)"
for a in args:
    lab, f = a.split("=", 1); cols.append(lab)
    seen = {}
    for l in open(f, encoding="utf8"):
        m = re.match(r"^\s+(PASS|FAIL|UNMEASURED|REPORT)\s+(.*)$", l)
        if not m: continue
        v, rest = m.group(1), m.group(2)
        key = re.split(SPLIT, rest)[0]
        key = re.sub(r" · drive [^·]*", "", key); key = re.split(r" · (NOT DRIVEN|NOT READ|read \d repeated)", key)[0].strip()
        key = re.sub(r" · load [\d./]+$", "", key)
        n = seen.get(key, 0); seen[key] = n + 1
        if n: key = f"{key} #{n + 1}"
        if key not in rows: rows[key] = {}; order.append(key)
        rows[key][lab] = (v[0], rest)
tot = {c: {g: sum(1 for k in order if rows[k].get(c, ("·",))[0] == g) for g in "PFUR"} for c in cols}
print(" · ".join(f"{c} P{t['P']}/F{t['F']}/U{t['U']}/R{t['R']}" for c, t in tot.items()))
for k in order:
    if ONLY and not re.search(ONLY, k): continue
    g = [rows[k].get(c, ("·", ""))[0] for c in cols]
    if ALL or len(set(x for x in g if x != "R")) > 1 or "F" in g:
        print(f"| {k[:170]} | " + " | ".join(g) + " |")
