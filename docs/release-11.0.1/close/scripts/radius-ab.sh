#!/bin/zsh
# The restated radius-scale spec, both Chromium projects: the branch (worktree) and v11.0.0 (the
# .cache/close/v1100 archive, the branch's spec copied in as radius-scale-1101.spec.ts).
#   ~/.claude/guard/guarded --timeout 20 -- zsh radius-ab.sh
set -u
C=${0:A:h:h}; WT=${C:h:h:h}; L=$C/suite
for proj in chromium-headless-new coarse-touch; do
  cd $WT; GLASS_UI_DEMO_PORT=5331 GLASS_UI_DEMO_URL=http://localhost:5331 PI_REPORT=$L/radius-branch-$proj.json \
    npx playwright test -c tests-visual/playwright.config.ts --project=$proj --workers=1 tests-visual/radius-scale.spec.ts > $L/radius-branch-$proj.log 2>&1
  echo "radius branch $proj rc=$? $(grep -E '^\s+[0-9]+ (passed|failed)' $L/radius-branch-$proj.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
  cd $WT/.cache/close/v1100; GLASS_UI_DEMO_PORT=5338 GLASS_UI_DEMO_URL=http://localhost:5338 PI_REPORT=$L/radius-v1100-$proj.json \
    npx playwright test -c tests-visual/playwright.config.ts --project=$proj --workers=1 tests-visual/radius-scale-1101.spec.ts > $L/radius-v1100-$proj.log 2>&1
  echo "radius v11.0.0 $proj rc=$? $(grep -E '^\s+[0-9]+ (passed|failed)' $L/radius-v1100-$proj.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
done
