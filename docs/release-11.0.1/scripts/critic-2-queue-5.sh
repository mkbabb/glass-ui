#!/bin/zsh
# Critic 2: after queue 4, the two WebKit cells that failed once at a 1-minute load over 30
# (p2 of the 10.1.5 release spec, F-4 of release-10-1-4), three repeats each, alone; then the
# critic's restated face-switch cell in both engines. One guarded call per step.
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.1
cd $WT
R=$WT/docs/release-11.0.1/critic-2/runs
G=~/.claude/guard/guarded
WK=(-c tests-visual/release-11-0-1-critic-2.config.ts --project=webkit)
CH=(-c tests-visual/playwright.config.ts --project=chromium-headless-new)
until grep -q "^queue 4 done" $R/runs.txt 2>/dev/null; do sleep 30; done
row() { echo "$(date +%H:%M) $1 rc=$2 load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $R/$1.log | tr -s ' ' | tr '\n' ' ')" >> $R/runs.txt; }
GLASS_UI_DEMO_PORT=5412 $G --exclusive webkit --timeout 30 -- npx playwright test $WK release-10-1-5.spec.ts --grep "p2 a 1-2 px host change" --repeat-each=3 --workers=1 > $R/p2-x3-wk.log 2>&1; row p2-x3-wk $?
GLASS_UI_DEMO_PORT=5412 $G --exclusive webkit --timeout 20 -- npx playwright test $WK release-10-1-4.spec.ts --grep "F-4" --repeat-each=3 --workers=1 > $R/f4-x3-wk.log 2>&1; row f4-x3-wk $?
GLASS_UI_DEMO_PORT=5412 CRITIC_OUT=$R/c2-shots $G --exclusive webkit --timeout 20 -- npx playwright test $WK release-11-0-1-critic-2.spec.ts --grep " s (light|dark)" --workers=1 > $R/c2-s-wk.log 2>&1; row c2-s-wk $?
GLASS_UI_DEMO_PORT=5411 CRITIC_OUT=$R/c2-shots $G --timeout 20 -- npx playwright test $CH release-11-0-1-critic-2.spec.ts --grep " s (light|dark)" --workers=1 > $R/c2-s-ch.log 2>&1; row c2-s-ch $?
echo "queue 5 done" >> $R/runs.txt
