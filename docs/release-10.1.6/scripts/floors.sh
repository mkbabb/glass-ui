#!/bin/zsh
# 10.1.6 close: the three pixel-floor arms scripts/release.sh runs (aurora green on the real
# GPU, the planted self-test, the blob-ceiling flood plant) in TREE on its own demo server; each
# arm's machine report is banked beside its log under close-1/floors/.
#   ~/.claude/guard/guarded --timeout 60 -- zsh docs/release-10.1.6/scripts/floors.sh <tree> <port>
set -u
WT=${0:A:h:h:h:h}
TREE=${1:A}; PORT=$2
L=$WT/docs/release-10.1.6/close-1/floors
mkdir -p $L
cd $TREE
export GLASS_UI_DEMO_PORT=$PORT GLASS_UI_DEMO_URL=http://localhost:$PORT
arm() { # script report
  npm -w tests-visual run $1 > $L/$1.log 2>&1
  local rc=$?
  cp tests-visual/.cache/$2 $L/$2 2>/dev/null
  echo "$(date '+%F %T') $1 exit=$rc tree=${TREE:t}" | tee -a $L/floors.txt
}
arm gate:pixel-floor pi-report-green.json
arm gate:pixel-floor:planted pi-report-planted.json
arm gate:pixel-floor:planted:flood pi-report-flood.json
