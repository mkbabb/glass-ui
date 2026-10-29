#!/bin/zsh
# D4 pass 11 · CRITIC seat · the order run (REGISTRY §P10-6 (2)). Phase 1: state, patch, the critic's source scan, SHEET
# self-test, libbuild, vue-tsc, builds, SHEET on the clean builds, plant builds (each with its SHEET read), the lane
# plants, units, unit plants, bundle, XSCRIPT. Phase 2: the Chromium battery, reads and probes, film, attack and states;
# then six Playwright WebKit holds, each queued on the one machine-wide `--exclusive webkit` lock and never cancelled
# for the wait. Serial: one heavy run at a time.
#   chain.sh [stage ...]   (no argument: the whole order)
R=${0:A:h}/run-crit11.sh; C=${0:A:h}/logs/chain.log
mkdir -p ${0:A:h}/logs
st() { echo "$(date '+%F %T') $* · load $(sysctl -n vm.loadavg)" >> $C; }
step() { st "start $*"; zsh $R "$@"; st "exit $? $*"; }
stages=($@); [[ ${#stages} -eq 0 ]] && stages=(state patch crit-scan sheet libbuild tsc build sheet-clean plant-builds sheet-lane-plants unit unit-plants bundle xscript PHASE1 chromium-battery chromium-reads chromium-film chromium-attack states-chromium webkit-a webkit-b webkit-c webkit-d webkit-e webkit-f)
st "CHAIN at $(git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p11/crit11/wt rev-parse --short HEAD) · harness $(node -e 'import("'${0:A:h}'/../../harness/lib.mjs").then(m=>console.log(m.HARNESS.rev+" "+m.HARNESS.hash))') · stages ${stages}"
for s in $stages; do [[ $s == PHASE1 ]] && { st "PHASE1-DONE"; continue; }; step $s; done
st "CHAIN-DONE"
