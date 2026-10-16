"""AMEND-4: the worm's retarget and frame-drop witnesses, measured on glass-ui HEAD and re-run on the measured clocks.

R-02 (CRITIQUE-3 refuted A3's addendum and witness). The retarget is issued 46 / 80 / 120 / 250 ms after the launch
frame (amend4/data/gui/retarget-mf-r*-1440: hop 0 -> 2 on the hero worm, retarget to 4, issued in-page from rAF).
The witness, all on every frame from the launch to rest:
  W1 every body centre within 0.5 px of [chain origin, final target]
  W2 neither the bodies' midpoint nor the trailing body steps against the travel by more than 0.5 px
  W3 continuity: the worm's length (lead centre - trail centre) changes by no more than the lead's own one-frame
     displacement + 1 px (CRITIQUE-3 §4 item 3)
Measured on HEAD, then re-run by amend3/tools/worm_sim.py's integrator (loaded by executing the part above its
`OUT = {` line) on each leg's measured clock under HEAD's law and W-F.3 cure 4's readings: chain_origin (bound by the
distance from where the chain began), hop_origin (A3's addendum: the origin reset at every drive) and
chain_origin_monotone (bound by the chain origin, the trailing edge never moving against the travel).

M-08 (CRITIQUE-3: the A3 arm passes a renamed clamp raised to 60 ms). One main-thread block of 45, 150 or 400 ms is
issued 30 ms after each launch frame (amend4/data/gui/block-r1-1440-b{0,45,150,400}; b0 is the reference clock), on
the 208 px worm carousel's +1 / +3 / -4 hops. Witness: on every frame after the block (the first is skipped: it reads the
pre-block commit), the lead body matches the reference run's lead curve within 0.5 px at a time shift of at most one
120 Hz frame (8.4 ms; the two runs' frame phases differ). Then simulated leads, HEAD's integrator with MAX_DT_MS 40, 60, 100, 140, 200 and none, and a closed-form (analytic) stepper, each
on the measured block clock, scored against the closed form on the same clock (within max(1 px, 1 % of the hop)).

usage: python3 -I -B amend4/tools/worm4.py  (from apple-homeview/) -> amend4/data/worm4.json
"""
import gzip, json, math, os
import numpy as np

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
p = os.path.join(ROOT, "amend3/tools/worm_sim.py")
ns = {"__file__": p}
exec(compile(open(p).read().split("\nOUT = {")[0], "worm_sim.py(head)", "exec"), ns)
simulate, ctr = ns["simulate"], ns["ctr"]
OMEGA, ZETA, FRAME = ns["OMEGA"], ns["ZETA"], ns["FRAME"]


def load(tag):
    f = os.path.join(ROOT, f"amend4/data/gui/{tag}.json.gz")
    return json.load(gzip.open(f)) if os.path.exists(f) else None


def witness(lo, hi, origin, final, k0, k1):
    sgn = 1 if final >= origin else -1
    lead = hi if sgn > 0 else lo
    trail = lo if sgn > 0 else hi
    mid = [(a + b) / 2 for a, b in zip(lo, hi)]
    L = [b - a for a, b in zip(lo, hi)]
    a, b = min(origin, final), max(origin, final)
    outside = max(max(a - lo[k], hi[k] - b, 0) for k in range(k0, k1))
    back_mid = max([0] + [-(mid[k] - mid[k - 1]) * sgn for k in range(k0, k1)])
    back_trail = max([0] + [-(trail[k] - trail[k - 1]) * sgn for k in range(k0, k1)])
    excess = [abs(L[k] - L[k - 1]) - (abs(lead[k] - lead[k - 1]) + 1) for k in range(k0, k1)]
    kx = int(np.argmax(excess))
    return {"W1_outside_px": round(outside, 2), "W2_back_mid_px": round(back_mid, 2), "W2_back_trail_px": round(back_trail, 2),
            "W3_worst_excess_px": round(max(excess), 2), "W3_worst_at_frame": kx + k0,
            "W3_worst_dL_px": round(L[kx + k0] - L[kx + k0 - 1], 2), "W3_worst_dlead_px": round(lead[kx + k0] - lead[kx + k0 - 1], 2),
            "pass": outside <= 0.5 and back_mid <= 0.5 and back_trail <= 0.5 and max(excess) <= 0}, \
        ("W1" if outside > 0.5 else "") + ("W2" if max(back_mid, back_trail) > 0.5 else "") + ("W3" if max(excess) > 0 else "")


OUT = {}
# ── R-02 ──
for rt in ("r1", "r2"):
    d = load(f"retarget-mf-{rt}-1440")
    if d is None:
        continue
    r, marks = d["rows"], d["marks"]
    times = [x["t"] for x in r]
    res = {"load": [d["meta"]["loadStart"], d["meta"]["loadEnd"]], "frameDt": d["meta"].get("frameDt"), "legs": {}}
    legs = [i for i, m in enumerate(marks) if m[0] == "leg"]
    for li, mi in enumerate(legs):
        seg = marks[mi:(legs[li + 1] if li + 1 < len(legs) else len(marks))]
        sm = {m[0]: m[1] for m in seg}
        t_launch, t_ret = sm["launch"], sm["retarget4"]
        t_end = sm["reset"]
        ks = [k for k, x in enumerate(r) if sm["leg"] - 60 <= x["t"] < t_end]
        rr = [r[k] for k in ks]; tt = [x["t"] for x in rr]
        kl = next(k for k, x in enumerate(rr) if x["t"] >= t_launch)
        origin = ctr(rr[kl - 1]["bA"])
        final = (ctr(rr[-1]["bA"]) + ctr(rr[-1]["bB"])) / 2
        pitch = (final - origin) / 4
        lo = [min(ctr(x["bA"]), ctr(x["bB"])) for x in rr]; hi = [max(ctr(x["bA"]), ctr(x["bB"])) for x in rr]
        # the retarget's first effective frame: the first frame after the click whose measured midpoint departs
        # from HEAD's simulation of the first hop alone by > 0.5 px (worm_sim's rule)
        solo = simulate(tt, {kl: origin + 2 * pitch}, pitch, origin)
        kc = next(k for k, x in enumerate(rr) if x["t"] >= t_ret)
        kr = next(k for k in range(kc, len(rr)) if abs((lo[k] + hi[k]) / 2 - (solo[k][2] + solo[k][3]) / 2) > 0.5)
        kend = next((k for k in range(kr + 5, len(rr)) if abs(hi[k] - lo[k]) < 0.01 and abs(hi[k] - final) < 0.3), len(rr) - 1) + 1
        v_lead = (hi[kc] - hi[kc - 1]) / ((tt[kc] - tt[kc - 1]) / 1000)
        leg = {"retarget_ms_after_launch_frame": round(t_ret - t_launch, 1), "retarget_effective_frame_ms_after_launch": round(tt[kr] - t_launch, 1),
               "origin_px": round(origin, 2), "pitch_px": round(pitch, 2), "lead_speed_at_retarget_px_s": round(v_lead, 1),
               "length_before_px": round(hi[kc] - lo[kc], 2)}
        w, why = witness(lo, hi, origin, final, kl, kend)
        leg["measured_HEAD"] = {**w, "fails_on": why}
        leg["measured_HEAD"]["W3_worst_ms_after_launch"] = round(tt[w["W3_worst_at_frame"]] - t_launch, 1)
        drives = {kl: origin + 2 * pitch, kr: final}
        head = simulate(tt, drives, pitch, origin, "head")
        err = [max(abs(lo[k] - head[k][2]), abs(hi[k] - head[k][3])) for k in range(kl, kend)]
        leg["head_sim_vs_measured_px"] = {"median": round(sorted(err)[len(err) // 2], 2), "max": round(max(err), 2)}
        for mode in ("head", "chain_origin", "hop_origin", "chain_origin_monotone"):
            s = simulate(tt, drives, pitch, origin, mode)
            ww, why2 = witness([x[2] for x in s], [x[3] for x in s], origin, final, kl, kend)
            ww["fails_on"] = why2
            # the one-frame length change at the retarget (what A3's witness did not read)
            Ls = [x[3] - x[2] for x in s]
            ww["length_change_at_retarget_px"] = [round(Ls[k] - Ls[k - 1], 2) for k in range(kr, kr + 3)]
            leg["sim:" + mode] = ww
        res["legs"][f"delay_{int(round(t_ret - t_launch))}"] = leg
    OUT[f"R-02:{rt}"] = res


# ── M-08 ──
def analytic(times, drives, x0, frame_first=True):
    """closed-form damped oscillator (dock row) stepped by the true dt (W-F.1's springStepper is closed form)."""
    x, v, target, last, running = x0, 0.0, x0, None, False
    wd = OMEGA * math.sqrt(1 - ZETA * ZETA)
    out = []
    for k, t in enumerate(times):
        if k in drives:
            target = drives[k]; running = True
        if not running:
            out.append(x); continue
        dt = ((t - last) if last is not None else FRAME) / 1000
        last = t
        y0, y1 = x - target, v
        e = math.exp(-ZETA * OMEGA * dt)
        c, s_ = math.cos(wd * dt), math.sin(wd * dt)
        A = y0; B = (y1 + ZETA * OMEGA * y0) / wd
        y = e * (A * c + B * s_)
        vy = e * ((-ZETA * OMEGA) * (A * c + B * s_) + (-A * wd * s_ + B * wd * c))
        x, v = target + y, vy
        out.append(x)
    return out


def hop_legs(d):
    r, marks = d["rows"], d["marks"]
    legs = []
    clicks = [i for i, m in enumerate(marks) if m[0].startswith("click")]
    for ci, i in enumerate(clicks):
        seg = marks[i:(clicks[ci + 1] if ci + 1 < len(clicks) else len(marks))]
        sm = {m[0]: m[1] for m in seg}
        t_end = marks[clicks[ci + 1]][1] if ci + 1 < len(clicks) else r[-1]["t"] + 1
        rr = [x for x in r if sm[seg[0][0]] - 100 <= x["t"] < t_end]
        legs.append((seg[0][0], sm, rr))
    return legs


def lead_of(rr, sgn):
    return [(max if sgn > 0 else min)(ctr(x["bA"]), ctr(x["bB"])) for x in rr]


ref = load("block-r1-1440-b0")
m08 = {}
if ref:
    ref_legs = {name: (sm, rr) for name, sm, rr in hop_legs(ref)}
    m08["reference"] = {"load": [ref["meta"]["loadStart"], ref["meta"]["loadEnd"]], "frameDt": ref["meta"].get("frameDt")}
    for B in (45, 150, 400):
        d = load(f"block-r1-1440-b{B}")
        if d is None:
            continue
        cell = {"load": [d["meta"]["loadStart"], d["meta"]["loadEnd"]], "frameDt": d["meta"].get("frameDt"), "hops": {}}
        for name, sm, rr in hop_legs(d):
            rsm, rrr = ref_legs[name]
            tl, rtl = sm["launch"], rsm["launch"]
            k0 = next(k for k, x in enumerate(rr) if x["t"] >= tl)
            origin = (ctr(rr[k0 - 1]["bA"]) + ctr(rr[k0 - 1]["bB"])) / 2
            final = (ctr(rr[-1]["bA"]) + ctr(rr[-1]["bB"])) / 2
            sgn = 1 if final >= origin else -1
            travel = abs(final - origin)
            tol = max(1.0, 0.01 * travel)
            lead = lead_of(rr, sgn); rlead = lead_of(rrr, sgn)
            rt = [x["t"] - rtl for x in rrr]
            t_be = sm.get("blockEnd")
            # the first frame after the block is skipped: the sampler's rAF callback reads the styles the worm committed
            # before the block (a one-frame read lag, visible only where a frame lasts 150-400 ms)
            post = [k for k, x in enumerate(rr) if t_be is not None and x["t"] > t_be and x["t"] - tl < 700][1:]
            errs = [lead[k] - float(np.interp(rr[k]["t"] - tl, rt, rlead)) for k in post]
            # cross-run phase: the smallest shift (<= 40 ms) that brings each post-block frame within 0.5 px of the
            # reference run's lead curve; the witness allows one 120 Hz frame (8.4 ms)
            shifts = np.arange(-40, 40.25, 0.25); worst = 0.0
            for k in post:
                dd = np.abs(np.interp(rr[k]["t"] - tl + shifts, rt, rlead) - lead[k]); ok = shifts[dd <= 0.5]
                worst = None if (worst is None or len(ok) == 0) else max(worst, float(np.min(np.abs(ok))))
            gaps = [rr[k]["t"] - rr[k - 1]["t"] for k in range(1, len(rr))]
            h = {"travel_px": round(travel, 1), "tolerance_px": round(tol, 2), "largest_frame_interval_ms": round(max(gaps), 1),
                 "block_ms_measured": round(t_be - sm["blockStart"], 1) if t_be else None,
                 "first_post_block_frame_ms_after_launch": round(rr[post[0]]["t"] - tl, 1) if post else None,
                 "first_post_block_error_px": round(errs[0], 2) if errs else None,
                 "max_abs_error_px": round(max(abs(e) for e in errs), 2) if errs else None}
            h["max_shift_to_reference_ms"] = None if worst is None else round(worst, 2)
            h["measured_HEAD_pass"] = bool(errs) and worst is not None and worst <= 8.4
            # simulated leads on this run's clock, scored against the closed form on the same clock
            tt = [x["t"] for x in rr]
            drives = {k0: origin + (final - origin)}
            truth = analytic(tt, drives, origin)
            sims = {}
            for clamp in (40, 60, 100, 140, 200, None):
                ns["MAXDT"] = clamp if clamp is not None else 1e12
                s = simulate(tt, drives, 40.0, origin, "head")
                ld = [x[0] for x in s]
                e = [ld[k] - truth[k] for k in post]
                sims[f"MAX_DT_MS {clamp}" if clamp else "no clamp (HEAD substeps)"] = {"max_abs_error_px": round(max(abs(v) for v in e), 2) if e else None,
                                                                                        "pass": bool(e) and max(abs(v) for v in e) <= tol}
            ns["MAXDT"] = 40.0
            # sanity: HEAD's integrator (clamp 40) on this clock against the measured lead
            s = simulate(tt, drives, 40.0, origin, "head")
            e1 = [min(abs(s[k][0] - lead[k]), abs(s[k][0] - lead[min(k + 1, len(rr) - 1)])) for k in range(k0, len(rr))]
            h["head_sim_vs_measured_lead_px (one-frame read lag allowed)"] = {"median": round(sorted(e1)[len(e1) // 2], 2), "max": round(max(e1), 2)}
            sims["closed form"] = {"max_abs_error_px": 0.0, "pass": True}
            h["sims"] = sims
            cell["hops"][name] = h
        m08[f"block {B} ms"] = cell
OUT["M-08"] = m08

json.dump(OUT, open(os.path.join(ROOT, "amend4", "data", "worm4.json"), "w"), indent=1)
print(json.dumps(OUT, indent=1)[:12000])
