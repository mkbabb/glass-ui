#!/bin/zsh
# phase 2, serial: F's route builds (state switch and back), the Chromium battery and reads, then the two WebKit holds.
R=${0:A:h}/run-crit.sh; C=${0:A:h}/logs/chain.log
st() { echo "$(date '+%F %T') $* · load $(sysctl -n vm.loadavg)" >> $C; }
step() { st "start $*"; $R "$@"; st "exit $? $*"; }
st "CHAIN2"
step state f; step build-f; step state dp
for s in chromium-battery chromium-reads webkit-a webkit-b; do step $s; done
st "CHAIN2-DONE"
