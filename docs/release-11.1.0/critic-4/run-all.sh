#!/usr/bin/env bash
# Critic 4 chain: every witness in Chromium, the committed-tree gates, every witness in
# WebKit 2287, then the touched e2e specs in both engines. One guarded run at a time.
HERE=$(cd "$(dirname "$0")" && pwd); cd "$HERE"
STAGES="fix4 fix3 fix2 c2probe lanes probe" ENGINES=chromium ./run.sh
echo "$(date +%T) PHASE-A-DONE" >> chain.log
STAGES="gates" ./run.sh
echo "$(date +%T) GATES-DONE" >> chain.log
STAGES="fix4 probe fix3 fix2 c2probe lanes" ENGINES=webkit ./run.sh
echo "$(date +%T) WEBKIT-DONE" >> chain.log
STAGES="e2e" ENGINES="chromium webkit" ./run.sh
echo "$(date +%T) PHASE-B-DONE" >> chain.log
