#!/bin/zsh
# Critic 2: after queue 3, (1) the critic's paint spec on the v11.0.0 archive tree in Chromium
# (the reader must see v11.0.0's flattened morph ends, and k reads 11.0.0's press-only dock),
# (2) critic 1's WebKit frame cell that a file change in the served root reloaded mid-run.
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.1
cd $WT
R=$WT/docs/release-11.0.1/critic-2/runs
G=~/.claude/guard/guarded
until grep -q "^queue 3 done" $R/runs.txt 2>/dev/null; do sleep 30; done
mkdir -p v1100/tests-visual/release-11-0-1
cp tests-visual/release-11-0-1-critic-2.spec.ts v1100/tests-visual/
cp tests-visual/release-11-0-1/harness.ts tests-visual/release-11-0-1/harness.html tests-visual/release-11-0-1/critic-2.ts tests-visual/release-11-0-1/critic-2.html v1100/tests-visual/release-11-0-1/
sleep 5
(cd v1100 && GLASS_UI_DEMO_PORT=5415 CRITIC_OUT=$R/c2-shots-v1100 PI_REPORT=$R/v1100-c2-ch.json $G --timeout 20 -- npx playwright test -c tests-visual/playwright.config.ts --project=chromium-headless-new release-11-0-1-critic-2.spec.ts --workers=1 > $R/v1100-c2-ch.log 2>&1)
echo "$(date +%H:%M) v1100-c2-ch rc=$? load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped)' $R/v1100-c2-ch.log | tr -s ' ' | tr '\n' ' ')" >> $R/runs.txt
GLASS_UI_DEMO_PORT=5412 CRITIC_OUT=$R/c1-shots PI_REPORT=$R/c1-rerun-wk.json $G --exclusive webkit --timeout 20 -- npx playwright test -c tests-visual/release-11-0-1-critic-2.config.ts --project=webkit release-11-0-1-critic-1.spec.ts --grep "c light-390c" --workers=1 > $R/c1-rerun-wk.log 2>&1
echo "$(date +%H:%M) c1-rerun-wk rc=$? load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped)' $R/c1-rerun-wk.log | tr -s ' ' | tr '\n' ' ')" >> $R/runs.txt
echo "queue 4 done" >> $R/runs.txt
