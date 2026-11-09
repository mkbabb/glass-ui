#!/bin/bash
# trace-c.sh (D2 pass 13, BUILDER, REGISTRY §P12c-7.3 item 1): revtrace.mjs `reversal` in Chromium, C·l and C·d, BLDS alternating
# (default bp12x bp10x bp13x), ROUNDS rounds (default 8), in ONE guarded slot (the guard's admission waited once, not per run)
# under the seat lock. Each read starts at load <= GATE (default 15) inside the slot; the load is in each log. Existing JSONs are
# skipped, so a slot that ends on its budget (exit 75) re-queues the rest. trace.sh's first run (bp12x C·l r1) is kept.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p13/Bp-build; OUT=${OUT:-$B/out}
D=$G/docs/tranches/BL/design/dock; AD=$D/pass-3/adapter-floor-v2.mjs; REC=$D/pass-13/D2-Bp-build-records; S=$REC/scripts
TR=${TR:-$REC/trace}; GD=$HOME/.claude/guard/guarded
export G B OUT D AD REC S TR BLDS="${BLDS:-bp12x bp10x bp13x}" GATE=${GATE:-15} ROUNDS=${ROUNDS:-8}
mkdir -p $TR
LK=$B/seat.lock; until mkdir $LK 2>/dev/null; do sleep 5; done; trap 'rmdir $LK 2>/dev/null' EXIT
for try in 1 2 3; do
  echo "queue chromium $(date '+%F %T') · $(uptime)" >> $TR/trace-c.log
  $GD --timeout 85 -- bash -c '
    echo "admitted chromium $(date "+%F %T") · $(uptime)"; t0=$SECONDS
    for t in light dark; do for k in $(seq 1 $ROUNDS); do for b in $BLDS; do
      th=""; [ $t = dark ] && th="--theme dark"; j=$TR/chromium-$t-reversal-$b-r$k.json; [ -s $j ] && continue
      if [ $(( (SECONDS - t0) / 60 )) -gt 78 ]; then echo "budget stop $(date "+%T")"; exit 75; fi
      until [ "$(echo "$(sysctl -n vm.loadavg | awk "{print \$2}") <= $GATE" | bc)" = 1 ]; do sleep 10; done
      (uptime; node $S/revtrace.mjs --build $OUT/builds/$b --adapter $AD --engine chromium $th --cell reversal --runs 1 --json $j; echo "exit $?"; uptime) > ${j%.json}.log 2>&1
    done; done; done
    echo "chromium end $(date "+%F %T") · $(uptime)"' >> $TR/trace-c.log 2>&1
  x=$?; echo "slot exit $x $(date '+%F %T')" >> $TR/trace-c.log; [ $x = 75 ] || break
done
echo "TRACE-CHROMIUM-DONE $(date '+%F %T') · $(uptime)" >> $TR/trace-c.log
