#!/bin/bash
# trace.sh (D2 pass 13, BUILDER, REGISTRY §P12c-7.3 item 1): revtrace.mjs on the diagnosis builds, alternating, one browser
# run at a time, each guarded (never --light). STAGE=chromium: W3 `reversal`, C·l and C·d, BLDS (default "bp12x bp10x")
# alternating, ROUNDS rounds (default 8). STAGE=webkit: one --exclusive webkit slot (queued, never cancelled): `swap-long`,
# `retarget·40`, `retarget·80`, `retarget·120` and `reversal`, W·l and W·d, alternating, ROUNDS rounds (default 3).
# Every read starts at load <= GATE (default 11), waiting with no timeout; the load is in each log.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p13/Bp-build; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; AD=$D/pass-3/adapter-floor-v2.mjs; REC=$D/pass-13/D2-Bp-build-records; S=$REC/scripts
TR=${TR:-$REC/trace}; GD=$HOME/.claude/guard/guarded; BLDS=${BLDS:-bp12x bp10x}; GATE=${GATE:-11}
mkdir -p $TR
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
okl() { [ "$(echo "$(load1) <= $GATE" | bc)" = 1 ]; }
export -f load1 okl; export G B OUT D AD REC S TR BLDS GATE
one() { # engine theme cell build round  (inside a slot when NOGUARD=1)
  local th=""; [ $2 = dark ] && th="--theme dark"; local c=$(echo $3 | tr '·' '_')
  until okl; do sleep 10; done
  local pre=""; [ -z "${NOGUARD:-}" ] && pre="$GD --timeout 15 --"
  (uptime; $pre node $S/revtrace.mjs --build $OUT/builds/$4 --adapter $AD --engine $1 $th --cell $3 --runs 1 --json $TR/$1-$2-$c-$4-r$5.json; echo "exit $?"; uptime) > $TR/$1-$2-$c-$4-r$5.log 2>&1
}
export -f one
if [ "${STAGE:-chromium}" = chromium ]; then
  for t in light dark; do for k in $(seq 1 ${ROUNDS:-8}); do for b in $BLDS; do one chromium $t reversal $b $k; done; done; done
  echo "TRACE-CHROMIUM-DONE $(date '+%F %T') · $(uptime)" >> $TR/trace.log
else
  echo "queue webkit $(date '+%F %T') · $(uptime)" >> $TR/trace.log
  ROUNDS=${ROUNDS:-3} CELLS="${CELLS:-swap-long retarget·40 retarget·80 retarget·120 reversal}" $GD --exclusive webkit --timeout 85 -- bash -c '
    echo "admitted webkit $(date "+%F %T") · $(uptime)"
    for t in light dark; do for k in $(seq 1 $ROUNDS); do for c in $CELLS; do for b in $BLDS; do NOGUARD=1 one webkit $t $c $b $k; done; done; done; done
    echo "webkit end $(date "+%F %T") · $(uptime)"' >> $TR/trace.log 2>&1
  echo "TRACE-WEBKIT-DONE exit $? $(date '+%F %T') · $(uptime)" >> $TR/trace.log
fi
