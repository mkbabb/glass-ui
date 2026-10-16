"""CRITIQUE re-derivation: reads the committed raw samples under gap/data, samples/ and
remeasure/data directly (never the reports' prose or the gap summary.json) and prints the
numbers CRITIQUE.md cites. Output: critique/data/rederive.json.

usage: python3 -I critique/tools/rederive.py
"""
import gzip, json, os, glob, re, math, csv

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, '..', '..'))
G = os.path.join(ROOT, 'gap', 'data')
OUT = os.path.join(ROOT, 'critique', 'data')
os.makedirs(OUT, exist_ok=True)


def L(name):
    return json.load(gzip.open(os.path.join(G, name)))


def mark(d, n):
    return next(t for k, t in d['marks'] if k == n)


def num(s):
    try:
        return float(s)
    except Exception:
        return None


def wc(r):
    return (r['bA'][0] + r['bA'][2] / 2 + r['bB'][0] + r['bB'][2] / 2) / 2


res = {}

# ---- rest geometry (P-16, P-01/P-02) ------------------------------------------------
for f in ('rest-r1-1440', 'rest-r2-1440', 'rest-r1-390', 'rest-r2-390'):
    d = L(f + '.json.gz')
    r = d['rows'][-1]
    pipw = d['anatomy']['pips'][0]['w']
    res['rest:' + f] = {'ring': r['ring'], 'bodyA': r['bA'], 'worm_w': r['ww'], 'pip_w': pipw,
                        'ratio_active_to_pip': r['ww'] / float(pipw.replace('px', '')),
                        'pager_shadow_layers': d['anatomy']['pager']['shadow'].count('px 0px') + d['anatomy']['pager']['shadow'].count('6px -2px'),
                        'pager_bf': d['anatomy']['pager']['bf'], 'pager_filter': d['anatomy']['pager']['filter'],
                        'body_filters': [b['filter'] for b in d['anatomy']['bodies']],
                        'distinct_ring_wh': len(set(tuple(x['ring'][2:]) for x in d['rows']))}

# ---- dark (P-37) ---------------------------------------------------------------------
for f in ('dark-r1-1440', 'dark-r2-1440'):
    d = L(f + '.json.gz')
    res['dark:' + f] = {'bg': d['anatomy']['pager']['bg'], 'shadow': d['anatomy']['pager']['shadow']}

# ---- P-18 neck paint, P-22 latency, worm hop durations (click, worm-hero) -----------
for f in ('click-r1-1440', 'click-r2-1440', 'worm-hero-r1-1440', 'worm-hero-r2-1440'):
    d = L(f + '.json.gz')
    rows = d['rows']
    names = [m[0] for m in d['marks']]
    per = {}
    for i, n in enumerate(names):
        t0 = mark(d, n)
        t1 = d['marks'][i + 1][1] if i + 1 < len(names) else rows[-1]['t']
        seg = [r for r in rows if t0 <= r['t'] <= t1]
        c0 = seg[0]['cur']
        w0 = wc(seg[0])
        first_worm = next((r for r in seg if abs(wc(r) - w0) > 0.3), None)
        flip = next((r for r in seg if r['cur'] != c0), None)
        neck = [r['nk'][2] for r in seg if num(r['nkOp']) and num(r['nkOp']) > 0]
        neck_frames = [r for r in seg if num(r['nkOp']) and num(r['nkOp']) > 0]
        wf = wc(seg[-1])
        last_moving = None
        for r in seg:
            if abs(wc(r) - wf) > 0.5:
                last_moving = r
        sls = set(r['sl'] for r in seg)
        per[n] = {'cur': [c0, seg[-1]['cur']], 'worm_first_ms': round(first_worm['t'] - t0, 1) if first_worm else None,
                  'cur_flip_ms': round(flip['t'] - t0, 1) if flip else None,
                  'neck_max_w': max(neck) if neck else 0, 'neck_visible_ms': round(neck_frames[-1]['t'] - neck_frames[0]['t'], 1) if neck_frames else 0,
                  'ring_w': seg[0]['ring'][2],
                  'hop_ms_to_0p5px': round(last_moving['t'] - first_worm['t'], 1) if (last_moving and first_worm) else None,
                  'peak_stretch': max(num(r['str']) or 1 for r in seg),
                  'strip_scrollLeft_values': sorted(sls)[:6], 'strip_moved': len(sls) > 1,
                  'overshoot_px': None}
        # overshoot of worm centre past its final value
        if first_worm:
            span = wf - w0
            prog = [(wc(r) - w0) / span for r in seg if span]
            per[n]['overshoot_px'] = round(max(0, max(prog) - 1) * abs(span), 3) if prog else None
    res['click:' + f] = per

# ---- P-23 / R-02 worm retarget: midpoint velocity around click4 ---------------------
for f in ('retarget-r1-1440', 'retarget-r2-1440'):
    d = L(f + '.json.gz')
    rows = d['rows']
    tb = mark(d, 'click4')
    ar = [r for r in rows if tb - 40 <= r['t'] <= tb + 200]
    v = [(round(ar[i]['t'] - tb, 1), round((wc(ar[i + 1]) - wc(ar[i])) / ((ar[i + 1]['t'] - ar[i]['t']) / 1000)), round(wc(ar[i + 1]) - wc(ar[i]), 2), ar[i + 1]['cur'], ar[i + 1]['nk'][2] if num(ar[i+1]['nkOp']) else 0) for i in range(len(ar) - 1)]
    fin = [r for r in rows if r['t'] > tb + 1800]
    # sign changes in midpoint velocity after the retarget
    vv = [x[1] for x in v if x[0] >= 0]
    flips = sum(1 for i in range(1, len(vv)) if vv[i] * vv[i - 1] < 0 and abs(vv[i]) > 20 and abs(vv[i - 1]) > 20)
    res['retarget:' + f] = {'worm_v_trace_ms_v_dx_cur_neck': v[:30], 'final_cur': fin[0]['cur'] if fin else None,
                            'final_sl': fin[0]['sl'] if fin else None, 'velocity_sign_flips_after_click4': flips,
                            'strip_values': sorted(set(r['sl'] for r in rows))[:5]}

# ---- P-21 / P-21a smooth scroll ------------------------------------------------------
def seg_motion(rows, t0, t1, key='sl', eps=0.5):
    s = [r for r in rows if t0 <= r['t'] <= t1]
    v0 = s[0][key]; vf = s[-1][key]
    st = next((r for r in s if abs(r[key] - v0) > eps), None)
    if not st:
        return None
    last = None
    for r in s:
        if abs(r[key] - vf) >= eps:
            last = r
    i = s.index(st)
    pre = s[i - 1]
    vel = [abs(s[k + 1][key] - s[k][key]) / ((s[k + 1]['t'] - s[k]['t']) / 1000) for k in range(len(s) - 1)]
    span = vf - v0
    over = max(0, max((r[key] - v0) / span for r in s) - 1) * abs(span) if span else 0
    # normalised progress at 25/50/75 % of duration (shape check against easeInOutQuad)
    t_a, t_b = pre['t'], last['t'] if last else st['t']
    def prog_at(f):
        tt = t_a + f * (t_b - t_a)
        r = min(s, key=lambda q: abs(q['t'] - tt))
        return round((r[key] - v0) / span, 3) if span else None
    return {'v0': v0, 'vf': vf, 'latency_ms': round(st['t'] - t0, 1), 'dur_ms': round(t_b - t_a, 1), 'peak_v': round(max(vel)),
            'overshoot_px': round(over, 2), 'prog_25_50_75': [prog_at(.25), prog_at(.5), prog_at(.75)]}


for f in ('smooth-r1-1440', 'smooth-r2-1440'):
    d = L(f + '.json.gz')
    rows = d['rows']
    out = []
    for i, (n, t0) in enumerate(d['marks']):
        t1 = d['marks'][i + 1][1] if i + 1 < len(d['marks']) else rows[-1]['t']
        m = seg_motion(rows, t0, t1)
        lag = sorted(set(r['it'][r['cur']][3] if r.get('cur', -1) >= 0 else '' for r in rows if t1 - 40 <= r['t'] <= t1))
        out.append([n, m, {'cur_at_end': [r['cur'] for r in rows if r['t'] <= t1][-1]}])
    # pitch
    it = rows[0]['it']
    res['smooth:' + f] = {'moves': out}

# easeInOutQuad reference progress at 25/50/75 % of time
def eioq(x):
    return 2 * x * x if x < .5 else 1 - (-2 * x + 2) ** 2 / 2
res['easeInOutQuad_25_50_75'] = [eioq(.25), eioq(.5), eioq(.75)]

# ---- pager-next (P-23 strip, P-22 strip latency) -------------------------------------
for f in ('pager-next-r1-1440', 'pager-next-r2-1440'):
    d = L(f + '.json.gz')
    rows = d['rows']
    ta = mark(d, 'next3a')
    seg = [r for r in rows if r['t'] >= ta]
    v = [round((seg[i + 1]['sl'] - seg[i]['sl']) / ((seg[i + 1]['t'] - seg[i]['t']) / 1000)) for i in range(len(seg) - 1)]
    # minimum velocity between first motion and final settle
    first = next(i for i, x in enumerate(v) if abs(x) > 5)
    lastm = max(i for i, x in enumerate(v) if abs(x) > 5)
    t1 = mark(d, 'next1')
    res['pager-next:' + f] = {'next1': seg_motion(rows, t1, ta), 'next3_start_sl': seg[0]['sl'], 'next3_final_sl': seg[-1]['sl'],
                              'next3_min_v_in_flight': min(abs(x) for x in v[first:lastm + 1]),
                              'next3_zero_v_frames_in_flight': sum(1 for x in v[first:lastm + 1] if abs(x) < 1),
                              'worm_first_ms_next1': None}

# ---- autoplay: member scale range, lag residue (P-25, P-26) --------------------------
def lag_at_rest(rows):
    out = []
    for r in rows:
        for it in r.get('it', []):
            if it[3] not in ('', 'none', '0%', '0px'):
                out.append(it[3])
    return out

for f in ('smooth-r1-1440', 'smooth-r2-1440', 'drag-fling-r1-390', 'drag-fling-r2-390', 'autoplay-r1-1440', 'autoplay-r2-1440'):
    d = L(f + '.json.gz')
    rows = d['rows']
    sc = [num(it[1].split()[0]) if it[1] != 'none' else 1 for r in rows for it in r['it']]
    tail = rows[-60:]  # last ~0.5 s, strip at rest
    still = len(set(r['sl'] for r in tail)) == 1
    lags = sorted(set(it[3] for r in tail for it in r['it']))
    res['members:' + f] = {'scale_range': [min(sc), max(sc)], 'opacity_values': sorted(set(it[2] for r in rows for it in r['it'])),
                           'tail_strip_still': still, 'tail_lag_values': lags[:8]}

# ---- drags (P-31, P-32, R-06, P-17) --------------------------------------------------
for f in ('drag-snapback-r1-390', 'drag-snapback-r2-390', 'drag-fling-r1-390', 'drag-fling-r2-390', 'overscroll-r1-390', 'overscroll-r2-390'):
    d = L(f + '.json.gz')
    rows = d['rows']
    names = [m[0] for m in d['marks']]
    legs = {}
    for n in names:
        if not n.endswith(':down'):
            continue
        lg = n[:-5]
        td, tu = mark(d, n), mark(d, lg + ':up')
        nxt = [t for k, t in d['marks'] if t > tu]
        te = nxt[0] if nxt else rows[-1]['t']
        dur = [r for r in rows if td <= r['t'] <= tu]
        aft = [r for r in rows if tu <= r['t'] <= te]
        w0 = wc(dur[0])
        wmv = sum(1 for r in dur if abs(wc(r) - w0) > 0.3)
        m = seg_motion(rows, tu, te)
        a, b = dur[-4], dur[-1]
        relv = round((b['sl'] - a['sl']) / ((b['t'] - a['t']) / 1000))
        flip = next((r for r in rows if td <= r['t'] <= te and r['cur'] != dur[0]['cur']), None)
        legs[lg] = {'sl_down': dur[0]['sl'], 'sl_up': dur[-1]['sl'], 'sl_end': aft[-1]['sl'], 'scroll_during': round(dur[-1]['sl'] - dur[0]['sl'], 2),
                    'release_v': relv, 'release_motion': m, 'worm_frames_moved_during': wmv,
                    'cur_flip_ms_after_up': round(flip['t'] - tu, 1) if flip else None,
                    'item0_x_end': aft[-1]['it'][0][4], 'leg_ms': round(tu - td, 1)}
    res['drag:' + f] = legs

# ---- idle (P-34) ----------------------------------------------------------------------
for f in ('idle-r1-1440', 'idle-r2-1440'):
    d = L(f + '.json.gz')
    rows = d['rows']
    res['idle:' + f] = {'span_ms': round(rows[-1]['t'] - rows[0]['t']), 'distinct': {k: len(set(json.dumps(r.get(k)) for r in rows)) for k in ('sl', 'wl', 'ww', 'str', 'pip', 'ring', 'it')},
                        'anims_max': max(r['anims'] for r in rows),
                        'idleAnims': d.get('idleAnims')}

# ---- resize (P-35, R-05) ---------------------------------------------------------------
for f in ('resize-r1-1440', 'resize-r2-1440'):
    d = L(f + '.json.gz')
    rows = d['rows']
    ev = {}
    for n, t0 in d['marks']:
        s = [r for r in rows if t0 - 20 <= r['t'] <= t0 + 880]
        sl_ch = [(round(r['t'] - t0, 1), r['sl']) for k, r in enumerate(s[1:]) if r['sl'] != s[k]['sl']]
        w_ch = [(round(r['t'] - t0, 1), round(wc(r), 2)) for k, r in enumerate(s[1:]) if abs(wc(r) - wc(s[k])) > 0.3]
        ring = sorted(set(tuple(r['ring'][2:]) for r in s))
        ev[n] = {'sl_changes': sl_ch[:6], 'worm_centre_changes': w_ch[:6], 'ring_wh': ring, 'cur': sorted(set(r['cur'] for r in s)),
                 'worm_w_values': sorted(set(r['ww'] for r in s))}
    res['resize:' + f] = ev

# ---- reduced (P-36) --------------------------------------------------------------------
for f in ('reduced-r1-1440', 'reduced-r2-1440'):
    d = L(f + '.json.gz')
    rows = d['rows']
    out = {}
    names = [m[0] for m in d['marks']]
    for i, n in enumerate(names):
        t0 = mark(d, n)
        t1 = d['marks'][i + 1][1] if i + 1 < len(names) else rows[-1]['t']
        m = seg_motion(rows, t0, t1)
        s = [r for r in rows if t0 <= r['t'] <= t1]
        out[n] = {'strip': m, 'has_worm_samples': any('bA' in r for r in s), 'row_keys': sorted(s[0].keys())}
    res['reduced:' + f] = out

# ---- enter (P-04 ABSENT) ---------------------------------------------------------------
for f in ('enter-r1-1440', 'enter-r2-1440', 'enter-r1-834', 'enter-r2-834'):
    d = L(f + '.json.gz')
    rows = d['rows']
    res['enter:' + f] = {'frames': len(rows), 'ring_wh': sorted(set(tuple(r['ring'][2:]) for r in rows if r.get('ring'))),
                         'ring_y': [min(r['ring'][1] for r in rows), max(r['ring'][1] for r in rows)],
                         'main_scroll': [min(r['ms'] for r in rows), max(r['ms'] for r in rows)],
                         'ring_in_viewport_frames': sum(1 for r in rows if r['ring'][1] < d['meta']['H'])}

# ---- dock-scroll (R-08) ----------------------------------------------------------------
for f in ('dock-scroll-r1-834', 'dock-scroll-r2-834'):
    d = L(f + '.json.gz')
    rows = d['rows']
    ms = [(r['t'], r['ms']) for r in rows]
    vs = [abs(ms[i + 1][1] - ms[i][1]) / ((ms[i + 1][0] - ms[i][0]) / 1000) for i in range(len(ms) - 1)]
    res['dock:' + f] = {'dock_rects': sorted(set(json.dumps(r.get('dk')) for r in rows)), 'dock_tf': sorted(set(r.get('dkT') for r in rows)),
                        'main_scroll': [min(r['ms'] for r in rows), max(r['ms'] for r in rows)], 'peak_v': round(max(vs))}

# ---- hover (P-30) ----------------------------------------------------------------------
for f in ('hover-r1-1440', 'hover-r2-1440'):
    d = L(f + '.json.gz')
    rows = d['rows']
    out = {}
    for n in ('hoverIn', 'down', 'up', 'hoverOut'):
        t0 = mark(d, n)
        s = [(r['t'] - t0, r['pip'][2][0], r['pip'][2][1]) for r in rows if t0 - 10 <= r['t'] <= t0 + 600]
        fin = s[-1]
        ch = [x for x in s if (x[1], x[2]) != (s[0][1], s[0][2])]
        last = [x for x in s if (x[1], x[2]) != (fin[1], fin[2])]
        out[n] = {'from': s[0][1:], 'to': fin[1:], 'first_ms': round(ch[0][0], 1) if ch else None, 'done_ms': round(last[-1][0], 1) if last else None}
    res['hover:' + f] = out

# ---- deck (P-23 deck reversal) --------------------------------------------------------
for f in ('deck-r1-1440', 'deck-r2-1440'):
    d = L(f + '.json.gz')
    rows = d['rows']
    def tx(m):
        if not m or m == 'none':
            return 0.0
        v = [float(x) for x in re.findall(r'-?[\d.e]+', m.split('(', 1)[1])]
        return v[12] if len(v) == 16 else v[4]
    tl = mark(d, 'ArrowLeft-retarget')
    ar = [r for r in rows if tl - 60 <= r['t'] <= tl + 120]
    traces = {}
    for k in range(len(rows[0]['sl'])):
        xs = [tx(r['sl'][k][1]) for r in ar]
        if len(set(xs)) > 1:
            traces[k] = [(round(ar[i]['t'] - tl, 1), round((xs[i + 1] - xs[i]) / ((ar[i + 1]['t'] - ar[i]['t']) / 1000))) for i in range(len(ar) - 1)]
    res['deck:' + f] = {'v_traces_around_ArrowLeft': traces, 'dt_p95_ms': None}

# ---- autoplay demo (P-24, CR-01) -------------------------------------------------------
for f in ('autoplay-r1-1440', 'autoplay-r2-1440'):
    d = L(f + '.json.gz')
    rows = d['rows']
    res['autoplay:' + f] = {'cur_seq': [r['cur'] for k, r in enumerate(rows) if k == 0 or r['cur'] != rows[k - 1]['cur']],
                            'strip_values': sorted(set(r['sl'] for r in rows))[:6]}

# ---- load stamps ----------------------------------------------------------------------
res['load'] = {os.path.basename(f)[:-8]: [json.load(gzip.open(f))['meta'].get('loadStart'), json.load(gzip.open(f))['meta'].get('loadEnd')]
               for f in sorted(glob.glob(os.path.join(G, '*.json.gz')))}

json.dump(res, open(os.path.join(OUT, 'rederive.json'), 'w'), indent=1, default=str)
print('wrote', os.path.join(OUT, 'rederive.json'))
