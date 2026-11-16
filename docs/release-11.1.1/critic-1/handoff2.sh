#!/bin/bash
# Critic 1: after the second chain's leave probes, run the clip check, then the earlier
# release specs. The second chain's own shells are stopped by PID; its servers stay.
C=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/critic-1
L=$C/logs; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1; G=~/.claude/guard/guarded
until grep -q "PHASE2-leave-DONE\|STOP\|CHAIN2-DONE" $L/chain.txt; do sleep 2; done
grep -q "STOP" $L/chain.txt && exit 75
kids() { for k in $(pgrep -P $1); do kids $k; echo $k; done; }
for top in $(pgrep -f "critic-1/chain2.sh"); do
  for p in $(kids $top) $top; do
    cmd=$(ps -o command= -p $p 2>/dev/null)
    case "$cmd" in *"npm run dev"*|*vite*|*"--port 535"*|*esbuild*) ;; *) kill $p 2>/dev/null;; esac
  done
done
echo "$(date +%T) handoff 2: second chain stopped after its leave probes" >> $L/chain.txt
for i in $(seq 1 300); do curl -s -o /dev/null http://localhost:5351/ && break; sleep 2; done
if ! curl -s -o /dev/null http://localhost:5351/; then
  (cd $W && exec $G --timeout 90 -- npm run dev -- --host localhost --port 5351 --strictPort >> $L/serve-5351.log 2>&1) &
  echo $! >> $L/srv-5351.pid
  for i in $(seq 1 300); do curl -s -o /dev/null http://localhost:5351/ && break; sleep 2; done
fi
(cd $W && $G --timeout 15 -- node $C/probe/clipcheck.mjs chromium http://localhost:5351 tip $C/shots > $L/clip-tip-chromium.json 2> $L/clip-tip-chromium.log); echo "$(date +%T) clip tip chromium exit $?" >> $L/chain.txt
(cd $W && $G --exclusive webkit --timeout 15 -- node $C/probe/clipcheck.mjs webkit http://localhost:5351 tip $C/shots > $L/clip-tip-webkit.json 2> $L/clip-tip-webkit.log); echo "$(date +%T) clip tip webkit exit $?" >> $L/chain.txt
exec $C/chain2.sh rch rwk
