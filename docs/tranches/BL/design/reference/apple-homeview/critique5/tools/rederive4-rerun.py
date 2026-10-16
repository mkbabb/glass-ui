"""CRITIQUE-4: independent readers for the frozen checklist K-1..K-10 over GAP amend 4.

No browser, no build. Every number is read from raw runs under apple-homeview/ by code written here; where a
counterfactual needs `useLeadTrail`'s integrator, amend3/tools/worm_sim.py's `simulate` is executed (only the part above
its `OUT = {` line). The frame-drop counterfactuals use an integrator and a closed-form stepper written here.

usage (from apple-homeview/): python3 -I -B critique4/tools/rederive4.py -> critique4/data/rederive4.json
"""
import csv, gzip, json, math, os, re
import numpy as np
from scipy.optimize import least_squares

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
O = {}


def gz(p):
    return json.load(gzip.open(os.path.join(ROOT, p)))


def c(b):
    return b[0] + b[2] / 2


# ───────────────────────── K-1 / K-7: R-02 retarget legs, W1-W3 ─────────────────────────
p = os.path.join(ROOT, "amend3/tools/worm_sim.py")
ns = {"__file__": p}
exec(compile(open(p).read().split("\nOUT = {")[0], "worm_sim(head)", "exec"), ns)
simulate = ns["simulate"]


def wit(lo, hi, origin, final, k0, k1):
    s = 1 if final >= origin else -1
    lead = [h if s > 0 else l for l, h in zip(lo, hi)]
    trail = [l if s > 0 else h for l, h in zip(lo, hi)]
    a, b = min(origin, final), max(origin, final)
    w1 = max(max(a - lo[k], hi[k] - b, 0.0) for k in range(k0, k1))
    w2m = max([0.0] + [-s * (((lo[k] + hi[k]) - (lo[k - 1] + hi[k - 1])) / 2) for k in range(k0, k1)])
    w2t = max([0.0] + [-s * (trail[k] - trail[k - 1]) for k in range(k0, k1)])
    ex = [abs((hi[k] - lo[k]) - (hi[k - 1] - lo[k - 1])) - abs(lead[k] - lead[k - 1]) - 1 for k in range(k0, k1)]
    return {"W1": round(w1, 2), "W2_mid": round(w2m, 2), "W2_trail": round(w2t, 2), "W3_excess": round(max(ex), 2),
            "pass": w1 <= 0.5 and w2m <= 0.5 and w2t <= 0.5 and max(ex) <= 0}


r02 = {}
for rt in ("r1", "r2"):
    d = gz(f"amend4/data/gui/retarget-mf-{rt}-1440.json.gz")
    r, marks = d["rows"], d["marks"]
    legs = [i for i, m in enumerate(marks) if m[0] == "leg"]
    for li, mi in enumerate(legs):
        sm = {m[0]: m[1] for m in marks[mi:(legs[li + 1] if li + 1 < len(legs) else len(marks))]}
        rr = [x for x in r if sm["leg"] - 60 <= x["t"] < sm["reset"]]
        tt = [x["t"] for x in rr]
        A = [c(x["bA"]) for x in rr]; B = [c(x["bB"]) for x in rr]
        lo = [min(a, b) for a, b in zip(A, B)]; hi = [max(a, b) for a, b in zip(A, B)]
        kl = next(k for k, t in enumerate(tt) if t >= sm["launch"])
        origin = (lo[kl - 1] + hi[kl - 1]) / 2
        final = (lo[-1] + hi[-1]) / 2
        pitch = (final - origin) / 4
        kc = next(k for k, t in enumerate(tt) if t >= sm["retarget4"])
        kend = next((k for k in range(kc + 5, len(rr)) if hi[k] - lo[k] < 0.01 and abs(hi[k] - final) < 0.3), len(rr) - 1) + 1
        # choose the retarget's drive frame (the click is handled in rAF; its effect lands on frame kc or kc+1) by the
        # smaller median body error of HEAD's integrator against the measured bodies
        best = None
        for kr in (kc, kc + 1, kc + 2):
            sim = simulate(tt, {kl: origin + 2 * pitch, kr: final}, pitch, origin, "head")
            err = sorted(max(abs(lo[k] - sim[k][2]), abs(hi[k] - sim[k][3])) for k in range(kl, kend))
            if best is None or err[len(err) // 2] < best[1]:
                best = (kr, err[len(err) // 2], err[-1])
        kr = best[0]
        leg = {"retarget_ms_after_launch": round(sm["retarget4"] - sm["launch"], 1),
               "lead_speed_px_s_at_retarget": round((hi[kc] - hi[kc - 1]) / ((tt[kc] - tt[kc - 1]) / 1000), 1),
               "length_at_retarget_px": round(hi[kc] - lo[kc], 2),
               "head_sim_median_max_err_px": [round(best[1], 2), round(best[2], 2)],
               "measured_HEAD": wit(lo, hi, origin, final, kl, kend),
               "launch_frame_length_step_px": round((hi[kl] - lo[kl]) - (hi[kl - 1] - lo[kl - 1]), 2),
               "launch_frame_lead_step_px": round(hi[kl] - hi[kl - 1], 2)}
        for mode in ("head", "chain_origin", "hop_origin", "chain_origin_monotone"):
            s = simulate(tt, {kl: origin + 2 * pitch, kr: final}, pitch, origin, mode)
            w = wit([x[2] for x in s], [x[3] for x in s], origin, final, kl, kend)
            L = [x[3] - x[2] for x in s]
            w["length_step_at_retarget_px"] = round(min(L[k] - L[k - 1] for k in range(kr, kr + 3)), 2)
            leg["sim:" + mode] = w
        # a worm with no trail at all (trail == lead): does W1-W3 see that the elongation is gone?
        s = simulate(tt, {kl: origin + 2 * pitch, kr: final}, pitch, origin, "head")
        leg["sim:no-trail (trail = lead)"] = wit([x[0] for x in s], [x[0] for x in s], origin, final, kl, kend)
        r02[f"{rt}:leg{li + 1}"] = leg
    r02[f"{rt}:load"] = [d["meta"]["loadStart"], d["meta"]["loadEnd"]]
O["K-1/K-7 R-02"] = r02

# ───────────────────────── K-3: M-08 blocks ─────────────────────────
RESP, ZETA, SUB, FRAME = 0.3, 0.88, 8, 1000 / 60
W0 = 2 * math.pi / RESP
WD = W0 * math.sqrt(1 - ZETA ** 2)


def euler(tt, k0, x0, target, clamp):
    x, v, last, out = x0, 0.0, None, []
    for k, t in enumerate(tt):
        if k < k0:
            out.append(x); continue
        dt = (FRAME if last is None else min(t - last, clamp)) / 1000; last = t
        h = dt / SUB
        for _ in range(SUB):
            a = -W0 * W0 * (x - target) - 2 * ZETA * W0 * v
            v += a * h; x += v * h
        out.append(x)
    return out


def closed(tt, k0, x0, target, clamp=1e12):
    x, v, last, out = x0, 0.0, None, []
    for k, t in enumerate(tt):
        if k < k0:
            out.append(x); continue
        dt = (FRAME if last is None else min(t - last, clamp)) / 1000; last = t
        y0 = x - target; Bc = (v + ZETA * W0 * y0) / WD
        e, cs, sn = math.exp(-ZETA * W0 * dt), math.cos(WD * dt), math.sin(WD * dt)
        y = e * (y0 * cs + Bc * sn)
        v = e * (-ZETA * W0 * (y0 * cs + Bc * sn) + (-y0 * WD * sn + Bc * WD * cs))
        x = target + y
        out.append(x)
    return out


def hops(d):
    r, m = d["rows"], d["marks"]
    cl = [i for i, x in enumerate(m) if x[0].startswith("click")]
    out = {}
    for j, i in enumerate(cl):
        seg = {x[0]: x[1] for x in m[i:(cl[j + 1] if j + 1 < len(cl) else len(m))]}
        t1 = m[cl[j + 1]][1] if j + 1 < len(cl) else r[-1]["t"] + 1
        out[m[i][0]] = (seg, [x for x in r if seg[m[i][0]] - 100 <= x["t"] < t1])
    return out


ref = hops(gz("amend4/data/gui/block-r1-1440-b0.json.gz"))
m08 = {}
for Bk in (45, 150, 400):
    d = gz(f"amend4/data/gui/block-r1-1440-b{Bk}.json.gz")
    cell = {"load": [d["meta"]["loadStart"], d["meta"]["loadEnd"]], "frameDt": d["meta"]["frameDt"]}
    for name, (sm, rr) in hops(d).items():
        rsm, rrr = ref[name]
        tl = sm["launch"]
        k0 = next(k for k, x in enumerate(rr) if x["t"] >= tl)
        origin = (c(rr[k0 - 1]["bA"]) + c(rr[k0 - 1]["bB"])) / 2
        final = (c(rr[-1]["bA"]) + c(rr[-1]["bB"])) / 2
        s = 1 if final > origin else -1
        lead = [(max if s > 0 else min)(c(x["bA"]), c(x["bB"])) for x in rr]
        rlead = [(max if s > 0 else min)(c(x["bA"]), c(x["bB"])) for x in rrr]
        rt = [x["t"] - rsm["launch"] for x in rrr]
        post = [k for k, x in enumerate(rr) if x["t"] > sm["blockEnd"] and x["t"] - tl < 700][1:]
        e0 = [abs(lead[k] - np.interp(rr[k]["t"] - tl, rt, rlead)) for k in post]
        sh = np.arange(-8.4, 8.41, 0.1)
        fail_frames = sum(1 for k in post if not (np.abs(np.interp(rr[k]["t"] - tl + sh, rt, rlead) - lead[k]) <= 0.5).any())
        tt = [x["t"] for x in rr]
        travel = abs(final - origin); tol = max(1.0, 0.01 * travel)
        truth = closed(tt, k0, origin, final)
        sims = {}
        for cl_ in (40, 60, 200, 1e12):
            ld = euler(tt, k0, origin, final, cl_)
            sims[f"euler clamp {cl_ if cl_ < 1e11 else 'none'}"] = round(max(abs(ld[k] - truth[k]) for k in post), 2)
        for cl_ in (200, 401, 500):
            ld = closed(tt, k0, origin, final, cl_)
            sims[f"closed form clamp {cl_}"] = round(max(abs(ld[k] - truth[k]) for k in post), 2)
        gaps = [rr[k]["t"] - rr[k - 1]["t"] for k in range(1, len(rr))]
        cell[name] = {"block_ms": round(sm["blockEnd"] - sm["blockStart"], 1), "largest_interval_ms": round(max(gaps), 1),
                      "travel_px": round(travel, 1), "tol_px": round(tol, 2),
                      "measured_max_err_equal_time_px": round(max(e0), 2),
                      "measured_frames_outside_0.5px_at_any_shift_le_8.4ms": fail_frames, "post_frames": len(post),
                      "sim_max_err_vs_closed_form_px": sims}
    m08[f"block {Bk}"] = cell
# F1-G4's regex, read from the wave file, against a renamed clamp
wf1 = open(os.path.join(ROOT, "../../../waves/W-F.1.md")).read()
g4src = re.search(r"const g4 = grepSrc\(/(.*)/\);", wf1).group(1)
g4 = re.compile(g4src)
probes = {"HEAD useLeadTrail": "const MAX_DT_MS = 40;",
          "renamed clamp": "const STEP_CAP_MS = 500; const dt = Math.min(now - last, STEP_CAP_MS);",
          "inline clamp": "stepper.tickDt(Math.min(dt, 0.5));"}
m08["F1-G4 regex (W-F.1.md:185)"] = {"regex": g4src, "matches": {k: bool(g4.search(v)) for k, v in probes.items()}}
O["K-3 M-08"] = m08

# ───────────────────────── K-4: P-21a unguarded jump ─────────────────────────
p21 = {}
for rt in ("r1", "r2"):
    d = gz(f"amend4/data/gui/jump4-{rt}-1440.json.gz")
    r, ev = d["rows"], d["events"]
    for j, tm in enumerate([m[1] for m in d["marks"] if m[0] == "to4"]):
        e = [x for x in ev if tm - 1 <= x[0] < tm + 2400]
        tgt = next(x[4] for x in e if x[1] == "scrollTo" and x[2] == "probe")
        lib = [(round(x[0] - tm, 1), x[4], x[6]) for x in e if x[1] == "scrollTo" and x[2] == "lib"]
        se = next(x for x in e if x[1] == "scrollend")
        rr = [x for x in r if tm <= x["t"] < tm + 2400]
        k = next(i for i, x in enumerate(rr) if x["t"] >= se[0])
        p21[f"{rt}:leg{j + 1}"] = {"target": tgt, "lib_scrollTo (ms, target, sl)": lib, "scrollend_ms": round(se[0] - tm, 1),
                                   "landed_sl": rr[-1]["sl"], "cur_at_scrollend_next": [rr[k]["cur"], rr[k + 1]["cur"]],
                                   "pass": abs(rr[-1]["sl"] - tgt) <= 1 and rr[k]["cur"] == 4 and rr[k + 1]["cur"] == 4}
    p21[f"{rt}:load"] = [d["meta"]["loadStart"], d["meta"]["loadEnd"]]
# the echo-dropped instrument run (amend 3): lands, but does aria-current reach 4?
d = gz("amend3/data/gui/jump-noecho-r1-1440.json.gz")
se = [x for x in d["events"] if x[1] == "scrollend"]
p21["jump-noecho-r1: scrollend (t, sl) and cur on the next frame"] = [(round(x[0], 1), x[-1], next(y["cur"] for y in d["rows"] if y["t"] >= x[0])) for x in se]
O["K-4 P-21a"] = p21


# ───────────────────────── K-2 / K-5 / K-6: the entrance ─────────────────────────
def mat(tf, i):
    return float(tf[7:-1].split(",")[i]) if tf and tf.startswith("matrix(") else (1.0 if i == 0 else 0.0)


def blurpx(s):
    m = re.search(r"blur\(([\d.]+)px\)", s or "")
    return float(m.group(1)) if m else 0.0


def osc(t, w0, z):
    t = np.maximum(t, 0)
    if z < 1:
        wd = w0 * math.sqrt(1 - z * z)
        return 1 - np.exp(-z * w0 * t) * (np.cos(wd * t) + z * w0 / wd * np.sin(wd * t))
    return 1 - np.exp(-w0 * t) * (1 + w0 * t)


def fit(ts, prog, fixed=None):
    ts = np.asarray(ts) / 1000; prog = np.asarray(prog)
    if fixed:
        f = lambda q: osc(ts - q[0], *fixed) - prog
        q = least_squares(f, [ts[np.argmax(np.abs(prog) > 0.01)] - 0.01]).x
        res = f(q); return {"onset_ms": round(q[0] * 1000, 1), "nrms_pct": round(100 * float(np.sqrt(np.mean(res ** 2))), 3)}
    best = None
    for z0 in (0.4, 0.7, 0.95):
        f = lambda q: osc(ts - q[0], q[1], q[2]) - prog
        q = least_squares(f, [ts[np.argmax(np.abs(prog) > 0.01)] - 0.01, 12, z0], bounds=([-1, 1, 0.05], [5, 60, 1.0])).x
        res = f(q); n = float(np.sqrt(np.mean(res ** 2)))
        if best is None or n < best[0]:
            best = (n, q)
    n, q = best
    return {"onset_ms": round(q[0] * 1000, 1), "w0": round(q[1], 2), "zeta": round(q[2], 3), "nrms_pct": round(100 * n, 3)}


def apple(tag):
    d = gz(f"amend4/data/apple/{tag}-1440.json.gz")
    fr = d["frames"]
    ta = next(x["t"] for x in fr if "activated" in x["cls"])
    rows = [x for x in fr if ta - 1 <= x["t"] <= ta + 3000]
    ts = np.array([x["t"] - ta for x in rows])
    ch = {"rise": [mat(x["aap"]["tf"], 5) for x in rows], "width": [x["bgD"]["w"] for x in rows],
          "dots": [mat(x["li"][0][1], 4) for x in rows], "capsule": [float(x["pi"] or 0) for x in rows],
          "glyph_op": [x["btn"]["op"] for x in rows], "blur": [blurpx(x["bgD"]["bf"]) for x in rows]}
    out = {"load": [d["meta"]["loadStart"], d["meta"].get("loadEnd")]}
    for k, v in ch.items():
        v = np.array(v, float); tr = np.max(np.abs(v - v[0]))
        on = next((float(ts[i]) for i in range(len(v)) if abs(v[i] - v[0]) > max(1e-3, 0.002 * tr)), None)
        cell = {"travel": round(float(tr), 3), "first_change_ms": None if on is None else round(on, 1)}
        if k in ("rise", "width", "dots", "capsule", "blur") and tr > 0:
            k0 = (int(np.argmin(v)) if v[-1] > v[0] else int(np.argmax(v))) if k == "width" else 0
            seg = v[k0:]
            prog = (seg - seg[0]) / (seg[-1] - seg[0])
            cell["free_fit"] = fit(ts[k0:], prog)
            if k == "rise":
                cell["apple_row_fit (w0 10.37, zeta 0.414)"] = fit(ts, prog, (10.37, 0.414))
        out[k] = cell
    return out, d, rows, ts, ch


ent = {"apple": {}}
curves = {}
for tag in ("intro-jump-r1", "intro-jump-r2", "intro-wheel-r1", "intro-wheel-r2", "intro-outback-r1"):
    res, d, rows, ts, ch = apple(tag)
    on = res["rise"]["apple_row_fit (w0 10.37, zeta 0.414)"]["onset_ms"]
    curves[tag] = {k: (ts - on, np.array(ch[k])) for k in ("rise", "width")}
    if tag == "intro-outback-r1":
        ms = dict(d["marks"])
        fr = d["frames"]
        pre = [x for x in fr if x["t"] <= ms["outAbove"]][-1]
        aft = [x for x in fr if x["t"] >= ms["outAbove"]]
        res["NR"] = {"frames_after_out": len(aft),
                     "max_dev": {"rise": round(max(abs(mat(x["aap"]["tf"], 5) - mat(pre["aap"]["tf"], 5)) for x in aft), 4),
                                 "width": round(max(abs(x["bgD"]["w"] - pre["bgD"]["w"]) for x in aft), 4),
                                 "capsule": round(max(abs(float(x["pi"]) - float(pre["pi"])) for x in aft), 4),
                                 "blur": round(max(abs(blurpx(x["bgD"]["bf"]) - blurpx(pre["bgD"]["bf"])) for x in aft), 4)},
                     "blob_shown_again": any(x["intro"]["disp"] != "none" for x in aft)}
    ent["apple"][tag] = res


def e0(a, b, span=2000, px=0.5, maxs=40):
    out = {}
    for k in a:
        ta, va = a[k]; tb, vb = b[k]
        m = [(t, v) for t, v in zip(ta, va) if 0 <= t <= span]
        sh = np.arange(-maxs, maxs + 0.25, 0.25); worst = 0.0
        for t, v in m:
            ok = sh[np.abs(np.interp(t + sh, tb, vb) - v) <= px]
            if not len(ok):
                worst = None; break
            worst = max(worst, float(np.min(np.abs(ok))))
        out[k] = {"max_shift_ms": worst, "max_equal_time_diff_px": round(max(abs(v - np.interp(t, tb, vb)) for t, v in m), 2)}
    return out


for rr_ in ("r1", "r2"):
    ent["apple"][f"E0 {rr_} (wheel vs jump)"] = e0(curves[f"intro-wheel-{rr_}"], curves[f"intro-jump-{rr_}"])


def parse_lin(s):
    m = re.match(r"\s*linear\((.*)\)\s*$", s or "")
    pts = []
    for part in m.group(1).split(","):
        tk = part.split(); y = float(tk[0])
        pts.append([y, float(tk[1].rstrip("%")) / 100 if len(tk) > 1 else None])
    pts[0][1] = 0.0 if pts[0][1] is None else pts[0][1]
    pts[-1][1] = 1.0 if pts[-1][1] is None else pts[-1][1]
    return pts


def eq_lin(a, b):
    pa, pb = parse_lin(a), parse_lin(b)
    return len(pa) == len(pb) and all(abs(p[0] - q[0]) <= 1e-4 and abs(p[1] - q[1]) <= 1e-3 for p, q in zip(pa, pb))


gui = {}
for tag in ("enter3-jump-1440-h500", "enter3-wheel-1440-h500", "enter3-outback-1440-h500",
            "enter3-jump-1440-h500-plant-linear", "enter3-wheel-1440-h500-plant-linear",
            "enter3-jump-1440-h500-plant-token", "enter3-wheel-1440-h500-plant-token",
            "enter3-jump-1440-h500-plant-rafspring", "enter3-outback-1440-h500-plant-replay",
            "enter3-below-wheel-1440-h500-k2-plant-cascade", "enter3-below-wheel-1440-h500-k2-plant-linear"):
    d = gz(f"amend4/data/gui/{tag}.json.gz")
    ms = dict((m[0], m[1]) for m in d["marks"])
    t0 = ms.get("wheel", ms.get("jump", d["rows"][0]["t"]))
    rr = [x for x in d["rows"] if x["t"] >= t0 and x["t"] < ms.get("out", 1e12)]
    ts = np.array([x["t"] - t0 for x in rr])
    rise = np.array([x["ring"][1] - x["car"][1] for x in rr])
    width = np.array([x["ring"][2] for x in rr])
    span = np.array([max(x["bA"][0] + x["bA"][2], x["bB"][0] + x["bB"][2]) - min(x["bA"][0], x["bB"][0]) for x in rr])
    blur_ = np.array([blurpx(x["mat"][0]) for x in rr])
    cell = {"load": [d["meta"]["loadStart"], d["meta"].get("loadEnd")],
            "travel": {"rise": round(float(np.ptp(rise)), 2), "width": round(float(np.ptp(width)), 2),
                       "worm span": round(float(np.ptp(span)), 2), "blur": round(float(np.ptp(blur_)), 2)}}
    if np.ptp(rise) > 1:
        prog = (rise - rise[0]) / (rise[-1] - rise[0])
        cell["rise fit to the Apple row (10.37, 0.414)"] = fit(ts, prog, (10.37, 0.414))
        cell["rise fit to panel (2pi/0.4, 0.71)"] = fit(ts, prog, (2 * math.pi / 0.4, 0.71))
    T = []
    for a in d["anims"]:
        if not set(a.get("props") or []) & {"translate", "transform", "scale", "width"}:
            continue
        kfe = [e for e in (a.get("kfEasing") or []) if isinstance(e, str) and e.startswith("linear(")] if isinstance(a.get("kfEasing"), list) else []
        eas = kfe[0] if kfe else a["easing"]
        rows_ = [n for n, tk in d["tokens"].items() if eas.startswith("linear(") and eq_lin(eas, tk["easing"])
                 and isinstance(a["duration"], (int, float)) and abs(float(tk["duration"].rstrip("s")) * 1000 - a["duration"]) <= 0.5]
        T.append({"name": a["name"], "timeline": a["timeline"], "duration": a["duration"], "equals_token": rows_,
                  "ok": bool(rows_) and a["timeline"] == "DocumentTimeline"})
    cell["T"] = {"geometric_animations": T, "pass": all(x["ok"] for x in T)}
    if "out" in ms:
        pre = [x for x in d["rows"] if x["t"] < ms["out"]][-1]
        aft = [x for x in d["rows"] if x["t"] >= ms["out"]]
        cell["NR max rise dev after out (px)"] = round(max(abs((x["ring"][1] - x["car"][1]) - (pre["ring"][1] - pre["car"][1])) for x in aft), 2)
    gui[tag] = cell
ent["gui"] = gui
O["K-2/K-5/K-6 entrance"] = ent

# ───────────────────────── K-7 (and the M-05 amend): sweep order, length continuity on Apple ─────────────────────────
def csvrows(n):
    return [{"ms": float(r["ms"]), "sl": float(r["sl"]), "w": [float(r[f"w{i}"]) for i in range(7)]} for r in csv.DictReader(open(os.path.join(ROOT, "samples", n)))]


def sweep(rows, a, b):
    k0 = next(k for k in range(1, len(rows)) if rows[k]["sl"] != rows[k - 1]["sl"]) - 1
    k1 = max(k for k in range(1, len(rows)) if rows[k]["sl"] != rows[k - 1]["sl"])
    st = 1 if b > a else -1
    first = {i: next((rows[k]["ms"] - rows[k0]["ms"] for k in range(k0, k1 + 1) if rows[k]["w"][i] > 8.5), None) for i in range(a + st, b, st)}
    ex = [sum(max(0.0, w - 8) for w in rows[k]["w"]) for k in range(k0, k1 + 1)]
    return {"first_reached_ms_after_move_start": first,
            "max_dot_width_step_px": round(max(max(abs(rows[k]["w"][i] - rows[k - 1]["w"][i]) for i in range(7)) for k in range(k0 + 1, k1 + 1)), 2),
            "max_excess_sum_step_px": round(max(abs(ex[j] - ex[j - 1]) for j in range(1, len(ex))), 3)}


m05 = {"apple rewind 6->0": sweep(csvrows("timeline-ended.csv"), 6, 0), "apple click 0->3": sweep(csvrows("timeline-dotclick.csv"), 0, 3)}
d = gz("amend2/data/gui/fps-r1-1440.json.gz")
r = d["rows"]; c0 = c(r[0]["bA"])
for name, tm in d["marks"]:
    prev = [x for x in r if x["t"] < tm][-1]["cur"]; b = int(name[5:])
    if abs(b - prev) < 2:
        continue
    rr = [x for x in r if tm <= x["t"] < tm + 600]
    rl, rh = rr[0]["ring"][0], rr[0]["ring"][0] + rr[0]["ring"][2]
    st = 1 if b > prev else -1
    first = {}
    for i in range(prev + st, b, st):
        ci = c0 + 40 * i
        for x in rr:
            sp = [(x["bA"][0], x["bA"][0] + x["bA"][2]), (x["bB"][0], x["bB"][0] + x["bB"][2])]
            if float(x["nkOp"] or 0) > 0:
                sp.append((x["nk"][0], x["nk"][0] + x["nk"][2]))
            if max(rl, min(s[0] for s in sp)) <= ci <= min(rh, max(s[1] for s in sp)):
                first[i] = round(x["t"] - tm, 1); break
    m05[f"glass-ui {name} ({prev}->{b})"] = first
O["K-7/M-05"] = m05

# ───────────────────────── K-8 spot re-derivations (rows CRITIQUE-3 §2 did not list) ─────────────────────────
k8 = {}
for rt in ("r1", "r2"):
    d = gz(f"amend2/data/gui/material-r1-1440.json.gz".replace("r1", rt))
    k8[f"P-27 material-{rt}: distinct (ring w,h, mat tuple) over frames"] = [len({(tuple(x["ring"][2:]), tuple(x["mat"])) for x in d["rows"]}), len(d["rows"])]
for rt in ("r1", "r2"):
    d = gz(f"amend2/data/gui/reduced-pager-{rt}-1440.json.gz")
    r = d["rows"]; out = []
    for name, tm in d["marks"]:
        if not name.startswith("click"):
            continue
        rr = [[x for x in r if x["t"] < tm][-1]] + [x for x in r if tm <= x["t"] < tm + 600]
        mv = [x for i, x in enumerate(rr[1:], 1) if (c(x["bA"]), c(x["bB"])) != (c(rr[i - 1]["bA"]), c(rr[i - 1]["bB"]))]
        out.append({"click": name, "moving_frames": len(mv), "first_move_ms": round(mv[0]["t"] - tm, 1) if mv else None,
                    "neck_frames": sum(1 for x in rr if float(x["nkOp"] or 0) > 0), "max_stretch": max(float(x["str"]) for x in rr)})
    k8[f"P-36 reduced-pager-{rt}"] = out
d = gz("amend2/data/gui/press-cancel-touch-r1-390.json.gz")
ms = dict(d["marks"])
k8["M-07 touch: press index set during, after up; cur before/after"] = {
    "press_set_frames_after_dragOff": sum(1 for x in d["rows"] if x["t"] > ms["dragOff"] and x["press"] != -1),
    "last_press_set_ms_after_dragOff": max([round(x["t"] - ms["dragOff"], 1) for x in d["rows"] if x["t"] > ms["dragOff"] and x["press"] != -1] or [None]),
    "cur": [d["rows"][0]["cur"], d["rows"][-1]["cur"]]}
for rt in ("r1", "r2"):
    d = gz(f"amend2/data/gui/keyboard-{rt}-1440.json.gz")
    r = d["rows"]; seq = []
    for name, tm in d["marks"][1:]:
        x = [y for y in r if y["t"] >= tm + 400][0]
        seq.append((name, x["foc"], x["cur"]))
    k8[f"M-06 keyboard-{rt}: (key, focus, aria-current) 400 ms after; scrollLeft values"] = [seq, sorted({x["sl"] for x in r})]
O["K-8 spot"] = k8

os.makedirs(os.path.join(ROOT, "critique4", "data"), exist_ok=True)
json.dump(O, open(os.path.join(ROOT, "critique5", "data", "rederive4-rerun.json"), "w"), indent=1, default=lambda o: float(o) if isinstance(o, np.floating) else str(o))
print(json.dumps(O, indent=1, default=lambda o: float(o) if isinstance(o, np.floating) else str(o)))
