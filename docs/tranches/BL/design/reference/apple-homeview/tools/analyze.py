"""analyze.py: turns samples/<scenario>.json (film.mjs) into timelines, fits and a summary.

usage: python3 -I analyze.py <samplesDir>
writes: <samplesDir>/timeline-<scenario>.csv, <samplesDir>/analysis.json, model-intro-<scenario>.json
Clock: rows are rAF-sampled (performance.now, ms); each row reads the styles committed by the
previous frame, so measured series lag the page's own frame by <= 1 frame.
"""
import csv, json, math, os, re, sys
import numpy as np
from scipy.optimize import least_squares

D = sys.argv[1]
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import model  # noqa: E402

def load(name):
    p = os.path.join(D, f'{name}.json')
    return json.load(open(p)) if os.path.exists(p) else None

def f(x, d=float('nan')):
    try:
        return float(str(x).replace('px', '').strip())
    except Exception:
        return d

def t3d(tf):
    """translate3d(x, y, z) scale(s) ... -> (x, y, s)"""
    if not tf:
        return (0.0, 0.0, 1.0)
    m = re.search(r'translate3d\(([-\d.e]+)px,\s*([-\d.e]+)px', tf)
    s = re.search(r'scale\(([-\d.e]+)\)', tf)
    return (float(m.group(1)) if m else 0.0, float(m.group(2)) if m else 0.0, float(s.group(1)) if s else 1.0)

def mat_scale(tf):
    if not tf or tf == 'none':
        return 1.0
    m = re.match(r'matrix\(([^)]+)\)', tf)
    if not m:
        return float('nan')
    a, b = [float(v) for v in m.group(1).split(',')[:2]]
    return math.hypot(a, b)

def blur(bf):
    m = re.search(r'blur\(([\d.]+)px\)', bf or '')
    return float(m.group(1)) if m else float('nan')

def alpha_of(c):
    m = re.match(r'rgba?\(([^)]+)\)', c or '')
    if not m:
        return float('nan')
    p = [v.strip() for v in m.group(1).replace('/', ',').split(',')]
    return float(p[3]) if len(p) > 3 else 1.0

def ease_in_out_quad(u):
    u = np.clip(u, 0, 1)
    return np.where(u < .5, 2 * u * u, -1 + (4 - 2 * u) * u)

def bezier(u, x1, y1, x2, y2):
    u = np.clip(np.asarray(u, float), 0, 1)
    s = u.copy()
    for _ in range(30):  # Newton on x(s) = u, then a bisection-safe clip
        cx = 3 * x1; bx = 3 * (x2 - x1) - cx; ax = 1 - cx - bx
        x = ((ax * s + bx) * s + cx) * s - u
        dx = (3 * ax * s + 2 * bx) * s + cx
        s = np.clip(s - x / np.where(abs(dx) < 1e-6, 1e-6, dx), 0, 1)
    cy = 3 * y1; by = 3 * (y2 - y1) - cy; ay = 1 - cy - by
    return ((ay * s + by) * s + cy) * s

def fit_curve(ts, xs):
    """normalise a monotone-ish transition; fit duration-free bezier + compare easeInOutQuad."""
    ts = np.asarray(ts, float); xs = np.asarray(xs, float)
    x0, x1 = xs[0], xs[-1]
    if abs(x1 - x0) < 1e-6:
        return None
    y = (xs - x0) / (x1 - x0)
    # start = last sample before motion, end = first sample within 0.5px of rest that stays there
    mv = np.where(abs(xs - x0) > 0.5)[0]
    if not len(mv):
        return None
    i0 = max(mv[0] - 1, 0)
    rest = [i for i in range(len(xs)) if np.all(abs(xs[i:] - x1) <= 0.5)]
    i1 = rest[0] if rest else len(xs) - 1
    T = ts[i1] - ts[i0]
    u = (ts[i0:i1 + 1] - ts[i0]) / T
    yy = y[i0:i1 + 1]
    r = least_squares(lambda p: bezier(u, *p) - yy, [.42, 0, .58, 1], bounds=([0, -2, 0, -2], [1, 3, 1, 3]))
    # duration-free easeInOutQuad with free duration: fit T' by scanning
    best = None
    for Tq in np.linspace(T * .6, T * 1.6, 201):
        uq = (ts[i0:i1 + 1] - ts[i0]) / Tq
        res = ease_in_out_quad(uq) - yy
        rms = float(np.sqrt(np.mean(res ** 2)))
        if best is None or rms < best[1]:
            best = (Tq, rms)
    over = float(np.max((y - 1) * 1)) * 100
    return {'from': float(x0), 'to': float(x1), 'start_ms': float(ts[i0]), 'settle_0p5px_ms': float(T),
            'bezier': [round(v, 3) for v in r.x], 'bezier_rms': round(float(np.sqrt(np.mean(r.fun ** 2))), 4),
            'easeInOutQuad_T_ms': round(best[0], 1), 'easeInOutQuad_rms': round(best[1], 4), 'overshoot_pct': round(max(over, 0), 2),
            'peak_velocity_px_s': round(float(np.max(abs(np.diff(xs[i0:i1 + 1]) / np.diff(ts[i0:i1 + 1]))) * 1000), 1) if i1 > i0 else 0}

def fit_spring(ts, xs, target):
    """blind fit of x(t) = target + A e^{-z w t} cos(w sqrt(1-z^2) t + p) (underdamped) -> k, c (m=1)."""
    ts = (np.asarray(ts, float) - ts[0]) / 1000; xs = np.asarray(xs, float)
    e = xs - target
    def r(p):
        A, z, w, ph = p
        wd = w * math.sqrt(max(1 - z * z, 1e-9))
        return A * np.exp(-z * w * ts) * np.cos(wd * ts + ph) - e
    best = None
    for z0 in (.2, .4, .6, .8):
        for w0 in (6, 10, 14, 20):
            try:
                s = least_squares(r, [e[0], z0, w0, 0], bounds=([-1e4, 0.01, 1, -math.pi], [1e4, 0.999, 60, math.pi]))
            except Exception:
                continue
            if best is None or s.cost < best.cost:
                best = s
    A, z, w, ph = best.x
    return {'zeta': round(z, 3), 'omega0_rad_s': round(w, 2), 'k': round(w * w, 1), 'c': round(2 * z * w, 2),
            'response_s': round(2 * math.pi / w, 3), 'rms_px': round(float(np.sqrt(np.mean(best.fun ** 2))), 3)}

def settle(ts, xs, target, tol=.5):
    for i in range(len(xs)):
        if all(abs(x - target) <= tol for x in xs[i:]):
            return ts[i]
    return None

def overshoot(xs, x0, target):
    span = target - x0
    if not span:
        return 0.0
    ex = [(x - target) / span for x in xs]
    return round(max(0.0, max(ex)) * 100, 2)

OUT = {}

def frames_dt(rows):
    t = np.array([r['t'] for r in rows if 't' in r])
    d = np.diff(t)
    return {'n': len(t), 'median_dt_ms': round(float(np.median(d)), 2), 'p95_dt_ms': round(float(np.percentile(d, 95)), 2), 'max_dt_ms': round(float(np.max(d)), 2)}

# ---------------------------------------------------------------- intro
def intro(name):
    S = load(name)
    if not S:
        return
    rows = [r for r in S['rows'] if not r.get('none')]
    i0 = next((i for i, r in enumerate(rows) if 'inactive' not in r['aapCls']), None)
    if i0 is None:
        OUT[name] = {'entered': False, 'load': S['load']}
        return
    t0 = rows[i0]['t']
    T = []
    for k, r in enumerate(rows[max(i0 - 2, 0):]):
        ax, ay, _ = t3d(r['aap']['tf'])
        ix, iy, isc = t3d(r['intro']['tf'])
        b0x, _, _ = t3d(r['b0']['tf']); b1x, _, _ = t3d(r['b1']['tf'])
        T.append({
            'frame': k, 'ms': round(r['t'] - t0, 1), 'sy': r['sy'], 'activated': int('activated' in r['aapCls']),
            'aap_y': round(ay, 2), 'aap_rect_y': r['aap']['r'][1],
            'intro_x': round(ix, 2), 'intro_w': f(r['intro']['w']), 'intro_h': f(r['intro']['h']), 'intro_scale': isc, 'intro_op': r['intro']['op'], 'intro_disp': r['intro']['disp'],
            'b0_x': round(b0x, 2), 'b0_alpha': f(r['b0']['alpha']), 'b0_pIntro': f(r['b0']['pIntro']), 'b0_op': r['b0']['op'],
            'bg0_w': f(r['b0bg']['w'], r['b0bg']['r'][2]), 'bg0_h': f(r['b0bg']['h'], r['b0bg']['r'][3]), 'bg0_scale': f(r['b0bg']['scale']), 'bg0_vis_w': r['b0bg']['r'][2], 'bg0_vis_h': r['b0bg']['r'][3], 'bg0_vis_x': r['b0bg']['r'][0],
            'bg0_blur': blur(r['b0bg']['bf']), 'bg0_fill_a': alpha_of(r['b0bg']['bc']), 'bg0_op': r['b0bg']['op'], 'bg0_radius': r['b0bg']['br'],
            'b1_x': round(b1x, 2), 'b1_alpha': f(r['b1']['alpha']),
            'bg1_w': f(r['b1bg']['w'], r['b1bg']['r'][2]), 'bg1_h': f(r['b1bg']['h'], r['b1bg']['r'][3]), 'bg1_scale': f(r['b1bg']['scale']), 'bg1_vis_w': r['b1bg']['r'][2], 'bg1_vis_x': r['b1bg']['r'][0],
            'bg1_blur': blur(r['b1bg']['bf']), 'bg1_fill_a': alpha_of(r['b1bg']['bc']),
            'btn_op': r['btn']['op'], 'btn_scale': round(mat_scale(r['btn']['tf']), 4),
            **{f'dot{d[0]}_x': round(t3d(d[5])[0], 2) for d in r['dots']},
            **{f'dot{d[0]}_op': d[3] for d in r['dots']},
            'dot0_w': r['dots'][0][1], 'dotcur_w': r['dots'][max(r['cur'], 0)][1],
            'pill_vis_w_minus_btn_gap': round(r['b1bg']['r'][0] - (r['b0bg']['r'][0] + r['b0bg']['r'][2]), 2),
        })
    with open(os.path.join(D, f'timeline-{name}.csv'), 'w', newline='') as fh:
        w = csv.DictWriter(fh, fieldnames=list(T[0].keys()))
        w.writeheader(); w.writerows(T)
    last = rows[-1]
    B = {'vw': last['vw'], 'b0': last['b0']['r'], 'b1': last['b1']['r']}
    mrows = model.simulate(B['vw'], B['b0'], B['b1'], 2.2)
    json.dump({'bounds': B, 'rows': mrows}, open(os.path.join(D, f'model-intro-{name}.json'), 'w'))
    # residuals measured vs model (model time shifted by the activation lag: measured row k reads frame k-1)
    def resid(mkey, tkey):
        mt = np.array([m['t'] for m in mrows]); mv = np.array([m[mkey] for m in mrows])
        pts = [(x['ms'], x[tkey]) for x in T if 0 <= x['ms'] <= 2000 and not math.isnan(x[tkey])]
        if not pts:
            return None
        best = None
        for lag in np.arange(-40, 60.1, 2):
            pred = np.interp([p[0] - lag for p in pts], mt, mv)
            rms = float(np.sqrt(np.mean((pred - np.array([p[1] for p in pts])) ** 2)))
            if best is None or rms < best[1]:
                best = (lag, rms)
        return {'lag_ms': float(best[0]), 'rms': round(best[1], 3), 'n': len(pts)}
    res = {k: resid(*k.split('|')) for k in ['aap.y|aap_y', 'bg0.w|bg0_w', 'bg0.h|bg0_h', 'bg0.scale|bg0_scale', 'bg1.w|bg1_w', 'bg1.scale|bg1_scale', 'b0.x|b0_x', 'b1.x|b1_x', 'b0.alpha|b0_alpha', 'intro.w|intro_w', 'intro.h|intro_h', 'intro.x|intro_x', 'dot0.x|dot0_x', 'dot6.x|dot6_x', 'pIntro|b0_pIntro']}
    after = [x for x in T if x['ms'] >= 0]
    def ser(key, t_from=0):
        p = [(x['ms'], x[key]) for x in after if x['ms'] >= t_from and not (isinstance(x[key], float) and math.isnan(x[key]))]
        return [a for a, _ in p], [b for _, b in p]
    ms, ay = ser('aap_y', 30)
    ms0, bw = ser('bg0_w', 500)
    yfit = fit_spring(ms, ay, 0) if len(ms) > 10 else None
    wfit = fit_spring(ms0, bw, B['b0'][2]) if len(ms0) > 10 else None
    dots_first = {}
    for d in range(7):
        k = next((x['ms'] for x in after if x[f'dot{d}_op'] and x[f'dot{d}_op'] > 0.01), None)
        dots_first[d] = k
    first_vis = next((x['ms'] for x in after if (x['bg0_op'] or 0) > 0 or (x['intro_op'] or 0) > 0), None)
    OUT[name] = {
        'load': S['load'], 'frames': frames_dt(rows), 'enter_scrollY': rows[i0]['sy'], 'geom': S.get('geom'),
        'enter_vs_start_px': round(rows[i0]['sy'] - S['geom']['start'], 1) if S.get('geom') else None,
        'rest_bounds': B, 'pill': {'w': B['b0'][2], 'h': B['b0'][3]}, 'button': {'w': B['b1'][2], 'h': B['b1'][3]},
        'gap_px': round(B['b1'][0] - (B['b0'][0] + B['b0'][2]), 2),
        'aap_y': {'max_up_px': round(min(ay), 2) if ay else None, 'overshoot_pct': overshoot(ay, 180, 0), 'settle_0p5_ms': settle(ms, ay, 0), 'spring_fit': yfit},
        'bg0_w': {'peak': max(bw) if bw else None, 'overshoot_pct': overshoot(bw, bw[0], B['b0'][2]) if bw else None, 'settle_0p5_ms': settle(ms0, bw, B['b0'][2]), 'spring_fit': wfit},
        'bg1_w_min': min(x['bg1_w'] for x in after), 'bg0_h_peak': max(x['bg0_h'] for x in after),
        'intro_peak_w': max(x['intro_w'] for x in after), 'intro_hidden_ms': next((x['ms'] for x in after if x['intro_disp'] == 'none'), None),
        'blur_px': {'first': after[0]['bg0_blur'], 'rest': after[-1]['bg0_blur']}, 'fill_alpha': {'first': after[0]['bg0_fill_a'], 'rest': after[-1]['bg0_fill_a']},
        'btn_visible_ms': next((x['ms'] for x in after if x['btn_op'] > 0.01), None), 'btn_scale_rest_ms': next((x['ms'] for x in after if x['btn_scale'] >= 0.999 and x['ms'] > 900), None),
        'dot_first_visible_ms': dots_first, 'first_visible_ms': first_vis, 'complete_ms': next((r['t'] - t0 for r in rows[i0:] if 'aap-intro-complete' in r['aapCls']), None),
        'residual_vs_source_model': res,
    }

# ---------------------------------------------------------------- transitions
def transitions(name):
    S = load(name)
    if not S:
        return
    rows = [r for r in S['rows'] if not r.get('none')]
    t0 = rows[0]['t']
    ts = [r['t'] - t0 for r in rows]
    sl = [r['sl'] for r in rows]
    prog = [f(r['prog']) for r in rows]
    T = []
    for k, r in enumerate(rows):
        T.append({'frame': k, 'ms': round(ts[k], 1), 'sl': r['sl'], 'prog': f(r['prog']), 'cur': r['cur'], 'gCls': ' '.join(c for c in r['gCls'].split() if c in ('playing', 'paused', 'ended')),
                  **{f'w{d[0]}': d[1] for d in r['dots']}, 'fill_w': next((d[6] for d in r['dots'] if d[6] is not None), None),
                  'pill_w': r['b0bg']['r'][2], 'icon': r['btn']['icon'], 'btn_bg': r['btn']['bc'], 'btn_scale': round(mat_scale(r['btn']['tf']), 4),
                  'slide0_x': r['slides'][0] if r['slides'] else None, 'cap_op_cur': r['caps'][max(r['cur'], 0)][0] if r['caps'] else None,
                  'dotsum': round(sum(d[1] for d in r['dots']), 2)})
    with open(os.path.join(D, f'timeline-{name}.csv'), 'w', newline='') as fh:
        w = csv.DictWriter(fh, fieldnames=list(T[0].keys()))
        w.writeheader(); w.writerows(T)
    # segment motions of sl: runs where |d sl| > 0.2 between rests of >= 150 ms
    segs, i, n = [], 0, len(sl)
    while i < n - 1:
        if abs(sl[i + 1] - sl[i]) > 0.2:
            j = i + 1
            still = 0
            while j < n - 1:
                still = still + (ts[j + 1] - ts[j]) if abs(sl[j + 1] - sl[j]) <= 0.2 else 0
                if still >= 150:
                    break
                j += 1
            a, b = max(i - 1, 0), j
            fit = fit_curve(ts[a:b + 1], sl[a:b + 1])
            if fit:
                ws = [T[x] for x in range(a, b + 1)]
                fit['dotsum_range'] = [min(x['dotsum'] for x in ws), max(x['dotsum'] for x in ws)]
                fit['pill_w_range'] = [min(x['pill_w'] for x in ws), max(x['pill_w'] for x in ws)]
                fit['prog_range'] = [min(x['prog'] for x in ws), max(x['prog'] for x in ws)]
                fit['max_dots_wider_than_8'] = max(sum(1 for d in range(7) if x[f'w{d}'] > 8.5) for x in ws)
                fit['cur_switch_ms'] = next((x['ms'] - fit['start_ms'] for x in ws if x['cur'] != ws[0]['cur']), None)
                # mark nearest preceding marker
                mk = [m for m in S.get('marks', []) if m['t'] - t0 <= fit['start_ms'] + 5]
                fit['after_mark'] = mk[-1]['m'] if mk else None
                fit['mark_to_start_ms'] = round(fit['start_ms'] - (mk[-1]['t'] - t0), 1) if mk else None
                segs.append(fit)
            i = j
        i += 1
    OUT[name] = {'load': S['load'], 'frames': frames_dt(rows), 'marks': [{'m': m['m'], 'ms': round(m['t'] - t0, 1)} for m in S.get('marks', [])], 'segments': segs}
    return T

def autoplay_fill(T):
    """fill (::after) as a fraction of the current link's width vs time, on rows where the current
    link is at full capsule width (not mid-transition): linear fit -> time for 0 -> 115 %."""
    out = []
    by = {}
    for x in T:
        if x['fill_w'] is None or 'playing' not in x['gCls'] or x['cur'] < 0:
            continue
        lw = x[f"w{x['cur']}"]
        if lw < max(x[f'w{d}'] for d in range(7)) - 0.01:
            continue
        by.setdefault(x['cur'], []).append((x['ms'], x['fill_w'] / lw, lw))
    for cur, pts in by.items():
        ts = np.array([p[0] for p in pts]); pc = np.array([p[1] for p in pts])
        m = (pc > 0.16) & (pc < 1.14)
        if m.sum() < 10:
            continue
        a, b = np.polyfit(ts[m], pc[m], 1)
        resid = pc[m] - (a * ts[m] + b)
        out.append({'slide': cur, 'link_w': pts[0][2], 'pct_per_s': round(a * 1000 * 100, 3), 'implied_0_to_115pct_s': round(1.15 / (a * 1000), 3),
                    'visible_fill_start_s': round(0.15 / (a * 1000), 3), 'rms_pct': round(float(np.sqrt(np.mean(resid ** 2))) * 100, 3),
                    'pct_range': [round(float(pc.min()), 4), round(float(pc.max()), 4)], 'ms_span': [float(ts[0]), float(ts[-1])]})
    return out

for n in ('init-slow', 'init-fast', 'init-below', 'mobile'):
    try:
        intro(n)
    except Exception as e:
        OUT[n] = {'error': repr(e)}
for n in ('autoplay', 'dotclick', 'retarget', 'playpause', 'hoverdot', 'keyboard', 'wheel-x', 'touch', 'ended', 'resize', 'reduced', 'replay'):
    try:
        T = transitions(n)
        if n in ('autoplay', 'ended') and T:
            OUT[n]['fill'] = autoplay_fill(T)
    except Exception as e:
        OUT[n] = {'error': repr(e)}
json.dump(OUT, open(os.path.join(D, 'analysis.json'), 'w'), indent=1)
print(json.dumps(OUT, indent=1)[:20000])
