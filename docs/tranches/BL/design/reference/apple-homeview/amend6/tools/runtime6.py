"""AMEND-6, K-3: M-08's runtime arm scored on every dt POLICY the source arm's plants name, not only on a min() clamp.

The tree is W-F.1's cure (the closed-form `dock` row, springPresets.ts:84-87, 0.3 s / zeta 0.88) stepped with
dt' = policy(dt). The closed form composes exactly, so the lead after frame k is x(E_k) with E_k the accumulated dt'.
The witness compares the lead with the same build's block-free run. That run is modelled as the same policy on an
ideal 120 Hz clock (8.333 ms frames, keyframes.js's 16.667 ms first frame) launched at the same instant; its elapsed
E_ref(t) is interpolated at each measured frame time. For a policy that leaves an 8.3 ms frame unchanged, E_ref is
the true elapsed time, so the clamp rows reproduce amend5/data/clamp5.json part A and B (checked below).

Policies (the plant that carries each in amend6/plants or critique5/plants):
  clamp C    min(dt, C)                                   p06, e02, e03, e04, q04, q13-q17, q19, q21
  drop T     dt > T -> the frame is not stepped (0)       e01, e06, p15, q09-q11, q20, r03
  rebase T   dt > T -> one 16.667 ms frame                p16
  soft S     S*dt / (S + dt)                              r01
  timer P    the clock base rewritten by a P ms timer: a frame that spans a timer firing steps only now - firing;
             after a frame longer than 2P the timer runs at the end of it, so that frame steps ~0       r04
             (scanned over 10 timer phases; the worst and the best phase are reported)

Arms (GAP M-08, A4 witness; measured clocks only, the files' loads are in their meta):
  block 150 / block 400  amend4/data/gui/block-r1-1440-b{150,400}: every post-block frame (the first skipped,
             < 700 ms after launch) within 0.5 px of the reference at one time shift |s| <= 8.4 ms (the witness form;
             the 1 px / 1 % simulation tolerance is reported beside it). block 45 is reported too.
  stall      amend2/data/gui/fps-r1-1440-rafstall: lag growth between the 0.1-0.3 and 0.7-0.9 progress bins <= 3 ms;
             a hop with no frame in a bin reads nothing (not a pass, not a fail).
The runtime arm FAILs a tree when any of block 150, block 400 or a readable stall hop fails.

usage (from apple-homeview/): python3 -I -B amend6/tools/runtime6.py -> amend6/data/runtime6.json
"""
import gzip, json, math, os

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
RESP, ZETA = 0.3, 0.88
W0 = 2 * math.pi / RESP
WD = W0 * math.sqrt(1 - ZETA * ZETA)
FIRST = 1000 / 60
FR = 1000 / 120


def x_at(t_ms, hop):
    if t_ms <= 0:
        return 0.0
    t = t_ms / 1000
    return hop * (1 - math.exp(-ZETA * W0 * t) * (math.cos(WD * t) + ZETA * W0 / WD * math.sin(WD * t)))


def make_policy(kind, p, phase=0.0):
    """returns step(t_prev, t_now, launch) -> dt' ; t_prev None on the first frame"""
    def step(t_prev, t_now, launch):
        if t_prev is None:
            return FIRST
        dt = t_now - t_prev
        if kind == "none":
            return dt
        if kind == "clamp":
            return min(dt, p)
        if kind == "drop":
            return 0.0 if dt > p else dt
        if kind == "rebase":
            return FIRST if dt > p else dt
        if kind == "soft":
            return p * dt / (p + dt)
        if kind == "timer":
            # timer firings at launch + phase + n*p; the last one due in (t_prev, t_now]
            n = math.floor((t_now - launch - phase) / p)
            due = launch + phase + n * p
            if due <= t_prev:
                return dt
            if dt > 2 * p:
                return 0.0  # the timer runs at the end of the long frame, just before this rAF
            return t_now - due
        raise ValueError(kind)
    return step


def elapsed(times, k0, step, launch):
    out, E, last = [], 0.0, None
    for k, t in enumerate(times):
        if k < k0:
            out.append(0.0); continue
        E += step(last, t, launch)
        last = t
        out.append(E)
    return out


def ref_fn(t0, step, launch, horizon):
    """E_ref on an ideal 120 Hz clock starting at t0 (the first stepped frame), piecewise linear."""
    ts, Es = [t0], [step(None, t0, launch)]
    t = t0
    while t < t0 + horizon:
        tn = t + FR
        Es.append(Es[-1] + step(t, tn, launch))
        ts.append(tn)
        t = tn

    def f(x):
        if x <= ts[0]:
            return Es[0]
        i = min(int((x - ts[0]) / FR), len(ts) - 2)
        a = (x - ts[i]) / FR
        return Es[i] + a * (Es[i + 1] - Es[i])

    def inv(E):  # smallest wall time with E_ref >= E
        lo, hi = ts[0] - 50, ts[-1]
        for _ in range(60):
            mid = (lo + hi) / 2
            if f(mid) < E:
                lo = mid
            else:
                hi = mid
        return hi
    return f, inv


def ctr(b):
    return b[0] + b[2] / 2


def block_legs(d):
    r, m = d["rows"], d["marks"]
    cl = [i for i, x in enumerate(m) if x[0].startswith("click")]
    for j, i in enumerate(cl):
        seg = {x[0]: x[1] for x in m[i:(cl[j + 1] if j + 1 < len(cl) else len(m))]}
        t1 = m[cl[j + 1]][1] if j + 1 < len(cl) else r[-1]["t"] + 1
        rr = [x for x in r if m[i][1] - 100 <= x["t"] < t1]
        yield m[i][0], seg, rr


BLOCK = {}
for B in (45, 150, 400):
    d = json.load(gzip.open(os.path.join(ROOT, f"amend4/data/gui/block-r1-1440-b{B}.json.gz")))
    legs = []
    for name, seg, rr in block_legs(d):
        tt = [x["t"] for x in rr]
        tl = seg["launch"]
        k0 = next(k for k, t in enumerate(tt) if t >= tl)
        origin = (ctr(rr[k0 - 1]["bA"]) + ctr(rr[k0 - 1]["bB"])) / 2
        final = (ctr(rr[-1]["bA"]) + ctr(rr[-1]["bB"])) / 2
        hop = abs(final - origin)
        post = [k for k, t in enumerate(tt) if t > seg["blockEnd"] and t - tl < 700][1:]
        legs.append({"name": name, "tt": tt, "k0": k0, "hop": hop, "tol": max(1.0, 0.01 * hop), "post": post, "launch": tl})
    BLOCK[B] = {"legs": legs, "load_1min": [d["meta"]["loadStart"], d["meta"]["loadEnd"]], "frameDt": d["meta"]["frameDt"]}

ds = json.load(gzip.open(os.path.join(ROOT, "amend2/data/gui/fps-r1-1440-rafstall.json.gz")))
STALL = {"legs": [], "load_1min": [ds["meta"]["loadStart"], ds["meta"]["loadEnd"]], "frameDt": ds["meta"]["frameDt"]}
for i, (name, tc) in enumerate(ds["marks"]):
    t1 = ds["marks"][i + 1][1] if i + 1 < len(ds["marks"]) else ds["rows"][-1]["t"] + 1
    rr = [x for x in ds["rows"] if tc <= x["t"] < t1]
    tt = [x["t"] for x in rr]
    mids = [(ctr(x["bA"]) + ctr(x["bB"])) / 2 for x in rr]
    STALL["legs"].append({"name": name, "tt": tt, "k0": 1, "hop": abs(mids[-1] - mids[0]), "launch": tt[1]})


def score_block(leg, step):
    tt, k0, hop, post = leg["tt"], leg["k0"], leg["hop"], leg["post"]
    E = elapsed(tt, k0, step, leg["launch"])
    f, _ = ref_fn(tt[k0], step, leg["launch"], 1200)
    err = max(abs(x_at(E[k], hop) - x_at(f(tt[k]), hop)) for k in post)
    shift = None
    for i in range(0, 169):
        for sh in ((0.0,) if i == 0 else (i * 0.05, -i * 0.05)):
            if all(abs(x_at(E[k], hop) - x_at(f(tt[k] + sh), hop)) <= 0.5 for k in post):
                shift = sh; break
        if shift is not None:
            break
    return {"err_px": round(err, 3), "sim_pass": err <= leg["tol"], "witness_pass": shift is not None}


def score_stall(leg, step):
    tt, k0, hop = leg["tt"], leg["k0"], leg["hop"]
    E = elapsed(tt, k0, step, leg["launch"])
    _, inv = ref_fn(tt[k0], step, leg["launch"], 1200)
    early, late = [], []
    for k in range(k0, len(tt)):
        p = x_at(E[k], hop) / hop
        if not 0.1 <= p <= 0.9:
            continue
        lag = tt[k] - inv(E[k])
        (early if p <= 0.3 else late if p >= 0.7 else []).append(lag)
    if not early or not late:
        return None
    return round(sum(late) / len(late) - sum(early) / len(early), 2)


def run(kind, p, phase=0.0):
    step = make_policy(kind, p, phase)
    res = {}
    for B in (45, 150, 400):
        legs = [score_block(l, step) for l in BLOCK[B]["legs"]]
        res[f"block {B}"] = {"witness_pass": all(x["witness_pass"] for x in legs), "sim_pass": all(x["sim_pass"] for x in legs),
                             "err_px": [x["err_px"] for x in legs]}
    g = [score_stall(l, step) for l in STALL["legs"]]
    readable = [x for x in g if x is not None]
    res["stall"] = {"growth_ms": g, "pass": bool(readable) and all(x <= 3 for x in readable), "readable_hops": len(readable)}
    res["runtime_arm_pass"] = res["block 150"]["witness_pass"] and res["block 400"]["witness_pass"] and res["stall"]["pass"]
    return res


OUT = {"row": {"name": "dock", "response_s": RESP, "dampingFraction": ZETA, "source": "src/composables/motion/spring/springPresets.ts:84-87"},
       "clocks": {**{f"block {B}": {"load_1min": BLOCK[B]["load_1min"], "frameDt": BLOCK[B]["frameDt"]} for B in BLOCK},
                  "stall": {"load_1min": STALL["load_1min"], "frameDt": STALL["frameDt"]}},
       "control_none": run("none", 0), "policies": {}}

GRIDS = {
    "clamp": [10, 20, 30, 40, 45, 48, 50, 60, 80, 100, 120, 140, 160, 180, 200, 225, 250, 300, 400, 500, 1000],
    "drop": [20, 30, 40, 45, 48, 50, 52, 60, 80, 100, 140, 150, 160, 200, 300, 380, 400, 401, 410, 450, 500, 1000],
    "rebase": [20, 30, 40, 45, 48, 50, 52, 60, 80, 100, 140, 150, 160, 200, 300, 380, 400, 401, 410, 450, 500, 1000],
    "soft": [50, 100, 200, 500, 1000, 1500, 2000, 3000, 5000, 7500, 10000, 20000, 50000, 100000],
}
for kind, grid in GRIDS.items():
    rows = {}
    for p in grid:
        rows[str(p)] = run(kind, p)
    passing = [p for p in grid if rows[str(p)]["runtime_arm_pass"]]
    # the arm's blind spot: smallest parameter from which every larger grid value passes
    blind = None
    for p in grid:
        if all(rows[str(q)]["runtime_arm_pass"] for q in grid if q >= p):
            blind = p; break
    OUT["policies"][kind] = {"by_param": rows, "passing": passing, "blind_from": blind}

tim = {}
for P in (50, 100, 250, 500):
    ph = {}
    for phase in [P * i / 10 for i in range(10)]:
        ph[str(round(phase, 1))] = run("timer", P, phase)["runtime_arm_pass"]
    tim[str(P)] = {"pass_by_phase": ph, "fails_on_every_phase": not any(ph.values()), "passes_on_every_phase": all(ph.values())}
OUT["policies"]["timer"] = tim

# cross-check: the clamp rows against amend5's clamp5.json (part A witness form, part B stall)
c5 = json.load(open(os.path.join(ROOT, "amend5/data/clamp5.json")))
chk = {}
for B in (45, 150, 400):
    a5 = c5["A measured block clocks"][f"block {B}"]["smallest_clamp_passing_all_hops"]["witness_form"]
    mine = next((p for p in GRIDS["clamp"] if OUT["policies"]["clamp"]["by_param"][str(p)][f"block {B}"]["witness_pass"]), None)
    chk[f"block {B}"] = {"clamp5_witness_form": a5, "runtime6": mine}
chk["stall"] = {"clamp5": c5["B lag-growth arm, stall clock"]["smallest_clamp_passing_on_readable_hops"],
                "runtime6": next((p for p in GRIDS["clamp"] if OUT["policies"]["clamp"]["by_param"][str(p)]["stall"]["pass"]), None)}
OUT["crosscheck_clamp5"] = chk

json.dump(OUT, open(os.path.join(ROOT, "amend6", "data", "runtime6.json"), "w"), indent=1)
print(json.dumps({
    "control_none_pass": OUT["control_none"]["runtime_arm_pass"],
    "crosscheck": chk,
    **{k: {"passing": v["passing"], "blind_from": v["blind_from"]} for k, v in OUT["policies"].items() if k != "timer"},
    "timer": {k: (v["fails_on_every_phase"], v["passes_on_every_phase"], sum(v["pass_by_phase"].values())) for k, v in tim.items()},
}, indent=1))
