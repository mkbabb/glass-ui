#!/bin/bash
# f7rerun.sh k: F7's re-run k (the first F7 read 12/13 at load 30-38: f7·units red on one file, the menu contract's 30 ms
# fixed sleep). Gate <= 15 read INSIDE the guarded slot; the instrument and its out dir as chain-c.sh's f7 step.
set -u; k=$1
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p14/Bp-crit; D=$G/docs/tranches/BL/design/dock; RC=$D/pass-14/D2-Bp-crit-records/c
d=$RC/F7-rerun$k; mkdir -p $d; a=$(df -g /System/Volumes/Data | tail -1 | awk '{print $4}'); echo "disk free $a GB" > $d/F7.log; [ "$a" -lt 15 ] && exit 3
inner() { t0=$SECONDS; while [ "$(echo "$(sysctl -n vm.loadavg | awk '{print $2}') > 15" | bc)" = 1 ]; do sleep 15; [ $((SECONDS-t0)) -gt 1800 ] && { echo "in-slot gate unmet"; exit 75; }; done
  echo "in-slot start $(date '+%T') · $(uptime)"; node $D/harness/f7.mjs $B/wt --out $B/out/f7-rerun$1; }
export -f inner; export D B
while :; do (uptime; $HOME/.claude/guard/guarded --timeout 60 -- bash -c "inner $k"; echo "exit $?"; uptime) >> $d/F7.log 2>&1
  grep -q '^\[guarded\] REFUSED' $d/F7.log && exit 5; tail -3 $d/F7.log | grep -q '^exit 75' || break; done
F=$(find $B/out/f7-rerun$k -name F7.json | head -1); cp $F $d/F7.json; grep -E "^(PASS|FAIL)" $d/F7.log | tail -15
