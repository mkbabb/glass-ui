"""Fit damped-oscillator responses to intro channels.
Model per channel, from onset t0:  x(tau) = T + exp(-a tau) * (C1 cos(w tau) + C2 sin(w tau))
-> omega0 = sqrt(a^2 + w^2) (rad/s), zeta = a / omega0, overshoot, peak time, 2 % settle.
Monotone channels (no overshoot) are reported with 10-90 % rise and total duration instead.
usage: python3 -I springfit.py data/intro-jump-r1-1440.csv [more csv ...]   -> JSON on stdout
"""
import csv, json, math, sys
import numpy as np
from scipy.optimize import curve_fit

CH = {  # channel: (label, value of the "at rest" target or None to take the last sample)
    'aapY': 'dock rise translateY px',
    'introW': 'origin blob width px', 'introH': 'origin blob height px', 'introScale': 'origin blob scale',
    'dW': 'dot-pill background width px', 'dH': 'dot-pill background height px', 'dScale': 'dot-pill --scale',
    'bW': 'button background width px', 'bScale': 'button background scale',
    'pi': '--progress-intro (capsule opening)', 'capW': 'capsule width px',
    'dBlur': 'pill backdrop blur px', 'dBgA': 'pill background alpha',
    'btnOp': 'glyph opacity', 'btnScale': 'glyph scale', 'li0Op': 'dot opacity',
}

def load(p):
    R = list(csv.DictReader(open(p)))
    def f(v):
        try: return float(v)
        except: return None
    return [{k: f(v) if k not in ('introDisp', 'cls') else v for k, v in r.items()} for r in R]

def resp(tau, T, a, w, c1, c2):
    return T + np.exp(-a * tau) * (c1 * np.cos(w * tau) + c2 * np.sin(w * tau))

def analyse(R, k):
    pts = [(r['t'], r[k]) for r in R if r[k] is not None and r['t'] >= 0]
    if k.startswith('intro'):  # the blob exists only until it is hidden
        pts = [(r['t'], r[k]) for r in R if r[k] is not None and r['introDisp'] == 'block' and r['t'] >= 0]
    if len(pts) < 5: return None
    t = np.array([p[0] for p in pts]); x = np.array([p[1] for p in pts])
    x0, xe = x[0], x[-1]
    span = np.max(np.abs(x - x0))
    if span < 1e-6: return {'static': float(x0)}
    moved = np.where(np.abs(x - x0) > 0.01 * span)[0]
    i0 = max(moved[0] - 1, 0); t0 = t[i0]
    tt = (t[i0:] - t0) / 1000.0; xx = x[i0:]
    T = xe; d = x0 - T
    out = {'from': round(float(x0), 3), 'to': round(float(T), 3), 'onset_ms': round(float(t0), 1)}
    ext = xx[np.argmax(np.abs(xx - x0))] if abs(d) < 1e-9 else (np.max(xx) if T > x0 else np.min(xx))
    over = (ext - T) / (T - x0) if abs(T - x0) > 1e-9 else None
    out['peak'] = round(float(ext), 3); out['peak_ms'] = round(float(t[i0 + int(np.argmax(np.abs(xx - x0)) if over is None else (np.argmax(xx) if T > x0 else np.argmin(xx)))]), 1)
    if over is not None: out['overshoot_pct'] = round(100 * float(over), 1)
    band = 0.02 * (abs(T - x0) if abs(T - x0) > 1e-9 else span)
    outside = np.where(np.abs(xx - T) > band)[0]
    out['settle2_ms'] = round(float(t0 + 1000 * tt[outside[-1]]), 1) if len(outside) else round(float(t0), 1)
    if abs(T - x0) > 1e-9:
        frac = (xx - x0) / (T - x0)
        a10 = np.where(frac >= 0.1)[0]; a90 = np.where(frac >= 0.9)[0]
        if len(a10) and len(a90): out['rise10_90_ms'] = round(1000 * float(tt[a90[0]] - tt[a10[0]]), 1)
    if over is not None and over > 0.005:
        try:
            p, _ = curve_fit(resp, tt, xx, p0=[T, 8, 15, x0 - T, 0], maxfev=40000)
            Tf, a, w, c1, c2 = p; w = abs(w)
            w0 = math.hypot(a, w)
            res = xx - resp(tt, *p)
            out['fit'] = {'omega0': round(w0, 2), 'zeta': round(a / w0, 3), 'stiffness_k': round(w0 * w0, 1), 'damping_c': round(2 * a, 2),
                          'period_ms': round(2000 * math.pi / w, 1), 'rms_resid': round(float(np.sqrt(np.mean(res ** 2))), 4),
                          'rel_rms': round(float(np.sqrt(np.mean(res ** 2)) / (abs(T - x0) or span)), 4)}
        except Exception as e:
            out['fit'] = {'error': str(e)[:80]}
    return out

if __name__ == '__main__':
    res = {}
    for p in sys.argv[1:]:
        R = load(p)
        res[p.split('/')[-1]] = {k: analyse(R, k) for k in CH}
    print(json.dumps(res, indent=1))
