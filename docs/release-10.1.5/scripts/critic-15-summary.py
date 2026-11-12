# 10.1.5 critic round 15: summarise the c12 rows.  python3 -I docs/release-10.1.5/scripts/critic-15-summary.py <project>
import json, sys, os
proj = sys.argv[1]
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'critic-15', 'probe', proj)
def ld(n):
    try: return json.load(open(os.path.join(D, n + '.json')))
    except Exception as e: print(n, 'missing', e); return []
print('== c12a vertical: stage fits run(sh,ch,st) firstWorst lastWorst')
for r in ld('c12a'):
    bad = [(s['stage'], s['fits'], s['run'] and (s['run']['sh'], s['run']['ch'], s['run']['st']), s['first'] and s['first']['worst'], s['last'] and s['last']['worst']) for s in r['sweep'] if (s['first'] and s['first']['worst'] > 0.5) or (s['last'] and s['last']['worst'] > 0.5) or not s['first'] or not s['last']]
    print(r['width'], r['coarse'], r['dark'], 'cut cells:', len(bad), bad[:12])
print('== c12b horizontal band: cap fits sw cw hidden uniform | hover uniform | endWorst endSl | firstWorst')
for r in ld('c12b'):
    print('--', r['width'], r['coarse'], r['dir'], 'natural', r['natural'])
    for s in r['sweep']:
        re = s['rest']; ru = re['run']; ho = s['hover']
        er = s['endRing']; fr = s['firstRing']
        print('  ', s['cap'], re['fits'], ru['sw'], ru['cw'], 'hid', ru['hidden'], 'uni', re['uniform'], re['radii'][1] if not re['uniform'] else '', '| hov', ho and ho['uniform'], '| end', er and er['worst'], s['endRun'] and s['endRun']['sl'], '| first', fr and fr['worst'], s['firstRun'] and s['firstRun']['sl'])
print('== c12c overflow')
for r in ld('c12c'):
    print('--', r['width'], r['coarse'], r['dir'])
    for k in ('collapsed0', 'rest', 'end', 'flush', 'mid', 'collapsedScrolled', 'reExpanded'):
        p = r[k]; ru = p['run']
        print('  ', k, 'fits', p['fits'], 'uni', p['uniform'], p['radii'], 'sl', ru and ru['sl'], 'sw/cw', ru and (ru['sw'], ru['cw']), 'hid', ru and ru['hidden'])
print('== c12d frames')
for r in ld('c12d'):
    for k in ('expand', 'collapse'):
        x = r[k]; print(r['width'], r['coarse'], 'layers', r['layers'], k, 'frames', x['frames'], 'maxSpread', x['maxSpread'], 'pct', x['pct'], 'uneven', len(x['uneven']), [(u['t'], u['m'], u['c'], u['rad']) for u in x['uneven'][:4]])
print('== c12e rings')
for r in ld('c12e'):
    for k in ('slider', 'spectrum', 'sortable', 'sheetHandle'):
        x = r[k]
        print(r['dark'], k, x.get('found'), x.get('fv'), 'contrast', x.get('contrast'), 'focus', x.get('focusOutline'), (x.get('focusShadow') or '')[:70], '| ring', (x.get('ringShadow') or '')[:90])
