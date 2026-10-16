"""AMEND-5, K-3 (CRITIQUE-4 §3): M-08's runtime arms re-scored on the stepper W-F.1 ships (a closed form), and the
runtime ceiling stated.

The unfinished tree the runtime arm must catch is W-F.1's cure with a dt clamp kept under any name: the closed-form
`dock` row (springPresets.ts:84-87, response 0.3 s, dampingFraction 0.88) stepped with dt = min(true dt, C). With a
closed form, a clamp C loses exactly max(0, gap - C) of each long frame and nothing else, so after a long frame the
clamped lead is the true lead shifted later in time by the lost time. That is visible only while the hop still moves.

Parts (written from the formula; no code is copied from amend4 or critique4):
  A  the measured block clocks (amend4/data/gui/block-r1-1440-b{45,150,400}): for C = 10..1000 ms, the post-block error
     (first post-block frame skipped, frames < 700 ms after launch, as GAP's witness reads them) against the unclamped
     closed form, scored two ways: GAP's simulation tolerance max(1 px, 1 % of the hop), and the measured witness's own
     form (every post-block frame within 0.5 px of the unclamped curve at one time shift |s| <= 8.4 ms). Reports the
     smallest C that passes each block (the arm's blind spot starts there).
  B  the A3 lag-growth arm on the measured stall clock (amend2/data/gui/fps-r1-1440-rafstall: 45 ms on every 6th
     frame, largest interval 50.9 ms): each clamped frame located on the unclamped curve, lag growth between the
     0.1-0.3 and 0.7-0.9 progress bins, bound 3 ms. Reports the smallest C that passes.
  C  the ceiling: synthetic 120 Hz clocks (8.333 ms) with one block of 150 / 400 / 1000 ms placed one frame or 30 ms
     after the launch, hops of 40 / 120 / 160 px (the worm carousel's +1 / +3 / -4), read for 400 ms after the block
     (the measured runs' 700-ms-after-launch window would read nothing after a 1000 ms block). The smallest clamp each placement
     passes, against the row's settle time to the same tolerance (the last time |x - target| > tol). No block length
     or placement can see a clamp longer than that settle time, because a clamp that long only loses time after the
     worm has landed.

usage (from apple-homeview/): python3 -I -B amend5/tools/clamp5.py -> amend5/data/clamp5.json
"""
import gzip, json, math, os

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
RESP, ZETA = 0.3, 0.88
W0 = 2 * math.pi / RESP
WD = W0 * math.sqrt(1 - ZETA * ZETA)
FIRST_FRAME_MS = 1000 / 60  # keyframes.js playback's first-frame dt (16.667) and HEAD's FRAME_MS


def x_at(t_ms, hop):
    """unclamped closed form from rest: position after t ms of a hop of `hop` px (0 -> hop)."""
    if t_ms <= 0:
        return 0.0
    t = t_ms / 1000
    return hop * (1 - math.exp(-ZETA * W0 * t) * (math.cos(WD * t) + ZETA * W0 / WD * math.sin(WD * t)))


def stepped(times, k0, hop, clamp):
    """the closed form stepped frame by frame from frame k0 with dt = min(true dt, clamp). Elapsed-time form: the
    closed-form step composes exactly, so stepping is evaluating at the accumulated (clamped) time."""
    out, elapsed, last = [], 0.0, None
    for k, t in enumerate(times):
        if k < k0:
            out.append(0.0); continue
        dt = FIRST_FRAME_MS if last is None else (t - last)
        last = t
        elapsed += min(dt, clamp)
        out.append(x_at(elapsed, hop))
    return out, None


def truth_elapsed(times, k0):
    out, elapsed, last = [], 0.0, None
    for k, t in enumerate(times):
        if k < k0:
            out.append(0.0); continue
        elapsed += FIRST_FRAME_MS if last is None else (t - last)
        last = t
        out.append(elapsed)
    return out


def settle_ms(hop, tol):
    t, last_out = 0.0, 0.0
    while t < 3000:
        if abs(x_at(t, hop) - hop) > tol:
            last_out = t
        t += 0.1
    return round(last_out, 1)


def ctr(b):
    return b[0] + b[2] / 2


def legs(d):
    r, m = d["rows"], d["marks"]
    cl = [i for i, x in enumerate(m) if x[0].startswith("click")]
    for j, i in enumerate(cl):
        seg = {x[0]: x[1] for x in m[i:(cl[j + 1] if j + 1 < len(cl) else len(m))]}
        t1 = m[cl[j + 1]][1] if j + 1 < len(cl) else r[-1]["t"] + 1
        rr = [x for x in r if m[i][1] - 100 <= x["t"] < t1]
        yield m[i][0], seg, rr


def score(times, k0, hop, clamp, post):
    s, _ = stepped(times, k0, hop, clamp)
    el = truth_elapsed(times, k0)
    err = max(abs(s[k] - x_at(el[k], hop)) for k in post)
    # witness form: one shift |sh| <= 8.4 ms bringing every post frame within 0.5 px of the unclamped curve
    ok_shift = None
    for i in range(0, 169):
        for sh in ((i * 0.05,) if i == 0 else (i * 0.05, -i * 0.05)):
            if all(abs(s[k] - x_at(el[k] + sh, hop)) <= 0.5 for k in post):
                ok_shift = sh; break
        if ok_shift is not None:
            break
    return err, ok_shift


CLAMPS = list(range(10, 200, 10)) + list(range(200, 1001, 25))
OUT = {"row": {"name": "dock", "response_s": RESP, "dampingFraction": ZETA, "source": "src/composables/motion/spring/springPresets.ts:84-87"}}

# ── A · measured block clocks ──
A = {}
for B in (45, 150, 400):
    d = json.load(gzip.open(os.path.join(ROOT, f"amend4/data/gui/block-r1-1440-b{B}.json.gz")))
    cell = {"load_1min": [d["meta"]["loadStart"], d["meta"]["loadEnd"]], "frameDt": d["meta"]["frameDt"], "hops": {}}
    for name, seg, rr in legs(d):
        tt = [x["t"] for x in rr]
        tl = seg["launch"]
        k0 = next(k for k, t in enumerate(tt) if t >= tl)
        origin = (ctr(rr[k0 - 1]["bA"]) + ctr(rr[k0 - 1]["bB"])) / 2
        final = (ctr(rr[-1]["bA"]) + ctr(rr[-1]["bB"])) / 2
        hop = abs(final - origin)
        tol = max(1.0, 0.01 * hop)
        post = [k for k, t in enumerate(tt) if t > seg["blockEnd"] and t - tl < 700][1:]
        gaps = [tt[k] - tt[k - 1] for k in range(k0 + 1, len(tt))]
        h = {"hop_px": round(hop, 1), "tol_px": round(tol, 2), "block_ms": round(seg["blockEnd"] - seg["blockStart"], 1),
             "block_start_ms_after_launch": round(seg["blockStart"] - tl, 1), "largest_interval_ms": round(max(gaps), 1),
             "smallest_clamp_passing_sim_tol": None, "smallest_clamp_passing_witness_form": None, "by_clamp": {}}
        for C in CLAMPS:
            e, sh = score(tt, k0, hop, C, post)
            h["by_clamp"][C] = {"err_px": round(e, 3), "sim_pass": e <= tol, "witness_shift_ms": None if sh is None else round(sh, 2)}
            if e <= tol and h["smallest_clamp_passing_sim_tol"] is None:
                h["smallest_clamp_passing_sim_tol"] = C
            if sh is not None and h["smallest_clamp_passing_witness_form"] is None:
                h["smallest_clamp_passing_witness_form"] = C
        cell["hops"][name] = h
    cell["smallest_clamp_passing_all_hops"] = {
        "sim_tol": max(h["smallest_clamp_passing_sim_tol"] for h in cell["hops"].values()),
        "witness_form": max(h["smallest_clamp_passing_witness_form"] for h in cell["hops"].values())}
    A[f"block {B}"] = cell
OUT["A measured block clocks"] = A

# ── B · the A3 lag-growth arm on the measured stall clock ──
d = json.load(gzip.open(os.path.join(ROOT, "amend2/data/gui/fps-r1-1440-rafstall.json.gz")))
r, marks = d["rows"], d["marks"]
Bc = {"load_1min": [d["meta"]["loadStart"], d["meta"]["loadEnd"]], "frameDt": d["meta"]["frameDt"], "hops": {}}


def lag_growth(tt, k0, hop, C):
    s, _ = stepped(tt, k0, hop, C)
    el = truth_elapsed(tt, k0)
    bins = {"early": [], "late": []}
    for k in range(k0, len(tt)):
        p = s[k] / hop
        if not 0.1 <= p <= 0.9:
            continue
        # locate s[k] on the unclamped curve (monotone below its first peak): bisection on t in [0, el]
        lo, hi = 0.0, el[k]
        for _ in range(60):
            mid = (lo + hi) / 2
            if x_at(mid, hop) < s[k]:
                lo = mid
            else:
                hi = mid
        lag = el[k] - lo
        if p <= 0.3:
            bins["early"].append(lag)
        elif p >= 0.7:
            bins["late"].append(lag)
    if not bins["early"] or not bins["late"]:
        return None
    return sum(bins["late"]) / len(bins["late"]) - sum(bins["early"]) / len(bins["early"])


for i, (name, tc) in enumerate(marks):
    t1 = marks[i + 1][1] if i + 1 < len(marks) else r[-1]["t"] + 1
    rr = [x for x in r if tc <= x["t"] < t1]
    tt = [x["t"] for x in rr]
    mids = [(ctr(x["bA"]) + ctr(x["bB"])) / 2 for x in rr]
    hop = abs(mids[-1] - mids[0])
    k0 = 1  # the first frame after the click carries the drive; the clock after it is what the stepper sees
    gaps = [tt[k] - tt[k - 1] for k in range(1, min(len(tt), 60))]
    g = {"hop_px": round(hop, 1), "largest_interval_in_hop_ms": round(max(gaps), 1), "growth_ms_by_clamp": {}, "smallest_clamp_passing": None}
    for C in [10, 20, 30, 35, 40, 42, 45, 48, 50, 52, 55, 60, 80, 100]:
        gr = lag_growth(tt, k0, hop, C)
        g["growth_ms_by_clamp"][C] = None if gr is None else round(gr, 2)
        if gr is not None and gr <= 3 and g["smallest_clamp_passing"] is None:
            g["smallest_clamp_passing"] = C
    Bc["hops"][name] = g
# a None growth means no clamped frame fell in one of the bins on that hop's clock (the 45 ms frames step over the
# 0.7-0.9 bin); the arm cannot read that hop at that clamp, which is not a pass
Bc["note"] = "growth None: no frame of the clamped lead falls in one bin on that hop's clock, so the arm reads nothing there"
Bc["smallest_clamp_passing_on_readable_hops"] = max(h["smallest_clamp_passing"] for h in Bc["hops"].values() if h["smallest_clamp_passing"] is not None)
OUT["B lag-growth arm, stall clock"] = Bc

# ── C · the ceiling on synthetic clocks ──
Cc = {}
FR = 1000 / 120
for hop in (40, 120, 160):
    tol = max(1.0, 0.01 * hop)
    cell = {"tol_px": tol, "settle_ms_to_tol": settle_ms(hop, tol), "settle_ms_to_0.5px": settle_ms(hop, 0.5), "placements": {}}
    for B in (150, 400, 1000):
        for start_frames, label in ((1, "one frame after launch"), (4, "30 ms after launch")):
            tt = [k * FR for k in range(start_frames + 1)]
            tt.append(tt[-1] + B)
            while tt[-1] < start_frames * FR + B + 500:
                tt.append(tt[-1] + FR)
            k0 = 0
            post = [k for k, t in enumerate(tt) if t > start_frames * FR + B and t < start_frames * FR + B + 400][1:]  # 400 ms read after the block
            smallest_sim = smallest_wit = None
            for C in range(10, 1001, 5):
                e, sh = score(tt, k0, hop, C, post) if post else (0.0, 0.0)
                if smallest_sim is None and e <= tol:
                    smallest_sim = C
                if smallest_wit is None and sh is not None:
                    smallest_wit = C
                if smallest_sim is not None and smallest_wit is not None:
                    break
            cell["placements"][f"block {B} ms, {label}"] = {"post_frames_read": len(post), "smallest_clamp_passing_sim_tol": smallest_sim,
                                                            "smallest_clamp_passing_witness_form": smallest_wit}
    Cc[f"hop {hop} px"] = cell
OUT["C ceiling, synthetic 120 Hz"] = Cc

json.dump(OUT, open(os.path.join(ROOT, "critique5", "data", "clamp5-rerun.json"), "w"), indent=1)
summ = {
    "A": {k: v["smallest_clamp_passing_all_hops"] for k, v in A.items()},
    "A_hops": {k: {n: (h["block_start_ms_after_launch"], h["block_ms"], h["smallest_clamp_passing_sim_tol"], h["smallest_clamp_passing_witness_form"]) for n, h in v["hops"].items()} for k, v in A.items()},
    "B": {n: (h["largest_interval_in_hop_ms"], h["smallest_clamp_passing"], h["growth_ms_by_clamp"]) for n, h in Bc["hops"].items()},
    "C": {k: (v["settle_ms_to_tol"], v["settle_ms_to_0.5px"], {p: (q["smallest_clamp_passing_sim_tol"], q["smallest_clamp_passing_witness_form"]) for p, q in v["placements"].items()}) for k, v in Cc.items()},
}
print(json.dumps(summ, indent=1))
