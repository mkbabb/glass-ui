#!/usr/bin/env bash
# FV4-run.sh · D3 pass 5, floor v4 (REGISTRY P4-6.2 step 2): every command this seat ran, by phase.
# floor v4 = pass-4/floor-v3.patch + R-6 (pass-5/floor-v4-R6.diff); written whole as pass-5/floor-v4.patch.
# Scratch (worktree, builds, captures, caches) lives inside the worktree: $W/.d3out. Records land in pass-5/FV4-records/.
#   bash FV4-run.sh setup|static|plants-static|probe|battery-cr|battery-wk|witnesses|baseline|readings|rerun-cr|rerun-wk|glance|toolchain
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p5/floor4
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P4=$M/pass-4
P5=$M/pass-5
REC=$P5/FV4-records
GW="$HOME/.claude/guard/guarded --timeout ${FV4_TIMEOUT:-90} --exclusive webkit --"
GC="$HOME/.claude/guard/guarded --timeout ${FV4_TIMEOUT:-90} --"
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
same() { git -C "$W" diff HEAD --binary | cmp - "$P5/floor-v4.patch" && echo "worktree = floor-v4.patch"; }
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
setup)
  # The worktree at HEAD, floor v3 applied (byte-identical), then R-6 (floor-v4-R6.diff). node_modules is a real directory
  # of per-entry symlinks into the checkout's, so every vite and vitest cache lands inside the worktree.
  git -C "$R" worktree add --detach "$W" HEAD
  mkdir "$W/node_modules"; for e in $(ls -A "$R/node_modules"); do case $e in .vite|.cache|.tmp|.vitest|.vite-temp) ;; *) ln -s "$R/node_modules/$e" "$W/node_modules/$e";; esac; done
  git -C "$W" apply "$P4/floor-v3.patch"; git -C "$W" apply "$P5/floor-v4-R6.diff"; same
  ;;
static)
  # H5-2 and H5-3 and the census on floor v4; the prose sweep of the register's sentences.
  node "$P4/lighting-census.mjs" "$W" > "$REC/census-fv4.log" 2>&1; echo "census exit $?: $(tail -1 "$REC/census-fv4.log")"
  node "$H/lighting-literals.mjs" --root "$W" > "$REC/LIT-static-fv4.log" 2>&1; echo "LIT exit $?: $(grep -o 'LIGHTING-LITERALS.*' "$REC/LIT-static-fv4.log" | tail -1)"
  node "$H/hover-fill-selected.mjs" --root "$W" > "$REC/HOV-fv4.log" 2>&1; echo "HOV exit $?: $(tail -1 "$REC/HOV-fv4.log")"
  ;;
plants-static)
  # R-6's plants on copies of the tree: plant-r4 = R-4 as built (floor v3's five files: the R-6 diff reversed);
  # plant-r6lit = R-6 as literally worded (hover drops its fill legs, no hold): floor v4 + plant-r6-literal.diff.
  for v in plant-r4 plant-r6lit; do rm -rf "$B/scratch/$v"; mkdir -p "$B/scratch/$v"; cp -R "$W/src" "$W/demo" "$W/tests" "$W/vite.targets.ts" "$B/scratch/$v/"; done
  (cd "$B/scratch/plant-r4" && patch -s -R -p1 < "$P5/floor-v4-R6.diff")
  (cd "$B/scratch/plant-r6lit" && patch -s -p1 < "$P5/plant-r6-literal.diff")
  for v in plant-r4 plant-r6lit; do
    node "$H/hover-fill-selected.mjs" --root "$B/scratch/$v" > "$REC/HOV-$v.log" 2>&1; echo "HOV $v exit $?: $(tail -1 "$REC/HOV-$v.log")"
    echo "prose sweep $v:"; grep -rn "hover cannot mint\|rung hover cannot\|hover FILL\|glass-quiet hover-lift" "$B/scratch/$v/src" | sed "s#$B/scratch/$v/##"
  done 2>&1 | tee "$REC/plants-static.log"
  ;;
probe)
  # FV4-hover-probe.mjs on the three trees, both engines (WebKit under the exclusive). Builds land in $D3_OUT/builds/*-hp.
  #   probe <label> <tree> <engines>
  if [[ "$3" == *webkit* ]]; then G=$GW; else G=$GC; fi
  $G node "$P5/FV4-hover-probe.mjs" "$2" --label "$1" --engines "$3" ${4:+--shot "$4"} --out "$REC/hover-$1-${3//,/-}.json" > "$REC/hover-$1-${3//,/-}.log" 2>&1
  echo "probe $1 $3 exit $? $(ts)"; grep -E "^POINTER|^PARKED|^BARE" "$REC/hover-$1-${3//,/-}.log"
  ;;
battery-cr|battery-wk)
  # The whole battery under H5: build floor v4's specimens, every cell, live, motion, drift, the unshimmed probe, the
  # retunes, noclaim, then every witness. Split by engine (H5 §3.1): Chromium needs no WebKit exclusive.
  same || exit 3
  if [ $phase = battery-cr ]; then
    $GC bash -c "node '$H/build.mjs' '$W' --label fv4 && echo \"built \$(date +%T) load \$(sysctl -n vm.loadavg)\" && node '$H/run.mjs' '$W' --label fv4 --skip-build --engines chromium" 2>&1 | tee "$REC/fv4-run-chromium.log"
  else
    $GW node "$H/run.mjs" "$W" --label fv4 --skip-build --engines webkit 2>&1 | tee "$REC/fv4-run-webkit.log"
  fi
  ;;
witnesses)
  node "$H/run.mjs" "$W" --label fv4 --skip-build --skip-capture | tee "$REC/fv4-witnesses.log"
  mkdir -p "$REC/fv4-results"; cp "$D3_OUT"/caps/fv4/results/*.log "$REC/fv4-results/"
  ;;
baseline)
  node "$H/baseline.mjs" "$D3_OUT/caps/fv4" --out "$REC/baseline-fv4.json" > "$REC/baseline-fv4.md"; cat "$REC/baseline-fv4.md"
  ;;
readings)
  for e in chromium webkit; do
    for q in a c; do node "$H/m6-separable-ladder.mjs" "$D3_OUT/caps/fv4" --gate $e --q1 $q > "$REC/M-6-q1$q-$e.log" 2>&1; echo "M-6 --q1 $q $e: $(tail -1 "$REC/M-6-q1$q-$e.log")"; done
    node "$H/m1x-off-paper.mjs" "$D3_OUT/caps/fv4" --gate $e --q11 b > "$REC/M-1x-q11b-$e.log" 2>&1; echo "M-1x --q11 b $e: $(tail -1 "$REC/M-1x-q11b-$e.log")"
    node "$H/wa-no-signal.mjs" "$D3_OUT/caps/fv4" --gate $e --q11 b > "$REC/W-A-q11b-$e.log" 2>&1; echo "W-A --q11 b $e: $(tail -1 "$REC/W-A-q11b-$e.log")"
    node "$H/m9-state-registers.mjs" "$D3_OUT/caps/fv4" --gate $e > "$REC/M-9-$e.log" 2>&1; echo "M-9 $e: $(tail -1 "$REC/M-9-$e.log")"
  done
  ;;
rerun-cr|rerun-wk)
  # Every red cell's scenes re-captured twice in its engine, its witnesses re-read.
  if [ $phase = rerun-cr ]; then e=chromium; G=$GC; else e=webkit; G=$GW; fi
  for n in 1 2; do
    $G node "$H/capture.mjs" "$D3_OUT/builds/fv4/dist" --out "$D3_OUT/caps/rerun-$e$n" --engines $e --scenes "${RERUN_SCENES:-held,ladder,dialog}" --grounds "${RERUN_GROUNDS:-black,white,aurora,paper}" > "$REC/rerun-$e$n-capture.log" 2>&1
    for w in ${RERUN_WITNESSES:-m2-held-window m6-separable-ladder}; do node "$H/$w.mjs" "$D3_OUT/caps/rerun-$e$n" --gate $e > "$REC/rerun-$e$n-$w.log" 2>&1; echo "rerun $e $n $w $(ts): $(tail -1 "$REC/rerun-$e$n-$w.log")"; done
  done
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
