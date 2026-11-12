#!/bin/zsh
# 10.1.5 fix-close-1: one spec's cells by title, repeated, on its own demo server; logs to fix-close-1/.
#   ~/.claude/guard/guarded [--exclusive webkit] --timeout N -- \
#     zsh docs/release-10.1.5/scripts/fix-close-1-cell.sh <tag> <port> <config> <project> <spec> <grep> <repeat>
set -u
WT=${0:A:h:h:h:h}
TAG=$1; PORT=$2; CFG=$3; PROJ=$4; SPEC=$5; GREP=$6; N=$7
L=$WT/docs/release-10.1.5/fix-close-1
mkdir -p $L
cd $WT
export GLASS_UI_DEMO_PORT=$PORT GLASS_UI_DEMO_URL=http://localhost:$PORT PI_REPORT=$L/$TAG.json
args=(-c $CFG --project=$PROJ --workers=1 --repeat-each=$N)
[[ -n $GREP ]] && args+=(--grep "$GREP")
npx playwright test $args ${=SPEC} > $L/$TAG.log 2>&1
rc=$?
echo "$(date '+%F %T') $TAG rc=$rc src=$(git rev-parse --short HEAD)$(git diff --quiet -- src && echo '' || echo '+wt') load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$TAG.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
exit $rc
