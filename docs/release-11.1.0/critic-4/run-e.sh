#!/usr/bin/env bash
# Critic 4, last: probe6 again in Chromium on both trees (its natural-colour cells were
# added after its first Chromium run). One guarded run each, after the chain.
HERE=$(cd "$(dirname "$0")" && pwd); cd "$HERE"
ROOT=$(cd "$HERE/../../.." && pwd); G=~/.claude/guard/guarded
until grep -q "PHASE-B-DONE" chain.log; do sleep 20; done
$G --timeout 30 -- bash probe6/runprobe.sh "$ROOT" 8874 chromium green > probe6/out/green-chromium.log 2>&1; echo "$(date +%T) probe6 green chromium (with the natural cells) exit $?" >> chain.log
$G --timeout 30 -- bash probe6/runprobe.sh "$ROOT/.cache/c1-v1100" 8875 chromium red > probe6/out/red-chromium.log 2>&1; echo "$(date +%T) probe6 red chromium (with the natural cells) exit $?" >> chain.log
echo "$(date +%T) PHASE-E-DONE" >> chain.log
