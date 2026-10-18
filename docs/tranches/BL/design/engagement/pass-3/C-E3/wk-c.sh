#!/bin/zsh
# C-E3: WebKit part c (P-A3's and C-A3's probes replayed on the composition) after part b, its own acquisition.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/C-E3
cd $D
while ! grep -q 'wk part b exit' logs/wk-chain.txt; do sleep 15; done
print -- "# queue wk-ce3 c $(date '+%F %T') load $(sysctl -n vm.loadavg)"
~/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh wk-ce3.sh c
print -- "# wk part c exit $? $(date '+%F %T')"
