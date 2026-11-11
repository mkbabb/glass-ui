#!/usr/bin/env bash
# Fix 3 witness: three trees (branch, pre-fix 2174a3aef, v11.0.0) in both engines, one
# guarded browser run at a time (WebKit under --exclusive webkit), then the judge.
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../../../.." && pwd)
G=~/.claude/guard/guarded
LOG=$HERE/../chain.log
say() { echo "$(date +%T) $*" >> "$LOG"; }
for E in ${ENGINES:-chromium webkit}; do
  EX=$([ "$E" = webkit ] && echo "--exclusive webkit" || echo "")
  for T in ${TREES:-green pre red}; do
    case $T in green) TREE=$ROOT;; pre) TREE=$ROOT/.cache/f3-pre;; red) TREE=$ROOT/.cache/c1-v1100;; esac
    $G $EX --timeout 25 -- bash "$HERE/runprobe.sh" "$TREE" 8711 "$E" "$T" > "$HERE/out/$T-$E.log" 2>&1
    say "witness $T $E exit $?"
  done
  for T in ${TREES:-green pre red}; do node "$HERE/judge.mjs" "$HERE/out" "$T" "$E" red >> "$HERE/out/judge-$E.log" 2>&1; done
  say "judge $E: $(tr '\n' ';' < "$HERE/out/judge-$E.log")"
done
