#!/bin/zsh
# chain5.sh: WebKit (light runs, each through the guard's exclusive WebKit slot), then the captures still owed.
# The worktree holds CP-waapi.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/CP
H=$D/../../harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p2/CP/wt
GUARD=~/.claude/guard/guarded
stamp() { echo "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
WITS="E-4 E-5 E-6 E-7 E-8 E-9 E-10 E-11" $D/run-battery.sh waapi r2 webkit >> $D/logs/battery-waapi-r2.log 2>&1
for b in css waapi; do $GUARD --exclusive webkit --light --timeout 10 -- node $D/probe/failloud.mjs --build $WT/.cp-out/builds/$b --label $b --engine webkit --out $D/json/failloud; done > $D/logs/failloud-webkit.log 2>&1
for r in 2 3; do $D/run-cp.sh $r webkit > $D/logs/cp-rep$r-webkit.log 2>&1; done
for i in 1 2; do for b in css waapi; do for e in chromium webkit; do XW=""; [[ $e == webkit ]] && XW="--exclusive webkit"; stamp "E-4 reread $i $b $e"; (cd $H && $GUARD ${=XW} --light --timeout 8 -- node e4-momentum.mjs --build $WT/.cp-out/builds/$b --engine $e --scenes slider --out $D/json/e4-reread-$i-$b) | grep -E "^\s+(PASS|FAIL|UNMEAS)|^E-4"; done; done; done > $D/logs/e4-reread.log 2>&1
echo WEBKIT-DONE >> $D/logs/e4-reread.log
cd $H
for b in waapi; do stamp "capture $b chromium start"; $GUARD --timeout 40 -- node capture.mjs --build $WT/.cp-out/builds/$b --label $b --engines chromium --frames $D/glance/frames --sheets $D/glance --scenes button,switch,slider,accordion; stamp "capture $b chromium end exit $?"; done >> $D/logs/capture-chromium.log 2>&1
for b in css waapi; do stamp "capture $b webkit start"; $GUARD --exclusive webkit --timeout 40 -- node capture.mjs --build $WT/.cp-out/builds/$b --label $b --engines webkit --frames $D/glance/frames --sheets $D/glance --scenes button,switch,slider,accordion; stamp "capture $b webkit end exit $?"; done > $D/logs/capture-webkit.log 2>&1
echo CHAIN5-DONE >> $D/logs/capture-webkit.log
