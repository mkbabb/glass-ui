#!/bin/bash
# Critic 4, the rest of the reading. chain.sh stopped itself after the v11.0.1 WebKit sweep:
# its refusal check matched the word REFUSED inside guarded's ARMED warning (a warning
# only, no run was refused). Here the check reads a line that starts "[guarded] REFUSED".
# In order: the older release specs on the tip in Chromium, the idle-fold cell on v11.0.1
# across its own 3.6 s window, the Select probe on both trees, the pixel-reader file five
# times over in WebKit, twice on each tree, the edge paint probe, and the hover cell that
# lost its window in the WebKit sweep, alone five times.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
C=$W/docs/release-11.0.2/critic-4; L=$C/logs; S=$C/scripts; O=$L/chain.out
G=~/.claude/guard/guarded
R=$W/.cache/red-v11.0.1/tree
say() { echo "$(date +%H:%M:%S) $*" >> $O; }
refused() { if grep -lq "^\[guarded\] REFUSED" $L/*.log 2>/dev/null; then say "HALT: guarded refused ($(grep -l '^\[guarded\] REFUSED' $L/*.log | tr '\n' ' '))"; exit 3; fi; }
say "chainB: the STOP above was a false match on the ARMED warning; carrying on"
OLD="release-10-1-2.spec.ts release-10-1-3.spec.ts release-10-1-4.spec.ts release-10-1-5.spec.ts release-11-0-1.spec.ts release-11-0-1-daraksha.spec.ts release-11-0-1-critic-1.spec.ts release-11-0-1-critic-1b.spec.ts release-11-0-1-fix-2.spec.ts release-11-0-1-critic-2.spec.ts"
$S/pw.sh tip tip-ch ch playwright.config.ts 75 $OLD; refused
say sweeps-done
sed 's/await page.waitForTimeout(5400);/await page.waitForTimeout(3000);/' $W/tests-visual/release-11-0-2.spec.ts > $R/tests-visual/release-11-0-2.spec.ts
(cd $R && GLASS_UI_DEMO_PORT=5342 GLASS_UI_DEMO_URL=http://localhost:5342 PI_REPORT=$L/fold-v1101-ch.json \
  $G --timeout 10 -- npx playwright test -c tests-visual/playwright.config.ts release-11-0-2.spec.ts --project=chromium-headless-new --workers=1 -g "fold · an idle fold" > $L/fold-v1101-ch.log 2>&1; say "fold-v1101-ch (3 s window) rc=$?")
cp $W/tests-visual/release-11-0-2.spec.ts $R/tests-visual/release-11-0-2.spec.ts; refused
mkdir -p $R/docs/release-11.0.2/o212 && cp -R $W/docs/release-11.0.2/o212/harness $R/docs/release-11.0.2/o212/
for t in v1101 tip; do
  $G --timeout 25 -- $S/select-probe.sh $t chromium > $L/select-$t-chromium.log 2>&1; say "select-$t-chromium rc=$?"; refused
  $G --exclusive webkit --timeout 25 -- $S/select-probe.sh $t webkit > $L/select-$t-webkit.log 2>&1; say "select-$t-webkit rc=$?"; refused
done
run() { # <tree dir> <port> <tag>
  cd "$1" && CRITIC_OUT=$C/capture/$3 GLASS_UI_DEMO_PORT=$2 GLASS_UI_DEMO_URL=http://localhost:$2 PI_REPORT=$L/$3.json \
    $G --exclusive webkit --timeout 30 -- npx playwright test -c tests-visual/release-11-0-1-critic-2.config.ts release-11-0-1-critic-2.spec.ts --project=webkit --workers=1 --repeat-each=5 > $L/$3.log 2>&1; rc=$?
  say "$3 rc=$rc $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$3.log | tr -s ' ' | tr '\n' ' ')"
}
run $W 5341 c2file-tip-wk; refused
run $R 5342 c2file-v1101-wk; refused
run $W 5341 c2file-tip-wk-2; refused
run $R 5342 c2file-v1101-wk-2; refused
$G --timeout 10 -- $S/paint.sh tip chromium > $L/paint-tip-chromium.log 2>&1; say "paint-tip-chromium rc=$?"; refused
$G --exclusive webkit --timeout 10 -- $S/paint.sh tip webkit > $L/paint-tip-webkit.log 2>&1; say "paint-tip-webkit rc=$?"; refused
$G --timeout 10 -- $S/paint.sh v1101 chromium > $L/paint-v1101-chromium.log 2>&1; say "paint-v1101-chromium rc=$?"; refused
cd $W && GLASS_UI_DEMO_PORT=5341 GLASS_UI_DEMO_URL=http://localhost:5341 PI_REPORT=$L/hover-tip-wk.json \
  $G --exclusive webkit --timeout 20 -- npx playwright test -c tests-visual/release-11-0-2.config.ts release-11-0-2.spec.ts --project=webkit --workers=1 --repeat-each=5 -g "hover · a horizontal pill dock, expanded" > $L/hover-tip-wk.log 2>&1; say "hover-tip-wk rc=$? $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/hover-tip-wk.log | tr -s ' ' | tr '\n' ' ')"
say doneB
