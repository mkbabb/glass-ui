#!/bin/zsh
# phase 1, serial: state, library build, typecheck, scene builds, whole suite, unit plants, bundle, R-3 plant build,
# XSCRIPT; then F's builds (state switch and back).
R=${0:A:h}/run-crit.sh; C=${0:A:h}/logs/chain.log
st() { echo "$(date '+%F %T') $* · load $(sysctl -n vm.loadavg)" >> $C; }
step() { st "start $*"; zsh $R "$@"; st "exit $? $*"; }
st "CHAIN1 at $(git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p6/D4-Dp-crit/wt rev-parse --short HEAD)"
step state dp
for s in libbuild tsc build unit unit-plants bundle pop0-build xscript; do step $s; done
step state f; step build-f; step state dp
st "CHAIN1-DONE"
