"""AMEND-5, CRITIQUE-4 note 1 (outside the checklist): a worm with no trail passes R-02's W1-W3, because they bound
continuity, not the elongation the goo rests on. W4, the elongation kept, is the floor the cure must hold:

  W4  over the frames of a leg where the lead moves faster than 200 px/s, the worm's mean length is at least half the
      mean of min(pitch, |v_lead| * tau), with tau = LEAD_TRAIL_TAU_E_S read from useLeadTrail.ts (the module's own
      elongation law, `gap = |v|*tau_e`). A worm that paints no trail has length 0 there and fails.

Read on the measured retarget legs (amend4/data/gui/retarget-mf-r1/r2-1440) for HEAD, and on worm_sim.py's integrator
(executed above its `OUT = {` line, via amend4/tools/worm4.py's head) for the routed cure (chain origin, monotone trail),
the A3 reading (latest drive) and a no-trail worm (trail = lead). W1-W3 are worm4.py's `witness`, re-run.

usage (from apple-homeview/): python3 -I -B amend5/tools/stretch5.py <glass-ui root> -> amend5/data/stretch5.json
"""
import json, os, re, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
GUI = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else os.path.abspath(os.path.join(ROOT, *[".."] * 6))
p = os.path.join(ROOT, "amend4/tools/worm4.py")
ns = {"__file__": p}
exec(compile(open(p).read().split("\nOUT = {}")[0], "worm4.py(head)", "exec"), ns)
simulate, witness, load, ctr = ns["simulate"], ns["witness"], ns["load"], ns["ctr"]

src = open(os.path.join(GUI, "src/composables/motion/morph/useLeadTrail.ts")).read()
TAU = float(re.search(r"const LEAD_TRAIL_TAU_E_S = ([0-9.]+);", src).group(1))
V_MIN = 200.0


def w4(tt, lead, length, pitch, k0, k1):
    num, den, n = 0.0, 0.0, 0
    for k in range(max(k0, 1), k1):
        dt = (tt[k] - tt[k - 1]) / 1000
        v = abs(lead[k] - lead[k - 1]) / dt if dt > 0 else 0
        if v > V_MIN:
            num += abs(length[k]); den += min(abs(pitch), v * TAU); n += 1
    if n == 0:
        return {"frames": 0, "pass": False}
    return {"frames": n, "mean_length_px": round(num / n, 2), "mean_floor_basis_px": round(den / n, 2),
            "ratio": round(num / den, 3), "pass": num / den >= 0.5}


OUT = {"tau_s": TAU, "tau_source": "src/composables/motion/morph/useLeadTrail.ts (LEAD_TRAIL_TAU_E_S)", "v_min_px_s": V_MIN, "legs": {}}
for rt in ("r1", "r2"):
    d = load(f"retarget-mf-{rt}-1440")
    r, marks = d["rows"], d["marks"]
    legs = [i for i, m in enumerate(marks) if m[0] == "leg"]
    for li, mi in enumerate(legs):
        seg = marks[mi:(legs[li + 1] if li + 1 < len(legs) else len(marks))]
        sm = {m[0]: m[1] for m in seg}
        rr = [x for x in r if sm["leg"] - 60 <= x["t"] < sm["reset"]]
        tt = [x["t"] for x in rr]
        kl = next(k for k, x in enumerate(rr) if x["t"] >= sm["launch"])
        origin = ctr(rr[kl - 1]["bA"])
        final = (ctr(rr[-1]["bA"]) + ctr(rr[-1]["bB"])) / 2
        pitch = (final - origin) / 4
        sgn = 1 if final >= origin else -1
        lo = [min(ctr(x["bA"]), ctr(x["bB"])) for x in rr]; hi = [max(ctr(x["bA"]), ctr(x["bB"])) for x in rr]
        solo = simulate(tt, {kl: origin + 2 * pitch}, pitch, origin)
        kc = next(k for k, x in enumerate(rr) if x["t"] >= sm["retarget4"])
        kr = next(k for k in range(kc, len(rr)) if abs((lo[k] + hi[k]) / 2 - (solo[k][2] + solo[k][3]) / 2) > 0.5)
        kend = next((k for k in range(kr + 5, len(rr)) if abs(hi[k] - lo[k]) < 0.01 and abs(hi[k] - final) < 0.3), len(rr) - 1) + 1
        name = f"{rt} delay {int(round(sm['retarget4'] - sm['launch']))} ms"
        cell = {"load_1min": [d["meta"]["loadStart"], d["meta"]["loadEnd"]]}
        lead_m = hi if sgn > 0 else lo
        wm, why = witness(lo, hi, origin, final, kl, kend)
        cell["HEAD measured"] = {"W1-W3": why or "pass", "W4": w4(tt, lead_m, [b - a for a, b in zip(lo, hi)], pitch, kl, kend)}
        drives = {kl: origin + 2 * pitch, kr: final}
        for mode, label in (("chain_origin_monotone", "cure 4, chain origin + monotone trail (routed)"),
                            ("hop_origin", "cure 4, latest drive (A3, withdrawn)"), ("head", "no trail (trail = lead)")):
            s = simulate(tt, drives, pitch, origin, mode)
            if label.startswith("no trail"):
                s = [(a, a, a, a) for (a, _, _, _) in s]
            slo, shi = [x[2] for x in s], [x[3] for x in s]
            ww, why2 = witness(slo, shi, origin, final, kl, kend)
            lead_s = [x[0] for x in s]
            cell[label] = {"W1-W3": why2 or "pass", "W4": w4(tt, lead_s, [b - a for a, b in zip(slo, shi)], pitch, kl, kend)}
        OUT["legs"][name] = cell

json.dump(OUT, open(os.path.join(ROOT, "critique5", "data", "stretch5-rerun.json"), "w"), indent=1)
for n, c in OUT["legs"].items():
    print(n, {k: (v["W1-W3"], v["W4"].get("ratio"), v["W4"]["pass"]) for k, v in c.items() if k != "load_1min"})
