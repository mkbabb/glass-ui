#!/bin/bash
# Fix seat 3: the 11.0.x and 11.1.0 release specs on the branch, one guarded call per
# engine (WebKit under the exclusive lock), as critic 2 ran them.
cd "$(dirname "$0")"
G=~/.claude/guard/guarded
S="partA partB owner fix2 c2 r1102 r1102b roloop"
$G --timeout 60 -- ./reg-inner.sh branch ch $S > logs/reg-ch.out 2>&1; echo "$(date +%T) reg ch exit $?" >> logs/runs.out
$G --exclusive webkit --timeout 60 -- ./reg-inner.sh branch wk $S > logs/reg-wk.out 2>&1; echo "$(date +%T) reg wk exit $?" >> logs/runs.out
echo chain4 done
