#!/bin/bash
# dev.sh (D2-G pass-4 prototype, development readings): build <label> from the seat worktree, then run
# the named witnesses on it in one engine, each through the machine guard. Logs: dev/<W>-<label>-<engine>.log.
#   bash dev.sh <label> <engine> [build] W3 L1 CF ...   (extra args after "--" go to every witness)
set -u
L=$1; E=$2; shift 2
REC=$(cd "$(dirname "$0")" && pwd); D=$(cd "$REC/../.." && pwd); H=$D/harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p4/G-proto/wt; O=$WT/.gout
AD=$D/pass-3/adapter-G-p3.mjs; REF=$D/pass-3/adapter-floor-v2.mjs; G=~/.claude/guard/guarded
X=""; [ "$E" = webkit ] && X="--exclusive webkit"
mkdir -p "$REC/dev"
EXTRA=()
ws=()
while [ $# -gt 0 ]; do if [ "$1" = "--" ]; then shift; EXTRA=("$@"); break; fi; ws+=("$1"); shift; done
for w in "${ws[@]}"; do
  log="$REC/dev/$w-$L-$E.log"
  case $w in
    build) (uptime; $G --timeout 30 -- node "$H/build.mjs" "$WT" --out "$O" --label "$L"; echo "build exit $?"; uptime) > "$REC/dev/build-$L.log" 2>&1; tail -2 "$REC/dev/build-$L.log"; continue ;;
    W3) s="w3-morph.mjs --no-faces";; ST) s=stall.mjs;; R5) s=r5-hit.mjs;; CF) s=c-facility.mjs;; FM) s=film.mjs;; W1) s=w1-corner.mjs;; W2) s=w2-run.mjs;; W4) s=w4-state.mjs;; W5) s=w5-rim.mjs;; W6) s=w6-collapsed-form.mjs;; W7) s=w7-edge.mjs;; W8) s=w8-motion.mjs;; R6) s=r6-probe.mjs;;
    L1) s="l1-light.mjs --ref-build $O/builds/fv3 --ref-adapter $REF";;
  esac
  (uptime; $G $X --timeout 60 -- node $H/$s --build "$O/builds/$L" --adapter "$AD" --out "$O/dev-$w-$L-$E" --engine "$E" ${EXTRA[@]+"${EXTRA[@]}"}; echo "exit $?"; uptime) > "$log" 2>&1
  echo "== $w $L $E"; grep -E "^(FAIL|PASS|OWNER|UNMEAS|NOT)" "$log" | grep -v "faces merged\|faces UNMEASURED" | sed -E 's/^(\S+)  \S+  \S+( WebKit)?  (\S+) .*⟶ FAILED: (.*)$/\1 \3 :: \4/; s/^(PASS|OWNER-BLOCKED|UNMEASURED)  \S+  \S+( WebKit)?  (\S+) .*$/\1 \3/' | cut -c1-200
done
