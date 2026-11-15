#!/bin/bash
# Critic 1, after chain2: the dock edge's load cell on the WebKit build the repo's Playwright
# resolves (2311, unshimmed), on v11.0.1 and on the tip.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
C=$W/docs/release-11.0.2/critic-1; L=$C/logs; O=$L/chain.out
G=~/.claude/guard/guarded
until grep -q done2 $O; do sleep 30; done
for t in v1101 tip; do
  case $t in tip) D=$W; P=5341;; v1101) D=$W/.cache/red-v11.0.1/tree; P=5342;; esac
  cd "$D" && GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/edge-2311-$t.json \
    $G --exclusive webkit --timeout 15 -- npx playwright test -c tests-visual/release-11-0-2.config.ts release-11-0-2.spec.ts --project=webkit-2311 --workers=1 -g "edge · a GlassDock page" > $L/edge-2311-$t.log 2>&1; rc=$?
  echo "$(date +%H:%M:%S) edge-2311-$t rc=$rc $(grep -E '^\s+[0-9]+ (passed|failed|skipped)' $L/edge-2311-$t.log | tr -s ' ' | tr '\n' ' ')" >> $O
done
echo "$(date +%H:%M:%S) done3" >> $O
