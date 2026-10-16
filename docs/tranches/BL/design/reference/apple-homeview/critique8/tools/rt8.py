"""CRITIQUE-8, K-3: runtime6.py's own definitions (lines 1-202, unchanged, exec'd from the file; sha256 checked)
re-run on the integer parameters between runtime6's grid points that GAP's runtime-arm sentences claim are caught:
  clamp C < 200, drop/rebase T <= 400, soft S <= 1500.  Writes nothing of runtime6's; output -> argv[1].
usage (from apple-homeview/): python3 -I -B critique8/tools/rt8.py critique8/data/rt8.json [step ms, default 1; soft uses 10x]
"""
import hashlib, json, os, sys, time
HERE = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
src_path = os.path.join(HERE, "amend6/tools/runtime6.py")
raw = open(src_path, "rb").read()
sha = hashlib.sha256(raw).hexdigest()
lines = raw.decode().split("\n")
cut = next(i for i, l in enumerate(lines) if l.startswith("GRIDS = {"))
g = {"__file__": src_path, "__name__": "rt6defs"}
exec(compile("\n".join(lines[:cut]), src_path, "exec"), g)
step = float(sys.argv[2]) if len(sys.argv) > 2 else 1.0
fr = lambda a, b, h: [round(a + i * h, 4) for i in range(int(round((b - a) / h)) + 1)]
grids = {"clamp": [x for x in fr(10, 200, step) if x < 200], "drop": fr(20, 400, step),
         "rebase": fr(20, 400, step), "soft": fr(50, 1500, 10 * step)}
out = {"runtime6_sha256": sha, "lines_execd": f"1-{cut}", "claim": "GAP M-08: fails clamp < 200, drop/rebase T <= 400, soft S <= 1500", "policies": {}}
t0 = time.time()
for kind, grid in grids.items():
    grid = sorted(set(grid))
    passing = [p for p in grid if g["run"](kind, p)["runtime_arm_pass"]]
    out["policies"][kind] = {"n_params": len(grid), "lo": grid[0], "hi": grid[-1], "step": step if kind != "soft" else 10 * step, "passing_inside_claimed_band": passing}
# the parenthetical "(stall clock below 48 ms)": the stall arm alone on a min clamp
sg = fr(10, 48, step)
out["stall_only_clamp"] = {"lo": sg[0], "hi": sg[-1], "stall_pass": [p for p in sg if g["run"]("clamp", p)["stall"]["pass"]]}
out["seconds"] = round(time.time() - t0, 1)
out["load_1min_end"] = os.getloadavg()[0]
json.dump(out, open(os.path.join(HERE, sys.argv[1]), "w"), indent=1)
print(json.dumps(out, indent=1))
