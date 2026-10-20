#!/bin/bash
# H6-selftest.sh: the self-test of record (D2 pass 6, H6), after pass-5/H5-selftest.sh.
#   bash H6-selftest.sh <out> chromium|webkit "<group> [<group> …]" ["<group> …"] …
# Each quoted argument is ONE guarded slot that runs its groups one after another (H6-10: Playwright WebKit takes the
# machine-wide lock once per slot, guarded --exclusive webkit). A group is "<W>[+<W>…]" or "<W>:<fault,fault,…>".
# Logs: H6-records/selftest-<engine>-<group>.log, one JSON per log; slots.log has each slot's start, end and load.
set -u
OUT=$1; ENG=$2; shift 2
D=$(cd "$(dirname "$0")/.." && pwd); H=$D/harness; REC=$D/pass-6/H6-records
mkdir -p "$REC" "$OUT"
X=""; [ "$ENG" = webkit ] && X="--exclusive webkit"
export H REC OUT ENG
group() { # one group, inside the slot
  local grp=$1 w f only log
  w=${grp%%:*}; f=""; [ "$grp" != "$w" ] && f=${grp#*:}
  only=${w//+/,}; log="$REC/selftest-$ENG-$w${f:+-$(echo "$f" | tr ',!' '+_')}.log"
  (uptime; date; node "$H/selftest.mjs" --engine "$ENG" --out "$OUT/$ENG" --only "$only" ${f:+--faults "$f"}; echo "exit $?"; uptime; date) > "$log" 2>&1
  cp "$OUT/$ENG/selftest-$ENG-${only//,/+}.json" "${log%.log}.json" 2>/dev/null
}
export -f group
for slot in "$@"; do
  echo "$(date) slot $ENG [$slot] queued · $(uptime)" >> "$REC/selftest-slots.log"
  ~/.claude/guard/guarded $X --timeout 90 -- bash -c 'echo "$(date) slot '"$ENG"' admitted · $(uptime)" >> "$REC/selftest-slots.log"; for g in '"$slot"'; do group "$g"; done'
  echo "$(date) slot $ENG [$slot] end exit $? · $(uptime)" >> "$REC/selftest-slots.log"
done
echo "DONE $ENG $(date)" > "$REC/selftest-$ENG-done.txt"
