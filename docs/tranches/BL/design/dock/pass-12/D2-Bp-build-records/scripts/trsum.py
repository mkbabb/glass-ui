# trsum.py <trace json>...: per read and cell, the witness's close − land gap; for every gap > 0, the frames from one before the
# landing to the close: the witness's extent length and flag, the painted-lane step it read, and the lanes the scene still had
# moving on that frame (remaining distance; L = landed, seats next frame).
import json, sys, collections
tot = collections.defaultdict(list)
detail = '--detail' in sys.argv
cellsel = [a.split('=')[1] for a in sys.argv if a.startswith('--cell=')]
for f in [a for a in sys.argv[1:] if not a.startswith('--')]:
    d = json.load(open(f))
    for r in d['runs']:
        for n, c in r['cells'].items():
            if cellsel and n not in cellsel: continue
            key = (d['engine'], d['theme'], d['build'].split('@')[0], n)
            tot[key].append((c['gap'], r['load'], c['frameMs']))
            if not detail or not c['gap'] or c['gap'] <= 0: continue
            print(f"== {f.split('/')[-1]} {n} gap {c['gap']} land {round(c['land'],1)} close {round(c['close'],1)} F {c['frameMs']} load {r['load']} wins {[(w['open'], w['t']) for w in c['wins']]}")
            for row in c['rows']:
                if row['t'] < c['land'] - 40 or row['t'] > c['close'] + 1: continue
                ws = [w for w in row['writes'] if w['frame']]
                mv = '; '.join(' '.join(f"{l[0]}={l[1]}{'L' if l[2] else ''}" for l in w['moving']) for w in ws) or '-'
                print(f"  t {row['t']:7.1f} dt {row['dtWit']:5.1f} len {row['len']:8.2f} step {row['lenStep']:6.2f} m {row['m']} paint {row['paint']['d']:6.2f} {row['paint']['who']:10} | body n {[w['n'] for w in ws]} dt {[w['dt'] for w in ws]} any {[w['any'] for w in ws]} | {mv}")
            for o in c['orphan']:
                print(f"  (body frame with no witness frame) t {o['t']} n {o['n']} any {o['any']} {' '.join(f'{l[0]}={l[1]}' for l in o['moving'])}")
print('\nsummary: engine theme build cell -> gaps (load)')
for k, v in sorted(tot.items()):
    late = sum(1 for g, _, F in v if g is not None and g > 2 * F + 0.5)
    print(k, 'n', len(v), 'late', late, [g for g, _, _ in v], 'load', min(l for _, l, _ in v), '-', max(l for _, l, _ in v))
