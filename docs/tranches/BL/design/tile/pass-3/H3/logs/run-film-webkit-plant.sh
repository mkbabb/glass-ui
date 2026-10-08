#!/bin/zsh
# H3-13 · the film pair's planted FAIL in Playwright WebKit (film-pair-selftest.log stopped at the Chromium plant's exit 2)
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/harness; O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p3/h3/out; cd /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-3/H3/logs
L=film-pair-selftest-webkit-plant.log
echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)" > $L
node $H/film.mjs --pair --arms plated=fixture,planted=fixture:t5-stop@specimen --dest $O/pair-plant-wk --scratch $O/pair-scratch --modes light --pointers fine --engines webkit >> $L 2>&1
echo "exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $L
