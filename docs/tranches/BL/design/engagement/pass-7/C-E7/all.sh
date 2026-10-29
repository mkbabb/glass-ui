#!/bin/zsh
# C-E7 the whole battery: the Chromium phase stage by stage (one guarded call each), then ONE WebKit acquisition.
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7/C-E7
S=(ce7probe e7probe E-10 E-4 sheetv E-1 E-2 E-3 E-5 E-6 E-7 E-8 E-9 E-11 E-12 prmplant cap idle plant-clip6 plant-clipOnly plant-pvOnly plant-fling6 plant-loupe6 plant-chipmute plant-prmY plant-crest plant-thumb)
echo "# $(date '+%F %T') chromium phase · load $(sysctl -n vm.loadavg)"
ENGINE=chromium $C/stages.sh $S
echo "# $(date '+%F %T') webkit phase · load $(sysctl -n vm.loadavg)"
$C/chain-webkit.sh $S
echo "# $(date '+%F %T') all done · load $(sysctl -n vm.loadavg)"
