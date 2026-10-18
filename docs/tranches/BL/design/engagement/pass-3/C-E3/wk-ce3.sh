#!/bin/zsh
# C-E3: Playwright WebKit stages inside ONE `guarded --exclusive webkit` acquisition per part, queued, never skipped:
#   ~/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh wk-ce3.sh <part>
# Each witness/probe is its own node process (fresh WebKit per process; lib.mjs relaunches every 60 navigations, H3-1).
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/C-E3
cd $D
print -- "# wk-ce3 $1 admitted $(date '+%F %T') load $(sysctl -n vm.loadavg)"
case $1 in
  a) zsh run-ce3.sh bat-veil-webkit-E-3,E-10,E-11 bat-noveil-webkit-E-3,E-10,E-11 bat-p-anchor-webkit-E-10 \
       bat-p-char-webkit-E-3 bat-p-script-webkit-E-3 bat-p-tabhand-webkit-E-3 \
       probe-veil-webkit probe-noveil-webkit probe-p-scrubveil-webkit probe-p-vis-webkit ce3-veil-webkit ce3-noveil-webkit \
       bat-veil-webkit-E-1,E-2,E-4,E-5,E-6,E-7,E-8,E-9 ;;
  b) zsh run-ce3.sh cap-veil-webkit cap-noveil-webkit probe-veil-webkit-shots ;;
esac
print -- "# wk-ce3 $1 done $(date '+%F %T') load $(sysctl -n vm.loadavg)"
