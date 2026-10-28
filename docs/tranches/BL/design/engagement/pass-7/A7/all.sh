#!/bin/zsh
# P-A7 the whole battery: the Chromium phase stage by stage, then ONE WebKit acquisition for every WebKit stage.
A=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7/A7
S=(E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 E-10 E-11 E-12 prmplant cap plant-chipmute plant-prmY plant-crest plant-thumb)
echo "# $(date '+%F %T') chromium phase · load $(sysctl -n vm.loadavg)"
$A/chain-chromium.sh $S
echo "# $(date '+%F %T') webkit phase · load $(sysctl -n vm.loadavg)"
$A/chain-webkit.sh $S
echo "# $(date '+%F %T') all done · load $(sysctl -n vm.loadavg)"
