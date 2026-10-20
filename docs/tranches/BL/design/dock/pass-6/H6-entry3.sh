#!/bin/bash
# H6-entry3.sh (entry 3 of the H6 seat, after the owner's 2026-10-20 ~13:57 reboot cut entry 2's last slot):
#   1. Chromium W3 `late`, the second re-run of entry 2's one BAD expectation (load 104.11; re-run 1 OK at 29.5-30.7,
#      selftest-chromium-W3-late.log). Its own log, so re-run 1's log stays.
#   2. the one baseline slot the reboot cut: bp · Playwright WebKit · dark (H6-chain.sh's last slot; --exclusive webkit).
# One heavy run at a time.   bash H6-entry3.sh <out>      (<out> = the seat's out dir holding builds/{fv3,fv4,bp})
set -u
OUT=$1; P=$(cd "$(dirname "$0")" && pwd); D=$P/..; H=$D/harness; REC=$P/H6-records; ST=$OUT/../st
log=$REC/selftest-chromium-W3-late-rerun2.log
echo "$(date) entry3 start · $(uptime)" >> "$REC/entry3.log"
(uptime; date; ~/.claude/guard/guarded --timeout 30 -- node "$H/selftest.mjs" --engine chromium --out "$ST/chromium-e3" --only W3 --faults late; echo "exit $?"; uptime; date) > "$log" 2>&1
cp "$ST/chromium-e3/selftest-chromium-W3.json" "${log%.log}.json" 2>/dev/null
echo "$(date) late rerun2 done · $(uptime)" >> "$REC/entry3.log"
ENGS=webkit THEMES=dark bash "$P/H6-chain.sh" "$OUT" bp
echo "$(date) entry3 end · $(uptime)" >> "$REC/entry3.log"
echo "ENTRY3-DONE $(date)" > "$REC/entry3-done.txt"
