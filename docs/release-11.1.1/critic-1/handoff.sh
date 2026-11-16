#!/bin/bash
# Critic 1: when the first chain has finished its witness phases, stop it before its
# step-per-guarded-call regression phases and run the second chain instead. The servers
# the first chain started are left running; only its own shells and its current
# Playwright run are stopped, by PID.
C=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/critic-1
L=$C/logs
until grep -q "PHASE-wwk-DONE\|STOP\|CHAIN-DONE" $L/chain.txt; do sleep 2; done
grep -q "STOP" $L/chain.txt && exit 75
kids() { for k in $(pgrep -P $1); do kids $k; echo $k; done; }
for top in $(pgrep -f "critic-1/run-all.sh") $(pgrep -f "critic-1/chain.sh"); do
  for p in $(kids $top) $top; do
    cmd=$(ps -o command= -p $p 2>/dev/null)
    case "$cmd" in *"npm run dev"*|*vite*|*"--port 535"*|*esbuild*) ;; *) kill $p 2>/dev/null;; esac
  done
done
echo "$(date +%T) handoff: first chain stopped after its witness phases" >> $L/chain.txt
mv $L/srv-5351.pid $L/srv-5351.old.pid 2>/dev/null; mv $L/srv-5352.pid $L/srv-5352.old.pid 2>/dev/null
cat $L/srv-5351.old.pid > $L/srv-5351.pid 2>/dev/null; cat $L/srv-5352.old.pid > $L/srv-5352.pid 2>/dev/null
exec $C/chain2.sh resheet paint leave rch rwk
