# fmtsum.py <dir>: the B2 trace (fmtrace.mjs JSON): per engine, theme, build and cell, the cast's hole frames (lib.mjs holePaint,
# as FM reads them) beside the scene's own writes at the handoff place: the frames on which both units' ink-weighted painted
# share is under 0.1, and the place's least ink over the exchange (the better of the two units on a frame), with the frame's
# kind: `pre-cut` (the leaving unit still paints), `gift` (the frame it is cut and the arriving unit takes its part).
import json, glob, sys, collections, re
agg = collections.defaultdict(list)
for f in sorted(glob.glob(sys.argv[1] + '/*-r*.json')):
    m = re.search(r'(\w+)-(\w+)-(bp\w+)-r(\d+)\.json', f)
    if not m: continue
    e, t, b, k = m.groups(); d = json.load(open(f))
    for name, c in d['cells'].items():
        if 'scene' not in c: agg[(e, t, b, name)].append(('ERR', None, None, None, d.get('load'))); continue
        sc = [s for s in c['scene'] if s['t'] <= 300 and (s['P'] or s['one'])]
        def place(s): return max((s['paintP'] or 0) * (s['opP'] or 1), (s['paint1'] or 0) * (s['op1'] or 1))
        lo = min(sc, key=place) if sc else None
        kind = None
        if lo: kind = 'gift' if lo['one'] and lo['one']['gf'] else ('pre-cut' if lo['P'] and lo['P']['vis'] and lo['P']['vis'][1] > lo['P']['vis'][0] else 'other')
        agg[(e, t, b, name)].append((c['hole']['holeFrames'] if c['hole'] else None, len(c['bothNone']), round(place(lo), 3) if lo else None, kind, d.get('load')))
for key, v in sorted(agg.items()):
    holes = sum(1 for x in v if x[0]); none = sum(1 for x in v if x[1]); worst = min((x[2] for x in v if x[2] is not None), default=None)
    print(key, f"reads {len(v)} · cast reads with a hole frame {holes} · scene reads with a frame under 0.1 at the place {none} · least place ink {worst} · per read (least, kind) {[(x[2], x[3]) for x in v]} · load {min(x[4] for x in v)}-{max(x[4] for x in v)}")
