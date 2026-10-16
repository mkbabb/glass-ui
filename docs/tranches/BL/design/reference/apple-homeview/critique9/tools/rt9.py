"""CRITIQUE-9, K-3: GAP M-08's runtime-arm sentences, tested where CRITIQUE-8's sweep did not reach.
Execs amend6/tools/runtime6.py lines up to `GRIDS = {` unchanged (sha256 recorded) and calls its own run().
  drop / rebase: run() is piecewise constant in T between the frame intervals it reads (measured legs and the ideal
     120 Hz reference), so T = 0 and T = every distinct interval <= 400 covers every T in [0, 400] exactly.
  clamp: 0.1-10.0 at 0.1 (below CRITIQUE-8's 10.0) for the full arm and the stall arm alone; 4000 seeded-random
     off-grid values in (0, 199.2] (GAP's sentence says "on a 0.1 ms grid", so an off-grid pass is a note).
  soft: 0.1-50 at 0.1 (below CRITIQUE-8's 50); 2000 seeded-random off-grid values in (0, 1500].
  blind-side checks (GAP: clamp passes 200+ on runtime6's grid; drop/rebase pass from 401; soft passes from 2000).
usage (from apple-homeview/): python3 -I -B critique9/tools/rt9.py critique9/data/rt9.json
"""
import hashlib, json, os, random, sys, time
HERE = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
src_path = os.path.join(HERE, "amend6/tools/runtime6.py")
raw = open(src_path, "rb").read()
lines = raw.decode().split("\n")
cut = next(i for i, l in enumerate(lines) if l.startswith("GRIDS = {"))
g = {"__file__": src_path, "__name__": "rt6defs"}
exec(compile("\n".join(lines[:cut]), src_path, "exec"), g)
run = g["run"]
t0 = time.time()
out = {"runtime6_sha256": hashlib.sha256(raw).hexdigest(), "lines_execd": f"1-{cut}", "load_1min_start": os.getloadavg()[0]}
P = lambda kind, p: run(kind, p)["runtime_arm_pass"]
fr = lambda a, b, h: [round(a + i * h, 4) for i in range(int(round((b - a) / h)) + 1)]

# every frame interval run() can compare against T
iv = set([g["FR"]])
for B in (150, 400):
    for l in g["BLOCK"][B]["legs"]:
        tt = l["tt"]; iv.update(tt[k] - tt[k - 1] for k in range(l["k0"] + 1, len(tt)))
for l in g["STALL"]["legs"]:
    tt = l["tt"]; iv.update(tt[k] - tt[k - 1] for k in range(l["k0"] + 1, len(tt)))
bps = sorted([0.0] + [x for x in iv if x <= 400])
out["intervals"] = {"distinct": len(iv), "max": max(iv), "min": min(iv), "breakpoints_tested": len(bps)}
for kind in ("drop", "rebase"):
    passing = [round(T, 4) for T in bps if P(kind, T)]
    out[kind + "_exact_0_to_400"] = {"n": len(bps), "passing": passing}
    out[kind + "_blind_side"] = {str(T): P(kind, T) for T in (400.5, 401, 450, 500, 1000, 5000)}

cl = fr(0.1, 10.0, 0.1)
out["clamp_0.1_to_10"] = {"n": len(cl), "arm_passing": [c for c in cl if P("clamp", c)],
                          "stall_alone_passing": [c for c in cl if run("clamp", c)["stall"]["pass"]]}
rng = random.Random(9)
rc = sorted(rng.uniform(0.0001, 199.2) for _ in range(4000))
out["clamp_random_offgrid_0_to_199.2"] = {"n": len(rc), "seed": 9, "arm_passing": [round(c, 4) for c in rc if P("clamp", c)]}
rs = sorted(rng.uniform(0.01, 47.1) for _ in range(1500))
out["stall_clamp_random_offgrid_0_to_47.1"] = {"n": len(rs), "stall_alone_passing": [round(c, 4) for c in rs if run("clamp", c)["stall"]["pass"]]}
cb = fr(199.3, 1000, 0.1)
out["clamp_blind_side_199.3_to_1000"] = {"n": len(cb), "failing": [c for c in cb if not P("clamp", c)]}

so = fr(0.1, 50.0, 0.1)
out["soft_0.1_to_50"] = {"n": len(so), "passing": [s for s in so if P("soft", s)]}
rso = sorted(rng.uniform(0.01, 1500) for _ in range(2000))
out["soft_random_offgrid_0_to_1500"] = {"n": len(rso), "passing": [round(s, 3) for s in rso if P("soft", s)]}
sb = fr(2000, 20000, 50)
out["soft_blind_side_2000_to_20000"] = {"n": len(sb), "failing": [s for s in sb if not P("soft", s)]}

# timers: GAP claims 50 and 100 ms fail on all 10 phases P*i/10; off those phases is a note
tm = {}
for Pm in (50, 100):
    ph = fr(0, Pm - 0.5, 0.5)
    tm[str(Pm)] = {"phases": len(ph), "passing_phases": [x for x in ph if run("timer", Pm, x)["runtime_arm_pass"]]}
out["timer_phase_0.5ms"] = tm
out["seconds"] = round(time.time() - t0, 1)
out["load_1min_end"] = os.getloadavg()[0]
json.dump(out, open(os.path.join(HERE, sys.argv[1]), "w"), indent=1)
print(json.dumps({k: (v if not isinstance(v, dict) else {kk: (vv if not isinstance(vv, list) or len(vv) < 30 else f"{len(vv)} items: {vv[:5]}…{vv[-5:]}") for kk, vv in v.items()}) for k, v in out.items()}, indent=1))
