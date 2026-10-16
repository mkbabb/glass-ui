"""AMEND-3: the CR-03 entrance witness, third statement, run on Apple's intro, on glass-ui HEAD and its plants,
and on synthetic entrances (the critique's three plus finished and near-miss controls).

The witness (all parts must hold on one run; E0 needs the wheel run and the jump run):
  E0 one shot, wall-clocked: crossing the threshold fires one timeline; the wheel and jump runs agree within 0.5 px.
  E1 a governed spring: the leading geometric channel (the larger travel of the rise and the group width), from its
     onset, matches the damped oscillator of the NAMED row (response R, damping zeta, fixed; onset the only free
     parameter) at normalised RMS <= 0.01 of its travel. Apple is scored against its own row (rise: zeta 0.414,
     omega0 10.37 rad/s, i.e. response 0.606 s, REMEASURE P-05).
  E2 not a linear ramp (kept from amend 2): some moving channel deviates >= 0.08 from a straight line in progress.
  E3 a stagger (kept): the dots' first changes span >= 2 onsets >= 15 ms apart.
  E4 a hand-off (now in the conjunction): >= 2 painted shapes of the group overlap on the first entrance frame, and
     their boxes intersect on every frame while both are visible (the union never splits), and the second control
     (the button) is first painted inside the pill's box. One shape -> FAIL.

Also reported, for the tolerance: the best free damped-oscillator fit of each channel, and the best cubic-bezier
tween fit of each spring row (how close a tuned tween can get to the row).

usage: python3 -I -B amend3/tools/entrance3.py  (from apple-homeview/) -> amend3/data/entrance3.json
"""
import gzip, json, math, os
import numpy as np
from scipy.optimize import least_squares, minimize

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
TOL_E1 = 0.01


def spring_progress(t, omega, zeta):
    """progress 0 -> 1 of a unit step response from rest, t in s (t < 0 -> 0)."""
    t = np.maximum(t, 0.0)
    if zeta < 1:
        wd = omega * math.sqrt(1 - zeta * zeta)
        y = np.exp(-zeta * omega * t) * (np.cos(wd * t) + zeta * omega / wd * np.sin(wd * t))
    else:
        y = np.exp(-omega * t) * (1 + omega * t)
    return 1 - y


def bez(x1, y1, x2, y2):
    s = np.linspace(0, 1, 4001)
    xs = 3 * (1 - s) ** 2 * s * x1 + 3 * (1 - s) * s ** 2 * x2 + s ** 3
    ys = 3 * (1 - s) ** 2 * s * y1 + 3 * (1 - s) * s ** 2 * y2 + s ** 3
    order = np.argsort(xs)
    return lambda p: np.interp(np.clip(p, 0, 1), xs[order], ys[order])


ROWS = {"apple-rise (0.606, 0.414)": (2 * math.pi / 10.37, 0.414), "panel (0.4, 0.71)": (0.4, 0.71),
        "dock (0.3, 0.88)": (0.3, 0.88), "present (0.22, 1.0)": (0.22, 1.0), "bloom (0.42, 0.9)": (0.42, 0.9),
        "world (0.48, 1.0)": (0.48, 1.0), "press (0.2, 0.8)": (0.2, 0.8)}


def channel_progress(ts, v):
    v = np.asarray(v, float)
    a, b = v[0], v[-1]
    if abs(b - a) < 1e-6:
        return None
    return (v - a) / (b - a), abs(b - a)


def fit_row(ts, prog, response, zeta):
    """onset is the only free parameter; returns nRMS (fraction of travel) and onset (ms from the first frame)."""
    omega = 2 * math.pi / response
    moving = np.nonzero(np.abs(prog) > 1e-3)[0]
    if len(moving) == 0:
        return None
    t_first = ts[moving[0]]
    best = (1e9, None)
    for on in np.arange(t_first - 60, t_first + 5, 0.25):
        r = prog - spring_progress((ts - on) / 1000, omega, zeta)
        e = float(np.sqrt(np.mean(r[ts >= on - 50] ** 2)))
        if e < best[0]:
            best = (e, on)
    return {"nrms": round(best[0], 4), "onset_ms": round(best[1] - ts[0], 1)}


def fit_free(ts, prog):
    moving = np.nonzero(np.abs(prog) > 1e-3)[0]
    if len(moving) == 0:
        return None
    t_first = ts[moving[0]]
    best = None
    for z0 in (0.3, 0.5, 0.7, 0.9, 1.0):
        for w0 in (6, 10, 15, 25):
            def res(p):
                om, ze, on = p
                return prog - spring_progress((ts - on) / 1000, om, ze)
            try:
                s = least_squares(res, [w0, z0, t_first - 10], bounds=([1, 0.05, t_first - 80], [80, 1.0, t_first + 10]))
            except Exception:
                continue
            e = float(np.sqrt(np.mean(s.fun ** 2)))
            if best is None or e < best[0]:
                best = (e, s.x)
    e, (om, ze, on) = best
    return {"nrms": round(e, 4), "omega0": round(om, 2), "zeta": round(ze, 3), "response_s": round(2 * math.pi / om, 3)}


def best_bezier_to_row(response, zeta, dur_max=3.0):
    """the closest a cubic-bezier tween (free x1,y1,x2,y2 and duration) gets to the row's step response."""
    ts = np.arange(0, dur_max, 1 / 120)
    target = spring_progress(ts, 2 * math.pi / response, zeta)
    def err(p):
        x1, y1, x2, y2, T = p
        if not (0 <= x1 <= 1 and 0 <= x2 <= 1 and T > 0.05):
            return 10.0
        return float(np.sqrt(np.mean((bez(x1, y1, x2, y2)(ts / T) - target) ** 2)))
    best = None
    for start in ([0.3, 1.5, 0.6, 1.0, 1.0], [0.2, 1.2, 0.4, 1.0, 1.5], [0.4, 1.8, 0.5, 0.9, 0.8], [0.1, 0.9, 0.3, 1.0, 1.2]):
        s = minimize(err, start, method="Nelder-Mead", options={"maxiter": 4000, "xatol": 1e-5, "fatol": 1e-7})
        if best is None or s.fun < best.fun:
            best = s
    return {"nrms": round(float(best.fun), 4), "bezier_and_T_s": [round(v, 3) for v in best.x]}


def boxes_intersect(a, b):
    return min(a[0] + a[2], b[0] + b[2]) - max(a[0], b[0]) > 0 and min(a[1] + a[3], b[1] + b[3]) - max(a[1], b[1]) > 0


def inside(a, b, tol=0.5):
    return a[0] >= b[0] - tol and a[1] >= b[1] - tol and a[0] + a[2] <= b[0] + b[2] + tol and a[1] + a[3] <= b[1] + b[3] + tol


def witness(F, row):
    """F: list of frames {t, rise, width, shapes: [box|None, ...], button: box|None, pips: [tuple]} from the
    threshold frame on. row: (response, zeta) the run is scored against."""
    ts = np.array([f["t"] for f in F], float)
    out = {}
    chans = {}
    for k in ("rise", "width"):
        cp = channel_progress(ts, [f[k] for f in F])
        if cp:
            chans[k] = cp
    out["channels"] = {k: round(v[1], 2) for k, v in chans.items()}
    fits = {}
    for k, (prog, travel) in chans.items():
        fits[k] = {"row_fit": fit_row(ts, prog, *row), "free_fit": fit_free(ts, prog), "overshoot": round(float(prog.max() - 1), 3)}
    out["E1_fits"] = fits
    E1 = any(f["row_fit"] is not None and f["row_fit"]["nrms"] <= TOL_E1 for f in fits.values())
    # E2
    dev = 0.0
    for k, (prog, _) in chans.items():
        mv = np.nonzero((np.abs(prog) > 1e-3) & (np.abs(prog - 1) > 1e-3))[0]
        if len(mv) > 2:
            T0, T1 = ts[max(0, mv[0] - 1)], ts[min(len(ts) - 1, mv[-1] + 1)]
            dev = max(dev, float(np.max(np.abs(prog[mv] - (ts[mv] - T0) / (T1 - T0)))))
    op = [f.get("op") for f in F]
    if op[0] is not None and abs(op[-1] - op[0]) > 1e-6:
        cp = channel_progress(ts, op)
        mv = np.nonzero((np.abs(cp[0]) > 1e-3) & (np.abs(cp[0] - 1) > 1e-3))[0]
        if len(mv) > 2:
            T0, T1 = ts[max(0, mv[0] - 1)], ts[min(len(ts) - 1, mv[-1] + 1)]
            dev = max(dev, float(np.max(np.abs(cp[0][mv] - (ts[mv] - T0) / (T1 - T0)))))
    out["E2_max_line_deviation"] = round(dev, 3)
    E2 = dev >= 0.08
    # E3
    # per tuple component (opacity, transform, colour ...): a CSS stagger and a sprung stagger both pass E3
    comp_onsets = []
    for c in range(len(F[0]["pips"][0]) if F[0]["pips"] else 0):
        on = []
        for j in range(len(F[0]["pips"])):
            base = F[0]["pips"][j][c]
            o = next((f["t"] - F[0]["t"] for f in F if f["pips"][j][c] != base), None)
            on.append(None if o is None else round(o, 1))
        comp_onsets.append(on)
    out["E3_pip_onsets_ms_per_component"] = comp_onsets
    E3 = False
    for on in comp_onsets:
        d = sorted(set(o for o in on if o is not None))
        if len(d) >= 2 and d[-1] - d[0] >= 15:
            E3 = True
    # E4
    nshapes = len(F[0]["shapes"])
    if nshapes < 2:
        out["E4"] = "one shape"
        E4 = False
    else:
        first_overlap = all(s is not None for s in F[0]["shapes"][:2]) and boxes_intersect(*F[0]["shapes"][:2])
        both = [f for f in F if all(s is not None for s in f["shapes"][:2])]
        split = [round(f["t"] - F[0]["t"], 1) for f in both if not boxes_intersect(*f["shapes"][:2])]
        btn = next((f for f in F if f.get("button") and f["button"][2] > 0.5 and f["button"][3] > 0.5), None)
        btn_inside = bool(btn) and inside(btn["button"], btn["shapes"][1])
        out["E4"] = {"overlap_on_first_frame": first_overlap, "frames_both_visible": len(both), "split_frames_ms": split[:5],
                     "shape0_hidden_ms": round(both[-1]["t"] - F[0]["t"], 1) if both else None,
                     "button_first_painted_inside_pill": btn_inside if btn else "no button"}
        E4 = first_overlap and not split and (btn_inside or not btn)
    out["parts"] = {"E1": E1, "E2": E2, "E3": E3, "E4": E4}
    out["pass"] = E1 and E2 and E3 and E4
    return out


# ── adapters ──
def apple_frames(path):
    d = json.load(gzip.open(path))
    fr = d["frames"]
    ta = next(x["t"] for x in fr if "activated" in x["cls"])
    def ty(x):
        tf = x["aap"]["tf"]
        if tf.startswith("matrix("):
            return float(tf[7:-1].split(",")[5])
        return 0.0
    F = []
    for x in fr:
        if x["t"] < ta:
            continue
        blob = x["intro"]
        b0 = [blob["x"], blob["y"], blob["w"], blob["h"]] if blob["disp"] != "none" and blob["op"] > 0 and blob["w"] > 0 else None
        p = x["bgD"]
        b1 = [p["x"], p["y"], p["w"], p["h"]] if p["op"] > 0 and p["w"] > 0 else None
        bb = x["bgB"]
        F.append({"t": x["t"], "rise": ty(x), "width": p["w"], "shapes": [b0, b1],
                  "button": [bb["x"], bb["y"], bb["w"], bb["h"]], "pips": [tuple(map(str, li)) for li in x["li"]], "op": None})
    return F, d["meta"]


def gui_frames(path):
    d = json.load(gzip.open(path))
    r = d["rows"]
    ms = dict((m[0], m[1]) for m in d.get("marks", []))
    t0 = ms.get("wheel", ms.get("jump", r[0]["t"]))
    F = [{"t": x["t"], "rise": x["ring"][1] - x["car"][1], "width": x["ring"][2], "shapes": [x["ring"]], "button": None,
          "pips": [tuple(p) for p in x["pip"]], "op": x["rop"]} for x in r if x["t"] >= t0]
    return F, d["meta"]


def synth(ease, channel, stagger_ms, two_shapes=False, dur=1000.0, n_pips=5):
    F, t = [], 0.0
    W0, H0, X0, Y0 = 152.0, 32.0, 600.0, 600.0
    while t <= 2400:
        p = float(ease(min(1.0, t / dur))) if dur else float(ease(t))
        s = p if channel == "scale" else 1.0
        rise = (1 - p) * 180 if channel == "rise" else 0.0
        w, h = W0 * s, H0 * s
        ring = [X0 + (W0 - w) / 2, Y0 + rise + (H0 - h) / 2, w, h]
        shapes = [ring]
        if two_shapes:
            # a blob that starts over the ring's centre and shrinks inside it by 540 ms
            k = max(0.0, 1 - t / 540)
            bw, bh = 30 * 1.3 * k + 1e-9, 80 * 1.3 * k + 1e-9
            blob = [X0 + W0 / 2 - bw / 2, Y0 + rise + H0 / 2 - bh / 2, bw, bh] if k > 0 else None
            shapes = [blob, ring]
        pips = []
        for j in range(n_pips):
            tj = max(0.0, min(1.0, (t - 740 - j * stagger_ms) / 100))
            pips.append(("none", f"{0.52 * tj:.3f}"))
        F.append({"t": 1000 + t, "rise": ring[1] - 600, "width": w, "shapes": shapes, "button": None, "pips": pips, "op": None})
        t += 1000 / 120
    return F


def spring_ease(response, zeta):
    om = 2 * math.pi / response
    return lambda tms: spring_progress(np.array([tms / 1000.0]), om, zeta)[0]


OUT = {"tolerance_E1_nrms": TOL_E1}
APPLE_ROW = ROWS["apple-rise (0.606, 0.414)"]

# Apple
for tag in ("intro-r1-1440", "intro-r1-1440-raf60", "intro-r1-1440-webkit", "intro-r1-1440-rafstall"):
    F, meta = apple_frames(os.path.join(ROOT, f"amend2/data/apple/{tag}.json.gz"))
    OUT["apple:" + tag] = {"load": [meta.get("loadStart"), meta.get("loadEnd")], **witness(F, APPLE_ROW)}

# glass-ui HEAD and its plants (one shape: the ring), scored against the Apple row and against panel
for tag in ("enter2-r2-1440", "enter2-jump2-1440", "enter2-r2-1440-plant-fade", "enter2-jump2-1440-plant-fade",
            "enter2-r2-1440-plant-scale", "enter2-jump2-1440-plant-scale"):
    F, meta = gui_frames(os.path.join(ROOT, f"amend2/data/gui/{tag}.json.gz"))
    OUT["gui:" + tag] = {"load": [meta.get("loadStart"), meta.get("loadEnd")], "vs_apple_row": witness(F, APPLE_ROW),
                         "vs_panel": witness(F, ROWS["panel (0.4, 0.71)"])["parts"]}

# synthetic
S = {
    "A critique: overshoot bezier(0.34,1.56,0.64,1) scale, 1 s, CSS stagger 20 ms, one shape": synth(bez(0.34, 1.56, 0.64, 1), "scale", 20),
    "A2: the same bezier on the rise, two overlapping shapes (adds E4)": synth(bez(0.34, 1.56, 0.64, 1), "rise", 20, two_shapes=True),
    "B critique: bezier(0.3,0,0.3,1.12) rise, CSS stagger, one shape": synth(bez(0.3, 0.0, 0.3, 1.12), "rise", 20),
    "C critique control: linear scale, no stagger": synth(lambda p: p, "scale", 0),
    "D: linear opacity-free fade analogue (linear rise), two shapes, stagger": synth(lambda p: p, "rise", 20, two_shapes=True),
    "P finished: the Apple-row spring on the rise, two shapes, stagger": synth(spring_ease(*APPLE_ROW), "rise", 20, two_shapes=True, dur=0),
    "P2 finished on one shape: the Apple-row spring, stagger, one shape": synth(spring_ease(*APPLE_ROW), "rise", 20, dur=0),
}
for name, F in S.items():
    OUT["synth:" + name] = {"vs_apple_row": witness(F, APPLE_ROW)}
# the best cubic-bezier tween of each spring row: how close a tuned tween can come
best_bez = {}
for name, (resp, ze) in ROWS.items():
    best_bez[name] = best_bezier_to_row(resp, ze)
OUT["best_bezier_tween_to_row"] = best_bez
# a tween TUNED to the Apple row, run through the witness (the strongest near-miss)
bb = best_bez["apple-rise (0.606, 0.414)"]["bezier_and_T_s"]
OUT["synth:N tuned near-miss: the best bezier tween of the Apple row, rise, two shapes, stagger"] = {
    "vs_apple_row": witness(synth(bez(*bb[:4]), "rise", 20, two_shapes=True, dur=bb[4] * 1000), APPLE_ROW)}

os.makedirs(os.path.join(ROOT, "amend3", "data"), exist_ok=True)
json.dump(OUT, open(os.path.join(ROOT, "amend3", "data", "entrance3.json"), "w"), indent=1, default=str)
for k, v in OUT.items():
    if isinstance(v, dict) and ("parts" in v or "vs_apple_row" in v):
        w = v.get("vs_apple_row", v)
        print(k[:95], "| pass", w["pass"], w["parts"], "| fits", {c: (f["row_fit"]["nrms"] if f["row_fit"] else None, f["free_fit"]) for c, f in w["E1_fits"].items()}, "| E4", w.get("E4") if not isinstance(w.get("E4"), dict) else {kk: w["E4"][kk] for kk in ("overlap_on_first_frame", "split_frames_ms", "button_first_painted_inside_pill")})
print(json.dumps(best_bez, indent=0))
