#!/usr/bin/env bash
# Critic 5, resumed: the shortened WebKit tail. probe4 on the branch, then the sentinel run-f waits on.
HERE=$(cd "$(dirname "$0")" && pwd); cd "$HERE"
ROOT=$(cd "$HERE/../../.." && pwd); G=~/.claude/guard/guarded
mkdir -p probe4/out
$G --exclusive webkit --timeout 30 -- bash probe4/runprobe.sh "$ROOT" 8871 webkit green > probe4/out/green-webkit.log 2>&1; echo "$(date +%T) probe4 green webkit exit $?" >> chain.log
echo "$(date +%T) WEBKIT-DONE" >> chain.log
