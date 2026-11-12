#!/bin/zsh
# 10.1.5 critic round 8: every WebKit 2287 run under ONE lock, each spec its own Playwright process.
#   ~/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh docs/release-10.1.5/scripts/webkit-all-critic-8.sh
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/critic-8
export GLASS_UI_DEMO_PORT=5302
WK=(-c tests-visual/release-10-1-5-critic-8.config.ts --project=webkit --workers=1)
one() { # tag arm spec [grep]
  CRITIC_ARM=$2 M5_DUMP=$WT/$L/m5 PI_REPORT=$WT/$L/$1.json npx playwright test $WK $3 ${4:+--grep} ${4:-} > $L/$1.log 2>&1
  echo "$(date +%H:%M) $1 exit=$? $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run)' $L/$1.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
}
one g6-4-wk "" release-10-1-4.spec.ts
one g6-3-wk "" release-10-1-3.spec.ts
one probe-wk "" release-10-1-5-critic-8.spec.ts
one probe-v1014-wk v1014 release-10-1-5-critic-8.spec.ts "c8a halo|c8b|c8d|c8g|c8h"
one r7-wk "" release-10-1-5-critic-8b.spec.ts
echo "$(date +%H:%M) webkit-all done" | tee -a $L/runs.txt
