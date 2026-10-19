#!/bin/zsh
# phase 1, serial: state, library build, typecheck, scene builds, measurement variants, whole suite, unit plants, bundle,
# XSCRIPT; then D′'s builds (state switch and back).
R=${0:A:h}/run-crit.sh; C=${0:A:h}/logs/chain.log
st() { echo "$(date '+%F %T') $* · load $(sysctl -n vm.loadavg)" >> $C; }
step() { st "start $*"; zsh $R "$@"; st "exit $? $*"; }
st "CHAIN1 at $(git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p6/D4-F-crit/wt rev-parse --short HEAD)"
step state f
for s in libbuild tsc build build-extra unit unit-plants bundle xscript; do step $s; done
step state dp; step build-dp; step state f
st "CHAIN1-DONE"
