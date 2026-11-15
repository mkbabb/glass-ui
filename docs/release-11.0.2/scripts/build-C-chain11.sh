#!/bin/bash
# The tip after the O-271 revert: vitest, then the 11.0.2 and 10.1.5 specs in WebKit 2287
# and in Chromium (both projects).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
S=$W/docs/release-11.0.2/scripts
L=$W/docs/release-11.0.2/logs
O=$L/sweep-chain-C.out
G=~/.claude/guard/guarded
echo "$(date +%H:%M:%S) chain11 $(git -C $W rev-parse --short HEAD)" >> $O
cd $W && $G --timeout 45 -- npx vitest run --maxWorkers=2 > $L/vitest-final2-C.log 2>&1
echo "$(date +%H:%M:%S) vitest2 exit $?" >> $O
TIMEOUT=60 $S/build-C-webkit.sh branch tip-C-webkit "." "release-11-0-2.spec.ts release-10-1-5.spec.ts"
echo "$(date +%H:%M:%S) tip-C-webkit done" >> $O
TIMEOUT=80 $S/build-C-chromium.sh branch tip-C-chromium "." "release-11-0-2.spec.ts release-10-1-5.spec.ts"
echo "$(date +%H:%M:%S) tip-C-chromium done" >> $O
echo done11 >> $O
