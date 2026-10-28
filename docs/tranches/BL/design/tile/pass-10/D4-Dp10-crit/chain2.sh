#!/bin/zsh
# D4 pass 10 · CRITIC · the second order run, after chain.sh's CHAIN-DONE: the CSS-coverage plants (H9 SHEET vs H8's),
# and the two non-weight selected widenings (letter-spacing, font-variation-settings), read by the unit, T-4 and
# CRIT10-GEOM in both engines. Serial; the WebKit hold queues on the one machine-wide lock.
R=${0:A:h}/run-crit10.sh; C=${0:A:h}/logs/chain.log
st() { echo "$(date '+%F %T') $* · load $(sysctl -n vm.loadavg)" >> $C; }
step() { st "start $*"; zsh $R "$@"; st "exit $? $*"; }
stages=($@); [[ ${#stages} -eq 0 ]] && stages=(crit-css-plants crit-l5-plants crit-l5-chromium crit-l5-webkit)
st "CHAIN2 · stages ${stages}"
for s in $stages; do step $s; done
st "CHAIN2-DONE"
