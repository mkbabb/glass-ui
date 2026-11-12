#!/bin/zsh
# 10.1.6 close: one Playwright process over SPEC in TREE on its own demo server; the log and
# JSON report go to docs/release-10.1.6/close-1/.
#   ~/.claude/guard/guarded [--exclusive webkit] --timeout N -- \
#     zsh docs/release-10.1.6/scripts/cell.sh <tag> <tree> <port> <config> <project> "<spec>..." [grep] [repeat]
set -u
WT=${0:A:h:h:h:h}
TAG=$1; TREE=${2:A}; PORT=$3; CFG=$4; PROJ=$5; SPEC=$6; GREP=${7:-}; N=${8:-1}
L=$WT/docs/release-10.1.6/close-1
mkdir -p $L
cd $TREE
export GLASS_UI_DEMO_PORT=$PORT GLASS_UI_DEMO_URL=http://localhost:$PORT PI_REPORT=$L/$TAG.json
args=(-c $CFG --project=$PROJ --workers=1 --repeat-each=$N)
[[ -n $GREP ]] && args+=(--grep "$GREP")
echo "$(date '+%F %T') $TAG start tree=${TREE:t} tip=$(git -C $WT rev-parse --short HEAD) load=$(uptime | sed 's/.*averages: //')" | tee -a $L/runs.txt
npx playwright test $args ${=SPEC} > $L/$TAG.log 2>&1
rc=$?
echo "$(date '+%F %T') $TAG rc=$rc load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$TAG.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
exit $rc
