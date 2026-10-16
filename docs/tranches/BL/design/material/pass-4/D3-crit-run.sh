#!/usr/bin/env bash
# D3-crit-run.sh · D3 pass 4, the fresh critic: every command this seat ran, by phase.
# Worktree .claude/worktrees/bl/D3/p4/crit/wt (removed at the end); builds, captures and caches in $W/.d3out, $W/.cache-crit.
# Records land in pass-4/crit-records/. Browser phases run under the guard (WebKit through --exclusive webkit).
#   bash D3-crit-run.sh builds|battery-fv3|plants|plants-read|battery-minor2|head-cells|...
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p4/crit
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P3=$M/pass-3
P4=$M/pass-4
REC=$P4/crit-records
FV3=$P4/floor-v3.patch
MS2=$P4/minor-split-v2.patch
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
phase=$1; shift
echo "== $phase start $(ts)"
case $phase in
builds)
  # floor v3, the minor v2, HEAD (each a clean apply on HEAD); floor v3 left applied.
  is "$FV3" || exit 3
  node "$H/build.mjs" "$W" --label fv3 --demo; echo "fv3 built $(ts)"
  git -C "$W" apply -R "$FV3" && git -C "$W" apply "$MS2" && is "$MS2" || exit 3
  node "$H/build.mjs" "$W" --label minor2 --demo; echo "minor2 built $(ts)"
  git -C "$W" apply -R "$MS2" && test -z "$(git -C "$W" status --porcelain -- src demo tests)" && echo "worktree = HEAD"
  node "$H/build.mjs" "$W" --label head --demo; echo "head built $(ts)"
  git -C "$W" apply "$FV3"; is "$FV3" || exit 3
  ;;
census)
  echo "-- floor v3 (worktree)"; node "$P4/lighting-census.mjs" "$W"; echo "exit $?"
  echo "-- HEAD (checkout src, read only)"; node "$P4/lighting-census.mjs" "$R"; echo "exit $?"
  ;;
battery-fv3)
  node "$H/run.mjs" "$W" --label fv3 --skip-build > "$REC/fv3-run.log" 2>&1; echo "exit $? $(ts)"; tail -30 "$REC/fv3-run.log"
  mkdir -p "$REC/fv3-results"; cp "$D3_OUT"/caps/fv3/results/*.log "$REC/fv3-results/"
  ;;
baseline-fv3)
  node "$H/baseline.mjs" "$D3_OUT/caps/fv3" --out "$REC/baseline-fv3.json" > "$REC/baseline-fv3.md"; tail -40 "$REC/baseline-fv3.md"
  ;;
readings-fv3)
  for e in chromium webkit; do
    for q in a c; do node "$H/m6-separable-ladder.mjs" "$D3_OUT/caps/fv3" --gate $e --q1 $q > "$REC/M-6-q1$q-$e.log" 2>&1; echo "M-6 --q1 $q $e: $(tail -1 "$REC/M-6-q1$q-$e.log")"; done
    node "$H/m1x-off-paper.mjs" "$D3_OUT/caps/fv3" --gate $e > "$REC/M-1x-a-$e.log" 2>&1; echo "M-1x (a) $e: $(tail -1 "$REC/M-1x-a-$e.log")"
    node "$H/m1x-off-paper.mjs" "$D3_OUT/caps/fv3" --gate $e --q11 b > "$REC/M-1x-q11b-$e.log" 2>&1; echo "M-1x --q11 b $e: $(tail -1 "$REC/M-1x-q11b-$e.log")"
  done
  ;;
plants)
  ids=${1:-plant-R1,plant-R2,probe-R2-35,plant-R3,plant-R4,var-q1c,var-q11b,plant-q1c-noroom}
  node "$P4/FV3-plants.mjs" "$D3_OUT/builds/fv3/dist" "$W" --out "$D3_OUT/plants" --only "$ids" | tee -a "$REC/plants.log"
  ;;
plants-read)
  PR=$REC/plants; mkdir -p "$PR"; echo "read $(ts)" > "$PR/readings.log"
  rd() { local id=$1 w=$2 tag=$3; shift 3; for e in chromium webkit; do
      node "$H/$w.mjs" "$D3_OUT/plants/$id" --gate $e "$@" > "$PR/$id-$tag-$e.log" 2>&1
      echo "$id | $tag | $e | $(tail -1 "$PR/$id-$tag-$e.log")" | tee -a "$PR/readings.log"; done; }
  rd plant-R1 m4-dock-register M-4 --cells dark
  rd plant-R2 m9-state-registers M-9 --cells dark
  rd probe-R2-35 m9-state-registers M-9 --cells dark
  rd plant-R3 o66-field-row O-66 --cells .
  rd plant-R4 o66-field-row O-66 --cells .
  rd plant-q1c-noroom m6-separable-ladder M-6-q1c --cells dark --q1 c
  rd var-q1c m6-separable-ladder M-6-q1c --q1 c
  rd var-q1c m6-separable-ladder M-6-q1a --q1 a
  rd var-q11b m1x-off-paper M-1x-q11b --q11 b
  rd var-q11b wa-no-signal W-A
  rd var-q11b m1-no-grey M-1
  echo "end $(ts)" >> "$PR/readings.log"
  ;;
floor-plants)
  # FL plants (pass-3/FV2-plants.mjs) re-captured on the floor v3 build, which FLOOR-V3 §9 left carried from floor v2
  is "$FV3" || exit 3
  node "$P3/FV2-plants.mjs" "$D3_OUT/builds/fv3/dist" "$W" --out "$D3_OUT/flplants" \
    --only plant-bound,plant-heldfloor,plant-carrierveil,plant-darkperim,plant-noisolation,risk-opaque-ancestor,diag-held-noveil | tee -a "$REC/floor-plants.log"
  FR=$REC/floor-plants; mkdir -p "$FR"; echo "read $(ts)" > "$FR/readings.log"
  fr() { local id=$1 w=$2 cells=$3; for e in chromium webkit; do
      node "$H/$w.mjs" "$D3_OUT/flplants/$id" --gate $e --cells "$cells" > "$FR/$id-$w-$e.log" 2>&1
      echo "$id | $w | $e | $(tail -1 "$FR/$id-$w-$e.log")" | tee -a "$FR/readings.log"; done; }
  fr plant-bound m2-text-contrast '(ladder|dialog)$'
  fr plant-heldfloor m2-text-contrast 'held$'
  fr plant-carrierveil m2-text-contrast 'held$'
  fr plant-darkperim m3-non-text 'dark'
  fr plant-noisolation m2-text-contrast 'held$'
  fr plant-noisolation stack-host 'held$'
  fr risk-opaque-ancestor m2-text-contrast 'held$'
  fr diag-held-noveil m2-held-window '.'
  echo "end $(ts)" >> "$FR/readings.log"
  ;;
toolchain-fv3)
  cd "$W"; is "$FV3" || exit 3
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vite" };\n' > vite.crit.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vitest" };\n' > vitest.crit.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vite-demo" };\n' > vite.crit-demo.config.ts
  npx vue-tsc --noEmit > "$REC/tsc-app.log" 2>&1; echo "typecheck app exit $? $(ts)"
  npx vite build --config vite.crit.config.ts > "$REC/libbuild.log" 2>&1; echo "library build exit $? $(ts)"
  npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test.log" 2>&1; echo "typecheck tests exit $? $(ts)"
  npx vite build --config vite.crit-demo.config.ts > "$REC/dist-demo.log" 2>&1; echo "dist-demo exit $? $(ts)"
  npx vitest run --config vitest.crit.config.ts --maxWorkers=2 --testTimeout 240000 > "$REC/units.log" 2>&1; echo "vitest exit $? $(ts)"
  grep -E "Test Files|Tests  " "$REC/units.log"
  rm -f vite.crit.config.ts vitest.crit.config.ts vite.crit-demo.config.ts
  ;;
g5-minor2)
  # G5: the verifier on the minor's library build (ratchet), then with the datum rebound IN THE WORKTREE ONLY (roster arm)
  cd "$W"; is "$FV3" || exit 3; git apply -R "$FV3" && git apply "$MS2" && is "$MS2" || exit 3
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-crit/vite" };\n' > vite.crit.config.ts
  npx vite build --config vite.crit.config.ts > /dev/null 2>&1; echo "minor2 library build exit $? $(ts)"
  node scripts/verify-export-types.mjs > "$REC/g5-verifier.log" 2>&1; echo "verifier exit $? $(ts)"; grep -oE "G-BUNDLE-RATCHET[^\"]*" "$REC/g5-verifier.log" | head -2
  n=$(grep -oE "forbidden: [0-9]+" "$REC/g5-verifier.log" | grep -oE "[0-9]+"); [ -n "$n" ] && echo "$n" > .bundle-ratchet
  node scripts/verify-export-types.mjs > "$REC/g5-verifier-rebound.log" 2>&1; echo "verifier (datum $n, worktree only) exit $? $(ts)"
  grep -oE '"terminal":"[A-Z]+"|"roster":\{[^}]*\}' "$REC/g5-verifier-rebound.log" | head -3
  git checkout -- .bundle-ratchet 2>/dev/null || git show HEAD:.bundle-ratchet > .bundle-ratchet
  git -C "$R" diff --quiet HEAD -- .published-roster && echo "checkout .published-roster unchanged"
  git diff HEAD --stat -- .published-roster | tail -1; echo "(minor patch touches .published-roster: $(grep -c 'published-roster' "$MS2"))"
  rm -f vite.crit.config.ts; git apply -R "$MS2" && git apply "$FV3"; is "$FV3"
  ;;
battery-minor2)
  git -C "$W" apply -R "$FV3" && git -C "$W" apply "$MS2" && is "$MS2" || exit 3
  node "$H/run.mjs" "$W" --label minor2 --skip-build > "$REC/minor2-run.log" 2>&1; echo "exit $? $(ts)"; tail -30 "$REC/minor2-run.log"
  mkdir -p "$REC/minor2-results"; cp "$D3_OUT"/caps/minor2/results/*.log "$REC/minor2-results/"
  git -C "$W" apply -R "$MS2" && git -C "$W" apply "$FV3"; is "$FV3"
  ;;
verbose-minor2)
  # minor gates: M-2/M-3/M-6/M-2h/M-1x/O-66/M-1/W-A verbose on HEAD's cells and the minor's; then G6/G7 (pass-3 MS-g7.mjs)
  mkdir -p "$REC/verbose"
  for l in head minor2; do
    for w in m2-text-contrast:m2 m3-non-text:m3 m6-separable-ladder:m6 m1-no-grey:m1 o66-field-row:o66 m2-held-window:m2h m1x-off-paper:m1x wa-no-signal:wa; do
      node "$H/${w%%:*}.mjs" "$D3_OUT/caps/$l" --gate chromium,webkit --verbose > "$REC/verbose/${w##*:}-$l.txt" 2>&1
    done
    echo "$l: $(tail -1 "$REC/verbose/m2-$l.txt") | $(tail -1 "$REC/verbose/m3-$l.txt") | $(tail -1 "$REC/verbose/m6-$l.txt")"
  done
  node "$P3/MS-g7.mjs" m2 "$REC/verbose/m2-head.txt" "$REC/verbose/m2-minor2.txt" > "$REC/g7-m2.txt"; tail -3 "$REC/g7-m2.txt"
  node "$P3/MS-g7.mjs" m3 "$REC/verbose/m3-head.txt" "$REC/verbose/m3-minor2.txt" > "$REC/g7-m3.txt"; tail -3 "$REC/g7-m3.txt"
  node "$P3/MS-g7.mjs" dark "$REC/verbose/m6-head.txt" "$REC/verbose/m6-minor2.txt" > "$REC/g6-dark-m6.txt"; tail -3 "$REC/g6-dark-m6.txt"
  ;;
rerun-minor2)
  # the minor's red cells re-captured twice (Chromium): G6 dark dock, G7 dark Dialog over white, M-3 black wells, M-2h
  for n in 1 2; do
    node "$H/capture.mjs" "$D3_OUT/builds/minor2/dist" --out "$D3_OUT/caps/minor2-rerun$n" --engines chromium --themes light,dark \
      --grounds paper,white,black,aurora --scenes ladder,dialog,held > "$REC/minor2-rerun$n-capture.log" 2>&1; echo "rerun $n exit $? $(ts)"
    for w in m2-text-contrast:m2 m3-non-text:m3 m6-separable-ladder:m6 m2-held-window:m2h; do
      node "$H/${w%%:*}.mjs" "$D3_OUT/caps/minor2-rerun$n" --gate chromium --verbose > "$REC/verbose/${w##*:}-minor2-rerun$n.txt" 2>&1; done
    node "$P3/MS-g7.mjs" m2 "$REC/verbose/m2-head.txt" "$REC/verbose/m2-minor2-rerun$n.txt" | grep -E "dark white dialog|^G7"
    node "$P3/MS-g7.mjs" dark "$REC/verbose/m6-head.txt" "$REC/verbose/m6-minor2-rerun$n.txt" | tail -2
    grep -E "chromium light black( held)?:" "$REC/verbose/m3-minor2-rerun$n.txt" | cut -c1-160
  done
  ;;
head-cells)
  node "$H/capture.mjs" "$D3_OUT/builds/head/dist" --out "$D3_OUT/caps/head" --engines chromium,webkit --themes light,dark \
    --scenes ladder,dialog,held,hostile,claim,o66field,o66menu,halo,state > "$REC/head-cells.log" 2>&1; echo "exit $? $(ts)"; tail -3 "$REC/head-cells.log"
  ;;
esac
echo "== $phase end $(ts)"
