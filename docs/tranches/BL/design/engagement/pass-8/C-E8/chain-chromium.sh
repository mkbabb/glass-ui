#!/bin/zsh
# C-E8 Chromium phase: every stage in its own guarded call, one at a time.
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-8/C-E8
echo "# $(date '+%F %T') chromium chain start · load $(sysctl -n vm.loadavg)"
S=(E-10 E-13 tip ce8 plant-cand7 ce8-cand7 ce8-probe probe-E-10 probe-E-13 probe-E-3 idle probe-idle E-4 E-1 E-2 E-3 E-5 E-6 E-7 E-8 E-9 prmplant E-11 E-12 cap); (( $# )) && S=("$@")
ENGINE=chromium $C/stages.sh "${S[@]}"
echo "# $(date '+%F %T') chromium chain end · load $(sysctl -n vm.loadavg)"
