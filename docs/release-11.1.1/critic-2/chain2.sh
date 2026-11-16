#!/bin/bash
# Critic 2, chain 2: the slider under reduced motion on both trees, one guarded browser
# run each, each with its own dev server started and stopped inside the run.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/critic-2
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$D/logs; G=~/.claude/guard/guarded
one() { # <label> <tree> <port>
  $G --timeout 10 -- bash -c "cd $2 && (BROWSER=none npm run dev -- --host localhost --port $3 > $L/serve-$1.log 2>&1 & echo \$! > $L/serve-$1.pid); for i in \$(seq 1 60); do curl -s -o /dev/null http://localhost:$3/ && break; sleep 1; done; node $D/probe/slider-reduce.mjs http://localhost:$3 $L/slider-reduce-$1.json > $L/slider-reduce-$1.log 2>&1; rc=\$?; kill \$(cat $L/serve-$1.pid); exit \$rc"
  rc=$?; echo "$(date +%T) slider-reduce-$1 exit $rc" >> $L/runs.out
}
one tip $W 5353
one red $W/.cache/red-v11.1.0/tree 5354
# The two disclosure standing cells whose WebKit phone film had 74 to 97 ms holes under load, alone, three times.
for i in 1 2 3; do bash $D/run.sh branch webkit-phone disc-$i "standing · (Collapsible|Accordion) by trigger"; done
# The one cell red on the tip, alone, three times.
for i in 1 2 3; do bash $D/run.sh branch webkit-desktop dsel-$i "fade · a dock Select"; done
echo "CHAIN2-DONE $(date +%T)" >> $L/runs.out
