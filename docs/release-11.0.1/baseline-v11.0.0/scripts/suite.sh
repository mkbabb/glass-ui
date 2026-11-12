#!/bin/zsh
# v11.0.0 baseline for the 11.0.1 close (adapted from release-10.1.5 close-suite.sh): one Playwright
# process of the visual suite over a list of spec files in the v11.0.0 archive tree, on its own demo
# server (GLASS_UI_DEMO_URL on PORT; the config's webServer starts and stops vite on that port).
#   ~/.claude/guard/guarded [--exclusive webkit] --timeout N -- zsh suite.sh <tag> <port> <config> <project> <listfile|-> [extra playwright args...]
set -u
B=${0:A:h:h}
TREE=$B/tree; L=$B/reports
TAG=$1; PORT=$2; CFG=$3; PROJ=$4; LIST=$5; shift 5
cd $TREE
export GLASS_UI_DEMO_PORT=$PORT GLASS_UI_DEMO_URL=http://localhost:$PORT PI_REPORT=$L/$TAG.json
FILES=()
if [[ $LIST != - ]]; then for f in ${(f)"$(<${LIST:A})"}; do FILES+=("tests-visual/$f"); done; fi
echo "$(date '+%F %T') $TAG start proj=$PROJ files=${#FILES} load=$(uptime | sed 's/.*averages: //')" | tee -a $L/runs.txt
npx playwright test -c $CFG --project=$PROJ --workers=1 $FILES "$@" > $L/$TAG.log 2>&1
rc=$?
echo "$(date '+%F %T') $TAG rc=$rc load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$TAG.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
exit $rc
