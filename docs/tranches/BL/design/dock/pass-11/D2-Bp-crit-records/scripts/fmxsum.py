# fmxsum.py <records dir>: the FM A/B (fmx/): per engine, theme, build and cell, every read's hole frames and longest run (H7-1,
# read from the cast) and stub frames, with load; then the tally of reads with any hole frame and with a run over one frame.
import glob, re, sys, collections
R = sys.argv[1]; agg = collections.defaultdict(list)
for f in sorted(glob.glob(R + '/fmx/fm-*.log')):
    e, t, b, k = re.search(r'fm-(\w+)-(\w+)-(bp\d+)-r(\d+)\.log', f).groups()
    for l in open(f, encoding='utf8'):
        m = re.match(r'^(PASS|FAIL|NOT-REPRODUCED)  FM  [A-Za-z ]+  (film·[\w-]+) ', l)
        if not m: continue
        h = re.search(r'(\d+) frame\(s\) with a hole, longest (\d+) consecutive', l); w = re.search(r'worst[^;]*?seat (\d+) at ink ([\d.]+) at \+(\d+) ms', l)
        h0 = re.search(r'0 frame\(s\) with a hole', l)
        st = re.search(r'stub (\d+) stub frame', l); ld = re.search(r'\[load ([\d.]+)\]', l)
        hf = int(h.group(1)) if h else 0; run = int(h.group(2)) if h else 0
        sm = re.search(r'seat (\d+) at ink ([\d.]+) at \+(\d+) ms', l)
        agg[(e, t, b, m.group(2))].append((int(k), m.group(1), hf, run, sm.groups() if sm and hf else None, int(st.group(1)) if st else None, float(ld.group(1)) if ld else None))
for key in sorted(agg):
    rs = sorted(agg[key]); anyh = [r for r in rs if r[2] > 0]; runs = [r for r in rs if r[3] > 1]
    print(key, 'reads', len(rs), 'with a hole frame', len(anyh), 'with a run > 1 frame', len(runs), 'stub reads', sum(1 for r in rs if r[5]), 'load', min(r[6] for r in rs), '-', max(r[6] for r in rs))
    for r in anyh: print('   ', 'r%d' % r[0], r[1], 'hole frames', r[2], 'longest', r[3], 'seat/ink/at', r[4], 'load', r[6])
