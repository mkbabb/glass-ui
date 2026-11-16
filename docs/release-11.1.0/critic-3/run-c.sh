#!/usr/bin/env bash
# Critic 3, last: the critic's probe on v11.0.0 in WebKit again (the first run's server
# re-optimized its dependencies under the probe: see probe/runprobe.sh), then the
# cure-candidate check in both engines. One guarded browser run each.
HERE=$(cd "$(dirname "$0")" && pwd); cd "$HERE"
until grep -q "PHASE-B-DONE" chain.log; do sleep 20; done
G=~/.claude/guard/guarded
ROOT=$(cd "$HERE/../../.." && pwd)
$G --exclusive webkit --timeout 30 -- bash probe/runprobe.sh "$ROOT/.cache/c1-v1100" 8892 webkit red > probe/out/red-webkit.log 2>&1; echo "$(date +%T) probe red webkit (rerun, settled cache) exit $?" >> chain.log
$G --timeout 10 -- node probe/cure-check.mjs chromium probe/out > probe/out/cure-check-chromium.log 2>&1; echo "$(date +%T) cure-check chromium exit $?" >> chain.log
$G --exclusive webkit --timeout 10 -- node probe/cure-check.mjs webkit probe/out > probe/out/cure-check-webkit.log 2>&1; echo "$(date +%T) cure-check webkit exit $?" >> chain.log
echo "$(date +%T) PHASE-C-DONE" >> chain.log
