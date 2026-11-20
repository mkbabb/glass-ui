"""Print a drill JSON compactly: per mode, per layer the rate per 100 px, how its transform/opacity/clip/bg change, text coverage; writes; trace.
usage: python3 -I readdrill.py <json> [--tree N]"""
import json, sys
R = json.load(open(sys.argv[1]))
tn = int(sys.argv[sys.argv.index('--tree') + 1]) if '--tree' in sys.argv else 0
print('##', R['spec']['name'], R['engine'], R['spec']['url'])
for mode, M in R['modes'].items():
    if M.get('error'): print(' ', mode, 'ERROR', M['error'][:200]); continue
    S = M.get('samples', [])
    print(' ==', mode, 'startY', M.get('startY'), 'ys', [s[0] for s in S][:3], '..', [s[0] for s in S][-2:], 'gate', M.get('gate'), 'clicked', M.get('clicked'))
    for i, L in enumerate(R['spec']['layers']):
        col = [s[1][i] for s in S]
        if not any(col): print('   ', L['label'], ': not found'); continue
        r = M['rates'][i]['per100']
        def uniq(k):
            out = []
            for c in col:
                v = c.get(k) if c else None
                if not out or out[-1] != v: out.append(v)
            return out
        line = '    %-22s rate %s' % (L['label'], [x for x in r])
        for k in ['tf', 'op', 'clip', 'filter', 'bg', 'bgi', 'bdf', 'z', 'h']:
            u = uniq(k)
            if len(u) > 1: line += ' | %s %s' % (k, u[:8])
            elif k in ('tf', 'op', 'clip', 'bdf', 'z') and u and u[0] not in (0, 1, None): line += ' | %s=%s' % (k, u[0])
        print(line[:900])
        if L.get('text'):
            cv = [(s[0], c['cover'][0], c['cover'][1], c['cover'][2]) for s, c in zip(S, col) if c and c.get('cover')]
            hits = [x for x in cv if x[2]]
            print('      cover: %d/%d steps covered; first %s' % (len(hits), len(cv), [(y, f'{c}/{n}', list(b.items())[:2]) for y, n, c, b in hits[:3]]))
    if M.get('writes'): print('    writes', M['writes'][:8])
    if M.get('trace'): print('    trace', M['trace'])
    if M.get('after'): print('    after', json.dumps(M['after'])[:900])
    if tn and M.get('tree'): print('\n'.join('      ' + l[:220] for l in M['tree'][:tn]))
