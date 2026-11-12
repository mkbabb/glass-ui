#!/bin/zsh
# Carry critic's gates on the committed tree, one guarded run at a time.
set -u
cd /Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.1
L=docs/release-11.0.1/critic-carry/logs
G=~/.claude/guard/guarded
echo "head $(git rev-parse HEAD) dirty=$(git status --porcelain -- src tests tests-visual package.json package-lock.json .bundle-ratchet | wc -l | tr -d ' ')" > $L/gates.txt
run() {
  local name=$1; shift
  $G --timeout 40 -- "$@" > $L/$name.log 2>&1
  echo "$name exit $? $(date +%H:%M) load=$(uptime | sed 's/.*averages: //')" >> $L/gates.txt
}
run build npm run build
run typecheck npm run typecheck
run vitest npx vitest run --maxWorkers=2
run verify npm run verify:package
echo done >> $L/gates.txt
