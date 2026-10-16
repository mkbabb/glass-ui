"""CRITIQUE-3: CR-03's A3 witness against a CSS `linear()` tween sampled from the named row.

A `linear(...)` easing is a piecewise-linear curve through N stops; generators sample a spring's step response
into one. Loads `witness`, `synth`, `spring_progress`, `ROWS` from amend3/tools/entrance3.py by executing only the
part of that file above its `OUT = {` line (no code copied; entrance3.json is not rewritten).
Each case: the rise channel on the tween, two overlapping shapes, a 20 ms pip stagger (synth's defaults), scored
against the Apple row as the A3 witness scores Apple. Also: the same against `panel` and against a lightly
damped row near Q-CR-1 (b).
usage: python3 -I -B critique3/tools/entrance_linear.py  (from apple-homeview/) -> critique3/data/entrance-linear.json
"""
import json, math, os
import numpy as np
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
p = os.path.join(ROOT, "amend3/tools/entrance3.py")
ns = {"__file__": p, "__name__": "entrance3_head"}
exec(compile(open(p).read().split("\nOUT = {")[0], "entrance3.py(head)", "exec"), ns)
witness, synth, spring_progress, ROWS = ns["witness"], ns["synth"], ns["spring_progress"], ns["ROWS"]

def linear_easing(response, zeta, stops, dur_s):
    """the CSS linear() a generator emits: `stops` equally spaced samples of the row's step response over
    dur_s, ending at exactly 1 (CSS requires the last stop to be the end value)."""
    om = 2 * math.pi / response
    xs = np.linspace(0, 1, stops)
    ys = spring_progress(xs * dur_s, om, zeta)
    ys[-1] = 1.0
    return (lambda q: float(np.interp(np.clip(q, 0, 1), xs, ys))), [round(float(y), 4) for y in ys]

OUT = {}
rows = {"apple-rise (0.606, 0.414)": ROWS["apple-rise (0.606, 0.414)"], "panel (0.4, 0.71)": ROWS["panel (0.4, 0.71)"],
        "b-candidate (0.5, 0.45)": (0.5, 0.45)}
for rname, (resp, ze) in rows.items():
    for stops in (8, 12, 16, 24, 40):
        for dur in (1.2, 1.6, 2.0):
            ease, ys = linear_easing(resp, ze, stops, dur)
            F = synth(ease, "rise", 20, two_shapes=True, dur=dur * 1000)
            w = witness(F, (resp, ze))
            OUT[f"{rname} | linear() {stops} stops over {dur} s"] = {
                "pass": w["pass"], "parts": w["parts"],
                "E1_row_nrms": {c: f["row_fit"]["nrms"] for c, f in w["E1_fits"].items() if f["row_fit"]},
                "css_stops": ys if stops <= 16 else f"{stops} stops"}
os.makedirs(os.path.join(ROOT, "critique3", "data"), exist_ok=True)
json.dump(OUT, open(os.path.join(ROOT, "critique3", "data", "entrance-linear.json"), "w"), indent=1)
for k, v in OUT.items():
    print(k, "| pass", v["pass"], v["parts"], v["E1_row_nrms"])
