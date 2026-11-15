# hover.py <rows.json>...: the 0 px hover guard and the label fades, from the first "in-" mark
# (or "sweep") to the end: the root's and every plate's box change, the hovered seat changes,
# and per label: opacity samples in and out, time to opacity 0.8.
import json, sys
for f in sys.argv[1:]:
    d = json.load(open(f)); rows = d['rows']
    marks = [m for m in d['marks'] if m['name'].startswith(('in-', 'sweep'))]
    if not marks: continue
    a = marks[0]['frame']
    def box(r, k):
        e = r['el'].get(k)
        return None if not e or e.get('x') is None else (e['x'], e['y'], e['w'], e['h'])
    dmax = {}
    for k in ['dock', 'plate', 'seatplate']:
        b0 = box(rows[a], k)
        if not b0: continue
        dmax[k] = max(max(abs(x - y) for x, y in zip(box(r, k), b0)) for r in rows[a:] if box(r, k))
    labs = sorted({k for r in rows[a:] for k in r['el'] if k.startswith('label#')})
    info = []
    for k in labs:
        v = [(r['t'], float(r['el'][k].get('op', 'nan'))) for r in rows[a:] if r['el'].get(k)]
        rise = [x for x in v if 0.02 < x[1] < 0.98]
        if not any(o > 0.5 for _, o in v): continue
        t_on = next((t for t, o in v if o > 0.02), None); t_08 = next((t for t, o in v if o >= 0.8), None)
        info.append(f"{k}: mid-samples {len(rise)}, 0.02->0.8 {round(t_08 - t_on) if t_on and t_08 else None} ms")
    print(f.split('/')[-1].split('.chromium')[0], d['meta']['cell']['tag'], 'box change px', {k: round(v, 2) for k, v in dmax.items()}, '|', '; '.join(info))
