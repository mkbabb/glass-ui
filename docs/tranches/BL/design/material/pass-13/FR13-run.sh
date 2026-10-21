#!/usr/bin/env bash
# FR13-run.sh · D3 pass 13, FLOOR-V11 RE-MEASURE (REGISTRY P12-6.3 step 2): every command this seat ran, by phase. A clean
# pass is measured, never carried: floor v11 (pass-12/floor-v11.patch 8f838dcf) is re-applied, re-built, re-proved and
# re-batteried here on the base recorded at launch (P12-6.2 (a): HEAD of master, the 10.1.0 source; release/10.1.1 and
# release/10.1.2 NOT merged during pass 13). The phases are FV11-run.sh's static half, BV11-run.sh's battery half and
# crit-run.sh's thin light-proof capture, re-pointed at pass 13, plus H13's readings (R-38 via --r32, R-37's line, the
# tone plant through FV3-plants.mjs, FIELD with the multi-hue cell).
# One worktree (.claude/worktrees/bl/D3/p13/floor11m/wt) cut at HEAD, node_modules symlinked; floor v11 applied by
# default; floor v11a and HEAD reached by cmp-checked swaps. Builds, captures and caches live in $W/.d3out and
# $W/.cache-fr13. Records land in pass-13/FR13-records/.
# Launch law (machine law + P12-6.3): every phase is `~/.claude/guard/guarded ... -- bash FR13-run.sh <phase>`:
#   --light                          setup, declare, static, sweep, plant, witnesses, readings, field, plants-read, teardown
#   --timeout 60 (heavy)             same (builds), toolchain (vitest's slider test launches its own headless shell),
#                                    battery-cr, thin-cr, plants-cr, demo-cr, rerun-cr (headless shell, no launch args)
#   --exclusive webkit --timeout 60  wk-battery, thin-wk, plants-wk, rerun-wk (each WebKit capture group its own admission)
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p13/floor11m
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P12=$M/pass-12
P13=$M/pass-13
REC=$P13/FR13-records
FV11A=$P12/floor-v11a.patch
FV11=$P12/floor-v11.patch
R32=$P12/FV11-r32.diff
EXACT=$M/pass-9/H9-exact-floor.json
D11=$P12/FV11-records/declare-floor-v11.json
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
clean() { test -z "$(git -C "$W" status --porcelain -- src demo tests docs/canon DESIGN.md)"; }
swap() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && clean && git -C "$W" apply "$2" 2>/dev/null; is "$2" || exit 3; }
to_head() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && clean && echo "worktree = HEAD" || exit 3; }
from_head() { clean && git -C "$W" apply "$1" 2>/dev/null; is "$1" || exit 3; }
radii() { grep -E -- '--glass-blur-(wash|quiet|resting|floating|overlay)-radius:' "$W/src/styles/tokens/glass.css" | sed 's/^ *//'; }
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
setup)
  mkdir -p "$B"; git -C "$R" worktree add --detach "$W" HEAD && ln -s "$R/node_modules" "$W/node_modules"
  { echo "worktree HEAD $(git -C "$W" rev-parse --short=9 HEAD) (master at launch; release/10.1.1, release/10.1.2 not merged, P12-6.2 (a))"
    echo "10.1.0 source diff 1da7eb17b..HEAD -- src demo tests package.json (empty = base (a)): [$(git -C "$W" diff --stat 1da7eb17b HEAD -- src demo tests package.json | tail -1)]"
    echo "wider list (+ scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon): [$(git -C "$W" diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon | tail -1)]"
    for p in "$FV11A" "$FV11"; do git -C "$W" apply --check "$p"; echo "git apply --check $(basename "$p") at HEAD: exit $? sha1 $(shasum "$p" | cut -c1-8) files $(grep -c '^diff --git' "$p")"; done
    from_head "$FV11A" && git -C "$W" apply --check "$R32" && git -C "$W" apply "$R32" && git -C "$W" diff HEAD --binary | cmp - "$FV11" && echo "floor-v11a.patch + FV11-r32.diff = floor-v11.patch (cmp exit 0)"
    is "$FV11" || exit 3
  } 2>&1 | tee "$REC/setup.log"
  ;;
declare)
  # H8-2's declaration rebuilt from floor-v11.patch on floor v11, compared with pass 12's banked declaration.
  is "$FV11" || exit 3
  cd "$H"
  node declare-removed.mjs --patch "$FV11" --root "$W" --concepts deletes-floor.json --exact "$EXACT" --out "$REC/declare-floor-v11.json" 2>&1 | tee "$REC/declare-floor-v11.log"
  python3 -I -c 'import json,sys; a=json.load(open(sys.argv[1])); c=json.load(open(sys.argv[2])); print("declaration rebuilt vs pass-12 FV11-records/declare-floor-v11.json:", "IDENTICAL" if a==c else "DIFFER: "+",".join(k for k in sorted(set(a)|set(c)) if a.get(k)!=c.get(k)))' "$REC/declare-floor-v11.json" "$D11" | tee -a "$REC/declare-floor-v11.log"
  ;;
static)
  # DEL (floor v11; floor v11a under floor v11's declaration; absent root; HEAD bite), LAW, HOV, LIT, the census (fv11,
  # fv11a, HEAD bite), the ladder diff (fv11a -> fv11 empty; HEAD -> fv11 the bite).
  is "$FV11" || exit 3
  cd "$H"; mkdir -p "$B/absent"
  { node deleted-mechanisms.mjs --root "$W" --declare "$REC/declare-floor-v11.json" --patch "$FV11" > "$REC/del-fv11.log" 2>&1; echo "DEL fv11 exit $?: $(tail -1 "$REC/del-fv11.log")"
    node deleted-mechanisms.mjs --root "$B/absent" --declare "$REC/declare-floor-v11.json" --patch "$FV11" > "$REC/del-absent.log" 2>&1; echo "DEL absent exit $?: $(tail -1 "$REC/del-absent.log")"
    node launch-law.mjs > "$REC/law.log" 2>&1; echo "LAW exit $?: $(tail -1 "$REC/law.log")"
    node hover-fill-selected.mjs --root "$W" > "$REC/HOV-fv11.log" 2>&1; echo "HOV exit $?: $(tail -1 "$REC/HOV-fv11.log")"
    node lighting-literals.mjs --root "$W" > "$REC/LIT-static-fv11.log" 2>&1; echo "LIT exit $?: $(grep -o 'LIGHTING-LITERALS.*' "$REC/LIT-static-fv11.log" | tail -1)"
    node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-fv11.log" 2>&1; echo "census fv11 exit $?: $(tail -1 "$REC/census-fv11.log")"
    radii > "$REC/radii-fv11.txt"
    swap "$FV11" "$FV11A"
    node deleted-mechanisms.mjs --root "$W" --declare "$REC/declare-floor-v11.json" --patch "$FV11" > "$REC/del-fv11a-under-fv11.log" 2>&1; echo "DEL fv11a under the floor v11 declaration exit $?: $(tail -1 "$REC/del-fv11a-under-fv11.log")"
    node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-fv11a.log" 2>&1; echo "census fv11a exit $?: $(tail -1 "$REC/census-fv11a.log")"
    radii > "$REC/radii-fv11a.txt"
    to_head "$FV11A"; radii > "$REC/radii-head.txt"
    node "$M/pass-4/lighting-census.mjs" "$W" > "$REC/census-head.log" 2>&1; echo "census HEAD (10.1.0 source, bite) exit $?: $(tail -1 "$REC/census-head.log")"
    node deleted-mechanisms.mjs --root "$W" --declare "$REC/declare-floor-v11.json" --patch "$FV11" > "$REC/del-head.log" 2>&1; echo "DEL HEAD (bite) exit $?: $(tail -1 "$REC/del-head.log")"
    from_head "$FV11"
    echo "-- LADDER diff radii-fv11a radii-fv11 (prints nothing: the arm moves no radius)"; diff "$REC/radii-fv11a.txt" "$REC/radii-fv11.txt"; echo "LADDER fv11a-fv11 exit $?"
    echo "-- LADDER diff radii-head radii-fv11 (bite)"; diff "$REC/radii-head.txt" "$REC/radii-fv11.txt"; echo "LADDER head exit $?"
  } 2>&1 | tee "$REC/static.log"
  ;;
sweep)
  # R-21 (b) under R-34: floor v11 under FV11-rulings.json (PASS 207 expected); its plant, floor v11a under the same file.
  is "$FV11" || exit 3
  cd "$H"
  sw() { node prose-sweep.mjs --root "$W" --patch "$FV11" --declare "$REC/declare-floor-v11.json" --rulings "$P12/FV11-rulings.json" > "$REC/sweep-$1.log" 2>&1; echo "SWEEP $1 exit $?: $(tail -1 "$REC/sweep-$1.log")"; }
  { sw fv11-ruled; swap "$FV11" "$FV11A"; sw fv11a-plant; swap "$FV11A" "$FV11"; } 2>&1 | tee "$REC/sweep.log"
  ;;
same)
  # Raw identity in one session: floor v11 (with dist-demo, the battery's build) and floor v11a, specimen CSS hashed
  # against the banks (4f56c2631ab5cdd4, 347288745da7cf97); floor v11 rebuilt (determinism); the light-token proof.
  is "$FV11" || exit 3
  O=$D3_OUT/builds
  { node "$H/build.mjs" "$W" --label fv11 --demo 2>&1 | tail -1; echo "fv11 built $(ts)"
    swap "$FV11" "$FV11A"; node "$H/build.mjs" "$W" --label fv11a 2>&1 | tail -1; echo "fv11a built $(ts)"
    swap "$FV11A" "$FV11"; node "$H/build.mjs" "$W" --label fv11b 2>&1 | tail -1; echo "fv11b (floor v11 again) built $(ts)"
    for l in fv11 fv11a fv11b; do for c in "$O/$l/dist"/assets/*.css; do echo "$l specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done; done
    diff -rq -x build.json "$O/fv11/dist" "$O/fv11b/dist" > /dev/null; echo "dist fv11 vs fv11 rebuilt: diff -rq exit $?"
    echo "fv11 dist-demo files: $(find "$O/fv11/demo" -type f ! -name build.json | wc -l | tr -d ' ')"
    mkdir -p "$REC/css"; cp "$O/fv11a/dist"/assets/*.css "$REC/css/fv11a.css"; cp "$O/fv11/dist"/assets/*.css "$REC/css/fv11.css"
    python3 -I "$P12/FV11-lightproof.py" "$REC/css/fv11a.css" "$REC/css/fv11.css" > "$REC/lightproof.log" 2>&1; echo "LIGHTPROOF exit $?: $(tail -1 "$REC/lightproof.log")"
  } 2>&1 | tee "$REC/same.log"
  ;;
toolchain)
  # Floor v11: typecheck, library build, test typecheck, dist-demo (built before vitest), vitest --maxWorkers=2.
  is "$FV11" || exit 3
  cd "$W"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-fr13/vite" };\n' > vite.fr13.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-fr13/vitest" };\n' > vitest.fr13.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-fr13/vite-demo" };\n' > vite.fr13demo.config.ts
  { npx vue-tsc --noEmit > "$REC/tsc-app.log" 2>&1; echo "typecheck app exit $? $(ts)"
    npx vite build --config vite.fr13.config.ts > "$REC/libbuild.log" 2>&1; echo "library build exit $? $(ts)"
    npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test.log" 2>&1; echo "typecheck tests exit $? $(ts)"
    npx vite build --config vite.fr13demo.config.ts > "$REC/demobuild.log" 2>&1; echo "dist-demo exit $? $(ts)"
    npx vitest run --config vitest.fr13.config.ts --maxWorkers=2 > "$REC/units.log" 2>&1; echo "vitest exit $? $(ts)"
    grep -E "Test Files|Tests  " "$REC/units.log"
    npx vitest run --config vitest.fr13.config.ts --maxWorkers=2 tests/styles/focus-veil.test.ts > "$REC/units-focus-veil.log" 2>&1; echo "vitest focus-veil.test.ts exit $? $(ts)"; grep -E "Test Files|Tests  " "$REC/units-focus-veil.log"
  } 2>&1 | tee "$REC/toolchain.log"
  rm -f vite.fr13.config.ts vitest.fr13.config.ts vite.fr13demo.config.ts
  git -C "$W" status --porcelain | grep -v '^?? \.\(d3out\|cache-fr13\)' | head
  ;;
plant)
  # The arm's unit bites: floor v11's focus-veil.test.ts on floor v11a's bytes (R-2) must FAIL the arm's assertions only.
  is "$FV11" || exit 3; cd "$W"
  cp tests/styles/focus-veil.test.ts "$B/focus-veil.test.v11.ts"; swap "$FV11" "$FV11A"
  cp tests/styles/focus-veil.test.ts "$B/focus-veil.test.v11a.ts"; cp "$B/focus-veil.test.v11.ts" tests/styles/focus-veil.test.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-fr13/vitest" };\n' > vitest.fr13.config.ts
  { npx vitest run --config vitest.fr13.config.ts --maxWorkers=2 tests/styles/focus-veil.test.ts > "$REC/plant-focus-veil-on-fv11a.log" 2>&1; echo "plant: floor v11's focus-veil.test.ts on floor v11a exit $? $(ts)"
    grep -E "Test Files|Tests  |✗|×|FAIL" "$REC/plant-focus-veil-on-fv11a.log" | head -8; } 2>&1 | tee "$REC/plant.log"
  rm -f vitest.fr13.config.ts; cp "$B/focus-veil.test.v11a.ts" tests/styles/focus-veil.test.ts; swap "$FV11A" "$FV11" | tee -a "$REC/plant.log"
  ;;
battery-cr)
  # The Chromium half of run.mjs: every cell, live, motion, drift, retunes, noclaim; the headless shell with no arguments.
  is "$FV11" || exit 3
  echo "start $(ts)" > "$REC/battery-cr.time"
  node "$H/run.mjs" "$W" --label fv11 --skip-build --engines chromium > "$REC/fv11-run-chromium.log" 2>&1; echo "battery-cr exit $? $(ts)" | tee -a "$REC/battery-cr.time"
  tail -28 "$REC/fv11-run-chromium.log"
  ;;
wk-battery)
  echo "admitted $(ts)" | tee -a "$REC/wk-admission.log"
  is "$FV11" || exit 3
  node "$H/run.mjs" "$W" --label fv11 --skip-build --engines webkit > "$REC/fv11-run-webkit.log" 2>&1; echo "wk-battery exit $? $(ts)" | tee -a "$REC/wk-admission.log"
  grep -E "retired|relaunch" "$REC/fv11-run-webkit.log" | head -5 | tee -a "$REC/wk-admission.log"
  ;;
witnesses)
  # Every witness over both engines' captures (no browser), verbose rows, the baseline, and its diff against pass 12's.
  is "$FV11" || exit 3
  node "$H/run.mjs" "$W" --label fv11 --skip-build --skip-capture > "$REC/fv11-witnesses.log" 2>&1; tail -30 "$REC/fv11-witnesses.log"
  mkdir -p "$REC/fv11-results" "$REC/verbose"; cp "$D3_OUT"/caps/fv11/results/*.log "$REC/fv11-results/"
  for w in m2-text-contrast:m2 m3-non-text:m3 m2-held-window:m2h m8-chrome-calm:m8 t-transmission:t m6-separable-ladder:m6 m9-state-registers:m9; do
    node "$H/${w%%:*}.mjs" "$D3_OUT/caps/fv11" --gate chromium,webkit --verbose > "$REC/verbose/${w##*:}-fv11.txt" 2>&1; done
  node "$H/baseline.mjs" "$D3_OUT/caps/fv11" --out "$REC/baseline-fv11.json" > "$REC/baseline-fv11.md"
  diff "$P12/BV11-records/baseline-fv11.md" "$REC/baseline-fv11.md" > "$REC/baseline-diff-bv11-fr13.txt"; echo "baseline diff BV11 FR13 exit $? ($(wc -l < "$REC/baseline-diff-bv11-fr13.txt" | tr -d ' ') lines)"
  diff "$M/pass-7/FV6-records/baseline-fv6.md" "$REC/baseline-fv11.md" > "$REC/baseline-diff-fv6-fr13.txt"; echo "baseline diff FV6 FR13 exit $? ($(wc -l < "$REC/baseline-diff-fv6-fr13.txt" | tr -d ' ') lines)"
  ;;
readings)
  # The owner-ruled readings (Q-1 (a), Q-11 (a)), M-9 plain and --r32 per engine (H12-1/H13-1, R-37's line), both gated.
  for e in chromium webkit; do
    node "$H/m6-separable-ladder.mjs" "$D3_OUT/caps/fv11" --gate $e --q1 a > "$REC/M-6-q1a-$e.log" 2>&1; echo "M-6 --q1 a $e: $(tail -1 "$REC/M-6-q1a-$e.log")"
    node "$H/m1x-off-paper.mjs" "$D3_OUT/caps/fv11" --gate $e --q11 a > "$REC/M-1x-q11a-$e.log" 2>&1; echo "M-1x --q11 a $e: $(tail -1 "$REC/M-1x-q11a-$e.log")"
    node "$H/wa-no-signal.mjs" "$D3_OUT/caps/fv11" --gate $e --q11 a > "$REC/W-A-q11a-$e.log" 2>&1; echo "W-A --q11 a $e: $(tail -1 "$REC/W-A-q11a-$e.log")"
    node "$H/m9-state-registers.mjs" "$D3_OUT/caps/fv11" --gate $e > "$REC/M-9-$e.log" 2>&1; echo "M-9 $e: $(tail -1 "$REC/M-9-$e.log")"
    node "$H/m9-state-registers.mjs" "$D3_OUT/caps/fv11" --gate $e --r32 > "$REC/M-9-r32-$e.log" 2>&1; echo "M-9 --r32 $e: $(tail -1 "$REC/M-9-r32-$e.log")"
    grep -E "^.*R-37|R-32 " "$REC/M-9-r32-$e.log" | cut -c1-260
  done 2>&1 | tee "$REC/readings.log"
  node "$H/m9-state-registers.mjs" "$D3_OUT/caps/fv11" --gate chromium,webkit --r32 > "$REC/M-9-r32-both.log" 2>&1; echo "M-9 --r32 both gated: $(tail -1 "$REC/M-9-r32-both.log")" | tee -a "$REC/readings.log"
  ;;
thin-cr|thin-wk)
  # The light proof in paint (Crit §1's reading, re-measured): the state scene over aurora and paper, both themes, floor
  # v11a and floor v11, one engine per admission, read by M-9 --r32 and by crit-offspot.mjs (light cells pixel by pixel).
  # Chromium only, in the same admission: the multi-hue veiled cell (H13-3), into its own capture directory.
  e=chromium; [ "$phase" = thin-wk ] && { e=webkit; echo "admitted $(ts)" | tee -a "$REC/wk-admission.log"; }
  for l in fv11a fv11; do
    c=$D3_OUT/caps/thin-$l-$e; rm -rf "$c"
    node "$H/capture.mjs" "$D3_OUT/builds/$l/dist" --out "$c" --engines $e --themes light,dark --scenes state --grounds aurora,paper > "$REC/thin-$l-$e-capture.log" 2>&1; echo "capture $l $e exit $? $(ts)"
    node "$H/m9-state-registers.mjs" "$c" --gate $e --r32 > "$REC/thin-M-9-r32-$l-$e.log" 2>&1; echo "M-9 --r32 $l $e: $(tail -1 "$REC/thin-M-9-r32-$l-$e.log")"
  done 2>&1 | tee -a "$REC/thin.log"
  if [ $e = chromium ]; then
    c=$D3_OUT/caps/hues-chromium; rm -rf "$c"
    node "$H/capture.mjs" "$D3_OUT/builds/fv11/dist" --out "$c" --engines chromium --themes dark --scenes state --grounds paper --variant veil-hues --inject "$H/veil-hues.css" --worktree "$W" > "$REC/hues-chromium-capture.log" 2>&1; echo "capture veil-hues chromium exit $? $(ts)" | tee -a "$REC/thin.log"
  fi
  ;;
lightproof-px)
  # No browser: crit-offspot.mjs over the thin captures (light cells floor v11a vs floor v11, pixel by pixel).
  for e in chromium webkit; do
    node "$P12/crit-offspot.mjs" "$D3_OUT/caps/thin-fv11a-$e" "$D3_OUT/caps/thin-fv11-$e" $e > "$REC/offspot-$e.log" 2>&1; echo "offspot $e exit $?: $(tail -1 "$REC/offspot-$e.log")"
    grep -E "^light " "$REC/offspot-$e.log"
  done 2>&1 | tee "$REC/lightproof-px.log"
  ;;
field)
  # H13-3, FIELD (R-39, reported): the battery's capture per engine, the multi-hue cell from its own capture.
  for e in chromium webkit; do
    node "$H/field-reader.mjs" "$D3_OUT/caps/fv11" --engines $e --hues "$D3_OUT/caps/hues-chromium" > "$REC/field-$e.log" 2>&1; echo "FIELD $e exit $?: $(tail -1 "$REC/field-$e.log")"
  done 2>&1 | tee "$REC/field.log"
  ;;
plants-cr|plants-wk)
  # Row 19: every R plant (now with plant-R32-notone, H13-2) and floor plant over floor v11, one engine per admission.
  e=chromium; [ "$phase" = plants-wk ] && { e=webkit; echo "admitted $(ts)" | tee -a "$REC/wk-admission.log"; }
  is "$FV11" || exit 3
  { node "$M/pass-4/FV3-plants.mjs" "$D3_OUT/builds/fv11/dist" "$W" --engines $e --out "$D3_OUT/plants" --only "plant-R1,plant-R2,probe-R2-35,plant-R3,plant-R4,var-q1c,var-q11b,plant-q1c-noroom,plant-R32-notone" > "$REC/plants-$e.log" 2>&1; echo "FV3-plants $e exit $? $(ts)"
    node "$M/pass-3/FV2-plants.mjs" "$D3_OUT/builds/fv11/dist" "$W" --engines $e --out "$D3_OUT/flplants" --only "plant-bound,plant-heldfloor,plant-carrierveil,plant-darkperim,plant-noisolation,risk-opaque-ancestor,diag-held-noveil" > "$REC/floor-plants-$e.log" 2>&1; echo "FV2-plants $e exit $? $(ts)"
    if [ $e = webkit ]; then node "$M/pass-6/FV5-demo-probe.mjs" "$D3_OUT/builds/fv11/demo" --label fv11 --engines webkit --out "$REC/demo-fv11-webkit.json" > "$REC/demo-fv11-webkit.log" 2>&1; echo "demo-probe fv11 webkit exit $? $(ts)"; grep -E '^DEMO|crash' "$REC/demo-fv11-webkit.log" | head -4; fi
  } 2>&1 | tee -a "$REC/plants-run.log"
  ;;
demo-cr)
  F=$REC/demo-frames; mkdir -p "$F"
  { node "$M/pass-6/FV5-demo-probe.mjs" "$D3_OUT/builds/fv11/demo" --label fv11 --engines chromium --shots "$F" --out "$REC/demo-fv11-chromium.json" > "$REC/demo-fv11-chromium.log" 2>&1; echo "demo-probe fv11 chromium exit $? $(ts)"; grep -E '^DEMO' "$REC/demo-fv11-chromium.log"
    node "$M/pass-6/crit-demo-probe.mjs" "$D3_OUT/builds/fv11/demo" --label fv11 --engines chromium --shots "$F" --out "$REC/critdemo-fv11-chromium.json" > "$REC/critdemo-fv11-chromium.log" 2>&1; echo "crit-demo fv11 chromium exit $? $(ts)"; grep -E '^CRIT' "$REC/critdemo-fv11-chromium.log"
  } 2>&1 | tee "$REC/demo-cr.log"
  ;;
plants-read)
  PR=$REC/plants; mkdir -p "$PR"; echo "read $(ts)" > "$PR/readings.log"
  rd() { local d=$1 id=$2 w=$3 tag=$4; shift 4; for e in ${RD_ENGINES:-chromium webkit}; do
      node "$H/$w.mjs" "$D3_OUT/$d/$id" --gate $e "$@" > "$PR/$id-$tag-$e.log" 2>&1
      echo "$id | $tag | $e | $(tail -1 "$PR/$id-$tag-$e.log")" | tee -a "$PR/readings.log"; done; }
  rd plants plant-R1 m4-dock-register M-4 --cells dark
  rd plants plant-R2 m9-state-registers M-9 --cells dark
  rd plants probe-R2-35 m9-state-registers M-9 --cells dark
  rd plants plant-R3 o66-field-row O-66 --cells .
  rd plants plant-R4 o66-field-row O-66 --cells .
  rd plants plant-q1c-noroom m6-separable-ladder M-6-q1c --cells dark --q1 c
  rd plants var-q1c m6-separable-ladder M-6-q1c --q1 c
  rd plants var-q1c m6-separable-ladder M-6-q1a --q1 a
  rd plants var-q11b m1x-off-paper M-1x-q11b --q11 b
  rd plants var-q11b wa-no-signal W-A-q11b --q11 b
  rd plants var-q11b wa-no-signal W-A-a
  rd plants var-q11b m1-no-grey M-1
  rd flplants plant-bound m2-text-contrast M-2 --cells '(ladder|dialog)$'
  rd flplants plant-heldfloor m2-text-contrast M-2 --cells 'held$'
  rd flplants plant-carrierveil m2-text-contrast M-2 --cells 'held$'
  rd flplants plant-darkperim m3-non-text M-3 --cells dark
  rd flplants plant-noisolation m2-text-contrast M-2 --cells 'held$'
  rd flplants plant-noisolation stack-host STACK --cells 'held$'
  rd flplants risk-opaque-ancestor m2-text-contrast M-2 --cells 'held$'
  RD_ENGINES=chromium rd flplants diag-held-noveil m2-held-window M-2h --cells . --verbose
  # H13-2's plant (added after BV11's list): the dark arm's mechanism removed; plant-R2's margin read beside its verdict.
  rd plants plant-R32-notone m9-state-registers M-9-r32 --cells dark --r32
  rd plants plant-R2 m9-state-registers M-9-r32 --cells dark --r32
  echo "end $(ts)" >> "$PR/readings.log"
  diff <(sed 1d "$P12/BV11-records/plants/readings.log" | grep -v '^end') <(sed 1d "$PR/readings.log" | grep -v '^end') > "$REC/plants-diff-bv11-fr13.txt"; echo "plant readings diff BV11 FR13 exit $?"
  ;;
rerun-cr|rerun-wk)
  # Each red cell's scenes re-captured twice and re-read (RERUN_* pick them); WebKit under its own admission.
  e=chromium; [ "$phase" = rerun-wk ] && { e=webkit; echo "admitted $(ts)" | tee -a "$REC/wk-admission.log"; }
  for n in 1 2; do
    c=$D3_OUT/caps/rerun-$e$n; rm -rf "$c"
    node "$H/capture.mjs" "$D3_OUT/builds/fv11/dist" --out "$c" --engines $e --themes "${RERUN_THEMES:-light,dark}" --scenes "${RERUN_SCENES:-held,ladder,dialog}" --grounds "${RERUN_GROUNDS:-black,white,aurora,paper}" > "$REC/rerun-$e$n-capture.log" 2>&1
    for w in ${RERUN_WITNESSES:-m2-held-window m3-non-text m6-separable-ladder}; do node "$H/$w.mjs" "$c" --gate $e --verbose ${RERUN_ARGS:-} > "$REC/rerun-$e$n-$w.log" 2>&1; echo "rerun $e $n $w $(ts): $(tail -1 "$REC/rerun-$e$n-$w.log")"; done
    [ -n "${RERUN_R32:-}" ] && { node "$H/m9-state-registers.mjs" "$c" --gate $e --r32 > "$REC/rerun-$e$n-m9-r32.log" 2>&1; echo "rerun $e $n m9 --r32 $(ts): $(tail -1 "$REC/rerun-$e$n-m9-r32.log")"; grep -E "R-37" "$REC/rerun-$e$n-m9-r32.log" | cut -c1-260; }
  done 2>&1 | tee -a "$REC/rerun-$e.log"
  ;;
plant-notone)
  # The tone plant's red re-run twice (Chromium), as BV11's plant-notone phase, read by M-9 --r32 under H13-1.
  is "$FV11" || exit 3
  for n in 1 2; do c=$D3_OUT/plants/plant-notone-$n; rm -rf "$c"
    node "$H/capture.mjs" "$D3_OUT/builds/fv11/dist" --out "$c" --engines chromium --themes dark --scenes state --grounds aurora,paper --variant plant-notone --inject "$P12/BV11-plant-r32-notone.css" --worktree "$W" > "$REC/plant-notone-$n-capture.log" 2>&1; echo "capture $n exit $? $(ts)"
    node "$H/m9-state-registers.mjs" "$c" --gate chromium --r32 --variant plant-notone --cells dark > "$REC/plant-notone-$n-M-9-r32.log" 2>&1; echo "plant-notone $n M-9 --r32: $(tail -1 "$REC/plant-notone-$n-M-9-r32.log")"
  done 2>&1 | tee "$REC/plant-notone.log"
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"; rmdir "$R/.claude/worktrees/bl/D3/p13" 2>/dev/null
  { echo "worktrees naming D3/p13/floor11m: $(git -C "$R" worktree list | grep -c 'D3/p13/floor11m')"; ls "$R/.claude/worktrees/bl/D3/" 2>&1; } | tee "$REC/teardown.log"
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
