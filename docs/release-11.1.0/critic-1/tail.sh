#!/usr/bin/env bash
# After the WebKit pass: the Chromium cells added late (critic probe with the HEAD HandMark
# check, both trees; lane L2 branch, whose first try lost its port), then the gates.
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../../.." && pwd); RED=$ROOT/.cache/c1-v1100; LOG=$HERE/chain.log; G=~/.claude/guard/guarded
until grep -q CRITIC-CHAIN-DONE "$LOG"; do sleep 30; done
for T in "green $ROOT 8093" "red $RED 8094"; do set -- $T
  $G --timeout 30 -- bash "$HERE/runprobe.sh" "$2" "$3" chromium "$1" > "$HERE/out/$1-chromium.log" 2>&1; rc=$?
  echo "$(date +%T) critic $1 chromium (with HEAD HandMark) exit $rc" >> "$LOG"
done
"$HERE/rerun/lane-L2/witness.sh" "$ROOT" 8025 green green chromium
tail -1 "$HERE/rerun/lane-L2/out/chain.log" | sed 's/^/  L2 /' >> "$LOG"
echo "TAIL-DONE $(date +%T)" >> "$LOG"
sed -i '' 's/until grep -q CRITIC-CHAIN-DONE/until grep -q TAIL-DONE/' "$HERE/gates.sh"
exec "$HERE/gates.sh"
