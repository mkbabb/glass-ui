#!/bin/bash
# Fix seat 3: the earlier release specs again after chain 4's tree was frozen from outside
# (part A in Chromium had already read 84 passed and is kept).
cd "$(dirname "$0")"
G=~/.claude/guard/guarded
$G --timeout 60 -- ./reg-inner.sh branch ch partB owner fix2 c2 r1102 r1102b roloop > logs/reg-ch2.out 2>&1; echo "$(date +%T) reg ch (partB on) exit $?" >> logs/runs.out
$G --exclusive webkit --timeout 60 -- ./reg-inner.sh branch wk partA partB owner fix2 c2 r1102 r1102b roloop > logs/reg-wk.out 2>&1; echo "$(date +%T) reg wk exit $?" >> logs/runs.out
echo chain5 done
