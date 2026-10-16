"""Independent check of the study's stated integrator claim (P-15): semi-implicit Euler, mass 1, dt 1/60 s,
with the study's stated k/c, against MY sampled curves. Free parameters: onset time only (grid, 0.5 ms).
Model values between steps are linearly interpolated. Reports RMS px (or units) per channel and run.
usage: python3 -I tools/integrator_check.py -> data/integrator-check.json
"""
import csv, glob, json, os
import numpy as np
D = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'data')
CH = {'aapY': (100, 8, 180, 0), 'introW': (100, 8, 30, 56), 'introH': (100, 8, 80, 56), 'dW': (100, 10, 40, 240), 'dH': (100, 10, 36, 56), 'bW': (100, 10, 80, 56), 'pi': (200, 20, 0, 1)}
def sim(k, c, x0, x1, T=3.0, dt=1 / 60):
    n = int(T / dt) + 1; x = x0; v = 0.0; xs = [x]
    for _ in range(n):
        a = -k * (x - x1) - c * v; v += a * dt; x += v * dt; xs.append(x)
    return np.arange(len(xs)) * dt * 1000, np.array(xs)
out = {}
for p in sorted(glob.glob(f'{D}/intro-*-r*-*.csv')):
    R = list(csv.DictReader(open(p))); name = os.path.basename(p)[:-4]; res = {}
    for ch, (k, c, x0, x1) in CH.items():
        pts = [(float(r['t']), float(r[ch])) for r in R if r[ch] not in ('', 'None') and float(r['t']) >= 0 and (not ch.startswith('intro') or r['introDisp'] == 'block')]
        if len(pts) < 10: continue
        t = np.array([a for a, _ in pts]); x = np.array([b for _, b in pts])
        if abs(x[0] - x0) > 0.05 * abs(x1 - x0) or np.ptp(x) < 1e-6: continue
        if not ch.startswith('intro'): x1 = round(float(x[-1]))  # rest target from the run itself (240 at 1440, 216 at 390)
        tm, xm = sim(k, c, x0, x1)
        best = None
        for on in np.arange(-50, 900, 0.5):
            tt = t - on; m = tt >= 0
            if m.sum() < 10: continue
            pred = np.interp(tt[m], tm, xm); pre = x[~m]
            err = np.concatenate([pred - x[m], pre - x0])
            rms = float(np.sqrt(np.mean(err ** 2)))
            if best is None or rms < best[0]: best = (rms, on, float(np.max(np.abs(err))))
        res[ch] = {'k': k, 'c': c, 'target': x1, 'onset_ms': best[1], 'rms': round(best[0], 3), 'max_abs': round(best[2], 3)}
    out[name] = res
json.dump(out, open(f'{D}/integrator-check.json', 'w'), indent=1)
for k, v in out.items(): print(k, {a: (b['rms'], b['max_abs'], b['onset_ms']) for a, b in v.items()})
