#!/bin/zsh
# FLOOR-V5 seat · part 3: every Playwright WebKit read, in two `--exclusive webkit` holds (each under the guard's 90-min
# cap), queued behind the machine-wide WebKit lock and never cancelled for the wait. Stages and loads to logs/chain.log.
D=${0:A:h}; R=$D/run-fv5.sh; C=$D/logs/chain.log
st() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · start $*" >> $C; zsh $R "$@"; echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · exit $? $*" >> $C; }
echo "=== chain-wk $(date '+%F %T')" >> $C
st wk A probe:- reads:fv5 reads:dp reads:f
st wk B battery:dp battery:f
echo "=== chain-wk done $(date '+%F %T')" >> $C
