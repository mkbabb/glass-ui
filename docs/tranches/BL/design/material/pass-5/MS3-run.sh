#!/usr/bin/env bash
# MS3-run.sh · D3 pass 5, the minor split v3 (REGISTRY P4-6.2 step 3): every command this seat ran, by phase.
# minor v3 = pass-4/minor-split-v2.patch + R-6 (minor names; floor v4's held form) + R-7 (perimeter 0.54) + R-8 (the
# floating radius the search picks) + the demo copy; written whole as pass-5/minor-split-v3.patch.
# Scratch (worktree, builds, captures, caches) lives inside the worktree: $W/.d3out, $W/.cache-m3. Records: MS3-records/.
#   bash MS3-run.sh setup|check|static|builds|search|search-read|battery-cr|battery-wk|witnesses|baseline|head-cells|
#                   verbose|g67|r9|fl14|island|glance|rerun|toolchain|units-head|ratchet|roster|teardown
# Browser phases run under the machine guard; any phase that may launch Playwright WebKit under `--exclusive webkit`.
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p5/minor3
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P3=$M/pass-3
P4=$M/pass-4
P5=$M/pass-5
V=$P5/MS3-variants
REC=$P5/MS3-records
PATCH=$P5/minor-split-v3.patch
GW="$HOME/.claude/guard/guarded --timeout ${MS3_TIMEOUT:-90} --exclusive webkit --"
GC="$HOME/.claude/guard/guarded --timeout ${MS3_TIMEOUT:-90} --"
GL="$HOME/.claude/guard/guarded --light --timeout 20 --"
if [ -n "${MS3_INNER:-}" ]; then GW=""; GC=""; GL=""; fi
export D3_OUT=$W/.d3out
mkdir -p "$REC/verbose"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
same() { git -C "$W" diff HEAD --binary | cmp - "$PATCH" && echo "worktree = minor-split-v3.patch"; }
# One admission for several phases: `bash MS3-run.sh inner-c p1 p2 ...` (Chromium) or `inner-w p1 p2 ...` (WebKit lock).
if [ "${1:-}" = inner-c ] || [ "${1:-}" = inner-w ]; then
  if [ "$1" = inner-w ]; then EX="--timeout ${MS3_TIMEOUT:-90} --exclusive webkit"; else EX="--timeout ${MS3_TIMEOUT:-90}"; fi
  shift; exec "$HOME/.claude/guard/guarded" $EX -- env MS3_INNER=1 bash -c '
    for p in "$@"; do bash "$0" "$p" 2>&1 | tee -a "'"$REC"'/phase-$p.log"; done' "$P5/MS3-run.sh" "$@"
fi
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
setup)
  # Worktree at HEAD; node_modules a real directory of per-entry symlinks into the checkout's (caches stay inside).
  git -C "$R" worktree add --detach "$W" HEAD
  mkdir "$W/node_modules"; for e in $(ls -A "$R/node_modules"); do case $e in .vite|.cache|.tmp|.vitest|.vite-temp) ;; *) ln -s "$R/node_modules/$e" "$W/node_modules/$e";; esac; done
  ln -s "$R/tests-visual/node_modules" "$W/tests-visual/node_modules"
  git -C "$W" apply "$PATCH"; same
  ;;
check)
  same; git -C "$R" apply --check "$PATCH" && echo "git apply --check minor-split-v3.patch clean at $(git -C "$R" rev-parse --short HEAD)"
  git -C "$W" diff HEAD --shortstat
  ;;
static)
  # O-87 census (W-0.11 G1-G4), LIT (H5-2) and HOV (H5-3) on minor v3; HOV and the prose sweep on minor v2 (R-4 as built,
  # the plant); the census's own bite on the published 10.1.0 styles (W-0.11 G4's second half).
  node "$P4/lighting-census.mjs" "$W" > "$REC/census-minor3.log" 2>&1; echo "census minor3 exit $?: $(tail -1 "$REC/census-minor3.log")"
  t=$B/scratch/v1010; rm -rf "$t"; mkdir -p "$t"; git -C "$R" archive v10.1.0 src/styles | tar -x -C "$t"
  node "$P4/lighting-census.mjs" "$t" > "$REC/census-v1010.log" 2>&1; echo "census v10.1.0 exit $?: $(tail -1 "$REC/census-v1010.log")"
  grep -qx 'LIGHTING-CENSUS stacked=2 halo=2 blur=5 open=9' "$REC/census-v1010.log" && echo "W-0.11 G4 bite: exact line"
  node "$H/lighting-literals.mjs" --root "$W" > "$REC/LIT-static-minor3.log" 2>&1; echo "LIT exit $?: $(grep -o 'LIGHTING-LITERALS.*' "$REC/LIT-static-minor3.log" | tail -1)"
  node "$H/hover-fill-selected.mjs" --root "$W" > "$REC/HOV-minor3.log" 2>&1; echo "HOV minor3 exit $?: $(tail -1 "$REC/HOV-minor3.log")"
  p=$B/scratch/minor2; rm -rf "$p"; mkdir -p "$p"; git -C "$R" archive HEAD src demo tests vite.targets.ts | tar -x -C "$p"; (cd "$p" && patch -s -p1 < "$P4/minor-split-v2.patch")
  node "$H/hover-fill-selected.mjs" --root "$p" > "$REC/HOV-plant-minor2.log" 2>&1; echo "HOV minor2 (R-4 as built) exit $?: $(tail -1 "$REC/HOV-plant-minor2.log")"
  for t in "$W" "$p"; do echo "prose sweep $(basename $(dirname $t))/$(basename $t):"; grep -rn "hover cannot mint\|rung hover cannot\|hover FILL\|glass-quiet hover-lift\|earned.darken\|dynamic darken\|plate darken" "$t/src" "$t/demo/stories" | sed "s#$t/##"; done
  ;;
builds)
  # minor v3 (specimens + demo); then HEAD (the patch reversed) for the paired rows, the island and the glance; restored.
  same || exit 3
  node "$H/build.mjs" "$W" --label minor3 --demo; echo "minor3 built $(ts)"
  git -C "$W" apply -R "$PATCH" && test -z "$(git -C "$W" status --porcelain -- src demo tests)" && echo "worktree = HEAD"
  node "$H/build.mjs" "$W" --label head --demo; echo "head built $(ts)"
  git -C "$W" apply "$PATCH"; same || exit 3
  ;;
search)
  # R-8: the floating radius at 16 (as built), 17, 18, 19 (overlay = floating + 2), and the W-0.1 tree (W-0.11's values
  # backed out, both modes) as W-0.11 G6's reference. Chromium, both themes, the scenes M-1/M-2/M-3 read over a ground.
  for v in ${MS3_SEARCH:-w01ref r16 r17 r18 r19}; do
    inj=""; [ "$v" != r16 ] && inj="--inject $V/$v.css"
    node "$H/capture.mjs" "$D3_OUT/builds/minor3/dist" --out "$D3_OUT/caps/s-$v" --engines ${MS3_ENG:-chromium} --themes light,dark \
      --scenes ladder,dialog,held,hostile $inj > "$REC/search-$v-capture.log" 2>&1; echo "capture $v exit $? $(ts)"
  done
  ;;
search-read)
  for v in ${MS3_SEARCH:-w01ref r16 r17 r18 r19}; do
    for w in m2-text-contrast:m2 m3-non-text:m3 m1-no-grey:m1 m6-separable-ladder:m6; do
      node "$H/${w%%:*}.mjs" "$D3_OUT/caps/s-$v" --gate ${MS3_ENG:-chromium} --verbose > "$REC/verbose/${w##*:}-s-$v.txt" 2>&1; done
    echo "-- $v: $(tail -1 "$REC/verbose/m1-s-$v.txt") | $(grep -E 'chromium dark white dialog:' "$REC/verbose/m2-s-$v.txt" | grep -oE 'fg [0-9.]+–[0-9.]+' | head -1)"
    [ "$v" = w01ref ] && continue
    node "$P3/MS-g7.mjs" m2 "$REC/verbose/m2-s-w01ref.txt" "$REC/verbose/m2-s-$v.txt" > "$REC/w011g6-m2-$v.txt"; echo "   W-0.11 G6 m2: $(tail -1 "$REC/w011g6-m2-$v.txt")"
    node "$P3/MS-g7.mjs" m3 "$REC/verbose/m3-s-w01ref.txt" "$REC/verbose/m3-s-$v.txt" > "$REC/w011g6-m3-$v.txt"; echo "   W-0.11 G6 m3: $(tail -1 "$REC/w011g6-m3-$v.txt")"
  done
  ;;
battery-cr|battery-wk)
  # The whole H5 battery on minor v3, split by engine (H5 §3.1).
  same || exit 3
  if [ $phase = battery-cr ]; then e=chromium; else e=webkit; fi
  node "$H/run.mjs" "$W" --label minor3 --skip-build --engines $e > "$REC/minor3-run-$e.log" 2>&1; echo "exit $? $(ts)"; tail -26 "$REC/minor3-run-$e.log"
  ;;
witnesses)
  node "$H/run.mjs" "$W" --label minor3 --skip-build --skip-capture > "$REC/minor3-witnesses.log" 2>&1; tail -26 "$REC/minor3-witnesses.log"
  mkdir -p "$REC/minor3-results"; cp "$D3_OUT"/caps/minor3/results/*.log "$REC/minor3-results/" 2>/dev/null
  ;;
baseline)
  node "$H/baseline.mjs" "$D3_OUT/caps/minor3" --out "$REC/baseline-minor3.json" > "$REC/baseline-minor3.md"; cat "$REC/baseline-minor3.md"
  ;;
head-cells)
  node "$H/capture.mjs" "$D3_OUT/builds/head/dist" --out "$D3_OUT/caps/head" --engines "${ENG:-chromium}" --themes light,dark \
    --scenes ladder,dialog,held,hostile,claim,o66field,o66menu,halo,state > "$REC/head-cells-${ENG:-chromium}.log" 2>&1
  echo "exit $? $(ts)"; tail -3 "$REC/head-cells-${ENG:-chromium}.log"
  ;;
verbose)
  for l in head minor3; do
    for w in m2-text-contrast:m2 m3-non-text:m3 m6-separable-ladder:m6 m1-no-grey:m1 o66-field-row:o66 m2-held-window:m2h m1x-off-paper:m1x wa-no-signal:wa; do
      node "$H/${w%%:*}.mjs" "$D3_OUT/caps/$l" --gate chromium,webkit --verbose > "$REC/verbose/${w##*:}-$l.txt" 2>&1
    done
    echo "$l: $(tail -1 "$REC/verbose/m2-$l.txt") | $(tail -1 "$REC/verbose/m3-$l.txt") | $(tail -1 "$REC/verbose/m6-$l.txt")"
  done
  ;;
g67)
  node "$P3/MS-g7.mjs" m2 "$REC/verbose/m2-head.txt" "$REC/verbose/m2-minor3.txt" > "$REC/g7-m2.txt"; tail -2 "$REC/g7-m2.txt"
  node "$P3/MS-g7.mjs" m3 "$REC/verbose/m3-head.txt" "$REC/verbose/m3-minor3.txt" > "$REC/g7-m3.txt"; tail -2 "$REC/g7-m3.txt"
  node "$P3/MS-g7.mjs" dark "$REC/verbose/m6-head.txt" "$REC/verbose/m6-minor3.txt" > "$REC/g6-dark-m6-raw.txt"; tail -3 "$REC/g6-dark-m6-raw.txt"
  # W-0.11 G6 on the battery tree: against the W-0.1 tree (s-w01ref), the rows both captures carry.
  node "$P3/MS-g7.mjs" m2 "$REC/verbose/m2-s-w01ref.txt" "$REC/verbose/m2-minor3.txt" > "$REC/w011g6-m2-minor3.txt"; tail -1 "$REC/w011g6-m2-minor3.txt"
  node "$P3/MS-g7.mjs" m3 "$REC/verbose/m3-s-w01ref.txt" "$REC/verbose/m3-minor3.txt" > "$REC/w011g6-m3-minor3.txt"; tail -1 "$REC/w011g6-m3-minor3.txt"
  ;;
r9)
  # R-9: G6 read with W-0.11's dark values (shadow + blur) put back to 10.1.0's, dark only; G7 read on the same capture.
  node "$H/capture.mjs" "$D3_OUT/builds/minor3/dist" --out "$D3_OUT/caps/minor3-r9" --engines ${ENG:-chromium} --themes dark \
    --scenes ladder,dialog,held,hostile --inject "$V/r9-dark-head-w011.css" > "$REC/r9-capture-${ENG:-chromium}.log" 2>&1; echo "capture r9 exit $? $(ts)"
  for w in m2-text-contrast:m2 m6-separable-ladder:m6; do node "$H/${w%%:*}.mjs" "$D3_OUT/caps/minor3-r9" --gate ${ENG:-chromium} --verbose > "$REC/verbose/${w##*:}-minor3-r9-${ENG:-chromium}.txt" 2>&1; done
  node "$P3/MS-g7.mjs" dark "$REC/verbose/m6-head.txt" "$REC/verbose/m6-minor3-r9-${ENG:-chromium}.txt" > "$REC/g6-dark-m6-r9-${ENG:-chromium}.txt"; tail -3 "$REC/g6-dark-m6-r9-${ENG:-chromium}.txt"
  ;;
fl14)
  # FL-14's one declaration injected over minor v3: STACK, M-3 held, M-1 and the G6/G7 rows (light and dark).
  node "$H/capture.mjs" "$D3_OUT/builds/minor3/dist" --out "$D3_OUT/caps/minor3-fl14" --engines ${ENG:-chromium} --themes light,dark \
    --scenes ladder,dialog,held,hostile,halo,state --inject "$V/fl14.css" > "$REC/fl14-capture-${ENG:-chromium}.log" 2>&1; echo "capture fl14 exit $? $(ts)"
  for w in stack-host:stack m3-non-text:m3 m2-text-contrast:m2 m1-no-grey:m1 m6-separable-ladder:m6 m2-held-window:m2h; do
    node "$H/${w%%:*}.mjs" "$D3_OUT/caps/minor3-fl14" --gate ${ENG:-chromium} --verbose > "$REC/verbose/${w##*:}-minor3-fl14-${ENG:-chromium}.txt" 2>&1; echo "fl14 ${w##*:}: $(tail -1 "$REC/verbose/${w##*:}-minor3-fl14-${ENG:-chromium}.txt")"; done
  node "$P3/MS-g7.mjs" m2 "$REC/verbose/m2-head.txt" "$REC/verbose/m2-minor3-fl14-${ENG:-chromium}.txt" > "$REC/fl14-g7-m2.txt"; tail -1 "$REC/fl14-g7-m2.txt"
  node "$P3/MS-g7.mjs" m3 "$REC/verbose/m3-head.txt" "$REC/verbose/m3-minor3-fl14-${ENG:-chromium}.txt" > "$REC/fl14-g7-m3.txt"; tail -1 "$REC/fl14-g7-m3.txt"
  node "$P3/MS-g7.mjs" dark "$REC/verbose/m6-head.txt" "$REC/verbose/m6-minor3-fl14-${ENG:-chromium}.txt" > "$REC/fl14-g6.txt"; tail -1 "$REC/fl14-g6.txt"
  ;;
island)
  for l in head minor3; do e=${ENG:-chromium}; node "$P4/MS2-island.mjs" "$D3_OUT/builds/$l/dist" --label $l --engines $e --out "$REC/island-$l-$e.json" > "$REC/island-$l-$e.log" 2>&1; echo "island $l $e exit $? $(ts)"; done
  ;;
glance)
  e=${ENG:-chromium}
  node "$H/glance.mjs" --base "$D3_OUT/builds/head/dist" --route "$D3_OUT/builds/minor3/dist" --story-base "$D3_OUT/builds/head/demo" \
    --story-route "$D3_OUT/builds/minor3/demo" --out "$P5/glance-minor3" --name minor3 --require-delta --engine $e > "$REC/glance-$e.log" 2>&1
  echo "glance head->minor3 $e exit $? $(ts) · $(tail -1 "$REC/glance-$e.log")"
  ;;
rerun)
  # Every red cell's scenes re-captured twice in its engine (the machine law), its witnesses re-read.
  e=${ENG:-chromium}
  for n in 1 2; do
    node "$H/capture.mjs" "$D3_OUT/builds/minor3/dist" --out "$D3_OUT/caps/rerun-$e$n" --engines $e --themes ${RERUN_THEMES:-light,dark} \
      --scenes "${RERUN_SCENES:-held,ladder,dialog}" --grounds "${RERUN_GROUNDS:-black,white,aurora,paper}" > "$REC/rerun-$e$n-capture.log" 2>&1
    for w in ${RERUN_WITNESSES:-m2-text-contrast m3-non-text m2-held-window m6-separable-ladder}; do node "$H/$w.mjs" "$D3_OUT/caps/rerun-$e$n" --gate $e --verbose > "$REC/verbose/rerun-$e$n-$w.txt" 2>&1; echo "rerun $e $n $w $(ts): $(tail -1 "$REC/verbose/rerun-$e$n-$w.txt")"; done
  done
  ;;
toolchain)
  cd "$W"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-m3/vite" };\n' > vite.m3.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-m3/vitest" };\n' > vitest.m3.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-m3/vite-demo" };\n' > vite.m3-demo.config.ts
  npx vue-tsc --noEmit > "$REC/tsc-app.log" 2>&1; echo "typecheck app exit $? $(ts)"
  npx vite build --config vite.m3.config.ts > "$REC/libbuild.log" 2>&1; echo "library build exit $? $(ts)"
  npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test.log" 2>&1; echo "typecheck tests exit $? $(ts)"
  npx vite build --config vite.m3-demo.config.ts > "$REC/dist-demo.log" 2>&1; echo "dist-demo exit $? $(ts)"
  npx vitest run --config vitest.m3.config.ts --maxWorkers=2 --testTimeout 240000 > "$REC/units.log" 2>&1; echo "vitest exit $? $(ts)"
  grep -E "Test Files|Tests  |FAIL" "$REC/units.log" | head -20
  ;;
ratchet)
  cd "$W"; same || exit 3
  npx vite build --config vite.m3.config.ts > /dev/null 2>&1; node scripts/verify-export-types.mjs > "$REC/verifier.log" 2>&1; echo "verifier (minor3) exit $? $(ts)"
  grep -E "RATCHET|terminal|PRESENT|roster" "$REC/verifier.log" | head -8
  git apply -R "$PATCH"
  npx vite build --config vite.m3.config.ts > /dev/null 2>&1; node scripts/verify-export-types.mjs > "$REC/verifier-head.log" 2>&1; echo "verifier (HEAD) exit $? $(ts)"
  grep -E "RATCHET|terminal|PRESENT|roster" "$REC/verifier-head.log" | head -8
  git apply "$PATCH"; same; npx vite build --config vite.m3.config.ts > /dev/null 2>&1
  ;;
roster)
  # G5: the verifier with the datum rebound IN THE WORKTREE ONLY to minor v3's measured bytes, so its roster arm runs.
  cd "$W"; same || exit 3; n=$(grep -oE "forbidden: [0-9]+" "$REC/verifier.log" | grep -oE "[0-9]+"); echo "$n" > .bundle-ratchet
  node scripts/verify-export-types.mjs > "$REC/verifier-rebound.log" 2>&1; echo "verifier (minor3, datum $n in the worktree) exit $? $(ts)"
  git show HEAD:.bundle-ratchet > .bundle-ratchet; grep -oE '"terminal":"[A-Z]+"|"roster":\{[^}]*\}|"claims":[0-9]+|"declarations":[0-9]+|"css":[0-9]+' "$REC/verifier-rebound.log" | head -6
  git -C "$R" diff --stat v10.1.0 HEAD -- .published-roster; git -C "$W" diff --stat HEAD -- .published-roster; echo "roster diff above (empty = none)"
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; rm -rf "$B"; rmdir "$R/.claude/worktrees/bl/D3/p5/minor3" 2>/dev/null; ls "$R/.claude/worktrees/bl/D3/p5/"; git -C "$R" worktree prune
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
