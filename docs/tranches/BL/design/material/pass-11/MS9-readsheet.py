"""MS9-readsheet.py · the minor v9 reading sheet (R-26, R-30): every ruled line of MS9-rulings.json grouped by its `why`,
each line with its verdict, its text as the minor v9 prints it, and H11-2's reason where the neighbourhood print reaches
it. Usage: python3 -I MS9-readsheet.py <rulings.json> <neighbourhood.log> > MS9-records/readsheet.txt"""
import json, sys, re
rul = json.load(open(sys.argv[1]))
nb = {}
for ln in open(sys.argv[2]):
    m = re.match(r'^(\S+:\d+) \[(.*?)\] \|', ln)
    if m: nb[m.group(1)] = m.group(2)
groups = {}
for r in rul:
    groups.setdefault(r['why'], []).append(r)
for i, (why, rs) in enumerate(groups.items(), 1):
    print(f"#{i} WHY: {why}")
    for r in rs:
        n = f"  [nbhd: {nb[r['at']]}]" if r['at'] in nb else ""
        print(f"   {r['verdict']:8s} {r['at']}{n} | {r['says'].strip()[:400]}")
    print()
