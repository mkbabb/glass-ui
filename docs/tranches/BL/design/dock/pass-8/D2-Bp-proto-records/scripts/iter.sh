#!/bin/bash
# iter.sh <label> <engine> [seqs] : build the seat worktree as <label>, then the traced slot probe, one guarded slot
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p8/Bp-proto; O=$B/out; R=$O/rec/diag; mkdir -p $R
H=$G/docs/tranches/BL/design/dock/harness; AD=$G/docs/tranches/BL/design/dock/pass-3/adapter-floor-v2.mjs
L=$1; E=$2; S=${3:-first-expand,warm-expand,warm-collapse,swap-long,swap-short,content-add}; X=${EXCL:-}
(uptime; ~/.claude/guard/guarded --timeout 20 -- node $H/build.mjs $B/wt --out $O --label $L --no-demo; echo "build exit $?") > $R/build-$L.log 2>&1
(uptime; ~/.claude/guard/guarded $X --timeout 20 -- node $O/scripts/slotink.mjs --build $O/builds/$L --adapter $AD --engine $E --seqs $S --runs ${RUNS:-1} --trace 1 --json $R/trace-$L-$E.json ${THEME:+--theme $THEME}; echo "exit $?"; uptime) > $R/trace-$L-$E${THEME:+-$THEME}.log 2>&1
echo ITER-DONE >> $R/trace-$L-$E${THEME:+-$THEME}.log
