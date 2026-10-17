#!/bin/bash
# devall.sh (D2-G pass 4, development readings): the named witnesses on build <label> in one engine, inside ONE guarded
# run (a WebKit run takes the machine-wide WebKit lock once for all of them). Logs: dev/<W>-<label>-<engine>.log.
#   bash devall.sh <label> <engine> W3 ST CF R5 L1 CASES ...
set -u
L=$1; E=$2; shift 2
REC=$(cd "$(dirname "$0")" && pwd); P4=$(cd "$REC/.." && pwd); D=$(cd "$P4/.." && pwd); H=$D/harness
O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p4/G-proto/wt/.gout
AD=$D/pass-3/adapter-G-p3.mjs; REF=$D/pass-3/adapter-floor-v2.mjs
X=""; [ "$E" = webkit ] && X="--exclusive webkit"
inner=""
for w in "$@"; do
  case $w in
    W3) s="$H/w3-morph.mjs --no-faces";; ST) s=$H/stall.mjs;; R5) s=$H/r5-hit.mjs;; CF) s=$H/c-facility.mjs;; FM) s=$H/film.mjs;;
    L1) s="$H/l1-light.mjs --ref-build $O/builds/fv3 --ref-adapter $REF";; CASES) s=$P4/D2-Bp-proto-records/probes/cases.mjs;;
    W1) s=$H/w1-corner.mjs;; W2) s=$H/w2-run.mjs;; W4) s=$H/w4-state.mjs;; W5) s=$H/w5-rim.mjs;; W6) s=$H/w6-collapsed-form.mjs;; W7) s=$H/w7-edge.mjs;; W8) s=$H/w8-motion.mjs;; R6) s=$H/r6-probe.mjs;;
  esac
  inner+="(uptime; node $s --build $O/builds/$L --adapter $AD --out $O/dev-$w-$L-$E --engine $E; echo exit \$?; uptime) > $REC/dev/$w-$L-$E.log 2>&1; "
done
~/.claude/guard/guarded $X --timeout 90 -- bash -c "$inner"
for w in "$@"; do echo "== $w $L $E"; grep -E "^(FAIL|OWNER|UNMEAS)  " "$REC/dev/$w-$L-$E.log" | grep -v "faces merged\|faces UNMEASURED" | cut -c1-230; grep -E "^(FAIL|PASS)  $w  $L" "$REC/dev/$w-$L-$E.log" | cut -c1-120; done
