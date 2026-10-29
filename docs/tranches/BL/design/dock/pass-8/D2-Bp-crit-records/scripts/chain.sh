#!/bin/bash
# chain.sh (D2 pass 8, B′ critic): the whole re-measure, one heavy run at a time. Every run guarded, browser runs never
# --light, Playwright WebKit under --exclusive webkit (queued, never cancelled).
#   1 cost (obligation 3, the §P7-7.3 method): bp8 → bp7 → fv5 × 3, Chromium traced, pass-2/D2-Bp-probes.mjs
#     --arm pcost,plead, each run guarded with --cpu-cores 0 and started only at a 1-minute load ≤ 15
#   2 F7 on the bp8 tree; PR (source, --light)
#   3 the battery under H8 (harness 9d12810b…): one `theme` slot per engine and theme (red cells re-run twice, FM's six B2
#     cells three runs each)
#   4 H8-2's fmlow per WebKit theme
#   5 the display-frame slot probe (slotink-crit.mjs), bp8 and bp7 alternating per run, three runs, per engine and theme
# STEPS=<list> runs a subset (cost f7 bat fmlow si).
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p8/Bp-crit; OUT=$B/out; WT=$B/wt
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
REC=$D/pass-8/D2-Bp-crit-records; BAT=$REC/battery; S=$REC/scripts; GD=$HOME/.claude/guard/guarded
mkdir -p $BAT $REC/si $REC/F7-bp8 $REC/PR-bp8 $REC/cost
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
has() { case " ${STEPS:-cost f7 bat fmlow si} " in *" $1 "*) return 0;; esac; return 1; }
L "CHAIN start (steps: ${STEPS:-all}); harness $(find $H -type f | sort | xargs shasum -a 256 | shasum -a 256 | cut -c1-16)"

if has cost; then
  L "start cost"; C=$REC/cost; t0=$(date +%s)
  for k in 1 2 3; do for b in bp8 bp7 fv5; do
    while [ "$(echo "$(load1) > 15" | bc)" = 1 ]; do
      if [ $(( $(date +%s) - t0 )) -ge ${COST_WAIT_S:-5400} ]; then echo "DEFERRED $(date) cost-$b r$k · $(uptime)" >> $C/done.txt; L "cost DEFERRED at $b r$k"; break 3; fi
      sleep 30; done
    (uptime; $GD --cpu-cores 0 --timeout 30 -- node $D/pass-2/D2-Bp-probes.mjs --build $OUT/builds/$b --adapter $AD --arm pcost,plead --engine chromium --out $C/cost-$b-chromium-r$k.json; echo "exit $?"; uptime) > $C/cost-$b-chromium-r$k.log 2>&1
  done; done
  L "end cost"
fi

if has f7; then
  L "start PR"
  (uptime; $GD --light --timeout 10 -- node $H/prose.mjs $WT --out $OUT/pr; echo "exit $?"; uptime) > $REC/PR.log 2>&1
  find $OUT/pr -name PR.json -exec cp {} $REC/PR-bp8/PR.json \;
  L "start F7"
  (uptime; $GD --timeout 60 -- node $H/f7.mjs $WT --out $OUT/f7; echo "exit $?"; uptime) > $REC/F7-bp8/F7.log 2>&1
  find $OUT/f7 -name F7.json -exec cp {} $REC/F7-bp8/F7.json \;
  L "end F7"
fi

if has bat; then
  for e in chromium webkit; do for t in light dark; do
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
    L "queue si $e $t"
    (echo "queued $(date) $(uptime)"; $GD $X --timeout 40 -- bash -c "echo admitted \$(date) \$(uptime); for k in 1 2 3; do for b in bp8 bp7; do node $S/slotink-crit.mjs --build $OUT/builds/\$b --adapter $AD --engine $e --runs 1 $TH --json $REC/si/\$b-$e-$t-r\$k.json; done; done"; echo "exit $? $(date) $(uptime)") > $REC/si/si-$e-$t.log 2>&1
    L "end si $e $t"
  done; done
fi
L "CHAIN-DONE"
