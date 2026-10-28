#!/bin/bash
# H8 · the self-test, then the H8 baseline on pass 7's B′ (HEAD + pass-6/floor-v5.patch + pass-7/D2-Bp-proto.patch), one heavy
# run at a time. Every browser run is guarded and never --light; Playwright WebKit under --exclusive webkit, queued and never
# cancelled. Self-test: COLR + COLS (source) and COL + FM (Chromium) in one guarded slot; COL + FM (WebKit) in one
# --exclusive webkit slot; LOW per engine as a driver whose battery.sh stage queues its own slot. Baseline: one battery
# `theme` slot per engine and theme (red cells re-run twice in the slot, FM's six B2 cells three runs each), then the
# low-load stage `fmlow` per WebKit theme (H8-2), then PR (source, --light).
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p8/H8; OUT=$B/out; WT=$B/wt
D=$G/docs/tranches/BL/design/dock; H=$D/harness; REC=$D/pass-8/H8-records; BAT=$REC/battery; mkdir -p $BAT
GD=$HOME/.claude/guard/guarded
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
st() { # engine groups guardflags
  local e=$1 g=$2; shift 2
  L "selftest $e $g queue"
  $GD "$@" --timeout 90 -- bash -c "echo \"\$(date '+%F %T') admitted selftest $e $g · \$(uptime | sed 's/.*load/load/')\" >> $REC/chain.log; shasum -a 256 $H/lib.mjs $H/cells.mjs $H/battery.sh $H/selftest.mjs; node $H/selftest.mjs --engine $e --only $g --out $OUT/selftest-$e" > $REC/selftest-$e-${g//,/+}.log 2>&1
  L "selftest $e $g end exit $?"
  cp $OUT/selftest-$e/selftest-*.json $REC/ 2>/dev/null
}
if [ -z "${SKIP_ST:-}" ]; then
  st chromium COLR,COLS,COL,FM
  st webkit COL,FM --exclusive webkit
  for e in chromium webkit; do
    L "selftest $e LOW (driver; the stage queues its own slot)"
    (shasum -a 256 $H/battery.sh; node $H/selftest.mjs --engine $e --only LOW --out $OUT/selftest-$e) > $REC/selftest-$e-LOW.log 2>&1
    L "selftest $e LOW end exit $?"
    cp $OUT/selftest-$e/selftest-*.json $REC/ 2>/dev/null
  done
fi
if [ -z "${SKIP_BAT:-}" ]; then
  for e in chromium webkit; do for t in light dark; do
    L "start bp $e $t"
    BUILD=bp ENG=$e REC=$BAT THEME=$t TMIN=90 WT=$WT bash $H/battery.sh $OUT theme >> $BAT/chain-bp-$e.log 2>&1
    L "end bp $e $t exit $?"
  done; done
  for t in light dark; do
    L "start fmlow webkit $t"
    BUILD=bp ENG=webkit REC=$BAT THEME=$t TMIN=40 bash $H/battery.sh $OUT fmlow >> $BAT/chain-bp-webkit.log 2>&1
    L "end fmlow webkit $t exit $?"
  done
  L "start PR"
  (uptime; $GD --light --timeout 10 -- node $H/prose.mjs $WT --out $OUT/pr; echo "exit $?"; uptime) > $REC/PR.log 2>&1
  mkdir -p $REC/PR-bp; find $OUT/pr -name PR.json -exec cp {} $REC/PR-bp/PR.json \;
  L "end PR"
fi
L "CHAIN-DONE"
