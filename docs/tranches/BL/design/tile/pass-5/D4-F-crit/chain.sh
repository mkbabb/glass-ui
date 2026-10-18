#!/bin/zsh
# The order, serial: phase 1 (state, library build, typecheck, scene builds, variants, suite, plants, bundle, XSCRIPT,
# D′'s builds on a state switch and back), phase 2 (the Chromium battery and reads, then the two WebKit holds).
R=${0:A:h}/run-crit.sh; C=${0:A:h}/logs/chain.log
st() { echo "$(date '+%F %T') $* · load $(sysctl -n vm.loadavg)" >> $C; }
step() { st "start $*"; zsh $R "$@"; st "exit $? $*"; }
st "CHAIN at $(git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p5/D4-F-crit/wt rev-parse --short HEAD)"
for s in ${@:-1 2}; do
  if [[ $s == 1 ]]; then
    step state f
    for x in libbuild tsc build build-extra unit unit-plants bundle xscript; do step $x; done
    step state dp; step build-dp; step state f
    st "PHASE1-DONE"
  else
    for x in chromium-battery chromium-reads webkit-a webkit-b; do step $x; done
    st "PHASE2-DONE"
  fi
done
st "CHAIN-DONE"
