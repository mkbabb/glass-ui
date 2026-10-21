#!/bin/bash
# iter.sh: one development iteration of the pass-6 B′ seat: build <label> from the worktree (guarded), then W3 in one
# engine (guarded; WebKit under --exclusive webkit), then print the failing cells.   bash iter.sh <label> [engine] [w3 args…]
set -u
L=$1; E=${2:-chromium}; shift 2 2>/dev/null
B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p6/Bp-proto; WT=$B/wt; O=$B/out; R=$O/iter
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock; mkdir -p $R
if [ ! -d $O/builds/$L ]; then
  ~/.claude/guard/guarded --timeout 20 -- node $D/harness/build.mjs $WT --out $O --label $L > $R/build-$L.log 2>&1 || { echo BUILD-FAILED; tail -20 $R/build-$L.log; exit 1; }
fi
X=""; [ "$E" = webkit ] && X="--exclusive webkit"
(uptime; ~/.claude/guard/guarded $X --timeout 40 -- node $D/harness/w3-morph.mjs --build $O/builds/$L --adapter $D/pass-3/adapter-floor-v2.mjs --engine $E --out $O/w3-$L-$E "$@"; uptime) > $R/w3-$L-$E.log 2>&1
node $D/pass-5/D2-Bp-proto-records/probes/fails.mjs $(ls -t $(find $O/w3-$L-$E/runs -name W3.json) | head -1) | grep -v UNMEASURED | cut -c1-420
grep -E "cells pass" $R/w3-$L-$E.log | cut -c1-140; head -1 $R/w3-$L-$E.log; tail -1 $R/w3-$L-$E.log
