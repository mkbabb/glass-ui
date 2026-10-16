"""Resize / reduced-motion / dark-scheme readings.
usage: python3 -I variants.py resize|reduced|dark data/<run>.json -> JSON on stdout
"""
import json, re, sys
mode, path = sys.argv[1], sys.argv[2]
d = json.load(open(path))
def geo(s):
    return {'aap': [s['aap'][k] for k in ('x', 'y', 'w', 'h')], 'pill': [s['bgD']['w'], s['bgD']['h']], 'btn': [s['bgB']['w'], s['bgB']['h']],
            'gap': round(s['wrapB']['x'] - (s['wrapD']['x'] + s['wrapD']['w']), 2), 'bottom_gap': round(s['ih'] - (s['aap']['y'] + s['aap']['h']), 2),
            'dots_w': s['lw'], 'dot_pitch': round(s['lx'][2] - s['lx'][1], 2), 'blur': s['bgD']['bf'], 'bg': s['bgD']['bg'], 'dotbg': s['lbg'][1],
            'glyph': s['glyph'], 'cls': s['cls']}
if mode == 'resize':
    out = {'at': [{'w': a['w'], **geo(a['s'])} for a in d['at']]}
    F = d['frames']
    ws = [(round(f['t'] - F[0]['t'], 1), f['aap']['w'], f['aap']['x'], f['bgD']['w']) for f in F]
    ch = [w for i, w in enumerate(ws) if i == 0 or w[1:] != ws[i - 1][1:]]
    out['live_resize_1440_to_390'] = {'distinct_states': len(ch), 'seq': ch[:8]}
    print(json.dumps(out, indent=1))
else:
    F = d['frames']
    a = next((f for f in F if 'activated' in f['cls']), None)
    ta = a['t'] if a else F[0]['t']
    def changes(key):
        out = []; prev = None
        for f in F:
            v = key(f)
            if v != prev: out.append((round(f['t'] - ta, 1), v))
            prev = v
        return out
    aapY = changes(lambda f: f['aapSt'][:40])
    res = {'pre': geo(d['pre']), 'rest': geo(F[-1]), 'activated': a is not None,
           'aap_transform_changes': len(aapY), 'aap_transform_first_last': [aapY[0], aapY[-1]],
           'intro_display_seq': changes(lambda f: f['intro']['disp']), 'pill_width_changes': len(changes(lambda f: f['bgD']['w'])),
           'last_motion_ms': max(changes(lambda f: (f['bgD']['w'], f['bgD']['h'], f['aapSt'], f['bgD']['bf']))[-1][0], 0)}
    after = d.get('after') or []
    if after:
        cur = [(round(f['t'] - after[0]['t']), f['cur'], round(f['sl'])) for f in after]
        sw = [c for i, c in enumerate(cur) if i and c[1] != cur[i - 1][1]]
        sl = [c for i, c in enumerate(cur) if i and c[2] != cur[i - 1][2]]
        res['after'] = {'switches': sw, 'scroll_frames_moving': len(sl), 'scroll_first_last': [sl[0], sl[-1]] if sl else None, 'fill_play': after[-1]['aPlay'], 'glyph': after[-1]['glyph'],
                        'fill_w_end': after[-1]['aw']}
    print(json.dumps(res, indent=1, default=str))
