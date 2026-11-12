#!/bin/zsh
# 11.0.1 close: release.sh's aurora pixel floor and its two plants, real GPU, in the worktree, on
# their own demo server. Machine reports banked under close/floors/.
#   ~/.claude/guard/guarded --timeout 30 -- zsh floors.sh
set -u
C=${0:A:h:h}; WT=${C:h:h:h}; F=$C/floors
cd $WT
export GLASS_UI_DEMO_PORT=5335 GLASS_UI_DEMO_URL=http://localhost:5335
: > $F/floors.txt
for g in gate:pixel-floor gate:pixel-floor:planted gate:pixel-floor:planted:flood; do
  npm -w tests-visual run $g > $F/${g//:/-}.log 2>&1
  echo "$g exit=$? $(date +%T)" | tee -a $F/floors.txt
done
cp tests-visual/.cache/pi-report-green.json tests-visual/.cache/pi-report-planted.json tests-visual/.cache/pi-report-flood.json $F/ 2>&1 | tee -a $F/floors.txt
