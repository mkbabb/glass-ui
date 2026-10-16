"""Fit monotone intro channels with (a) cubic-bezier + free duration and (b) a damped spring (any zeta).
usage: python3 -I tweenfit.py data/<intro>.csv  -> JSON on stdout
"""
import csv, json, sys
import numpy as np
from scipy.optimize import least_squares

def bez(q, xs):
    x1, y1, x2, y2 = q; s = np.linspace(0, 1, 2001)
    bx = 3*(1-s)**2*s*x1 + 3*(1-s)*s**2*x2 + s**3; by = 3*(1-s)**2*s*y1 + 3*(1-s)*s**2*y2 + s**3
    return np.interp(np.clip(xs, 0, 1), bx, by)

def spring(w0, z, tau):  # unit step response from rest, x: 0 -> 1
    if z < 1:
        wd = w0*np.sqrt(1-z*z); return 1 - np.exp(-z*w0*tau)*(np.cos(wd*tau) + z*w0/wd*np.sin(wd*tau))
    if abs(z-1) < 1e-6: return 1 - np.exp(-w0*tau)*(1 + w0*tau)
    r1 = -w0*(z - np.sqrt(z*z-1)); r2 = -w0*(z + np.sqrt(z*z-1))
    return 1 - (r2*np.exp(r1*tau) - r1*np.exp(r2*tau))/(r2 - r1)

R = list(csv.DictReader(open(sys.argv[1])))
out = {}
for k in ('dBlur', 'dBgA', 'bScale', 'dScale', 'introScale', 'btnScale', 'btnOp', 'li0Op'):
    pts = [(float(r['t']), float(r[k])) for r in R if r[k] not in ('', 'None') and float(r['t']) >= 0 and (not k.startswith('intro') or r['introDisp'] == 'block')]
    t = np.array([p[0] for p in pts]); x = np.array([p[1] for p in pts])
    x0, x1 = x[0], x[-1]
    p = (x - x0)/(x1 - x0)
    i0 = max(np.where(p > 0.005)[0][0] - 1, 0); t0 = t[i0]
    tt = t[i0:] - t0; pp = p[i0:]
    b = least_squares(lambda q: bez(q[:4], tt/q[4]) - pp, [.3, 0, .3, 1, 400], bounds=([0, -1, 0, 0, 30], [1, 2, 1, 2, 4000]))
    s = least_squares(lambda q: spring(q[0], q[1], tt/1000) - pp, [10, 1], bounds=([0.5, 0.05], [80, 5]))
    out[k] = {'onset_ms': round(float(t0), 1), 'from': x0, 'to': x1,
              'bezier': {'p': [round(float(v), 3) for v in b.x[:4]], 'dur_ms': round(float(b.x[4]), 1), 'rms': round(float(np.sqrt(np.mean(b.fun**2))), 4)},
              'spring': {'omega0': round(float(s.x[0]), 2), 'zeta': round(float(s.x[1]), 3), 'rms': round(float(np.sqrt(np.mean(s.fun**2))), 4)}}
print(json.dumps(out, indent=1))
