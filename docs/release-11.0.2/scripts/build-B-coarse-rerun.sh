#!/bin/bash
# After the sweep: coarse-touch reruns of the cells the 75-minute limit cut off and the four
# that failed during a load spike (1-minute load 240), from coarse-rerun-lines.txt.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
L=$W/docs/release-11.0.2/logs
until grep -q "^done" $L/sweep-chain-B.out; do sleep 30; done
cd $W && GLASS_UI_DEMO_PORT=5341 GLASS_UI_DEMO_URL=http://localhost:5341 PI_REPORT=$L/sweep-B-branch-coarse-rerun.json \
  ~/.claude/guard/guarded --timeout 60 -- npx playwright test -c tests-visual/playwright.config.ts $(cat $W/docs/release-11.0.2/scripts/coarse-rerun-lines.txt) --project=coarse-touch --workers=1 > $L/sweep-B-branch-coarse-rerun.log 2>&1
echo "$(date +%H:%M:%S) sweep-B-branch-coarse-rerun exit $?" >> $L/chromium-chain-B.out
echo done
