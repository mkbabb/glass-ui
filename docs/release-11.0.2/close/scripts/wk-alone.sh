#!/bin/zsh
# 11.0.2 close: the three WebKit cells that failed only in the branch's wk-proj run (each a
# page.goto that never reached load in 60 s), alone at --repeat-each=6, first in the worktree and
# then in the v11.0.1 tree (.cache/red-v11.0.1/tree, its src byte-equal to `git archive v11.0.1
# src`, the three specs and both configs equal to v11.0.1's). One Playwright process at a time,
# each with its own vite (5343 the branch, 5344 v11.0.1).
#   ~/.claude/guard/guarded --exclusive webkit --timeout 40 -- zsh wk-alone.sh
set -u
C=${0:A:h:h}; WT=${C:h:h:h}; L=$C/suite
G='430 · right-anchored.*O-110 · a click on the anchored|e1 at 390: a label-wide tab|/substrates/blob \(dark\)'
SPECS=(tests-visual/release-10-1-3.spec.ts tests-visual/release-10-1-5.spec.ts tests-visual/safari-webgl.spec.ts)
run() { local tag=$1 dir=$2 port=$3
  cd $dir
  echo "$(date '+%F %T') $tag start load=$(uptime | sed 's/.*averages: //')" | tee -a $L/runs.txt
  GLASS_UI_DEMO_PORT=$port GLASS_UI_DEMO_URL=http://localhost:$port PI_REPORT=$L/$tag.json \
    npx playwright test -c tests-visual/webkit-2287.config.ts --project=webkit --workers=1 --repeat-each=6 -g "$G" $SPECS > $L/$tag.log 2>&1
  echo "$(date '+%F %T') $tag rc=$? $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$tag.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
}
run wk-alone-branch $WT 5343
run wk-alone-v1101 $WT/.cache/red-v11.0.1/tree 5344
