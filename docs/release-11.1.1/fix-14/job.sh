#!/bin/bash
# Fix seat 14: one Playwright process per tree and project, each on its own server
# (GLASS_UI_DEMO_OWN), run in sequence inside the one guarded call that admits the list.
#   job.sh chromium|webkit
# Trees: tip = the worktree (5351), red = .cache/fix14-red/tree (5352), norule =
# .cache/fix14-norule/tree (5353; the lift cell alone).
# Each process runs the controls spec's cells three times (--repeat-each=3). The spec is named
# as a file filter: a grep on "round · " also matches the exits spec's "busy ground · " titles.
set -uo pipefail
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-14/logs
engine=$1
run() {
  local tree=$1 dir=$2 port=$3 project=$4 grep=$5
  local name=$tree-$project
  echo "== $(date +%T) $name start, load $(sysctl -n vm.loadavg | awk '{print $2}')" | tee -a $L/runs.out
  ( cd $dir/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$port GLASS_UI_DEMO_URL=http://localhost:$port \
      PI_REPORT=$L/$name.json npx playwright test -c release-11-1-1.config.ts --project=$project \
      --workers=1 --repeat-each=3 -g "$grep" release-11-1-1-controls.spec.ts ) > $L/$name.log 2>&1
  local code=$?
  echo "== $(date +%T) $name exit $code: $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$name.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.out
}
for project in $engine-phone $engine-desktop; do
  run tip $W 5351 $project "(round|weight|lift) · "
  run red $W/.cache/fix14-red/tree 5352 $project "(round|weight|lift) · "
  run norule $W/.cache/fix14-norule/tree 5353 $project "lift · "
done
echo "== $(date +%T) $engine list done" | tee -a $L/runs.out
