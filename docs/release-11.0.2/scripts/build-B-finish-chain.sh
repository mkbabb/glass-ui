#!/bin/bash
# Build seat B's finish after the guard refusal: the WebKit 2287 sweep on the branch, the
# release-11-0-1 WebKit leg, the coarse-touch rerun, then the demo dist build and full vitest.
# One guarded run at a time.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
S=$W/docs/release-11.0.2/scripts
L=$W/docs/release-11.0.2/logs
O=$L/finish-chain-B.out
G=~/.claude/guard/guarded
echo "$(date +%H:%M:%S) start" >> $O
TIMEOUT=60 $S/build-B-webkit.sh branch sweep-B-branch-webkit "." "release-11-0-2.spec.ts release-10-1-2.spec.ts release-10-1-5.spec.ts"
echo "$(date +%H:%M:%S) sweep-B-branch-webkit done" >> $O
cd $W && GLASS_UI_DEMO_PORT=5341 GLASS_UI_DEMO_URL=http://localhost:5341 PI_REPORT=$L/sweep-B-branch-webkit-1101.json \
  $G --exclusive webkit --timeout 30 -- npx playwright test -c tests-visual/release-11-0-1.config.ts release-11-0-1.spec.ts release-11-0-1-daraksha.spec.ts --project=webkit --workers=1 > $L/sweep-B-branch-webkit-1101.log 2>&1
echo "$(date +%H:%M:%S) sweep-B-branch-webkit-1101 exit $?" >> $O
cd $W && GLASS_UI_DEMO_PORT=5341 GLASS_UI_DEMO_URL=http://localhost:5341 PI_REPORT=$L/sweep-B-branch-coarse-rerun.json \
  $G --timeout 60 -- npx playwright test -c tests-visual/playwright.config.ts $(cat $S/coarse-rerun-lines.txt) --project=coarse-touch --workers=1 > $L/sweep-B-branch-coarse-rerun.log 2>&1
echo "$(date +%H:%M:%S) sweep-B-branch-coarse-rerun exit $?" >> $O
cd $W && $G --timeout 20 -- npm run demo:dist:build > $L/demo-dist-build-B3.log 2>&1
echo "$(date +%H:%M:%S) demo-dist-build exit $?" >> $O
cd $W && $G --timeout 45 -- npx vitest run --maxWorkers=2 > $L/vitest-final-B3.log 2>&1
echo "$(date +%H:%M:%S) vitest exit $?" >> $O
echo done >> $O
