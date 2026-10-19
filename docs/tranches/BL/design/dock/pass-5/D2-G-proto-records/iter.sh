#!/bin/bash
# iter.sh: one development iteration of the G seat: vue-tsc, build <label> from the worktree, then a witness
# (default W3 --no-faces) in one engine, each in its own guarded run (WebKit under --exclusive webkit).
#   bash iter.sh <label> [chromium|webkit] [witness.mjs] [witness args…]
set -u
L=$1; E=${2:-chromium}; W=${3:-w3-morph.mjs}; shift 3 2>/dev/null
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p5/G-proto/wt; O=$WT/.gout
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock; R=$D/pass-5/D2-G-proto-records; mkdir -p $R/iter
AD=$D/pass-3/adapter-G-p3.mjs
if [ ! -d $O/builds/$L ]; then
  (cd $WT && ~/.claude/guard/guarded --light --timeout 20 -- ./node_modules/.bin/vue-tsc --noEmit -p tsconfig.json > $R/iter/tsc-$L.log 2>&1) || { echo TSC-FAILED; head $R/iter/tsc-$L.log; exit 1; }
  ~/.claude/guard/guarded --timeout 20 -- node $D/harness/build.mjs $WT --out $O --label $L > $R/iter/build-$L.log 2>&1 || { echo BUILD-FAILED; tail -20 $R/iter/build-$L.log; exit 1; }
fi
X=""; [ "$E" = webkit ] && X="--exclusive webkit"
N=$(basename $W .mjs); [ "${W:0:1}" = / ] || W=$D/harness/$W
LOG=$R/iter/$N-$L-$E${TAG:+-$TAG}.log
EXTRA=""; [ "$N" = w3-morph ] && [ -z "${FACES:-}" ] && EXTRA=--no-faces
(uptime; ~/.claude/guard/guarded $X --timeout 60 -- ${THEME:+env DOCK_HARNESS_THEME=$THEME} node $W --build $O/builds/$L --adapter $AD --engine $E --out $O/$N-$L-$E${TAG:+-$TAG} $EXTRA "$@"; echo "exit $?"; uptime) > $LOG 2>&1
grep -E "FAIL|BAD|cells pass|OWNER" $LOG | cut -c1-400 | head -60
head -1 $LOG; tail -1 $LOG
