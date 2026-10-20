#!/usr/bin/env bash
# BV11-run.sh · D3 pass 12, floor v11's battery (REGISTRY P11-6.3 step 3, the browser half): every command this seat
# ran, by phase. floor v11 = pass-12/floor-v11.patch (8f838dcf) = floor v11a + FV11-r32.diff (R-32's dark arm).
# Base: HEAD of master at launch; release/10.1.1 is NOT merged during pass 12 (P11-5).
# One worktree (.claude/worktrees/bl/D3/p12/battery11/wt) cut at HEAD, node_modules symlinked; floor v11 applied by
# default; the R-2 side of the F-1 frame (floor v11a) is built by a cmp-checked swap and swapped back. Builds, captures
# and caches live in $W/.d3out. Records land in pass-12/BV11-records/, the F-1 frames in pass-12/frames-Q14/.
# Launch law (machine law + P11-6.3): every phase is `~/.claude/guard/guarded ... -- bash BV11-run.sh <phase>`:
#   --light                         setup, check, witnesses, readings, compose, plants-read, teardown (no browser)
#   --timeout 60                    build, battery-cr, frames-cr, plants-cr, demo-cr, rerun-cr, plant-notone (headless shell, no args)
#   --exclusive webkit --timeout 60 wk-battery, frames-wk, plants-wk, rerun-wk (each WebKit capture group its own admission)
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p12/battery11
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P12=$M/pass-12
REC=$P12/BV11-records
FQ=$P12/frames-Q14
FV11A=$P12/floor-v11a.patch
FV11=$P12/floor-v11.patch
export D3_OUT=$W/.d3out
mkdir -p "$REC"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1" && echo "worktree = $(basename "$1")"; }
clean() { test -z "$(git -C "$W" status --porcelain -- src demo tests docs/canon DESIGN.md)"; }
swap() { is "$1" >/dev/null && git -C "$W" apply -R "$1" 2>/dev/null && clean && git -C "$W" apply "$2" 2>/dev/null; is "$2" || exit 3; }
phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
setup)
  mkdir -p "$B"; git -C "$R" worktree add --detach "$W" HEAD && ln -s "$R/node_modules" "$W/node_modules"
  { echo "worktree HEAD $(git -C "$W" rev-parse --short=9 HEAD) (master at launch; release/10.1.1 not merged, P11-5)"
    echo "10.1.0 source diff 1da7eb17b..HEAD (empty = none): [$(git -C "$W" diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon | tail -1)]"
    echo "floor-v11.patch sha1 $(shasum "$FV11" | cut -c1-8), $(grep -c '^diff --git' "$FV11") files; floor-v11a.patch sha1 $(shasum "$FV11A" | cut -c1-8)"
    git -C "$W" apply --check "$FV11"; echo "git apply --check floor-v11.patch at HEAD: exit $?"
    clean && git -C "$W" apply "$FV11"; is "$FV11" || exit 3
  } 2>&1 | tee "$REC/setup.log"
  ;;
build)
  # floor v11's specimen + dist-demo, then floor v11a's specimen (R-2's side of the F-1 frame), floor v11 left applied.
  is "$FV11" || exit 3
  { node "$H/build.mjs" "$W" --label fv11 --demo 2>&1 | tail -2; echo "fv11 built $(ts)"
    swap "$FV11" "$FV11A"
    node "$H/build.mjs" "$W" --label fv11a 2>&1 | tail -2; echo "fv11a built $(ts)"
    swap "$FV11A" "$FV11"
    for l in fv11 fv11a; do for c in "$D3_OUT/builds/$l/dist"/assets/*.css; do echo "$l specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done; done
  } 2>&1 | tee "$REC/build.log"
  ;;
battery-cr)
  # The Chromium half of run.mjs: every cell, live, motion, drift, retunes, noclaim; the headless shell with no arguments
  # (the field windows take CHROMIUM_FIELD_ARGS under lib.mjs's GPU-WITNESS line, H6-0).
  is "$FV11" || exit 3
  echo "start $(ts)" > "$REC/battery-cr.time"
  node "$H/run.mjs" "$W" --label fv11 --skip-build --engines chromium > "$REC/fv11-run-chromium.log" 2>&1; echo "battery-cr exit $? $(ts)" | tee -a "$REC/battery-cr.time"
  tail -28 "$REC/fv11-run-chromium.log"
  ;;
wk-battery)
  # The Playwright WebKit half, one `guarded --exclusive webkit --timeout 60` admission (capture.mjs retires the browser
  # every 60 page loads, H3-1). Its witnesses run at the end of run.mjs over the merged capture (no browser).
  echo "admitted $(ts)" | tee -a "$REC/wk-admission.log"
  is "$FV11" || exit 3
  node "$H/run.mjs" "$W" --label fv11 --skip-build --engines webkit > "$REC/fv11-run-webkit.log" 2>&1; echo "wk-battery exit $? $(ts)" | tee -a "$REC/wk-admission.log"
  grep -E "retired|relaunch" "$REC/fv11-run-webkit.log" | head -5 | tee -a "$REC/wk-admission.log"
  ;;
witnesses)
  # Every witness over both engines' captures (no browser), the verbose rows, the baseline and its diff against floor v6's
  # (floor v6 = floor v10 = floor v11a by specimen CSS 347288745da7cf97: the last full two-engine battery, pass 7).
  is "$FV11" || exit 3
  node "$H/run.mjs" "$W" --label fv11 --skip-build --skip-capture > "$REC/fv11-witnesses.log" 2>&1; tail -30 "$REC/fv11-witnesses.log"
  mkdir -p "$REC/fv11-results" "$REC/verbose"; cp "$D3_OUT"/caps/fv11/results/*.log "$REC/fv11-results/"
  for w in m2-text-contrast:m2 m3-non-text:m3 m2-held-window:m2h m8-chrome-calm:m8 t-transmission:t m6-separable-ladder:m6 m9-state-registers:m9; do
    node "$H/${w%%:*}.mjs" "$D3_OUT/caps/fv11" --gate chromium,webkit --verbose > "$REC/verbose/${w##*:}-fv11.txt" 2>&1; done
  node "$H/baseline.mjs" "$D3_OUT/caps/fv11" --out "$REC/baseline-fv11.json" > "$REC/baseline-fv11.md"
  diff "$M/pass-7/FV6-records/baseline-fv6.md" "$REC/baseline-fv11.md" > "$REC/baseline-diff-fv6-fv11.txt"; echo "baseline diff fv6 fv11 exit $? ($(wc -l < "$REC/baseline-diff-fv6-fv11.txt" | tr -d ' ') lines)"
  ;;
readings)
  # The owner-ruled readings (Q-1 (a), Q-11 (a)) and H12-1: M-9 with --r32, per engine, on the full battery's capture.
  for e in chromium webkit; do
    node "$H/m6-separable-ladder.mjs" "$D3_OUT/caps/fv11" --gate $e --q1 a > "$REC/M-6-q1a-$e.log" 2>&1; echo "M-6 --q1 a $e: $(tail -1 "$REC/M-6-q1a-$e.log")"
    node "$H/m1x-off-paper.mjs" "$D3_OUT/caps/fv11" --gate $e --q11 a > "$REC/M-1x-q11a-$e.log" 2>&1; echo "M-1x --q11 a $e: $(tail -1 "$REC/M-1x-q11a-$e.log")"
    node "$H/wa-no-signal.mjs" "$D3_OUT/caps/fv11" --gate $e --q11 a > "$REC/W-A-q11a-$e.log" 2>&1; echo "W-A --q11 a $e: $(tail -1 "$REC/W-A-q11a-$e.log")"
    node "$H/m9-state-registers.mjs" "$D3_OUT/caps/fv11" --gate $e > "$REC/M-9-$e.log" 2>&1; echo "M-9 $e: $(tail -1 "$REC/M-9-$e.log")"
    node "$H/m9-state-registers.mjs" "$D3_OUT/caps/fv11" --gate $e --r32 > "$REC/M-9-r32-$e.log" 2>&1; echo "M-9 --r32 $e: $(tail -1 "$REC/M-9-r32-$e.log")"
  done 2>&1 | tee "$REC/readings.log"
  node "$H/m9-state-registers.mjs" "$D3_OUT/caps/fv11" --gate chromium,webkit --r32 > "$REC/M-9-r32-both.log" 2>&1; echo "M-9 --r32 both gated: $(tail -1 "$REC/M-9-r32-both.log")" | tee -a "$REC/readings.log"
  ;;
frames-cr|frames-wk)
  # F-1's frames (P11-4): the dark state scene over the aurora (the spot) and paper (the page) only, R-2 (floor v11a)
  # and R-32 (floor v11), one engine per admission; each read by M-9 --r32 and banked by its --bank pair writer.
  e=chromium; [ "$phase" = frames-wk ] && { e=webkit; echo "admitted $(ts)" | tee -a "$REC/wk-admission.log"; }
  N=${FRAMES_RUN:-1}
  for l in fv11a fv11; do
    c=$D3_OUT/caps/frames-$l-$e-$N; rm -rf "$c"
    node "$H/capture.mjs" "$D3_OUT/builds/$l/dist" --out "$c" --engines $e --themes dark --scenes state --grounds aurora,paper > "$REC/frames-$l-$e-$N-capture.log" 2>&1; echo "capture $l $e $N exit $? $(ts)"
    node "$H/m9-state-registers.mjs" "$c" --gate $e --r32 --bank "$D3_OUT/bank/$l-$e-$N" > "$REC/frames-M-9-r32-$l-$e-$N.log" 2>&1; echo "M-9 --r32 $l $e $N: $(tail -1 "$REC/frames-M-9-r32-$l-$e-$N.log")"
  done 2>&1 | tee -a "$REC/frames.log"
  ;;
compose)
  # The F-1 frame per engine: raw | R-2 | R-32 around the spot's probe, from the banked pairs (no browser).
  mkdir -p "$FQ"
  for e in chromium webkit; do
    node "$P12/BV11-frames.mjs" "$D3_OUT/bank/fv11a-$e-${FRAMES_RUN:-1}" "$D3_OUT/bank/fv11-$e-${FRAMES_RUN:-1}" "$FQ/$e-dark-aurora-state-veil-r2-vs-r32.png" $e
  done 2>&1 | tee "$REC/compose.log"
  ;;
plants-cr|plants-wk)
  # Row 19: every R plant and floor plant over floor v11 (FV3-plants, FV2-plants), one engine per admission (H9-5).
  e=chromium; [ "$phase" = plants-wk ] && { e=webkit; echo "admitted $(ts)" | tee -a "$REC/wk-admission.log"; }
  is "$FV11" || exit 3
  { node "$M/pass-4/FV3-plants.mjs" "$D3_OUT/builds/fv11/dist" "$W" --engines $e --out "$D3_OUT/plants" --only "plant-R1,plant-R2,probe-R2-35,plant-R3,plant-R4,var-q1c,var-q11b,plant-q1c-noroom" > "$REC/plants-$e.log" 2>&1; echo "FV3-plants $e exit $? $(ts)"
    node "$M/pass-3/FV2-plants.mjs" "$D3_OUT/builds/fv11/dist" "$W" --engines $e --out "$D3_OUT/flplants" --only "plant-bound,plant-heldfloor,plant-carrierveil,plant-darkperim,plant-noisolation,risk-opaque-ancestor,diag-held-noveil" > "$REC/floor-plants-$e.log" 2>&1; echo "FV2-plants $e exit $? $(ts)"
    if [ $e = webkit ]; then node "$M/pass-6/FV5-demo-probe.mjs" "$D3_OUT/builds/fv11/demo" --label fv11 --engines webkit --out "$REC/demo-fv11-webkit.json" > "$REC/demo-fv11-webkit.log" 2>&1; echo "demo-probe fv11 webkit exit $? $(ts)"; grep -E '^DEMO|crash' "$REC/demo-fv11-webkit.log" | head -4; fi
  } 2>&1 | tee -a "$REC/plants-run.log"
  ;;
demo-cr)
  # R-12's two probes on floor v11's own dist-demo (its CSS moved), Chromium.
  F=$REC/demo-frames; mkdir -p "$F"
  { node "$M/pass-6/FV5-demo-probe.mjs" "$D3_OUT/builds/fv11/demo" --label fv11 --engines chromium --shots "$F" --out "$REC/demo-fv11-chromium.json" > "$REC/demo-fv11-chromium.log" 2>&1; echo "demo-probe fv11 chromium exit $? $(ts)"; grep -E '^DEMO' "$REC/demo-fv11-chromium.log"
    node "$M/pass-6/crit-demo-probe.mjs" "$D3_OUT/builds/fv11/demo" --label fv11 --engines chromium --shots "$F" --out "$REC/critdemo-fv11-chromium.json" > "$REC/critdemo-fv11-chromium.log" 2>&1; echo "crit-demo fv11 chromium exit $? $(ts)"; grep -E '^CRIT' "$REC/critdemo-fv11-chromium.log"
  } 2>&1 | tee "$REC/demo-cr.log"
  ;;
plants-read)
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
  diff <(sed 1d "$M/pass-7/FV6-records/plants/readings.log" | grep -v '^end') <(sed 1d "$PR/readings.log" | grep -v '^end') > "$REC/plants-diff-fv6-fv11.txt"; echo "plant readings diff fv6 fv11 exit $?"
  ;;
rerun-cr|rerun-wk)
  # Each red cell's scenes re-captured twice and re-read (RERUN_* pick them); WebKit under its own admission.
  e=chromium; [ "$phase" = rerun-wk ] && { e=webkit; echo "admitted $(ts)" | tee -a "$REC/wk-admission.log"; }
  for n in 1 2; do
    c=$D3_OUT/caps/rerun-$e$n; rm -rf "$c"
    node "$H/capture.mjs" "$D3_OUT/builds/fv11/dist" --out "$c" --engines $e --themes "${RERUN_THEMES:-light,dark}" --scenes "${RERUN_SCENES:-held,ladder,dialog}" --grounds "${RERUN_GROUNDS:-black,white,aurora,paper}" > "$REC/rerun-$e$n-capture.log" 2>&1
    for w in ${RERUN_WITNESSES:-m2-held-window m3-non-text m6-separable-ladder}; do node "$H/$w.mjs" "$c" --gate $e --verbose ${RERUN_ARGS:-} > "$REC/rerun-$e$n-$w.log" 2>&1; echo "rerun $e $n $w $(ts): $(tail -1 "$REC/rerun-$e$n-$w.log")"; done
  done 2>&1 | tee -a "$REC/rerun-$e.log"
  ;;
plant-notone)
  # Row 19 for R-32's own mechanism (found by this seat: FV3's plant-R2 re-values -dim, which floor v11's dark arm no
  # longer dims with). BV11-plant-r32-notone.css removes the dark tone; the dark state scene, Chromium (Playwright WebKit
  # paints no backdrop-filter, so the plant is a no-op there by the engine fact). Read by M-9 with --r32.
  is "$FV11" || exit 3
  for n in 1 2 3; do c=$D3_OUT/plants/plant-notone-$n; rm -rf "$c"
    node "$H/capture.mjs" "$D3_OUT/builds/fv11/dist" --out "$c" --engines chromium --themes dark --scenes state --grounds aurora,paper --variant plant-notone --inject "$P12/BV11-plant-r32-notone.css" --worktree "$W" > "$REC/plant-notone-$n-capture.log" 2>&1; echo "capture $n exit $? $(ts)"
    node "$H/m9-state-registers.mjs" "$c" --gate chromium --r32 --variant plant-notone > "$REC/plant-notone-$n-M-9-r32.log" 2>&1; echo "plant-notone $n M-9 --r32: $(tail -1 "$REC/plant-notone-$n-M-9-r32.log")"
  done 2>&1 | tee "$REC/plant-notone.log"
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"; rmdir "$R/.claude/worktrees/bl/D3/p12" 2>/dev/null
  { echo "worktrees naming D3/p12/battery11: $(git -C "$R" worktree list | grep -c 'D3/p12/battery11')"; ls "$R/.claude/worktrees/bl/D3/" 2>&1; } | tee "$REC/teardown.log"
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
