#!/bin/bash
# iter.sh: one development iteration (the seat's history, §8): build <label> from the worktree, then W3 --no-faces in
# one engine, each in its own guarded run; prints the failing checks.  bash iter.sh <label> [chromium|webkit] [w3 args…]
set -u
L=$1; E=${2:-chromium}; shift 2 2>/dev/null; WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p5/Bp-proto/wt; O=$WT/.bpout
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock; R=$D/pass-5/D2-Bp-proto-records; mkdir -p $R/iter
(cd $WT && ~/.claude/guard/guarded --light --timeout 20 -- ./node_modules/.bin/vue-tsc --noEmit -p tsconfig.json > $R/iter/tsc-$L.log 2>&1) || { echo TSC-FAILED; head $R/iter/tsc-$L.log; exit 1; }
~/.claude/guard/guarded --timeout 20 -- node $D/harness/build.mjs $WT --out $O --label $L > $R/iter/build-$L.log 2>&1 || { echo BUILD-FAILED; tail -20 $R/iter/build-$L.log; exit 1; }
X=""; [ "$E" = webkit ] && X="--exclusive webkit"
(uptime; ~/.claude/guard/guarded $X --timeout 40 -- node $D/harness/w3-morph.mjs --build $O/builds/$L --adapter $D/pass-3/adapter-floor-v2.mjs --engine $E --out $O/w3-$L-$E --no-faces "$@"; uptime) > $R/iter/w3-$L-$E.log 2>&1
node $R/probes/fails.mjs $(find $O/w3-$L-$E/runs -name W3.json | head -1) | grep -v UNMEASURED | cut -c1-330
grep -E "cells pass" $R/iter/w3-$L-$E.log | cut -c1-120; head -1 $R/iter/w3-$L-$E.log; tail -1 $R/iter/w3-$L-$E.log
