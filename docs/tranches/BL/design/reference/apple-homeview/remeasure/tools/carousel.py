"""Carousel analysis over any probe run that carries `frames` (autoplay / click / retarget / drag legs).
Reports: switch instants (current-class flips), scroll tweens (start, end, duration, normalised curve samples,
velocity-peak position, best-matching cubic-bezier), capsule-width vs --autoplay-progress law, fill rate,
caption parallax ratio and opacity, and input latency when the run logs a click time.
usage: python3 -I carousel.py data/autoplay-r1-1440.json [--frames-key legs] -> JSON on stdout
"""
import json, re, sys
import numpy as np
from scipy.optimize import least_squares

STRIDE = None

def bez(x1, y1, x2, y2, xs):
    # y(x) for cubic-bezier(x1,y1,x2,y2) by solving x(s)=x
    s = np.linspace(0, 1, 2001)
    bx = 3 * (1 - s) ** 2 * s * x1 + 3 * (1 - s) * s ** 2 * x2 + s ** 3
    by = 3 * (1 - s) ** 2 * s * y1 + 3 * (1 - s) * s ** 2 * y2 + s ** 3
    return np.interp(xs, bx, by)

NAMED = {'ease': (.25, .1, .25, 1), 'ease-in-out': (.42, 0, .58, 1), 'ease-out': (0, 0, .58, 1), 'ease-in': (.42, 0, 1, 1), 'linear': (0, 0, 1, 1)}

def tx(m):
    mm = re.match(r'matrix\(([^)]*)\)', m or '')
    return float(mm.group(1).split(',')[4]) if mm else 0.0

def tweens(F, t0):
    sl = np.array([f['sl'] for f in F]); t = np.array([f['t'] for f in F]) - t0
    out = []; i = 1; n = len(F)
    while i < n:
        if abs(sl[i] - sl[i - 1]) > 0.5:
            s = i - 1
            j = i
            quiet = 0
            while j < n - 1 and quiet < 12:
                quiet = quiet + 1 if abs(sl[j + 1] - sl[j]) < 0.05 else 0
                j += 1
            e = j - quiet
            a, b = sl[s], sl[e]
            if abs(b - a) < 50: i = j; continue
            tt = (t[s:e + 1] - t[s]); p = (sl[s:e + 1] - a) / (b - a)
            D = tt[-1]
            x = tt / D
            v = np.gradient(p, tt)
            fit = least_squares(lambda q: bez(q[0], q[1], q[2], q[3], x) - p, [.3, .1, .3, 1], bounds=([0, -1, 0, 0], [1, 2, 1, 2]))
            named = {k: round(float(np.sqrt(np.mean((bez(*c, x) - p) ** 2))), 4) for k, c in NAMED.items()}
            out.append({'t_start': round(float(t[s]), 1), 't_end': round(float(t[e]), 1), 'dur_ms': round(float(D), 1), 'from': round(float(a), 1), 'to': round(float(b), 1),
                        'p_at': {f'{q}': round(float(np.interp(q, x, p)), 3) for q in (0.1, 0.25, 0.5, 0.75, 0.9)},
                        'vpeak_at': round(float(x[np.argmax(v)]), 3), 'overshoot_px': round(float(np.max((sl[s:e + 1] - b) * np.sign(b - a))), 2),
                        'bezier_fit': [round(float(c), 3) for c in fit.x], 'bezier_rms': round(float(np.sqrt(np.mean(fit.fun ** 2))), 4), 'named_rms': named,
                        'frames': int(e - s)})
            i = j
        else:
            i += 1
    return out

def analyse(F, extra):
    t0 = extra.get('t0', F[0]['t'])
    t = np.array([f['t'] for f in F]) - t0
    cur = [f['cur'] for f in F]
    sw = [(round(float(t[i]), 1), cur[i - 1], cur[i]) for i in range(1, len(F)) if cur[i] != cur[i - 1]]
    res = {'switches': sw, 'tweens': tweens(F, t0)}
    # capsule law: link width vs --autoplay-progress
    errs = []; sums = []
    for f in F:
        try: ap = float(f['ap'])
        except: continue
        pi = float(f['pi'] or 1)
        for k, w in enumerate(f['lw']):
            pred = (48 - 8) * min(max(1 - abs(k - ap), 0), 1) * pi + 8
            errs.append(w - pred)
        sums.append(sum(f['lw']))
    res['capsule_law'] = {'model': 'w_i = 8 + 40*max(0,1-|i-ap|)*progressIntro', 'max_abs_err_px': round(float(np.max(np.abs(errs))), 3) if errs else None,
                          'row_sum_px_minmax': [round(min(sums), 2), round(max(sums), 2)] if sums else None}
    # scroll-slaving: ap vs scrollLeft / stride
    pairs = [(f['sl'], float(f['ap'])) for f in F if f['ap'] not in ('', None)]
    if pairs:
        sl = np.array([p[0] for p in pairs]); ap = np.array([p[1] for p in pairs])
        m = sl > 1
        if m.sum() > 5:
            k = np.polyfit(sl[m], ap[m], 1)
            res['ap_vs_scroll'] = {'ap_per_px': float(k[0]), 'stride_px': round(1 / k[0], 1) if k[0] else None, 'intercept': round(float(k[1]), 4),
                                   'max_resid': round(float(np.max(np.abs(np.polyval(k, sl[m]) - ap[m]))), 4)}
    # fill rate while running
    segs = []; cur_seg = []
    for f, tt in zip(F, t):
        if f['aPlay'] == 'running' and f['aw'] is not None:
            if cur_seg and (f['cur'] != cur_seg[-1][2]): segs.append(cur_seg); cur_seg = []
            cur_seg.append((tt, f['aw'], f['cur']))
        elif cur_seg: segs.append(cur_seg); cur_seg = []
    if cur_seg: segs.append(cur_seg)
    rates = []
    for s in segs:
        a = np.array([[q[0], q[1]] for q in s if q[1] > 1.3])
        if len(a) > 20:
            k = np.polyfit(a[:, 0], a[:, 1], 1); rates.append({'cur': s[0][2], 'px_per_s': round(1000 * k[0], 3), 'from_t': round(a[0, 0]), 'to_t': round(a[-1, 0]), 'w_from': round(a[0, 1], 2), 'w_to': round(a[-1, 1], 2),
                                                                'lin_resid_px': round(float(np.max(np.abs(np.polyval(k, a[:, 0]) - a[:, 1]))), 3)})
    res['fill'] = rates
    # caption parallax: translateX of caption 1 vs scrollLeft
    c = np.array([[f['sl'], tx(f['cap'][1][0]), f['cap'][1][1], tx(f['cap'][0][0]), f['cap'][0][1]] for f in F if len(f['cap']) > 1])
    if len(c) and np.ptp(c[:, 0]) > 50:
        k1 = np.polyfit(c[:, 0], c[:, 1], 1); k0 = np.polyfit(c[:, 0], c[:, 3], 1)
        res['caption'] = {'cap1_tx_per_scroll_px': round(float(k1[0]), 4), 'cap0_tx_per_scroll_px': round(float(k0[0]), 4),
                          'cap1_tx_range': [round(float(c[:, 1].min()), 1), round(float(c[:, 1].max()), 1)], 'cap0_op_range': [round(float(c[:, 4].min()), 3), round(float(c[:, 4].max()), 3)],
                          'cap1_op_range': [round(float(c[:, 2].min()), 3), round(float(c[:, 2].max()), 3)]}
    # glass static in moves: does any dock-material value change while slides move?
    moving = [f for f in F if any(abs(f['sl'] - g['sl']) > 0.5 for g in [f])]
    mat = {(f['bgD']['bf'], f['bgD']['bg'], f['bgD']['w'], f['bgD']['h'], f['bgD']['tf'], f['bgB']['tf'], f['aap']['y']) for f in F}
    res['dock_material_states'] = len(mat)
    return res

if __name__ == '__main__':
    d = json.load(open(sys.argv[1]))
    out = {'meta': d['meta']}
    if 'legs' in d:
        out['legs'] = {L['name']: analyse(L['frames'], {'t0': L['t']}) | {'touch_end_ms': round(L['tEnd'] - L['t'], 1)} for L in d['legs']}
    else:
        ex = {}
        for k in ('tClick', 'tClick1', 'tHover'):
            if k in d: ex['t0'] = d[k]
        out |= analyse(d['frames'], ex)
        if 'tClick' in d:
            F = d['frames']; tc = d['tClick']
            def first(pred):
                return next((round(f['t'] - tc, 1) for f in F if f['t'] >= tc and pred(f)), None)
            cur0 = F[0]['cur']; sl0 = F[0]['sl']; lw0 = F[0]['lw']; g0 = F[0]['glyph']; a0 = F[0]['aPlay']
            out['latency_ms'] = {'current_flip': first(lambda f: f['cur'] != cur0), 'scroll_moves': first(lambda f: abs(f['sl'] - sl0) > 0.5),
                                 'capsule_moves': first(lambda f: any(abs(a - b) > 0.2 for a, b in zip(f['lw'], lw0))),
                                 'glyph_swap': first(lambda f: f['glyph'] != g0), 'fill_state': first(lambda f: f['aPlay'] != a0)}
        if 'tClick1' in d: out['tClick1_rel'] = 0; out['tClick2_rel'] = round(d['tClick2'] - d['tClick1'], 1)
    print(json.dumps(out, indent=1, default=float))
