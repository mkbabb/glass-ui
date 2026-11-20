#!/usr/bin/env bash
# Critic 4, after run-e: the first-measure probe (probe7), Chromium on both trees, then
# WebKit 2287 on both. One guarded run at a time.
HERE=$(cd "$(dirname "$0")" && pwd); cd "$HERE"
ROOT=$(cd "$HERE/../../.." && pwd); RED=$ROOT/.cache/c1-v1100; G=~/.claude/guard/guarded
until grep -q "PHASE-E-DONE" chain.log; do sleep 20; done
mkdir -p probe7/out
$G --timeout 30 -- bash probe7/runprobe.sh "$ROOT" 8876 chromium green > probe7/out/green-chromium.log 2>&1; echo "$(date +%T) probe7 green chromium exit $?" >> chain.log
$G --timeout 30 -- bash probe7/runprobe.sh "$RED" 8877 chromium red > probe7/out/red-chromium.log 2>&1; echo "$(date +%T) probe7 red chromium exit $?" >> chain.log
$G --exclusive webkit --timeout 30 -- bash probe7/runprobe.sh "$ROOT" 8876 webkit green > probe7/out/green-webkit.log 2>&1; echo "$(date +%T) probe7 green webkit exit $?" >> chain.log
$G --exclusive webkit --timeout 30 -- bash probe7/runprobe.sh "$RED" 8877 webkit red > probe7/out/red-webkit.log 2>&1; echo "$(date +%T) probe7 red webkit exit $?" >> chain.log
echo "$(date +%T) PHASE-F-DONE" >> chain.log
