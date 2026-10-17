#!/usr/bin/env bash
# D3-crit-run.sh · D3 pass 6, the fresh critic: every command this seat ran, by phase.
# One worktree (.claude/worktrees/bl/D3/p6/crit/wt, removed at the end). Floor v5 is applied by default; a phase that
# needs floor v4, the minor v4, the minor v3 or HEAD swaps the patch and swaps it back, each swap checked with cmp.
# Builds, captures and caches live in $W/.d3out and $W/.cache-crit. Records land in pass-6/crit-records/.
#   bash D3-crit-run.sh inner-c <phase>...   (one guarded admission, Chromium only, phases in order)
#   bash D3-crit-run.sh inner-w <phase>...   (one guarded --exclusive webkit admission)
#   bash D3-crit-run.sh inner-l <phase>...   (one guarded --light admission: static checks and witness reads, no browser)
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p6/crit
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P3=$M/pass-3
P4=$M/pass-4
P5=$M/pass-5
P6=$M/pass-6
REC=$P6/crit-records
FV4=$P5/floor-v4.patch
FV5=$P6/floor-v5.patch
MS3=$P5/minor-split-v3.patch
MS4=$P6/minor-split-v4.patch
V5=$P5/MS3-variants
V6=$P6/MS4-variants
CV=$P6/crit-variants
export D3_OUT=$W/.d3out
mkdir -p "$REC/verbose"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
cur() { for p in "$FV5" "$FV4" "$MS4" "$MS3"; do is "$p" >/dev/null && { echo "$p"; return; }; done; test -z "$(git -C "$W" status --porcelain -- src demo tests)" && echo HEAD; }
to() { local c; c=$(cur); [ "$c" = "$1" ] && return 0; [ "$c" != HEAD ] && git -C "$W" apply -R "$c"; [ "$1" != HEAD ] && git -C "$W" apply "$1"
  if [ "$1" = HEAD ]; then test -z "$(git -C "$W" status --porcelain -- src demo tests)" || exit 3; else is "$1" >/dev/null || exit 3; fi; echo "swapped to $(basename "$1")"; }
radii() { grep -E -- '--glass-blur-(wash|quiet|resting|floating|overlay)-radius:' "$W/src/styles/tokens/glass.css" | sed 's/^ *//'; }
R13='earned-darken clamp|earned darken|whole dynamic darken|darkens toward the ink in BOTH modes|darkened by whatever'
if [ "${1:-}" = inner-c ] || [ "${1:-}" = inner-w ] || [ "${1:-}" = inner-l ]; then
  case $1 in inner-w) EX="--timeout ${CRIT_TIMEOUT:-90} --exclusive webkit";; inner-l) EX="--light --timeout 30";; *) EX="--timeout ${CRIT_TIMEOUT:-90}";; esac
  shift; echo "queued $(ts) [$EX] for: $*" | tee -a "$REC/admissions.log"
  exec "$HOME/.claude/guard/guarded" $EX -- bash -c '
    echo "admitted $(date +%T) load $(sysctl -n vm.loadavg) for: $*" >> "'"$REC"'/admissions.log"
    for p in "$@"; do bash "$0" "$p" 2>&1 | tee -a "'"$REC"'/phase-$p.log"; done
    echo "ended $(date +%T) load $(sysctl -n vm.loadavg) for: $*" >> "'"$REC"'/admissions.log"' "$P6/D3-crit-run.sh" "$@"
fi
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
setup)
  mkdir -p "$B"; git -C "$R" worktree add --detach "$W" HEAD
  mkdir "$W/node_modules"; for e in $(ls -A "$R/node_modules"); do case $e in .vite|.cache|.tmp|.vitest|.vite-temp) ;; *) ln -s "$R/node_modules/$e" "$W/node_modules/$e";; esac; done
  [ -d "$R/tests-visual/node_modules" ] && ln -s "$R/tests-visual/node_modules" "$W/tests-visual/node_modules"
  echo "HEAD $(git -C "$R" rev-parse --short HEAD)"; git -C "$R" diff --stat f9267e35a HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster; echo "(source diff from f9267e35a above; empty = none)"
  # Composition: floor-v4 + R10 + R11 + R12 = floor-v5.patch; the minor v4 applies byte-identical.
  git -C "$W" apply "$FV4" && git -C "$W" apply "$P6/floor-v5-R10.diff" && git -C "$W" apply "$P6/floor-v5-R11.diff" && git -C "$W" apply "$P6/floor-v5-R12.diff" && is "$FV5" && echo "composition: floor-v4 + R10 + R11 + R12 = floor-v5.patch"
  to "$MS4"; to "$MS3"; to "$FV4"; to "$FV5"
  for p in "$FV5" "$MS4"; do git -C "$R" apply --check "$p" && echo "apply --check clean at HEAD: $(basename "$p") sha1 $(shasum "$p" | cut -c1-8)"; done
  ;;
static)
  S=$B/scratch; rm -rf "$S"; mkdir -p "$S"
  for t in fv5 fv4 minor4 minor3; do mkdir -p "$S/$t"; done
  to "$FV5"; cp -R "$W/src" "$W/demo" "$W/tests" "$S/fv5/"
  to "$FV4"; cp -R "$W/src" "$W/demo" "$W/tests" "$S/fv4/"; radii > "$REC/radii-fv4.txt"
  to "$MS4"; cp -R "$W/src" "$W/demo" "$W/tests" "$S/minor4/"; radii > "$REC/radii-minor4.txt"
  to "$MS3"; cp -R "$W/src" "$W/demo" "$W/tests" "$S/minor3/"
  to "$FV5"; radii > "$REC/radii-fv5.txt"
  mkdir -p "$S/v1010"; git -C "$R" archive v10.1.0 src/styles | tar -x -C "$S/v1010"
  node "$H/launch-law.mjs"; echo "LAW exit $?"
  for t in fv5 fv4 minor4; do echo "-- DEL $t"; node "$H/deleted-mechanisms.mjs" --root "$S/$t" --declare "$H/deletes-floor.json" | tail -9; echo "DEL $t exit ${PIPESTATUS[0]}"; done
  echo "-- LADDER fv5 vs minor4 (fixture)"; diff "$REC/radii-fv5.txt" "$REC/radii-minor4.txt"; echo "LADDER exit $?"
  echo "-- LADDER fv4 vs minor4 (plant)"; diff "$REC/radii-fv4.txt" "$REC/radii-minor4.txt"; echo "LADDER plant exit $?"
  for t in fv5 minor4 v1010; do node "$P4/lighting-census.mjs" "$S/$t" > "$REC/census-$t.log" 2>&1; echo "census $t exit $?: $(tail -1 "$REC/census-$t.log")"; done
  for t in fv5 minor4; do node "$H/lighting-literals.mjs" --root "$S/$t" > "$REC/LIT-static-$t.log" 2>&1; echo "LIT $t exit $?: $(grep -o 'LIGHTING-LITERALS.*' "$REC/LIT-static-$t.log" | tail -1)"; done
  for t in fv5 minor4 minor3; do node "$H/hover-fill-selected.mjs" --root "$S/$t" > "$REC/HOV-$t.log" 2>&1; echo "HOV $t exit $?: $(tail -1 "$REC/HOV-$t.log")"; done
  for t in minor4 minor3; do echo "-- R-13 grep $t: $(grep -rnE "$R13" "$S/$t/src" "$S/$t/demo" | wc -l | tr -d ' ') lines"; done
  for t in minor4 minor3; do echo "-- FL-14 static $t: $(sed -n '/^@utility glass-plate/,/^}/p' "$S/$t/src/styles/glass/veil.css" | grep -c 'isolation: isolate')"; done
  ;;
sweep)
  # The critic's own prose sweep, wider than DEL: every src/demo/tests sentence on floor v5 naming a word of the deleted
  # mechanism family, and on the minor v4 every light-false darken sentence. Printed in full for reading by hand.
  S=$B/scratch
  echo "== floor v5: clamp|sampl|luma|bucket|backdrop.?mode|backdropLuminance|measured backdrop|tint axis|knee|darken"
  grep -rniE "clamp|sampl(e|er|es|ing)|luma|bucket|backdrop.?mode|backdropLuminance|measured backdrop|tint axis|knee|darken" "$S/fv5/src" "$S/fv5/demo" | sed "s#$S/fv5/##" | grep -viE "sheet/|clamp\(|math\.|Math\.clamp|clampN|press" > "$REC/sweep-fv5.txt"; wc -l < "$REC/sweep-fv5.txt"
  echo "== minor v4: darken (dark-only sense)"
  grep -rniE "darken" "$S/minor4/src" "$S/minor4/demo/stories" | sed "s#$S/minor4/##" > "$REC/sweep-minor4-darken.txt"; wc -l < "$REC/sweep-minor4-darken.txt"
  echo "== files floor v5 touches"; git -C "$R" apply --numstat "$FV5" | awk '{print $3}' > "$REC/fv5-touched.txt"; wc -l < "$REC/fv5-touched.txt"
  echo "== files minor v4 touches"; git -C "$R" apply --numstat "$MS4" | awk '{print $3}' > "$REC/minor4-touched.txt"; wc -l < "$REC/minor4-touched.txt"
  ;;
builds)
  to "$FV5"; node "$H/build.mjs" "$W" --label fv5 --demo 2>&1 | tail -1; echo "fv5 built $(ts)"
  to "$FV4"; node "$H/build.mjs" "$W" --label fv4 --demo 2>&1 | tail -1; echo "fv4 built $(ts)"
  to "$MS4"; node "$H/build.mjs" "$W" --label minor4 --demo 2>&1 | tail -1; echo "minor4 built $(ts)"
  to "$MS3"; node "$H/build.mjs" "$W" --label minor3 --demo 2>&1 | tail -1; echo "minor3 built $(ts)"
  to HEAD; node "$H/build.mjs" "$W" --label head --demo 2>&1 | tail -1; echo "head built $(ts)"
  to "$FV5"
  for l in head fv4 fv5 minor3 minor4; do echo "$l specimen css bytes: $(cat "$D3_OUT"/builds/$l/dist/assets/*.css 2>/dev/null | wc -c | tr -d ' ')"; done
  ;;
battery-fv5-c|battery-fv5-w)
  to "$FV5"; e=chromium; [ $phase = battery-fv5-w ] && e=webkit
  node "$H/run.mjs" "$W" --label fv5 --skip-build --engines $e > "$REC/fv5-run-$e.log" 2>&1; echo "exit $? $(ts)"; tail -3 "$REC/fv5-run-$e.log"
  ;;
battery-minor4-c|battery-minor4-w)
  to "$MS4"; e=chromium; [ $phase = battery-minor4-w ] && e=webkit
  node "$H/run.mjs" "$W" --label minor4 --skip-build --engines $e > "$REC/minor4-run-$e.log" 2>&1; echo "exit $? $(ts)"; tail -3 "$REC/minor4-run-$e.log"
  to "$FV5"
  ;;
refs-c|refs-w)
  # HEAD's cells (G7), the W-0.1 tree (W-0.11 G6), R-9 (dark; Chromium) over the minor v4 build.
  e=chromium; [ $phase = refs-w ] && e=webkit
  node "$H/capture.mjs" "$D3_OUT/builds/head/dist" --out "$D3_OUT/caps/head" --engines $e --themes light,dark \
    --scenes ladder,dialog,held,hostile,claim,o66field,o66menu,halo,state > "$REC/head-cells-$e.log" 2>&1; echo "head cells $e exit $? $(ts)"
  node "$H/capture.mjs" "$D3_OUT/builds/minor4/dist" --out "$D3_OUT/caps/s-w01ref" --engines $e --themes light,dark \
    --scenes ladder,dialog,held,hostile --inject "$V5/w01ref.css" > "$REC/w01ref-capture-$e.log" 2>&1; echo "w01ref $e exit $? $(ts)"
  if [ $e = chromium ]; then
    node "$H/capture.mjs" "$D3_OUT/builds/minor4/dist" --out "$D3_OUT/caps/minor4-r9" --engines chromium --themes dark \
      --scenes ladder,dialog,held,hostile --inject "$V5/r9-dark-head-w011.css" > "$REC/r9-capture.log" 2>&1; echo "r9 exit $? $(ts)"
    node "$H/capture.mjs" "$D3_OUT/builds/minor4/dist" --out "$D3_OUT/caps/minor4-nofl14" --engines chromium --themes light,dark \
      --scenes held,halo,state --inject "$V6/nofl14.css" > "$REC/nofl14-capture.log" 2>&1; echo "nofl14 exit $? $(ts)"
  fi
  ;;
plants-fv5)
  # Every R plant, the owner variants and the floor plants over the critic's floor v5 build; both engines (inner-w).
  to "$FV5"
  node "$P4/FV3-plants.mjs" "$D3_OUT/builds/fv5/dist" "$W" --out "$D3_OUT/plants" --only "plant-R1,plant-R2,plant-R3,plant-R4,var-q1c,var-q11b,plant-q1c-noroom" > "$REC/plants.log" 2>&1; echo "FV3-plants exit $? $(ts)"
  node "$P3/FV2-plants.mjs" "$D3_OUT/builds/fv5/dist" "$W" --out "$D3_OUT/flplants" --only "plant-bound,plant-heldfloor,plant-carrierveil,plant-darkperim,plant-noisolation,diag-held-noveil" > "$REC/floor-plants.log" 2>&1; echo "FV2-plants exit $? $(ts)"
  ;;
plant-minor4)
  node "$P3/FV2-plants.mjs" "$D3_OUT/builds/minor4/dist" "$W" --out "$D3_OUT/m4plants" --only plant-noisolation > "$REC/minor4-plant-noisolation.log" 2>&1; echo "minor4 plant-noisolation exit $? $(ts)"
  ;;
witnesses)
  to "$FV5"; node "$H/run.mjs" "$W" --label fv5 --skip-build --skip-capture > "$REC/fv5-witnesses.log" 2>&1; tail -30 "$REC/fv5-witnesses.log"
  mkdir -p "$REC/fv5-results"; cp "$D3_OUT"/caps/fv5/results/*.log "$REC/fv5-results/"
  node "$H/baseline.mjs" "$D3_OUT/caps/fv5" --out "$REC/baseline-fv5.json" > "$REC/baseline-fv5.md"
  echo "diff seat baseline-fv5.md vs critic:"; diff "$P6/FV5-records/baseline-fv5.md" "$REC/baseline-fv5.md" && echo "(identical)"
  to "$MS4"; node "$H/run.mjs" "$W" --label minor4 --skip-build --skip-capture > "$REC/minor4-witnesses.log" 2>&1; tail -30 "$REC/minor4-witnesses.log"; to "$FV5"
  mkdir -p "$REC/minor4-results"; cp "$D3_OUT"/caps/minor4/results/*.log "$REC/minor4-results/"
  node "$H/baseline.mjs" "$D3_OUT/caps/minor4" --out "$REC/baseline-minor4.json" > "$REC/baseline-minor4.md"
  echo "diff seat baseline-minor4.md vs critic:"; diff "$P6/MS4-records/baseline-minor4.md" "$REC/baseline-minor4.md" && echo "(identical)"
  ;;
readings)
  for e in chromium webkit; do
    for q in a c; do node "$H/m6-separable-ladder.mjs" "$D3_OUT/caps/fv5" --gate $e --q1 $q > "$REC/M-6-q1$q-$e.log" 2>&1; echo "fv5 M-6 --q1 $q $e: $(tail -1 "$REC/M-6-q1$q-$e.log")"; done
    node "$H/m1x-off-paper.mjs" "$D3_OUT/caps/fv5" --gate $e > "$REC/M-1x-a-$e.log" 2>&1; echo "fv5 M-1x (a) $e: $(tail -1 "$REC/M-1x-a-$e.log")"
    node "$H/m1x-off-paper.mjs" "$D3_OUT/caps/fv5" --gate $e --q11 b > "$REC/M-1x-q11b-$e.log" 2>&1; echo "fv5 M-1x --q11 b $e: $(tail -1 "$REC/M-1x-q11b-$e.log")"
    node "$H/m9-state-registers.mjs" "$D3_OUT/caps/fv5" --gate $e > "$REC/M-9-$e.log" 2>&1; echo "fv5 M-9 $e: $(tail -1 "$REC/M-9-$e.log")"
    node "$H/m1x-off-paper.mjs" "$D3_OUT/caps/minor4" --gate $e > "$REC/minor4-M-1x-a-$e.log" 2>&1; echo "minor4 M-1x (a) $e: $(tail -1 "$REC/minor4-M-1x-a-$e.log")"
  done
  for w in m2-text-contrast:m2 m3-non-text:m3 m6-separable-ladder:m6 m2-held-window:m2h m1-no-grey:m1 o66-field-row:o66 stack-host:stack m9-state-registers:m9; do
    for l in fv5 minor4; do node "$H/${w%%:*}.mjs" "$D3_OUT/caps/$l" --gate chromium,webkit --verbose > "$REC/verbose/${w##*:}-$l.txt" 2>&1; done; done
  ;;
g67)
  for l in head s-w01ref minor4-nofl14; do for w in m2-text-contrast:m2 m3-non-text:m3 m6-separable-ladder:m6 m1-no-grey:m1 stack-host:stack; do
    node "$H/${w%%:*}.mjs" "$D3_OUT/caps/$l" --gate chromium,webkit --verbose > "$REC/verbose/${w##*:}-$l.txt" 2>&1; done; done
  for w in m2-text-contrast:m2 m6-separable-ladder:m6; do node "$H/${w%%:*}.mjs" "$D3_OUT/caps/minor4-r9" --gate chromium --verbose > "$REC/verbose/${w##*:}-minor4-r9.txt" 2>&1; done
  g() { node "$P3/MS-g7.mjs" "$1" "$REC/verbose/$2" "$REC/verbose/$3" > "$REC/$4"; echo "$4: $(tail -1 "$REC/$4")"; }
  g m2 m2-head.txt m2-minor4.txt g7-m2.txt
  g m3 m3-head.txt m3-minor4.txt g7-m3.txt
  g dark m6-head.txt m6-minor4.txt g6-dark-raw.txt
  g dark m6-head.txt m6-minor4-r9.txt g6-dark-r9.txt
  g m2 m2-s-w01ref.txt m2-minor4.txt w011g6-m2.txt
  g m3 m3-s-w01ref.txt m3-minor4.txt w011g6-m3.txt
  ;;
plants-read)
  PR=$REC/plants; mkdir -p "$PR"; echo "read $(ts)" > "$PR/readings.log"
  rd() { local d=$1 id=$2 w=$3 tag=$4; shift 4; for e in ${RD_ENGINES:-chromium webkit}; do
      node "$H/$w.mjs" "$D3_OUT/$d/$id" --gate $e "$@" > "$PR/$id-$tag-$e.log" 2>&1
      echo "$id | $tag | $e | $(tail -1 "$PR/$id-$tag-$e.log")" | tee -a "$PR/readings.log"; done; }
  rd plants plant-R1 m4-dock-register M-4 --cells dark
  rd plants plant-R2 m9-state-registers M-9 --cells dark
  rd plants plant-R3 o66-field-row O-66 --cells .
  rd plants plant-R4 o66-field-row O-66 --cells .
  rd plants plant-q1c-noroom m6-separable-ladder M-6-q1c --cells dark --q1 c
  rd plants var-q1c m6-separable-ladder M-6-q1c --q1 c
  rd plants var-q1c m6-separable-ladder M-6-q1a --q1 a
  rd plants var-q11b m1x-off-paper M-1x-q11b --q11 b
  rd plants var-q11b wa-no-signal W-A-q11b --q11 b
  rd plants var-q11b m1-no-grey M-1
  rd flplants plant-bound m2-text-contrast M-2 --cells '(ladder|dialog)$'
  rd flplants plant-heldfloor m2-text-contrast M-2 --cells 'held$'
  rd flplants plant-carrierveil m2-text-contrast M-2 --cells 'held$'
  rd flplants plant-darkperim m3-non-text M-3 --cells dark
  rd flplants plant-noisolation m2-text-contrast M-2 --cells 'held$'
  rd flplants plant-noisolation stack-host STACK --cells 'held$'
  RD_ENGINES=chromium rd flplants diag-held-noveil m2-held-window M-2h --cells . --verbose
  rd m4plants plant-noisolation stack-host STACK-minor4 --cells 'held$'
  rd m4plants plant-noisolation m3-non-text M-3-minor4 --cells 'held$'
  echo "end $(ts)" >> "$PR/readings.log"
  ;;
demo-c)
  # R-12: the seats' gated probe, then the critic's own legs (keyboard after pointer; pointer leaving the list).
  for l in fv5 fv4 minor4 minor3; do node "$P6/FV5-demo-probe.mjs" "$D3_OUT/builds/$l/demo" --label $l --engines chromium --shots "$P6/crit-frames" --out "$REC/demo-$l-chromium.json" > "$REC/demo-$l-chromium.log" 2>&1; echo "demo-probe $l exit $? $(ts)"; grep -E '^DEMO' "$REC/demo-$l-chromium.log"; done
  for l in fv5 minor4 fv4; do node "$P6/crit-demo-probe.mjs" "$D3_OUT/builds/$l/demo" --label $l --engines chromium --shots "$P6/crit-frames" --out "$REC/critdemo-$l-chromium.json" > "$REC/critdemo-$l-chromium.log" 2>&1; echo "crit-demo $l exit $? $(ts)"; grep -E '^CRIT' "$REC/critdemo-$l-chromium.log"; done
  ;;
ringprobe)
  # Row 6: the Close ring's band read per pixel row in the shell, with the ring's computed colour (CV/ringprobe.mjs).
  for l in fv5 minor4 head; do node "$P6/crit-ringprobe.mjs" "$D3_OUT/builds/$l/dist" --label $l --engines ${ENG:-chromium} --out "$REC/ring-$l-${ENG:-chromium}.json" > "$REC/ring-$l-${ENG:-chromium}.log" 2>&1; echo "ring $l exit $? $(ts)"; grep -E '^RING' "$REC/ring-$l-${ENG:-chromium}.log"; done
  ;;
ringread)
  # Row 6: the battery's own ring PNGs (the pixels M-3 scored), per column, light and dark, no browser (crit-ringread.mjs).
  for l in fv5 minor4; do for th in light dark; do node "$P6/crit-ringread.mjs" "$D3_OUT/caps/$l" --theme $th --engine ${ENG:-chromium} --grounds paper,white,black > "$REC/ringread-$l-$th-${ENG:-chromium}.log" 2>&1; echo "ringread $l $th exit $?"; done; done
  ;;
rerun)
  e=${ENG:-chromium}; l=${LABEL:-fv5}
  for n in 1 2; do
    node "$H/capture.mjs" "$D3_OUT/builds/$l/dist" --out "$D3_OUT/caps/rerun-$l-$e$n" --engines $e --themes ${RERUN_THEMES:-light,dark} \
      --scenes "${RERUN_SCENES:-held,ladder,dialog}" --grounds "${RERUN_GROUNDS:-black,white,aurora,paper}" > "$REC/rerun-$l-$e$n-capture.log" 2>&1
    for w in ${RERUN_WITNESSES:-m3-non-text m2-held-window m6-separable-ladder}; do node "$H/$w.mjs" "$D3_OUT/caps/rerun-$l-$e$n" --gate $e --verbose > "$REC/verbose/rerun-$l-$e$n-$w.txt" 2>&1; echo "rerun $l $e $n $w $(ts): $(tail -1 "$REC/verbose/rerun-$l-$e$n-$w.txt")"; done
  done
  ;;
toolchain)
  t=${T:-fv5}; [ $t = minor4 ] && to "$MS4"; [ $t = fv5 ] && to "$FV5"; cd "$W"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vite" };\n' > vite.crit.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vitest" };\n' > vitest.crit.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vite-demo" };\n' > vite.crit-demo.config.ts
  npx vue-tsc --noEmit > "$REC/tsc-app-$t.log" 2>&1; echo "typecheck app $t exit $? $(ts)"
  npx vite build --config vite.crit.config.ts > "$REC/libbuild-$t.log" 2>&1; echo "library build $t exit $? $(ts)"
  npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test-$t.log" 2>&1; echo "typecheck tests $t exit $? $(ts)"
  npx vite build --config vite.crit-demo.config.ts > "$REC/dist-demo-$t.log" 2>&1; echo "dist-demo $t exit $? $(ts)"
  npx vitest run --config vitest.crit.config.ts --maxWorkers=2 --testTimeout 240000 > "$REC/units-$t.log" 2>&1; echo "vitest $t exit $? $(ts)"
  grep -E "Test Files|Tests  " "$REC/units-$t.log"
  if [ $t = minor4 ]; then node scripts/verify-export-types.mjs > "$REC/verifier-minor4.log" 2>&1; echo "verifier minor4 exit $? $(ts)"; grep -oE "G-BUNDLE-RATCHET[^\"]*" "$REC/verifier-minor4.log" | head -1
    git -C "$R" diff --stat v10.1.0 HEAD -- .published-roster; git -C "$W" diff --stat HEAD -- .published-roster; echo "(roster diffs above; empty = none)"; fi
  rm -f vite.crit.config.ts vitest.crit.config.ts vite.crit-demo.config.ts
  cd "$R"; to "$FV5"
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; rm -rf "$B"; git -C "$R" worktree prune; ls -la "$R/.claude/worktrees/bl/D3/p6/"
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
