# edgesum.py <trace json>...: per run of revtrace.mjs, every glyph-crossing CLIP edge (its own inset or an ancestor clip) inside
# the plate's painted main edges, with the ink just inside it (the masks' product 0.3 px in) and its distance in from the
# plate's edge. "hard" = ink inside >= 0.9 (the stub law's 90 %); the witness's stub reads such an edge only more than 0.5 px
# (CUT_PX) in, so "hard" edges from 0 to 0.5 px in are the class's near-bound reads the witness cannot see.
import json, sys, os, collections, re
tot = collections.Counter()
for p in sys.argv[1:]:
    j = json.load(open(p))
    if 'runs' not in j: continue
    for r in j['runs']:
        T0 = r['T0']; hard = []; soft = 0
        for f in r['edges']:
            pm0, pm1 = f['pm']
            for g in f['g']:
                for e in g[7]:
                    if len(e) < 3 or e[1] is None or e[2] is None or not (e[0].startswith('own') or e[0].startswith('anc')): continue
                    x = e[1]; d = min(x - pm0, pm1 - x)
                    if d <= 0.01: continue
                    if e[2] >= 0.9: hard.append((round(f['ts'] - T0, 1), g[1], g[2], x, round(d, 2), g[5], e[0].split(' ')[0] + ' ' + e[0].split(' ')[-1]))
                    else: soft += 1
        # the scene's own writes: a unit clip edge inside the plate and inside its box, with no ramp on that side (model px)
        mh = []
        for w in r.get('writes', []):
            P0, P1 = w['Pr'][0], w['Pr'][2]
            for m in w['mv']:
                c = m.get('clip'); bx = m.get('bx')
                if not c or not bx or not c.startswith('inset('): continue
                v = [float(x[:-2]) for x in c[6:c.index(' round')].split()]
                lo, hi = bx[0], bx[0] + bx[1]; e0, e1 = lo + v[3], hi - v[1]
                mk = m.get('mk') or ''
                al = [float(a) for a in re.findall(r'/ ([0-9.]+)\)', mk)]
                rs = bool(al) and al[0] == 0; re_ = bool(al) and al[-1] == 0
                # an edge's ink at the edge: the mask's first / last stop (1 without a mask); 'hard' = 0.9 or more
                a_s = al[0] if al else 1; a_e = al[-1] if al else 1
                if e0 > max(lo, P0) + 0.05 and a_s >= 0.9: mh.append((round(w['ts'] - T0, 1), m['l'], 'start', round(e0 - max(lo, P0), 3)))
                if e1 < min(hi, P1) - 0.05 and a_e >= 0.9: mh.append((round(w['ts'] - T0, 1), m['l'], 'end', round(min(hi, P1) - e1, 3)))
        st = r['stub']; sp = r.get('splice') or {}
        b = os.path.basename(p)
        key = b.rsplit('-r', 1)[0]
        tot[key + ' runs'] += 1; tot[key + ' hard'] += len(hard); tot[key + ' hard 0.01-0.2'] += sum(1 for h in hard if h[4] <= 0.2); tot[key + ' hard 0.2-0.5'] += sum(1 for h in hard if 0.2 < h[4] <= 0.5); tot[key + ' hard>0.5'] += sum(1 for h in hard if h[4] > 0.5); tot[key + ' runs with hard>0.2'] += any(h[4] > 0.2 for h in hard); tot[key + ' stub'] += (st or {}).get('stubFrames', 0) or 0; tot[key + ' splice'] += sp.get('spliceFrames', 0) or 0
        print(f"{b} load {r['load']}: stub {(st or {}).get('stubFrames')} splice {sp.get('spliceFrames')}{' ' + '|'.join(sp['firstSplice']['units']) + ' gap ' + str(sp['firstSplice']['gapPx']) + ' at ' + str(sp['firstSplice']['atMs']) if sp.get('firstSplice') else ''}; hard clip edges inside the plate {len(hard)} (soft {soft})")
        for h in hard: print('   t %s "%s" %s at %s px, %s px in, share %s, %s' % h)
        for h in mh: print('   MODEL t %s %s %s edge %s px inside the plate, no ramp' % h)
        tot[key + ' model hard edges'] += len(mh); tot[key + ' runs with a model hard edge'] += bool(mh)
print('--- totals')
for k in sorted(tot): print(k, tot[k])
