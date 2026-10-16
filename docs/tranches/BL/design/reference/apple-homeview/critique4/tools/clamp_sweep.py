"""CRITIQUE-4, K-3: which kept dt clamps does M-08's A4 block arm see when the stepper is W-F.1's closed form?

GAP's A4 simulations clamp HEAD's 8-substep Euler. W-F.1's cure replaces that integrator with a closed-form step, so the
unfinished tree the arm must catch is "closed form + a kept (renamed) clamp". This re-runs the closed-form `dock` row
(response 0.3 s, zeta 0.88) on each measured block clock (amend4/data/gui/block-r1-1440-b{45,150,400}) with
dt = min(true dt, clamp), scores it against the unclamped closed form on the post-block frames GAP's witness reads
(the first post-block frame skipped, frames < 700 ms after launch), with GAP's simulation tolerance max(1 px, 1 % of
the hop), and reports the smallest clamp that passes all three hops of each block, and of both blocks together.
Also the hop's progress when each block begins and ends (how much of the hop is left for the block to disturb).

usage (from apple-homeview/): python3 -I -B critique4/tools/clamp_sweep.py -> critique4/data/clamp-sweep.json
"""
import gzip, json, math, os

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
RESP, ZETA, FRAME = 0.3, 0.88, 1000 / 60
W0 = 2 * math.pi / RESP
WD = W0 * math.sqrt(1 - ZETA ** 2)


def ctr(b):
    return b[0] + b[2] / 2


def closed(tt, k0, x0, target, clamp=1e12):
    x, v, last, out = x0, 0.0, None, []
    for k, t in enumerate(tt):
        if k < k0:
            out.append(x); continue
        dt = (FRAME if last is None else min(t - last, clamp)) / 1000; last = t
        y0 = x - target; B = (v + ZETA * W0 * y0) / WD
        e, cs, sn = math.exp(-ZETA * W0 * dt), math.cos(WD * dt), math.sin(WD * dt)
        y = e * (y0 * cs + B * sn)
        v = e * (-ZETA * W0 * (y0 * cs + B * sn) + (-y0 * WD * sn + B * WD * cs))
        x = target + y
        out.append(x)
    return out


O = {}
CLAMPS = [20, 30, 40, 50, 60, 80, 100, 120, 140, 160, 200, 300, 401]
for Bk in (45, 150, 400):
    d = json.load(gzip.open(os.path.join(ROOT, f"amend4/data/gui/block-r1-1440-b{Bk}.json.gz")))
    r, m = d["rows"], d["marks"]
    cl = [i for i, x in enumerate(m) if x[0].startswith("click")]
    cell = {"load": [d["meta"]["loadStart"], d["meta"]["loadEnd"]], "hops": {}}
    for j, i in enumerate(cl):
        seg = {x[0]: x[1] for x in m[i:(cl[j + 1] if j + 1 < len(cl) else len(m))]}
        t1 = m[cl[j + 1]][1] if j + 1 < len(cl) else r[-1]["t"] + 1
        rr = [x for x in r if seg[m[i][0]] - 100 <= x["t"] < t1]
        tt = [x["t"] for x in rr]
        tl = seg["launch"]
        k0 = next(k for k, t in enumerate(tt) if t >= tl)
        origin = (ctr(rr[k0 - 1]["bA"]) + ctr(rr[k0 - 1]["bB"])) / 2
        final = (ctr(rr[-1]["bA"]) + ctr(rr[-1]["bB"])) / 2
        post = [k for k, t in enumerate(tt) if t > seg["blockEnd"] and t - tl < 700][1:]
        tol = max(1.0, 0.01 * abs(final - origin))
        truth = closed(tt, k0, origin, final)
        prog = lambda t: 1 - math.exp(-ZETA * W0 * t / 1000) * (math.cos(WD * t / 1000) + ZETA * W0 / WD * math.sin(WD * t / 1000))
        h = {"tol_px": round(tol, 2), "progress_at_block_start": round(prog(seg["blockStart"] - tl), 3),
             "progress_at_block_end": round(prog(seg["blockEnd"] - tl), 4), "err_px_by_clamp": {}}
        for c_ in CLAMPS:
            s = closed(tt, k0, origin, final, c_)
            e = max(abs(s[k] - truth[k]) for k in post)
            h["err_px_by_clamp"][c_] = [round(e, 3), e <= tol]
        cell["hops"][m[i][0]] = h
    cell["smallest_clamp_passing_all_hops_ms"] = next((c_ for c_ in CLAMPS if all(h["err_px_by_clamp"][c_][1] for h in cell["hops"].values())), None)
    O[f"block {Bk}"] = cell
O["smallest_clamp_passing_150_and_400_ms"] = next((c_ for c_ in CLAMPS if all(h["err_px_by_clamp"][c_][1] for B in ("block 150", "block 400") for h in O[B]["hops"].values())), None)
json.dump(O, open(os.path.join(ROOT, "critique4", "data", "clamp-sweep.json"), "w"), indent=1)
print(json.dumps(O, indent=1))
