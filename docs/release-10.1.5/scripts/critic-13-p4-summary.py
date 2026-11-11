# 10.1.5 critic round 13: the P4 count (c9f, a layered dock's first expand from a closed mount) per arm.
#   python3 -I docs/release-10.1.5/scripts/critic-13-p4-summary.py
import json, glob, os
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'critic-13', 'p4')
for arm in ('tip', 'v1014'):
    n = 0; miss = []; widths = {}
    for f in sorted(glob.glob(os.path.join(D, arm + '-*', '*', 'c9f-*.json'))):
        for r in json.load(open(f)):
            n += 1
            w = r['plate']['w']
            widths[w] = widths.get(w, 0) + 1
            if w < 250:
                miss.append((os.path.relpath(f, D), r['width'], r['i'], w, r['plate']['exp'], r.get('cw'), r.get('sw'), r.get('fits')))
    print(arm, 'first expands', n, 'misses', len(miss), 'plate widths', dict(sorted(widths.items())))
    for m in miss: print('   ', m)
