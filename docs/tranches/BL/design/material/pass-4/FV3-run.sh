#!/usr/bin/env bash
# FV3-run.sh · D3 pass 4, floor v3 (REGISTRY P3-5.2 step 2): every command this seat ran, by phase.
# Scratch (worktree, builds, captures) lives inside the worktree: $W/.d3out, vite and vitest caches under $W/.cache-fv3*.
# Records land in pass-4/FV3-records/. Browser and build phases run under the machine guard; vitest at 2 workers.
#   bash FV3-run.sh setup|census|builds|battery|readings|baseline|plants|plants-read|variants|variants-read|glance|toolchain
# Browser phases need a process that may register Mach ports (the Bash sandbox refuses bootstrap_check_in, code 141).
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p4/floor3
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P4=$M/pass-4
REC=$P4/FV3-records
# Inside `rest` (one guard admission for every remaining heavy step) the inner phases run unguarded.
if [ -n "${FV3_INNER:-}" ]; then G=""; else G="$HOME/.claude/guard/guarded --timeout 55 --exclusive webkit --"; fi
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
same() { git -C "$W" diff HEAD --binary | cmp - "$P4/floor-v3.patch" && echo "worktree = floor-v3.patch"; }
phase=$1; shift
echo "== $phase start $(ts)"
case $phase in
setup)
  git -C "$R" worktree add --detach "$W" HEAD
  ln -s "$R/node_modules" "$W/node_modules"; ln -s "$R/tests-visual/node_modules" "$W/tests-visual/node_modules"
  git -C "$W" apply "$M/pass-3/floor-v2.patch" && git -C "$W" apply "$P4/floor-v3-R.diff"; same
  git -C "$R" apply --check "$P4/floor-v3.patch" && echo "git apply --check floor-v3.patch clean at $(git -C "$R" rev-parse --short HEAD)"
  ;;
census)
  echo "-- floor v3"; node "$P4/lighting-census.mjs" "$W"; echo "exit $?"
  echo "-- plant R-5: the 10.1.0 tokens (HEAD's src, read only)"; node "$P4/lighting-census.mjs" "$R"; echo "exit $?"
  ;;
builds)
  # floor v3; then floor v2 (the R diff reversed) and HEAD (floor v2 reversed) for the glance pairs; floor v3 restored.
  same || exit 3
  $G node "$H/build.mjs" "$W" --label fv3 --demo; echo "fv3 built $(ts)"
  git -C "$W" apply -R "$P4/floor-v3-R.diff" && git -C "$W" diff HEAD --binary | cmp - "$M/pass-3/floor-v2.patch" && echo "worktree = floor-v2.patch"
  $G node "$H/build.mjs" "$W" --label fv2 --demo; echo "fv2 built $(ts)"
  git -C "$W" apply -R "$M/pass-3/floor-v2.patch" && test -z "$(git -C "$W" status --porcelain -- src demo tests)" && echo "worktree = HEAD"
  $G node "$H/build.mjs" "$W" --label head --demo; echo "head built $(ts)"
  git -C "$W" apply "$M/pass-3/floor-v2.patch" && git -C "$W" apply "$P4/floor-v3-R.diff"; same || exit 3
  ;;
battery)
  # The whole H4 battery on the floor v3 build: every cell both engines, live, motion, drift, the unshimmed probe,
  # the three retunes and noclaim, then every witness (run.mjs, as H4 ran floor v2).
  $G node "$H/run.mjs" "$W" --label fv3 --skip-build | tee "$REC/fv3-run.log"
  mkdir -p "$REC/fv3-results"; cp "$D3_OUT"/caps/fv3/results/*.log "$REC/fv3-results/"
  ;;
readings)
  # The owner options' text read on the floor v3 capture itself: M-6 under Q-1 (a) and (c), M-1x under Q-11 (b).
  for e in chromium webkit; do
    for q in a c; do node "$H/m6-separable-ladder.mjs" "$D3_OUT/caps/fv3" --gate $e --q1 $q > "$REC/M-6-q1$q-$e.log" 2>&1; echo "M-6 --q1 $q $e: $(tail -1 "$REC/M-6-q1$q-$e.log")"; done
    node "$H/m1x-off-paper.mjs" "$D3_OUT/caps/fv3" --gate $e --q11 b > "$REC/M-1x-q11b-$e.log" 2>&1; echo "M-1x --q11 b $e: $(tail -1 "$REC/M-1x-q11b-$e.log")"
  done
  ;;
baseline)
  node "$H/baseline.mjs" "$D3_OUT/caps/fv3" --out "$REC/baseline-fv3.json" > "$REC/baseline-fv3.md"; cat "$REC/baseline-fv3.md"
  ;;
plants|variants)
  # plants: R-1..R-4 and the (c) arm's own plant; variants: Q-1 (c) and Q-11 (b). One injection each over the fv3 build.
  if [ $phase = plants ]; then ids=plant-R1,plant-R2,probe-R2-35,plant-R3,plant-R4,plant-q1c-noroom; else ids=var-q1c,var-q11b; fi
  $G node "$P4/FV3-plants.mjs" "$D3_OUT/builds/fv3/dist" "$W" --out "$D3_OUT/plants" --only "${1:-$ids}" | tee -a "$REC/$phase.log"
  ;;
plants-read)
  PR=$REC/plants; mkdir -p "$PR"; echo "read $(ts)" > "$PR/readings.log"
  rd() { local id=$1 w=$2 cells=$3; shift 3; for e in chromium webkit; do
      node "$H/$w.mjs" "$D3_OUT/plants/$id" --gate $e --cells "$cells" "$@" > "$PR/$id-$w-$e.log" 2>&1
      echo "$id | $w | $e | $(tail -1 "$PR/$id-$w-$e.log")" | tee -a "$PR/readings.log"; done; }
  rd plant-R1 m4-dock-register 'dark'
  rd plant-R2 m9-state-registers 'dark'
  rd probe-R2-35 m9-state-registers 'dark'
  rd plant-R3 o66-field-row '.'
  rd plant-R4 o66-field-row '.'
  rd plant-q1c-noroom m6-separable-ladder 'dark' --q1 c
  echo "end $(ts)" >> "$PR/readings.log"
  ;;
variants-read)
  VR=$REC/variants; mkdir -p "$VR"; echo "read $(ts)" > "$VR/readings.log"
  rv() { local v=$1 w=$2 tagname=$3; shift 3; for e in chromium webkit; do
      node "$H/$w.mjs" "$D3_OUT/plants/$v" --gate $e "$@" > "$VR/$v-$tagname-$e.log" 2>&1
      echo "$v | $tagname | $e | $(tail -1 "$VR/$v-$tagname-$e.log")" | tee -a "$VR/readings.log"; done; }
  rv var-q1c m6-separable-ladder M-6
  rv var-q1c m6-separable-ladder M-6-q1a --q1 a
  rv var-q1c m6-separable-ladder M-6-q1c --q1 c
  for w in raw-clean:RAW m1-no-grey:M-1 m2-text-contrast:M-2 m3-non-text:M-3 m4-dock-register:M-4 wa-no-signal:W-A t-transmission:T; do rv var-q1c ${w%%:*} ${w##*:}; done
  rv var-q11b m1x-off-paper M-1x
  rv var-q11b m1x-off-paper M-1x-q11b --q11 b
  for w in raw-clean:RAW m1-no-grey:M-1 m2-text-contrast:M-2 m3-non-text:M-3 m4-dock-register:M-4 wa-no-signal:W-A t-transmission:T; do rv var-q11b ${w%%:*} ${w##*:}; done
  echo "end $(ts)" >> "$VR/readings.log"
  ;;
rest)
  # glance, the held re-runs and the toolchain under ONE guard admission (the slot queue held single phases for hours).
  FV3_INNER=1 $HOME/.claude/guard/guarded --timeout 150 --exclusive webkit -- bash -c "bash $P4/FV3-run.sh glance; bash $P4/FV3-run.sh rerun; bash $P4/FV3-run.sh toolchain"
  ;;
rerun)
  # Re-runs of the held cells (M-2h: the light halo red and the dark halo now green at a margin of 0.004), twice, Chromium.
  for n in 1 2; do
    $G node "$H/capture.mjs" "$D3_OUT/builds/fv3/dist" --out "$D3_OUT/caps/rerun$n" --engines chromium --scenes held,ladder --grounds black,white,aurora
    node "$H/m2-held-window.mjs" "$D3_OUT/caps/rerun$n" --gate chromium > "$REC/M-2h-rerun$n.log" 2>&1
    echo "rerun $n $(ts) · $(grep 'halo chromium' "$REC/M-2h-rerun$n.log" | cut -c1-200 | tr '\n' ' ') · $(tail -1 "$REC/M-2h-rerun$n.log")"
  done
  ;;
rest2)
  # The held re-runs with the ladder cells the halo leg reads; the tests typecheck after dist/; dist-demo and boot-graph.
  FV3_INNER=1 $HOME/.claude/guard/guarded --timeout 60 --exclusive webkit -- bash -c "bash $P4/FV3-run.sh rerun; bash $P4/FV3-run.sh toolchain2"
  ;;
toolchain2)
  cd "$W"
  cat > vite.fv3-demo.config.ts <<'EOF2'
import base from "./demo/vite.demo-dist.config";
export default { ...(base as object), cacheDir: ".cache-fv3/vite-demo" };
EOF2
  $G npx vue-tsc --noEmit -p tsconfig.test.json; echo "typecheck tests (after dist/) exit $? $(ts)"
  $G npx vite build --config vite.fv3-demo.config.ts > "$REC/dist-demo.log" 2>&1; echo "dist-demo exit $? $(ts)"
  $G npx vitest run --config vitest.fv3.config.ts --maxWorkers=2 --testTimeout 240000 tests/gates/boot-graph.test.ts 2>&1 | tail -6; echo "boot-graph exit ${PIPESTATUS[0]} $(ts)"
  ;;
glance)
  for pair in "fv2 fv3" "head fv3"; do set -- $pair
    for e in chromium webkit; do
      $G node "$H/glance.mjs" --base "$D3_OUT/builds/$1/dist" --route "$D3_OUT/builds/$2/dist" --story-base "$D3_OUT/builds/$1/demo" --story-route "$D3_OUT/builds/$2/demo" \
        --out "$P4/glance-fv3" --name "$1-vs-$2" --require-delta --engine $e > "$REC/glance-$1-vs-$2-$e.log" 2>&1
      echo "glance $1->$2 $e exit $? $(ts) · $(tail -1 "$REC/glance-$1-vs-$2-$e.log")"
    done
  done
  ;;
toolchain)
  # Wrapper configs keep every cache inside the worktree (the node_modules symlink points into the checkout).
  cd "$W"
  cat > vite.fv3.config.ts <<'EOF'
import base from "./vite.config";
export default { ...(base as object), cacheDir: ".cache-fv3/vite" };
EOF
  cat > vitest.fv3.config.ts <<'EOF'
import base from "./vitest.config";
export default { ...(base as object), cacheDir: ".cache-fv3/vitest" };
EOF
  $G npx vue-tsc --noEmit; echo "typecheck app exit $? $(ts)"
  $G npx vue-tsc --noEmit -p tsconfig.test.json; echo "typecheck tests exit $? $(ts)"
  $G npx vite build --config vite.fv3.config.ts; echo "library build exit $? $(ts)"
  $G npx vitest run --config vitest.fv3.config.ts --maxWorkers=2 --testTimeout 240000; echo "vitest exit $? $(ts)"
  ;;
esac
echo "== $phase end $(ts)"
