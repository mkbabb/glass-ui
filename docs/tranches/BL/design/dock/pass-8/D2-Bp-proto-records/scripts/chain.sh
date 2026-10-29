#!/bin/bash
# chain.sh (D2 pass 8, B′ prototype): build bp8, then F7 (+ boot graph) and PR first (the size gate fails fast), then the
# H8 battery on bp8, one heavy run at a time. One battery.sh `theme` slot per
# engine and theme (H6-10; WebKit under --exclusive webkit, queued, never cancelled; red cells re-run twice in the slot,
# FM's six B2 cells three runs each), then H8-2's low-load stage `fmlow` per WebKit theme (a stage that deferred all its
# tries is queued once more, FMLOW_RUNS=2), then the display-frame slot probe (slotink.mjs, bp8 and bp7, three runs per engine and theme), then cost (cost.sh).
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p8/Bp-proto; OUT=$B/out; WT=$B/wt
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
REC=$D/pass-8/D2-Bp-proto-records; BAT=$REC/battery; S=$REC/scripts; mkdir -p $BAT $REC/si $REC/F7-bp $REC/PR-bp
GD=$HOME/.claude/guard/guarded
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
L "build bp8"; (uptime; $GD --timeout 30 -- node $H/build.mjs $WT --out $OUT --label bp8; echo "build exit $?"; uptime) > $REC/build-bp8.log 2>&1
L "start PR"; (uptime; $GD --light --timeout 10 -- node $H/prose.mjs $WT --out $OUT/pr; echo "exit $?"; uptime) > $REC/PR-bp/PR.log 2>&1
find $OUT/pr -name PR.json -exec cp {} $REC/PR-bp/PR.json \; ; L "end PR"
L "start F7"; (uptime; $GD --timeout 60 -- node $H/f7.mjs $WT --out $OUT/f7; echo "exit $?"; uptime) > $REC/F7-bp/F7.log 2>&1
find $OUT/f7 -name F7.json -exec cp {} $REC/F7-bp/F7.json \;
(cd $WT && node $S/bg.mjs dist-demo) > $REC/F7-bp/boot-graph.txt 2>&1; L "end F7"
grep -q "margin -" $REC/F7-bp/boot-graph.txt && { L "STOP: boot graph over its ceiling"; exit 1; }
if [ -z "${SKIP_BAT:-}" ]; then
  for e in chromium webkit; do for t in light dark; do
    L "start bp8 $e $t"
    BUILD=bp8 ENG=$e REC=$BAT THEME=$t TMIN=90 WT=$WT bash $H/battery.sh $OUT theme >> $BAT/chain-bp8-$e.log 2>&1
    L "end bp8 $e $t exit $?"
  done; done
  for t in light dark; do for n in $(seq 1 ${FMLOW_RUNS:-2}); do
    J=$BAT/json/bp8-webkit/fmlow-$t
    [ -f $J/admit.json ] && grep -q '"deferred":false' $J/admit.json && break
    [ -f $J/admit.json ] && mv $J $J-deferred-$n
    L "start fmlow webkit $t (stage run $n)"
    BUILD=bp8 ENG=webkit REC=$BAT THEME=$t TMIN=40 bash $H/battery.sh $OUT fmlow >> $BAT/chain-bp8-webkit.log 2>&1
    L "end fmlow webkit $t (stage run $n) exit $?"
  done; done
fi
for t in light dark; do
  L "start si chromium $t"; (uptime; $GD --timeout 30 -- bash -c "for b in bp8 bp7; do node $S/slotink.mjs --build $OUT/builds/\$b --adapter $AD --engine chromium --runs 3 --json $REC/si/\$b-chromium-$t.json $([ $t = dark ] && echo --theme dark); done"; echo "exit $?"; uptime) > $REC/si/si-chromium-$t.log 2>&1
done
for t in light dark; do
  L "queue si webkit $t"; (echo "queued $(date) $(uptime)"; $GD --exclusive webkit --timeout 40 -- bash -c "echo admitted \$(date) \$(uptime); for b in bp8 bp7; do node $S/slotink.mjs --build $OUT/builds/\$b --adapter $AD --engine webkit --runs 3 --json $REC/si/\$b-webkit-$t.json $([ $t = dark ] && echo --theme dark); done"; echo "exit $? $(date) $(uptime)") > $REC/si/si-webkit-$t.log 2>&1; L "end si webkit $t"
done
L "start cost"; bash $S/cost.sh 3; L "CHAIN-DONE"
