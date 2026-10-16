"""AMEND-3: establish the cause of the worm's launch and same-direction-retarget back-steps (R-02, P-23 worm)
by re-running useLeadTrail's integrator (src/composables/motion/morph/useLeadTrail.ts, read at HEAD 0a74ec043:
`dock` row response 0.3 / zeta 0.88, 8 semi-implicit substeps, MAX_DT_MS 40, first step FRAME_MS = 1000/60,
trail = x - clamp(v*0.08, +-ceil), ceil = elongationCeil(span, pitch) with span = target - lead re-read on each
drive, worm.ts:203-215) on the MEASURED frame clock of gap/data/retarget-r1/r2-1440 (and the 208 px worm carousel
hops of amend2/data/gui/fps-r1-1440), and comparing the simulated body centres with the measured ones.

Then the counterfactuals W-F.3 cure 4 leaves open: bound = min(ceil, |lead - origin|) with
  (a) origin = the lead where the CHAIN began (the first drive from rest), held through a retarget
  (b) origin = the lead at the LATEST drive (every retarget starts a new hop)
and two candidate cures that carry velocity: (c) bound by the distance from the chain origin, with the trail edge
also never moving against the travel direction (monotone trail). Reports, per case: the midpoint's first step
after launch and after the retarget, the largest backward midpoint step, and the largest excursion of a body
outside [chain origin, final target].

usage: python3 -I -B amend3/tools/worm_sim.py   (from apple-homeview/) -> amend3/data/worm-sim.json
"""
import gzip, json, math, os

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
RESP, ZETA, TAU, SUB, MAXDT, FRAME = 0.3, 0.88, 0.08, 8, 40.0, 1000 / 60
OMEGA = 2 * math.pi / RESP


def ctr(b):
    return b[0] + b[2] / 2


def elong_ceil(span, pitch):
    w = abs(span) * 0.55
    return pitch if w < pitch else 3 * pitch if w > 3 * pitch else w


def simulate(times, drives, pitch, x0, mode="head"):
    # modes: head (HEAD's law); head_fixed_ceil (HEAD, but the ceiling keeps the FIRST drive's span: isolates the
    # span re-read of worm.ts:241); chain_origin / hop_origin (W-F.3 cure 4 under its two readings);
    # chain_origin_monotone (cure 4 by the chain origin, plus a trail that never moves against the travel)
    """times: frame timestamps (ms). drives: {frame_index: target}. Returns per-frame (lead, trail, lo, hi)."""
    x, v, target, last, span = x0, 0.0, x0, 0.0, 0.0
    chain_origin, hop_origin, running = x0, x0, False
    trail_prev = x0
    out = []
    for k, t in enumerate(times):
        if k in drives:
            target = drives[k]
            if not (mode == "head_fixed_ceil" and running):
                span = target - x
            hop_origin = x
            if not running:
                chain_origin = x
                last = 0.0
                trail_prev = x
            running = True
        if not running:
            out.append((x, x, x, x)); continue
        dt = (min(t - last, MAXDT) if last else FRAME) / 1000
        last = t
        h = dt / SUB
        for _ in range(SUB):
            a = -OMEGA * OMEGA * (x - target) - 2 * ZETA * OMEGA * v
            v += a * h
            x += v * h
        ceil = elong_ceil(span, pitch)
        if mode in ("head", "head_fixed_ceil"):
            bound = ceil
        elif mode == "chain_origin":
            bound = min(ceil, abs(x - chain_origin))
        elif mode == "hop_origin":
            bound = min(ceil, abs(x - hop_origin))
        elif mode == "chain_origin_monotone":
            bound = min(ceil, abs(x - chain_origin))
        off = v * TAU
        off = max(-bound, min(bound, off))
        tr = x - off
        if mode == "chain_origin_monotone":
            sgn = 1 if target >= chain_origin else -1
            tr = max(tr, trail_prev) if sgn > 0 else min(tr, trail_prev)
            trail_prev = tr
        out.append((x, tr, min(x, tr), max(x, tr)))
        if abs(x - target) < 0.3 and abs(v) < 2:
            x, v, running = target, 0.0, False
            out[-1] = (x, x, x, x)
    return out


def first_change(rows, k0, key=lambda x: (ctr(x["bA"]), ctr(x["bB"]))):
    base = key(rows[k0 - 1])
    return next(k for k in range(k0, len(rows)) if any(abs(a - b) > 0.01 for a, b in zip(key(rows[k]), base)))


def metrics(sim, k_launch, k_ret, origin, final):
    mids = [(s[2] + s[3]) / 2 for s in sim]
    sgn = 1 if final >= origin else -1
    steps = [mids[k] - mids[k - 1] for k in range(1, len(mids))]
    back = [s * sgn for s in steps if s * sgn < 0]
    lo, hi = min(origin, final), max(origin, final)
    outside = max(max(lo - s[2], s[3] - hi, 0) for s in sim)
    m = {"launch_first_mid_step_px": round(mids[k_launch] - mids[k_launch - 1], 2),
         "largest_backward_mid_step_px": round(-min(back), 2) if back else 0.0,
         "backward_mid_frames": len(back),
         "body_outside_chain_span_px": round(outside, 2)}
    if k_ret is not None:
        m["retarget_trail_body_steps_px"] = [round(sim[k][2 if sgn > 0 else 3] - sim[k - 1][2 if sgn > 0 else 3], 2) for k in range(k_ret, k_ret + 4)]
        m["retarget_mid_steps_px"] = [round(mids[k] - mids[k - 1], 2) for k in range(k_ret, k_ret + 4)]
        m["retarget_backward_px_total"] = round(sum(min(0, (mids[k] - mids[k - 1]) * sgn) for k in range(k_ret, k_ret + 6)), 2)
    return m


OUT = {"source_read": {"useLeadTrail.ts": "dock row (springPresets.ts:84-90) 0.3 / 0.88; SUBSTEPS 8; MAX_DT_MS 40; tau 0.08; trailOffset clamp(v*tau, +-ceil)",
                       "worm.ts": "ceil = elongationCeil(span, pitch); span = c - worm.lead.value on every drive (driveActive)"}}

# ── the hero's same-direction retarget (gap/data/retarget-r*: click dot 2, then dot 4 at +272 / +262 ms) ──
for rt in ("r1", "r2"):
    d = json.load(gzip.open(os.path.join(ROOT, f"gap/data/retarget-{rt}-1440.json.gz")))
    r, ms = d["rows"], dict(d["marks"])
    r = [x for x in r if x["t"] < ms["click0"]]  # the two-drive chain only (later clicks are other hops)
    times = [x["t"] for x in r]
    k2 = next(k for k, x in enumerate(r) if x["t"] > ms["click2"])
    kl = first_change(r, k2)
    k4 = next(k for k, x in enumerate(r) if x["t"] > ms["click4"])
    origin = ctr(r[kl - 1]["bA"])
    pitch = 28.0
    # the retarget's first effective frame: the first frame whose measured midpoint departs from the HEAD
    # simulation of the first hop alone by > 0.5 px
    solo = simulate(times, {kl: origin + 2 * pitch}, pitch, origin)
    meas_mid = [(ctr(x["bA"]) + ctr(x["bB"])) / 2 for x in r]
    kr = next(k for k in range(k4, len(r)) if abs(meas_mid[k] - (solo[k][2] + solo[k][3]) / 2) > 0.5)
    drives = {kl: origin + 2 * pitch, kr: origin + 4 * pitch}
    res = {"load": [d["meta"]["loadStart"], d["meta"]["loadEnd"]], "origin_px": origin, "pitch": pitch,
           "launch_frame_ms_after_click2": round(r[kl]["t"] - ms["click2"], 1),
           "retarget_frame_ms_after_click4": round(r[kr]["t"] - ms["click4"], 1)}
    head = simulate(times, drives, pitch, origin, "head")
    err = [max(abs(ctr(r[k]["bA"]) - head[k][2]), abs(ctr(r[k]["bB"]) - head[k][3])) for k in range(kl, min(len(r), kr + 40))]
    res["head_sim_vs_measured_max_err_px"] = round(max(err), 3)
    res["head_sim_vs_measured_median_err_px"] = round(sorted(err)[len(err) // 2], 3)
    res["measured"] = metrics([(None, None, ctr(x["bA"]), ctr(x["bB"])) for x in r], kl, kr, origin, origin + 4 * pitch)
    kw = max(range(len(err)), key=lambda j: err[j])
    res["head_sim_worst_err_at_ms_after_click2"] = round(r[kl + kw]["t"] - ms["click2"], 1)
    for mode in ("head", "head_fixed_ceil", "chain_origin", "hop_origin", "chain_origin_monotone"):
        res[mode] = metrics(simulate(times, drives, pitch, origin, mode), kl, kr, origin, origin + 4 * pitch)
    # the same sim with the lead's velocity zeroed at the retarget isolates the span re-read: if the back-step
    # survives, it is the clamp's ceiling change; if it vanishes, it is the velocity term
    OUT[f"retarget:{rt}"] = res

# ── the worm carousel hops (fps-r1-1440: +1, +3, -4 pitch on a 40 px pitch) ──
d = json.load(gzip.open(os.path.join(ROOT, "amend2/data/gui/fps-r1-1440.json.gz")))
r, ms = d["rows"], d["marks"]
times = [x["t"] for x in r]
hops = []
pitch = 40.0
for i, (name, tm) in enumerate(ms):
    k0 = next(k for k, x in enumerate(r) if x["t"] > tm)
    kl = first_change(r, k0)
    origin = (ctr(r[kl - 1]["bA"]) + ctr(r[kl - 1]["bB"])) / 2
    tm1 = ms[i + 1][1] if i + 1 < len(ms) else r[-1]["t"] + 1
    kend = max(k for k, x in enumerate(r) if x["t"] < tm1)
    final = (ctr(r[kend]["bA"]) + ctr(r[kend]["bB"])) / 2
    seg_t = times[kl - 1:kend + 1]
    h = {"hop": name, "dist_px": round(final - origin, 2)}
    head = simulate(seg_t, {1: final}, pitch, origin, "head")
    err = [max(abs(ctr(r[kl - 1 + j]["bA"]) - head[j][2]), abs(ctr(r[kl - 1 + j]["bB"]) - head[j][3])) for j in range(1, len(seg_t))]
    h["head_sim_vs_measured_max_err_px"] = round(max(err), 3)
    for mode in ("head", "chain_origin", "hop_origin", "chain_origin_monotone"):
        h[mode] = metrics(simulate(seg_t, {1: final}, pitch, origin, mode), 1, None, origin, final)
    hops.append(h)
OUT["fps-hops"] = {"load": [d["meta"]["loadStart"], d["meta"]["loadEnd"]], "hops": hops}

os.makedirs(os.path.join(ROOT, "amend3", "data"), exist_ok=True)
json.dump(OUT, open(os.path.join(ROOT, "amend3", "data", "worm-sim.json"), "w"), indent=1)
print(json.dumps(OUT, indent=1))
