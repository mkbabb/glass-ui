"""Bubble element translateX (pill, button) and dot offsets inside the pill, per intro run; onset, extreme, settle, damped-spring fit.
dot offset_i(t) = (lx_i - pill_element_x)(t) - same at rest, so the pill's own slide and the content re-centring cancel for dot 0.
usage: python3 -I tools/xsprings.py -> data/xsprings.json
"""
import glob, json, os, re, math
import numpy as np
from scipy.optimize import curve_fit
D = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'data')
tx = lambda m: float(re.match(r'matrix\(([^)]*)\)', m).group(1).split(',')[4]) if m and m.startswith('matrix') else 0.0
def resp(t, a, w, c1, c2): return np.exp(-a * t) * (c1 * np.cos(w * t) + c2 * np.sin(w * t))
def crit(t, w, c1, c2): return np.exp(-w * t) * (c1 + c2 * t)
out = {}
for n in sorted(glob.glob(f'{D}/intro-*-r*-*.json')):
    d = json.load(open(n)); F = d['frames']; a = next((f for f in F if 'activated' in f['cls']), None)
    if not a: continue
    rest = F[-1]; ta = a['t']; res = {}
    ser = {'pill_tx': lambda f: tx(f['wrapD']['tf']), 'button_tx': lambda f: tx(f['wrapB']['tf']),
           'dot0_off': lambda f: (f['lx'][0] - f['wrapD']['x']) - (rest['lx'][0] - rest['wrapD']['x']),
           'dot6_off': lambda f: (f['lx'][6] - f['lx'][5]) - (rest['lx'][6] - rest['lx'][5])}
    for k, fn in ser.items():
        t = np.array([f['t'] - ta for f in F if f['t'] >= ta]); x = np.array([fn(f) for f in F if f['t'] >= ta])
        mv = np.where(np.abs(x - x[0]) > 0.05)[0]
        if not len(mv): res[k] = {'static': float(x[0])}; continue
        i0 = max(mv[0] - 1, 0); tt = (t[i0:] - t[i0]) / 1000; xx = x[i0:]
        r = {'from': round(float(x[0]), 2), 'onset_ms': round(float(t[i0]), 1), 'extreme_past_0': round(float(xx.min() if x[0] > 0 else xx.max()), 3),
             'settle_0p5_ms': round(float(max(t[i0:][np.abs(xx) > 0.5], default=t[i0])), 1)}
        try:
            p, _ = curve_fit(resp, tt, xx, p0=[10, 5, x[0], 0], maxfev=20000); w0 = math.hypot(p[0], p[1])
            r['fit_underdamped'] = {'omega0': round(w0, 2), 'zeta': round(p[0] / w0, 3), 'rms': round(float(np.sqrt(np.mean((resp(tt, *p) - xx) ** 2))), 3)}
        except Exception as e: r['fit_underdamped'] = str(e)[:60]
        try:
            q, _ = curve_fit(crit, tt, xx, p0=[10, x[0], 0], maxfev=20000)
            r['fit_critical'] = {'omega0': round(float(q[0]), 2), 'rms': round(float(np.sqrt(np.mean((crit(tt, *q) - xx) ** 2))), 3)}
        except Exception as e: r['fit_critical'] = str(e)[:60]
        res[k] = r
    out[os.path.basename(n)[:-5]] = res
json.dump(out, open(f'{D}/xsprings.json', 'w'), indent=1)
for k, v in out.items(): print(k, json.dumps(v))
