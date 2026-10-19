# FV10-readsheet.py · D3 pass 11, floor v10: the seat's R-26 / R-30 reading sheet. For every ruling in FV10-rulings.json,
# prints the line with 3 lines above and 2 below from the floor v10 tree, its verdict, whether H11-2's print reaches it
# (and why), and its `why`. A reading aid, never gated; the verdicts of record stay in FV10-rulings.json.
# Usage: python3 -I FV10-readsheet.py <floor v10 tree> <FV10-rulings.json> <neighbourhood-fv10.log> [file-substring]
import json, sys, pathlib, re
root, rulings, nb = pathlib.Path(sys.argv[1]), sys.argv[2], sys.argv[3]
only = sys.argv[4] if len(sys.argv) > 4 else ""
why_nb = {}
for ln in open(nb, encoding="utf-8"):
    m = re.match(r"^(\S+:\d+) \[(.*?)\] \|", ln)
    if m: why_nb[m.group(1)] = m.group(2)
rs = sorted(json.load(open(rulings)), key=lambda r: (r["at"].rsplit(":", 1)[0], int(r["at"].rsplit(":", 1)[1])))
last_why = None
for r in rs:
    if only and only not in r["at"]: continue
    f, n = r["at"].rsplit(":", 1); n = int(n)
    lines = (root / f).read_text(encoding="utf-8").split("\n")
    print(f"=== {r['at']} [{r['verdict']}]" + (f"  NBHD: {why_nb[r['at']]}" if r["at"] in why_nb else ""))
    for k in range(max(1, n - 3), min(len(lines), n + 2) + 1):
        print(f"  {'>' if k == n else ' '}{k:4d} | {lines[k-1]}")
    if r["says"].strip() != lines[n-1].strip(): print("  !! says differs from the tree")
    if r["why"] != last_why: print(f"  why: {r['why']}"); last_why = r["why"]
    else: print("  why: (as above)")
