# itemsm.py <phase>...: MEASURE-9 part M's queue items (RULINGS-8's ninth-pass order, item M: one whole measure on one
# build of the ninth tip), written into m9m/q/spool for m9m/runqm.py (one file per item; the number orders them). The one
# tree is .m9m-tip (a `git archive` of HEAD without docs/, the measure's pages laid in by m9/pages9.sh), built once into
# dist-m9m (VITE_DOCK_HOLD=1, the carrier's three kept marks for G-11) and served by `prev` on 5471; its dev server
# (`plant`, 5474) carries the plants and the cells that need a dev page (the spec harness pages, the traces). Tag `m9m`
# throughout: rows in rows/m9m, logs named with `m9m`. The order is the gates' order of consequence, so a guard refusal
# (the kernel zone near 13M) cuts the least.
import os, sys
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8"
REF = "a5a4fe546"  # the measured commit (its src is f3a28b292's); named, so a docs commit on the branch never moves a tree
T = W + "/.m9m-tip"
M = W + "/.m9m-master"
SP = os.path.join(H, "m9m", "q", "spool")
RUN = os.path.join(H, "m9m", "q", "run")
L = "../logs"
os.makedirs(SP, exist_ok=True); os.makedirs(RUN, exist_ok=True)
def item(num, name, line):
    open(os.path.join(SP, f"{num:04d}-{name}.item"), "w").write(line + "\n")
PH = {}
def phase(f): PH[f.__name__.replace("_", "-")] = f; return f

def runfile(n, name, lines):
    """The item's runs as a script, one guarded run a line (m9/g.sh <engine> <minutes> '<cmd>')."""
    f = f"m9m/q/run/{n:04d}-{name}.sh"
    open(os.path.join(H, f), "w").write("set -u\n" + "\n".join(f"m9/g.sh {e} {m} '{c}'" for e, m, c in lines) + "\n")
    return f

SCEN = [l.strip() for l in open(os.path.join(H, "pm", "scenarios.txt")) if l.strip() and "p3-scope" not in l and "p6-press-fine" not in l]
SCEN += ["scenarios-m9/p9-press-fine.json", "scenarios-m9/p9-tall-fine.json", "scenarios-m9/p9-tall-dark.json",
         "scenarios-m9/p9-tallrow-fine.json", "scenarios-m9/p9-persist-fine.json", "scenarios-m9/p9-tiers-fine.json"]
INKPAGES = "nav,chrome,rail,figure-tools,dials,canvas-tools,transport,pager,corner-controls,action-row,loose"

@phase
def setup():
    item(1, "tree", f"none light 10 {L}/m9m-tip.sha {H}/m9/tree9.sh {REF} {T} pages > {H}/{L}/m9m-tip.sha 2>&1 && git -C {W} rev-parse HEAD >> {H}/{L}/m9m-tip.sha && git -C {W} log -1 --format=%H -- src >> {H}/{L}/m9m-tip.sha && python3 {H}/pm/clean.py {T} >> {H}/{L}/m9m-tip.sha 2>&1")
    item(2, "build", f"none heavy 25 {T}/dist-m9m/.hold cd {T} && VITE_DOCK_HOLD=1 node node_modules/vite/bin/vite.js build --config demo/vite.demo-dist.config.ts --outDir dist-m9m --emptyOutDir --sourcemap > {H}/{L}/m9m-build.log 2>&1 && grep -l 'dock:reread' dist-m9m/assets/*.js > dist-m9m/.hold")
    item(3, "budget", f"none light 10 {L}/m9m-lines.txt node m7/names.mjs v11.1.0 {REF} > {L}/m9m-names.txt 2>&1; {{ node s8/codelines.mjs v11.1.0 {REF}; m7/lines.sh v11.0.2 v11.1.0 {REF}; }} > {L}/m9m-lines.txt 2>&1")
    item(4, "pack", f"none heavy 25 {W}/.cache/glass-ui-11.2.0-dock9.tgz mkdir -p {W}/.cache && cd {T} && rm -rf dist && npm pack --pack-destination {W}/.cache > {H}/{L}/m9m-pack.log 2>&1 && mv {W}/.cache/mkbabb-glass-ui-*.tgz {W}/.cache/glass-ui-11.2.0-dock9.tgz && (G12_TREE={T} node {H}/pm/g12.mjs {T}/dist > {H}/{L}/m9m-g12-archive.txt 2>&1; true) && rm -rf {T}/dist && ls -l {W}/.cache/glass-ui-11.2.0-dock9.tgz >> {H}/{L}/m9m-pack.log && shasum -a 256 {W}/.cache/glass-ui-11.2.0-dock9.tgz >> {H}/{L}/m9m-pack.log && tar -tzf {W}/.cache/glass-ui-11.2.0-dock9.tgz | wc -l >> {H}/{L}/m9m-pack.log")
    item(5, "g16-cand", f"none raw 30 {L}/pm-g16-m9m-cand.json pm/g16fix.sh {REF} {T} m9m-cand > {L}/m9m-g16-run.log 2>&1")
    item(6, "g16-unused", f"none raw 30 {L}/pm-g16-m9m-unused.json pm/g16fix.sh {REF} {T} m9m-unused unused >> {L}/m9m-g16-run.log 2>&1")
    item(7, "g16-used", f"none raw 30 {L}/pm-g16-m9m-used.json pm/g16fix.sh {REF} {T} m9m-used used >> {L}/m9m-g16-run.log 2>&1")
    # g16fix leaves the measure's pages out of the tree it builds; lay them in again for the servers
    item(8, "pages-again", f"none light 5 - {H}/m9/pages9.sh {T} > /dev/null && python3 {H}/pm/clean.py {T} > {H}/{L}/m9m-tip-after-g16.txt 2>&1")

def cells(engine, base):
    E = engine
    lg = f"{L}/m9m-cells-{E}.log"
    c = [
        # the ninth's own cells (RULINGS-8 H and S), on the one build
        ("h1", "prev", f"{L}/m9-h1.m9m.{E}.json", f"node m9/h1.mjs 5471 m9m --engine {E}"),
        ("face9", "prev", f"{L}/m9-face-m9m.{E}.json", f"node m9/face9.mjs 5471 m9m --engine {E}"),
        ("corner8", "prev", f"{L}/s8-corner-m9m.{E}.dark.json", f"node s8/corner8.mjs 5471 m9m --engine {E} --scheme light --cells w-card,w-rounded,w-pill; node s8/corner8.mjs 5471 m9m --engine {E} --scheme dark --cells w-card,w-rounded,w-pill"),
        ("atlas9", "prev", f"{L}/m9-atlas.m9m.{E}.json", f"node m9/atlas9.mjs 5471 m9m --engine {E}"),
        ("atlas8", "prev", f"{L}/m8-atlas-m9m.{E}.json", f"node m8/atlas8.mjs 5471 m9m --engine {E}"),
        ("g13b", "prev", f"{L}/m9-g13b.m9m.{E}.json", f"node m9/g13b.mjs 5471 m9m --engine {E}"),
        ("veil9", "prev", f"{L}/m9-veil.m9m.{E}.json", f"node m9/veil9.mjs 5471 m9m --engine {E}"),
        ("blur9", "prev", f"{L}/m9-blur.m9m.{E}.json", f"node m9/blur9.mjs 5471 m9m --engine {E}"),
        ("seg9", "prev", f"{L}/s9-seg-m9m.{E}.json", f"node s9/seg9.mjs 5471 m9m --engine {E}"),
        ("trig9", "prev", f"{L}/s9-trig-m9m.{E}.json", f"node s9/trig9.mjs 5471 m9m --engine {E}"),
        ("level9", "prev", f"{L}/s8-level-m9m.{E}.json", f"node s9/level9.mjs 5471 m9m --engine {E}"),
        ("marks9", "prev", f"{L}/s9-marks-m9m.{E}.json", f"node s9/marks9.mjs 5471 m9m --engine {E}"),
        ("ink9", "prev", f"{L}/m9-ink-m9m.{E}.json", f"node m9/ink9.mjs 5471 m9m --engine {E} --pages {INKPAGES} --grounds " + ("field,flat,grid,daraksha" if E == "chromium" else "field,flat") + f" --base {L}/m8-ink-base.{E}.json"),
        ("nofill9", "prev", f"{L}/m9-nofill.m9m.{E}.json", f"node m9/nofill9.mjs 5471 m9m --engine {E}"),
        ("nofill9-base", "base", f"{L}/m9-nofill.m9m-v11.0.2.{E}.json", f"node m9/nofill9.mjs 5473 m9m-v11.0.2 --engine {E}"),
        # the eighth's side cells (pm/items.py), read again on this build
        ("clock2", "prev", f"{L}/clock2.m9m.{E}.json", f"node clock2.mjs 5471 m9m --engine {E}"),
        ("cells6", "prev", f"{L}/m4-cells.m9m.{E}.json", f"node m6/cells6.mjs 5471 m9m --engine {E}"),
        ("g13", "prev", f"{L}/g13-m9m.{E}.json", f"env LOG_TAG=m9m node g13.mjs 5471 --engine {E}"),
        ("g7", "prev", f"{L}/g7-m9m.{E}.json", f"env LOG_TAG=m9m node g7.mjs 5471 --engine {E}"),
        ("g8", "prev", f"{L}/g8-m9m.{E}.json", f"env LOG_TAG=m9m node g8.mjs 5471 --engine {E}"),
        ("c2", "prev", f"{L}/c2.m9m.{E}.json", f"node c2.mjs 5471 m9m --engine {E}"),
        ("census8", "prev", f"{L}/m8-census-m9m.{E}.json", f"node m8/census8.mjs 5471 m9m --engine {E}"),
        ("comp58", "prev", f"{L}/m7-comp58-m9m.{E}.json", f"node m7/comp58.mjs 5471 m9m --engine {E}"),
        ("fit7", "prev", f"{L}/m7-fit-m9m.{E}.json", f"node m7/fit7.mjs 5471 m9m --engine {E}"),
        ("trig8", "prev", f"{L}/m8-trig-m9m.{E}.json", f"node m8/trig8.mjs 5471 m9m --engine {E}"),
        ("adds7", "prev", f"{L}/m7-adds-m9m.{E}.json", f"node m7/adds7.mjs 5471 m9m --engine {E}"),
        ("mark8", "prev", f"{L}/s8-mark-m9m.{E}.json", f"node s8/mark8.mjs 5471 m9m --engine {E}"),
        ("cross8", "prev", f"{L}/m8-cross-m9m.{E}.json", f"node m8/cross8.mjs 5471 m9m --engine {E}"),
        ("fold8b", "prev", f"{L}/s8-fold-m9m.{E}.json", f"node s8/fold8b.mjs 5471 m9m --engine {E}"),
        # the dev page (the spec's rail harness): the dev server with no plant
        ("rail9", "plant", f"{L}/m9-rail.m9m.{E}.json", f"node m9/rail9.mjs 5474 m9m --engine {E}"),
    ]
    n = base
    for name, srv, done, cmd in c:
        item(n, f"cell-{E}-{name}", f"{srv} {E} 30 {done} {cmd} >> {lg} 2>&1"); n += 1
    if E == "webkit":
        item(n, "cost-webkit", f"prev webkit 25 {L}/m8-cost.m9m.webkit.json node s9/cost9.mjs 5471 m9m --engine webkit >> {lg} 2>&1")

@phase
def cells_chromium(): cells("chromium", 100)
@phase
def cells_webkit(): cells("webkit", 400)

def probes(engine, base):
    n = base
    for s in SCEN:
        name = os.path.basename(s)[:-5]
        item(n, f"probe-{engine}-{name}", f"prev {engine} 12 ../rows/m9m/{name}.wi8.{engine}.*.rows.json* node probe.mjs {W} dock-wi8 {s} --port 5471 --engine {engine} --out ../rows/m9m --no-strip >> {L}/m9m-probe-{engine}.log 2>&1")
        n += 1
    for k in range(1, 21):
        item(n, f"r30-{engine}-{k:02d}", f"prev {engine} 6 ../rows/m9m-r30/{k}/p3-swap-return-30.wi8.{engine}.*.rows.json* echo '== run {k}' $(sysctl -n vm.loadavg) >> {L}/m9m-r30-run-{engine}.log; node probe.mjs {W} dock-wi8 scenarios-m3/p3-swap-return-30.json --port 5471 --engine {engine} --out ../rows/m9m-r30/{k} --no-strip 2>&1 | cut -c1-200 >> {L}/m9m-r30-run-{engine}.log")
        n += 1

@phase
def probes_chromium(): probes("chromium", 1000)
@phase
def probes_webkit(): probes("webkit", 3000)

@phase
def gpu():
    # G-11 by trace on the GPU lane (--cpu-cores 0): the trigger frame and the two after, the landing frame and the two
    # after, the rest clause (s9/cost9.mjs, three reps at 4x and 1x as S7 read it); then the many-dock first frame and
    # the idle-fold page's writer on the tree's dev server (stacks name their source)
    item(2000, "cost-chromium", f"prev gpu 40 {L}/m8-cost.m9m.chromium.json node s9/cost9.mjs 5471 m9m --reps 3 >> {L}/m9m-cells-chromium.log 2>&1")
    f = runfile(2001, "traces", [("gpu", 10, "node m9/trace9.mjs 5474 m9m-docks18 --mode docks --n 18"), ("gpu", 10, "node m9/trace9.mjs 5474 m9m-docks10 --mode docks --n 10"),
                                 ("chromium", 20, "node m9/trace9.mjs 5474 m9m-idle --mode idle"), ("chromium", 10, "node s9/idle9.mjs 5474 m9m")])
    item(2001, "traces", f"plant raw 0 {L}/s9-idle-m9m.json sh {f} >> {L}/m9m-cells-chromium.log 2>&1")

@phase
def analyse():
    item(4950, "analyse", f"none light 25 {L}/m9m-analyse.done sh m9m/analysem.sh > {L}/m9m-analyse.log 2>&1 && echo read > {L}/m9m-analyse.done")

SPECS = ["release-10-1-1", "release-10-1-2", "release-10-1-3", "release-10-1-4", "release-10-1-5", "release-11-0-1", "release-11-0-2", "ro-loop"]
WKCFG = {"release-10-1-1": "webkit-2287", "release-10-1-2": "webkit-2287", "release-11-0-2": "release-11-0-2", "ro-loop": "ro-loop"}
def g14(base, tag, tree, port, projects_wk=("webkit", "webkit-touch"), chromium=True):
    n = base
    if chromium:
        for s in SPECS:
            log = f"{L}/m9m-g14-{tag}-chromium-{s}.log"
            item(n, f"g14-{tag}-chromium-{s}", f"none heavy 80 {log}.done cd {tree} && GLASS_UI_DEMO_PORT={port} npx playwright test -c tests-visual/playwright.config.ts {s}.spec.ts --project=chromium-headless-new --project=coarse-touch --workers=1 --reporter=list > {H}/{log} 2>&1; echo rc=$? >> {H}/{log}; grep -q ' passed\\| failed\\| flaky' {H}/{log} && echo read > {H}/{log}.done"); n += 1
    for s in SPECS:
        cfg = WKCFG.get(s, "release-11-0-1")
        env = "RO_LOOP_WEBKIT=1 " if s == "ro-loop" else ""
        projs = " ".join(f"--project={p}" for p in projects_wk)
        log = f"{L}/m9m-g14-{tag}-webkit-{s}.log"
        item(n, f"g14-{tag}-webkit-{s}", f"none webkit 80 {log}.done cd {tree} && {env}GLASS_UI_DEMO_PORT={port} npx playwright test -c tests-visual/{cfg}.config.ts {s}.spec.ts {projs} --workers=1 --reporter=list > {H}/{log} 2>&1; echo rc=$? >> {H}/{log}; grep -q ' passed\\| failed\\| flaky' {H}/{log} && echo read > {H}/{log}.done"); n += 1
    return n

@phase
def g14_tip():
    n = g14(5000, "tip", T, 5481)
    item(n, "g14-tip-runmark", f"none heavy 10 {L}/m9m-g14-tip-runmark.log cd {T} && node_modules/.bin/vitest run tests/components/custom/dock/GlassDock.run-mark.test.ts --maxWorkers=2 > {H}/{L}/m9m-g14-tip-runmark.log 2>&1; echo rc=$? >> {H}/{L}/m9m-g14-tip-runmark.log")

@phase
def g14_master():
    # master's re-taken snapshot aeb6f3ee7 (master's src and specs unchanged since: `git diff aeb6f3ee7 48bebb122 -- src
    # tests tests-visual` is empty). Its three projects were read by MEASURE-8 part M on this tree (logs/pm-g14-master-*);
    # the fourth, webkit-touch, needs the project, so the branch's four config files (which add only that project) are
    # laid over master's tree, and only that project runs.
    item(5900, "g14-master-tree", f"none light 15 - {H}/s8/tree8.sh aeb6f3ee7 {M} && for c in webkit-2287 release-11-0-1 release-11-0-2 ro-loop; do git -C {W} show HEAD:tests-visual/$c.config.ts > {M}/tests-visual/$c.config.ts; done")
    g14(5901, "master", M, 5482, projects_wk=("webkit-touch",), chromium=False)

@phase
def units():
    tests = ("tests/components/custom/dock tests/components/dock tests/components/dialog tests/components/sheet tests/components/select "
             "tests/components/custom/menu tests/components/popover.contract.test.ts tests/components/select.contract.test.ts "
             "tests/components/custom/scroll-progress-rim tests/components/ui/slider tests/components/a11y/native-title.test.ts "
             "tests/demo/sidebar-nav-landmark.a11y.test.ts tests/design/drive-tokens.test.ts tests/gates/overfit-structure.test.ts tests/styles tests/public-surface.spec.ts")
    U = f"{W}/.m9m-units"
    f = runfile(6000, "units", [
        ("light", 10, f"m9/tree9.sh {REF} {U} units > {L}/m9m-units-tree.txt 2>&1"),
        ("node", 25, f"cd {U} && node node_modules/vite/bin/vite.js build --emptyOutDir > {H}/{L}/m9m-units-build.log 2>&1; echo rc=$? >> {H}/{L}/m9m-units-build.log"),
        ("node", 40, f"cd {U} && node_modules/.bin/vitest run {tests} --maxWorkers=2 > {H}/{L}/m9m-units.log 2>&1; echo rc=$? >> {H}/{L}/m9m-units.log"),
        ("light", 20, f"cd {U} && {{ node_modules/.bin/vue-tsc --noEmit -p tsconfig.src.json; echo src rc=$?; node_modules/.bin/vue-tsc --noEmit -p tsconfig.test.json; echo test rc=$?; }} > {H}/{L}/m9m-types.log 2>&1"),
        ("light", 5, f"rm -rf {U} && echo \"$(date \"+%F %T\") m9m: removed {U} with its dist\" >> {L}/m9m-disk.log")])
    item(6000, "units", f"none raw 0 {L}/m9m-types.log sh {f}")


# the plants, every gate's (pm/items.py's list with the ninth's forms; m9m/plantrunm.sh's cells and judges), and G-14's
# counter-tests in four projects (m9m/g14plantrunm.sh)
PLANTS = ["g1-linger", "g1-afterseat", "g1-presshold", "g1-lift", "g8-nohold", "g6-overflow", "s6-nogate", "s6-words", "g2-step",
          "g2-facehalf", "g3-hold", "g9-scope", "g9-three", "g2-curve", "g2-lane", "g13-shown", "facerule", "s1-facepad",
          "s3-nodark", "dark", "g15-baked", "g15-onestep", "s4-cureqhover", "s4-channel", "s4-toggle08", "s5-tab38", "s5-trigrun",
          "s5-ctlglyph", "g13-tabsvg", "iconword", "g13-trigseat", "g4-groupframe", "s7-nogate", "g11-rest",
          "g2-clock", "g2-touch", "g2-rim", "g2-held", "g2-laneinset", "g2-nocut", "g2-fitwhole", "g2-whole-never",
          "g2-whole-length", "g2-room", "g4-join", "g4-ghost", "g4-snap2", "g4-scroll", "g4-openseat", "g6-flow", "g7-provide",
          "g8-hold", "g8-exempt", "g8-trigger", "touchcure", "g10-rm", "g12-scale", "g13-safe", "g14-fitmemory", "g14-fitsibs",
          "g14-rmclock", "g1-frompress", "fold", "mark"]
G14P = ["stale-target", "g14-lane-1501", "g2-nocut", "g14-touch", "s4-press2", "s4-hover8", "s6-empty", "g2-curve", "g14-corner",
        "g14-clock", "g14-lane", "g14-reserve", "g14-press", "g14-cap", "g14-fits", "g14-zoom"]

@phase
def plants():
    for k, p in enumerate(PLANTS):
        item(7000 + k, f"plant-{p}", f"plant raw 0 {L}/m9m-plant-{p}.txt m9m/plantrunm.sh {p}")

@phase
def g14plants():
    for k, p in enumerate(G14P):
        item(7500 + k, f"g14plant-{p}", f"none raw 0 {L}/m9m-g14plant-{p}.log m9m/g14plantrunm.sh {p}")

@phase
def atlashead():
    # ORCH-LINES-8's primary atlas cell (the head-row placement with the reservation), on the tree's dev server: the page's
    # &reserve=1 form was laid into the tree after the build (m9/dock-wi8.vue), so the build does not carry it
    item(130, "cell-chromium-atlashead", f"plant chromium 20 {L}/m9m-atlashead-m9m.chromium.json node m9m/atlashead.mjs 5474 m9m --engine chromium >> {L}/m9m-cells-chromium.log 2>&1")
    item(432, "cell-webkit-atlashead", f"plant webkit 20 {L}/m9m-atlashead-m9m.webkit.json node m9m/atlashead.mjs 5474 m9m --engine webkit >> {L}/m9m-cells-webkit.log 2>&1")

# G-14 split by engine, so the Chromium half reads before WebKit's cells (the queue's order of consequence)
def g14eng(base, tag, tree, port, engine, projects_wk=("webkit", "webkit-touch")):
    n = base
    for s in SPECS:
        log = f"{L}/m9m-g14-{tag}-{engine}-{s}.log"
        if engine == "chromium":
            cmd = f"cd {tree} && GLASS_UI_DEMO_PORT={port} npx playwright test -c tests-visual/playwright.config.ts {s}.spec.ts --project=chromium-headless-new --project=coarse-touch --workers=1 --reporter=list > {H}/{log} 2>&1"
            eng = "heavy"
        else:
            cfg = WKCFG.get(s, "release-11-0-1"); env = "RO_LOOP_WEBKIT=1 " if s == "ro-loop" else ""
            projs = " ".join(f"--project={p}" for p in projects_wk)
            cmd = f"cd {tree} && {env}GLASS_UI_DEMO_PORT={port} npx playwright test -c tests-visual/{cfg}.config.ts {s}.spec.ts {projs} --workers=1 --reporter=list > {H}/{log} 2>&1"
            eng = "webkit"
        item(n, f"g14-{tag}-{engine}-{s}", f"none {eng} 80 {log}.done {cmd}; echo rc=$? >> {H}/{log}; grep -q ' passed\\| failed\\| flaky' {H}/{log} && echo read > {H}/{log}.done"); n += 1
    return n

@phase
def g14_tip_chromium(): g14eng(2200, "tip", T, 5481, "chromium")
@phase
def g14_tip_webkit():
    n = g14eng(3500, "tip", T, 5481, "webkit")
    item(n, "g14-tip-runmark", f"none heavy 10 {L}/m9m-g14-tip-runmark.log cd {T} && node_modules/.bin/vitest run tests/components/custom/dock/GlassDock.run-mark.test.ts --maxWorkers=2 > {H}/{L}/m9m-g14-tip-runmark.log 2>&1; echo rc=$? >> {H}/{L}/m9m-g14-tip-runmark.log")
@phase
def units_early():
    for f in os.listdir(SP):
        if f.startswith("6000-units"): os.replace(os.path.join(SP, f), os.path.join(SP, "4960-units.item"))

PAGES11 = "nav,pill,pager,dials,chrome,transport,rail,canvas-tools,corner-controls,action-row,figure-tools"
def plate(engine, base):
    E = engine; eng = "" if E == "chromium" else " --engine webkit"; n = base
    shots = f"{L}/m9m-q10-shots"
    for tag, extra in (("q10grid", f"--pages {PAGES11} --grounds grid --schemes dark,light"),
                       ("q10field", f"--pages {PAGES11} --grounds field --schemes dark"),
                       ("q10fieldl", "--pages nav,pill --grounds field --schemes light"),
                       ("q10dar", "--pages nav,pill --grounds daraksha --schemes dark,light")):
        item(n, f"plate-{E}-{tag}", f"prev {E} 80 {L}/m8-plate-m9m-{tag}.{E}.json node m8/plate8.mjs 5471 m9m-{tag}{eng} {extra} --shots {shots} --shotpages nav,pill >> {L}/m9m-plate.log 2>&1"); n += 1
    for tag, extra in (("today-grid", f"--pages {PAGES11} --grounds grid --schemes dark,light"),
                       ("today-more", "--pages nav,pill --grounds field,daraksha --schemes dark,light")):
        item(n, f"plate-{E}-{tag}", f"base {E} 40 {L}/m8-plate-m9m-q10{tag}.{E}.json node m8/plate8.mjs 5473 m9m-q10{tag}{eng} --label today --rungs today {extra} --shots {shots} --shotpages nav,pill >> {L}/m9m-plate.log 2>&1"); n += 1

@phase
def plate_chromium(): plate("chromium", 4970)
@phase
def plate_webkit(): plate("webkit", 8000)

def owner(engine, base):
    E = engine; o = f"{L}/m9m-owner"
    item(base, f"owner-{E}-build", f"prev {E} 40 {o}/owner9m.build.{E}.json node m9m/ownerm.mjs 5471 {o} --engine {E} >> {L}/m9m-owner.log 2>&1")
    item(base + 1, f"owner-{E}-today", f"base {E} 20 {o}/owner9m.today.{E}.json node m9m/ownerm.mjs 5473 {o} --engine {E} --label today --only q21 >> {L}/m9m-owner.log 2>&1")

@phase
def owner_chromium(): owner("chromium", 4990)
@phase
def owner_webkit(): owner("webkit", 8100)

@phase
def g14_master_touch():
    item(7900, "g14-master-tree", f"none light 15 - {H}/s8/tree8.sh aeb6f3ee7 {M} && for c in webkit-2287 release-11-0-1 release-11-0-2 ro-loop; do git -C {W} show {REF}:tests-visual/$c.config.ts > {M}/tests-visual/$c.config.ts; done")
    g14eng(7901, "master", M, 5482, "webkit", projects_wk=("webkit-touch",))

if __name__ == "__main__":
    for p in sys.argv[1:]:
        PH[p]()
        print("queued", p)
    print(len([f for f in os.listdir(SP) if f.endswith(".item")]), "items in the spool")
