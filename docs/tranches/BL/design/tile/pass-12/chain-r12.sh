#!/bin/zsh
# D4 pass 12 · RE-MEASURE seat · pass-11/chain-r11.sh, re-pointed at run-r12.sh, with BUILD's resume-added stage
# `sheet-lane-plants` placed after `plant-builds` (its builds read the same clean worktree). Serial: one heavy run at a time.
#   chain-r12.sh [stage ...]   (no argument: the whole order)
R=${0:A:h}/run-r12.sh; C=${0:A:h}/logs/chain.log
mkdir -p ${0:A:h}/logs
st() { echo "$(date '+%F %T') $* · load $(sysctl -n vm.loadavg)" >> $C; }
step() { st "start $*"; zsh $R "$@"; st "exit $? $*"; }
stages=($@); [[ ${#stages} -eq 0 ]] && stages=(state patch sheet libbuild tsc build sheet-clean plant-builds sheet-lane-plants unit unit-plants bundle xscript PHASE1 chromium-battery chromium-reads chromium-film webkit-a webkit-b webkit-c)
st "CHAIN at $(git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p12/remeasure12/wt rev-parse --short HEAD) · harness $(node -e 'import("'${0:A:h}'/../harness/lib.mjs").then(m=>console.log(m.HARNESS.rev+" "+m.HARNESS.hash))') · stages ${stages}"
for s in $stages; do [[ $s == PHASE1 ]] && { st "PHASE1-DONE"; continue; }; step $s; done
st "CHAIN-DONE"
