"""Run every analysis over every probe run on disk and print one per-run key-number table (data/summary.json).
usage: python3 -I tools/aggregate.py   (from remeasure/)
"""
import glob, json, os, re, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE); D = os.path.join(ROOT, 'data')
py = lambda *a: json.loads(subprocess.run([sys.executable, '-I', *a], capture_output=True, text=True, check=True).stdout)
S = {}
for f in sorted(glob.glob(f'{D}/*-r[0-9]-*.json')):
    name = os.path.basename(f)[:-5]
    m = re.match(r'(.+)-(r\d)-(\d+)$', name)
    if not m: continue
    sc, run, w = m.groups(); key = f'{sc}/{run}/{w}'
    raw = json.load(open(f)); meta = raw['meta']
    row = {'load': meta.get('loadStart'), 'frameDt_p50': round(meta.get('frameDt', {}).get('p50', 0), 2)}
    if sc in ('intro-jump', 'intro-wheel', 'intro-touch') and any('activated' in x['cls'] for x in raw['frames']):
        subprocess.run([sys.executable, '-I', f'{HERE}/intro_table.py', f], capture_output=True, check=True)
        sp = py(f'{HERE}/springfit.py', f[:-5] + '.csv')[name + '.csv']
        tw = py(f'{HERE}/tweenfit.py', f[:-5] + '.csv')
        row['spring'] = {k: ({'onset': v['onset_ms'], 'over%': v.get('overshoot_pct'), 'peak': v.get('peak'), 'peak_ms': v.get('peak_ms'), 'settle2': v['settle2_ms'],
                              'w0': v['fit']['omega0'], 'zeta': v['fit']['zeta'], 'relrms': v['fit']['rel_rms']} if v and 'fit' in v and 'omega0' in v['fit'] else v)
                         for k, v in sp.items()}
        row['tween'] = {k: {'onset': v['onset_ms'], 'dur': v['bezier']['dur_ms'], 'bez': v['bezier']['p']} for k, v in tw.items()}
        F = raw['frames']; a = next(x for x in F if 'activated' in x['cls'])
        row['activation_sy'] = a['sy']
        row['first_visible_ms'] = next((round(x['t'] - a['t'], 1) for x in F if x['t'] >= a['t'] and (x['intro']['y'] < x['ih'] and x['intro']['op'] > 0 and x['intro']['disp'] == 'block')), None)
        row['rest'] = {'aap': [F[-1]['aap'][k] for k in 'xywh'], 'pill': [F[-1]['bgD']['w'], F[-1]['bgD']['h']], 'btn': [F[-1]['bgB']['w'], F[-1]['bgB']['h']],
                       'gap': round(F[-1]['wrapB']['x'] - F[-1]['wrapD']['x'] - F[-1]['wrapD']['w'], 2), 'bottom': round(F[-1]['ih'] - F[-1]['aap']['y'] - 56, 2),
                       'dots': F[-1]['lw'], 'pitch': round(F[-1]['lx'][2] - F[-1]['lx'][1], 2), 'blur': F[-1]['bgD']['bf'], 'bg': F[-1]['bgD']['bg'], 'intro_bg': F[0]['intro']['bg'],
                       'radius_note': 'pill/btn border-radius 28px (computed)'}
    elif sc.startswith('intro'):
        F = raw['frames']; row['no_activation'] = {'classes': sorted({x['cls'] for x in F}), 'distinct_pill_w': sorted({x['bgD']['w'] for x in F}), 'html': raw.get('htmlCls', '')[:120],
                                                 'rest_pill': [F[-1]['bgD']['w'], F[-1]['bgD']['h']], 'dots': F[-1]['lw'], 'glyph': F[-1]['glyph']}
    elif sc in ('autoplay', 'click', 'retarget', 'retarget-late', 'drag'):
        c = py(f'{HERE}/carousel.py', f); c.pop('meta', None)
        if 'legs' in c:
            for L in c['legs'].values():
                for t in L['tweens']: t.pop('named_rms', None)
        else:
            for t in c.get('tweens', []): t.pop('named_rms', None)
        row |= c
    elif sc in ('hover', 'pause', 'idle'):
        row |= py(f'{HERE}/states.py', sc, f)
    elif sc in ('resize', 'reduced', 'dark'):
        row |= py(f'{HERE}/variants.py', sc, f)
    elif sc.startswith('trigger'):
        st = raw['steps']; k = next((i for i, s in enumerate(st) if 'activated' in s['cls']), None)
        if k is None:
            row['activation'] = {'never_activated_over_sy': [st[0]['sy'], st[-1]['sy']], 'classes': sorted({s['cls'] for s in st})}; S[key] = row; continue
        a, b = st[k - 1], st[k]
        row['activation'] = {'sy_last_inactive': a['sy'], 'sy_first_active': b['sy'], 'gallery_top_px': [round(a['galTop'], 1), round(b['galTop'], 1)],
                             'gallery_top_frac_vh': [round(a['galTop'] / a['ih'], 4), round(b['galTop'] / b['ih'], 4)],
                             'gallery_visible_frac': [round((a['ih'] - a['galTop']) / (a['galBot'] - a['galTop']), 4), round((b['ih'] - b['galTop']) / (b['galBot'] - b['galTop']), 4)],
                             'container_top_px': [round(a['contTop'], 1), round(b['contTop'], 1)], 'dock_rest_y': round(b['aapY'] - float(re.search(r'translate3d\(0px, ([-\d.]+)px', b['aapSt']).group(1)), 1),
                             'ih': b['ih']}
    elif sc == 'exit':
        F = raw['frames']; marks = dict(raw['marks'])
        def seg(n0, n1):
            fr = [x for x in F if marks[n0] <= x['t'] < (marks[n1] if n1 else 1e18)]
            ys = [x['aapSt'] for x in fr]; cl = sorted({x['cls'] for x in fr})
            disp = sorted({x['intro']['disp'] for x in fr}); pw = sorted({x['bgD']['w'] for x in fr})
            return {'classes': cl, 'aap_transform_states': len(set(ys)), 'intro_display': disp, 'pill_widths_minmax': [min(pw), max(pw)], 'dock_y_minmax': [min(x['aap']['y'] for x in fr), max(x['aap']['y'] for x in fr)]}
        row['segments'] = {'up': seg('up', 'down'), 'down': seg('down', 'past'), 'past': seg('past', 'back'), 'back': seg('back', None)}
    S[key] = row
json.dump(S, open(f'{D}/summary.json', 'w'), indent=1)
print(f'{len(S)} runs -> data/summary.json')
