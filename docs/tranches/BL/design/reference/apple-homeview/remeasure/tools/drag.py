"""Touch-drag legs: finger travel vs scroll travel (1:1 tracking), position at release, landing slide,
release->rest time, post-release curve, overscroll at the start edge, capsule slaving.
usage: python3 -I drag.py data/drag-rN-390.json -> JSON
"""
import json, sys
import numpy as np
d = json.load(open(sys.argv[1])); W = d['meta']['W']; out = {}
for L in d['legs']:
    F = L['frames']; t = np.array([f['t'] - L['t'] for f in F]); sl = np.array([f['sl'] for f in F])
    te = L['tEnd'] - L['t']; i_rel = int(np.searchsorted(t, te))
    stride = 342.0
    s0 = sl[0]; s_rel = sl[min(i_rel, len(sl) - 1)]
    moving = np.where(np.abs(np.diff(sl)) > 0.05)[0]
    t_rest = float(t[moving[-1] + 1]) if len(moving) else 0.0
    finger = abs(L['frac']) * W
    post = sl[i_rel:]; tp = t[i_rel:] - te
    v_rel = float((sl[i_rel] - sl[max(i_rel - 4, 0)]) / max(t[i_rel] - t[max(i_rel - 4, 0)], 1e-6) * 1000) if i_rel < len(sl) else None
    ap_err = max((abs(float(f['ap']) - f['sl'] / stride) for f in F if f['ap']), default=None)
    out[L['name']] = {'finger_px': round(finger, 1), 'finger_ms': L['ms'], 'scroll_at_release_px': round(float(s_rel - s0), 1), 'track_ratio': round(float((s_rel - s0) / (finger * np.sign(L['frac']))), 3) if finger else None,
                      'release_frac_of_stride': round(float((s_rel - s0) / stride), 3), 'landed_delta_slides': round(float((sl[-1] - s0) / stride), 3),
                      'release_to_rest_ms': round(t_rest - te, 1), 'scroll_v_at_release_px_s': round(v_rel, 1) if v_rel is not None else None,
                      'min_sl': round(float(sl.min()), 2), 'max_overshoot_past_land_px': round(float(np.max((post - sl[-1]) * np.sign(sl[-1] - s_rel + 1e-9))) if len(post) else 0, 2),
                      'ap_vs_scroll_max_err': round(ap_err, 4) if ap_err is not None else None,
                      'cur_seq': [c for i, c in enumerate([f['cur'] for f in F]) if i == 0 or c != F[i - 1]['cur']]}
print(json.dumps(out, indent=1))
