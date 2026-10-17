#!/bin/bash
# H5-selftest.sh: the self-test of record (D2 pass 5, H5), one engine per call, one witness group per guarded run.
#   bash H5-selftest.sh <out> chromium|webkit <group> [<group> …]   → H5-records/selftest-<engine>-<group>.log
# A group is "<W>[+<W>…]" or "<W>:<fault,fault,…>". Chromium runs take a guarded slot; Playwright WebKit runs take the
# machine-wide WebKit lock (guarded --exclusive webkit). Each run is one heavy run; they run one after another.
set -u
OUT=$1; ENG=$2; shift 2
D=$(cd "$(dirname "$0")/.." && pwd); H=$D/harness; REC=$D/pass-5/H5-records
mkdir -p "$REC" "$OUT"
X=""; [ "$ENG" = webkit ] && X="--exclusive webkit"
for grp in "$@"; do
  w=${grp%%:*}; f=""; [ "$grp" != "$w" ] && f=${grp#*:}
  only=${w//+/,}; log="$REC/selftest-$ENG-$w${f:+-$(echo "$f" | tr ',!' '+_')}.log"
  (uptime; date; ~/.claude/guard/guarded $X --timeout 90 -- node "$H/selftest.mjs" --engine "$ENG" --out "$OUT/$ENG" --only "$only" ${f:+--faults "$f"}; echo "exit $?"; uptime; date) > "$log" 2>&1
  cp "$OUT/$ENG/selftest-$ENG-${only//,/+}.json" "${log%.log}.json" 2>/dev/null   # one JSON per log (a fault subset no longer overwrites its group's)
done
echo "DONE $ENG $(date)" > "$REC/selftest-$ENG-done.txt"
