#!/bin/zsh
# chain3.sh: Chromium extras: E-4 and E-10 on every gated scene (both builds), the forced-colours probe, and the
# CK-25 capture set (both builds). Through the guard.
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/C-CP; H=$C/../../harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p2/C-CP/wt; B=$WT/.cpc-out/builds; G=~/.claude/guard/guarded
stamp() { echo "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
cd $H
for b in css waapi; do for w in E-4 E-10; do stamp "$w all $b start"; $G --light --timeout 30 -- node run.mjs --build $B/$b --wt $WT/.trees/$b --only $w --engines chromium --out $C/json/all-$b-chromium --verbose; stamp "$w all $b end exit $?"; done; done
for b in css waapi; do stamp "fc $b start"; $G --light --timeout 10 -- node $C/probe/fc.mjs --build $B/$b --label $b; stamp "fc $b end exit $?"; done
for b in css waapi; do stamp "capture $b chromium start"; $G --light --timeout 40 -- node capture.mjs --build $B/$b --label $b --engines chromium --frames $C/glance/frames --sheets $C/glance --scenes button,switch,slider,accordion; stamp "capture $b chromium end exit $?"; done
echo CHAIN3-DONE
