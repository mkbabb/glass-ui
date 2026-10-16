"""GAP analysis: reads gap/data/<scenario>-<run>-<W>.json.gz (probe.mjs output) and
writes gap/data/summary.json. Every number GAP.md cites comes from here.

usage: python3 -I analyze.py
"""
import gzip, json, glob, os, re, math
import numpy as np
from scipy.optimize import minimize

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, '..', 'data')


def load(f):
    with gzip.open(f) as fh:
        return json.load(fh)


def num(s):
    try:
        return float(s)
    except Exception:
        return None


def mark_t(d, name):
    for n, t in d.get('marks', []):
        if n == name:
            return t
    return None


def bez(x1, y1, x2, y2, xs):
    # y(x) for a CSS cubic-bezier, by bisection on t
    out = []
    for x in xs:
        lo, hi = 0.0, 1.0
        for _ in range(40):
            t = (lo + hi) / 2
            bx = 3 * x1 * t * (1 - t) ** 2 + 3 * x2 * t * t * (1 - t) + t ** 3
            if bx < x:
                lo = t
            else:
                hi = t
        t = (lo + hi) / 2
        out.append(3 * y1 * t * (1 - t) ** 2 + 3 * y2 * t * t * (1 - t) + t ** 3)
    return np.array(out)


def fit_bezier(ts, ys):
    ts = np.asarray(ts); ys = np.asarray(ys)
    def loss(p):
        x1, y1, x2, y2 = p
        if not (0 <= x1 <= 1 and 0 <= x2 <= 1):
            return 1e3
        return float(np.sqrt(np.mean((bez(x1, y1, x2, y2, ts) - ys) ** 2)))
    best = None
    for s in ([0.42, 0, 0.58, 1], [0.25, 0.1, 0.25, 1], [0.2, 0.8, 0.3, 1], [0.5, 0, 0.5, 1]):
        r = minimize(loss, s, method='Nelder-Mead', options={'xatol': 1e-4, 'fatol': 1e-6, 'maxiter': 3000})
        if best is None or r.fun < best.fun:
            best = r
    return [round(v, 3) for v in best.x], round(best.fun, 4)


def motion_segment(rows, key, t0, eps=0.5, settle_hold_ms=150):
    """First frame after t0 where key moves > eps from its value at t0, then the
    settle: first time after which |v - final| < eps for the rest of the window."""
    sel = [r for r in rows if r['t'] >= t0 and r.get(key) is not None]
    if len(sel) < 3:
        return None
    v0 = sel[0][key]
    start = next((r for r in sel if abs(r[key] - v0) > eps), None)
    if not start:
        return {'moved': False, 'v0': v0}
    vf = sel[-1][key]
    settle = None
    for i in range(len(sel) - 1, -1, -1):
        if abs(sel[i][key] - vf) >= eps:
            settle = sel[i + 1] if i + 1 < len(sel) else sel[i]
            break
    # previous frame of start is the last unmoved frame
    i0 = sel.index(start)
    pre = sel[i0 - 1] if i0 > 0 else start
    seg = [r for r in sel if pre['t'] <= r['t'] <= settle['t']]
    span = vf - v0
    over = 0.0
    if span:
        prog = [(r[key] - v0) / span for r in seg]
        over = max(0.0, max(prog) - 1) * abs(span)
    return {'moved': True, 'v0': v0, 'vf': vf, 'latency_ms': round(start['t'] - t0, 1),
            'start_t': pre['t'], 'settle_t': settle['t'], 'dur_ms': round(settle['t'] - pre['t'], 1),
            'overshoot_px': round(over, 2), 'seg': seg}


def curve_fit(seg, key):
    if not seg or len(seg) < 5:
        return None
    t0, t1 = seg[0]['t'], seg[-1]['t']
    v0, v1 = seg[0][key], seg[-1][key]
    if t1 == t0 or v1 == v0:
        return None
    ts = [(r['t'] - t0) / (t1 - t0) for r in seg]
    ys = [(r[key] - v0) / (v1 - v0) for r in seg]
    p, rms = fit_bezier(ts, ys)
    vel = [abs(seg[i + 1][key] - seg[i][key]) / max(1e-3, (seg[i + 1]['t'] - seg[i]['t']) / 1000) for i in range(len(seg) - 1)]
    return {'bezier': p, 'rms': rms, 'peak_v_px_s': round(max(vel), 0)}


def worm_cols(rows):
    for r in rows:
        if 'bA' in r and r['bA']:
            r['wc'] = (r['bA'][0] + r['bA'][2] / 2 + r['bB'][0] + r['bB'][2] / 2) / 2  # mid of the two bodies
            r['wlead'] = None
            r['wwv'] = r.get('ww')
            r['strf'] = num(r.get('str')) or 1.0
    return rows


def worm_stats(rows, t0, t1):
    seg = [r for r in rows if t0 <= r['t'] <= t1 and 'ww' in r]
    if not seg:
        return None
    rest = seg[0]['ww']
    return {'rest_w': rest, 'peak_w': max(r['ww'] for r in seg), 'min_h': min(r['wh'] for r in seg),
            'peak_stretch': max(r['strf'] for r in seg),
            'neck_frames': sum(1 for r in seg if num(r['nkOp']) and num(r['nkOp']) > 0)}


def sync_lag(rows, t0, t1, pitch_scroll, pitch_worm, sl0, wc0):
    """Scroll progress vs worm progress, in slides, over [t0, t1]."""
    out = []
    for r in rows:
        if t0 <= r['t'] <= t1 and 'wc' in r:
            out.append(((r['sl'] - sl0) / pitch_scroll, (r['wc'] - wc0) / pitch_worm, r['t']))
    if not out:
        return None
    dmax = max(abs(a - b) for a, b, _ in out)
    return {'max_desync_slides': round(dmax, 3)}


def analyze_click_like(d, marks, key='sl'):
    rows = worm_cols(d['rows'])
    res = {}
    names = [m[0] for m in d['marks']]
    for i, name in enumerate(names):
        if name not in marks:
            continue
        t0 = mark_t(d, name)
        tn = mark_t(d, names[i + 1]) if i + 1 < len(names) else rows[-1]['t']
        seg_rows = [r for r in rows if r['t'] <= tn]
        m = motion_segment(seg_rows, key, t0)
        if not m:
            continue
        info = {k: v for k, v in m.items() if k != 'seg'}
        if m.get('moved'):
            info['fit'] = curve_fit(m['seg'], key)
        w = motion_segment(seg_rows, 'wc', t0, eps=0.3) if 'wc' in rows[0] else None
        if w:
            info['worm'] = {k: v for k, v in w.items() if k != 'seg'}
            if w.get('moved'):
                info['worm']['fit'] = curve_fit(w['seg'], 'wc')
        info['worm_shape'] = worm_stats(rows, t0, tn) if 'ww' in rows[0] else None
        cur_flip = next((r for r in rows if r['t'] >= t0 and r.get('cur') != next((q.get('cur') for q in rows if q['t'] >= t0), None)), None)
        info['cur_flip_ms'] = round(cur_flip['t'] - t0, 1) if cur_flip else None
        res[name] = info
    return res


def items_scale_range(rows):
    vals = []
    for r in rows:
        for it in r.get('it', []):
            s = it[1]
            v = num(s.split()[0]) if s and s != 'none' else 1.0
            vals.append(v)
    return (min(vals), max(vals)) if vals else None


def lag_range(rows):
    vals = []
    for r in rows:
        for it in r.get('it', []):
            tr = it[3]
            if tr and tr != 'none':
                vals.append(num(tr.split()[0].replace('px', '')))
    vals = [v for v in vals if v is not None]
    return (min(vals), max(vals)) if vals else (0, 0)


def main():
    out = {}
    for f in sorted(glob.glob(os.path.join(DATA, '*.json.gz'))):
        d = load(f)
        sc = d['meta']['scenario']; tag = os.path.basename(f)[:-8]
        rows = d.get('rows', [])
        dts = np.diff([r['t'] for r in rows]) if rows else np.array([0])
        base = {'load': [d['meta'].get('loadStart'), d['meta'].get('loadEnd')], 'chromium': d['meta'].get('chromium'),
                'frames': len(rows), 'dt_med': round(float(np.median(dts)), 2) if len(dts) else None,
                'dt_p95': round(float(np.percentile(dts, 95)), 2) if len(dts) else None}
        if d.get('anatomy'):
            base['anatomy'] = d['anatomy']
        if sc in ('click', 'worm-hero'):
            base['moves'] = analyze_click_like(d, [m[0] for m in d['marks'] if m[0].startswith('click')])
        elif sc == 'retarget':
            base['moves'] = analyze_click_like(d, ['click2', 'click0'])
            rws = worm_cols(rows)
            for a, b in (('click2', 'click4'), ('click0', 'click1')):
                ta, tb = mark_t(d, a), mark_t(d, b)
                fin = [r for r in rws if r['t'] > tb + 1800]
                around = [r for r in rws if tb - 40 <= r['t'] <= tb + 120]
                vel = [(r['t'] - tb, round((around[i + 1]['sl'] - r['sl']) / max(1e-3, (around[i + 1]['t'] - r['t']) / 1000))) for i, r in enumerate(around[:-1])]
                wvel = [(round(r['t'] - tb), round((around[i + 1]['wc'] - r['wc']) / max(1e-3, (around[i + 1]['t'] - r['t']) / 1000))) for i, r in enumerate(around[:-1])]
                base['retarget_' + b] = {'final_sl': fin[0]['sl'] if fin else None, 'final_cur': fin[0]['cur'] if fin else None,
                                         'scroll_v_around': [[round(t), v] for t, v in vel], 'worm_v_around': wvel}
        elif sc == 'autoplay':
            rws = worm_cols(rows)
            # find advances: frames where sl starts moving
            res = []
            i = 1
            while i < len(rws):
                if abs(rws[i]['sl'] - rws[i - 1]['sl']) > 0.5:
                    t0 = rws[i - 1]['t']
                    m = motion_segment(rws[i - 1:], 'sl', t0 - 0.01)
                    w = motion_segment(rws[i - 30 if i > 30 else 0:], 'wc', rws[i - 30 if i > 30 else 0]['t'], eps=0.3)
                    flip = next((r for r in rws[max(0, i - 120):] if r['cur'] != rws[max(0, i - 120)]['cur']), None)
                    res.append({'scroll_start': round(t0), 'dur_ms': m['dur_ms'] if m else None, 'overshoot': m['overshoot_px'] if m else None,
                                'fit': curve_fit(m['seg'], 'sl') if m and m.get('moved') else None,
                                'worm_start': round(w['start_t']) if w and w.get('moved') else None,
                                'worm_dur': w['dur_ms'] if w and w.get('moved') else None,
                                'cur_flip_t': round(flip['t']) if flip else None,
                                'worm_shape': worm_stats(rws, t0 - 300, t0 + 1500)})
                    i = rws.index(m['seg'][-1]) + 1 if m and m.get('moved') else i + 1
                else:
                    i += 1
            base['advances'] = res
            if len(res) > 1:
                base['cadence_ms'] = [res[k + 1]['scroll_start'] - res[k]['scroll_start'] for k in range(len(res) - 1)]
            base['member_scale_range'] = items_scale_range(rows)
            base['member_lag_px_range'] = lag_range(rows)
        elif sc.startswith('drag') or sc == 'overscroll':
            rws = worm_cols(rows)
            legs = {}
            names = [m[0] for m in d['marks']]
            for n in names:
                if not n.endswith(':down'):
                    continue
                leg = n[:-5]
                td, tu = mark_t(d, n), mark_t(d, leg + ':up')
                nxt = [mark_t(d, x) for x in names if mark_t(d, x) > tu]
                te = nxt[0] if nxt else rws[-1]['t']
                during = [r for r in rws if td <= r['t'] <= tu]
                after = [r for r in rws if tu <= r['t'] <= te]
                sl0 = during[0]['sl'] if during else None
                rel = motion_segment(after, 'sl', tu)
                flips = [(round(r['t'] - td), r['cur']) for k, r in enumerate(rws[1:]) if td <= r['t'] <= te and r['cur'] != rws[k]['cur']]
                wmoves = [r for r in during if abs(r['wc'] - during[0]['wc']) > 0.3]
                rel_v = None
                if len(during) > 3:
                    a, b = during[-4], during[-1]
                    rel_v = round((b['sl'] - a['sl']) / max(1e-3, (b['t'] - a['t']) / 1000))
                item0 = [r['it'][0][4] for r in during if r.get('it')]
                legs[leg] = {'sl_at_down': sl0, 'sl_at_up': during[-1]['sl'] if during else None,
                             'sl_final': after[-1]['sl'] if after else None,
                             'release_scroll_v_px_s': rel_v,
                             'release': {k: v for k, v in rel.items() if k != 'seg'} if rel else None,
                             'release_fit': curve_fit(rel['seg'], 'sl') if rel and rel.get('moved') else None,
                             'cur_flips_ms_from_down': flips,
                             'worm_moved_during_drag_frames': len(wmoves),
                             'worm_scrubbed': len(wmoves) > 0,
                             'item0_x_range_during': [min(item0), max(item0)] if item0 else None,
                             'worm_after': {k: v for k, v in (motion_segment(after, 'wc', tu, eps=0.3) or {}).items() if k != 'seg'}}
            base['legs'] = legs
        elif sc == 'hover':
            res = {}
            for nm in ('hoverIn', 'down', 'up', 'hoverOut'):
                t0 = mark_t(d, nm)
                seq = [(r['t'] - t0, r['pip'][2][0], r['pip'][2][1]) for r in rows if r['t'] >= t0 - 10 and r['t'] <= t0 + 600]
                v0 = seq[0]
                ch = [s for s in seq if s[1] != v0[1] or s[2] != v0[2]]
                fin = seq[-1]
                last = None
                for s in seq:
                    if s[1] != fin[1] or s[2] != fin[2]:
                        last = s
                res[nm] = {'from': v0[1:], 'to': fin[1:], 'first_change_ms': round(ch[0][0], 1) if ch else None,
                           'done_ms': round(last[0], 1) if last else None,
                           'scale_trace': sorted(set(s[1] for s in seq))[:12]}
            base['states'] = res
        elif sc == 'idle':
            base['running_anims_max'] = max(r['anims'] for r in rows)
            keys = ('sl', 'wl', 'ww', 'str')
            base['changed'] = {k: len(set(str(r.get(k)) for r in rows)) for k in keys}
            base['idleAnims'] = d.get('idleAnims')
        elif sc == 'resize':
            rws = worm_cols(rows)
            ev = {}
            for nm in [m[0] for m in d['marks']]:
                t0 = mark_t(d, nm)
                seg = [r for r in rws if t0 - 20 <= r['t'] <= t0 + 880]
                sls = [(round(r['t'] - t0), r['sl']) for r in seg]
                changes = [s for k, s in enumerate(sls[1:]) if s[1] != sls[k][1]]
                wc = [(round(r['t'] - t0), round(r['wc'], 2), r['cur']) for r in seg]
                wchg = [s for k, s in enumerate(wc[1:]) if abs(s[1] - wc[k][1]) > 0.3]
                ev[nm] = {'scroll_changes': changes[:12], 'worm_changes': wchg[:12], 'final_sl': seg[-1]['sl'], 'final_cur': seg[-1]['cur']}
            base['resizes'] = ev
        elif sc == 'reduced':
            base['moves'] = analyze_click_like(d, ['next1', 'scrollTo4'])
        elif sc == 'pager-next':
            base['moves'] = analyze_click_like(d, ['next1', 'next3a'])
            rws = worm_cols(rows)
            ta = mark_t(d, 'next3a')
            seg = [r for r in rws if r['t'] >= ta]
            v = [(round(seg[i]['t'] - ta), round((seg[i + 1]['sl'] - seg[i]['sl']) / max(1e-3, (seg[i + 1]['t'] - seg[i]['t']) / 1000))) for i in range(len(seg) - 1)]
            base['next3_velocity_trace'] = [x for x in v if x[0] < 700][::3]
            base['next3_final_sl'] = seg[-1]['sl']
            base['pitch'] = None
        elif sc == 'smooth':
            rows2 = rows
            names = [m[0] for m in d['marks']]
            res = []
            for i, (n, t0) in enumerate(d['marks']):
                tn = d['marks'][i + 1][1] if i + 1 < len(d['marks']) else rows[-1]['t']
                m = motion_segment([r for r in rows if r['t'] <= tn], 'sl', t0)
                if not m:
                    continue
                e = {k: v for k, v in m.items() if k != 'seg'}
                e['mark'] = n
                if m.get('moved'):
                    e['fit'] = curve_fit(m['seg'], 'sl')
                # velocity at the next mark (for the reversal)
                if i + 1 < len(d['marks']):
                    near = [r for r in rows if tn - 30 <= r['t'] <= tn + 60]
                    e['v_around_next_mark'] = [(round(near[k]['t'] - tn), round((near[k + 1]['sl'] - near[k]['sl']) / max(1e-3, (near[k + 1]['t'] - near[k]['t']) / 1000))) for k in range(len(near) - 1)]
                res.append(e)
            base['moves'] = res
        elif sc in ('rest', 'dark'):
            base['rest_row'] = {k: rows[-1].get(k) for k in ('bA', 'bB', 'ww', 'wh', 'ring', 'dk')}
            base['running_anims_max'] = max(r['anims'] for r in rows)
        elif sc == 'enter':
            keys = ('ring', 'ww', 'wl', 'str', 'dk', 'dkT', 'dkO')
            # a property that changed only by page-scroll translation is not an animation:
            # compare ring/dock size (w,h) and the worm width/stretch, not y
            def sizes(r, k):
                v = r.get(k)
                return tuple(v[2:]) if isinstance(v, list) and len(v) == 4 else v
            base['distinct'] = {k: len(set(str(sizes(r, k)) for r in rows)) for k in keys}
            base['running_anims_max'] = max(r['anims'] for r in rows)
            base['scroller'] = d.get('scroller')
            base['main_scroll_range'] = [min(r.get('ms', 0) for r in rows), max(r.get('ms', 0) for r in rows)]
            base['cur_values'] = sorted(set(r.get('cur') for r in rows if r.get('cur') is not None))
            base['ring_y_range'] = [min(r['ring'][1] for r in rows), max(r['ring'][1] for r in rows)] if rows and rows[0].get('ring') else None
        elif sc == 'dock-scroll':
            base['dock_rects'] = sorted(set(str(r.get('dk')) for r in rows))[:6]
            base['dock_tf'] = sorted(set(str(r.get('dkT')) for r in rows))[:4]
            base['main_scroll_range'] = [min(r['ms'] for r in rows), max(r['ms'] for r in rows)]
            ms = [(r['t'], r['ms']) for r in rows]
            vs = [abs(ms[i + 1][1] - ms[i][1]) / max(1e-3, (ms[i + 1][0] - ms[i][0]) / 1000) for i in range(len(ms) - 1)]
            base['main_scroll_peak_v'] = round(max(vs)) if vs else 0
        elif sc == 'deck':
            def tx(m):
                if not m or m == 'none':
                    return 0.0
                v = [float(x) for x in re.findall(r'-?[\d.e]+', m.split('(', 1)[1])]
                return v[12] if len(v) == 16 else v[4]
            for r in rows:
                for k, s in enumerate(r['sl']):
                    r['tx%d' % k] = tx(s[1])
                    r['op%d' % k] = s[2]
            res = {}
            for nm in ('ArrowRight', 'ArrowRight2', 'ArrowLeft-retarget'):
                t0 = mark_t(d, nm)
                per = {}
                for k in range(len(rows[0]['sl'])):
                    m = motion_segment([r for r in rows if r['t'] <= t0 + 1500], 'tx%d' % k, t0)
                    if m and m.get('moved'):
                        per[k] = {kk: vv for kk, vv in m.items() if kk != 'seg'}
                        per[k]['fit'] = curve_fit(m['seg'], 'tx%d' % k)
                res[nm] = per
            base['turns'] = res
        out[tag] = base
    with open(os.path.join(DATA, 'summary.json'), 'w') as fh:
        json.dump(out, fh, indent=1, default=str)
    print('wrote', os.path.join(DATA, 'summary.json'), len(out), 'runs')


if __name__ == '__main__':
    main()
