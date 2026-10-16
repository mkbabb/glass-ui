#!/bin/zsh
# C-E2 queue 2: the critic probe (re-read + WebKit + noveil), P-E2's own probe replayed, E-10 re-reads, noveil rows, A2-app census.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/C-E2
E2=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/E2
O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p2/C-E2/wt/.ce2-out/builds
GUARD=~/.claude/guard/guarded
stamp() { echo "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
pr() { # <script> <build> <label> <engine> <log>
  X=(); [ $4 = webkit ] && X=(--exclusive webkit)
  { stamp "start"; $GUARD $X --timeout 30 -- node $1 --build $O/$2 --label $3 --engine $4 --shots $D/shots; stamp "end exit $?"; } > $D/logs/$5.log 2>&1; }
cd $D
pr probe/ce2-probe.mjs veil-probe veil chromium probe-veil-chromium-r2
pr probe/ce2-probe.mjs veil-probe veil webkit probe-veil-webkit
pr probe/ce2-probe.mjs noveil-probe noveil chromium probe-noveil-chromium
pr probe/ce2-probe.mjs veil-probe veil webkit probe-veil-webkit-r2
pr $E2/probe/probe.mjs veil-probe pe2-veil chromium pe2probe-veil-chromium
pr $E2/probe/probe.mjs veil-probe pe2-veil webkit pe2probe-veil-webkit
./run-ce2.sh veil e10r1 chromium --only E-10
./run-ce2.sh veil e10r2 chromium --only E-10
./run-ce2.sh noveil kbd chromium --only E-3,E-10,E-11
./run-ce2.sh noveil kbd webkit --only E-3,E-10,E-11
./run-ce2.sh veil-a2app e1e2 chromium --only E-1,E-2
./run-ce2.sh veil-a2app e1e2 webkit --only E-1,E-2
echo "queue2 done $(date '+%F %T')"
