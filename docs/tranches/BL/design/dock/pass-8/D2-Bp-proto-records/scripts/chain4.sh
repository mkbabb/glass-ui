#!/bin/bash
# chain4.sh (D2 pass 8, B′ prototype): the run of record on the final tree (patch b2316583…). One heavy run at a time:
# build bp8; PR; F7 + boot graph (stop over the ceiling); a Chromium pre-check (slot probe x1, W3, FM; stop on any empty
# display frame); the H8 battery, one battery.sh `theme` slot per engine and theme (WebKit under --exclusive webkit,
# queued, never cancelled; red cells re-run twice in the slot; FM's six B2 cells three runs each); the WebKit W3 A/B
# against bp7 (ab-w3.sh, both themes); H8-2's fmlow per WebKit theme (up to FMLOW_RUNS stage runs while a stage defers
# every try); the display-frame slot probe (bp8, bp7) per engine and theme; then cost (cost.sh: bp8, bp7, fv5 alternating).
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p8/Bp-proto; OUT=$B/out; WT=$B/wt
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
REC=$D/pass-8/D2-Bp-proto-records; BAT=$REC/battery; S=$REC/scripts; GD=$HOME/.claude/guard/guarded
mkdir -p $BAT $REC/si $REC/F7-bp $REC/PR-bp $REC/pre
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
rm -rf $OUT/builds/bp8 $OUT/chromium/bp8 $OUT/webkit/bp8 $OUT/f7 $OUT/pr $OUT/ab-w3-light $OUT/ab-w3-dark
L "build bp8"; (uptime; $GD --timeout 30 -- node $H/build.mjs $WT --out $OUT --label bp8; echo "build exit $?"; uptime) > $REC/build-bp8.log 2>&1
L "start PR"; (uptime; $GD --light --timeout 10 -- node $H/prose.mjs $WT --out $OUT/pr; echo "exit $?"; uptime) > $REC/PR-bp/PR.log 2>&1
find $OUT/pr -name PR.json -exec cp {} $REC/PR-bp/PR.json \; ; L "end PR"
L "start F7"; (uptime; $GD --timeout 60 -- node $H/f7.mjs $WT --out $OUT/f7; echo "exit $?"; uptime) > $REC/F7-bp/F7.log 2>&1
find $OUT/f7 -name F7.json -exec cp {} $REC/F7-bp/F7.json \; ; cp $OUT/f7/runs/F7-wt/units.log $REC/F7-bp/units.log 2>/dev/null
(cd $WT && node $S/bg.mjs dist-demo) > $REC/F7-bp/boot-graph.txt 2>&1; L "end F7"
grep -q "margin -" $REC/F7-bp/boot-graph.txt && { L "STOP: boot graph over its ceiling"; exit 1; }
L "start pre-check chromium"; (uptime; $GD --timeout 30 -- bash -c "node $S/slotink.mjs --build $OUT/builds/bp8 --adapter $AD --engine chromium --runs 1; node $H/w3-morph.mjs --build $OUT/builds/bp8 --adapter $AD --out $OUT/pre/w3 --engine chromium; for k in 1 2; do node $H/w3-morph.mjs --build $OUT/builds/bp8 --adapter $AD --out $OUT/pre/w3-retarget-\$k --engine chromium --cells '^retarget·(40|80|120)$'; done; DOCK_HARNESS_THEME=dark node $H/w3-morph.mjs --build $OUT/builds/bp8 --adapter $AD --out $OUT/pre/w3-retarget-dark --engine chromium --cells '^retarget·(40|80|120)$'; node $H/film.mjs --build $OUT/builds/bp8 --adapter $AD --out $OUT/pre/fm --engine chromium"; echo "exit $?"; uptime) > $REC/pre/pre-chromium.log 2>&1; L "end pre-check"
grep -E "run 1: .*longest run [1-9]" $REC/pre/pre-chromium.log && { L "STOP: an empty display frame in the pre-check"; exit 1; }
grep -E "^FAIL .*FAILED: .*splice" $REC/pre/pre-chromium.log && { L "STOP: a splice in the pre-check"; exit 1; }
for e in chromium webkit; do for t in light dark; do
  L "start bp8 $e $t"
  BUILD=bp8 ENG=$e REC=$BAT THEME=$t TMIN=90 WT=$WT bash $H/battery.sh $OUT theme >> $BAT/chain-bp8-$e.log 2>&1
  L "end bp8 $e $t exit $?"
done; done
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
L "start cost"; bash $S/cost.sh 3; L "CHAIN4-DONE"
