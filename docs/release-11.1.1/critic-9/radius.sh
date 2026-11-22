#!/bin/bash
# Critic 9: the radius-scale spec as 11.1.0 shipped it, run on the tip, and as the branch
# restates it, run on the v11.1.0 tree; each copied in under its own name and moved back out.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
R=$W/.cache/critic9-v11.1.0/tree
D=$W/docs/release-11.1.1/critic-9; L=$D/logs; G=~/.claude/guard/guarded
git -C $W show v11.1.0:tests-visual/radius-scale.spec.ts > $W/tests-visual/radius-scale-of-v1110.spec.ts
git -C $W show HEAD:tests-visual/radius-scale.spec.ts > $R/tests-visual/radius-scale-of-branch.spec.ts
cd $W && GLASS_UI_DEMO_PORT=5353 GLASS_UI_DEMO_URL=http://localhost:5353 PI_REPORT=$L/radius-v1110spec-on-tip.json \
  $G --timeout 20 -- npx playwright test -c tests-visual/playwright.config.ts --project=chromium-headless-new --project=coarse-touch radius-scale-of-v1110 --workers=1 > $L/radius-v1110spec-on-tip.log 2>&1
echo "$(date +%T) radius v11.1.0 spec on tip exit $?" >> $L/runs.out
mkdir -p $D/moved && mv $W/tests-visual/radius-scale-of-v1110.spec.ts $D/moved/
cd $R && GLASS_UI_DEMO_PORT=5354 GLASS_UI_DEMO_URL=http://localhost:5354 PI_REPORT=$L/radius-branchspec-on-red.json \
  $G --timeout 20 -- npx playwright test -c tests-visual/playwright.config.ts --project=chromium-headless-new --project=coarse-touch radius-scale-of-branch --workers=1 > $L/radius-branchspec-on-red.log 2>&1
echo "$(date +%T) radius branch spec on red exit $?" >> $L/runs.out
