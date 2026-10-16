#!/usr/bin/env bash
# H5-run.sh · D3 pass 5, H5 (REGISTRY P4-6.2 step 1): every command this seat ran, by phase.
# Scratch (worktree, builds, captures, caches) lives inside the worktree: $W/.d3out. Records land in pass-5/H5-records/.
#   bash H5-run.sh setup|battery|witnesses|baseline|readings|static|rerun|selftest|variant|bank
# Browser phases run under the machine guard with the WebKit exclusive (one Playwright WebKit run machine-wide).
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p5/H5
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P4=$M/pass-4
P5=$M/pass-5
REC=$P5/H5-records
G="$HOME/.claude/guard/guarded --timeout ${H5_TIMEOUT:-90} --exclusive webkit --"
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
  git -C "$W" apply "$P4/floor-v3.patch"; same
  ;;
battery)
  # Build floor v3 and run the whole battery (every cell both engines, live, motion, drift, the unshimmed probe, the
  # three retunes, noclaim, then every witness) under ONE guard admission.
  same || exit 3
  $G bash -c "node '$H/build.mjs' '$W' --label fv3 && echo \"built \$(date +%T) load \$(sysctl -n vm.loadavg)\" && node '$H/run.mjs' '$W' --label fv3 --skip-build" 2>&1 | tee "$REC/fv3-run.log"
  ;;
battery-cr|battery-wk)
  # The same battery split by engine (the WebKit exclusive queue held the joint run: 4 runs ahead at 07:05, one with a
  # 240 min budget). Chromium needs no WebKit exclusive; the WebKit half joins the queue and merges into the same capture.
  same || exit 3
  if [ $phase = battery-cr ]; then
    $HOME/.claude/guard/guarded --timeout 90 -- bash -c "node '$H/build.mjs' '$W' --label fv3 && echo \"built \$(date +%T) load \$(sysctl -n vm.loadavg)\" && node '$H/run.mjs' '$W' --label fv3 --skip-build --engines chromium" 2>&1 | tee "$REC/fv3-run-chromium.log"
  else
    $G node "$H/run.mjs" "$W" --label fv3 --skip-build --engines webkit 2>&1 | tee "$REC/fv3-run-webkit.log"
  fi
  ;;
witnesses)
  # The witnesses alone (no browser) on the finished capture, H5 in place.
  node "$H/run.mjs" "$W" --label fv3 --skip-build --skip-capture | tee "$REC/fv3-witnesses.log"
  mkdir -p "$REC/fv3-results"; cp "$D3_OUT"/caps/fv3/results/*.log "$REC/fv3-results/"
  ;;
baseline)
  node "$H/baseline.mjs" "$D3_OUT/caps/fv3" --out "$REC/baseline-fv3.json" > "$REC/baseline-fv3.md"; cat "$REC/baseline-fv3.md"
  ;;
readings)
  # The owner options' text read on the floor v3 capture (defaults unruled): M-6 --q1 a|c, M-1x --q11 b, W-A --q11 b (H5-4).
  for e in chromium webkit; do
    for q in a c; do node "$H/m6-separable-ladder.mjs" "$D3_OUT/caps/fv3" --gate $e --q1 $q > "$REC/M-6-q1$q-$e.log" 2>&1; echo "M-6 --q1 $q $e: $(tail -1 "$REC/M-6-q1$q-$e.log")"; done
    node "$H/m1x-off-paper.mjs" "$D3_OUT/caps/fv3" --gate $e --q11 b > "$REC/M-1x-q11b-$e.log" 2>&1; echo "M-1x --q11 b $e: $(tail -1 "$REC/M-1x-q11b-$e.log")"
    node "$H/wa-no-signal.mjs" "$D3_OUT/caps/fv3" --gate $e --q11 b > "$REC/W-A-q11b-$e.log" 2>&1; echo "W-A --q11 b $e: $(tail -1 "$REC/W-A-q11b-$e.log")"
    node "$H/m9-state-registers.mjs" "$D3_OUT/caps/fv3" --gate $e > "$REC/M-9-$e.log" 2>&1; echo "M-9 $e: $(tail -1 "$REC/M-9-$e.log")"
  done
  ;;
static)
  # H5-2 and H5-3 on three trees: floor v3 (the worktree), HEAD's src (read only) and the published 10.1.0 styles.
  t=$(mktemp -d "$B/v1010.XXXX"); git -C "$R" archive v10.1.0 src | tar -x -C "$t"
  for tree in "$W" "$R" "$t"; do
    echo "-- tree $tree"
    node "$P4/lighting-census.mjs" "$tree" | tail -1; echo "census exit ${PIPESTATUS[0]}"
    node "$H/lighting-literals.mjs" --root "$tree" | tail -1; echo "literals exit ${PIPESTATUS[0]}"
    node "$H/hover-fill-selected.mjs" --root "$tree" | tail -3; echo "hover exit ${PIPESTATUS[0]}"
  done 2>&1 | tee "$REC/static.log"
  node "$H/lighting-literals.mjs" --root "$W" > "$REC/LIT-static-fv3.log" 2>&1
  node "$H/hover-fill-selected.mjs" --root "$W" > "$REC/HOV-fv3.log" 2>&1
  # W-0.11 G4's bite, unchanged: the census on the published 10.1.0 styles prints all nine.
  node "$P4/lighting-census.mjs" "$t" | grep -qx 'LIGHTING-CENSUS stacked=2 halo=2 blur=5 open=9' && echo "W-0.11 G4 census line on v10.1.0: holds" | tee -a "$REC/static.log"
  rm -rf "$t"
  ;;
rerun-cr)
  # Chromium's red cells re-captured twice (M-2h's held cells and the ladder dock the halo leg reads; M-6's paper cells).
  for n in 1 2; do
    $HOME/.claude/guard/guarded --timeout 30 -- node "$H/capture.mjs" "$D3_OUT/builds/fv3/dist" --out "$D3_OUT/caps/rerun-cr$n" --engines chromium --scenes held,ladder,dialog --grounds black,white,aurora,paper > "$REC/rerun-cr$n-capture.log" 2>&1
    for w in m2-held-window m6-separable-ladder; do node "$H/$w.mjs" "$D3_OUT/caps/rerun-cr$n" > "$REC/rerun-cr$n-$w.log" 2>&1; echo "rerun-cr $n $w $(ts): $(tail -1 "$REC/rerun-cr$n-$w.log")"; done
  done
  ;;
rerun)
  # Each red cell's scene re-captured twice (Chromium and Playwright WebKit), its witness re-read.
  for n in 1 2; do
    $G node "$H/capture.mjs" "$D3_OUT/builds/fv3/dist" --out "$D3_OUT/caps/rerun$n" --scenes "${RERUN_SCENES:-held,ladder,state}" --grounds "${RERUN_GROUNDS:-black,white,aurora,paper}"
    for w in ${RERUN_WITNESSES:-m2-held-window m9-state-registers lighting-literals}; do for e in chromium webkit; do
      node "$H/$w.mjs" "$D3_OUT/caps/rerun$n" --gate $e > "$REC/rerun$n-$w-$e.log" 2>&1; echo "rerun $n $w $e $(ts): $(tail -1 "$REC/rerun$n-$w-$e.log")"; done; done
  done
  ;;
selftest)
  # H5-5: the full self-test (every check, both engines) under the final capture.mjs; the fields are floor v3's
  # Chromium empty-scene aurora frames (the library's aurora; floor v3 does not touch it).
  H5_TIMEOUT=${H5_TIMEOUT:-240} ; G="$HOME/.claude/guard/guarded --timeout $H5_TIMEOUT --exclusive webkit --"
  $G node "$H/selftest.mjs" --fields "$D3_OUT/caps/fv3" ${1:+--only $1} 2>&1 | tee -a "$REC/selftest.log"
  mkdir -p "$REC/selftest"; cp "$D3_OUT/selftest/summary.json" "$REC/selftest/summary.json"
  ;;
variant)
  # Q-11 (b)'s variant over the floor v3 build, so H5-4's W-A reading can be laid beside M-1x's (P4-1.2).
  $G node "$P4/FV3-plants.mjs" "$D3_OUT/builds/fv3/dist" "$W" --out "$D3_OUT/plants" --only var-q11b | tee "$REC/variant.log"
  for e in chromium webkit; do for q in "" "--q11 b"; do
    node "$H/wa-no-signal.mjs" "$D3_OUT/plants/var-q11b" --gate $e $q > "$REC/var-q11b-W-A${q:+-q11b}-$e.log" 2>&1
    echo "var-q11b W-A ${q:-(a)} $e: $(tail -1 "$REC/var-q11b-W-A${q:+-q11b}-$e.log")"
    node "$H/m1x-off-paper.mjs" "$D3_OUT/plants/var-q11b" --gate $e $q > "$REC/var-q11b-M-1x${q:+-q11b}-$e.log" 2>&1
    echo "var-q11b M-1x ${q:-(a)} $e: $(tail -1 "$REC/var-q11b-M-1x${q:+-q11b}-$e.log")"
  done; done | tee -a "$REC/variant.log"
  ;;
head)
  # H5-2's frame arm on real paint: HEAD (10.1.0's --shadow-dock, a zero-offset 20 px glow) built from the checkout's
  # src, read only (output and vite cache under $D3_OUT), its state and held scenes captured in Chromium.
  $HOME/.claude/guard/guarded --timeout 30 -- bash -c "node '$H/build.mjs' '$R' --label head && node '$H/capture.mjs' '$D3_OUT/builds/head/dist' --out '$D3_OUT/caps/head-sh' --engines chromium --scenes state,held --grounds paper,aurora,black,white"
  for s in "" "--strict"; do node "$H/lighting-literals.mjs" "$D3_OUT/caps/head-sh" --root "$R" $s > "$REC/LIT-head${s:+-strict}.log" 2>&1; echo "LIT head ${s:-reported}: $(tail -1 "$REC/LIT-head${s:+-strict}.log")"; done
  node "$H/m9-state-registers.mjs" "$D3_OUT/caps/head-sh" > "$REC/M-9-head.log" 2>&1; echo "M-9 head: $(tail -1 "$REC/M-9-head.log")"
  ;;
bank)
  # H5-1: bank the state-scene veil frames (the dark focus veil over the aurora, the frame the pass-4 critic lost).
  node "$H/m9-state-registers.mjs" "$D3_OUT/caps/fv3" --gate chromium,webkit --bank "$P5/frames-H5-1" > "$REC/M-9-bank.log" 2>&1; tail -3 "$REC/M-9-bank.log"
  ;;
esac
echo "== $phase end $(ts)"
