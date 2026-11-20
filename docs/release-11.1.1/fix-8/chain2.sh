#!/bin/bash
# Fix seat 8, after chain 1:
# 1. the exits gate whole on the worktree as scripts/release.sh runs it (gate.sh); if a part
#    fails, the parts after it one by one (gate-rest.sh);
# 2. part B in WebKit 390 three times running on the tip snapshot, each at a 1-minute load
#    under 16;
# 3. row A's cell in Chromium 390 on the tip snapshot at a load under 16;
# 4. the disclosure guard in WebKit 390, twenty films on each tree (tip snapshot and
#    v11.1.0), interleaved in blocks of five, each block at a load under 10;
# 5. the release-10-1-5, 11-0-1, 11-0-2 and 11-1-0 specs on the worktree, one guarded call
#    per engine; a step that fails runs on v11.1.0 twice;
# 6. the five static gates on a fresh build.
# A load wait gives up after 30 minutes, records the load and goes ahead.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D7=$W/docs/release-11.1.1/fix-7
D=$W/docs/release-11.1.1/fix-8
L=$D/logs; L7=$D7/logs; G=~/.claude/guard/guarded
until grep -q CHAIN1-DONE $L/runs.out; do sleep 15; done
echo "CHAIN2-START $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
low() {
    local t0=$(date +%s)
    until [[ $(sysctl -n vm.loadavg | awk '{print int($2)}') -lt $1 ]]; do
        if (( $(date +%s) - t0 > 1800 )); then echo "$(date +%T) load wait (under $1) gave up after 30 min, load at start $(sysctl -n vm.loadavg)" >> $L/runs.out; return; fi
        sleep 15
    done
    echo "$(date +%T) load under $1 at start $(sysctl -n vm.loadavg)" >> $L/runs.out
}

# 1
$D/gate.sh
rc=$?
if (( rc != 0 )); then
    n=$(grep -c "^== exits" $L/gate.log)
    echo "$(date +%T) gate stopped at part index $((n - 1)) (exit $rc); gate-rest from $n" >> $L/runs.out
    $D/gate-rest.sh $n
fi
echo "$(date +%T) gate done: $(tail -1 $L/gate.out)" >> $L/runs.out

# 2, 3
for i in 1 2 3; do low 16; $D7/run.sh tip webkit-phone f8-b-tip-webkit-phone-$i 1; done
low 16; $D7/run.sh tip chromium-phone f8-h-tip-chromium-phone "sheet · a detented Sheet rises"

# 4
GD="reverse · a disclosure reopened while it closes"
for i in 1 2 3 4; do
    low 10; $D7/run.sh tip webkit-phone f8-g-tip-webkit-phone-$i "$GD" --repeat-each=5
    low 10; $D7/run.sh red webkit-phone f8-g-red-webkit-phone-$i "$GD" --repeat-each=5
done

# 5
mkdir -p $L/out
ALL="partA partB owner daraksha fix2 c2 c1 r1102 r1102b roloop radius r1013"
WK="partA partB owner daraksha fix2 c2 c1 r1102 r1102b roloop r1013"
$G --timeout 80 -- bash $D/reg-inner.sh branch ch $ALL >> $L/reg.out 2>&1
$G --exclusive webkit --timeout 85 -- bash $D/reg-inner.sh branch wk $WK >> $L/reg.out 2>&1
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

# 6
$D/gates.sh
echo "CHAIN2-DONE $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
