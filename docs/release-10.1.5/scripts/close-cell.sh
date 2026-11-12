#!/bin/zsh
# 10.1.5 release close: one spec's cells by title, repeated, in TREE (an A/B arm), on its own demo server.
#   ~/.claude/guard/guarded [--exclusive webkit] --timeout 30 -- \
#     zsh docs/release-10.1.5/scripts/close-cell.sh <tag> <tree> <port> <config> <project> <spec> <grep> <repeat>
set -u
WT=${0:A:h:h:h:h}
TAG=$1; TREE=${2:A}; PORT=$3; CFG=$4; PROJ=$5; SPEC=$6; GREP=$7; N=$8
L=$WT/docs/release-10.1.5/close/ab
mkdir -p $L
cd $TREE
export GLASS_UI_DEMO_PORT=$PORT GLASS_UI_DEMO_URL=http://localhost:$PORT PI_REPORT=$L/$TAG.json
npx playwright test -c $CFG --project=$PROJ --workers=1 tests-visual/$SPEC --grep "$GREP" --repeat-each=$N > $L/$TAG.log 2>&1
rc=$?
echo "$(date '+%F %T') $TAG rc=$rc load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$TAG.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/ab.txt
exit $rc
