#!/usr/bin/env bash
# Lane L6 witness chain for one tree. Each engine is ONE guarded browser run that serves
# the tree and probes it (runprobe.sh); WebKit holds --exclusive webkit. Exit codes are
# guarded's, which are the probe's.
#   witness.sh <tree-root> <port> <label> [engines] [items]
set -u
TREE=$1; PORT=$2; LABEL=$3; ENGINES=${4:-"chromium webkit"}; ITEMS=${5:-}
HERE=$(cd "$(dirname "$0")" && pwd)
OUT=$HERE/out
G=~/.claude/guard/guarded
mkdir -p "$OUT"
for E in $ENGINES; do
  if [ "$E" = webkit ]; then EX="--exclusive webkit"; else EX=""; fi
  $G $EX --timeout 30 -- bash "$HERE/runprobe.sh" "$TREE" "$PORT" "$E" "$LABEL" $ITEMS > "$OUT/$LABEL-$E.log" 2>&1
  rc=$?
  echo "$(date +%T) $LABEL $E tree=$TREE items=${ITEMS:-all} exit $rc" >> "$OUT/chain.log"
done
