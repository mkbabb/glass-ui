#!/bin/zsh
# phase 2, serial: the Chromium battery and reads, then the two WebKit holds (queued on the one machine-wide lock).
R=${0:A:h}/run-crit.sh; C=${0:A:h}/logs/chain.log
st() { echo "$(date '+%F %T') $* · load $(sysctl -n vm.loadavg)" >> $C; }
step() { st "start $*"; zsh $R "$@"; st "exit $? $*"; }
st "CHAIN2"
for s in chromium-battery chromium-reads webkit-a webkit-b; do step $s; done
st "CHAIN2-DONE"
