#!/bin/bash
# w3raw.sh: build <label> and run W3 (raw strips kept) in <engine>; print the failing checks.
set -u
L=$1; E=${2:-chromium}; shift 2 || true
REC=$(cd "$(dirname "$0")" && pwd); D=$(cd "$REC/../.." && pwd)
O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p4/G-proto/wt/.gout
[ -d "$O/builds/$L" ] || bash "$REC/dev.sh" "$L" "$E" build >/dev/null
X=""; [ "$E" = webkit ] && X="--exclusive webkit"
(uptime; DOCK_HARNESS_RAW=1 ~/.claude/guard/guarded $X --timeout 40 -- node $D/harness/w3-morph.mjs --no-faces --build $O/builds/$L --adapter $D/pass-3/adapter-G-p3.mjs --out $O/dev-raw-$L-$E --engine $E "$@"; echo "exit $?"; uptime) > $REC/dev/W3raw-$L-$E.log 2>&1
grep -E "^FAIL  W3  $L|^PASS  W3  $L" $REC/dev/W3raw-$L-$E.log | cut -c1-120
node $REC/why.mjs $O/dev-raw-$L-$E/runs/W3-$L/W3.json | grep -v "wide·\|:: $"
