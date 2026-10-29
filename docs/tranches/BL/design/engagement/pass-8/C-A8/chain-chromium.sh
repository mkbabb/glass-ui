#!/bin/zsh
# C-A8 Chromium phase: every stage in its own guarded call, one at a time (stages.sh).
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-8/C-A8
echo "# $(date '+%F %T') chromium chain start · load $(sysctl -n vm.loadavg)"
ENGINE=chromium $C/stages.sh ca8 ca8-probe E-10 E-13 tip plant-cand7 plant-loupe6 plant-chipfaint plant-crest plant-prmY plant-nomask ca8-cand7 probe-E-10 probe-E-13 probe-E-3 probe-tip idle probe-idle E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 prmplant E-11 E-12 cap
echo "# $(date '+%F %T') chromium chain end · load $(sysctl -n vm.loadavg)"
