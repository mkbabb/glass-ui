#!/usr/bin/env bash
# MS2-run.sh · D3 pass 4, the minor split v2 (REGISTRY P3-5.2 step 3): every command this seat ran, by phase.
# Scratch (worktree, builds, captures, caches) lives inside the worktree: $W/.d3out, $W/.cache-m2. Records land in
# pass-4/MS2-records/. Browser and build phases run under the machine guard (WebKit through `--exclusive webkit`);
# vitest at 2 workers. Browser phases need a process that may register Mach ports (the Bash sandbox refuses them).
#   bash MS2-run.sh setup|check|census|builds|battery-chromium|battery-webkit|witnesses|head-cells|verbose|g67|
#                   island|glance|toolchain|ratchet|teardown
# Seat history: a first entry (2026-10-15 19:09-21:36) wrote the patch, built, and ran the Chromium battery; its
# worktree was removed mid-way through the WebKit battery, so every capture was lost. This entry reviewed the patch,
# corrected the perimeter prose, and re-ran every phase from `builds` on.
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p4/minor2
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P3=$M/pass-3
P4=$M/pass-4
REC=$P4/MS2-records
PATCH=$P4/minor-split-v2.patch
G="$HOME/.claude/guard/guarded --timeout 55 --exclusive webkit --"   # any phase that may launch Playwright WebKit
GC="$HOME/.claude/guard/guarded --timeout 55 --"                      # Chromium-only browser phases
GB="$HOME/.claude/guard/guarded --timeout 30 --"                      # builds and units (no browser)
GL="$HOME/.claude/guard/guarded --light --timeout 20 --"              # light commands
# `rest-c` / `rest-w`: the remaining heavy phases inside two guard admissions (the queue held single admissions ~19 min
# each at load 25-55); the inner phases then run unguarded (MS2_INNER=1). A first single admission under the WebKit lock
# for every phase was cancelled unadmitted after 30 min: it would have held the machine-wide WebKit lock for hours.
if [ -n "${MS2_INNER:-}" ]; then G=""; GC=""; GB=""; GL=""; fi
export D3_OUT=$W/.d3out
mkdir -p "$REC"
if [ "${1:-}" = rest-c ] || [ "${1:-}" = rest-w ]; then
  # rest-c: Chromium and toolchain phases, one plain admission; rest-w: the WebKit phases, one admission under the lock.
  if [ "$1" = rest-w ]; then EX="--timeout 150 --exclusive webkit"; else EX="--timeout 150"; fi
  shift; exec "$HOME/.claude/guard/guarded" $EX -- env MS2_INNER=1 bash -c '
    for p in "$@"; do bash "$0" "$p" 2>&1 | tee -a "'"$REC"'/phase-$p.log"; done' "$P4/MS2-run.sh" "$@"
fi
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
same() { git -C "$W" diff HEAD --binary | cmp - "$PATCH" && echo "worktree = minor-split-v2.patch"; }
phase=$1; shift
echo "== $phase start $(ts)"
case $phase in
setup)
  # The pass-3 light arm, then the seat's edits (R-3, R-4 in minor names; perimeter 0.52; FL-10; FL-7's held value;
  # W-0.11's blur ladder and shadow census values; the pinned test arms; the perimeter prose), recorded as one patch.
  git -C "$R" worktree add --detach "$W" HEAD
  ln -s "$R/node_modules" "$W/node_modules"; ln -s "$R/tests-visual/node_modules" "$W/tests-visual/node_modules"
  git -C "$W" apply "$PATCH"; same
  # the v2-over-v1 delta, for review: stage v1 in the worktree's own index, swap to v2, diff
  (cd "$W" && git apply -R "$PATCH" && git apply "$P3/minor-split.patch" && git add -A src tests \
     && git apply -R "$P3/minor-split.patch" && git apply "$PATCH" && git diff > "$B/delta-v2-over-v1.diff"; git reset -q)
  ;;
check)
  same; git -C "$R" apply --check "$PATCH" && echo "git apply --check minor-split-v2.patch clean at $(git -C "$R" rev-parse --short HEAD)"
  git -C "$W" diff HEAD --shortstat
  ;;
census)
  echo "-- minor v2"; node "$P4/lighting-census.mjs" "$W"; echo "exit $?"
  echo "-- the 10.1.0 tokens (HEAD's src, read only)"; node "$P4/lighting-census.mjs" "$R"; echo "exit $?"
  ;;
builds)
  # minor v2; then HEAD (the patch reversed) for the paired rows, the island and the glance; minor v2 restored.
  same || exit 3
  $GB node "$H/build.mjs" "$W" --label minor2 --demo; echo "minor2 built $(ts)"
  git -C "$W" apply -R "$PATCH" && test -z "$(git -C "$W" status --porcelain -- src demo tests)" && echo "worktree = HEAD"
  $GB node "$H/build.mjs" "$W" --label head --demo; echo "head built $(ts)"
  git -C "$W" apply "$PATCH"; same || exit 3
  ;;
battery-chromium)
  # The whole H4 battery on the minor v2 build, Chromium half: every cell, live, motion, drift, the three retunes and
  # noclaim. capture.mjs merges cells.json per cell, so the WebKit half adds to the same capture.
  $GC node "$H/run.mjs" "$W" --label minor2 --skip-build --engines chromium > "$REC/minor2-run-chromium.log" 2>&1
  echo "exit $? $(ts)"; tail -26 "$REC/minor2-run-chromium.log"
  ;;
battery-webkit)
  $G node "$H/run.mjs" "$W" --label minor2 --skip-build --engines webkit > "$REC/minor2-run-webkit.log" 2>&1
  echo "exit $? $(ts)"; tail -26 "$REC/minor2-run-webkit.log"
  ;;
witnesses)
  # every witness on the merged two-engine capture, then the per-engine table
  node -e 'import(process.argv[1]).then((m) => { const r = m.runWitnesses(process.argv[2]); })' "$H/run.mjs" "$D3_OUT/caps/minor2" > "$REC/minor2-witnesses.log" 2>&1
  tail -26 "$REC/minor2-witnesses.log"
  mkdir -p "$REC/minor2-results"; cp "$D3_OUT"/caps/minor2/results/*.log "$REC/minor2-results/" 2>/dev/null
  node "$H/baseline.mjs" "$D3_OUT/caps/minor2" --out "$REC/baseline-minor2.json" > "$REC/baseline-minor2.md"; echo "baseline exit $?"
  ;;
head-cells)
  # HEAD (10.1.0) under H4 on the cells the paired G6/G7 rows read, both engines and themes.
  $G node "$H/capture.mjs" "$D3_OUT/builds/head/dist" --out "$D3_OUT/caps/head" --engines "${ENG:-chromium,webkit}" --themes light,dark \
    --scenes ladder,dialog,held,hostile,claim,o66field,o66menu,halo,state > "$REC/head-cells-${ENG:-both}.log" 2>&1
  echo "exit $? $(ts)"; tail -3 "$REC/head-cells-${ENG:-both}.log"
  ;;
verbose)
  mkdir -p "$REC/verbose"
  for l in head minor2; do
    for w in m2-text-contrast:m2 m3-non-text:m3 m6-separable-ladder:m6 m1-no-grey:m1 o66-field-row:o66 m2-held-window:m2h m1x-off-paper:m1x wa-no-signal:wa; do
      node "$H/${w%%:*}.mjs" "$D3_OUT/caps/$l" --gate chromium,webkit --verbose > "$REC/verbose/${w##*:}-$l.txt" 2>&1
    done
    echo "$l: $(tail -1 "$REC/verbose/m2-$l.txt") | $(tail -1 "$REC/verbose/m3-$l.txt") | $(tail -1 "$REC/verbose/m6-$l.txt")"
  done
  ;;
g67)
  node "$P3/MS-g7.mjs" m2 "$REC/verbose/m2-head.txt" "$REC/verbose/m2-minor2.txt" > "$REC/g7-m2.txt"; tail -2 "$REC/g7-m2.txt"
  node "$P3/MS-g7.mjs" m3 "$REC/verbose/m3-head.txt" "$REC/verbose/m3-minor2.txt" > "$REC/g7-m3.txt"; tail -2 "$REC/g7-m3.txt"
  node "$P3/MS-g7.mjs" dark "$REC/verbose/m6-head.txt" "$REC/verbose/m6-minor2.txt" > "$REC/g6-dark-m6.txt"; tail -1 "$REC/g6-dark-m6.txt"
  ;;
island)
  for l in head minor2; do e=${ENG:-chromium,webkit}; $G node "$P4/MS2-island.mjs" "$D3_OUT/builds/$l/dist" --label $l --engines $e --out "$REC/island-$l-${e/,/-}.json" > "$REC/island-$l-${e/,/-}.log" 2>&1; echo "island $l $e exit $? $(ts)"; done
  ;;
glance)
  for e in ${ENG:-chromium webkit}; do
    $G node "$H/glance.mjs" --base "$D3_OUT/builds/head/dist" --route "$D3_OUT/builds/minor2/dist" --story-base "$D3_OUT/builds/head/demo" \
      --story-route "$D3_OUT/builds/minor2/demo" --out "$P4/glance-minor2" --name minor2 --require-delta --engine $e > "$REC/glance-$e.log" 2>&1
    echo "glance head->minor2 $e exit $? $(ts) · $(tail -1 "$REC/glance-$e.log")"
  done
  ;;
toolchain)
  # Wrapper configs keep every cache inside the worktree (the node_modules symlink points into the checkout).
  cd "$W"
  printf 'import base from "./vite.config";\nexport default { ...(base as object), cacheDir: ".cache-m2/vite" };\n' > vite.m2.config.ts
  printf 'import base from "./vitest.config";\nexport default { ...(base as object), cacheDir: ".cache-m2/vitest" };\n' > vitest.m2.config.ts
  printf 'import base from "./demo/vite.demo-dist.config";\nexport default { ...(base as object), cacheDir: ".cache-m2/vite-demo" };\n' > vite.m2-demo.config.ts
  $GL npx vue-tsc --noEmit > "$REC/tsc-app.log" 2>&1; echo "typecheck app exit $? $(ts)"
  $GB npx vite build --config vite.m2.config.ts > "$REC/libbuild.log" 2>&1; echo "library build exit $? $(ts)"
  $GL npx vue-tsc --noEmit -p tsconfig.test.json > "$REC/tsc-test.log" 2>&1; echo "typecheck tests exit $? $(ts)"
  $GB npx vite build --config vite.m2-demo.config.ts > "$REC/dist-demo.log" 2>&1; echo "dist-demo exit $? $(ts)"
  $GB npx vitest run --config vitest.m2.config.ts --maxWorkers=2 --testTimeout 240000 > "$REC/units.log" 2>&1; echo "vitest exit $? $(ts)"
  grep -E "Test Files|Tests  " "$REC/units.log"
  ;;
units-head)
  # The same suite on HEAD's src (the patch reversed), so the landing debt is the difference; minor v2 restored.
  cd "$W"; same || exit 3; git apply -R "$PATCH"
  $GB npx vite build --config vite.m2.config.ts > "$REC/libbuild-head.log" 2>&1; echo "library build (HEAD) exit $? $(ts)"
  $GB npx vitest run --config vitest.m2.config.ts --maxWorkers=2 --testTimeout 240000 > "$REC/units-head.log" 2>&1; echo "vitest (HEAD) exit $? $(ts)"
  grep -E "Test Files|Tests  " "$REC/units-head.log"
  git apply "$PATCH"; same
  ;;
ratchet)
  # The bundle ratchet: the verifier on minor v2's library build, then on HEAD's; minor v2 restored and rebuilt.
  cd "$W"; same || exit 3
  $GB npx vite build --config vite.m2.config.ts > /dev/null 2>&1; $GB node scripts/verify-export-types.mjs > "$REC/verifier.log" 2>&1; echo "verifier (minor2) exit $? $(ts)"
  grep -E "RATCHET|terminal|PRESENT|roster" "$REC/verifier.log" | head -8
  git apply -R "$PATCH"
  $GB npx vite build --config vite.m2.config.ts > /dev/null 2>&1; $GB node scripts/verify-export-types.mjs > "$REC/verifier-head.log" 2>&1; echo "verifier (HEAD) exit $? $(ts)"
  grep -E "RATCHET|terminal|PRESENT|roster" "$REC/verifier-head.log" | head -8
  git apply "$PATCH"; same; $GB npx vite build --config vite.m2.config.ts > /dev/null 2>&1
  ;;
perim)
  # Perimeter variants over the minor v2 build (information; the patch carries 0.52): the light ladder and dialog cells
  # with the light perimeter injected at 0.54 and 0.56, read by M-3.
  for v in 54 56; do
    $GC node "$H/capture.mjs" "$D3_OUT/builds/minor2/dist" --out "$D3_OUT/caps/minor2-p$v" --engines chromium --themes light \
      --scenes ladder,dialog,held --inject "$P4/MS2-variants/perim$v.css" > "$REC/perim$v-capture.log" 2>&1; echo "capture p$v exit $? $(ts)"
    node "$H/m3-non-text.mjs" "$D3_OUT/caps/minor2-p$v" --gate chromium --verbose > "$REC/verbose/m3-minor2-perim$v.txt" 2>&1
    node "$H/m2-text-contrast.mjs" "$D3_OUT/caps/minor2-p$v" --gate chromium > "$REC/m2-minor2-perim$v.txt" 2>&1
    grep -E "chromium light (black|white|aurora|paper)( |:)" "$REC/verbose/m3-minor2-perim$v.txt" | cut -c1-160; tail -1 "$REC/m2-minor2-perim$v.txt"
  done
  ;;
roster)
  # G5: the verifier with the datum rebound IN THE WORKTREE ONLY to minor v2's measured bytes, so its roster arm runs
  # (it throws at the ratchet first otherwise). The checkout's .bundle-ratchet is not touched.
  cd "$W"; same || exit 3; n=$(grep -oE "forbidden: [0-9]+" "$REC/verifier.log" | grep -oE "[0-9]+"); echo "$n" > .bundle-ratchet
  $GB node scripts/verify-export-types.mjs > "$REC/verifier-rebound.log" 2>&1; echo "verifier (minor2, datum $n in the worktree) exit $? $(ts)"
  git show HEAD:.bundle-ratchet > .bundle-ratchet; grep -oE '"terminal":"[A-Z]+"|"roster":\{[^}]*\}|"claims":[0-9]+|"declarations":[0-9]+|"css":[0-9]+' "$REC/verifier-rebound.log" | head -6
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; rm -rf "$B"; ls "$R/.claude/worktrees/bl/D3/p4/"; git -C "$R" worktree prune
  ;;
esac
echo "== $phase end $(ts)"
