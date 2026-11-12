#!/bin/zsh
# 10.1.5 release close: one Playwright process of the visual suite over a list of spec files,
# in TREE (the worktree, or the `git archive v10.1.4` tree under .cache/close/), on its own demo
# server (GLASS_UI_DEMO_URL on PORT, so no spec reaches another session's 5199 or 5174).
#   ~/.claude/guard/guarded [--exclusive webkit] --timeout 90 -- \
#     zsh docs/release-10.1.5/scripts/close-suite.sh <tag> <tree> <port> <config> <project> <listfile|->
# config is relative to TREE (tests-visual/playwright.config.ts, tests-visual/webkit-2287.config.ts);
# listfile names spec basenames one per line ("-" = every spec the project matches).
set -u
WT=${0:A:h:h:h:h}
TAG=$1; TREE=${2:A}; PORT=$3; CFG=$4; PROJ=$5; LIST=$6; [[ $LIST != - ]] && LIST=${LIST:A}
L=$WT/docs/release-10.1.5/close/suite
mkdir -p $L
cd $TREE
export GLASS_UI_DEMO_PORT=$PORT GLASS_UI_DEMO_URL=http://localhost:$PORT PI_REPORT=$L/$TAG.json
FILES=()
if [[ $LIST != - ]]; then for f in ${(f)"$(<${LIST:A})"}; do FILES+=("tests-visual/$f"); done; fi
echo "$(date '+%F %T') $TAG start tree=$TREE proj=$PROJ files=${#FILES} load=$(uptime | sed 's/.*averages: //')" | tee -a $L/runs.txt
npx playwright test -c $CFG --project=$PROJ --workers=1 $FILES > $L/$TAG.log 2>&1
rc=$?
echo "$(date '+%F %T') $TAG rc=$rc load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$TAG.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
exit $rc
