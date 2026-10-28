#!/bin/zsh
# D4 pass 10 · CRITIC seat · the order run. Phase 1: state, patch, SHEET self-test, libbuild, vue-tsc, builds, SHEET on the
# clean builds, plant builds (each with its SHEET read), units, unit plants, bundle, XSCRIPT. Phase 2: the Chromium battery,
# reads and probes, and film; then three Playwright WebKit holds, each queued on the one machine-wide `--exclusive webkit`
# lock and never cancelled for the wait. Serial: one heavy run at a time.
#   chain-b10.sh [stage ...]   (no argument: the whole order)
R=${0:A:h}/run-crit10.sh; C=${0:A:h}/logs/chain.log
mkdir -p ${0:A:h}/logs
st() { echo "$(date '+%F %T') $* · load $(sysctl -n vm.loadavg)" >> $C; }
step() { st "start $*"; zsh $R "$@"; st "exit $? $*"; }
stages=($@); [[ ${#stages} -eq 0 ]] && stages=(state patch sheet libbuild tsc build sheet-clean plant-builds sheet-lane-plants unit unit-plants bundle xscript PHASE1 chromium-battery chromium-reads chromium-film chromium-attack webkit-a webkit-b webkit-c webkit-d webkit-e)
st "CHAIN at $(git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p10/crit10/wt rev-parse --short HEAD) · harness $(node -e 'import("'${0:A:h}'/../../harness/lib.mjs").then(m=>console.log(m.HARNESS.rev+" "+m.HARNESS.hash))') · stages ${stages}"
for s in $stages; do [[ $s == PHASE1 ]] && { st "PHASE1-DONE"; continue; }; step $s; done
st "CHAIN-DONE"
