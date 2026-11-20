#!/bin/bash
# Critic 3, after chain2: the idle-fold layout cell on v11.0.1 read across v11.0.1's own
# idle window (it folds 3.6 s after mount there, so the cell's 5.4 s wait is set to 3 s in
# the v11.0.1 tree's copy of the spec, and only there).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
C=$W/docs/release-11.0.2/critic-3; L=$C/logs; O=$L/chain.out
G=~/.claude/guard/guarded
R=$W/.cache/red-v11.0.1/tree
until grep -q "^[0-9:]* done2$" $O; do sleep 30; done
sed 's/await page.waitForTimeout(5400);/await page.waitForTimeout(3000);/' $W/tests-visual/release-11-0-2.spec.ts > $R/tests-visual/release-11-0-2.spec.ts
cd $R && GLASS_UI_DEMO_PORT=5342 GLASS_UI_DEMO_URL=http://localhost:5342 PI_REPORT=$L/fold-v1101-ch.json \
  $G --timeout 10 -- npx playwright test -c tests-visual/playwright.config.ts release-11-0-2.spec.ts --project=chromium-headless-new --workers=1 -g "fold · an idle fold" > $L/fold-v1101-ch.log 2>&1; rc=$?
echo "$(date +%H:%M:%S) fold-v1101-ch (3 s window) rc=$rc $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/fold-v1101-ch.log | tr -s ' ' | tr '\n' ' ')" >> $O
cp $W/tests-visual/release-11-0-2.spec.ts $R/tests-visual/release-11-0-2.spec.ts
echo "$(date +%H:%M:%S) done3" >> $O
