# plantq.py <out-queue> [plant ...]: MEASURE-7 step 8, every plant (m7/plants7.py) as m7/runq.py's queue, with
# m7/plantrun7.sh's cells (its probe_cells and side_cmd, sourced) and judges: for each plant, apply it, read its probe
# cells (one probe per run) and side cells in Chromium and WebKit 2287 on the worktree's dev server, revert it, check the
# source is clean, judge. The 1-minute load at each run is in logs/m7-runq.log; each plant's log is
# logs/m7-plant-<plant>.txt and its rows rows/plant7-<plant>/.
import json, os, subprocess, sys
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8"
out = sys.argv[1]
plants = sys.argv[2:] or list(json.loads(subprocess.run(["python3", f"{H}/m7/plants7.py", "x", "list"], capture_output=True, text=True).stdout))
def sh(fn, *args):
    r = subprocess.run(["bash", "-c", f'source "{H}/m7/plantrun7.sh"; {fn} ' + " ".join(args)], capture_output=True, text=True, cwd=H)
    return r.stdout.strip()
def sc(n):
    for d in ("scenarios-m6", "scenarios-m5", "scenarios-m3"):
        if os.path.exists(os.path.join(H, d, n + ".json")): return f"{d}/{n}.json"
    raise SystemExit(f"no scenario {n}")
q = []
for P in plants:
    log = f"../logs/m7-plant-{P}.txt"
    q.append(f"none light 3 - echo \"== {P} $(date '+%H:%M:%S') (load $(sysctl -n vm.loadavg))\" > {log}; python3 m7/plants7.py {P} apply >> {log} 2>&1")
    if P == "g12-scale":
        q.append(f"none light 5 - node g12.mjs >> {log} 2>&1")
    elif P == "g14-rmclock":
        q.append(f"none heavy 20 - cd {W} && node_modules/.bin/vitest run tests/components/custom/dock/GlassDock.motion-parity.test.ts --maxWorkers=2 >> {H}/{log} 2>&1")
    else:
        if P == "g1-lift":
            q.append(f"none heavy 10 - cd {W} && node_modules/.bin/vitest run tests/components/custom/dock/GlassDock.posture.test.ts -t G-1 --maxWorkers=2 >> {H}/{log} 2>&1; echo unit rc=$? >> {H}/{log}")
        cells = sh("probe_cells", P).split()
        for e in ("chromium", "webkit"):
            for c in cells:
                q.append(f"dev {e} 12 ../rows/plant7-{P}/{c}.wi8.{e}.*.rows.json* node probe.mjs {W} dock-wi8 {sc(c)} --port 5402 --engine {e} --out ../rows/plant7-{P} --no-strip 2>&1 | cut -c1-300 >> {log}")
            s = sh("side_cmd", P, e)
            if s:
                q.append(f"dev {'gpu' if 'cost7' in s else e} 30 - {s} >> {log} 2>&1")
    q.append(f"none light 3 - python3 m7/plants7.py {P} revert >> {log} 2>&1; cd {W} && git diff --quiet -- src || {{ echo 'SOURCE NOT CLEAN after {P}' >> {H}/{log}; exit 3; }}")
    if P not in ("g12-scale", "g14-rmclock"):
        q.append(f"none light 5 - echo '-- judge' >> {log}; bash -c 'source m7/plantrun7.sh; judge {P}' >> {log} 2>&1; for f in ../rows/plant7-{P}/*.rows.json; do [ -f \"$f\" ] && gzip -f \"$f\"; done; echo \"== done $(date '+%H:%M:%S')\" >> {log}")
open(out, "w").write("# MEASURE-7 step 8, every plant (m7/plantq.py)\n" + "\n".join(q) + "\n")
print(len(q), "items for", len(plants), "plants")
