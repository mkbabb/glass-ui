#!/bin/bash
# chain5.sh (D2 pass 8, B′ prototype): what the run of record (patch b1ea7d86…, chain.log to 21:42) still owes. One heavy run at a time:
# rebuild bp8 from the c4 tree; the display-frame slot probe (bp8, bp7, three runs each) per engine and theme (WebKit
# under --exclusive webkit, queued, never cancelled); H8-2's fmlow per WebKit theme (up to FMLOW_RUNS stage runs while a
# stage defers every try); then cost (cost.sh: bp8, bp7, fv5 alternating, at load <= 15, waiting at most COST_WAIT_S).
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p8/Bp-proto; OUT=$B/out; WT=$B/wt
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
REC=$D/pass-8/D2-Bp-proto-records; BAT=$REC/battery; S=$REC/scripts; GD=$HOME/.claude/guard/guarded
mkdir -p $BAT $REC/si $REC/F7-bp $REC/PR-bp $REC/pre
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
rm -rf $OUT/builds/bp8 $OUT/chromium/bp8 $OUT/webkit/bp8 $OUT/f7 $OUT/pr $OUT/ab-w3-light $OUT/ab-w3-dark
rm -rf $OUT/builds/bp8
L "build bp8 (c4)"; (uptime; $GD --timeout 30 -- node $H/build.mjs $WT --out $OUT --label bp8; echo "build exit $?"; uptime) > $REC/build-bp8-c4-again.log 2>&1
for t in light dark; do
  L "start si chromium $t"; (uptime; $GD --timeout 30 -- bash -c "for b in bp8 bp7; do node $S/slotink.mjs --build $OUT/builds/\$b --adapter $AD --engine chromium --runs 3 --json $REC/si/\$b-chromium-$t.json $([ $t = dark ] && echo --theme dark); done"; echo "exit $?"; uptime) > $REC/si/si-chromium-$t.log 2>&1
done
for t in light dark; do
  L "queue si webkit $t"; (echo "queued $(date) $(uptime)"; $GD --exclusive webkit --timeout 40 -- bash -c "echo admitted \$(date) \$(uptime); for b in bp8 bp7; do node $S/slotink.mjs --build $OUT/builds/\$b --adapter $AD --engine webkit --runs 3 --json $REC/si/\$b-webkit-$t.json $([ $t = dark ] && echo --theme dark); done"; echo "exit $? $(date) $(uptime)") > $REC/si/si-webkit-$t.log 2>&1; L "end si webkit $t"
done
for t in light dark; do for n in $(seq 1 ${FMLOW_RUNS:-2}); do
  J=$BAT/json/bp8-webkit/fmlow-$t
  [ -f $J/admit.json ] && grep -q '"deferred":false' $J/admit.json && break
  [ -f $J/admit.json ] && mv $J $J-deferred-$((n - 1))
  L "start fmlow webkit $t (stage run $n)"
  BUILD=bp8 ENG=webkit REC=$BAT THEME=$t TMIN=40 bash $H/battery.sh $OUT fmlow >> $BAT/chain-bp8-webkit.log 2>&1
  L "end fmlow webkit $t (stage run $n) exit $?"
done; done
L "start cost"; DEADLINE=$(( $(date +%s) + ${COST_WAIT_S:-3600} )) bash $S/cost.sh 3; L "CHAIN5-DONE"
