#!/bin/zsh
# H3 self-test driver: one log per witness, wall clock and load at start and end of each
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/harness; O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p3/h3/out; cd /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-3/H3/logs
for id in T-1 T-2 T-3 T-4 T-5 T-6 T-7 T-8 W-A W-B W-C W-D W-E CANON; do
  L=selftest-$id.log
  echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)" > $L
  node $H/selftest.mjs --out $O/st --only $id >> $L 2>&1
  echo "exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $L
done
echo done > selftest.done
