#!/bin/zsh
# Carry critic's gates, second pass, after the visual queue: the first pass ran vitest
# without the demo build its boot-graph gate measures (my omission), and verify:package
# asked for the ratchet rebind (3e27437fb). All five on the committed tree, in CI's order.
set -u
cd /Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.1
L=docs/release-11.0.1/critic-carry/logs
R=docs/release-11.0.1/critic-carry/runs
G=~/.claude/guard/guarded
until grep -q "^queue done" $R/runs.txt 2>/dev/null; do sleep 30; done
echo "head $(git rev-parse HEAD) dirty=$(git status --porcelain -- src tests tests-visual package.json package-lock.json .bundle-ratchet | wc -l | tr -d ' ')" > $L/gates-2.txt
run() {
  local name=$1; shift
  $G --timeout 40 -- "$@" > $L/$name-2.log 2>&1
  echo "$name exit $? $(date +%H:%M) load=$(uptime | sed 's/.*averages: //')" >> $L/gates-2.txt
}
run build npm run build
run typecheck npm run typecheck
run demo-dist npm run demo:dist:build
run vitest npx vitest run --maxWorkers=2
run verify npm run verify:package
echo done >> $L/gates-2.txt
