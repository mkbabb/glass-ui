#!/bin/zsh
# H4 seat, the Playwright WebKit stage, batched. Queueing every witness for the machine-wide WebKit lock separately
# cost 20-25 min of lock wait per step (four seats share it), so each batch below takes the lock once:
#   run-h4-wk.sh <batch>        → guarded --light --rss-gb 8 --exclusive webkit --timeout 240 -- run-h4-wk.sh inner <batch>
# Batches: cells (the H4 cells: ATTACK CORNER REPORT T-2; FACT ran alone), base-head, base-f2, rest1 (T-1 T-3 T-4
# T-5), rest2 (T-6 T-7 W-A..W-E CANON T-8). Every step writes its own log with the wall clock and load at start and end.
# (--light --rss-gb 8: the heavy queue held this seat 30 min, logs/HELD.)
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p4/h4
O=$W/out4; B=$O/builds
HN=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/harness
L=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-4/H4/logs
S=$L/sequence.log
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
log() { local F=$L/$1.log; shift; stamp > $F; echo "in WebKit batch $BATCH (one lock hold)" >> $F; "$@" >> $F 2>&1; local rc=$?; echo "exit $rc · $(stamp)" >> $F
  echo "  step $(basename $F .log) · exit $rc · $(stamp)" >> $S; return $rc; }
st() { log selftest-$1-${2:-webkit} node $HN/selftest.mjs --out $O/st --only $1 --engines webkit; }
base() { local X=$1 w
  for w in T-1:t1-corner-stops T-2:t2-one-line-stadium T-3:t3-selected-separates T-4:t4-ring-whole T-5:t5-one-of-n-keys T-6:t6-engagement T-7:t7-no-consumer-paint W-A:wa-curvature-content W-B:wb-choice-card W-C:wc-selection-behaviour W-D:wd-declared-cell W-E:we-one-line CANON:canon; do
    log base-$X-src-${w%%:*}-webkit node $HN/${w#*:}.mjs --build $B/$X-src --out $O --engine webkit; done
  for w in FACT:fact-split ATTACK:attack CORNER:corner-refusal REPORT:report-h46; do
    log base-$X-src-${w%%:*}-webkit node $HN/${w#*:}.mjs --build $B/$X-atk-src --out $O --engine webkit; done
  log base-$X-src-T-8-both node $HN/t8-both-engines.mjs --build $B/$X-src --out $O
  for w in t2-one-line-stadium t5-one-of-n-keys we-one-line; do log base-$X-dist-$w-webkit node $HN/$w.mjs --build $B/$X-dist --out $O --engine webkit; done
  for w in fact-split attack corner-refusal; do log base-$X-atkdist-$w-webkit node $HN/$w.mjs --build $B/$X-atk-dist --out $O --engine webkit; done
  log base-$X-atkdev-attack-webkit node $HN/attack.mjs --build $B/$X-atk-src-dev --out $O --engine webkit
}

if [[ $1 == inner ]]; then
  BATCH=$2
  echo "start WebKit batch $BATCH (lock held) · $(stamp)" >> $S
  case $2 in
    cells) for w in ATTACK CORNER REPORT T-2; do st $w; done ;;
    base-head) base head ;;
    base-f2) base f2 ;;
    rest1) for w in T-1 T-3 T-4 T-5; do st $w; done ;;
    rest2) for w in T-6 T-7 W-A W-B W-C W-D W-E CANON; do st $w; done
           log selftest-T-8-both node $HN/selftest.mjs --out $O/st --only T-8 ;;
  esac
  echo "end WebKit batch $BATCH · $(stamp)" >> $S
  exit 0
fi
echo "queue WebKit batch $1 · $(stamp)" >> $S
~/.claude/guard/guarded --light --rss-gb 8 --exclusive webkit --timeout 240 -- zsh $0 inner $1
echo "guard returned for WebKit batch $1 · exit $? · $(stamp)" >> $S
