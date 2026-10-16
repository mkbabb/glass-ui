"""CRITIQUE re-derivation of reference numbers straight from samples/timeline-*.csv
(the study's committed per-frame tables). Output: critique/data/rederive-ref.json.

usage: python3 -I critique/tools/rederive_ref.py
"""
import csv, json, os, math

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, '..', '..'))
S = os.path.join(ROOT, 'samples')
OUT = os.path.join(ROOT, 'critique', 'data')


def rows(name):
    with open(os.path.join(S, name)) as fh:
        out = []
        for r in csv.DictReader(fh):
            out.append({k: (float(v) if v not in ('', 'nan') and _isnum(v) else v) for k, v in r.items()})
        return out


def _isnum(v):
    try:
        float(v)
        return True
    except Exception:
        return False


res = {}

# ---- intro (P-05, P-07/R-01) ------------------------------------------------------
for sc in ('init-slow', 'init-fast', 'init-below'):
    R = rows('timeline-%s.csv' % sc)
    act = [r for r in R if r['activated'] == 1.0]
    a0 = act[0]
    t0 = a0['ms']
    ys = [(r['ms'], r['aap_y']) for r in act]
    ymin = min(ys, key=lambda x: x[1])
    # settle to 0.5 px: last frame |y| >= 0.5
    last = max(t for t, y in ys if abs(y) >= 0.5)
    first_frames = [(round(r['ms'] - t0, 1), r['intro_op'], r['intro_disp'], r['bg0_op'], r['bg0_vis_w'], r['bg0_vis_h'], r['intro_w'], r['intro_h'], r['intro_scale']) for r in act[:6]]
    hide = next((r for r in act if r['intro_disp'] == 'none'), None)
    res['intro:' + sc] = {'activated_t_ms': t0, 'rise_min_px': ymin[1], 'rise_min_at_ms': round(ymin[0] - t0, 1),
                          'overshoot_pct': round(-ymin[1] / 180 * 100, 2), 'settle_0p5_ms': round(last - t0, 1),
                          'first_frames_ms_introOp_disp_bg0Op_visW_visH_introW_H_scale': first_frames,
                          'blob_hidden_ms': round(hide['ms'] - t0, 1) if hide else None}

# ---- autoplay (P-20 fill rate, R-03 hold, P-17 dot sum, P-21 shape, P-24 cadence) -----
R = rows('timeline-autoplay.csv')
# current-dot switches
sw = [R[i]['ms'] for i in range(1, len(R)) if R[i]['cur'] != R[i - 1]['cur']]
res['autoplay:switch_ms'] = sw
res['autoplay:cadence_ms'] = [round(sw[i + 1] - sw[i], 1) for i in range(len(sw) - 1)]
# fill rate on a resting 48 px link: fit fill_w vs ms where the current dot's width is 48
seg = [r for r in R if r['ms'] > sw[0] + 1200 and r['ms'] < sw[1] - 1200 and isinstance(r['fill_w'], float)]
n = len(seg)
mx = sum(r['ms'] for r in seg) / n; my = sum(r['fill_w'] for r in seg) / n
slope = sum((r['ms'] - mx) * (r['fill_w'] - my) for r in seg) / sum((r['ms'] - mx) ** 2 for r in seg)
res['autoplay:fill_px_per_s'] = round(slope * 1000, 3)
res['autoplay:fill_pct_per_s_of_48'] = round(slope * 1000 / 48 * 100, 3)
# hold: the fill at max (>= 1.15*48 - 0.05) until the switch
for k, s in enumerate(sw[:2]):
    prev = [r for r in R if r['ms'] < s]
    fmax = max(r['fill_w'] for r in prev[-400:] if isinstance(r['fill_w'], float))
    full = next(r for r in prev[-400:] if isinstance(r['fill_w'], float) and r['fill_w'] >= fmax - 0.05)
    res['autoplay:hold_%d' % k] = {'fill_max_px': fmax, 'full_from_ms': full['ms'], 'switch_ms': s, 'hold_ms': round(s - full['ms'], 1)}
# dot sum
ds = [r['dotsum'] for r in R if isinstance(r['dotsum'], float) and r['ms'] > 2000]
res['autoplay:dotsum_range'] = [min(ds), max(ds)]
# tween shape: first advance, progress at 25/50/75 % of the motion's span (0.5 px thresholds)
mv = [r for r in R if sw[0] - 50 <= r['ms'] <= sw[0] + 1400]
v0 = mv[0]['sl']; vf = mv[-1]['sl']
st = next(i for i, r in enumerate(mv) if abs(r['sl'] - v0) > 0.5)
en = max(i for i, r in enumerate(mv) if abs(r['sl'] - vf) >= 0.5)
ta, tb = mv[st - 1]['ms'], mv[en]['ms']
def prog(f):
    tt = ta + f * (tb - ta)
    r = min(mv, key=lambda q: abs(q['ms'] - tt))
    return round((r['sl'] - v0) / (vf - v0), 3)
res['autoplay:tween_first_advance'] = {'span': [v0, vf], 'dur_ms': round(tb - ta, 1), 'prog_25_50_75': [prog(.25), prog(.5), prog(.75)]}
# the dead start: visible fill begins (fill_w > 0.15 * link) after the switch
for k, s in enumerate(sw[:2]):
    after = [r for r in R if r['ms'] >= s and isinstance(r['fill_w'], float)]
    vis = next((r for r in after if r['fill_w'] > 0.15 * 48 + 0.05), None)
    res['autoplay:visible_fill_after_switch_%d_ms' % k] = round(vis['ms'] - s, 1) if vis else None

json.dump(res, open(os.path.join(OUT, 'rederive-ref.json'), 'w'), indent=1, default=str)
print(json.dumps(res, indent=1, default=str)[:6000])
