"""Extra readings: slide flatness, reduced-motion click, precise intro event times, bubble/dot x springs,
hand-off continuity, fill hold, click latency, capsule-vs-scroll lag, caption cross-fade at given p.
usage: python3 -I tools/extras.py  (from remeasure/) -> data/extras.json
"""
import glob, json, re, os
import numpy as np
D = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'data')
J = lambda n: json.load(open(f'{D}/{n}.json'))
out = {}

# --- slides flat? -----------------------------------------------------------
for r in ('r1', 'r2'):
    d = J(f'slides-{r}-1440'); S = d['slides']
    styles = {json.dumps([x[1:] for x in f['s']]) for f in S}
    xs = np.array([[f['sl']] + [x[0] for x in f['s']] for f in S])
    moving = np.ptp(xs[:, 0]) > 50
    # slide x + scrollLeft should be constant if slides only translate with the strip
    inv = [float(np.ptp(xs[:, 0] + xs[:, k])) for k in (1, 2, 3)]
    out[f'slides/{r}'] = {'frames': len(S), 'scroll_range': [float(xs[:, 0].min()), float(xs[:, 0].max())], 'distinct_style_tuples': len(styles),
                          'style_example': json.loads(next(iter(styles)))[0], 'x_plus_scroll_ptp_px': [round(v, 2) for v in inv], 'moved': bool(moving), 'load': d['meta']['loadStart']}

# --- reduced-motion click --------------------------------------------------------
for r in ('r1', 'r2'):
    d = J(f'reduced-click-{r}-1440'); F = d['frames']; tp, tc = d['tPlay'], d['tClick']
    def seq(key, t0):
        o = []; p = None
        for f in F:
            v = key(f)
            if v != p: o.append((round(f['t'] - t0, 1), v))
            p = v
        return o
    fill = [(f['t'] - tp, f['aw'] / (1.15 * f['lw'][f['cur']]) if f['aw'] else None, f['aPlay']) for f in F if f['t'] > tp]
    run = [(t, v) for t, v, s in fill if s == 'running' and v and v > 0.16 and t < tc - tp]
    k = np.polyfit([a for a, _ in run], [b for _, b in run], 1)[0] * 1000 * 100 if len(run) > 10 else None
    sl = seq(lambda f: round(f['sl']), tc)
    caps = seq(lambda f: tuple(f['lw']), tc)
    out[f'reduced-click/{r}'] = {'glyph': seq(lambda f: f['glyph'], tp)[:4], 'fill_rate_pct_per_s': round(k, 2) if k else None,
                                 'scroll_after_click': sl[:6], 'scroll_changes': len(sl) - 1, 'capsule_states_after_click': [c for c in caps if c[0] >= 0][:4],
                                 'ap_values': sorted({f['ap'] for f in F})[:8]}

# --- intro precise events (from the csv tables) ------------------------------------
import csv
def rows(n):
    R = list(csv.DictReader(open(f'{D}/{n}.csv')))
    f = lambda v: None if v in ('', 'None') else (float(v) if re.match(r'^-?[\d.]+(e-?\d+)?$', v) else v)
    return [{k: f(v) for k, v in r.items()} for r in R]
ev = {}
for n in sorted(glob.glob(f'{D}/intro-*-r*-*.csv')):
    name = os.path.basename(n)[:-4]; R = rows(name)
    R = [r for r in R if r['t'] >= 0]
    if not R: continue
    first = lambda pred: next((r['t'] for r in R if pred(r)), None)
    last_out = lambda key, target, tol: max((r['t'] for r in R if r[key] is not None and abs(r[key] - target) > tol), default=None)
    ev[name] = {'blob_hidden_ms': first(lambda r: r['introDisp'] == 'none'), 'pill_w_first_change_ms': first(lambda r: r['dW'] is not None and abs(r['dW'] - 40) > 0.01),
                'pill_scale_first_change_ms': first(lambda r: r['dScale'] is not None and r['dScale'] < 1.2999),
                'btn_bg_scale_first_nonzero_ms': first(lambda r: r['bScale'] and r['bScale'] > 0.001), 'dots_first_opacity_ms': first(lambda r: r['li0Op'] and r['li0Op'] > 0.001),
                'glyph_first_opacity_ms': first(lambda r: r['btnOp'] and r['btnOp'] > 0.001), 'glyph_scale_reaches_1_ms': first(lambda r: r['btnScale'] and r['btnScale'] >= 0.9999),
                'frost_first_ms': first(lambda r: r['dBlur'] < 13.999), 'blur_at_1655': next((r['dBlur'] for r in R if r['t'] >= 1655), None),
                'rise_settle_0p5px_ms': last_out('aapY', 0, 0.5), 'pill_w_settle_0p5px_ms': last_out('dW', 240, 0.5), 'capsule_peak_px': max(r['capW'] for r in R),
                'capsule_settle_0p05px_ms': last_out('capW', 48, 0.05), 'blob_w_peak': max((r['introW'] or 0) for r in R), 'blob_h_min': min((r['introH'] or 999) for r in R),
                'blob_scale_last_visible': min((r['introScale'] for r in R if r['introDisp'] == 'block'), default=None),
                'first_visible_ms': first(lambda r: r['introOp'] > 0 and r['introDisp'] == 'block' and False)}
out['intro_events'] = ev

# --- bubble x, dot x, and hand-off continuity (raw frames) --------------------------
hx = {}
for n in sorted(glob.glob(f'{D}/intro-*-r*-*.json')):
    name = os.path.basename(n)[:-5]; d = json.load(open(n)); F = d['frames']
    a = next((f for f in F if 'activated' in f['cls']), None)
    if not a: continue
    ta = a['t']; rest = F[-1]
    # element x offsets relative to rest, with the dock's own x removed (the dock never moves in x)
    bx = [(f['t'] - ta, f['wrapB']['x'] - rest['wrapB']['x']) for f in F if f['t'] >= ta]
    dx0 = [(f['t'] - ta, f['lx'][0] - rest['lx'][0]) for f in F if f['t'] >= ta]
    dx6 = [(f['t'] - ta, f['lx'][6] - rest['lx'][6]) for f in F if f['t'] >= ta]
    def onset(seq):
        v0 = seq[0][1]; return next((round(t, 1) for t, v in seq if abs(v - v0) > 0.05), None)
    # visual widths around the blob->pill swap
    vis = []
    for f in F:
        if f['t'] < ta: continue
        mi = re.match(r'matrix\(([^)]*)\)', f['intro']['tf'] or '')
        sc = float(mi.group(1).split(',')[0]) if mi else None
        iw = re.search(r'width:\s*([\d.]+)', f['intro']['st'] or ''); ih = re.search(r'height:\s*([\d.]+)', f['intro']['st'] or '')
        ds = re.search(r'--scale:\s*([\d.]+)', f['bgD']['st'] or '')
        vis.append((f['t'] - ta, f['intro']['disp'], f['intro']['op'], float(iw.group(1)) * sc if iw and sc else None, float(ih.group(1)) * sc if ih and sc else None,
                    f['bgD']['op'], f['bgD']['w'], f['bgD']['h'], f['intro']['x'] + f['intro']['w'] / 2, f['bgD']['x'] + f['bgD']['w'] / 2, f['intro']['y'] + f['intro']['h'] / 2, f['bgD']['y'] + f['bgD']['h'] / 2))
    k = next(i for i, v in enumerate(vis) if v[1] == 'none')
    before, after = vis[k - 2:k], vis[k:k + 2]
    def vel(a, b, i):
        return round((b[i] - a[i]) / (b[0] - a[0]) * 1000, 1) if a[i] is not None and b[i] is not None else None
    hx[name] = {'button_x_offset_first_frame': round(bx[0][1], 2), 'button_x_onset_ms': onset(bx), 'button_x_min': round(min(v for _, v in bx), 2),
                'button_x_settle_0p5_ms': max((round(t, 1) for t, v in bx if abs(v) > 0.5), default=None),
                'dot0_x_offset_first': round(dx0[0][1], 2), 'dot0_x_onset_ms': onset(dx0), 'dot6_x_onset_ms': onset(dx6), 'dot0_x_min': round(min(v for _, v in dx0), 2), 'dot6_x_min': round(min(v for _, v in dx6), 2),
                'swap': {'last_blob_frame': {'t': round(before[-1][0], 1), 'vis_w': before[-1][3] and round(before[-1][3], 2), 'vis_h': before[-1][4] and round(before[-1][4], 2), 'cx': round(before[-1][8], 2), 'cy': round(before[-1][10], 2),
                                             'blob_w_velocity_px_s': vel(before[0], before[1], 3)},
                         'first_pill_only_frame': {'t': round(after[0][0], 1), 'pill_box_w': after[0][6], 'pill_box_h': after[0][7], 'cx': round(after[0][9], 2), 'cy': round(after[0][11], 2),
                                                   'pill_w_velocity_px_s': vel(after[0], after[1], 6)}}}
out['intro_x_and_swap'] = hx

# --- autoplay: fill hold before switch, cadence; click latency; capsule lag --------
ap = {}
for r in ('r1', 'r2'):
    d = J(f'autoplay-{r}-1440'); F = d['frames']; t0 = F[0]['t']
    sw = [(F[i]['t'] - t0) for i in range(1, len(F)) if F[i]['cur'] != F[i - 1]['cur']]
    holds = []
    for i in range(1, len(F)):
        if F[i]['cur'] != F[i - 1]['cur']:
            seg = [f for f in F[:i] if f['cur'] == F[i - 1]['cur']]
            full = next((f['t'] - t0 for f in seg if f['aw'] and f['aw'] >= 0.999 * 1.15 * 48), None)
            holds.append({'switch_ms': round(F[i]['t'] - t0, 1), 'fill_full_ms': round(full, 1) if full else None, 'hold_ms': round(F[i]['t'] - t0 - full, 1) if full else None})
    # capsule lag: compare ap with sl/1280 at the same frame and one frame earlier
    e0 = []; e1 = []
    for i in range(1, len(F)):
        if F[i]['ap'] and 1 < F[i]['sl'] < 7679 and abs(F[i]['sl'] - F[i - 1]['sl']) > 0.5:
            a = float(F[i]['ap']); e0.append(abs(a - F[i]['sl'] / 1280)); e1.append(abs(a - F[i - 1]['sl'] / 1280))
    ap[r] = {'switch_ms': [round(s, 1) for s in sw], 'cadence_ms': [round(b - a, 1) for a, b in zip(sw, sw[1:])], 'holds': holds,
             'ap_err_same_frame_max': round(max(e0), 4) if e0 else None, 'ap_err_prev_frame_max': round(max(e1), 4) if e1 else None,
             'dots_enlarged_max': max(sum(1 for w in f['lw'] if w > 8.05) for f in F), 'load': d['meta']['loadStart']}
for r in ('r1', 'r2'):
    d = J(f'click-{r}-1440'); F = d['frames']
    ap[f'click-{r}'] = {'dots_enlarged_max': max(sum(1 for w in f['lw'] if w > 8.05) for f in F),
                        'enlarged_sequence': [i for i, f in enumerate(F) if False], 'load': d['meta']['loadStart']}
    seqs = []
    for f in F:
        en = tuple(i for i, w in enumerate(f['lw']) if w > 8.05)
        if not seqs or seqs[-1] != en: seqs.append(en)
    ap[f'click-{r}']['enlarged_sets_in_order'] = seqs
out['autoplay_extra'] = ap

# --- caption cross-fade at p = 0.2 / 0.53 / 0.8 ------------------------------------
cx = {}
for r in ('r1', 'r2'):
    F = J(f'autoplay-{r}-1440')['frames']
    pts = [(f['sl'] / 1280, f['cap'][0][1], f['cap'][1][1]) for f in F if 0 < f['sl'] < 1280]
    if pts:
        p = np.array(pts); o = np.argsort(p[:, 0]); p = p[o]
        cx[r] = {f'p={q}': {'out': round(float(np.interp(q, p[:, 0], p[:, 1])), 3), 'in': round(float(np.interp(q, p[:, 0], p[:, 2])), 3)} for q in (0.2, 0.53, 0.7, 0.8)}
out['caption_fade'] = cx
json.dump(out, open(f'{D}/extras.json', 'w'), indent=1, default=float)
print('ok')
