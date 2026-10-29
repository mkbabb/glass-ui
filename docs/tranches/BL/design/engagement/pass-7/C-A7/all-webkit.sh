#!/bin/zsh
# C-A7b WebKit phase: ONE `guarded --exclusive webkit` acquisition for every WebKit stage, then the E-4 re-reads inside it.
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7/C-A7
echo "# $(date '+%F %T') queued · load $(sysctl -n vm.loadavg)"
~/.claude/guard/guarded --exclusive webkit --timeout 90 -- env ENGINE=webkit INSIDE=1 zsh -c "$C/stages.sh E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 E-10 E-11 E-12 sheet prmplant cap e7probe ca6 c7probe tabs4 tabs4b plant-chipmute plant-chipfaint plant-chipfaint-probe plant-prmY plant-crest plant-thumb plant-clip6 plant-clip6-loupe plant-loupe6 plant-fling6; $C/rereads.sh sortable:2 slider:2"
echo "# $(date '+%F %T') released · guarded exit $? · load $(sysctl -n vm.loadavg)"
