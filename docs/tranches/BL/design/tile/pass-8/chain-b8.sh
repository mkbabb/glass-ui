#!/bin/zsh
# D4 pass 8 · BUILD seat · the order run: engine-free reads, builds, units, plants, bundle, XSCRIPT; then the Chromium
# battery and reads; then the two Playwright WebKit holds, each queued on the one machine-wide `--exclusive webkit` lock
# and never cancelled for the wait. Serial: one heavy run at a time.
R=${0:A:h}/run-b8.sh; C=${0:A:h}/logs/chain.log
mkdir -p ${0:A:h}/logs
st() { echo "$(date '+%F %T') $* · load $(sysctl -n vm.loadavg)" >> $C; }
step() { st "start $*"; zsh $R "$@"; st "exit $? $*"; }
st "CHAIN at $(git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p8/build8/wt rev-parse --short HEAD)"
for s in state patch sheet sheet-plants libbuild tsc build plant-builds unit unit-plants bundle xscript; do step $s; done
st "PHASE1-DONE"
for s in chromium-battery chromium-reads webkit-a webkit-b; do step $s; done
st "CHAIN-DONE"
