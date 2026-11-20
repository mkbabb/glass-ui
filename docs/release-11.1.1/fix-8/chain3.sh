#!/bin/bash
# Fix seat 8, after chain 2: the gate stopped at WebKit 390 part D on one cell, `fade · a
# Sheet bottom appears and leaves on a fade`, its out leg 305 ms (13 fading frames) where
# every other leg read 117 to 207. Re-read, each at a 1-minute load under 16: that cell ten
# times on the tip snapshot (02dd6a7cb) and ten times on the tip before the cure
# (cc0384d4e), then the tip snapshot back at 02dd6a7cb and part D of WebKit 390 whole.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D7=$W/docs/release-11.1.1/fix-7
D=$W/docs/release-11.1.1/fix-8
L=$D/logs
until grep -q CHAIN2-DONE $L/runs.out; do sleep 15; done
echo "CHAIN3-START $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
low() {
    local t0=$(date +%s)
    until [[ $(sysctl -n vm.loadavg | awk '{print int($2)}') -lt $1 ]]; do
        if (( $(date +%s) - t0 > 1800 )); then echo "$(date +%T) load wait (under $1) gave up after 30 min, load at start $(sysctl -n vm.loadavg)" >> $L/runs.out; return; fi
        sleep 15
    done
    echo "$(date +%T) load under $1 at start $(sysctl -n vm.loadavg)" >> $L/runs.out
}
F="fade · a Sheet bottom appears and leaves on a fade"
low 16; $D7/run.sh tip webkit-phone f8-fsb-tip-webkit-phone "$F" --repeat-each=10
$D7/sync-tip.sh cc0384d4e
low 16; $D7/run.sh tip webkit-phone f8-fsb-pre-webkit-phone "$F" --repeat-each=10
$D7/sync-tip.sh 02dd6a7cb
low 16; $D/gate-rest.sh 11 11
echo "CHAIN3-DONE $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
