#!/bin/bash
# Critic 4, the tail, shortest first: the edge paint probe in Chromium on both trees, the
# hover cell that lost its window in the WebKit sweep (alone, five times), the paint probe
# in the WebKit build the repo resolves, then the pixel-reader file five times over on
# v11.0.1 in WebKit. The WebKit runs share one machine-wide lock with the other releases.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
C=$W/docs/release-11.0.2/critic-4; L=$C/logs; S=$C/scripts; O=$L/chain.out
G=~/.claude/guard/guarded
R=$W/.cache/red-v11.0.1/tree
say() { echo "$(date +%H:%M:%S) $*" >> $O; }
refused() { if grep -lq "^\[guarded\] REFUSED" $L/*.log 2>/dev/null; then say "HALT: guarded refused ($(grep -l '^\[guarded\] REFUSED' $L/*.log | tr '\n' ' '))"; exit 3; fi; }
$G --timeout 10 -- $S/paint.sh tip chromium > $L/paint-tip-chromium.log 2>&1; say "paint-tip-chromium rc=$?"; refused
$G --timeout 10 -- $S/paint.sh v1101 chromium > $L/paint-v1101-chromium.log 2>&1; say "paint-v1101-chromium rc=$?"; refused
cd $W && GLASS_UI_DEMO_PORT=5341 GLASS_UI_DEMO_URL=http://localhost:5341 PI_REPORT=$L/hover-tip-wk.json \
  $G --exclusive webkit --timeout 20 -- npx playwright test -c tests-visual/release-11-0-2.config.ts release-11-0-2.spec.ts --project=webkit --workers=1 --repeat-each=5 -g "hover · a horizontal pill dock, expanded" > $L/hover-tip-wk.log 2>&1; say "hover-tip-wk rc=$? $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/hover-tip-wk.log | tr -s ' ' | tr '\n' ' ')"; refused
say essentials-done
$G --exclusive webkit --timeout 10 -- $S/paint.sh tip webkit > $L/paint-tip-webkit.log 2>&1; say "paint-tip-webkit rc=$?"; refused
cd $R && CRITIC_OUT=$C/capture/c2file-v1101-wk GLASS_UI_DEMO_PORT=5342 GLASS_UI_DEMO_URL=http://localhost:5342 PI_REPORT=$L/c2file-v1101-wk.json \
  $G --exclusive webkit --timeout 30 -- npx playwright test -c tests-visual/release-11-0-1-critic-2.config.ts release-11-0-1-critic-2.spec.ts --project=webkit --workers=1 --repeat-each=5 > $L/c2file-v1101-wk.log 2>&1; say "c2file-v1101-wk rc=$? $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/c2file-v1101-wk.log | tr -s ' ' | tr '\n' ' ')"
say doneC
