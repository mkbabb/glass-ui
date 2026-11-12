#!/usr/bin/env bash
# Critic 5, resumed: after the e2e stage, probe8's both2 cells (both cures together) on the branch, both engines.
HERE=$(cd "$(dirname "$0")" && pwd); cd "$HERE"
ROOT=$(cd "$HERE/../../.." && pwd); G=~/.claude/guard/guarded
until grep -qE "^[0-9:]{8} PHASE-E-DONE$" chain.log; do sleep 30; done
for E in chromium webkit; do
  EX=""; [ "$E" = webkit ] && EX="--exclusive webkit"
  ONLY=both2 $G $EX --timeout 30 -- bash probe8/runprobe.sh "$ROOT" 8878 "$E" green > "probe8/out/green-$E-both2.log" 2>&1; echo "$(date +%T) probe8 (both2) green $E exit $?" >> chain.log
done
echo "$(date +%T) PHASE-G-DONE" >> chain.log
