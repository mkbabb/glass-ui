#!/bin/bash
# Critic 2, chain 3: the detented Sheet dismissed by a drag, on both trees.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/critic-2
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$D/logs; G=~/.claude/guard/guarded
one() { # <label> <tree> <port>
  $G --timeout 10 -- bash -c "cd $2 && (BROWSER=none npm run dev -- --host localhost --port $3 > $L/serve-$1.log 2>&1 & echo \$! > $L/serve-$1.pid); for i in \$(seq 1 60); do curl -s -o /dev/null http://localhost:$3/ && break; sleep 1; done; node $D/probe/detent-drag.mjs http://localhost:$3 $L/detent-drag-$1.json > $L/detent-drag-$1.log 2>&1; rc=\$?; kill \$(cat $L/serve-$1.pid); rm -f $L/serve-$1.pid; exit \$rc"
  rc=$?; echo "$(date +%T) detent-drag-$1 exit $rc" >> $L/runs.out
}
one tip $W 5353
one red $W/.cache/red-v11.1.0/tree 5354
echo "CHAIN3-DONE $(date +%T)" >> $L/runs.out
