"""CRITIQUE-2: run the amended CR-03 entrance witness (amend2/tools/analyze.py -> entrance_witness, imported, not copied)
on synthetic per-frame rows of entrances that are NOT the reference's: no governed spring, no blob->pill hand-off.
Rows mimic gprobe.mjs's channels (ring rect, carousel rect, ring opacity, pip tuples) at a 120 Hz clock.

  A  a 1 s CSS tween with an overshooting bezier, cubic-bezier(0.34, 1.56, 0.64, 1), on scale; one shape;
     the pips fade in by a 20 ms transition-delay stagger (a CSS stagger, not a spring)
  B  the same tween on cubic-bezier(0.25, 0.1, 0.25, 1.4)-like overshoot of 3 %, rise only
  C  control: the 1 s linear scale (GAP's own plant); must FAIL

usage: python3 -I critique2/tools/plant_witness.py -> critique2/data/plant-witness.json
"""
import importlib.util, json, os

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
spec = importlib.util.spec_from_file_location("a2", os.path.join(ROOT, "amend2", "tools", "analyze.py"))
a2 = importlib.util.module_from_spec(spec); spec.loader.exec_module(a2)


def bez(x1, y1, x2, y2):
    def sample(t):
        # solve x(s) = t by bisection, return y(s)
        lo, hi = 0.0, 1.0
        for _ in range(60):
            s = (lo + hi) / 2
            x = 3 * (1 - s) ** 2 * s * x1 + 3 * (1 - s) * s ** 2 * x2 + s ** 3
            lo, hi = (s, hi) if x < t else (lo, s)
        s = (lo + hi) / 2
        return 3 * (1 - s) ** 2 * s * y1 + 3 * (1 - s) * s ** 2 * y2 + s ** 3
    return sample


def rows(ease, channel, stagger_ms, n_pips=5, dur=1000.0, dt=1000 / 120):
    out, t = [], 0.0
    W0, H0, X0, Y0 = 152.0, 32.0, 600.0, 600.0
    while t <= 1600:
        p = ease(min(1.0, t / dur))
        s = p if channel == "scale" else 1.0
        rise = (1 - p) * 60 if channel == "rise" else 0.0
        w, h = W0 * s, H0 * s
        pips = []
        for j in range(n_pips):
            tj = max(0.0, min(1.0, (t - j * stagger_ms) / 300))
            pips.append(["none", f"rgba(0,0,0,{0.52 * tj:.3f})", "0px"])
        out.append({"t": 1000 + t, "ring": [X0 + (W0 - w) / 2, Y0 + rise + (H0 - h) / 2, round(w, 2), round(h, 2)],
                    "car": [0, 200, 1440, 500], "rop": round(min(1.0, t / 200), 3), "pip": pips})
        t += dt
    return out


res = {}
res["A_overshoot_bezier_scale_css_stagger"] = a2.entrance_witness(rows(bez(0.34, 1.56, 0.64, 1), "scale", 20), 1000)
res["B_overshoot_bezier_rise_css_stagger"] = a2.entrance_witness(rows(bez(0.3, 0.0, 0.3, 1.12), "rise", 20), 1000)
res["C_linear_scale_no_stagger"] = a2.entrance_witness(rows(lambda p: p, "scale", 0), 1000)
os.makedirs(os.path.join(ROOT, "critique2", "data"), exist_ok=True)
json.dump(res, open(os.path.join(ROOT, "critique2", "data", "plant-witness.json"), "w"), indent=1)
print(json.dumps(res, indent=1))
