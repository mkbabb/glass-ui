#!/bin/zsh
# D4-D′ pass-7 critic · the order run. Phase 1 (state, engine-free reads, builds, units, plants, bundle, XSCRIPT), then
# phase 2 (the Chromium battery, reads, probes and glance pair, then the two Playwright WebKit holds, each queued on the
# one machine-wide `--exclusive webkit` lock and never cancelled for the wait). Serial: one heavy run at a time.
R=${0:A:h}/run-crit.sh; C=${0:A:h}/logs/chain.log
st() { echo "$(date '+%F %T') $* · load $(sysctl -n vm.loadavg)" >> $C; }
step() { st "start $*"; zsh $R "$@"; st "exit $? $*"; }
st "CHAIN at $(git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p7/D4-Dp-crit/wt rev-parse --short HEAD)"
for s in state sheet sheet-plants libbuild tsc build plant-builds unit unit-plants bundle pop0-build xscript; do step $s; done
st "PHASE1-DONE"
for s in chromium-battery chromium-reads chromium-film webkit-a webkit-b; do step $s; done
st "CHAIN-DONE"
