#!/bin/zsh
# C-A2 queue 2: probes, E-5 re-reads, the capture replay; after queue 1.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/C-A2
B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p2/C-A2/wt/.ca2-out/builds
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
G=~/.claude/guard/guarded
until [ -f $D/logs/queue1.done ]; do sleep 20; done
st() { echo "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
for b in light-a geom-a; do for e in chromium webkit; do X=(); [ $e = webkit ] && X=(--exclusive webkit)
  { st "collide $b $e"; $G --light $X --timeout 10 -- node $D/probe/collide.mjs $B/$b $e; st end; } > $D/logs/collide-$b-$e.log 2>&1; done; done
{ st fl3; $G --light --timeout 10 -- node $D/../A2/probe/fl3.mjs $B/light-a; st end; } > $D/logs/fl3-light-a.log 2>&1
$D/run-ca2.sh light-h wt e5r1 --engines chromium --only E-5 --scenes toggle
$D/run-ca2.sh light-h wt e5r2 --engines chromium --only E-5 --scenes toggle
mkdir -p $D/glance
cd $H; { st "capture light-a chromium"; $G --light --timeout 40 -- node capture.mjs --build $B/light-a --label ca2-light --engines chromium --frames $D/glance/frames --sheets $D/glance; st end; } > $D/logs/capture-light-a-chromium.log 2>&1
echo "queue2 done $(date '+%T')" > $D/logs/queue2.done
