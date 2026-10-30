#!/bin/bash
# chain.sh (D2 pass 9, fresh CRITIC of D2-B′): one heavy run at a time. Every run guarded, browser runs never --light,
# Playwright WebKit under --exclusive webkit (queued, never cancelled). After the re-measure's chain.sh, with this seat's
# paths; the harness and its witnesses are H8 as landed (9d12810b…), unchanged.
#   pr    PR (source, --light) on the bp8 tree (pass-9 patch)
#   f7    F7 on the bp8 tree (typecheck, lib + demo builds into the worktree, units, gates, boot graph)
#   bat   the battery: one `theme` slot per engine and theme (H6-10; red cells re-run twice, FM's six B2 cells x3),
#         each slot STARTED at a 1-minute load <= 20 (the §P8-7.3 scheduling rule), start load logged
#   fmlow H8-2's low-load stage per WebKit theme
#   si    the display-frame probe (the pass-8 critic's slotink-crit.mjs, unchanged), bp8/bp7 alternating, 3 runs,
#         per engine and theme
#   cost  bp8 → bp7 → fv5 alternating, SIX rounds, pass-2/D2-Bp-probes.mjs --arm pcost,plead, Chromium traced,
#         each run guarded --cpu-cores 0 and started at a 1-minute load <= 15
# STEPS=<list> runs a subset.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p9/Bp-crit; OUT=$B/out; WT=$B/wt
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
REC=$D/pass-9/D2-Bp-crit-records; BAT=${BATDIR:-$REC/battery}; S=$REC/scripts; GD=$HOME/.claude/guard/guarded
SI=$D/pass-8/D2-Bp-crit-records/scripts/slotink-crit.mjs
mkdir -p $BAT $REC/si $REC/cost $REC/PR-bp8 $REC/F7-bp8
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
waitload() { local t0=$(date +%s); while [ "$(echo "$(load1) > $1" | bc)" = 1 ]; do sleep 30; done
  L "admit $2 at load $(load1) (bound $1, waited $(( $(date +%s) - t0 )) s)"; }
has() { case " ${STEPS:-pr f7 bat fmlow si cost} " in *" $1 "*) return 0;; esac; return 1; }
L "CHAIN start (steps: ${STEPS:-all}); harness $(cd $D && find harness -type f | sort | xargs shasum -a 256 | shasum -a 256 | cut -c1-16)"

if has pr; then
  L "start PR"
  (uptime; $GD --light --timeout 10 -- node $H/prose.mjs $WT --out $OUT/pr; echo "exit $?"; uptime) > $REC/PR.log 2>&1
  find $OUT/pr -name PR.json -exec cp {} $REC/PR-bp8/PR.json \;
  L "end PR"
fi
if has f7; then
  waitload 20 "F7"
  (uptime; $GD --timeout 60 -- node $H/f7.mjs $WT --out $OUT/f7; echo "exit $?"; uptime) > $REC/F7-bp8/F7.log 2>&1
  F=$(find $OUT/f7 -name F7.json | head -1); cp $F $REC/F7-bp8/F7.json; cp $(dirname $F)/steps.json $REC/F7-bp8/ 2>/dev/null
  for s in lib demo typecheck units; do tail -40 $(dirname $F)/$s.log > $REC/F7-bp8/$s.tail.log 2>/dev/null; done
  L "end F7"
fi
if has bat; then
  for e in ${ENGS:-chromium webkit}; do for t in ${THEMES:-light dark}; do
    waitload 20 "bp8 $e $t"
    L "start bp8 $e $t"
    BUILD=bp8 ENG=$e REC=$BAT THEME=$t TMIN=90 WT=$WT bash $H/battery.sh $OUT theme >> $BAT/chain-bp8-$e.log 2>&1
    L "end bp8 $e $t exit $?"
  done; done
fi
if has fmlow; then
  for t in light dark; do
    L "start fmlow webkit $t"
    BUILD=bp8 ENG=webkit REC=$BAT THEME=$t TMIN=40 bash $H/battery.sh $OUT fmlow >> $BAT/chain-bp8-webkit.log 2>&1
    L "end fmlow webkit $t exit $?"
  done
fi
if has si; then
  for e in chromium webkit; do for t in light dark; do
    X=""; [ $e = webkit ] && X="--exclusive webkit"
    TH=""; [ $t = dark ] && TH="--theme dark"
    waitload 20 "si $e $t"
    L "queue si $e $t"
    (echo "queued $(date) $(uptime)"; $GD $X --timeout 40 -- bash -c "echo admitted \$(date) \$(uptime); for k in 1 2 3; do for b in bp8 bp7; do node $SI --build $OUT/builds/\$b --adapter $AD --engine $e --runs 1 $TH --json $REC/si/\$b-$e-$t-r\$k.json; done; done"; echo "exit $? $(date) $(uptime)") > $REC/si/si-$e-$t.log 2>&1
    L "end si $e $t"
  done; done
fi
if has cost; then
  L "start cost"; C=$REC/cost
  for k in 1 2 3 4 5 6; do for b in bp8 bp7 fv5; do
    waitload 15 "cost $b r$k"
    (uptime; $GD --cpu-cores 0 --timeout 30 -- node $D/pass-2/D2-Bp-probes.mjs --build $OUT/builds/$b --adapter $AD --arm pcost,plead --engine chromium --out $C/cost-$b-chromium-r$k.json; echo "exit $?"; uptime) > $C/cost-$b-chromium-r$k.log 2>&1
  done; done
  L "end cost"
fi
L "CHAIN-DONE"
