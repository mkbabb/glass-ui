#!/bin/zsh
# the FLOOR-V4 seat's chain, serial: each stage one guarded call (run-fv4.sh); every WebKit read in one
# --exclusive webkit hold at the end. logs/chain.log has each stage's start, exit and load. The worktree ends at
# HEAD + floor v4.
R=${0:A:h}/run-fv4.sh; C=${0:A:h}/logs/chain.log
st() { echo "$(date '+%F %T') $* · load $(sysctl -n vm.loadavg)" >> $C; }
step() { st "start $*"; $R "$@"; st "exit $? $*"; }
st "CHAIN at $(cd /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p5/floor4/wt && git rev-parse --short HEAD)"
for x in fv4 dp f; do
  step state $x
  step tsc $x
  step unit $x
  [[ $x == fv4 ]] && step unit-plants
  step libbuild $x
  step build $x
done
step state fv4
for x in fv4 dp f; do step reads $x chromium; done
step webkit-all
st "CHAIN-DONE"
