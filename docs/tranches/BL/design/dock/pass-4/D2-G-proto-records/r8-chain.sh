#!/bin/bash
# r8-chain.sh (D2-G pass 4, obligation N1/R8): build each measurement variant of r8-variant.py from the seat
# worktree (shipped file restored after each build), then read ST (all ten cells: R4's five timings and R8's
# five stall·nb) and W3 neighbour·* on it, per engine, each witness in its own guarded run.
#   bash r8-chain.sh build                    the three variant builds r8-main, r8-watch, r8-hold
#   bash r8-chain.sh read <engine> <label>... ST + W3 neighbour on the named builds (g10 = shipped)
set -u
REC=$(cd "$(dirname "$0")" && pwd); D=$(cd "$REC/../.." && pwd); H=$D/harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p4/G-proto/wt; O=$WT/.gout; AD=$D/pass-3/adapter-G-p3.mjs; G=~/.claude/guard/guarded
mkdir -p "$REC/r8"
case $1 in
build)
  for v in main watch hold; do
    python3 "$REC/r8-variant.py" "$WT" $v > "$REC/r8/variant-$v.log" 2>&1
    diff -u "$WT/src/components/dock/composables/useDockAperture.ts.shipped" "$WT/src/components/dock/composables/useDockAperture.ts" > "$REC/r8/variant-$v.diff" 
    (uptime; $G --timeout 30 -- node "$H/build.mjs" "$WT" --out "$O" --label r8-$v; echo "build exit $?"; uptime) > "$REC/r8/build-r8-$v.log" 2>&1
    python3 "$REC/r8-variant.py" "$WT" restore >> "$REC/r8/variant-$v.log" 2>&1
    tail -1 "$REC/r8/build-r8-$v.log"
  done ;;
read)
  E=$2; shift 2; X=""; [ "$E" = webkit ] && X="--exclusive webkit"
  for L in "$@"; do
    (uptime; $G $X --timeout 60 -- node $H/stall.mjs --build $O/builds/$L --adapter $AD --out $O/r8-ST-$L-$E --engine $E; echo "exit $?"; uptime) > "$REC/r8/ST-$L-$E.log" 2>&1
    (uptime; $G $X --timeout 60 -- node $H/w3-morph.mjs --no-faces --build $O/builds/$L --adapter $AD --out $O/r8-W3-$L-$E --engine $E --cells '^neighbour'; echo "exit $?"; uptime) > "$REC/r8/W3nb-$L-$E.log" 2>&1
    echo "== $L $E"; grep -hE "^(FAIL|PASS|UNMEASURED|OWNER)  (ST|W3)  (Chromium|Playwright)" "$REC/r8/ST-$L-$E.log" "$REC/r8/W3nb-$L-$E.log" | cut -c1-330
  done ;;
esac
