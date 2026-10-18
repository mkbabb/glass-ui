#!/usr/bin/env bash
# WK-run.sh · D3 pass 8, the owed Playwright WebKit cells (REGISTRY P7-6.2 step 4; P7-5's owed row; pass-7 critic §8).
# Floor v7's specimen is floor v6's bytes (FV7 §3) and the minor v6's is the minor v5's (MS6 §3), so the cells pass 7 owed
# read the pass-8 trees. One worktree (.claude/worktrees/bl/D3/p8/wk/wt, removed at the end); specimen builds of floor v7,
# the minor v6 and HEAD in $W/.d3out; records in pass-8/WK-records/. Every phase is invoked as
#   ~/.claude/guard/guarded [--light | --exclusive webkit] --timeout N -- bash WK-run.sh <phase>
# (the guard as the literal command word, never through a variable). Capture groups, each its own WebKit admission:
#   wk-plants-fv3, wk-plants-fv2   (a) the planted faults
#   wk-rings                       (b) the Close rings under H7-1 on fresh pixels, and the checker red's two re-runs
#   wk-drift                       (c) the dark M-2m drift window, twice
# Witness reads (plants-read, rings-read, drift-read) run --light outside the lock: they read PNGs and launch nothing.
set -u
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p8/wk
W=$B/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
P3=$M/pass-3
P4=$M/pass-4
P7=$M/pass-7
P8=$M/pass-8
REC=$P8/WK-records
FV7=$P8/floor-v7.patch
MS6=$P8/minor-split-v6.patch
CV=$P7/crit-variants
export D3_OUT=$W/.d3out
mkdir -p "$REC/verbose"
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
is() { git -C "$W" diff HEAD --binary | cmp -s - "$1"; }
cur() { for p in "$FV7" "$MS6"; do is "$p" && { echo "$p"; return; }; done; test -z "$(git -C "$W" status --porcelain -- src demo tests)" && echo HEAD; }
to() { local c; c=$(cur); [ "$c" = "$1" ] && return 0; [ -z "$c" ] && exit 3; [ "$c" != HEAD ] && git -C "$W" apply -R "$c"; [ "$1" != HEAD ] && git -C "$W" apply "$1"
  if [ "$1" = HEAD ]; then test -z "$(git -C "$W" status --porcelain -- src demo tests)" || exit 3; else is "$1" || exit 3; fi; echo "swapped to $(basename "$1")"; }

phase=$1; shift
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
setup)
  mkdir -p "$B"; git -C "$R" worktree add --detach "$W" HEAD
  mkdir "$W/node_modules"; for e in $(ls -A "$R/node_modules"); do case $e in .vite|.cache|.tmp|.vitest|.vite-temp) ;; *) ln -s "$R/node_modules/$e" "$W/node_modules/$e";; esac; done
  echo "HEAD $(git -C "$W" rev-parse --short=9 HEAD)"
  git -C "$R" diff --stat f12349dfa HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon; echo "(source diff f12349dfa..HEAD above; empty = none)"
  for p in "$FV7" "$MS6"; do echo "sha1 $(shasum "$p" | cut -c1-8) $(basename "$p")"; git -C "$W" apply --check "$p" && echo "apply --check clean at HEAD: $(basename "$p")"; done
  ;;
builds)
  # Specimen dists only (no demo): floor v7, the minor v6, HEAD. Each CSS sha256 is tied to the banked figure.
  for t in fv7:"$FV7" minor6:"$MS6" head:HEAD; do n=${t%%:*}; p=${t#*:}; to "$p"
    node "$H/build.mjs" "$W" --label $n 2>&1 | tail -1
    for c in "$D3_OUT/builds/$n/dist"/assets/*.css; do echo "$n specimen css $(basename "$c") $(wc -c < "$c" | tr -d ' ') B sha256 $(shasum -a 256 "$c" | cut -c1-16)"; done
    echo "$n built $(ts)"; done
  to "$FV7"
  ;;
wk-plants-fv3)
  # (a) the R plants and the owner variants (the pass-7 critic's wk-B list), over floor v7, Playwright WebKit only.
  WK_PLANTS=FV3 node "$P8/wk-plants.mjs" "$D3_OUT/builds/fv7/dist" "$W" --out "$D3_OUT/plants" --only "plant-R1,plant-R2,plant-R3,plant-R4,var-q1c,var-q11b,plant-q1c-noroom" > "$REC/plants-fv3.log" 2>&1; echo "FV3 plants (webkit) exit $? $(ts)"
  grep -E "^(wk-plants|==)|retired|STALL|CRASH" "$REC/plants-fv3.log" | tail -20
  ;;
wk-plants-fv2)
  # (a) the floor plants (the pass-7 critic's wk-B list), over floor v7, Playwright WebKit only.
  WK_PLANTS=FV2 node "$P8/wk-plants.mjs" "$D3_OUT/builds/fv7/dist" "$W" --out "$D3_OUT/flplants" --only "plant-bound,plant-heldfloor,plant-carrierveil,plant-darkperim,plant-noisolation" > "$REC/plants-fv2.log" 2>&1; echo "FV2 plants (webkit) exit $? $(ts)"
  grep -E "^(wk-plants|==)|retired|STALL|CRASH" "$REC/plants-fv2.log" | tail -20
  ;;
plants-read)
  PR=$REC/plants; mkdir -p "$PR"; echo "read $(ts)" > "$PR/readings.log"
  rd() { local d=$1 id=$2 w=$3 tag=$4; shift 4; e=webkit
      node "$H/$w.mjs" "$D3_OUT/$d/$id" --gate $e "$@" > "$PR/$id-$tag-$e.log" 2>&1
      echo "$id | $tag | $e | $(tail -1 "$PR/$id-$tag-$e.log")" | tee -a "$PR/readings.log"; }
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
  echo "end $(ts)" >> "$PR/readings.log"
  # The banked WebKit verdicts on floor v6 (FV6 §5.4), for the diff.
  grep -E "\| webkit \|" "$P7/FV6-records/plants/readings.log" > "$PR/fv6-webkit-banked.txt"
  grep -E "\| webkit \|" "$PR/readings.log" > "$PR/fv7-webkit.txt"
  diff "$PR/fv6-webkit-banked.txt" "$PR/fv7-webkit.txt" > "$PR/diff-fv6-fv7-webkit.txt"; echo "diff banked fv6 webkit vs fv7 webkit: exit $?"; cat "$PR/diff-fv6-fv7-webkit.txt"
  ;;
wk-rings)
  # (b) The Close rings under H7-1 on fresh Playwright WebKit pixels: the dialog scene of floor v7, the minor v6 and HEAD,
  # both themes; R-14's two real-paint plants over floor v7 (light). Then the checker red's two re-runs: the light ladder
  # over the checker, twice on floor v7 (its two straight-run well rings) and twice on the minor v6 (its one).
  e=webkit
  for n in fv7 minor6 head; do
    node "$H/capture.mjs" "$D3_OUT/builds/$n/dist" --out "$D3_OUT/caps/$n-dlg-$e" --engines $e --themes light,dark --scenes dialog > "$REC/cap-$n-dlg-$e.log" 2>&1; echo "$n dialog $e exit $? $(ts)"; done
  for v in ring040 ring1px; do
    node "$H/capture.mjs" "$D3_OUT/builds/fv7/dist" --out "$D3_OUT/caps/fv7-$v-$e" --engines $e --themes light --scenes dialog --variant $v --inject "$CV/$v.css" > "$REC/cap-fv7-$v-$e.log" 2>&1; echo "fv7 $v $e exit $? $(ts)"; done
  for n in fv7 minor6; do for k in 1 2; do
    node "$H/capture.mjs" "$D3_OUT/builds/$n/dist" --out "$D3_OUT/caps/rerun-$n-$e$k" --engines $e --themes light --scenes ladder --grounds checker > "$REC/cap-rerun-$n-$e$k.log" 2>&1; echo "rerun $n $e $k exit $? $(ts)"; done; done
  grep -h "retired\|STALL\|captured" "$REC"/cap-*-$e*.log | sed 's/^/  /'
  ;;
rings-read)
  e=webkit
  # The ink alpha each tree paints the Close ring at (--ink-perimeter): floor v7 0.52 light / 0.60 dark (the reader's
  # default); the minor 0.54 in both themes; HEAD 0.48; the alpha-0.40 plant; the 1 px plant at floor v7's alpha.
  for c in fv7-dlg: minor6-dlg:0.54 head-dlg:0.48 fv7-ring040:0.40 fv7-ring1px:; do
    n=${c%%:*}; al=${c#*:}; [ -d "$D3_OUT/caps/$n-$e" ] || { echo "no capture $n-$e"; continue; }
    node "$H/m3-non-text.mjs" "$D3_OUT/caps/$n-$e" --gate $e --verbose --cells "dialog$" > "$REC/verbose/m3-$n-$e.txt" 2>&1; echo "M-3 $n $e: $(tail -1 "$REC/verbose/m3-$n-$e.txt")"
    grep -E "dialog·ring:close" "$REC/verbose/m3-$n-$e.txt" | sort | uniq -c | sed 's/^/    /'
    node "$P7/crit-ringpx.mjs" "$D3_OUT/caps/$n-$e" --engine $e ${al:+--alpha $al} > "$REC/ringpx-$n-$e.log" 2>&1; echo "ringpx $n $e exit $?: $(grep -E '^SUM' "$REC/ringpx-$n-$e.log")"
  done
  for n in fv7 minor6; do for k in 1 2; do
    node "$H/m3-non-text.mjs" "$D3_OUT/caps/rerun-$n-$e$k" --gate $e --verbose > "$REC/verbose/m3-rerun-$n-$e$k.txt" 2>&1
    echo "rerun $n $e $k M-3: $(tail -1 "$REC/verbose/m3-rerun-$n-$e$k.txt")"
    grep -E "light checker:|ring:well p05 (2\.|1\.)" "$REC/verbose/m3-rerun-$n-$e$k.txt" | sed 's/^/    /'
  done; done
  for n in fv7 minor6; do diff <(grep -E "·(ring|perimeter):" "$REC/verbose/m3-rerun-$n-${e}1.txt") <(grep -E "·(ring|perimeter):" "$REC/verbose/m3-rerun-$n-${e}2.txt") > /dev/null; echo "rerun $n run 1 vs run 2 (every ring and perimeter row): diff exit $?"; done
  ;;
wk-drift)
  # (c) The dark M-2m drift window, twice: the ladder over the c1 aurora, dark, Playwright WebKit (+shim), one frame every
  # 2 s for 100 s (H3-12), on floor v7. The ladder's frozen dark aurora cell rides along (the witness takes its masks).
  e=webkit
  for k in 1 2; do
    node "$H/capture.mjs" "$D3_OUT/builds/fv7/dist" --out "$D3_OUT/caps/drift-fv7-$e$k" --engines $e --themes dark --grounds aurora --scenes ladder --drift > "$REC/cap-drift-fv7-$e$k.log" 2>&1; echo "drift $k exit $? $(ts)"
    grep -h "drift \|retired\|STALL\|captured" "$REC/cap-drift-fv7-$e$k.log" | sed 's/^/  /'
  done
  ;;
drift-read)
  e=webkit
  for k in 1 2; do
    node "$H/m2-motion.mjs" "$D3_OUT/caps/drift-fv7-$e$k" --gate $e --verbose > "$REC/verbose/m2m-drift-fv7-$e$k.txt" 2>&1
    echo "drift $k M-2m: $(tail -1 "$REC/verbose/m2m-drift-fv7-$e$k.txt")"; grep -E "^ *drift " "$REC/verbose/m2m-drift-fv7-$e$k.txt" | sed 's/^/    /'
  done
  ;;
teardown)
  git -C "$R" worktree remove --force "$W"; git -C "$R" worktree prune; rm -rf "$B"; rmdir "$R/.claude/worktrees/bl/D3/p8" 2>/dev/null; ls -la "$R/.claude/worktrees/bl/D3/"
  git -C "$R" worktree list | grep -c "/p8/wk/" ; git -C "$R" status --porcelain -- src demo tests | wc -l
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
