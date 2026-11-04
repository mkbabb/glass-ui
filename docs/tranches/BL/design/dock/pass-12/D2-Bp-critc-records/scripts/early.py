# early.py <lanes json>...: the window closed early, per build: frames after the flag's last close on which the witness reads
# painted motion (a lane step or an extent step) or the scene still has a lane moving. A reading; enters no row.
import json, sys, collections
tot = collections.Counter(); ear = collections.defaultdict(list)
for f in sys.argv[1:]:
    d = json.load(open(f)); b = d['build'].split('@')[0]
    for r in d['runs']:
        for n, c in r['cells'].items():
            tot[(d['engine'], d['theme'], b)] += 1
            if c.get('close') is None: continue
            for row in c['rows']:
                if row['t'] <= c['close']: continue
                mv = [l for w in row['writes'] if w.get('frame') for l in w['moving']]
                if (row['paint']['d'] or 0) > 0.05 or abs(row['lenStep'] or 0) > 0.05 or mv:
                    ear[(d['engine'], d['theme'], b)].append((f.split('/')[-1], n, row['t'] - c['close'], row['paint'], row['lenStep'], mv[:3], r['load']))
for k in sorted(tot): print(k, 'windows', tot[k], 'with motion after the close', len(ear[k])); [print('   ', e) for e in ear[k]]
