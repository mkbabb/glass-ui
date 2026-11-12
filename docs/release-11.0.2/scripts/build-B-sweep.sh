#!/bin/bash
# Build seat B's regression sweep after O-268, one guarded run at a time, on the branch:
# the 11.0.2 spec and the dock specs O-268 touches (release-10-1-2, release-10-1-5,
# release-11-0-1, release-11-0-1-daraksha) in the Chromium projects, then WebKit 2287
# (the 11.0.1 specs through release-11-0-1.config.ts, which matches them).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
S=$W/docs/release-11.0.2/scripts
L=$W/docs/release-11.0.2/logs
until grep -q "o268-fitedge-branch-chromium" $L/chromium-chain-B.out; do sleep 20; done
TIMEOUT=75 $S/build-B-chromium.sh branch sweep-B-branch-chromium "." "release-11-0-2.spec.ts release-10-1-2.spec.ts release-10-1-5.spec.ts release-11-0-1.spec.ts release-11-0-1-daraksha.spec.ts"
TIMEOUT=45 $S/build-B-webkit.sh branch sweep-B-branch-webkit "." "release-11-0-2.spec.ts release-10-1-2.spec.ts release-10-1-5.spec.ts"
cd $W && GLASS_UI_DEMO_PORT=5341 GLASS_UI_DEMO_URL=http://localhost:5341 PI_REPORT=$L/sweep-B-branch-webkit-1101.json \
  ~/.claude/guard/guarded --exclusive webkit --timeout 30 -- npx playwright test -c tests-visual/release-11-0-1.config.ts release-11-0-1.spec.ts release-11-0-1-daraksha.spec.ts --project=webkit --workers=1 > $L/sweep-B-branch-webkit-1101.log 2>&1
echo "$(date +%H:%M:%S) sweep-B-branch-webkit-1101 exit $?" >> $L/webkit-chain-B.out
echo done
