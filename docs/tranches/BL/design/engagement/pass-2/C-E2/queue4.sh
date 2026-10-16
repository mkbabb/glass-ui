#!/bin/zsh
# C-E2 queue 4 (replaces queues 2-3 after the WebKit lock queue passed an hour): Chromium reads first, WebKit last.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/C-E2
E2=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/E2
O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p2/C-E2/wt/.ce2-out/builds
GUARD=~/.claude/guard/guarded
stamp() { echo "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
pr() { X=(); [ $4 = webkit ] && X=(--exclusive webkit)
  { stamp "start"; $GUARD $X --timeout 30 -- node $1 --build $O/$2 --label $3 --engine $4 --shots $D/shots; stamp "end exit $?"; } > $D/logs/$5.log 2>&1; }
cd $D
pr $E2/probe/probe.mjs veil-probe pe2-veil chromium pe2probe-veil-chromium
./run-ce2.sh veil e10r1 chromium --only E-10
./run-ce2.sh veil e10r2 chromium --only E-10
./run-ce2.sh veil e5r1 chromium --only E-5 --scenes accordion,toggle
./run-ce2.sh veil e5r2 chromium --only E-5 --scenes accordion,toggle
./run-ce2.sh noveil kbd chromium --only E-3,E-10,E-11
./run-ce2.sh veil-a2app e1e2 chromium --only E-1,E-2
echo "queue4 chromium done $(date '+%F %T')"
pr $E2/probe/probe.mjs veil-probe pe2-veil webkit pe2probe-veil-webkit
./run-ce2.sh noveil kbd webkit --only E-3,E-10,E-11
echo "queue4 done $(date '+%F %T')"
