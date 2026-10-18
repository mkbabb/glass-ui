#!/bin/zsh
# phase 1, serial: library build, typecheck, scene builds, whole suite, unit plants, bundle, R-3 plant build, XSCRIPT.
R=${0:A:h}/run-crit.sh; C=${0:A:h}/logs/chain.log
st() { echo "$(date '+%F %T') $* · load $(sysctl -n vm.loadavg)" >> $C; }
step() { st "start $*"; $R "$@"; st "exit $? $*"; }
st "CHAIN1 at $(git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p5/D4-Dp-crit/wt rev-parse --short HEAD)"
step state dp
for s in libbuild tsc build unit unit-plants bundle pop0-build xscript; do step $s; done
st "CHAIN1-DONE"
