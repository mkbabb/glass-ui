#!/bin/bash
# Build seat C's WebKit 2287 cells, one guarded --exclusive webkit call each.
#   build-B-webkit.sh <tree: branch|v1101> <log-name> <grep> [spec]
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
L=$W/docs/release-11.0.2/logs
G=~/.claude/guard/guarded
case $1 in branch) D=$W; P=5341;; v1101) D=$W/.cache/red-v11.0.1/tree; P=5342;; v1100) D=$W/.cache/red-v11.0.0/tree; P=5343;; esac
cd "$D" && GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$2.json \
  $G --exclusive webkit --timeout ${TIMEOUT:-20} -- npx playwright test -c tests-visual/release-11-0-2.config.ts ${4:-release-11-0-2.spec.ts} --project=${PROJECT:-webkit} --workers=1 -g "$3" > $L/$2.log 2>&1; rc=$?
echo "$(date +%H:%M:%S) $2 exit $rc" >> $L/webkit-chain-C.out
