#!/bin/zsh
# D4 pass 11 · CRITIC · rebuild of the three A11 builds. The chain's first build of them (run-crit11.sh `build`,
# `plant-builds`) ran before routes/A11/route.json existed, so build.mjs built them with "migration none" (no A11
# composition). This script rebuilds a11-src, a11-ws-src (weight-step plant) and a11-ax-src (a11y-unexempt plant) with the
# same commands, each plant restored and checked by plants.mjs state. A new file, not an edit of the running driver.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p11/crit11; WT=$W/wt; O=$W/out
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile; HN=$T/harness; C=$T/pass-11/D4-Dp11-crit; A11=$C/routes/A11
G=~/.claude/guard/guarded; F=$C/logs/rebuild-a11.log
export TILE_HARNESS_OUT=$O
pst() { node $HN/plants.mjs $WT state; }
echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · before: $(pst)" > $F
$G --rss-gb 8 --timeout 20 -- node $HN/build.mjs $WT --label a11-src --out $O --flavor src --route $A11 >> $F 2>&1; echo "a11-src build exit $?" >> $F
node $HN/plants.mjs $WT apply weight-step >> $F 2>&1
$G --rss-gb 8 --timeout 20 -- node $HN/build.mjs $WT --label a11-ws-src --out $O --flavor src --route $A11 >> $F 2>&1; echo "a11-ws-src build exit $?" >> $F
node $HN/plants.mjs $WT restore >> $F 2>&1; echo "restore exit $?" >> $F
AX=$WT/src/styles/accessibility.css; s0=$(pst); command cp $AX $O/ax-restore
node -e 'const fs=require("fs"),[f,o,n]=process.argv.slice(1),t=fs.readFileSync(f,"utf8");if(t.split(o).length!==2){console.error("anchor not unique");process.exit(2)}fs.writeFileSync(f,t.replace(o,n))' $AX '):not(.toggle-group__item) {
            border-color: currentColor !important;' ') {
            border-color: currentColor !important;' >> $F 2>&1; echo "plant a11y-unexempt applied exit $?" >> $F
$G --rss-gb 8 --timeout 20 -- node $HN/build.mjs $WT --label a11-ax-src --out $O --flavor src --route $A11 >> $F 2>&1; echo "a11-ax-src build exit $?" >> $F
command cp $O/ax-restore $AX; s1=$(pst); echo "a11y-unexempt restore: $([[ $s0 == $s1 ]] && echo equal || echo DIFFERS) · $s1" >> $F
echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · after: $(pst)" >> $F
