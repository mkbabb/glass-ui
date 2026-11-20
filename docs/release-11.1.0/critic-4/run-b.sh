#!/usr/bin/env bash
# Critic 3, after the Chromium chain: the critic's own probe in Chromium, then WebKit
# (own probe first, then the witnesses and lanes), then the touched e2e specs.
HERE=$(cd "$(dirname "$0")" && pwd); cd "$HERE"
until grep -q "PHASE-A-DONE" chain.log; do sleep 20; done
STAGES="probe" ENGINES=chromium ./run.sh
echo "$(date +%T) PROBE-CHROMIUM-DONE" >> chain.log
STAGES="probe fix3" ENGINES=webkit ./run.sh
echo "$(date +%T) WEBKIT-1-DONE" >> chain.log
STAGES="fix2 c2probe lanes" ENGINES=webkit ./run.sh
echo "$(date +%T) WEBKIT-2-DONE" >> chain.log
STAGES="e2e" ENGINES="chromium webkit" ./run.sh
echo "$(date +%T) PHASE-B-DONE" >> chain.log
