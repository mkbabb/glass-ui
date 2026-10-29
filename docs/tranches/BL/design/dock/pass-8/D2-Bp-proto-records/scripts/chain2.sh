#!/bin/bash
# chain2.sh (D2 pass 8, B′ prototype): what chain.sh had left when the seat stopped it in fmlow's pre-lock load wait
# (chain.log): the WebKit W3 A/B (ab-w3.sh, light then dark), then H8-2's fmlow per WebKit theme (FMLOW_RUNS stage runs
# while a stage defers every try), then the slot probe (bp8, bp7) per engine and theme, then cost. One heavy run at a time.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p8/Bp-proto; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
REC=$D/pass-8/D2-Bp-proto-records; BAT=$REC/battery; S=$REC/scripts; GD=$HOME/.claude/guard/guarded; mkdir -p $REC/si
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
for t in light dark; do L "start ab-w3 webkit $t"; THEME=$t bash $S/ab-w3.sh; L "end ab-w3 webkit $t"; done
for t in light dark; do for n in $(seq 1 ${FMLOW_RUNS:-2}); do
  J=$BAT/json/bp8-webkit/fmlow-$t
  [ -f $J/admit.json ] && grep -q '"deferred":false' $J/admit.json && break
  [ -f $J/admit.json ] && mv $J $J-deferred-$((n - 1))
  L "start fmlow webkit $t (stage run $n)"
  BUILD=bp8 ENG=webkit REC=$BAT THEME=$t TMIN=40 bash $H/battery.sh $OUT fmlow >> $BAT/chain-bp8-webkit.log 2>&1
  L "end fmlow webkit $t (stage run $n) exit $?"
done; done
for t in light dark; do
  L "start si chromium $t"; (uptime; $GD --timeout 30 -- bash -c "for b in bp8 bp7; do node $S/slotink.mjs --build $OUT/builds/\$b --adapter $AD --engine chromium --runs 3 --json $REC/si/\$b-chromium-$t.json $([ $t = dark ] && echo --theme dark); done"; echo "exit $?"; uptime) > $REC/si/si-chromium-$t.log 2>&1
done
for t in light dark; do
  L "queue si webkit $t"; (echo "queued $(date) $(uptime)"; $GD --exclusive webkit --timeout 40 -- bash -c "echo admitted \$(date) \$(uptime); for b in bp8 bp7; do node $S/slotink.mjs --build $OUT/builds/\$b --adapter $AD --engine webkit --runs 3 --json $REC/si/\$b-webkit-$t.json $([ $t = dark ] && echo --theme dark); done"; echo "exit $? $(date) $(uptime)") > $REC/si/si-webkit-$t.log 2>&1; L "end si webkit $t"
done
L "start cost"; bash $S/cost.sh 3; L "CHAIN2-DONE"
