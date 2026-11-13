#!/bin/zsh
# 10.1.6 critic 1: one Playwright process in TREE on its own demo server.
#   zsh docs/release-10.1.6/critic-1/cell.sh <tag> <tree> <port> <config> <project> "<spec>..."
set -u
WT=${0:A:h:h:h:h}
TAG=$1; TREE=${2:A}; PORT=$3; CFG=$4; PROJ=$5; SPEC=${6:-}
L=$WT/docs/release-10.1.6/critic-1/out
mkdir -p $L
if lsof -nP -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; then echo "$TAG: port $PORT is taken" | tee -a $L/runs.txt; exit 9; fi; rm -f $L/$TAG.json
cd $TREE
export GLASS_UI_DEMO_PORT=$PORT GLASS_UI_DEMO_URL=http://localhost:$PORT PI_REPORT=$L/$TAG.report.json CRITIC_OUT=$L/$TAG.json
echo "$(date '+%F %T') $TAG start tree=${TREE:t} tip=$(git -C $WT rev-parse --short HEAD) load=$(uptime | sed 's/.*averages: //')" | tee -a $L/runs.txt
npx playwright test -c $CFG --project=$PROJ --workers=1 ${=SPEC} > $L/$TAG.log 2>&1
rc=$?
echo "$(date '+%F %T') $TAG rc=$rc load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$TAG.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
exit $rc
