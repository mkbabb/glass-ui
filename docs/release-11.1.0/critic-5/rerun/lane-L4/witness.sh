#!/usr/bin/env bash
# Lane L4 witness for one tree: one guarded browser run per engine (runprobe.sh); WebKit
# holds --exclusive webkit. Exit codes are guarded's, which are the probes'.
#   witness.sh <tree-root> <package-root> <port> <label> <green|red> [engines]
set -u
TREE=$1; PKG=$2; PORT=$3; LABEL=$4; KIND=$5; ENGINES=${6:-"chromium webkit"}
HERE=$(cd "$(dirname "$0")" && pwd)
OUT=$HERE/out
G=~/.claude/guard/guarded
mkdir -p "$OUT"
for E in $ENGINES; do
  if [ "$E" = webkit ]; then EX="--exclusive webkit"; else EX=""; fi
  $G $EX --timeout 30 -- bash "$HERE/runprobe.sh" "$TREE" "$PKG" "$PORT" "$E" "$LABEL" "$KIND" > "$OUT/$LABEL-$E.log" 2>&1
  rc=$?
  echo "$(date +%T) $LABEL $E tree=$TREE pkg=$PKG exit $rc" >> "$OUT/chain.log"
done
