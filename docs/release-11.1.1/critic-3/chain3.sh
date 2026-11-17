#!/bin/bash
# Critic 3, chain 3: a cell read many times on the tip, one guarded Playwright process
# per project.   chain3.sh <log tag> <grep> <repeats> project...
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/critic-3
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$D/logs; G=~/.claude/guard/guarded
tag=$1; grep=$2; n=$3; shift 3
for p in "$@"; do
  case $p in webkit-*) EX="--exclusive webkit" ;; *) EX="" ;; esac
  (cd $W && GLASS_UI_DEMO_PORT=5351 GLASS_UI_DEMO_URL=http://localhost:5351 PI_REPORT=$L/$tag-$p.json \
    $G $EX --timeout 30 -- npx playwright test -c tests-visual/release-11-1-1.config.ts --project=$p --workers=1 -g "$grep" --repeat-each=$n > $L/$tag-$p.log 2>&1)
  echo "$(date +%T) $tag-$p exit $? load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$tag-$p.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
done
