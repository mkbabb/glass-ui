#!/usr/bin/env bash
# MS4-run.sh · D3 pass 6, the minor split v4 (REGISTRY P5-6.2 step 3): every command this seat ran, by phase.
# minor v4 = pass-5/minor-split-v3.patch + FL-14 in source (`isolation: isolate` in `@utility glass-plate`) + R-12 (the
# demo dock search highlights on pointer movement; floor-v5-R12.diff's hunk) + R-13 (the light law stated in the nine
# earned-darken sentences, plus the one in dock/styles/search.css:44), written whole as pass-6/minor-split-v4.patch.
# One worktree (.claude/worktrees/bl/D3/p6/minor4/wt); minor v4 is applied by default, and a phase that needs the minor v3
# or HEAD swaps the patch and swaps it back, each swap checked with cmp. Builds, captures and caches live in $W/.d3out and
# $W/.cache-m4. Records land in pass-6/MS4-records/.
# Every phase is launched from outside under the machine guard:
#   ~/.claude/guard/guarded --light --timeout 20 -- bash MS4-run.sh static
#   ~/.claude/guard/guarded --timeout 90 -- bash MS4-run.sh <chromium phase>
#   ~/.claude/guard/guarded --timeout 90 --exclusive webkit -- bash MS4-run.sh wk-inner      (every Playwright WebKit run)
# Phases: static build battery-cr refs-cr demo-cr glance-cr wk-inner witnesses baseline verbose g67 readings rerun-cr
#         toolchain ratchet roster teardown
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p6/minor4
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P3=$M/pass-3
P4=$M/pass-4
P5=$M/pass-5
P6=$M/pass-6
V5=$P5/MS3-variants
V6=$P6/MS4-variants
REC=$P6/MS4-records
MS3=$P5/minor-split-v3.patch
MS4=$P6/minor-split-v4.patch
export D3_OUT=$W/.d3out
mkdir -p "$REC/verbose"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
to_ms3() { is "$MS4" >/dev/null && git -C "$W" apply -R "$MS4" && git -C "$W" apply "$MS3"; is "$MS3" || exit 3; }
from_ms3() { is "$MS3" >/dev/null && git -C "$W" apply -R "$MS3" && git -C "$W" apply "$MS4"; is "$MS4" || exit 3; }
to_head() { is "$MS4" >/dev/null && git -C "$W" apply -R "$MS4"; test -z "$(git -C "$W" status --porcelain -- src demo tests)" && echo "worktree = HEAD" || exit 3; }
from_head() { git -C "$W" apply "$MS4"; is "$MS4" || exit 3; }
radii() { grep -E -- '--glass-blur-(wash|quiet|resting|floating|overlay)-radius:' "$W/src/styles/tokens/glass.css" | sed 's/^ *//'; }
# R-13's plant: the old wording of the nine sentences (and search.css:44's), as minor v3 prints them.
R13='earned-darken clamp|earned darken|whole dynamic darken|darkens toward the ink in BOTH modes|darkened by whatever'
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
static)
  is "$MS4" || exit 3
  { node "$H/launch-law.mjs"; echo "LAW exit $?"
    node "$P4/lighting-census.mjs" "$W" > "$REC/census-minor4.log" 2>&1; echo "census minor4 exit $?: $(tail -1 "$REC/census-minor4.log")"
    t=$W/.ms4-v1010; rm -rf "$t"; mkdir -p "$t"; git -C "$R" archive v10.1.0 src/styles | tar -x -C "$t"
    node "$P4/lighting-census.mjs" "$t" > "$REC/census-v1010.log" 2>&1; echo "census v10.1.0 exit $?: $(tail -1 "$REC/census-v1010.log")"; rm -rf "$t"
    grep -qx 'LIGHTING-CENSUS stacked=2 halo=2 blur=5 open=9' "$REC/census-v1010.log" && echo "W-0.11 G4 bite: exact line"
    node "$H/lighting-literals.mjs" --root "$W" > "$REC/LIT-static-minor4.log" 2>&1; echo "LIT exit $?: $(grep -o 'LIGHTING-LITERALS.*' "$REC/LIT-static-minor4.log" | tail -1)"
    node "$H/hover-fill-selected.mjs" --root "$W" > "$REC/HOV-minor4.log" 2>&1; echo "HOV exit $?: $(tail -1 "$REC/HOV-minor4.log")"
    radii > "$REC/radii-minor4.txt"
    echo "-- R-11 LADDER: diff radii-minor4 FV5-records/radii-fv5.txt (fixture: prints nothing)"; diff "$REC/radii-minor4.txt" "$P6/FV5-records/radii-fv5.txt"; echo "LADDER minor4 exit $?"
    echo "-- R-11 LADDER plant: diff radii-minor4 FV5-records/radii-fv4.txt"; diff "$REC/radii-minor4.txt" "$P6/FV5-records/radii-fv4.txt"; echo "LADDER fv4 exit $?"
    echo "-- R-13 grep minor v4 (fixture: 0 lines)"; grep -rnE "$R13" "$W/src" "$W/demo" | sed "s#$W/##"; echo "(R-13 minor4 lines: $(grep -rnE "$R13" "$W/src" "$W/demo" | wc -l | tr -d ' '))"
    echo "-- FL-14 static: @utility glass-plate declares isolation (minor4)"; sed -n '/^@utility glass-plate/,/^}/p' "$W/src/styles/glass/veil.css" | grep -n "isolation"
    to_ms3
    echo "-- R-13 grep minor v3 (planted FAIL: the old sentences)"; grep -rnE "$R13" "$W/src" "$W/demo" | sed "s#$W/##"; echo "(R-13 minor3 lines: $(grep -rnE "$R13" "$W/src" "$W/demo" | wc -l | tr -d ' '))"
    echo "-- FL-14 static on minor v3 (plant: no isolation)"; sed -n '/^@utility glass-plate/,/^}/p' "$W/src/styles/glass/veil.css" | grep -c "isolation"
    node "$H/hover-fill-selected.mjs" --root "$W" > "$REC/HOV-minor3.log" 2>&1; echo "HOV minor3 exit $?: $(tail -1 "$REC/HOV-minor3.log")"
    from_ms3
  } 2>&1 | tee "$REC/static.log"
  ;;
build)
  # minor v4 (specimens + demo); minor v3 (demo for R-12's plant); HEAD (specimens + demo: G7's head cells, the glance base).
  is "$MS4" || exit 3
  node "$H/build.mjs" "$W" --label minor4 --demo 2>&1 | tail -2; echo "minor4 built $(ts)"
  to_ms3; node "$H/build.mjs" "$W" --label minor3 --demo 2>&1 | tail -2; echo "minor3 built $(ts)"; from_ms3
  to_head; node "$H/build.mjs" "$W" --label head --demo 2>&1 | tail -2; echo "head built $(ts)"; from_head
  for l in head minor3 minor4; do echo "$l specimen css bytes: $(cat "$D3_OUT"/builds/$l/dist/assets/*.css 2>/dev/null | wc -c | tr -d ' ')"; done
  ;;
battery-cr)
  is "$MS4" || exit 3
  node "$H/run.mjs" "$W" --label minor4 --skip-build --engines chromium > "$REC/minor4-run-chromium.log" 2>&1; echo "exit $? $(ts)"; tail -4 "$REC/minor4-run-chromium.log"
  ;;
refs-cr|refs-wk)
  # The paired captures, one engine: HEAD's cells (G7 under H6), the W-0.1 tree (W-0.11 G6's reference: W-0.11's values
  # backed out of minor v4, both modes), R-9 (dark only; Chromium), and FL-14 taken out (its before/after, both themes).
  if [ $phase = refs-cr ]; then e=chromium; else e=webkit; fi
  node "$H/capture.mjs" "$D3_OUT/builds/head/dist" --out "$D3_OUT/caps/head" --engines $e --themes light,dark \
    --scenes ladder,dialog,held,hostile,claim,o66field,o66menu,halo,state > "$REC/head-cells-$e.log" 2>&1; echo "head cells $e exit $? $(ts)"
  node "$H/capture.mjs" "$D3_OUT/builds/minor4/dist" --out "$D3_OUT/caps/s-w01ref" --engines $e --themes light,dark \
    --scenes ladder,dialog,held,hostile --inject "$V5/w01ref.css" > "$REC/w01ref-capture-$e.log" 2>&1; echo "w01ref $e exit $? $(ts)"
  node "$H/capture.mjs" "$D3_OUT/builds/minor4/dist" --out "$D3_OUT/caps/nofl14" --engines $e --themes light,dark \
    --scenes ladder,dialog,held,hostile,halo,state --inject "$V6/nofl14.css" > "$REC/nofl14-capture-$e.log" 2>&1; echo "nofl14 $e exit $? $(ts)"
  if [ $e = chromium ]; then
    node "$H/capture.mjs" "$D3_OUT/builds/minor4/dist" --out "$D3_OUT/caps/minor4-r9" --engines chromium --themes dark \
      --scenes ladder,dialog,held,hostile --inject "$V5/r9-dark-head-w011.css" > "$REC/r9-capture-chromium.log" 2>&1; echo "r9 exit $? $(ts)"
  fi
  ;;
demo-cr)
  # R-12's probe (pass-6/FV5-demo-probe.mjs) on minor v4 (fixture) and minor v3 (the plant: its hover leg), one frame each.
  for l in minor4 minor3; do node "$P6/FV5-demo-probe.mjs" "$D3_OUT/builds/$l/demo" --label $l --engines chromium --shots "$P6/glance-minor4/probe" --out "$REC/demo-$l-chromium.json" > "$REC/demo-$l-chromium.log" 2>&1; echo "demo-probe $l chromium exit $? $(ts)"; grep -E '^DEMO' "$REC/demo-$l-chromium.log"; done 2>&1 | tee "$REC/demo-cr.log"
  ;;
glance-cr|glance-wk)
  if [ $phase = glance-cr ]; then e=chromium; else e=webkit; fi
  node "$H/glance.mjs" --base "$D3_OUT/builds/head/dist" --route "$D3_OUT/builds/minor4/dist" --story-base "$D3_OUT/builds/head/demo" \
    --story-route "$D3_OUT/builds/minor4/demo" --out "$P6/glance-minor4" --name minor4 --require-delta --engine $e > "$REC/glance-$e.log" 2>&1
  echo "glance head->minor4 $e exit $? $(ts) · $(tail -1 "$REC/glance-$e.log")"
  if [ $e = chromium ]; then for t in light dark; do
    node "$P5/FV4-glance-pair.mjs" "$P6/glance-minor4/probe/fv5probe-chromium-$t-dock-search-pointer-row1-minor3.png" "$P6/glance-minor4/probe/fv5probe-chromium-$t-dock-search-pointer-row1-minor4.png" "$P6/glance-minor4/glance-chromium-$t-dock-search-pointer-minor3-vs-minor4.png"; done 2>&1 | tee -a "$REC/glance-$e.log"; fi
  (cd "$P6/glance-minor4" && shasum -a 256 *.png > SHA256.txt)
  ;;
wk-inner)
  # Every Playwright WebKit item under ONE `guarded --exclusive webkit` admission: the battery's WebKit half, the paired
  # captures, FL-14's plant (plant-noisolation; FV2-plants takes both engines, so it runs only here), the glance, the
  # island if FL-14 moved a dark composite (MS4_ISLAND=1), and the WebKit re-runs.
  echo "admitted $(ts)"
  # One heavy run per seat: the Chromium chain (cr-chain) holds $B/cr-busy while it runs; wait it out.
  while [ -e "$B/cr-busy" ]; do sleep 15; done; echo "clear of Chromium phases $(ts)"
  is "$MS4" || exit 3
  node "$H/run.mjs" "$W" --label minor4 --skip-build --engines webkit > "$REC/minor4-run-webkit.log" 2>&1; echo "battery-wk exit $? $(ts)"; tail -3 "$REC/minor4-run-webkit.log"
  bash "$0" refs-wk
  node "$P3/FV2-plants.mjs" "$D3_OUT/builds/minor4/dist" "$W" --out "$D3_OUT/flplants" --only plant-noisolation > "$REC/plant-noisolation.log" 2>&1; echo "plant-noisolation exit $? $(ts)"
  bash "$0" glance-wk
  if [ -n "${MS4_ISLAND:-}" ]; then for l in head minor4; do node "$P4/MS2-island.mjs" "$D3_OUT/builds/$l/dist" --label $l --engines chromium,webkit --out "$REC/island-$l.json" > "$REC/island-$l.log" 2>&1; echo "island $l exit $? $(ts)"; done; fi
  echo "done $(ts)"
  ;;
witnesses)
  is "$MS4" || exit 3
  node "$H/run.mjs" "$W" --label minor4 --skip-build --skip-capture > "$REC/minor4-witnesses.log" 2>&1; tail -30 "$REC/minor4-witnesses.log"
  mkdir -p "$REC/minor4-results"; cp "$D3_OUT"/caps/minor4/results/*.log "$REC/minor4-results/"
  ;;
baseline)
  node "$H/baseline.mjs" "$D3_OUT/caps/minor4" --out "$REC/baseline-minor4.json" > "$REC/baseline-minor4.md"; cat "$REC/baseline-minor4.md"
  ;;
verbose)
  G=${MS4_GATE:-chromium,webkit}
  for l in head minor4 nofl14 s-w01ref; do
    for w in m2-text-contrast:m2 m3-non-text:m3 m6-separable-ladder:m6 m1-no-grey:m1 o66-field-row:o66 m2-held-window:m2h m1x-off-paper:m1x wa-no-signal:wa stack-host:stack; do
      node "$H/${w%%:*}.mjs" "$D3_OUT/caps/$l" --gate $G --verbose > "$REC/verbose/${w##*:}-$l.txt" 2>&1
    done
    echo "$l: m1 $(tail -1 "$REC/verbose/m1-$l.txt") | m2 $(tail -1 "$REC/verbose/m2-$l.txt") | m3 $(tail -1 "$REC/verbose/m3-$l.txt") | stack $(tail -1 "$REC/verbose/stack-$l.txt")"
  done
  for w in m2-text-contrast:m2 m6-separable-ladder:m6; do node "$H/${w%%:*}.mjs" "$D3_OUT/caps/minor4-r9" --gate chromium --verbose > "$REC/verbose/${w##*:}-minor4-r9.txt" 2>&1; done
  ;;
g67)
  # G7 (HEAD → minor v4, M-2 and M-3), G6 raw and per R-9 (dark composites against HEAD), W-0.11 G6 (W-0.1 tree → minor
  # v4), FL-14's dark move (nofl14 → minor4, dark composites) and its G7 (HEAD → nofl14, for the before column).
  g() { node "$P3/MS-g7.mjs" "$1" "$REC/verbose/$2" "$REC/verbose/$3" > "$REC/$4"; echo "$4: $(tail -1 "$REC/$4")"; }
  g m2 m2-head.txt m2-minor4.txt g7-m2.txt
  g m3 m3-head.txt m3-minor4.txt g7-m3.txt
  g dark m6-head.txt m6-minor4.txt g6-dark-m6-raw.txt
  g dark m6-head.txt m6-minor4-r9.txt g6-dark-m6-r9.txt
  g m2 m2-s-w01ref.txt m2-minor4.txt w011g6-m2.txt
  g m3 m3-s-w01ref.txt m3-minor4.txt w011g6-m3.txt
  g dark m6-nofl14.txt m6-minor4.txt fl14-dark-move.txt
  g m2 m2-nofl14.txt m2-minor4.txt fl14-m2-regress.txt
  g m3 m3-nofl14.txt m3-minor4.txt fl14-m3-regress.txt
  ;;
readings)
  for e in chromium webkit; do
    node "$H/m1x-off-paper.mjs" "$D3_OUT/caps/minor4" --gate $e > "$REC/M-1x-a-$e.log" 2>&1; echo "M-1x (a) $e: $(tail -1 "$REC/M-1x-a-$e.log")"
    node "$H/m1x-off-paper.mjs" "$D3_OUT/caps/minor4" --gate $e --q11 b > "$REC/M-1x-q11b-$e.log" 2>&1; echo "M-1x --q11 b $e: $(tail -1 "$REC/M-1x-q11b-$e.log")"
    node "$H/wa-no-signal.mjs" "$D3_OUT/caps/minor4" --gate $e --q11 b > "$REC/W-A-q11b-$e.log" 2>&1; echo "W-A --q11 b $e: $(tail -1 "$REC/W-A-q11b-$e.log")"
    for v in plant-noisolation; do for w in m2-text-contrast:M-2 stack-host:STACK m3-non-text:M-3; do
      node "$H/${w%%:*}.mjs" "$D3_OUT/flplants/$v" --gate $e --cells 'held$' > "$REC/$v-${w##*:}-$e.log" 2>&1; echo "$v ${w##*:} $e: $(tail -1 "$REC/$v-${w##*:}-$e.log")"; done; done
  done 2>&1 | tee "$REC/readings.log"
  ;;
rerun-cr|rerun-wk)
  if [ $phase = rerun-cr ]; then e=chromium; else e=webkit; fi
  for n in 1 2; do
    node "$H/capture.mjs" "$D3_OUT/builds/minor4/dist" --out "$D3_OUT/caps/rerun-$e$n" --engines $e --themes "${RERUN_THEMES:-light,dark}" --scenes "${RERUN_SCENES:-held,ladder,dialog}" --grounds "${RERUN_GROUNDS:-black,white,aurora,paper}" > "$REC/rerun-$e$n-capture.log" 2>&1
    for w in ${RERUN_WITNESSES:-m2-held-window m3-non-text m2-text-contrast stack-host}; do node "$H/$w.mjs" "$D3_OUT/caps/rerun-$e$n" --gate $e --verbose > "$REC/verbose/rerun-$e$n-$w.txt" 2>&1; echo "rerun $e $n $w $(ts): $(tail -1 "$REC/verbose/rerun-$e$n-$w.txt")"; done
  done 2>&1 | tee -a "$REC/rerun-$e.log"
  ;;
toolchain)
  is "$MS4" || exit 3
  cd "$W"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-m4/vite" };\n' > vite.m4.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-m4/vitest" };\n' > vitest.m4.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-m4/vite-demo" };\n' > vite.m4-demo.config.ts
  { npx vue-tsc --noEmit > "$REC/tsc-app.log" 2>&1; echo "typecheck app exit $? $(ts)"
    npx vite build --config vite.m4.config.ts > "$REC/libbuild.log" 2>&1; echo "library build exit $? $(ts)"
    npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test.log" 2>&1; echo "typecheck tests exit $? $(ts)"
    npx vite build --config vite.m4-demo.config.ts > "$REC/dist-demo.log" 2>&1; echo "dist-demo exit $? $(ts)"
    npx vitest run --config vitest.m4.config.ts --maxWorkers=2 --testTimeout 240000 > "$REC/units.log" 2>&1; echo "vitest exit $? $(ts)"
    grep -E "Test Files|Tests  |FAIL" "$REC/units.log" | head -20; } 2>&1 | tee "$REC/toolchain.log"
  ;;
ratchet)
  # G5's bundle ratchet on minor v4's library build, then on HEAD's; the worktree is restored to minor v4.
  cd "$W"; is "$MS4" || exit 3
  { npx vite build --config vite.m4.config.ts > /dev/null 2>&1; node scripts/verify-export-types.mjs > "$REC/verifier.log" 2>&1; echo "verifier (minor4) exit $? $(ts)"
    grep -E "RATCHET|terminal" "$REC/verifier.log" | head -4
    to_head; npx vite build --config vite.m4.config.ts > /dev/null 2>&1; node scripts/verify-export-types.mjs > "$REC/verifier-head.log" 2>&1; echo "verifier (HEAD) exit $? $(ts)"
    grep -E "RATCHET|terminal" "$REC/verifier-head.log" | head -4
    from_head; npx vite build --config vite.m4.config.ts > /dev/null 2>&1; echo "minor4 lib rebuilt $(ts)"; } 2>&1 | tee "$REC/ratchet.log"
  ;;
roster)
  # G5: the verifier with the datum rebound IN THE WORKTREE ONLY to minor v4's measured bytes, so its roster arm runs.
  cd "$W"; is "$MS4" || exit 3; n=$(grep -oE "forbidden: [0-9]+" "$REC/verifier.log" | grep -oE "[0-9]+" | head -1); echo "$n" > .bundle-ratchet
  { node scripts/verify-export-types.mjs > "$REC/verifier-rebound.log" 2>&1; echo "verifier (minor4, datum $n in the worktree) exit $? $(ts)"
    git show HEAD:.bundle-ratchet > .bundle-ratchet; grep -oE '"terminal":"[A-Z]+"|"roster":\{[^}]*\}|"claims":[0-9]+|"declarations":[0-9]+|"css":[0-9]+' "$REC/verifier-rebound.log" | head -6
    grep -E "terminal|PRESENT" "$REC/verifier-rebound.log" | head -4
    git -C "$R" diff --stat v10.1.0 HEAD -- .published-roster; git -C "$W" diff --stat HEAD -- .published-roster; echo "roster diff above (empty = none)"; } 2>&1 | tee "$REC/roster.log"
  ;;
cr-chain)
  # The Chromium phases in order, each under its own guarded admission, holding $B/cr-busy so wk-inner waits.
  touch "$B/cr-busy"; trap 'rm -f "$B/cr-busy"' EXIT
  for p in "$@"; do "$HOME/.claude/guard/guarded" --timeout 90 -- bash "$0" "$p" 2>&1 | tee -a "$REC/phase-$p.log" | tail -6; done
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; rm -rf "$B"; git -C "$R" worktree prune; ls "$R/.claude/worktrees/bl/D3/p6/"
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
