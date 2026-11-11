#!/usr/bin/env bash
# Critic round 1, lane reruns: every lane's own witness (copied under rerun/), branch and a
# fresh v11.0.0 tree. Chromium for all lanes first, then WebKit (the machine-wide WebKit
# lock is the long queue), so every lane has both trees in one engine early.
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../../.." && pwd)
RED=$ROOT/.cache/c1-v1100
PKG_RED=$ROOT/.cache/l4-pack/package
LOG=$HERE/chain.log
R=$HERE/rerun
G=~/.claude/guard/guarded
critic() { # critic() <engine> <label> <tree> <port>
  if [ $1 = webkit ]; then EX="--exclusive webkit"; else EX=""; fi
  $G $EX --timeout 30 -- bash "$HERE/runprobe.sh" "$3" "$4" "$1" "$2" > "$HERE/out/$2-$1.log" 2>&1; local rc=$?
  echo "$(date +%T) critic $2 $1 exit $rc" >> "$LOG"
}
for E in chromium webkit; do
[ $E = chromium ] && critic chromium red "$RED" 8092
[ $E = webkit ] && { critic webkit green "$ROOT" 8091; critic webkit red "$RED" 8092; }
for L in ${LANES:-1 2 3 4 5 6 7}; do
  W=$R/lane-L$L/witness.sh
  echo "$(date +%T) lane L$L $E start" >> "$LOG"
  case $L in
    1)   "$W" "$ROOT" 80${L}1 green "$E"; "$W" "$RED" 80${L}2 red "$E" ;;
    6)   "$W" "$ROOT" 80${L}1 green "$E"; "$W" "$RED" 80${L}2 red "$E" ;;
    4)   "$W" "$ROOT" "$ROOT" 8041 green green "$E"; "$W" "$RED" "$PKG_RED" 8042 red red "$E" ;;
    *)   "$W" "$ROOT" 80${L}1 green green "$E"; "$W" "$RED" 80${L}2 red red "$E" ;;
  esac
  [ $L = 7 ] && node "$R/lane-L7/compare.mjs" "$R/lane-L7/out" > "$R/lane-L7/out/compare-$E.log" 2>&1
  tail -2 "$R/lane-L$L/out/chain.log" | sed "s/^/  L$L /" >> "$LOG"
done
echo "LANES-$E-DONE $(date +%T)" >> "$LOG"
done
echo "CRITIC-CHAIN-DONE $(date +%T)" >> "$LOG"
