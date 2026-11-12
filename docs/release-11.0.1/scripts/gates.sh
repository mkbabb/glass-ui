#!/bin/zsh
# The 11.0.1 gates, one guarded run at a time: build, typecheck, demo:dist:build (the
# boot-graph vitest gate measures dist-demo), vitest, verify:package. Usage: gates.sh <tag> ; logs land in docs/release-11.0.1/logs/<tag>-*.log
set -u
cd /Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.1
tag=$1
L=docs/release-11.0.1/logs
G=~/.claude/guard/guarded
: > $L/$tag-gates.txt
run() {
  local name=$1; shift
  $G --timeout 40 -- "$@" > $L/$tag-$name.log 2>&1
  echo "$name exit $?" >> $L/$tag-gates.txt
}
run build npm run build
run typecheck npm run typecheck
run demo-dist npm run demo:dist:build
run vitest npx vitest run --maxWorkers=2
run verify npm run verify:package
echo done >> $L/$tag-gates.txt
