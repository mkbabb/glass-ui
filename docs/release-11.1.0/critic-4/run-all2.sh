#!/usr/bin/env bash
# Critic 4 chain, second driver (the first, run-all.sh, was stopped after it started its
# Chromium pass so the critic's second probe could join the chain; the Chromium pass it
# started runs to its end). Order: the second probe in Chromium, the committed-tree gates,
# every witness in WebKit 2287, the touched e2e specs in both engines. One guarded run at
# a time; WebKit under --exclusive webkit.
HERE=$(cd "$(dirname "$0")" && pwd); cd "$HERE"
ROOT=$(cd "$HERE/../../.." && pwd); RED=$ROOT/.cache/c1-v1100
G=~/.claude/guard/guarded
until grep -q "RUN-DONE stages=\[fix4 fix3 fix2 c2probe lanes probe\] engines=\[chromium\]" chain.log; do sleep 20; done
p4() { # p4 <engine>
  mkdir -p probe4/out
  local EX=""; [ "$1" = webkit ] && EX="--exclusive webkit"
  $G $EX --timeout 30 -- bash probe4/runprobe.sh "$ROOT" 8871 "$1" green > "probe4/out/green-$1.log" 2>&1; echo "$(date +%T) probe4 green $1 exit $?" >> chain.log
  $G $EX --timeout 30 -- bash probe4/runprobe.sh "$RED" 8872 "$1" red > "probe4/out/red-$1.log" 2>&1; echo "$(date +%T) probe4 red $1 exit $?" >> chain.log
}
p4 chromium
echo "$(date +%T) PHASE-A-DONE" >> chain.log
STAGES="gates" ./run.sh
echo "$(date +%T) GATES-DONE" >> chain.log
p4 webkit
STAGES="fix4 probe fix3 fix2 c2probe lanes" ENGINES=webkit ./run.sh
echo "$(date +%T) WEBKIT-DONE" >> chain.log
STAGES="e2e" ENGINES="chromium webkit" ./run.sh
echo "$(date +%T) PHASE-B-DONE" >> chain.log
