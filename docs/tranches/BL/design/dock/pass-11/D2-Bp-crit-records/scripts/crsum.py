# crsum.py <records dir>: the content-remove A/B (cr/): per engine, theme and build, every read's window (open, land, close, the
# flag's close after landing), the witness verdict on `window` and the Q-4 (c) reading; then the tally of reads whose flag closed
# more than 2F + 0.5 ms after landing (W-8 as written, H6-5). A reading; enters no row.
import glob, json, re, sys, collections
R = sys.argv[1]; agg = collections.defaultdict(list)
for f in sorted(glob.glob(R + '/cr/w3cr-*.json')):
    e, t, b, k = re.search(r'w3cr-(\w+)-(\w+)-(bp\d+)-r(\d+)\.json', f).groups()
    for c in json.load(open(f))['cells']:
        if c['cell'] != 'content-remove': continue
        w = c['window']; gap = round((w.get('close') or 0) - (w.get('land') or 0), 1); F = w.get('frameMs') or 16.7
        late = gap > 2 * F + 0.5
        v = 'PASS' if c['pass'] else ('OB' if c.get('ownerBlocked') else 'FAIL')
        agg[(e, t, b)].append((int(k), gap, w.get('duration'), late, v, (w.get('q4c') or {}).get('ok'), c['load']))
for key in sorted(agg):
    rs = sorted(agg[key]); late = [r for r in rs if r[3]]
    print(key, 'reads', len(rs), 'late (> 2F + 0.5 after landing)', len(late), 'gaps', [r[1] for r in rs], 'verdicts', [r[4] for r in rs], 'load', min(r[6] for r in rs), '-', max(r[6] for r in rs))
