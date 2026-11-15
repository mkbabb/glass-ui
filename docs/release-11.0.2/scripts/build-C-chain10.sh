#!/bin/bash
# The rest of chain8 after its Chromium leg: WebKit 2287, the demo dist build, typecheck and vitest.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
S=$W/docs/release-11.0.2/scripts
L=$W/docs/release-11.0.2/logs
O=$L/sweep-chain-C.out
G=~/.claude/guard/guarded
echo "$(date +%H:%M:%S) resume $(git -C $W rev-parse --short HEAD)" >> $O
TIMEOUT=60 $S/build-C-webkit.sh branch sweep-C-branch-webkit "." "release-11-0-2.spec.ts release-10-1-2.spec.ts release-10-1-5.spec.ts"
echo "$(date +%H:%M:%S) sweep-C-branch-webkit done" >> $O
cd $W && GLASS_UI_DEMO_PORT=5341 GLASS_UI_DEMO_URL=http://localhost:5341 PI_REPORT=$L/sweep-C-branch-webkit-1101.json \
  $G --exclusive webkit --timeout 30 -- npx playwright test -c tests-visual/release-11-0-1.config.ts release-11-0-1.spec.ts release-11-0-1-daraksha.spec.ts --project=webkit --workers=1 > $L/sweep-C-branch-webkit-1101.log 2>&1
echo "$(date +%H:%M:%S) sweep-C-branch-webkit-1101 exit $?" >> $O
cd $W && $G --timeout 20 -- npm run demo:dist:build > $L/demo-dist-build-C.log 2>&1
echo "$(date +%H:%M:%S) demo-dist-build exit $?" >> $O
cd $W && $G --light -- npm run typecheck > $L/typecheck-final-C.log 2>&1
echo "$(date +%H:%M:%S) typecheck exit $?" >> $O
cd $W && $G --timeout 45 -- npx vitest run --maxWorkers=2 > $L/vitest-final-C.log 2>&1
echo "$(date +%H:%M:%S) vitest exit $?" >> $O
echo done >> $O
