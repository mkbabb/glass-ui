#!/bin/zsh
# 10.1.5 release close: the three pixel-floor arms scripts/release.sh runs (aurora green on the
# real GPU, the planted self-test, the blob-ceiling flood plant), on this close's demo server; each
# arm's machine report is banked beside its log.
#   ~/.claude/guard/guarded --timeout 60 -- zsh docs/release-10.1.5/scripts/close-floors.sh
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=$WT/docs/release-10.1.5/close/floors
mkdir -p $L
export GLASS_UI_DEMO_PORT=5311 GLASS_UI_DEMO_URL=http://localhost:5311
arm() { # script report
  npm -w tests-visual run $1 > $L/$1.log 2>&1
  local rc=$?
  cp tests-visual/.cache/$2 $L/$2 2>/dev/null
  echo "$(date '+%F %T') $1 exit=$rc" | tee -a $L/floors.txt
}
arm gate:pixel-floor pi-report-green.json
arm gate:pixel-floor:planted pi-report-planted.json
arm gate:pixel-floor:planted:flood pi-report-flood.json
