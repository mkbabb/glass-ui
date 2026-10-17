#!/usr/bin/env bash
# H6-run.sh · D3 pass 6, H6 (REGISTRY P5-6.2 step 1): every command this seat ran, by phase.
# Scratch (worktree, builds, captures, caches) lives inside the worktree: $W/.d3out. Records land in pass-6/H6-records/.
#   bash H6-run.sh setup|minor3-build|battery-cr|arm-cr|static|selftest-static|wk-inner|witnesses|baseline|diff|readings|rerun-cr
# Browser phases run under the machine guard; every phase that starts Playwright WebKit runs inside `wk-inner`, one
# `guarded --exclusive webkit` admission:  ~/.claude/guard/guarded --timeout 90 --exclusive webkit -- bash H6-run.sh wk-inner
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p6/H6
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P4=$M/pass-4
P5=$M/pass-5
P6=$M/pass-6
REC=$P6/H6-records
GC="$HOME/.claude/guard/guarded --timeout ${H6_TIMEOUT:-90} --"
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
same() { git -C "$W" diff HEAD --binary | cmp - "$P5/floor-v4.patch" && echo "worktree = floor-v4.patch"; }
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
setup)
  # The worktree at HEAD, floor v4 applied byte-identical. node_modules: per-entry symlinks into the checkout's, so every
  # vite and vitest cache lands inside the worktree.
  git -C "$R" worktree add --detach "$W" HEAD
  mkdir "$W/node_modules"; for e in $(ls -A "$R/node_modules"); do case $e in .vite|.cache|.tmp|.vitest|.vite-temp) ;; *) ln -s "$R/node_modules/$e" "$W/node_modules/$e";; esac; done
  [ -d "$R/tests-visual/node_modules" ] && ln -s "$R/tests-visual/node_modules" "$W/tests-visual/node_modules"
  git -C "$W" apply "$P5/floor-v4.patch"; same
  ;;
minor3-build)
  # The minor split v3's specimens for the critic's owed WebKit re-capture: floor v4 out, minor v3 in (checked with cmp),
  # built as label minor3, then minor v3 out and floor v4 back in (checked with cmp).
  same || exit 3
  git -C "$W" apply -R "$P5/floor-v4.patch" && git -C "$W" apply "$P5/minor-split-v3.patch" && git -C "$W" diff HEAD --binary | cmp - "$P5/minor-split-v3.patch" && echo "worktree = minor-split-v3.patch"
  $GC node "$H/build.mjs" "$W" --label minor3 2>&1 | tail -2
  git -C "$W" apply -R "$P5/minor-split-v3.patch" && git -C "$W" apply "$P5/floor-v4.patch"; same
  ;;
battery-cr)
  # Build floor v4's specimens and run the whole battery in Chromium under H6 (the headless shell, no GPU arguments).
  same || exit 3
  $GC bash -c "node '$H/build.mjs' '$W' --label fv4 && echo \"built \$(date +%T) load \$(sysctl -n vm.loadavg)\" && node '$H/run.mjs' '$W' --label fv4 --skip-build --engines chromium" 2>&1 | tee "$REC/fv4-run-chromium.log"
  ;;
windows-cr)
  # H6-0's one cited exception (lib.mjs CHROMIUM_FIELD_ARGS, GPU-WITNESS M-2m): the Chromium live, motion and drift windows
  # re-captured into the same capture (no cell: --scenes none), the field on its GPU arm. The shell-only baseline before
  # this phase is kept as baseline-fv4-shellonly.md (the proof).
  same || exit 3
  $GC node "$H/capture.mjs" "$D3_OUT/builds/fv4/dist" --out "$D3_OUT/caps/fv4" --engines chromium --scenes none --live --motion --drift --worktree "$W" 2>&1 | tee "$REC/fv4-windows-chromium.log"
  ;;
arm-cr)
  # H6-0: the arm the aurora paints under the shell, recorded once (Chromium; WebKit's read rides wk-inner).
  $GC node "$P6/H6-arm.mjs" "$D3_OUT/builds/fv4/dist" --engines chromium --out "$REC/arm-chromium.json" 2>&1 | tee "$REC/arm-chromium.log"
  ;;
static)
  # H6-0 and H6-1 on the real trees: LAW over the harness and pass-6; DEL with the floor's declaration on floor v4 (the
  # worktree), on HEAD's src and demo (read only) and on the published 10.1.0 tree.
  t=$(mktemp -d "$B/v1010.XXXX"); git -C "$R" archive v10.1.0 src demo | tar -x -C "$t"
  { node "$H/launch-law.mjs"; echo "LAW exit $?"
    for tree in "$W" "$R" "$t"; do echo "-- DEL tree $tree"; node "$H/deleted-mechanisms.mjs" --root "$tree" --declare "$H/deletes-floor.json"; echo "DEL exit $?"; done
    echo "-- the registry's line grep on floor v4 (P5-2.2 R-10's plant as written)"; grep -rnE 'earned darken|darkened by whatever|luma read' "$W/src" "$W/demo" | sed "s#$W/##"
    echo "-- LAW over the whole material directory (pass records included, information)"; node "$H/launch-law.mjs" --root "$M"; echo "LAW(all) exit $?"
  } 2>&1 | tee "$REC/static.log"
  rm -rf "$t"
  ;;
selftest-static)
  # H6-0 and H6-1 in the self-test (static rows), DEL's planted FAIL on floor v4's tree. The fixtures' field pixels are
  # this seat's floor v4 Chromium empty-scene aurora frames (the self-test writes them into its green fixture, unused by
  # the static rows).
  ~/.claude/guard/guarded --light -- node "$H/selftest.mjs" --fields "$D3_OUT/caps/fv4" --only LAW,DEL --tree "$W" 2>&1 | tee "$REC/selftest-static.log"
  ;;
wk-inner)
  # Every Playwright WebKit item under ONE admission (run as the header says). (1) the battery's WebKit half on floor v4;
  # (2) the WebKit arm read; (3) the owed GLANCE self-test rows, both engines; (4) the pass-5 critic's two owed Playwright
  # WebKit re-captures (Crit §6), each twice: floor v4 ladder,dialog over checker,stripes,paper read by M-3, M-8, M-6;
  # the minor v3 ladder,dialog over checker,white,black read by M-3, M-2.
  echo "admitted $(ts)"
  same || exit 3
  node "$H/run.mjs" "$W" --label fv4 --skip-build --engines webkit > "$REC/fv4-run-webkit.log" 2>&1; echo "battery-wk exit $? $(ts)"
  node "$P6/H6-arm.mjs" "$D3_OUT/builds/fv4/dist" --engines webkit --out "$REC/arm-webkit.json" > "$REC/arm-webkit.log" 2>&1; echo "arm-wk exit $? $(ts)"
  node "$H/selftest.mjs" --fields "$D3_OUT/caps/fv4" --only GLANCE > "$REC/selftest-glance.log" 2>&1; echo "selftest GLANCE exit $? $(ts)"; tail -1 "$REC/selftest-glance.log"
  for n in 1 2; do
    node "$H/capture.mjs" "$D3_OUT/builds/fv4/dist" --out "$D3_OUT/caps/crit-fv4-webkit$n" --engines webkit --scenes ladder,dialog --grounds checker,stripes,paper > "$REC/crit-fv4-webkit$n-capture.log" 2>&1; echo "capture fv4 webkit $n exit $? $(ts)"
    for w in m3-non-text m8-chrome-calm m6-separable-ladder; do node "$H/$w.mjs" "$D3_OUT/caps/crit-fv4-webkit$n" --gate webkit --verbose > "$REC/crit-fv4-webkit$n-$w.log" 2>&1; echo "crit fv4 webkit $n $w $(ts): $(tail -1 "$REC/crit-fv4-webkit$n-$w.log")"; done
    node "$H/capture.mjs" "$D3_OUT/builds/minor3/dist" --out "$D3_OUT/caps/crit-minor3-webkit$n" --engines webkit --scenes ladder,dialog --grounds checker,white,black > "$REC/crit-minor3-webkit$n-capture.log" 2>&1; echo "capture minor3 webkit $n exit $? $(ts)"
    for w in m3-non-text m2-text-contrast; do node "$H/$w.mjs" "$D3_OUT/caps/crit-minor3-webkit$n" --gate webkit --verbose > "$REC/crit-minor3-webkit$n-$w.log" 2>&1; echo "crit minor3 webkit $n $w $(ts): $(tail -1 "$REC/crit-minor3-webkit$n-$w.log")"; done
  done
  echo "done $(ts)"
  ;;
witnesses)
  node "$H/run.mjs" "$W" --label fv4 --skip-build --skip-capture | tee "$REC/fv4-witnesses.log"
  mkdir -p "$REC/fv4-results"; cp "$D3_OUT"/caps/fv4/results/*.log "$REC/fv4-results/"
  ;;
baseline)
  node "$H/baseline.mjs" "$D3_OUT/caps/fv4" --out "$REC/baseline-fv4-h6.json" > "$REC/baseline-fv4-h6.md"; cat "$REC/baseline-fv4-h6.md"
  ;;
diff)
  diff "$P5/FV4-records/baseline-fv4.md" "$REC/baseline-fv4-h6.md" | tee "$REC/baseline-diff.txt"; echo "diff exit ${PIPESTATUS[0]}"
  ;;
readings)
  for e in chromium webkit; do
    for q in a c; do node "$H/m6-separable-ladder.mjs" "$D3_OUT/caps/fv4" --gate $e --q1 $q > "$REC/M-6-q1$q-$e.log" 2>&1; echo "M-6 --q1 $q $e: $(tail -1 "$REC/M-6-q1$q-$e.log")"; done
    node "$H/m1x-off-paper.mjs" "$D3_OUT/caps/fv4" --gate $e --q11 b > "$REC/M-1x-q11b-$e.log" 2>&1; echo "M-1x --q11 b $e: $(tail -1 "$REC/M-1x-q11b-$e.log")"
    node "$H/wa-no-signal.mjs" "$D3_OUT/caps/fv4" --gate $e --q11 b > "$REC/W-A-q11b-$e.log" 2>&1; echo "W-A --q11 b $e: $(tail -1 "$REC/W-A-q11b-$e.log")"
    node "$H/m9-state-registers.mjs" "$D3_OUT/caps/fv4" --gate $e > "$REC/M-9-$e.log" 2>&1; echo "M-9 $e: $(tail -1 "$REC/M-9-$e.log")"
  done 2>&1 | tee "$REC/readings.log"
  ;;
rerun-cr)
  # Every Chromium red cell's scenes re-captured twice, its witnesses re-read (RERUN_* pick them).
  for n in 1 2; do
    $GC node "$H/capture.mjs" "$D3_OUT/builds/fv4/dist" --out "$D3_OUT/caps/rerun-chromium$n" --engines chromium --scenes "${RERUN_SCENES:-held,ladder,dialog}" --grounds "${RERUN_GROUNDS:-black,white,aurora,paper}" > "$REC/rerun-chromium$n-capture.log" 2>&1
    for w in ${RERUN_WITNESSES:-m2-held-window m6-separable-ladder}; do node "$H/$w.mjs" "$D3_OUT/caps/rerun-chromium$n" --gate chromium --verbose > "$REC/rerun-chromium$n-$w.log" 2>&1; echo "rerun chromium $n $w $(ts): $(tail -1 "$REC/rerun-chromium$n-$w.log")"; done
  done 2>&1 | tee -a "$REC/rerun-cr.log"
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
