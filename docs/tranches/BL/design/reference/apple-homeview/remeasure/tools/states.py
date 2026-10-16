"""Hover / press / pause / idle readings from probe runs.
usage: python3 -I states.py hover|pause|idle data/<run>.json  -> JSON on stdout
"""
import json, sys

def changes(F, key, t0):
    out = []; prev = None
    for f in F:
        v = key(f)
        if v != prev: out.append((round(f['t'] - t0, 1), v))
        prev = v
    return out

def first_last(seq, t_from, t_to):
    s = [x for x in seq if t_from <= x[0] < t_to]
    return (s[0], s[-1], len(s)) if s else None

mode, path = sys.argv[1], sys.argv[2]
d = json.load(open(path)); F = d['frames']
if mode == 'hover':
    t0 = d['tHover']
    btn = changes(F, lambda f: f['btn']['bgc'], t0)
    dot5 = changes(F, lambda f: f['lbg'][5], t0)
    tf = changes(F, lambda f: (f['btn']['tf'], f['bgB']['tf'], f['bgB']['w']), t0)
    rel = {k: round(d[k] - t0, 1) for k in ('tHover', 'tDown', 'tUp', 'tDotHover', 'tLeave')}
    def span(seq, a, b):
        s = [x for x in seq if a <= x[0] < b]
        return {'first': s[0] if s else None, 'last': s[-1] if s else None, 'n_changes': len(s), 'dur_ms': round(s[-1][0] - s[0][0], 1) if len(s) > 1 else 0}
    print(json.dumps({'events': rel, 'btn_hover': span(btn, rel['tHover'], rel['tDown']), 'btn_press': span(btn, rel['tDown'], rel['tUp']),
                      'btn_release': span(btn, rel['tUp'], rel['tDotHover']), 'dot_hover': span(dot5, rel['tDotHover'], rel['tLeave']),
                      'dot_leave': span(dot5, rel['tLeave'], 1e9), 'btn_transform_states': len({x[1] for x in tf}), 'btn_transform_seq': tf[:6]}, indent=1))
else:
    t0 = d['tClick']
    glyph = changes(F, lambda f: f['glyph'], t0)
    play = changes(F, lambda f: f['aPlay'], t0)
    fill = changes(F, lambda f: round(f['aw'] or 0, 3), t0)
    after = [f for f in F if f['t'] - t0 > 300]
    keys = lambda f: json.dumps({k: f[k] for k in ('aap', 'intro', 'bgB', 'bgD', 'wrapB', 'wrapD', 'btn', 'glyph', 'li', 'lw', 'lx', 'lbg', 'cur', 'aw', 'aPlay', 'ap', 'pi', 'sl')}, sort_keys=True)
    distinct = len({keys(f) for f in after})
    print(json.dumps({'glyph_changes': glyph, 'fill_playstate_changes': play, 'fill_changes_after_300ms': len([x for x in fill if x[0] > 300]),
                      'last_fill_change_ms': fill[-1][0], 'idle_window_ms': round(after[-1]['t'] - after[0]['t'], 1) if after else 0,
                      'distinct_dock_states_after_300ms': distinct, 'frames_after': len(after),
                      'running_animations_at_end': [a for a in d.get('anims', []) if a['st'] == 'running']}, indent=1))
