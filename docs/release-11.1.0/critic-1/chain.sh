#!/usr/bin/env bash
# Critic round 1: re-run every lane's own witness, unchanged, from a copy under rerun/,
# on the branch (this worktree) and on a fresh `git archive v11.0.0` (.cache/c1-v1100).
# Each engine is one guarded browser run (WebKit --exclusive webkit), via each lane's witness.sh.
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../../.." && pwd)
RED=$ROOT/.cache/c1-v1100
PKG_RED=$ROOT/.cache/l4-pack/package
LOG=$HERE/chain.log
R=$HERE/rerun
G=~/.claude/guard/guarded
if [ -z "${SKIP_CRITIC:-}" ]; then
  echo "$(date +%T) critic probe start" >> "$LOG"
  for T in "$ROOT:green:8091" "$RED:red:8092"; do
    TR=${T%%:*}; REST=${T#*:}; LB=${REST%%:*}; PT=${REST#*:}
    for E in chromium webkit; do
      if [ $E = webkit ]; then EX="--exclusive webkit"; else EX=""; fi
      $G $EX --timeout 30 -- bash "$HERE/runprobe.sh" "$TR" "$PT" "$E" "$LB" > "$HERE/out/$LB-$E.log" 2>&1; rc=$?
      echo "$(date +%T) critic $LB $E exit $rc" >> "$LOG"
    done
  done
fi
for L in ${LANES:-1 2 3 4 5 6 7}; do
  W=$R/lane-L$L/witness.sh
  echo "$(date +%T) lane L$L start" >> "$LOG"
  case $L in
    1|6) "$W" "$ROOT" 80${L}1 green; "$W" "$RED" 80${L}2 red ;;
    4)   "$W" "$ROOT" "$ROOT" 8041 green green; "$W" "$RED" "$PKG_RED" 8042 red red ;;
    *)   "$W" "$ROOT" 80${L}1 green green; "$W" "$RED" 80${L}2 red red ;;
  esac
  [ $L = 7 ] && node "$R/lane-L7/compare.mjs" "$R/lane-L7/out" > "$R/lane-L7/out/compare.log" 2>&1
  echo "$(date +%T) lane L$L done" >> "$LOG"
  tail -4 "$R/lane-L$L/out/chain.log" >> "$LOG"
done
echo "CRITIC-CHAIN-DONE $(date +%T)" >> "$LOG"
