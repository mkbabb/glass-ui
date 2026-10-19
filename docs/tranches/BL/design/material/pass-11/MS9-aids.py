"""MS9-aids.py · the minor v9's R-26 / R-30 reading aids: (1) the printed lines the patch itself writes (a `+` line of
minor-split-v9.patch); (2) the printed lines H11-2's print reaches (R-30's neighbourhood); (3) the union, each with its
ruling, written to MS9-records/focus.txt. Usage: python3 -I MS9-aids.py <patch> <sweep LIST log> <neighbourhood log> <rulings.json> <outdir>"""
import json, re, sys
patch, sweep, nbhd, rulings, out = sys.argv[1:6]
added = set(); f = None; n = 0
for ln in open(patch, encoding='utf-8', errors='replace'):
    if ln.startswith('+++ '): f = ln[6:].strip() if ln.startswith('+++ b/') else None; continue
    m = re.match(r'^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@', ln)
    if m: n = int(m.group(1)); continue
    if f is None: continue
    if ln.startswith('+'): added.add(f"{f}:{n}"); n += 1
    elif ln.startswith('-'): pass
    elif ln.startswith(' '): n += 1
printed = [m.group(1) for m in (re.match(r'^· (\S+:\d+) ', l) for l in open(sweep)) if m]
nb = {}
for l in open(nbhd):
    m = re.match(r'^(\S+:\d+) \[(.*?)\] \|', l)
    if m: nb[m.group(1)] = m.group(2)
rul = {r['at']: r for r in json.load(open(rulings))}
w = [p for p in printed if p in added]; r30 = [p for p in printed if p in nb]
open(f"{out}/printed-lines-written-by-patch.txt", 'w').write('\n'.join(w) + '\n')
open(f"{out}/printed-in-neighbourhood-minor9.txt", 'w').write('\n'.join(r30) + '\n')
union = [p for p in printed if p in added or p in nb]
with open(f"{out}/focus.txt", 'w') as o:
    for p in union:
        r = rul.get(p, {})
        tags = (['WRITTEN'] if p in added else []) + ([f"nbhd: {nb[p]}"] if p in nb else [])
        o.write(f"{p} [{'; '.join(tags)}] {r.get('verdict','UNRULED')}\n   says: {r.get('says','').strip()}\n   why: {r.get('why','')}\n\n")
print(f"printed {len(printed)}; written by the patch {len(w)}; in the neighbourhood {len(r30)}; union {len(union)}")
