#!/bin/zsh
# 11.0.1 close: one Playwright process of the visual suite over a list of spec files in the
# worktree, on its own demo server (GLASS_UI_DEMO_PORT/URL; the config's webServer starts and stops
# vite there), so no spec reaches another session's server.
#   ~/.claude/guard/guarded [--exclusive webkit] --timeout N -- zsh suite.sh <tag> <port> <config> <project> <listfile> [extra args...]
set -u
C=${0:A:h:h}; WT=${C:h:h:h}; L=$C/suite
TAG=$1; PORT=$2; CFG=$3; PROJ=$4; LIST=$5; shift 5
cd $WT
export GLASS_UI_DEMO_PORT=$PORT GLASS_UI_DEMO_URL=http://localhost:$PORT PI_REPORT=$L/$TAG.json
FILES=(); for f in ${(f)"$(<${LIST:A})"}; do FILES+=("tests-visual/$f"); done
echo "$(date '+%F %T') $TAG start proj=$PROJ files=${#FILES} load=$(uptime | sed 's/.*averages: //')" | tee -a $L/runs.txt
npx playwright test -c $CFG --project=$PROJ --workers=1 $FILES "$@" > $L/$TAG.log 2>&1
rc=$?
echo "$(date '+%F %T') $TAG rc=$rc load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$TAG.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
exit $rc
