#!/usr/bin/env bash
# D3-crit-run.sh · D3 pass 5, the fresh critic: every command this seat ran, by phase.
# One worktree (.claude/worktrees/bl/D3/p5/crit/wt, removed at the end). floor v4 is applied by default; phases that
# need the minor v3 or HEAD swap the patch and swap it back (each swap checked with cmp). Builds, captures and caches
# live in $W/.d3out and $W/.cache-crit. Records land in pass-5/crit-records/.
# Browser phases run under the guard; a phase that starts Playwright WebKit runs under `--exclusive webkit`:
#   bash D3-crit-run.sh inner-c <phase>...   (one guarded admission, Chromium only)
#   bash D3-crit-run.sh inner-w <phase>...   (one guarded --exclusive webkit admission)
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p5/crit
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P3=$M/pass-3
P4=$M/pass-4
P5=$M/pass-5
REC=$P5/crit-records
FV4=$P5/floor-v4.patch
MS3=$P5/minor-split-v3.patch
V=$P5/MS3-variants
CV=$P5/crit-variants
export D3_OUT=$W/.d3out
mkdir -p "$REC/verbose"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
to_minor() { is "$FV4" >/dev/null && git -C "$W" apply -R "$FV4" && git -C "$W" apply "$MS3"; is "$MS3" || exit 3; }
to_floor() { is "$MS3" >/dev/null && git -C "$W" apply -R "$MS3" && git -C "$W" apply "$FV4"; is "$FV4" || exit 3; }
if [ "${1:-}" = inner-c ] || [ "${1:-}" = inner-w ]; then
  if [ "$1" = inner-w ]; then EX="--timeout ${CRIT_TIMEOUT:-90} --exclusive webkit"; else EX="--timeout ${CRIT_TIMEOUT:-90}"; fi
  shift; echo "queued $(ts) for: $*" | tee -a "$REC/admissions.log"
  exec "$HOME/.claude/guard/guarded" $EX -- bash -c '
    echo "admitted $(date +%T) load $(sysctl -n vm.loadavg) for: $*" >> "'"$REC"'/admissions.log"
    for p in "$@"; do bash "$0" "$p" 2>&1 | tee -a "'"$REC"'/phase-$p.log"; done' "$P5/D3-crit-run.sh" "$@"
fi
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
setup)
  git -C "$R" worktree add --detach "$W" HEAD
  mkdir "$W/node_modules"; for e in $(ls -A "$R/node_modules"); do case $e in .vite|.cache|.tmp|.vitest|.vite-temp) ;; *) ln -s "$R/node_modules/$e" "$W/node_modules/$e";; esac; done
  [ -d "$R/tests-visual/node_modules" ] && ln -s "$R/tests-visual/node_modules" "$W/tests-visual/node_modules"
  # floor-v4.patch = floor-v3.patch + floor-v4-R6.diff (checked by composition), then left applied.
  git -C "$W" apply "$P4/floor-v3.patch" && git -C "$W" apply "$P5/floor-v4-R6.diff" && is "$FV4" && echo "composition: floor-v3 + R6 = floor-v4.patch"
  git -C "$W" apply -R "$FV4" && git -C "$W" apply "$MS3" && is "$MS3" && git -C "$W" apply -R "$MS3" && git -C "$W" apply "$FV4" && is "$FV4"
  git -C "$R" apply --check "$FV4" && git -C "$R" apply --check "$MS3" && echo "both patches apply --check clean at $(git -C "$R" rev-parse --short HEAD)"
  ;;
static)
  # Census, LIT, HOV and the prose sweep on floor v4 and the minor v3 (scratch copies), with R-6's plants.
  S=$B/scratch; rm -rf "$S"; mkdir -p "$S"
  for t in fv4 minor3 r4 r6lit minor2 v1010; do mkdir -p "$S/$t"; done
  is "$FV4" || exit 3; cp -R "$W/src" "$W/demo" "$W/tests" "$W/vite.targets.ts" "$S/fv4/"
  to_minor; cp -R "$W/src" "$W/demo" "$W/tests" "$W/vite.targets.ts" "$S/minor3/"; to_floor
  cp -R "$S/fv4/." "$S/r4/"; (cd "$S/r4" && patch -s -R -p1 < "$P5/floor-v4-R6.diff")
  cp -R "$S/fv4/." "$S/r6lit/"; (cd "$S/r6lit" && patch -s -p1 < "$P5/plant-r6-literal.diff")
  git -C "$R" archive HEAD src demo tests vite.targets.ts | tar -x -C "$S/minor2"; (cd "$S/minor2" && patch -s -p1 < "$P4/minor-split-v2.patch")
  git -C "$R" archive v10.1.0 src/styles | tar -x -C "$S/v1010"
  for t in fv4 minor3 v1010; do node "$P4/lighting-census.mjs" "$S/$t" > "$REC/census-$t.log" 2>&1; echo "census $t exit $?: $(tail -1 "$REC/census-$t.log")"; done
  for t in fv4 minor3; do node "$H/lighting-literals.mjs" --root "$S/$t" > "$REC/LIT-static-$t.log" 2>&1; echo "LIT $t exit $?: $(grep -o 'LIGHTING-LITERALS.*' "$REC/LIT-static-$t.log" | tail -1)"; done
  for t in fv4 minor3 r4 r6lit minor2; do node "$H/hover-fill-selected.mjs" --root "$S/$t" > "$REC/HOV-$t.log" 2>&1; echo "HOV $t exit $?: $(tail -1 "$REC/HOV-$t.log")"; done
  for t in fv4 minor3 r4 r6lit minor2; do echo "prose sweep $t:"; grep -rn "hover cannot mint\|rung hover cannot\|hover FILL\|glass-quiet hover-lift" "$S/$t/src" "$S/$t/demo" "$S/$t/tests" | sed "s#$S/$t/##"; done
  echo "earned-darken sentences (minor3):"; grep -rn "earned.darken\|earned-darken\|plate darken\|darken in lockstep" "$S/minor3/src" "$S/minor3/demo/stories" | sed "s#$S/minor3/##"
  echo "edge gleam copy (fv4, minor3):"; grep -rn -i "edge gleam\|gleam follows" "$S/fv4/src" "$S/fv4/demo" "$S/minor3/demo" | sed "s#$B/scratch/##"
  ;;
builds)
  # floor v4, the minor v3, HEAD: specimens and demo each; floor v4 left applied.
  is "$FV4" || exit 3
  node "$H/build.mjs" "$W" --label fv4 --demo; echo "fv4 built $(ts)"
  to_minor; node "$H/build.mjs" "$W" --label minor3 --demo; echo "minor3 built $(ts)"
  git -C "$W" apply -R "$MS3" && test -z "$(git -C "$W" status --porcelain -- src demo tests)" && echo "worktree = HEAD"
  node "$H/build.mjs" "$W" --label head --demo; echo "head built $(ts)"
  git -C "$W" apply "$FV4"; is "$FV4" || exit 3
  ;;
battery-fv4-c|battery-fv4-w)
  is "$FV4" || exit 3
  if [ $phase = battery-fv4-c ]; then e=chromium; else e=webkit; fi
  node "$H/run.mjs" "$W" --label fv4 --skip-build --engines $e > "$REC/fv4-run-$e.log" 2>&1; echo "exit $? $(ts)"; tail -4 "$REC/fv4-run-$e.log"
  ;;
battery-minor3-c|battery-minor3-w)
  # run.mjs reads HOV from the capture's worktree, so the minor is swapped in for the run and swapped back.
  to_minor
  if [ $phase = battery-minor3-c ]; then e=chromium; else e=webkit; fi
  node "$H/run.mjs" "$W" --label minor3 --skip-build --engines $e > "$REC/minor3-run-$e.log" 2>&1; echo "exit $? $(ts)"; tail -4 "$REC/minor3-run-$e.log"
  to_floor
  ;;
witnesses-fv4)
  node "$H/run.mjs" "$W" --label fv4 --skip-build --skip-capture > "$REC/fv4-witnesses.log" 2>&1; tail -27 "$REC/fv4-witnesses.log"
  mkdir -p "$REC/fv4-results"; cp "$D3_OUT"/caps/fv4/results/*.log "$REC/fv4-results/"
  node "$H/baseline.mjs" "$D3_OUT/caps/fv4" --out "$REC/baseline-fv4.json" > "$REC/baseline-fv4.md"
  echo "diff seat baseline-fv4.md vs critic:"; diff "$P5/FV4-records/baseline-fv4.md" "$REC/baseline-fv4.md" && echo "(identical)"
  ;;
witnesses-minor3)
  to_minor
  node "$H/run.mjs" "$W" --label minor3 --skip-build --skip-capture > "$REC/minor3-witnesses.log" 2>&1; tail -27 "$REC/minor3-witnesses.log"
  to_floor
  mkdir -p "$REC/minor3-results"; cp "$D3_OUT"/caps/minor3/results/*.log "$REC/minor3-results/"
  node "$H/baseline.mjs" "$D3_OUT/caps/minor3" --out "$REC/baseline-minor3.json" > "$REC/baseline-minor3.md"
  echo "diff seat baseline-minor3.md vs critic:"; diff "$P5/MS3-records/baseline-minor3.md" "$REC/baseline-minor3.md" && echo "(identical)"
  ;;
readings-fv4)
  for e in chromium webkit; do
    for q in a c; do node "$H/m6-separable-ladder.mjs" "$D3_OUT/caps/fv4" --gate $e --q1 $q > "$REC/M-6-q1$q-$e.log" 2>&1; echo "M-6 --q1 $q $e: $(tail -1 "$REC/M-6-q1$q-$e.log")"; done
    node "$H/m1x-off-paper.mjs" "$D3_OUT/caps/fv4" --gate $e > "$REC/M-1x-a-$e.log" 2>&1; echo "M-1x (a) $e: $(tail -1 "$REC/M-1x-a-$e.log")"
    node "$H/m1x-off-paper.mjs" "$D3_OUT/caps/fv4" --gate $e --q11 b > "$REC/M-1x-q11b-$e.log" 2>&1; echo "M-1x --q11 b $e: $(tail -1 "$REC/M-1x-q11b-$e.log")"
    node "$H/wa-no-signal.mjs" "$D3_OUT/caps/fv4" --gate $e --q11 b > "$REC/W-A-q11b-$e.log" 2>&1; echo "W-A --q11 b $e: $(tail -1 "$REC/W-A-q11b-$e.log")"
    node "$H/m9-state-registers.mjs" "$D3_OUT/caps/fv4" --gate $e > "$REC/M-9-$e.log" 2>&1; echo "M-9 $e: $(tail -1 "$REC/M-9-$e.log")"
  done
  for w in m2-text-contrast:m2 m3-non-text:m3 m6-separable-ladder:m6 m2-held-window:m2h m8-chrome-calm:m8 t-transmission:t; do
    node "$H/${w%%:*}.mjs" "$D3_OUT/caps/fv4" --gate chromium,webkit --verbose > "$REC/verbose/${w##*:}-fv4.txt" 2>&1; done
  ;;
plants-fv4)
  # The R-1..R-4 plants and the owner variants (pass-4/FV3-plants.mjs) and the floor plants (pass-3/FV2-plants.mjs),
  # each injected over the critic's own floor v4 build; both engines (call under inner-w).
  is "$FV4" || exit 3
  node "$P4/FV3-plants.mjs" "$D3_OUT/builds/fv4/dist" "$W" --out "$D3_OUT/plants" --only "${PLANTS:-plant-R1,plant-R2,probe-R2-35,plant-R3,plant-R4,var-q1c,var-q11b,plant-q1c-noroom}" | tee -a "$REC/plants.log"
  node "$P3/FV2-plants.mjs" "$D3_OUT/builds/fv4/dist" "$W" --out "$D3_OUT/flplants" \
    --only "${FLPLANTS:-plant-bound,plant-heldfloor,plant-carrierveil,plant-darkperim,plant-noisolation,risk-opaque-ancestor,diag-held-noveil}" | tee -a "$REC/floor-plants.log"
  ;;
plants-read)
  PR=$REC/plants; mkdir -p "$PR"; echo "read $(ts)" > "$PR/readings.log"
  rd() { local d=$1 id=$2 w=$3 tag=$4; shift 4; for e in chromium webkit; do
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
  rd flplants diag-held-noveil m2-held-window M-2h --cells .
  echo "end $(ts)" >> "$PR/readings.log"
  ;;
ladder-fv4)
  # R-8's one ladder: floor v4 with the minor's 18/20 injected (r18.css), Chromium, both themes, the scenes M-2, M-3,
  # M-8, T and M-2h read; compared with floor v4 as built (16/18) on the same witnesses.
  node "$H/capture.mjs" "$D3_OUT/builds/fv4/dist" --out "$D3_OUT/caps/fv4-r18" --engines chromium --themes light,dark \
    --scenes ladder,dialog,held,hostile --inject "$V/r18.css" > "$REC/fv4-r18-capture.log" 2>&1; echo "capture fv4-r18 exit $? $(ts)"
  for w in m2-text-contrast:m2 m3-non-text:m3 m8-chrome-calm:m8 t-transmission:t m2-held-window:m2h m1-no-grey:m1 m6-separable-ladder:m6; do
    node "$H/${w%%:*}.mjs" "$D3_OUT/caps/fv4-r18" --gate chromium --verbose > "$REC/verbose/${w##*:}-fv4-r18.txt" 2>&1; echo "fv4+r18 ${w##*:}: $(tail -1 "$REC/verbose/${w##*:}-fv4-r18.txt")"; done
  node "$P3/MS-g7.mjs" m2 "$REC/verbose/m2-fv4.txt" "$REC/verbose/m2-fv4-r18.txt" > "$REC/fv4-r18-vs-fv4-m2.txt"; tail -2 "$REC/fv4-r18-vs-fv4-m2.txt"
  node "$P3/MS-g7.mjs" m3 "$REC/verbose/m3-fv4.txt" "$REC/verbose/m3-fv4-r18.txt" > "$REC/fv4-r18-vs-fv4-m3.txt"; tail -2 "$REC/fv4-r18-vs-fv4-m3.txt"
  ;;
probe-fv4)
  # R-6's paint: FV4-hover-probe.mjs on the critic's floor v4 and on the two plant trees (R-4 as built, R-6 literal).
  e=${ENG:-chromium}
  for t in fv4 r4 r6lit; do tree=$W; [ $t != fv4 ] && tree=$B/scratch/$t
    [ $t != fv4 ] && { cp "$R/vite.targets.ts" "$tree/" 2>/dev/null; [ -e "$tree/node_modules" ] || ln -s "$W/node_modules" "$tree/node_modules"; }
    node "$P5/FV4-hover-probe.mjs" "$tree" --label crit-$t --engines $e --out "$REC/hover-$t-$e.json" > "$REC/hover-$t-$e.log" 2>&1
    echo "probe $t $e exit $? $(ts)"; grep -E "^POINTER|^PARKED|^BARE" "$REC/hover-$t-$e.log"; done
  ;;
demo-probe)
  # The demo-only composers: the dock-search result row's hover leg (R-6's uncovered composer) and the glass-material
  # story's pointer edge gleam (P4-5, judged under O-87). crit-demo-probe.mjs, Chromium.
  for l in ${DEMO_LABELS:-fv4 minor3 head}; do
    node "$P5/crit-demo-probe.mjs" "$D3_OUT/builds/$l/demo" --label $l --engines ${ENG:-chromium} --shots "$P5/crit-frames" --out "$REC/demo-probe-$l-${ENG:-chromium}.json" > "$REC/demo-probe-$l-${ENG:-chromium}.log" 2>&1
    echo "demo-probe $l exit $? $(ts)"; grep -E "^(SEARCH|GLEAM|RESULT)" "$REC/demo-probe-$l-${ENG:-chromium}.log"; done
  ;;
head-cells)
  node "$H/capture.mjs" "$D3_OUT/builds/head/dist" --out "$D3_OUT/caps/head" --engines "${ENG:-chromium}" --themes light,dark \
    --scenes ladder,dialog,held,hostile,claim,o66field,o66menu,halo,state > "$REC/head-cells-${ENG:-chromium}.log" 2>&1
  echo "exit $? $(ts)"; tail -2 "$REC/head-cells-${ENG:-chromium}.log"
  ;;
verbose-minor3)
  for l in head minor3; do
    for w in m2-text-contrast:m2 m3-non-text:m3 m6-separable-ladder:m6 m1-no-grey:m1 o66-field-row:o66 m2-held-window:m2h m1x-off-paper:m1x wa-no-signal:wa; do
      node "$H/${w%%:*}.mjs" "$D3_OUT/caps/$l" --gate chromium,webkit --verbose > "$REC/verbose/${w##*:}-$l.txt" 2>&1
    done
    echo "$l: $(tail -1 "$REC/verbose/m2-$l.txt") | $(tail -1 "$REC/verbose/m3-$l.txt") | $(tail -1 "$REC/verbose/m6-$l.txt")"
  done
  node "$P3/MS-g7.mjs" m2 "$REC/verbose/m2-head.txt" "$REC/verbose/m2-minor3.txt" > "$REC/g7-m2.txt"; tail -2 "$REC/g7-m2.txt"
  node "$P3/MS-g7.mjs" m3 "$REC/verbose/m3-head.txt" "$REC/verbose/m3-minor3.txt" > "$REC/g7-m3.txt"; tail -2 "$REC/g7-m3.txt"
  node "$P3/MS-g7.mjs" dark "$REC/verbose/m6-head.txt" "$REC/verbose/m6-minor3.txt" > "$REC/g6-dark-raw.txt"; tail -3 "$REC/g6-dark-raw.txt"
  ;;
search)
  # R-7 and R-8 re-captured by the critic over its own minor v3 build (Chromium, both themes): the W-0.1 tree, floating
  # 16/17/18(as built)/19, and the perimeter at 0.52 (R-7's plant) and 0.56.
  for v in ${CRIT_SEARCH:-w01ref r16 r17 r18 r19 p52 p56}; do
    case $v in r18) inj="";; w01ref|r17|r19) inj="--inject $V/$v.css";; *) inj="--inject $CV/$v.css";; esac
    node "$H/capture.mjs" "$D3_OUT/builds/minor3/dist" --out "$D3_OUT/caps/s-$v" --engines chromium --themes light,dark \
      --scenes ladder,dialog,held,hostile $inj > "$REC/search-$v-capture.log" 2>&1; echo "capture $v exit $? $(ts)"
    for w in m2-text-contrast:m2 m3-non-text:m3 m1-no-grey:m1 m6-separable-ladder:m6 m2-held-window:m2h; do
      node "$H/${w%%:*}.mjs" "$D3_OUT/caps/s-$v" --gate chromium --verbose > "$REC/verbose/${w##*:}-s-$v.txt" 2>&1; done
    echo "-- $v: M-1 $(tail -1 "$REC/verbose/m1-s-$v.txt") | dark white dialog: $(grep -E 'chromium dark white dialog:' "$REC/verbose/m2-s-$v.txt" | head -1 | cut -c1-200)"
    [ "$v" = w01ref ] && continue
    node "$P3/MS-g7.mjs" m2 "$REC/verbose/m2-s-w01ref.txt" "$REC/verbose/m2-s-$v.txt" > "$REC/w011g6-m2-$v.txt"; echo "   W-0.11 G6 m2: $(tail -1 "$REC/w011g6-m2-$v.txt")"
    node "$P3/MS-g7.mjs" m3 "$REC/verbose/m3-s-w01ref.txt" "$REC/verbose/m3-s-$v.txt" > "$REC/w011g6-m3-$v.txt"; echo "   W-0.11 G6 m3: $(tail -1 "$REC/w011g6-m3-$v.txt")"
  done
  ;;
r9)
  node "$H/capture.mjs" "$D3_OUT/builds/minor3/dist" --out "$D3_OUT/caps/minor3-r9" --engines chromium --themes dark \
    --scenes ladder,dialog,held,hostile --inject "$V/r9-dark-head-w011.css" > "$REC/r9-capture.log" 2>&1; echo "capture r9 exit $? $(ts)"
  for w in m2-text-contrast:m2 m6-separable-ladder:m6; do node "$H/${w%%:*}.mjs" "$D3_OUT/caps/minor3-r9" --gate chromium --verbose > "$REC/verbose/${w##*:}-minor3-r9.txt" 2>&1; done
  node "$P3/MS-g7.mjs" dark "$REC/verbose/m6-head.txt" "$REC/verbose/m6-minor3-r9.txt" > "$REC/g6-dark-r9.txt"; tail -3 "$REC/g6-dark-r9.txt"
  # R-9's bite: a dark-veil change OUTSIDE W-0.11's tokens (the dark floating plate one step thinner) must red it.
  node "$H/capture.mjs" "$D3_OUT/builds/minor3/dist" --out "$D3_OUT/caps/minor3-r9plant" --engines chromium --themes dark \
    --scenes ladder,dialog,held,hostile --inject "$CV/r9-plant.css" > "$REC/r9plant-capture.log" 2>&1; echo "capture r9plant exit $? $(ts)"
  node "$H/m6-separable-ladder.mjs" "$D3_OUT/caps/minor3-r9plant" --gate chromium --verbose > "$REC/verbose/m6-minor3-r9plant.txt" 2>&1
  node "$P3/MS-g7.mjs" dark "$REC/verbose/m6-head.txt" "$REC/verbose/m6-minor3-r9plant.txt" > "$REC/g6-dark-r9plant.txt"; tail -3 "$REC/g6-dark-r9plant.txt"
  ;;
fl14)
  node "$H/capture.mjs" "$D3_OUT/builds/minor3/dist" --out "$D3_OUT/caps/minor3-fl14" --engines chromium --themes light,dark \
    --scenes ladder,dialog,held,hostile,halo,state --inject "$V/fl14.css" > "$REC/fl14-capture.log" 2>&1; echo "capture fl14 exit $? $(ts)"
  for w in stack-host:stack m3-non-text:m3 m2-text-contrast:m2 m1-no-grey:m1 m6-separable-ladder:m6; do
    node "$H/${w%%:*}.mjs" "$D3_OUT/caps/minor3-fl14" --gate chromium --verbose > "$REC/verbose/${w##*:}-minor3-fl14.txt" 2>&1; echo "fl14 ${w##*:}: $(tail -1 "$REC/verbose/${w##*:}-minor3-fl14.txt")"; done
  node "$P3/MS-g7.mjs" m2 "$REC/verbose/m2-head.txt" "$REC/verbose/m2-minor3-fl14.txt" > "$REC/fl14-g7-m2.txt"; tail -1 "$REC/fl14-g7-m2.txt"
  node "$P3/MS-g7.mjs" m3 "$REC/verbose/m3-head.txt" "$REC/verbose/m3-minor3-fl14.txt" > "$REC/fl14-g7-m3.txt"; tail -1 "$REC/fl14-g7-m3.txt"
  node "$P3/MS-g7.mjs" dark "$REC/verbose/m6-head.txt" "$REC/verbose/m6-minor3-fl14.txt" > "$REC/fl14-g6.txt"; tail -1 "$REC/fl14-g6.txt"
  ;;
rerun)
  # Each red or margin cell re-captured twice in its engine, its witnesses re-read. LABEL picks the build.
  e=${ENG:-chromium}; l=${LABEL:-minor3}
  for n in 1 2; do
    node "$H/capture.mjs" "$D3_OUT/builds/$l/dist" --out "$D3_OUT/caps/rerun-$l-$e$n" --engines $e --themes ${RERUN_THEMES:-light,dark} \
      --scenes "${RERUN_SCENES:-held,ladder,dialog}" --grounds "${RERUN_GROUNDS:-black,white,aurora,paper}" > "$REC/rerun-$l-$e$n-capture.log" 2>&1
    for w in ${RERUN_WITNESSES:-m2-text-contrast m3-non-text m2-held-window m6-separable-ladder}; do node "$H/$w.mjs" "$D3_OUT/caps/rerun-$l-$e$n" --gate $e --verbose > "$REC/verbose/rerun-$l-$e$n-$w.txt" 2>&1; echo "rerun $l $e $n $w $(ts): $(tail -1 "$REC/verbose/rerun-$l-$e$n-$w.txt")"; done
  done
  ;;
rerun-r18)
  # floor v4 + R-8's ladder (r18.css): the held cells re-captured twice (the dark halo leg reds at 18px), M-2h re-read.
  for n in 1 2; do
    node "$H/capture.mjs" "$D3_OUT/builds/fv4/dist" --out "$D3_OUT/caps/rerun-fv4r18-$n" --engines chromium --themes light,dark \
      --scenes held,ladder --grounds black,white,aurora,paper --inject "$V/r18.css" > "$REC/rerun-fv4r18-$n-capture.log" 2>&1
    node "$H/m2-held-window.mjs" "$D3_OUT/caps/rerun-fv4r18-$n" --gate chromium --verbose > "$REC/verbose/rerun-fv4r18-$n-m2h.txt" 2>&1
    echo "rerun fv4+r18 $n $(ts): $(tail -1 "$REC/verbose/rerun-fv4r18-$n-m2h.txt")"; grep -E "halo chromium" "$REC/verbose/rerun-fv4r18-$n-m2h.txt" | cut -c1-200
  done
  ;;
probe-one)
  # FV4-hover-probe.mjs on one tree: TREE=fv4|r4|r6lit, ENG=engines.
  t=${TREE:-r6lit}; e=${ENG:-chromium}; tree=$W; [ $t != fv4 ] && tree=$B/scratch/$t
  [ $t != fv4 ] && { [ -e "$tree/node_modules" ] || ln -s "$W/node_modules" "$tree/node_modules"; }
  node "$P5/FV4-hover-probe.mjs" "$tree" --label crit-$t --engines $e --out "$REC/hover-$t-$e.json" > "$REC/hover-$t-$e.log" 2>&1
  echo "probe $t $e exit $? $(ts)"; grep -E "^POINTER|^PARKED|^BARE|parked" "$REC/hover-$t-$e.log" | cut -c1-200
  ;;
toolchain)
  # T=fv4|minor3: typecheck, library build, dist-demo, units (vitest --maxWorkers=2), caches inside the worktree.
  t=${T:-fv4}; [ $t = minor3 ] && to_minor; cd "$W"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vite" };\n' > vite.crit.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vitest" };\n' > vitest.crit.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vite-demo" };\n' > vite.crit-demo.config.ts
  npx vue-tsc --noEmit > "$REC/tsc-app-$t.log" 2>&1; echo "typecheck app $t exit $? $(ts)"
  npx vite build --config vite.crit.config.ts > "$REC/libbuild-$t.log" 2>&1; echo "library build $t exit $? $(ts)"
  npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test-$t.log" 2>&1; echo "typecheck tests $t exit $? $(ts)"
  npx vite build --config vite.crit-demo.config.ts > "$REC/dist-demo-$t.log" 2>&1; echo "dist-demo $t exit $? $(ts)"
  npx vitest run --config vitest.crit.config.ts --maxWorkers=2 --testTimeout 240000 > "$REC/units-$t.log" 2>&1; echo "vitest $t exit $? $(ts)"
  grep -E "Test Files|Tests  " "$REC/units-$t.log"
  if [ $t = minor3 ]; then node scripts/verify-export-types.mjs > "$REC/verifier-minor3.log" 2>&1; echo "verifier minor3 exit $? $(ts)"; grep -oE "G-BUNDLE-RATCHET[^\"]*" "$REC/verifier-minor3.log" | head -1; fi
  rm -f vite.crit.config.ts vitest.crit.config.ts vite.crit-demo.config.ts
  [ $t = minor3 ] && to_floor; true
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; rm -rf "$B"; git -C "$R" worktree prune; ls -la "$R/.claude/worktrees/bl/D3/p5/"
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
