#!/bin/bash
# Critic 5, chain 5 (after chain 4): release-11-0-1-critic-1 in WebKit, which failed two
# titles on the tip, on v11.1.0 and again on the tip, one guarded call each.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/critic-5
L=$D/logs; G=~/.claude/guard/guarded
until grep -q CHAIN4-DONE $L/runs.out; do sleep 30; done
$G --exclusive webkit --timeout 20 -- bash $D/reg-inner.sh red wk c1 >> $L/reg.out 2>&1
mv $L/reg-red-c1-wk.log $L/reg-red-c1-wk-1.log 2>/dev/null; mv $L/reg-red-c1-wk.json $L/reg-red-c1-wk-1.json 2>/dev/null
$G --exclusive webkit --timeout 20 -- bash $D/reg-inner.sh branch wk c1 >> $L/reg.out 2>&1
mv $L/reg-branch-c1-wk.log $L/reg-branch-c1-wk-2.log 2>/dev/null; mv $L/reg-branch-c1-wk.json $L/reg-branch-c1-wk-2.json 2>/dev/null
$G --exclusive webkit --timeout 20 -- bash $D/reg-inner.sh red wk c1 >> $L/reg.out 2>&1
mv $L/reg-red-c1-wk.log $L/reg-red-c1-wk-2.log 2>/dev/null; mv $L/reg-red-c1-wk.json $L/reg-red-c1-wk-2.json 2>/dev/null
echo "CHAIN5-DONE $(date +%T)" >> $L/runs.out
