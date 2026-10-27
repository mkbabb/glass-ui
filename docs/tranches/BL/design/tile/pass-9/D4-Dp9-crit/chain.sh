#!/bin/zsh
# D4-D′ pass-9 critic · the order run. Phase 1: state, engine-free reads, builds, units, plants, bundle, XSCRIPT.
# Phase 2: the Chromium battery and reads, then the two Playwright WebKit holds, each queued on the one machine-wide
# `--exclusive webkit` lock and never cancelled for the wait. Serial: one heavy run at a time.
#   chain.sh [stage ...]   (no argument: the whole order)
R=${0:A:h}/run-crit9.sh; C=${0:A:h}/logs/chain.log
mkdir -p ${0:A:h}/logs
st() { echo "$(date '+%F %T') $* · load $(sysctl -n vm.loadavg)" >> $C; }
step() { st "start $*"; zsh $R "$@"; st "exit $? $*"; }
stages=($@); [[ ${#stages} -eq 0 ]] && stages=(state sheet sheet-plants libbuild tsc build plant-builds unit unit-plants bundle xscript chromium-battery chromium-reads chromium-film webkit-a webkit-b)
st "CHAIN at $(git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p9/crit9/wt rev-parse --short HEAD) · stages ${stages}"
for s in $stages; do step $s; done
st "CHAIN-DONE"
