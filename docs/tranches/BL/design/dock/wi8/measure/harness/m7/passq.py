# passq.py <out-queue>: MEASURE-7 step 8, the whole pass on one build as m7/runq.py's queue (pass7.sh's stages cut into
# small guarded runs, so the power hold's pauses cost one item each, not a stage). In order: the build (VITE_DOCK_HOLD=1,
# build7.sh), every probe cell of lists/m6.txt in Chromium then WebKit 2287 (one probe per run; rows/m7p/), the side cells
# one per run in each engine (clock2, cells6, g13, g7, g8, c2, census7, comp58, fit7, trig7, inflow7, adds7, ink7 against
# the engine's v11.0.2 reading, crop), cost7 on the GPU lane (Chromium), return-30 twenty times per engine
# (rows/m7p-r30/<i>/), the library build and G-12, the units, the judges (m7/analyse8.sh, r30.mjs).
import os, sys
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8"
L = "../logs"
q = []
q.append(f"none heavy 20 {W}/dist-wi8/index.html cd {W} && {{ git rev-parse HEAD; git status --short src; }} > {H}/{L}/m7p-build.sha && VITE_DOCK_HOLD=1 {H}/m7/build7.sh . dist-wi8 > {H}/{L}/m7p-build.log 2>&1")
names = [l.split()[1] for l in open(os.path.join(H, "../lists/m6.txt")) if l.strip() and not l.startswith("#")]
def sc(n):
    for d in ("scenarios-m6", "scenarios-m5", "scenarios-m3"):
        if os.path.exists(os.path.join(H, d, n + ".json")): return f"{d}/{n}.json"
    raise SystemExit(f"no scenario {n}")
for e in ("chromium", "webkit"):
    for n in names:
        q.append(f"preview {e} 12 ../rows/m7p/{n}.wi8.{e}.*.rows.json* node probe.mjs {W} dock-wi8 {sc(n)} --port 5401 --engine {e} --out ../rows/m7p --no-strip >> {L}/m7p-{e}.log 2>&1")
side = [
    ("clock2", "node clock2.mjs 5401 m7p --engine E", "../logs/clock2.m7p.E.json"),
    ("cells6", "node m6/cells6.mjs 5401 m7p --engine E", "../logs/m4-cells.m7p.E.json"),
    ("g13", "env LOG_TAG=m7p node g13.mjs 5401 --engine E", "../logs/g13-m7p.E.json"),
    ("g7", "env LOG_TAG=m7p node g7.mjs 5401 --engine E", "../logs/g7-m7p.E.json"),
    ("g8", "env LOG_TAG=m7p node g8.mjs 5401 --engine E", "../logs/g8-m7p.E.json"),
    ("c2", "node c2.mjs 5401 m7p --engine E", "../logs/c2.m7p.E.json"),
    ("census7", "node m7/census7.mjs 5401 m7p --engine E", "../logs/m7-census-m7p.E.json"),
    ("comp58", "node m7/comp58.mjs 5401 m7p --engine E", "../logs/m7-comp58-m7p.E.json"),
    ("fit7", "node m7/fit7.mjs 5401 m7p --engine E", "../logs/m7-fit-m7p.E.json"),
    ("trig7", "node m7/trig7.mjs 5401 m7p --engine E", "../logs/m7-trig-m7p.E.json"),
    ("inflow7", "node m7/inflow7.mjs 5401 m7p --engine E", "../logs/m7-inflow-m7p.E.json"),
    ("adds7", "node m7/adds7.mjs 5401 m7p --engine E", "../logs/m7-adds-m7p.E.json"),
    ("ink7", "node m7/ink7.mjs 5401 m7p --engine E --base ../logs/m7-ink-base1102.E.json", "../logs/m7-ink-m7p.E.json"),
    ("crop", "node crop.mjs 5401 ../crops-m7p --engine E", "../crops-m7p/crops.E.json"),
]
for e in ("chromium", "webkit"):
    for name, cmd, done in side:
        q.append(f"preview {e} 30 {done.replace('E', e)} {cmd.replace(' E', ' ' + e)} >> {L}/m7p-side-{e}.log 2>&1")
    if e == "chromium":
        q.append(f"preview gpu 40 ../logs/cost2.m7p.json node m7/cost7.mjs 5401 m7p >> {L}/m7p-side-chromium.log 2>&1")
for e in ("chromium", "webkit"):
    for i in range(1, 21):
        q.append(f"preview {e} 6 ../rows/m7p-r30/{i}/p3-swap-return-30.wi8.{e}.*.rows.json* echo '== run {i}' $(sysctl -n vm.loadavg) >> {L}/m7p-r30-run-{e}.log; node probe.mjs {W} dock-wi8 scenarios-m3/p3-swap-return-30.json --port 5401 --engine {e} --out ../rows/m7p-r30/{i} --no-strip 2>&1 | cut -c1-200 >> {L}/m7p-r30-run-{e}.log")
q.append(f"none heavy 20 ../logs/m7p-g12.txt cd {W} && node node_modules/vite/bin/vite.js build --outDir dist-lib-m7 --emptyOutDir > {H}/{L}/m7p-build-lib.log 2>&1; echo rc=$? >> {H}/{L}/m7p-build-lib.log; node {H}/g12.mjs dist-lib-m7 > {H}/{L}/m7p-g12.txt 2>&1; {{ echo '__dockHold/__dockPose in the built library:'; grep -rl '__dockHold\\|__dockPose' dist-lib-m7 || echo none; }} >> {H}/{L}/m7p-g12.txt; rm -rf dist-lib-m7")
q.append(f"none heavy 30 ../logs/m7p-units.log cd {W} && node_modules/.bin/vitest run tests/components/custom/dock tests/components/popover.contract.test.ts tests/components/select.contract.test.ts tests/components/menu tests/components/sheet tests/components/dialog tests/components/custom/scroll-progress-rim/ScrollProgressRim.test.ts tests/components/dock/collapsed-rim-fills-pill.test.ts --maxWorkers=2 > {H}/{L}/m7p-units.log 2>&1; echo rc=$? >> {H}/{L}/m7p-units.log")
q.append(f"none light 20 - for E in chromium webkit; do {H}/m7/analyse8.sh $E m7p m7p >> {H}/{L}/m7p-pass.log 2>&1; done; node {H}/m6/r30.mjs {H}/../rows/m7p-r30 > {H}/{L}/m7p-r30.txt 2>&1")
open(sys.argv[1], "w").write("# MEASURE-7 step 8 (m7/passq.py), one build\n" + "\n".join(q) + "\n")
print(len(q), "items")
