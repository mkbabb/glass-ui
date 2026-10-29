#!/bin/zsh
# C-A7b Chromium phase: every stage in its own guarded call, serially (one heavy run at a time). Log: logs/chain-chromium.log
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7/C-A7
S=(E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 E-10 E-11 E-12 sheet prmplant cap e7probe ca6 c7probe tabs4 tabs4b
   plant-chipmute plant-chipfaint plant-chipfaint-probe plant-prmY plant-crest plant-thumb plant-clip6 plant-clip6-loupe plant-loupe6 plant-fling6)
echo "# $(date '+%F %T') chromium phase · ${#S} stages · load $(sysctl -n vm.loadavg)"
for s in $S; do ENGINE=chromium TMO=60 $C/stages.sh $s; done
echo "# $(date '+%F %T') chromium phase done · load $(sysctl -n vm.loadavg)"
