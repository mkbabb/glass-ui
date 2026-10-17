#!/usr/bin/env bash
# FV5-run.sh · D3 pass 6, floor v5 (REGISTRY P5-6.2 step 2): every command this seat ran, by phase.
# floor v5 = pass-5/floor-v4.patch + floor-v5-R10.diff + floor-v5-R11.diff + floor-v5-R12.diff, written whole as
# pass-6/floor-v5.patch. One worktree (.claude/worktrees/bl/D3/p6/floor5/wt); floor v5 is applied by default, and a phase
# that needs floor v4 or the minor v3 swaps the patch and swaps it back, each swap checked with cmp. Builds, captures and
# caches live in $W/.d3out (and $W/.cache-fv5 for the toolchain). Records land in pass-6/FV5-records/.
# Browser phases run under the machine guard; every phase that starts Playwright WebKit runs inside `wk-inner`, one
# `guarded --exclusive webkit` admission:
#   ~/.claude/guard/guarded --timeout 90 --exclusive webkit -- bash FV5-run.sh wk-inner
#   bash FV5-run.sh static|build|battery-cr|witnesses|baseline|diff|readings|plants-read|demo-cr|ladder-fv4|rerun-cr|glance|toolchain
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p6/floor5
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P3=$M/pass-3
P4=$M/pass-4
P5=$M/pass-5
P6=$M/pass-6
REC=$P6/FV5-records
FV4=$P5/floor-v4.patch
FV5=$P6/floor-v5.patch
MS3=$P5/minor-split-v3.patch
GC="$HOME/.claude/guard/guarded --timeout ${FV5_TIMEOUT:-90} --"
export D3_OUT=$W/.d3out
mkdir -p "$REC/verbose"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
to_fv4() { is "$FV5" >/dev/null && git -C "$W" apply -R "$FV5" && git -C "$W" apply "$FV4"; is "$FV4" || exit 3; }
to_fv5() { is "$FV4" >/dev/null && git -C "$W" apply -R "$FV4" && git -C "$W" apply "$FV5"; is "$FV5" || exit 3; }
to_minor3() { is "$FV5" >/dev/null && git -C "$W" apply -R "$FV5" && git -C "$W" apply "$MS3"; is "$MS3" || exit 3; }
from_minor3() { is "$MS3" >/dev/null && git -C "$W" apply -R "$MS3" && git -C "$W" apply "$FV5"; is "$FV5" || exit 3; }
radii() { grep -E -- '--glass-blur-(wash|quiet|resting|floating|overlay)-radius:' "$W/src/styles/tokens/glass.css" | sed 's/^ *//'; }
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
static)
  # H6-0 LAW over the harness and pass-6; H6-1 DEL with the floor's declaration on floor v5 (fixture) and floor v4 (the
  # planted FAIL); the registry's line grep beside it; R-11's ladder plant (the five radii of floor v5 against the minor's,
  # floor v4's against the minor's); HOV, LIT and the census on floor v5.
  is "$FV5" || exit 3
  { node "$H/launch-law.mjs"; echo "LAW exit $?"
    echo "-- DEL floor v5"; node "$H/deleted-mechanisms.mjs" --root "$W" --declare "$H/deletes-floor.json"; echo "DEL fv5 exit $?"
    echo "-- line grep floor v5"; grep -rnE 'earned darken|darkened by whatever|luma read' "$W/src" "$W/demo" | sed "s#$W/##"; echo "(grep lines: $(grep -rnE 'earned darken|darkened by whatever|luma read' "$W/src" "$W/demo" | wc -l | tr -d ' '))"
    radii > "$REC/radii-fv5.txt"
    to_fv4
    echo "-- DEL floor v4 (planted FAIL)"; node "$H/deleted-mechanisms.mjs" --root "$W" --declare "$H/deletes-floor.json"; echo "DEL fv4 exit $?"
    echo "-- line grep floor v4"; grep -rnE 'earned darken|darkened by whatever|luma read' "$W/src" "$W/demo" | sed "s#$W/##"
    radii > "$REC/radii-fv4.txt"
    to_fv5; to_minor3; radii > "$REC/radii-minor3.txt"; from_minor3
    echo "-- LADDER: diff radii-fv5 radii-minor3 (fixture: prints nothing)"; diff "$REC/radii-fv5.txt" "$REC/radii-minor3.txt"; echo "LADDER fv5 exit $?"
    echo "-- LADDER: diff radii-fv4 radii-minor3 (plant: floor v4's 16/18)"; diff "$REC/radii-fv4.txt" "$REC/radii-minor3.txt"; echo "LADDER fv4 exit $?"
    node "$H/hover-fill-selected.mjs" --root "$W" > "$REC/HOV-fv5.log" 2>&1; echo "HOV exit $?: $(tail -1 "$REC/HOV-fv5.log")"
    node "$H/lighting-literals.mjs" --root "$W" > "$REC/LIT-static-fv5.log" 2>&1; echo "LIT exit $?: $(grep -o 'LIGHTING-LITERALS.*' "$REC/LIT-static-fv5.log" | tail -1)"
    node "$P4/lighting-census.mjs" "$W" > "$REC/census-fv5.log" 2>&1; echo "census exit $?: $(tail -1 "$REC/census-fv5.log")"
  } 2>&1 | tee "$REC/static.log"
  ;;
build)
  # floor v5's specimens and demo; floor v4's (the demo for R-12's plant, the specimens for the ladder compare and the
  # glance base). Floor v5 is left applied.
  is "$FV5" || exit 3
  $GC node "$H/build.mjs" "$W" --label fv5 --demo 2>&1 | tail -2; echo "fv5 built $(ts)"
  to_fv4; $GC node "$H/build.mjs" "$W" --label fv4 --demo 2>&1 | tail -2; echo "fv4 built $(ts)"; to_fv5
  ;;
battery-cr)
  # The whole battery under H6 in Chromium (the headless shell; the cited field windows take CHROMIUM_FIELD_ARGS).
  is "$FV5" || exit 3
  $GC node "$H/run.mjs" "$W" --label fv5 --skip-build --engines chromium 2>&1 | tee "$REC/fv5-run-chromium.log" | tail -4
  ;;
wk-inner)
  # Every Playwright WebKit item under ONE admission. (1) the battery's WebKit half; (2) the R-1..R-4 plants, the owner
  # variants and the floor plants (FV3-plants, FV2-plants) over floor v5, both engines (diag-held-noveil is Chromium only:
  # R-11's N-3 read); (3) R-12's demo probe in Playwright WebKit on floor v5 and floor v4 (the plant).
  echo "admitted $(ts)"
  # One heavy run per seat: a Chromium phase run while this admission queued holds $B/cr-busy; wait it out.
  while [ -e "$B/cr-busy" ]; do sleep 15; done; echo "clear of Chromium phases $(ts)"
  is "$FV5" || exit 3
  node "$H/run.mjs" "$W" --label fv5 --skip-build --engines webkit > "$REC/fv5-run-webkit.log" 2>&1; echo "battery-wk exit $? $(ts)"; tail -3 "$REC/fv5-run-webkit.log"
  node "$P4/FV3-plants.mjs" "$D3_OUT/builds/fv5/dist" "$W" --out "$D3_OUT/plants" --only "${PLANTS:-plant-R1,plant-R2,probe-R2-35,plant-R3,plant-R4,var-q1c,var-q11b,plant-q1c-noroom}" > "$REC/plants.log" 2>&1; echo "FV3-plants exit $? $(ts)"
  node "$P3/FV2-plants.mjs" "$D3_OUT/builds/fv5/dist" "$W" --out "$D3_OUT/flplants" --only "${FLPLANTS:-plant-bound,plant-heldfloor,plant-carrierveil,plant-darkperim,plant-noisolation,risk-opaque-ancestor,diag-held-noveil}" > "$REC/floor-plants.log" 2>&1; echo "FV2-plants exit $? $(ts)"
  for l in fv5 fv4; do node "$P6/FV5-demo-probe.mjs" "$D3_OUT/builds/$l/demo" --label $l --engines webkit --shots "$P6/glance-fv5/probe" --out "$REC/demo-$l-webkit.json" > "$REC/demo-$l-webkit.log" 2>&1; echo "demo-probe $l webkit exit $? $(ts)"; grep -E '^DEMO' "$REC/demo-$l-webkit.log"; done
  echo "done $(ts)"
  ;;
demo-cr)
  # R-12's demo probe in Chromium on floor v5 (fixture) and floor v4 (the plant), with one frame per theme each.
  for l in fv5 fv4; do $GC node "$P6/FV5-demo-probe.mjs" "$D3_OUT/builds/$l/demo" --label $l --engines chromium --shots "$P6/glance-fv5/probe" --out "$REC/demo-$l-chromium.json" > "$REC/demo-$l-chromium.log" 2>&1; echo "demo-probe $l chromium exit $? $(ts)"; grep -E '^DEMO' "$REC/demo-$l-chromium.log"; done 2>&1 | tee "$REC/demo-cr.log"
  ;;
witnesses)
  is "$FV5" || exit 3
  node "$H/run.mjs" "$W" --label fv5 --skip-build --skip-capture > "$REC/fv5-witnesses.log" 2>&1; tail -28 "$REC/fv5-witnesses.log"
  mkdir -p "$REC/fv5-results"; cp "$D3_OUT"/caps/fv5/results/*.log "$REC/fv5-results/"
  for w in m2-text-contrast:m2 m3-non-text:m3 m2-held-window:m2h m8-chrome-calm:m8 t-transmission:t m6-separable-ladder:m6; do
    node "$H/${w%%:*}.mjs" "$D3_OUT/caps/fv5" --gate chromium,webkit --verbose > "$REC/verbose/${w##*:}-fv5.txt" 2>&1; done
  ;;
baseline)
  node "$H/baseline.mjs" "$D3_OUT/caps/fv5" --out "$REC/baseline-fv5.json" > "$REC/baseline-fv5.md"; cat "$REC/baseline-fv5.md"
  ;;
diff)
  diff "$P6/H6-records/baseline-fv4-h6.md" "$REC/baseline-fv5.md" | tee "$REC/baseline-diff.txt"; echo "diff exit ${PIPESTATUS[0]}"
  ;;
readings)
  for e in chromium webkit; do
    for q in a c; do node "$H/m6-separable-ladder.mjs" "$D3_OUT/caps/fv5" --gate $e --q1 $q > "$REC/M-6-q1$q-$e.log" 2>&1; echo "M-6 --q1 $q $e: $(tail -1 "$REC/M-6-q1$q-$e.log")"; done
    node "$H/m1x-off-paper.mjs" "$D3_OUT/caps/fv5" --gate $e --q11 b > "$REC/M-1x-q11b-$e.log" 2>&1; echo "M-1x --q11 b $e: $(tail -1 "$REC/M-1x-q11b-$e.log")"
    node "$H/wa-no-signal.mjs" "$D3_OUT/caps/fv5" --gate $e --q11 b > "$REC/W-A-q11b-$e.log" 2>&1; echo "W-A --q11 b $e: $(tail -1 "$REC/W-A-q11b-$e.log")"
    node "$H/m9-state-registers.mjs" "$D3_OUT/caps/fv5" --gate $e > "$REC/M-9-$e.log" 2>&1; echo "M-9 $e: $(tail -1 "$REC/M-9-$e.log")"
  done 2>&1 | tee "$REC/readings.log"
  ;;
plants-read)
  # Every plant read by the witness its ruling names, both engines (pass-5 critic's plants-read, on floor v5).
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
  echo "end $(ts)" >> "$PR/readings.log"
  ;;
ladder-fv4)
  # R-11's ladder against floor v4 in paint: floor v4's specimens re-captured on the scenes the ladder moves (Chromium,
  # both themes), read verbose by the same witnesses, then compared row by row with floor v5 (MS-g7: a HEAD-PASS row in
  # floor v4 that fails in floor v5 is a regression).
  $GC node "$H/capture.mjs" "$D3_OUT/builds/fv4/dist" --out "$D3_OUT/caps/fv4-ladder" --engines chromium --themes light,dark \
    --scenes ladder,dialog,held,hostile > "$REC/fv4-ladder-capture.log" 2>&1; echo "capture fv4-ladder exit $? $(ts)"
  for w in m2-text-contrast:m2 m3-non-text:m3 m2-held-window:m2h m8-chrome-calm:m8 t-transmission:t; do
    node "$H/${w%%:*}.mjs" "$D3_OUT/caps/fv4-ladder" --gate chromium --verbose > "$REC/verbose/${w##*:}-fv4-ladder.txt" 2>&1; echo "fv4 ${w##*:}: $(tail -1 "$REC/verbose/${w##*:}-fv4-ladder.txt")"; done
  node "$P3/MS-g7.mjs" m2 "$REC/verbose/m2-fv4-ladder.txt" "$REC/verbose/m2-fv5.txt" > "$REC/ladder-m2-fv4-vs-fv5.txt"; tail -2 "$REC/ladder-m2-fv4-vs-fv5.txt"
  node "$P3/MS-g7.mjs" m3 "$REC/verbose/m3-fv4-ladder.txt" "$REC/verbose/m3-fv5.txt" > "$REC/ladder-m3-fv4-vs-fv5.txt"; tail -2 "$REC/ladder-m3-fv4-vs-fv5.txt"
  ;;
rerun-cr)
  # Every Chromium red cell's scenes re-captured twice, its witnesses re-read (RERUN_* pick them).
  for n in 1 2; do
    $GC node "$H/capture.mjs" "$D3_OUT/builds/fv5/dist" --out "$D3_OUT/caps/rerun-chromium$n" --engines chromium --scenes "${RERUN_SCENES:-held,ladder,dialog}" --grounds "${RERUN_GROUNDS:-black,white,aurora,paper}" > "$REC/rerun-chromium$n-capture.log" 2>&1
    for w in ${RERUN_WITNESSES:-m2-held-window m3-non-text m6-separable-ladder}; do node "$H/$w.mjs" "$D3_OUT/caps/rerun-chromium$n" --gate chromium --verbose > "$REC/rerun-chromium$n-$w.log" 2>&1; echo "rerun chromium $n $w $(ts): $(tail -1 "$REC/rerun-chromium$n-$w.log")"; done
  done 2>&1 | tee -a "$REC/rerun-cr.log"
  ;;
glance)
  # The owner-glance pairs (H-13), floor v4 on the left, floor v5 on the right: R-11's ladder on the dock, the Dialog and
  # the floating plate (Chromium, paper, both themes), and R-12's dock search (the probe's frames, composed).
  $GC node "$H/glance.mjs" --base "$D3_OUT/builds/fv4/dist" --route "$D3_OUT/builds/fv5/dist" --out "$P6/glance-fv5" --name fv5 --themes light,dark 2>&1 | tee "$REC/glance.log" | tail -12
  for e in chromium; do for t in light dark; do
    node "$P5/FV4-glance-pair.mjs" "$P6/glance-fv5/probe/fv5probe-$e-$t-dock-search-pointer-row1-fv4.png" "$P6/glance-fv5/probe/fv5probe-$e-$t-dock-search-pointer-row1-fv5.png" "$P6/glance-fv5/glance-$e-$t-dock-search-pointer-fv4-vs-fv5.png"; done; done 2>&1 | tee -a "$REC/glance.log"
  (cd "$P6/glance-fv5" && shasum -a 256 *.png > SHA256.txt)
  ;;
toolchain)
  # Typecheck (src, tests), library build, units (vitest --maxWorkers=2); caches inside the worktree.
  is "$FV5" || exit 3
  cd "$W"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-fv5/vite" };\n' > vite.fv5.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-fv5/vitest" };\n' > vitest.fv5.config.ts
  { npx vue-tsc --noEmit > "$REC/tsc-app.log" 2>&1; echo "typecheck app exit $? $(ts)"
    npx vite build --config vite.fv5.config.ts > "$REC/libbuild.log" 2>&1; echo "library build exit $? $(ts)"
    npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test.log" 2>&1; echo "typecheck tests exit $? $(ts)"
    npx vitest run --config vitest.fv5.config.ts --maxWorkers=2 --testTimeout 240000 > "$REC/units.log" 2>&1; echo "vitest exit $? $(ts)"
    grep -E "Test Files|Tests  " "$REC/units.log"; } 2>&1 | tee "$REC/toolchain.log"
  rm -f vite.fv5.config.ts vitest.fv5.config.ts
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
