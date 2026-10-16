#!/bin/zsh
# chain2.sh <engine>: the coarse-tap commit frames (probe/coarse-commit.mjs) on both builds; on WebKit, also the CK-25
# capture set for both builds (CP's WebKit glance was UNMEASURED). Every step through the guard.
E=$1
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/C-CP; H=$C/../../harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p2/C-CP/wt; B=$WT/.cpc-out/builds
G=~/.claude/guard/guarded; XW=""; [[ $E == webkit ]] && XW="--exclusive webkit"
stamp() { echo "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
for b in css waapi; do stamp "coarse $b start"; $G ${=XW} --light --timeout 10 -- node $C/probe/coarse-commit.mjs --build $B/$b --label $b --engine $E --frames $C/glance/coarse --out $C/json/coarse; stamp "coarse $b end exit $?"; done
if [[ $E == webkit ]]; then cd $H; for b in css waapi; do stamp "capture $b webkit start"; $G --exclusive webkit --light --timeout 40 -- node capture.mjs --build $B/$b --label $b --engines webkit --frames $C/glance/frames --sheets $C/glance --scenes button,switch,slider,accordion; stamp "capture $b webkit end exit $?"; done; fi
echo CHAIN2-$E-DONE
