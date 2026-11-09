#!/bin/bash
# trace-wk.sh (D2 pass 13, BUILDER, REGISTRY §P12c-7.3 items 1-2): revtrace.mjs in Playwright WebKit, in ONE --exclusive webkit
# slot (queued, never cancelled), under the seat lock. Item 1's sibling: `swap-long`, `retarget·40`, `retarget·120` (the "r" at
# 794 px); item 2: `swrev:40:16`, `swrev:40:32`, `swrev:40:64` (the swap reversed at 40 ms, retargeted 16/32/64 ms later).
# BLDS alternate (default bp12x bp10x bp13x) in each round; THEMES (default light dark); ROUNDS rounds (default 3). Each read
# starts at load <= GATE (default 15), waiting inside the slot with no timeout; the load is in each log.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p13/Bp-build; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; AD=$D/pass-3/adapter-floor-v2.mjs; REC=$D/pass-13/D2-Bp-build-records; S=$REC/scripts
TR=${TR:-$REC/trace}; GD=$HOME/.claude/guard/guarded
export G B OUT D AD REC S TR BLDS="${BLDS:-bp12x bp10x bp13x}" GATE=${GATE:-15} ROUNDS=${ROUNDS:-3} THEMES="${THEMES:-light dark}"
export CELLS="${CELLS:-swap-long retarget·40 retarget·120 swrev:40:16 swrev:40:32 swrev:40:64}"
mkdir -p $TR
LK=$B/seat.lock; until mkdir $LK 2>/dev/null; do sleep 5; done; trap 'rmdir $LK 2>/dev/null' EXIT
echo "queue webkit $(date '+%F %T') · $(uptime)" >> $TR/trace-wk.log
$GD --exclusive webkit --timeout 88 -- bash -c '
  echo "admitted webkit $(date "+%F %T") · $(uptime)"
  t0=$SECONDS
  for t in $THEMES; do for k in $(seq 1 $ROUNDS); do for c in $CELLS; do for b in $BLDS; do
    th=""; [ $t = dark ] && th="--theme dark"; cn=$(echo $c | tr "·:" "__")
    j=$TR/webkit-$t-$cn-$b-r$k.json; [ -s $j ] && continue
    if [ $(( (SECONDS - t0) / 60 )) -gt 80 ]; then echo "budget stop $(date "+%T")"; exit 75; fi
    until [ "$(echo "$(sysctl -n vm.loadavg | awk "{print \$2}") <= $GATE" | bc)" = 1 ]; do sleep 10; done
    (uptime; node $S/revtrace.mjs --build $OUT/builds/$b --adapter $AD --engine webkit $th --cell $c --runs 1 --json $j; echo "exit $?"; uptime) > ${j%.json}.log 2>&1
  done; done; done; done
  echo "webkit end $(date "+%F %T") · $(uptime)"' >> $TR/trace-wk.log 2>&1
echo "TRACE-WEBKIT-DONE exit $? $(date '+%F %T') · $(uptime)" >> $TR/trace-wk.log
