#!/bin/zsh
# 10.1.5 critic round 10 follow-up: c10a (the wrapped daraksha stage) and c10d in Chromium on both arms,
# each its own guarded browser run, then g7 (heavy).
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/critic-10
G=~/.claude/guard/guarded
export GLASS_UI_DEMO_PORT=5313
for arm in "" v1014; do
  CRITIC_ARM=$arm $G --timeout 30 -- npx playwright test -c tests-visual/playwright.config.ts --project=chromium-headless-new release-10-1-5-critic-10.spec.ts --grep "c10a|c10d" --workers=1 > $L/followup-ch${arm:+-$arm}.log 2>&1
  echo "$(date +%H:%M) followup-ch${arm:+-$arm} rc=$? $(grep -E '^\s+[0-9]+ (passed|failed)' $L/followup-ch${arm:+-$arm}.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.txt
done
$G --timeout 60 -- zsh docs/release-10.1.5/scripts/gates-critic-10.sh > $L/g7.guard.log 2>&1; echo "$(date +%H:%M) g7 guard rc=$?" >> $L/runs.txt
echo "$(date +%H:%M) followup done" >> $L/runs.txt
