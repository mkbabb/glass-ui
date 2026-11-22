# items9.py <phase>...: MEASURE-9 part H's queue items, written into m9/q/spool for m9/runq9.py (one file per item, the
# name orders them). Each phase is an item of RULINGS-8's ninth-pass order (H1 to H14) or a tree it needs.
import os, sys
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8"
T = W + "/.m9-tip"
V = W + "/.m9-v1110"
SP = os.path.join(H, "m9", "q", "spool")
L = "../logs"
os.makedirs(SP, exist_ok=True)
def item(num, name, line):
    open(os.path.join(SP, f"{num:04d}-{name}.item"), "w").write(line + "\n")
PH = {}
def phase(f): PH[f.__name__] = f; return f

@phase
def tip():
    item(1, "tree-tip", f"none light 10 {L}/m9-tip.sha {H}/m9/tree9.sh HEAD {T} pages > {H}/{L}/m9-tip.sha 2>&1 && python3 {H}/pm/clean.py {T} >> {H}/{L}/m9-tip.sha 2>&1")
    # VITE_DOCK_HOLD=1 as part M built it (the probe's pose hook); `.hold` marks a build that carries it
    item(2, "build-tip", f"none heavy 25 {T}/dist-m9/.hold cd {T} && VITE_DOCK_HOLD=1 node node_modules/vite/bin/vite.js build --config demo/vite.demo-dist.config.ts --outDir dist-m9 --emptyOutDir --sourcemap > {H}/{L}/m9-build.log 2>&1 && grep -l __dockHold dist-m9/assets/GlassDock-*.js > dist-m9/.hold")

@phase
def v1110():
    item(3, "tree-v1110", f"none light 10 {L}/m9-v1110.sha {H}/m9/tree9.sh v11.1.0 {V} pages > {H}/{L}/m9-v1110.sha 2>&1")

def probe(n, name, srv, eng, scen, port, out, mins=15):
    sc = os.path.basename(scen)[:-5]
    item(n, name, f"{srv} {eng} {mins} ../rows/{out}/{sc}.wi8.{eng}.*.rows.json* node probe.mjs {W} dock-wi8 {scen} --port {port} --engine {eng} --out ../rows/{out} --no-strip >> {L}/m9-probe-{out}.log 2>&1")

RUN = os.path.join(H, "m9", "q", "run")
os.makedirs(RUN, exist_ok=True)

def runfile(n, name, lines):
    """The item's runs as a script, one guarded run a line (m9/g.sh <engine> <minutes> '<cmd>'), so a command with `;`,
    `&&` or a redirect runs whole inside its guard, never in withplant.sh's shell."""
    f = f"m9/q/run/{n:04d}-{name}.sh"
    open(os.path.join(H, f), "w").write("set -u\n" + "\n".join(f"m9/g.sh {e} {m} '{c}'" for e, m, c in lines) + "\n")
    return f

def planted(n, plants, cmd_by_engine, done, engines=("chromium", "webkit")):
    """One counter-test: the plants applied to .m9-tip, each engine's run guarded by m9/g.sh, reverted, tree checked."""
    f = runfile(n, f"plant-{plants}", [(e, 30, cmd_by_engine(e)) for e in engines])
    item(n, f"plant-{plants}", f"plant raw 0 {done} m9/withplant.sh {plants} {L}/m9-plant-{plants}.txt 'sh {f}'")

@phase
def h1():
    for i, e in enumerate(("chromium", "webkit")):
        item(100 + i, f"h1-tip-{e}", f"prev {e} 20 {L}/m9-h1.tip.{e}.json node m9/h1.mjs 5441 tip --engine {e} >> {L}/m9-h1.log 2>&1")
        probe(102 + i, f"h1-press-tip-{e}", "prev", e, "scenarios-m9/p9-press-fine.json", 5441, "m9")
    for n, (pl, only) in enumerate((("g1-linger", "k"), ("g1-afterseat", "k2"), ("g1-presshold", "finger"), ("g8-nohold", "menu"))):
        planted(110 + n, pl, lambda e, pl=pl, only=only: f"node m9/h1.mjs 5444 plant-{pl} --engine {e} --only {only}", f"{L}/m9-h1.plant-{pl}.webkit.json")
    sc = "scenarios-m9/p9-press-fine.json"
    planted(120, "cand-pressgate", lambda e: f"node probe.mjs {W} dock-wi8 {sc} --port 5444 --engine {e} --out ../rows/m9-cand-pressgate --no-strip", "../rows/m9-cand-pressgate/p9-press-fine.wi8.webkit.*.rows.json*")
    planted(121, "cand-pressgate+g6-overflow", lambda e: f"node probe.mjs {W} dock-wi8 {sc} --port 5444 --engine {e} --out ../rows/m9-plant-g6-overflow --no-strip", "../rows/m9-plant-g6-overflow/p9-press-fine.wi8.webkit.*.rows.json*")

@phase
def h1fix():
    # g.sh's first form lost Chromium's leg of the first two counter-tests (an empty flag array under `set -u`)
    for n, (pl, only) in enumerate((("g1-linger", "k"), ("g1-afterseat", "k2"))):
        planted(130 + n, pl, lambda e, pl=pl, only=only: f"node m9/h1.mjs 5444 plant-{pl} --engine {e} --only {only}", f"{L}/m9-h1.plant-{pl}.chromium.json", engines=("chromium",))

def probes_cmd(scens, port, out, e):
    return " ; ".join(f"node probe.mjs {W} dock-wi8 {sc} --port {port} --engine {e} --out ../rows/{out} --no-strip" for sc in scens)

@phase
def h2():
    E = ("chromium", "webkit")
    pill = ["scenarios-m3/p3-fold-pill-fine.json"]
    rev = [f"scenarios-m3/{n}.json" for n in ("p3-rev-fold-25-ptr", "p3-rev-fold-50-ptr", "p3-rev-unfold-50-out")]
    for i, e in enumerate(E):
        item(200 + i, f"h2-tip-{e}", f"prev {e} 25 ../rows/m9/p3-rev-unfold-50-out.wi8.{e}.*.rows.json* " + probes_cmd(pill + rev, 5441, "m9", e) + f" >> {L}/m9-probe-m9.log 2>&1")
        item(202 + i, f"h2-g13b-tip-{e}", f"prev {e} 15 {L}/m9-g13b.tip.{e}.json node m9/g13b.mjs 5441 tip --engine {e} >> {L}/m9-h2.log 2>&1")
    planted(210, "g2-step", lambda e: probes_cmd(pill, 5444, "m9-plant-g2-step", e), "../rows/m9-plant-g2-step/p3-fold-pill-fine.wi8.webkit.*.rows.json*")
    planted(211, "g3-hold", lambda e: probes_cmd(rev, 5444, "m9-plant-g3-hold", e), "../rows/m9-plant-g3-hold/p3-rev-unfold-50-out.wi8.webkit.*.rows.json*")
    # g13-shown is read by h2b's second form of g13b (item 222)
    # painted readings on the frozen clock: the tip on the dev server (`none`), then each plant, same cells
    fr = lambda tag, e: " ; ".join(f"node m9/frames9.mjs 5444 {tag} --engine {e} --cell {c} --scheme {sch}" for c, sch in (("w-tiers", "light"), ("w-tiers", "dark"), ("w-pill", "light"), ("w-persist", "light")))
    planted(213, "none", lambda e: fr("tip-dev", e), "../crops-m9/tip-dev/w-persist.light.webkit.json")
    planted(214, "g9-scope", lambda e: " ; ".join(f"node m9/frames9.mjs 5444 plant-g9-scope --engine {e} --cell {c} --scheme {sch}" for c, sch in (("w-tiers", "light"), ("w-tiers", "dark"), ("w-pill", "light"))) + " ; " + probes_cmd(pill, 5444, "m9-plant-g9-scope", e), "../rows/m9-plant-g9-scope/p3-fold-pill-fine.wi8.webkit.*.rows.json*")
    planted(215, "g9-three", lambda e: probes_cmd(pill, 5444, "m9-plant-g9-three", e), "../rows/m9-plant-g9-three/p3-fold-pill-fine.wi8.webkit.*.rows.json*")
    planted(216, "g2-lane", lambda e: f"node m9/frames9.mjs 5444 plant-g2-lane --engine {e} --cell w-persist --scheme light", "../crops-m9/plant-g2-lane/w-persist.light.webkit.json")

TALL = ["scenarios-m9/p9-tall-fine.json", "scenarios-m9/p9-tall-dark.json", "scenarios-m3/p3-swap-layers-fine.json", "scenarios-m3/p3-fold-flow-fine.json",
        "scenarios-m3/p3-swap-xf-fine.json", "scenarios-m3/p3-fold-vert-fine.json", "scenarios-m3/p3-fold-rail-fine.json", "scenarios-m9/p9-tallrow-fine.json", "scenarios-m3/p3-fold-pill-fine.json"]

@phase
def h3():
    for i, e in enumerate(("chromium", "webkit")):
        item(300 + i, f"h3-tip-{e}", f"prev {e} 30 ../rows/m9-h3-tip/p3-fold-pill-fine.wi8.{e}.*.rows.json* " + probes_cmd(TALL, 5441, "m9-h3-tip", e) + f" >> {L}/m9-probe-h3.log 2>&1")
    for n, pl in enumerate(("g2-curve", "cand-ru91", "cand-ru91-cross")):
        planted(310 + n, pl, lambda e, pl=pl: probes_cmd(TALL, 5444, f"m9-h3-{pl}", e), f"../rows/m9-h3-{pl}/p3-fold-pill-fine.wi8.webkit.*.rows.json*")

@phase
def h2b():
    # g13b's second form: a dock open at load (w-daraksha's ControlsDock) folded by a press outside before the read
    for i, e in enumerate(("chromium", "webkit")):
        item(220 + i, f"h2-g13b-tipb-{e}", f"prev {e} 15 {L}/m9-g13b.tip-b.{e}.json node m9/g13b.mjs 5441 tip-b --engine {e} >> {L}/m9-h2.log 2>&1")
    planted(222, "g13-shown", lambda e: f"node m9/g13b.mjs 5444 plant-g13-shown-b --engine {e}", f"{L}/m9-g13b.plant-g13-shown-b.webkit.json")

def pw(name, cfg, spec, grep, project):
    """One G-14 site in one project, run in .m9-tip against the plant server (the tree's dev server, 5444)."""
    rep = f"{H}/{L}/m9-g14-{name}-{project}"
    return (f"cd {T} && GLASS_UI_DEMO_PORT=5444 GLASS_UI_DEMO_URL=http://127.0.0.1:5444 PI_REPORT={rep}.json "
            f"npx playwright test -c tests-visual/{cfg} {spec} -g \"{grep}\" --project={project} --workers=1 --reporter=list > {rep}.log 2>&1")

def g14(n, plants, name, spec, grep, projects, cfgwk="release-11-0-2.config.ts"):
    lines = []
    for p in projects:
        eng = "webkit" if p.startswith("webkit") else "chromium"
        lines.append((eng, 40, pw(name, "playwright.config.ts" if eng == "chromium" else cfgwk, spec, grep, p)))
    f = runfile(n, f"g14-{name}", lines)
    item(n, f"g14-{name}", f"plant raw 0 {L}/m9-g14-{name}-{projects[-1]}.log m9/withplant.sh {plants} {L}/m9-plant-{plants}.txt 'sh {f}'")

@phase
def h4():
    item(400, "h4-sync", f"none light 5 {L}/m9-h4-sync.txt m9/synctests.sh {T} > {L}/m9-h4-sync.txt 2>&1")
    planted(401, "none", lambda e: f"node m9/rail9.mjs 5444 tip --engine {e}", f"{L}/m9-rail.tip.webkit.json")
    FINE = ["chromium-headless-new", "webkit"]
    ALL = ["chromium-headless-new", "coarse-touch", "webkit", "webkit-touch"]
    S2 = "tests-visual/release-11-0-2.spec.ts"
    g14(410, "none", "fills-tip", S2, "seat fills are the dock", FINE)
    g14(411, "cand-hover5", "fills-hover5", S2, "seat fills are the dock", FINE)
    g14(412, "none", "transition-tip", S2, "transition · a control slotted", FINE)
    g14(413, "none", "foldbox-tip", S2, "content stays inside the plate and fades", ALL)
    g14(414, "g14-lane", "foldbox-g14-lane", S2, "content stays inside the plate and fades", ALL)
    g14(415, "g2-nocut", "foldbox-g2-nocut", S2, "content stays inside the plate and fades", ALL)
    S12 = "tests-visual/release-10-1-2.spec.ts"
    g14(416, "none", "o101-tip", S12, "O-101", ALL)
    g14(417, "stale-target", "o101-stale", S12, "O-101", ALL)
    for k in range(1, 6):
        g14(420 + k, "none", f"d1-run{k}", "tests-visual/release-10-1-3.spec.ts", "critique-3", ["webkit"], cfgwk="webkit-2287.config.ts")
    S11 = "tests-visual/release-10-1-1.spec.ts"
    g14(430, "none", "touch-tip", S11, "O-102\\(3\\)", ["webkit-touch"], cfgwk="webkit-2287.config.ts")
    g14(431, "g14-touch", "touch-g14-touch", S11, "O-102\\(3\\)", ["webkit-touch"], cfgwk="webkit-2287.config.ts")
    U = "tests/components/custom/dock/dock-hover-corner.test.ts tests/components/custom/dock/collapsed-face-content-sized.test.ts"
    for n, pl in enumerate(("none", "cand-ru91", "cand-face", "cand-ru91+cand-face")):
        f = runfile(440 + n, f"h4-units-{pl}", [("node", 10, f"cd {T} && node_modules/.bin/vitest run {U} --maxWorkers=2 --reporter=verbose > {H}/{L}/m9-h4-units-{pl}.log 2>&1")])
        item(440 + n, f"h4-units-{pl}", f"plant raw 0 {L}/m9-h4-units-{pl}.log m9/withplant.sh {pl} {L}/m9-plant-{pl}.txt 'sh {f}'")

@phase
def h5():
    P = "nav,action-row,canvas-tools,dials"
    combos = [("5", "10"), ("5", "12"), ("5", "14"), ("6.5", "10"), ("8", "10")]
    n = 500
    for e, grounds in (("chromium", "field,flat,grid,daraksha"), ("webkit", "field,flat")):
        for h, c in combos:
            crops = " --crops" if (h, c) in (("5", "10"), ("6.5", "10")) else ""
            tag = f"h{h}-c{c}"
            item(n, f"h5-ink-{e}-{tag}", f"prev {e} 60 {L}/m9-ink-{tag}.{e}.json node m9/ink9.mjs 5441 {tag} --engine {e} --pages {P} --grounds {grounds} --hstep {h} --cstep {c} --light-level 1 --dark-level 0.7 --base {L}/m8-ink-base.{e}.json{crops} >> {L}/m9-ink-run.log 2>&1")
            n += 1
    for i, e in enumerate(("chromium", "webkit")):
        item(520 + i, f"h5-nofill-tip-{e}", f"prev {e} 15 {L}/m9-nofill.tip.{e}.json node m9/nofill9.mjs 5441 tip --engine {e} >> {L}/m9-ink-run.log 2>&1")
        item(522 + i, f"h5-nofill-base-{e}", f"base {e} 15 {L}/m9-nofill.v11.0.2.{e}.json node m9/nofill9.mjs 5443 v11.0.2 --engine {e} >> {L}/m9-ink-run.log 2>&1")

@phase
def h2c():
    # g2-step's second form (the window widened to 0.75), so the fade outlasts 66.7 ms and only op60 can fail it
    rev = [f"scenarios-m3/{n}.json" for n in ("p3-rev-fold-25-ptr", "p3-rev-fold-50-ptr", "p3-rev-unfold-50-out")]
    # g3-hold's second form: the posture change deferred 85 ms, the plate going on along its old travel
    planted(231, "g3-hold", lambda e: probes_cmd(rev, 5444, "m9-plant-g3-hold-b", e), "../rows/m9-plant-g3-hold-b/p3-rev-unfold-50-out.wi8.webkit.*.rows.json*")
    planted(230, "g2-step", lambda e: probes_cmd(["scenarios-m3/p3-fold-pill-fine.json"], 5444, "m9-plant-g2-step-b", e), "../rows/m9-plant-g2-step-b/p3-fold-pill-fine.wi8.webkit.*.rows.json*")

@phase
def h6():
    PAGES = "nav,pill,pager,dials,chrome,transport,rail,canvas-tools,corner-controls,action-row,figure-tools"
    for i, e in enumerate(("chromium", "webkit")):
        eng = "" if e == "chromium" else " --engine webkit"
        item(600 + i, f"h6-plate-{e}", f"prev {e} 80 {L}/m8-plate-m9-q10grid.{e}.json node m8/plate8.mjs 5441 m9-q10grid{eng} --pages {PAGES} --grounds grid --schemes dark,light >> {L}/m9-plate.log 2>&1")
        item(602 + i, f"h6-blur-{e}", f"prev {e} 10 {L}/m9-blur.tip.{e}.json node m9/blur9.mjs 5441 tip --engine {e} >> {L}/m9-plate.log 2>&1")

@phase
def h2d():
    # g2-lane painted a difference on w-persist (crops), so its clause is read on rows: p9-persist-fine on the dev server,
    # the tip and the plant, judged by read6
    sc = ["scenarios-m9/p9-persist-fine.json"]
    planted(232, "none", lambda e: probes_cmd(sc, 5444, "m9-dev", e), "../rows/m9-dev/p9-persist-fine.wi8.webkit.*.rows.json*")
    planted(233, "g2-lane", lambda e: probes_cmd(sc, 5444, "m9-plant-g2-lane", e), "../rows/m9-plant-g2-lane/p9-persist-fine.wi8.webkit.*.rows.json*")
    # g3-hold's third form: only a reversal is deferred (the second form also deferred a fold from rest)
    rev = [f"scenarios-m3/{n}.json" for n in ("p3-rev-fold-25-ptr", "p3-rev-fold-50-ptr", "p3-rev-unfold-50-out")]
    planted(234, "g3-hold", lambda e: probes_cmd(rev, 5444, "m9-plant-g3-hold-c", e), "../rows/m9-plant-g3-hold-c/p3-rev-unfold-50-out.wi8.webkit.*.rows.json*")

@phase
def h7():
    for i, e in enumerate(("chromium", "webkit")):
        item(700 + i, f"h7-face-{e}", f"prev {e} 20 {L}/m9-face-tip.{e}.json node m9/face9.mjs 5441 tip --engine {e} >> {L}/m9-h7.log 2>&1")
        item(702 + i, f"h7-veil-{e}", f"prev {e} 10 {L}/m9-veil.tip.{e}.json node m9/veil9.mjs 5441 tip --engine {e} >> {L}/m9-h7.log 2>&1")
        item(704 + i, f"h7-corner-{e}", f"prev {e} 20 {L}/s8-corner-m9.{e}.dark.json node s8/corner8.mjs 5441 m9 --engine {e} --scheme light --cells w-card,w-rounded,w-pill >> {L}/m9-h7.log 2>&1; node s8/corner8.mjs 5441 m9 --engine {e} --scheme dark --cells w-card,w-rounded,w-pill >> {L}/m9-h7.log 2>&1")
    planted(710, "cand-face", lambda e: f"node m9/face9.mjs 5444 cand-face --engine {e}", f"{L}/m9-face-cand-face.webkit.json")

@phase
def h8():
    for i, e in enumerate(("chromium", "webkit")):
        item(800 + i, f"h8-atlas-{e}", f"prev {e} 10 {L}/m9-atlas.tip.{e}.json node m9/atlas9.mjs 5441 tip --engine {e} >> {L}/m9-h8.log 2>&1")

@phase
def h9():
    f = runfile(900, "h9-tip", [("chromium", 20, "node m9/trace9.mjs 5444 tip-idle --mode idle"), ("chromium", 10, "node m9/trace9.mjs 5444 tip-layer --mode layer"),
                                ("chromium", 10, "node m9/trace9.mjs 5444 tip-docks18 --mode docks --n 18"), ("chromium", 10, "node m9/trace9.mjs 5444 tip-docks10 --mode docks --n 10")])
    item(900, "h9-tip", f"plant raw 0 {L}/m9-trace-tip-docks10.json m9/withplant.sh none {L}/m9-plant-none.txt 'sh {f}'")
    item(901, "h9-v1110", f"v1110 chromium 20 {L}/m9-trace-v1110-idle.json node m9/trace9.mjs 5446 v1110-idle --mode idle >> {L}/m9-h9.log 2>&1")

@phase
def h10():
    # RU-101 (C8-M2): w-words's growth and shrink stepped on the frozen clock, Chromium, both schemes; read6's overlap
    # clause on the rows (no browser).
    f = runfile(1000, "h10-words", [("chromium", 10, "node m9/frames9.mjs 5441 words --engine chromium --cell w-words --scheme light --action click:w-words-longer --stem w-words-grow"),
                                     ("chromium", 10, "node m9/frames9.mjs 5441 words --engine chromium --cell w-words --scheme light --action click:w-words-longer --pre w-words-longer --stem w-words-shrink"),
                                     ("chromium", 10, "node m9/frames9.mjs 5441 words --engine chromium --cell w-words --scheme dark --action click:w-words-longer --stem w-words-grow")])
    item(1000, "h10-words", f"prev raw 0 ../crops-m9/words/w-words-grow.dark.chromium.json sh {f} >> {L}/m9-h10.log 2>&1")

@phase
def h11():
    # RU-108 (C8-M10): v11.1.0's consumer fixture by MEASURE-8 H8's method (pm/g16fix.sh), in the v11.1.0 tree the pass
    # already keeps (.m9-v1110, its .g16-ref at v11.1.0), its dist and the fixture's output deleted after the read.
    item(1100, "h11-g16-v1110", f"none raw 30 {L}/pm-g16-m9-v1110.json pm/g16fix.sh v11.1.0 {W}/.m9-v1110 m9-v1110 > {L}/m9-g16-run.log 2>&1")

@phase
def h12():
    # RU-109 (C8-M12): which dock code lines no cell reaches, by V8 block coverage on the tip's dev server (no plant)
    f = runfile(1200, "h12-cover", [("chromium", 40, f"node m9/cover9.mjs 5444 tip > {L}/m9-cover-tip.txt 2>&1")])
    item(1200, "h12-cover", f"plant raw 0 {L}/m9-cover-tip.json m9/withplant.sh none {L}/m9-plant-none.txt 'sh {f}'")

if __name__ == "__main__":
    for p in sys.argv[1:]:
        PH[p]()
        print("queued", p)
