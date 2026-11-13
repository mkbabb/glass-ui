#!/bin/bash
# Critic 2, after chain2: the two cells whose page.goto hung in the WebKit sweep, read again
# alone on the tip, three times each in one run.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
C=$W/docs/release-11.0.2/critic-2; L=$C/logs; O=$L/chain.out
G=~/.claude/guard/guarded
until grep -q done2 $O; do sleep 30; done
cd $W && GLASS_UI_DEMO_PORT=5341 GLASS_UI_DEMO_URL=http://localhost:5341 PI_REPORT=$L/reread-wk.json \
  $G --exclusive webkit --timeout 20 -- npx playwright test -c tests-visual/release-11-0-2.config.ts release-11-0-2.spec.ts release-10-1-5.spec.ts --project=webkit --workers=1 --repeat-each=3 \
  -g "pager · a neighbour hop|l1 a cap lifted under a run scrolled to its end rests round" > $L/reread-wk.log 2>&1; rc=$?
echo "$(date +%H:%M:%S) reread-wk rc=$rc $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/reread-wk.log | tr -s ' ' | tr '\n' ' ')" >> $O
echo "$(date +%H:%M:%S) done3" >> $O
