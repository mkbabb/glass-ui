#!/bin/bash
# H6-selftest-entry2.sh (entry 2 of the H6 seat, after the 2026-10-19 ~13:57 reboot cut entry 1's Chromium slot):
# the self-test groups entry 1 left unrun or load-starved, Chromium first, then every browser group in Playwright WebKit.
# Each quoted argument is one guarded slot (H6-selftest.sh); WebKit slots take the machine-wide lock.
#   bash H6-selftest-entry2.sh <out>
set -u
OUT=$1; P=$(cd "$(dirname "$0")" && pwd)
bash "$P/H6-selftest.sh" "$OUT" chromium "W3:late W1+W2" "W7+W8+R6 ST+FM+R5 CF+L1"
bash "$P/H6-selftest.sh" "$OUT" webkit "W3" "W1+W2" "W4+W5+W6 ST+FM+R5 CF+L1" "W7+W8+R6"
echo "ENTRY2-DONE $(date)" >> "$P/H6-records/selftest-entry2-done.txt"
