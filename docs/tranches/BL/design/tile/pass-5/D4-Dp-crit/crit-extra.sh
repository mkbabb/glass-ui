#!/bin/zsh
# Sitting 2's extra stage: the name-lift probe (probes/crit-name-lift.mjs) in Playwright WebKit on both route builds,
# inside its own `--exclusive webkit` hold, after chain2's holds. (The Chromium reads of crit-name-trace and
# crit-name-lift ran by hand through guarded; their logs are logs/crit-name-trace-chromium.log and
# logs/crit-name-lift-chromium.log.) Kept out of run-crit.sh so the running chain's script is never edited mid-read.
S=${0:A:h}; L=$S/logs; B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p5/D4-Dp-crit/out/builds
O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p5/D4-Dp-crit/out
F=$L/crit-name-lift-webkit.log
echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)" > $F
~/.claude/guard/guarded --rss-gb 8 --exclusive webkit --timeout 30 -- zsh -c '
  echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"
  for b in dp-src f-src; do node '$S'/probes/crit-name-lift.mjs --build '$B'/$b --engine webkit --out '$O'; echo "exit $? ($b)"; done' >> $F 2>&1
echo "exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $F
