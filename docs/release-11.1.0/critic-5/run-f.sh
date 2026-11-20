#!/usr/bin/env bash
# Critic 5, resumed: after run-d ends (its own last line, anchored), the touched e2e specs on
# both trees in both engines (run.sh's e2e stage; the Chromium branch report is taken again).
HERE=$(cd "$(dirname "$0")" && pwd); cd "$HERE"
until grep -qE "^[0-9:]{8} WEBKIT-DONE$" chain.log; do sleep 30; done
STAGES="e2e" ENGINES="chromium webkit" ./run.sh
echo "$(date +%T) PHASE-E-DONE" >> chain.log
