#!/bin/zsh
# C-E3: every Playwright WebKit stage inside ONE `guarded --exclusive webkit` acquisition, queued, never skipped:
#   ~/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh wk-ce3.sh
# Each witness/probe is its own node process (a fresh WebKit per process; lib.mjs relaunches every 60 navigations, H3-1).
# Strictly sequential: one browser at a time.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/C-E3
cd $D
# the builds stage must have finished (logs/chain.txt ends with its done line)
until grep -q "run-ce3 done" logs/chain.txt; do sleep 15; done
print -- "# wk-ce3 admitted $(date '+%F %T') load $(sysctl -n vm.loadavg)"
zsh run-ce3.sh bat-veil-webkit-E-10,E-3,E-11 bat-noveil-webkit-E-3,E-10,E-11 bat-p-anchor-webkit-E-10 bat-p-char-webkit-E-3 bat-p-script-webkit-E-3 \
  probe-veil-webkit probe-noveil-webkit probe-p-scrubveil-webkit ce3-veil-webkit ce3-noveil-webkit \
  bat-veil-webkit-E-1,E-2,E-4,E-5,E-6,E-7,E-8,E-9
print -- "# wk-ce3 done $(date '+%F %T') load $(sysctl -n vm.loadavg)"
