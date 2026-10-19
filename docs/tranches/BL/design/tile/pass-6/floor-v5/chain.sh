#!/bin/zsh
# FLOOR-V5 seat · the order run, serial (one heavy run at a time). Each stage's start and exit with load go to
# logs/chain.log. Part 1: states, typecheck, units, library builds, scene builds. Part 2: Chromium reads.
# Part 3 (chain-wk.sh): Playwright WebKit, in --exclusive webkit holds.
D=${0:A:h}; R=$D/run-fv5.sh; C=$D/logs/chain.log
st() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · start $*" >> $C; zsh $R "$@"; echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · exit $? $*" >> $C; }
echo "=== chain $(date '+%F %T')" >> $C
for x in fv5 dp f; do
  st state $x
  st tsc $x
  st libbuild $x
  st unit $x
  [[ $x == fv5 ]] && st unit-plants
  st build $x
done
st state fv5
st xscript
st probe chromium
for x in fv5 dp f; do st reads $x chromium; done
for x in dp f; do st battery $x chromium; done
echo "=== chain done $(date '+%F %T')" >> $C
