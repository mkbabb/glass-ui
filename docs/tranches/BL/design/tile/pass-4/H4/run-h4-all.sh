#!/bin/zsh
# H4 seat: the whole sequence, serial (one heavy run at a time). Every Chromium run first (it needs no WebKit lock),
# then every Playwright WebKit run under the machine-wide WebKit lock. Within each engine: the H4 cells (the new
# witnesses and T-2), the HEAD and HEAD + floor v2 baselines, then the rest of the self-test under the H4 hash.
# Stage markers go to logs/sequence.log. History: build-head, unit-head, build-f2 and unit-f2 ran from run-h4.sh
# directly or from earlier runs of this file, which were stopped in the guard's queues (logs/sequence.log says when).
#   run-h4-all.sh [chromium|webkit]   (both, in that order, by default)
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-4/H4/run-h4.sh
S=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-4/H4/logs/sequence.log
step() { echo "start $* · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $S; $R "$@"; echo "end $* · exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $S; }
for e in ${=${1:-chromium webkit}}; do
  [[ $e == chromium ]] && for w in FACT ATTACK CORNER REPORT T-2; do step selftest $w chromium; done
  [[ $e == webkit ]] && for w in FACT ATTACK CORNER REPORT T-2; do step selftest $w webkit; done
  step baseline head $e
  step baseline f2 $e
  for w in T-1 T-3 T-4 T-5 T-6 T-7 W-A W-B W-C W-D W-E CANON; do step selftest $w $e 180; done
  [[ $e == webkit ]] && step selftest T-8 both 120
done
echo "sequence done (${1:-chromium webkit}) · $(date '+%F %T')" >> $S
