# items.py <phase>...: MEASURE-8 part M's queue items, written into pm/q/spool for pm/runq.py (one file per item, the name
# orders them). Phases: build, probes-<engine>, side-<engine>, plate, analyse, units, g16, budget, pack, g14-tip, g14-master,
# plants, g14plants. Tag `pm` throughout: rows in rows/pm (and rows/pm-r30), logs named with `pm`.
import os, sys
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8"
T = W + "/.pm-tip"
M = W + "/.pm-master"
SP = os.path.join(H, "pm", "q", "spool")
L = "../logs"
os.makedirs(SP, exist_ok=True)
def item(num, name, line):
    open(os.path.join(SP, f"{num:04d}-{name}.item"), "w").write(line + "\n")

SCEN = [l.strip() for l in open(os.path.join(H, "pm", "scenarios.txt")) if l.strip()]
PAGES = "nav,pill,pager,dials,chrome,transport,rail,canvas-tools,corner-controls,action-row,figure-tools"

def build():
    item(1, "sha", f"none light 5 {L}/pm-build.sha cd {W} && {{ git rev-parse HEAD; git status --short src tests; cat {T}/.g16-ref; python3 {H}/pm/clean.py {T}; }} > {H}/{L}/pm-build.sha 2>&1")
    item(2, "build", f"none heavy 25 {T}/dist-pm/index.html VITE_DOCK_HOLD=1 {H}/m8/build8.sh {T} dist-pm > {H}/{L}/pm-build.log 2>&1")

def probes(engine, base):
    n = base
    for s in SCEN:
        name = os.path.basename(s)[:-5]
        item(n, f"probe-{engine}-{name}", f"prev {engine} 12 ../rows/pm/{name}.wi8.{engine}.*.rows.json* node probe.mjs {W} dock-wi8 {s} --port 5401 --engine {engine} --out ../rows/pm --no-strip >> {L}/pm-probe-{engine}.log 2>&1")
        n += 1
    for k in range(1, 21):
        item(n, f"r30-{engine}-{k:02d}", f"prev {engine} 6 ../rows/pm-r30/{k}/p3-swap-return-30.wi8.{engine}.*.rows.json* echo '== run {k}' $(sysctl -n vm.loadavg) >> {L}/pm-r30-run-{engine}.log; node probe.mjs {W} dock-wi8 scenarios-m3/p3-swap-return-30.json --port 5401 --engine {engine} --out ../rows/pm-r30/{k} --no-strip 2>&1 | cut -c1-200 >> {L}/pm-r30-run-{engine}.log")
        n += 1

def side(engine, base):
    E = engine
    log = f"{L}/pm-side-{E}.log"
    cells = [
        ("clock2", f"{L}/clock2.pm.{E}.json", f"node clock2.mjs 5401 pm --engine {E}"),
        ("cells6", f"{L}/m4-cells.pm.{E}.json", f"node m6/cells6.mjs 5401 pm --engine {E}"),
        ("g13", f"{L}/g13-pm.{E}.json", f"env LOG_TAG=pm node g13.mjs 5401 --engine {E}"),
        ("g7", f"{L}/g7-pm.{E}.json", f"env LOG_TAG=pm node g7.mjs 5401 --engine {E}"),
        ("g8", f"{L}/g8-pm.{E}.json", f"env LOG_TAG=pm node g8.mjs 5401 --engine {E}"),
        ("c2", f"{L}/c2.pm.{E}.json", f"node c2.mjs 5401 pm --engine {E}"),
        ("census8", f"{L}/m8-census-pm.{E}.json", f"node m8/census8.mjs 5401 pm --engine {E}"),
        ("comp58", f"{L}/m7-comp58-pm.{E}.json", f"node m7/comp58.mjs 5401 pm --engine {E}"),
        ("face8", f"{L}/s8-face-pm.{E}.json", f"node s8/face8.mjs 5401 pm --engine {E}"),
        ("fit7", f"{L}/m7-fit-pm.{E}.json", f"node m7/fit7.mjs 5401 pm --engine {E}"),
        ("trig8", f"{L}/m8-trig-pm.{E}.json", f"node m8/trig8.mjs 5401 pm --engine {E}"),
        ("adds7", f"{L}/m7-adds-pm.{E}.json", f"node m7/adds7.mjs 5401 pm --engine {E}"),
        ("ink8", f"{L}/m8-ink-pm.{E}.json", f"node m8/ink8.mjs 5401 pm --engine {E} --base {L}/m8-ink-base.{E}.json" + (" --crop" if E == "webkit" else "")),
        ("level8", f"{L}/s8-level-pm.{E}.json", f"node s8/level8.mjs 5401 pm --engine {E}"),
        ("mark8", f"{L}/s8-mark-pm.{E}.json", f"node s8/mark8.mjs 5401 pm --engine {E}"),
        ("cross8", f"{L}/m8-cross-pm.{E}.json", f"node m8/cross8.mjs 5401 pm --engine {E}"),
        ("atlas8", f"{L}/m8-atlas-pm.{E}.json", f"node m8/atlas8.mjs 5401 pm --engine {E}"),
        ("fold8b", f"{L}/s8-fold-pm.{E}.json", f"node s8/fold8b.mjs 5401 pm --engine {E}"),
        ("corner-light", f"{L}/s8-corner-pm.{E}.light.json", f"node s8/corner8.mjs 5401 pm --engine {E} --scheme light --cells w-card,w-rounded,w-pill"),
        ("corner-dark", f"{L}/s8-corner-pm.{E}.dark.json", f"node s8/corner8.mjs 5401 pm --engine {E} --scheme dark --cells w-card,w-rounded,w-pill"),
    ]
    n = base
    for name, done, cmd in cells:
        item(n, f"side-{E}-{name}", f"prev {E} 30 {done} {cmd} >> {log} 2>&1"); n += 1
    if E == "chromium":
        item(n, "cost-chromium", f"prev gpu 40 {L}/m8-cost.pm.chromium.json node m8/cost8.mjs 5401 pm >> {log} 2>&1")
    else:
        item(n, "cost-webkit", f"prev webkit 25 {L}/m8-cost.pm.webkit.json node m8/cost8.mjs 5401 pm --engine webkit >> {log} 2>&1")

def plate(base):
    n = base
    shots = f"{L}/pm-q10-shots"
    for E in ("chromium", "webkit"):
        eng = "" if E == "chromium" else " --engine webkit"
        for tag, extra in (("q10grid", f"--pages {PAGES} --grounds grid --schemes dark,light"),
                           ("q10field", f"--pages {PAGES} --grounds field --schemes dark"),
                           ("q10fieldl", "--pages nav,pill --grounds field --schemes light"),
                           ("q10dar", "--pages nav,pill --grounds daraksha --schemes dark,light")):
            item(n, f"plate-{E}-{tag}", f"prev {E} 80 {L}/m8-plate-pm-{tag}.{E}.json node m8/plate8.mjs 5401 pm-{tag}{eng} {extra} --shots {shots} --shotpages nav,pill >> {L}/pm-plate.log 2>&1"); n += 1
        for tag, extra in (("today-grid", f"--pages {PAGES} --grounds grid --schemes dark,light"),
                           ("today-field", f"--pages {PAGES} --grounds field --schemes dark"),
                           ("today-more", "--pages nav,pill --grounds field,daraksha --schemes dark,light")):
            item(n, f"plate-{E}-{tag}", f"base {E} 40 {L}/m8-plate-pm-q10{tag}.{E}.json node m8/plate8.mjs 5403 pm-q10{tag}{eng} --label today --rungs today {extra} --shots {shots} --shotpages nav,pill >> {L}/pm-plate.log 2>&1"); n += 1
        item(n, f"plate-{E}-wash", f"prev {E} 20 {L}/m8-plate-pm-wash.{E}.json node m8/plate8.mjs 5401 pm-wash{eng} --pages wash --grounds field --schemes light,dark --rungs 1,0.7 --shots {shots} --shotpages wash >> {L}/pm-plate.log 2>&1"); n += 1
        item(n, f"plate-{E}-fission", f"prev {E} 25 {L}/m8-plate-pm-fission.{E}.json node m8/plate8.mjs 5401 pm-fission{eng} --pages fission --grounds daraksha --schemes dark,light --shots {shots} --shotpages fission >> {L}/pm-plate.log 2>&1"); n += 1
        item(n, f"plate-{E}-fission-match", f"prev {E} 25 {L}/m8-plate-pm-fission-match.{E}.json node m8/plate8.mjs 5401 pm-fission-match{eng} --label match --neck match --pages fission --grounds daraksha --schemes dark,light --shots {shots} --shotpages fission >> {L}/pm-plate.log 2>&1"); n += 1

def analyse(base):
    item(base, "analyse", f"none light 20 {L}/pm-gates8-webkit.txt for E in chromium webkit; do pm/analyse.sh $E pm pm >> {L}/pm-pass.log 2>&1; done; node m6/r30.mjs ../rows/pm-r30 > {L}/pm-r30.txt 2>&1")

def units(base):
    tests = ("tests/components/custom/dock tests/components/dock tests/components/dialog tests/components/sheet tests/components/select "
             "tests/components/custom/menu tests/components/popover.contract.test.ts tests/components/select.contract.test.ts "
             "tests/components/custom/scroll-progress-rim tests/components/ui/slider tests/components/a11y/native-title.test.ts "
             "tests/demo/sidebar-nav-landmark.a11y.test.ts tests/design/drive-tokens.test.ts tests/gates/overfit-structure.test.ts tests/styles")
    item(base, "units", f"none heavy 30 {L}/pm-units.log cd {T} && node_modules/.bin/vitest run {tests} --maxWorkers=2 > {H}/{L}/pm-units.log 2>&1; echo rc=$? >> {H}/{L}/pm-units.log")
    item(base + 1, "typecheck", f"none heavy 20 {L}/pm-typecheck.log cd {T} && {{ node_modules/.bin/vue-tsc --noEmit -p tsconfig.src.json; echo src rc=$?; node_modules/.bin/vue-tsc --noEmit -p tsconfig.test.json; echo test rc=$?; }} > {H}/{L}/pm-typecheck.log 2>&1")
    item(base + 2, "h3unit", f"none raw 30 {L}/pm-h3-unit.txt pm/h3unit.sh")
    item(base + 3, "rmclock", f"plant raw 20 {L}/pm-plant-g14-rmclock.txt pm/plantrun.sh g14-rmclock")

def g16(base):
    item(base, "g16-cand", f"none raw 30 {L}/pm-g16-pm-cand.json pm/g16fix.sh HEAD {T} pm-cand > {L}/pm-g16-run.log 2>&1")
    item(base + 1, "g16-unused", f"none raw 30 {L}/pm-g16-pm-unused.json pm/g16fix.sh HEAD {T} pm-unused unused >> {L}/pm-g16-run.log 2>&1")
    item(base + 2, "g16-used", f"none raw 30 {L}/pm-g16-pm-used.json pm/g16fix.sh HEAD {T} pm-used used >> {L}/pm-g16-run.log 2>&1")

def budget(base):
    item(base, "names", f"none light 5 {L}/pm-names.txt node m7/names.mjs v11.1.0 HEAD > {L}/pm-names.txt 2>&1")
    item(base + 1, "lines", f"none light 5 {L}/pm-lines.txt {{ node s8/codelines.mjs v11.1.0 HEAD; m7/lines.sh v11.0.2 v11.1.0 HEAD; }} > {L}/pm-lines.txt 2>&1")
    item(base + 2, "appgrep", f"none light 10 {L}/pm-appgrep.txt node pm/appgrep.mjs > {L}/pm-appgrep.out 2>&1")

def pack(base):
    item(base, "pack", f"none heavy 25 {W}/.cache/glass-ui-11.2.0-dock8.tgz mkdir -p {W}/.cache && cd {T} && rm -rf dist && npm pack --pack-destination {W}/.cache > {H}/{L}/pm-pack.log 2>&1 && mv {W}/.cache/mkbabb-glass-ui-*.tgz {W}/.cache/glass-ui-11.2.0-dock8.tgz && rm -rf {T}/dist && ls -l {W}/.cache/glass-ui-11.2.0-dock8.tgz >> {H}/{L}/pm-pack.log && shasum -a 256 {W}/.cache/glass-ui-11.2.0-dock8.tgz >> {H}/{L}/pm-pack.log")

SPECS = ["release-10-1-1", "release-10-1-2", "release-10-1-3", "release-10-1-4", "release-10-1-5", "release-11-0-1", "release-11-0-2", "ro-loop"]
def g14(base, tag, tree, ref, port):
    n = base
    item(n, f"g14-{tag}-tree", f"none light 15 - {H}/s8/tree8.sh {ref} {tree}"); n += 1
    for s in SPECS:
        log = f"{L}/pm-g14-{tag}-chromium-{s}.log"
        item(n, f"g14-{tag}-chromium-{s}", f"none heavy 80 {log}.done cd {tree} && GLASS_UI_DEMO_PORT={port} npx playwright test -c tests-visual/playwright.config.ts {s}.spec.ts --project=chromium-headless-new --project=coarse-touch --workers=1 --reporter=list > {H}/{log} 2>&1; echo rc=$? >> {H}/{log}; grep -q ' passed\\| failed\\| flaky' {H}/{log} && echo read > {H}/{log}.done"); n += 1
    for s in SPECS:
        cfg = {"release-10-1-1": "webkit-2287", "release-10-1-2": "webkit-2287", "release-11-0-2": "release-11-0-2", "ro-loop": "ro-loop"}.get(s, "release-11-0-1")
        env = "RO_LOOP_WEBKIT=1 " if s == "ro-loop" else ""
        log = f"{L}/pm-g14-{tag}-webkit-{s}.log"
        item(n, f"g14-{tag}-webkit-{s}", f"none webkit 60 {log}.done cd {tree} && {env}GLASS_UI_DEMO_PORT={port} npx playwright test -c tests-visual/{cfg}.config.ts {s}.spec.ts --project=webkit --workers=1 --reporter=list > {H}/{log} 2>&1; echo rc=$? >> {H}/{log}; grep -q ' passed\\| failed\\| flaky' {H}/{log} && echo read > {H}/{log}.done"); n += 1
    if tag == "master":
        item(n, f"g14-{tag}-runmark", f"none heavy 10 {L}/pm-g14-master-runmark.log cd {tree} && node_modules/.bin/vitest run tests/components/custom/dock/GlassDock.run-mark.test.ts --maxWorkers=2 > {H}/{L}/pm-g14-master-runmark.log 2>&1; echo rc=$? >> {H}/{L}/pm-g14-master-runmark.log")

PLANTS = ["g1-linger", "g1-lift", "g2-clock", "g2-curve", "g2-touch", "g2-rim", "g2-held", "g2-lane", "g2-fitwhole", "g2-whole-never",
          "g2-whole-length", "g2-room", "g2-laneinset", "g2-nocut", "g2-facehalf", "g3-retarget", "g4-join", "g4-snap2", "g4-scroll",
          "g4-ghost", "g4-openseat", "g4-groupframe", "g6-flow", "g6-overflow", "g7-provide", "g8-hold", "g8-exempt", "g8-trigger",
          "touchcure", "g9-scope", "g10-rm", "g11-rest", "g12-scale", "g13-box", "g13-safe", "g13-tabsvg", "g13-trigseat", "iconword",
          "facerule", "g14-fitmemory", "g14-fitsibs", "g15-baked", "g15-onestep", "dark", "fold", "mark"]
def plants(base):
    for k, p in enumerate(PLANTS):
        item(base + k, f"plant-{p}", f"plant raw 60 {L}/pm-plant-{p}.txt pm/plantrun.sh {p}")

def g14plants(base):
    for k, g in enumerate(["corner", "clock", "lane", "reserve", "touch", "press", "cap", "fits", "zoom"]):
        item(base + k, f"g14plant-{g}", f"none raw 90 {L}/pm-g14plant-{g}.log pm/g14plantrun.sh {g}")

for ph in sys.argv[1:]:
    {"build": build, "probes-chromium": lambda: probes("chromium", 1000), "side-chromium": lambda: side("chromium", 2000),
     "probes-webkit": lambda: probes("webkit", 3000), "side-webkit": lambda: side("webkit", 4000), "plate": lambda: plate(4500),
     "analyse": lambda: analyse(5000), "units": lambda: units(5100), "g16": lambda: g16(5200), "budget": lambda: budget(5300),
     "pack": lambda: pack(5400), "g14-tip": lambda: g14(6000, "tip", T, "HEAD", 5431), "g14-master": lambda: g14(6500, "master", M, "aeb6f3ee7", 5432),
     "plants": lambda: plants(7000), "g14plants": lambda: g14plants(7500)}[ph]()
print(len([f for f in os.listdir(SP) if f.endswith(".item")]), "items in the spool")
