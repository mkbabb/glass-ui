#!/bin/bash
# Fix seat 8: what chains 2 and 3 left (stopped at 20:49 in a load wait, the 1-minute load
# at 69 from other runs), reordered so the steps whose verdict does not depend on load
# go first:
# 1. the five static gates on a fresh build (gates.sh);
# 2. the release-10-1-5, 11-0-1, 11-0-2 and 11-1-0 specs on the worktree, one guarded call
#    per engine, each at a 1-minute load under 16; a step that fails runs on v11.1.0 twice;
# 3. the disclosure guard in WebKit 390, twenty films on each tree (tip snapshot 02dd6a7cb
#    and v11.1.0), interleaved in blocks of five, each block at a load under 10;
# 4. `fade · a Sheet bottom appears and leaves on a fade` in WebKit 390, ten times on the
#    tip snapshot and ten on the tip before the cure (cc0384d4e), then WebKit 390 part D
#    whole on the worktree (gate-rest.sh 11 11), each at a load under 16.
# The load waits share one 90-minute budget from the chain's start; once it is spent, the
# load at each start is recorded and the run goes ahead.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D7=$W/docs/release-11.1.1/fix-7
D=$W/docs/release-11.1.1/fix-8
L=$D/logs; G=~/.claude/guard/guarded
echo "CHAIN4-START $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
T0=$(date +%s)
low() {
    until [[ $(sysctl -n vm.loadavg | awk '{print int($2)}') -lt $1 ]]; do
        if (( $(date +%s) - T0 > 5400 )); then echo "$(date +%T) load wait budget spent, load at start $(sysctl -n vm.loadavg)" >> $L/runs.out; return; fi
        sleep 15
    done
    echo "$(date +%T) load under $1 at start $(sysctl -n vm.loadavg)" >> $L/runs.out
}

# 1
$D/gates.sh

# 2
mkdir -p $L/out
ALL="partA partB owner daraksha fix2 c2 c1 r1102 r1102b roloop radius r1013"
WK="partA partB owner daraksha fix2 c2 c1 r1102 r1102b roloop r1013"
low 16; $G --timeout 80 -- bash $D/reg-inner.sh branch ch $ALL >> $L/reg.out 2>&1
low 16; $G --exclusive webkit --timeout 85 -- bash $D/reg-inner.sh branch wk $WK >> $L/reg.out 2>&1
for e in ch wk; do
    [ -f $L/reg-failed-branch-$e.txt ] || continue
    steps=$(sort -u $L/reg-failed-branch-$e.txt | tr '\n' ' ')
    case $e in wk) EX="--exclusive webkit";; *) EX="";; esac
    for n in 1 2; do
        $G $EX --timeout 60 -- bash $D/reg-inner.sh red $e $steps >> $L/reg.out 2>&1
        for s in $steps; do mv $L/reg-red-$s-$e.log $L/reg-red-$s-$e-$n.log 2>/dev/null; mv $L/reg-red-$s-$e.json $L/reg-red-$s-$e-$n.json 2>/dev/null; done
    done
done
echo "$(date +%T) earlier specs done" >> $L/runs.out

# 3
GD="reverse · a disclosure reopened while it closes"
for i in 1 2 3 4; do
    low 10; $D7/run.sh tip webkit-phone f8-g-tip-webkit-phone-$i "$GD" --repeat-each=5
    low 10; $D7/run.sh red webkit-phone f8-g-red-webkit-phone-$i "$GD" --repeat-each=5
done

# 4
F="fade · a Sheet bottom appears and leaves on a fade"
low 16; $D7/run.sh tip webkit-phone f8-fsb-tip-webkit-phone "$F" --repeat-each=10
$D7/sync-tip.sh cc0384d4e
low 16; $D7/run.sh tip webkit-phone f8-fsb-pre-webkit-phone "$F" --repeat-each=10
$D7/sync-tip.sh 02dd6a7cb
low 16; $D/gate-rest.sh 11 11
echo "CHAIN4-DONE $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
